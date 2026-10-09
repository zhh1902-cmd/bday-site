import "server-only";

import { createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";

export const secretMessage = {
  title: "For Chinni",
  password: "05071010",
  paragraphs: [
    "Chinni, idi perfect letter laga undalani rayatledu. Normal ga neetho matladetappudu cheppaleni konni feelings ni ikkada cheppali anipinchi rastunna. ❤️",
    "Mana story ela start ayyindo, appati nundi ippudaka emem jarigayo venakki tirigi chuskunte, manam kalisi enni rakala memories collect cheskunnamo ippudu ardham avuthundi. ❤️",
    "Konni memories manalni navvinchayi, konni chala alochinchela chesayi, inkonni okarini okaram inka better ga understand cheskune la chesayi.",
    "Mundhu em jarigina, mana life ekkadiki vellina, manalni ikkadi varaku teesukochina prathi moment ki nenu eppudu grateful ga untanu. ❤️",
    "Happy Birthday naa Chinni. ❤️",
  ],
  signoff: "— Akshi ❤️",
} as const;

export const SECRET_LETTER_COOKIE = "secret_letter_session";
const secretLetterSessionTtlSeconds = 30 * 60;

export function verifySecretLetterPasscode(candidate: unknown): boolean {
  if (typeof candidate !== "string" || candidate.length === 0 || candidate.length > 256) return false;

  const expected = createHash("sha256").update(secretMessage.password).digest();
  const actual = createHash("sha256").update(candidate).digest();
  return timingSafeEqual(expected, actual);
}

export function createSecretLetterSession(): string {
  const expiresAt = Date.now() + secretLetterSessionTtlSeconds * 1000;
  const payload = `v1:${expiresAt}:${randomBytes(16).toString("hex")}`;
  const signature = createHmac("sha256", secretMessage.password).update(payload).digest("base64url");
  return `${payload}.${signature}`;
}

export function isSecretLetterSessionValid(request: Request): boolean {
  const cookieHeader = request.headers.get("cookie");
  if (!cookieHeader) return false;

  const tokens = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .filter((part) => part.startsWith(`${SECRET_LETTER_COOKIE}=`))
    .map((part) => part.slice(SECRET_LETTER_COOKIE.length + 1));

  return tokens.some(isValidSecretLetterSessionToken);
}

export function getSecretLetterContent() {
  return {
    title: secretMessage.title,
    paragraphs: secretMessage.paragraphs,
    signoff: secretMessage.signoff,
  };
}

function isValidSecretLetterSessionToken(token: string): boolean {
  const separator = token.lastIndexOf(".");
  if (separator < 0) return false;

  const payload = token.slice(0, separator);
  const signature = token.slice(separator + 1);
  const [version, expiresAt, nonce] = payload.split(":");
  if (version !== "v1" || !/^\d+$/.test(expiresAt ?? "") || !/^[a-f0-9]{32}$/.test(nonce ?? "")) return false;
  if (Number(expiresAt) <= Date.now()) return false;

  const expected = createHmac("sha256", secretMessage.password).update(payload).digest();
  let supplied: Buffer;
  try {
    supplied = Buffer.from(signature, "base64url");
  } catch {
    return false;
  }
  return supplied.length === expected.length && timingSafeEqual(expected, supplied);
}
