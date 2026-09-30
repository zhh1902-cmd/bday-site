import { NextResponse } from "next/server";

import {
  createPrivateSession,
  configuredPrivatePassword,
  PRIVATE_ALBUM_COOKIE,
  PRIVATE_ALBUM_COOKIE_PATH,
  verifyPrivatePassword,
} from "@/lib/privateAlbumAuth";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const origin = request.headers.get("origin");
  if ((origin && new URL(origin).origin !== requestUrl.origin) || request.headers.get("sec-fetch-site") === "cross-site") {
    return jsonResponse({ error: "invalid_request" }, 403);
  }
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return jsonResponse({ error: "invalid_request" }, 415);
  }
  if (!configuredPrivatePassword()) return jsonResponse({ error: "password_not_configured" }, 503);

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 2048) return jsonResponse({ error: "invalid_request" }, 413);

  let payload: unknown;
  try {
    const text = await readBoundedBody(request, 2048);
    if (text === null) return jsonResponse({ error: "invalid_request" }, 400);
    payload = JSON.parse(text);
  } catch {
    return jsonResponse({ error: "invalid_request" }, 400);
  }

  const candidate = typeof payload === "object" && payload !== null && "password" in payload
    ? payload.password
    : undefined;
  if (!verifyPrivatePassword(candidate)) return jsonResponse({ error: "wrong_password" }, 401);

  const session = createPrivateSession();
  if (!session) return jsonResponse({ error: "password_not_configured" }, 503);

  const response = jsonResponse({ ok: true }, 200);
  response.headers.append(
    "Set-Cookie",
    `${PRIVATE_ALBUM_COOKIE}=; Path=/api/private-album; Max-Age=0; HttpOnly; SameSite=Strict${process.env.NODE_ENV === "production" ? "; Secure" : ""}`,
  );
  response.headers.append(
    "Set-Cookie",
    `${PRIVATE_ALBUM_COOKIE}=${session}; Path=${PRIVATE_ALBUM_COOKIE_PATH}; HttpOnly; SameSite=Strict${process.env.NODE_ENV === "production" ? "; Secure" : ""}`,
  );
  return response;
}

function jsonResponse(body: object, status: number) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" },
  });
}

async function readBoundedBody(request: Request, maximumBytes: number): Promise<string | null> {
  if (!request.body) return null;

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      totalBytes += value.byteLength;
      if (totalBytes > maximumBytes) {
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