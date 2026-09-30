import "server-only";

import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

export const PRIVATE_ALBUM_COOKIE = "private_album_session";
export const PRIVATE_ALBUM_COOKIE_PATH = "/";
const SESSION_TTL_MS = 12 * 60 * 60 * 1000;

export function configuredPrivatePassword(): string | null {
  const password = process.env.PRIVATE_ALBUM_PASSWORD;
  return password && password.length > 0 ? password : null;
}

export function verifyPrivatePassword(candidate: unknown): boolean {
  const password = configuredPrivatePassword();
  if (!password || typeof candidate !== "string") return false;

  const expected = createHmac("sha256", "private-album-password-check").update(password).digest();
  const actual = createHmac("sha256", "private-album-password-check").update(candidate).digest();
  return timingSafeEqual(expected, actual);
}

export function createPrivateSession(): string | null {
  const password = configuredPrivatePassword();
  if (!password) return null;

  const expiresAt = Date.now() + SESSION_TTL_MS;
  const payload = `v1:${expiresAt}:${randomBytes(16).toString("hex")}`;
  const signature = createHmac("sha256", password).update(payload).digest("base64url");
  return `${payload}.${signature}`;
}

export function isPrivateSessionValid(request: Request): boolean {
  const cookieHeader = request.headers.get("cookie");
  const password = configuredPrivatePassword();
  if (!cookieHeader || !password) return false;

  const tokens = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .filter((part) => part.startsWith(`${PRIVATE_ALBUM_COOKIE}=`))
    .map((part) => part.slice(PRIVATE_ALBUM_COOKIE.length + 1));

  return tokens.some((token) => isValidSessionToken(token, password));
}

function isValidSessionToken(token: string, password: string): boolean {
  const separator = token.lastIndexOf(".");
  if (separator < 0) return false;

  const payload = token.slice(0, separator);
  const signature = token.slice(separator + 1);
  const [version, expiresAt, nonce] = payload.split(":");
  if (version !== "v1" || !/^\d+$/.test(expiresAt ?? "") || !/^[a-f0-9]{32}$/.test(nonce ?? "")) return false;
  if (Number(expiresAt) <= Date.now()) return false;

  const expected = createHmac("sha256", password).update(payload).digest();
  let supplied: Buffer;
  try {
    supplied = Buffer.from(signature, "base64url");
  } catch {
    return false;
  }
  return supplied.length === expected.length && timingSafeEqual(expected, supplied);
}

export function privatePhotoId(pathname: string): string | null {
  const password = configuredPrivatePassword();
  if (!password) return null;
  return createHmac("sha256", password).update(pathname).digest("hex").slice(0, 32);
}