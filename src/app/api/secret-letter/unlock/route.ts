import { NextResponse } from "next/server";

import {
  createSecretLetterSession,
  SECRET_LETTER_COOKIE,
  verifySecretLetterPasscode,
} from "@/lib/secretLetterServer";

export const dynamic = "force-dynamic";
const maximumRequestBytes = 1024;

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const origin = request.headers.get("origin");
  if (origin) {
    try {
      if (new URL(origin).origin !== requestUrl.origin) return jsonResponse({ error: "invalid_request" }, 403);
    } catch {
      return jsonResponse({ error: "invalid_request" }, 403);
    }
  }
  if (request.headers.get("sec-fetch-site") === "cross-site") return jsonResponse({ error: "invalid_request" }, 403);
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return jsonResponse({ error: "invalid_request" }, 415);
  }

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

  const passcode = typeof payload === "object" && payload !== null && "passcode" in payload
    ? payload.passcode
    : undefined;
  if (!verifySecretLetterPasscode(passcode)) return jsonResponse({ error: "unauthorized" }, 401);

  const session = createSecretLetterSession();
  const response = jsonResponse({ authorized: true }, 200);
  response.headers.append(
    "Set-Cookie",
    `${SECRET_LETTER_COOKIE}=${session}; Path=/api/secret-letter; Max-Age=1800; HttpOnly; SameSite=Strict${process.env.NODE_ENV === "production" ? "; Secure" : ""}`,
  );
  return response;
}

function jsonResponse(body: object, status: number) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" },
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