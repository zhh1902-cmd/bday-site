import { NextResponse } from "next/server";

import { isPrivateSessionValid, privatePhotoId } from "@/lib/privateAlbumAuth";
import { isPrivateStorageConfigured, listPrivateAlbumMedia } from "@/lib/privateAlbumStorage";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!isPrivateSessionValid(request)) return jsonResponse({ error: "unauthorized" }, 401);
  if (!isPrivateStorageConfigured()) return jsonResponse({ error: "storage_not_configured" }, 503);

  try {
    const blobs = await listPrivateAlbumMedia();
    const photos = blobs.flatMap((blob, index) => {
      const id = privatePhotoId(blob.pathname);
      if (!id) return [];
      const isVideo = blob.pathname.toLowerCase().endsWith(".mp4");
      return [{
        id,
        src: `/api/private-album/media/${id}`,
        type: isVideo ? "video" : "image",
        alt: `Only Us memory ${index + 1}`,
        title: `Memory ${String(index + 1).padStart(2, "0")}`,
        caption: "A moment that belongs to us.",
      }];
    });
    return jsonResponse({ photos }, 200);
  } catch {
    return jsonResponse({ error: "storage_unavailable" }, 503);
  }
}

function jsonResponse(body: object, status: number) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff", Vary: "Cookie" },
  });
}