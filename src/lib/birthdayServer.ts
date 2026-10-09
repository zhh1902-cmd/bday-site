import "server-only";

import { birthdayConfig } from "@/data/birthday";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const birthdayActivationTime = Date.parse(birthdayConfig.birthday.targetDateTime);
export const birthdayNotificationTime = Date.parse("2026-10-09T23:55:00+05:30");
export const birthdayNotificationCopy = "Hey Chinni ❤️\n\nOpen this link before 12:00 AM and keep the website open in the background.\n\nSomething special is waiting for you at midnight. ❤️\n\nSee you there...";

export function isBirthdayExperienceAvailable(now = Date.now()): boolean {
  return now >= birthdayActivationTime;
}

export function isBirthdayNotificationDate(now = new Date()): boolean {
  return now.getUTCFullYear() === 2026 && now.getUTCMonth() === 9 && now.getUTCDate() === 9;
}

export function getBirthdayNotificationSettings() {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.BIRTHDAY_NOTIFICATION_FROM;
  const to = process.env.BIRTHDAY_NOTIFICATION_TO;
  const siteUrl = getPublicWebsiteUrl();
  if (!apiKey || !from || !to || !siteUrl || !emailPattern.test(from) || !emailPattern.test(to)) return null;
  return { apiKey, from, to, siteUrl };
}

export function getPrivateWishSettings() {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.PRIVATE_WISH_FROM_EMAIL;
  const to = process.env.PRIVATE_WISH_TO_EMAIL;
  if (!apiKey || !from || !to || !emailPattern.test(from) || !emailPattern.test(to)) return null;
  return { apiKey, from, to };
}

export async function sendPrivateEmail(input: {
  apiKey: string;
  from: string;
  to: string;
  subject: string;
  text: string;
  idempotencyKey?: string;
  scheduledAt?: string;
  attachments?: Array<{ filename: string; contentType: string; bytes: Uint8Array }>;
}): Promise<boolean> {
  const headers: Record<string, string> = {
    Authorization: `Bearer ${input.apiKey}`,
    "Content-Type": "application/json",
  };
  if (input.idempotencyKey) headers["Idempotency-Key"] = input.idempotencyKey;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers,
    body: JSON.stringify({
      from: input.from,
      to: [input.to],
      subject: input.subject,
      text: input.text,
      ...(input.scheduledAt ? { scheduled_at: input.scheduledAt } : {}),
      ...(input.attachments ? {
        attachments: input.attachments.map((attachment) => ({
          filename: attachment.filename,
          content: Buffer.from(attachment.bytes).toString("base64"),
          content_type: attachment.contentType,
        })),
      } : {}),
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  });
  return response.ok;
}

function getPublicWebsiteUrl(): string | null {
  const value = process.env.BIRTHDAY_SITE_URL;
  if (!value) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.username || url.password) return null;
    return url.toString().replace(/\/$/, "");
  } catch {
    return null;
  }
}