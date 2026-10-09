import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { Resend } from "resend";

import { getPrivateWishSettings, isBirthdayExperienceAvailable } from "@/lib/birthdayServer";

export const dynamic = "force-dynamic";
const maximumRequestBytes = 8192;

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const origin = request.headers.get("origin");
  if (!origin || new URL(origin).origin !== requestUrl.origin || request.headers.get("sec-fetch-site") === "cross-site") {
    return jsonResponse({ error: "invalid_request" }, 403);
  }
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return jsonResponse({ error: "invalid_request" }, 415);
  }
  if (!isBirthdayExperienceAvailable()) return jsonResponse({ error: "birthday_not_available" }, 403);
  if (process.env.NODE_ENV !== "production") return jsonResponse({ error: "delivery_only_available_in_production" }, 503);

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > maximumRequestBytes) return jsonResponse({ error: "invalid_request" }, 413);

  let payload: unknown;
  try {
    const body = await readBoundedBody(request);
    if (body === null) return jsonResponse({ error: "invalid_request" }, 413);
    payload = JSON.parse(body);
  } catch {
    return jsonResponse({ error: "invalid_request" }, 400);
  }

  const wish = typeof payload === "object" && payload !== null && "wish" in payload
    ? payload.wish
    : undefined;
  if (typeof wish !== "string" || !wish.trim() || wish.trim().length > 2000) {
    return jsonResponse({ error: "invalid_wish" }, 400);
  }

  const settings = getPrivateWishSettings();
  if (!settings) return jsonResponse({ error: "delivery_not_configured" }, 503);

  try {
    const resend = new Resend(settings.apiKey);
    const { error } = await resend.emails.send({
      from: settings.from,
      to: settings.to,
      subject: "❤️ Bhavani's Birthday Wish",
      text: `Birthday Wish from Bhavani\n\n${wish}`,
    }, {
      idempotencyKey: `private-wish-${createHash("sha256").update(wish).digest("hex")}`,
    });
    if (error) return jsonResponse({ error: "delivery_failed" }, 502);
    return jsonResponse({ delivered: true }, 200);
  } catch {
    return jsonResponse({ error: "delivery_failed" }, 502);
  }
}

function jsonResponse(body: object, status: number) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff", Vary: "Origin" },
  });
}

async function readBoundedBody(request: Request): Promise<string | null> {
  if (!request.body) return null;
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      totalBytes += value.byteLength;
      if (totalBytes > maximumRequestBytes) {
        await reader.cancel();
        return null;
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  const body = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder().decode(body);
}