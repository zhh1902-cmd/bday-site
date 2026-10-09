import { NextResponse } from "next/server";

import { getSecretLetterContent, isSecretLetterSessionValid } from "@/lib/secretLetterServer";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!isSecretLetterSessionValid(request)) {
    return NextResponse.json({ error: "unauthorized" }, {
      status: 401,
      headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff", Vary: "Cookie" },
    });
  }

  return NextResponse.json({ content: getSecretLetterContent() }, {
    headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff", Vary: "Cookie" },
  });
}