import { NextResponse } from "next/server";

import {
  birthdayActivationTime,
  birthdayNotificationCopy,
  birthdayNotificationTime,
  getBirthdayNotificationSettings,
  isBirthdayNotificationDate,
  sendPrivateEmail,
} from "@/lib/birthdayServer";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const isDryRun = requestUrl.searchParams.get("dryRun") === "1";
  const notificationSettings = getBirthdayNotificationSettings();
  const previewText = `${birthdayNotificationCopy}\n\n${notificationSettings?.siteUrl ?? "[BIRTHDAY_SITE_URL not configured]"}`;
  if (isDryRun && process.env.NODE_ENV !== "production") {
    return jsonResponse({
      dryRun: true,
      sent: false,
      scheduledAt: new Date(birthdayNotificationTime).toISOString(),
      message: previewText,
      providerConfigured: notificationSettings !== null,
    }, 200);
  }

  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) return jsonResponse({ error: "cron_not_configured" }, 503);
  if (request.headers.get("authorization") !== `Bearer ${cronSecret}`) {
    return jsonResponse({ error: "unauthorized" }, 401);
  }

  if (isDryRun) {
    return jsonResponse({
      dryRun: true,
      sent: false,
      scheduledAt: new Date(birthdayNotificationTime).toISOString(),
      message: previewText,
      providerConfigured: notificationSettings !== null,
    }, 200);
  }

  const now = new Date();
  if (!isBirthdayNotificationDate(now)) return jsonResponse({ skipped: "outside_2026_notification_date" }, 200);
  if (now.getTime() >= birthdayActivationTime) return jsonResponse({ skipped: "birthday_time_already_passed" }, 200);

  const settings = notificationSettings;
  if (!settings) return jsonResponse({ error: "notification_provider_not_configured" }, 503);
  const scheduledAt = new Date(birthdayNotificationTime).toISOString();

  try {
    const delivered = await sendPrivateEmail({
      ...settings,
      idempotencyKey: "birthday-surprise-bhavani-2026-10-10",
      subject: "❤️ Open this before 12:00 AM",
      text: `${birthdayNotificationCopy}\n\n[Open Your Birthday Surprise ❤️]\n${settings.siteUrl}\n\n— Akshi`,
      scheduledAt,
    });
    if (!delivered) return jsonResponse({ error: "notification_delivery_failed" }, 502);
    return jsonResponse({ sent: !scheduledAt, scheduled: Boolean(scheduledAt), scheduledAt }, 200);
  } catch {
    return jsonResponse({ error: "notification_delivery_failed" }, 502);
  }
}

function jsonResponse(body: object, status: number) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" },
  });
}