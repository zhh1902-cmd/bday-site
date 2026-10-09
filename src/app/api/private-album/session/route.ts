import { NextResponse } from "next/server";

import { isPrivateSessionValid } from "@/lib/privateAlbumAuth";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  return NextResponse.json({ unlocked: isPrivateSessionValid(request) }, {
    headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff", Vary: "Cookie" },
  });
}