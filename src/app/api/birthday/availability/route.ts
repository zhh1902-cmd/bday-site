import { NextResponse } from "next/server";

import { birthdayActivationTime, isBirthdayExperienceAvailable } from "@/lib/birthdayServer";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    available: isBirthdayExperienceAvailable(),
    activationAt: new Date(birthdayActivationTime).toISOString(),
    serverNow: new Date().toISOString(),
  }, {
    headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" },
  });
}