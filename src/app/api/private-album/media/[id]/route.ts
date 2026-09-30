import { isPrivateSessionValid } from "@/lib/privateAlbumAuth";
import { getPrivateAlbumMedia, isPrivateStorageConfigured } from "@/lib/privateAlbumStorage";

export const dynamic = "force-dynamic";

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  if (!isPrivateSessionValid(request)) return new Response("Not found", { status: 404, headers: privateHeaders });
  if (!isPrivateStorageConfigured()) return new Response("Private storage is not configured", { status: 503, headers: privateHeaders });

  const { id } = await context.params;
  try {
    const media = await getPrivateAlbumMedia(id, request.headers.get("range"));
    if (!media) return new Response("Not found", { status: 404, headers: privateHeaders });

    const headers = new Headers({
      ...privateHeaders,
      "Content-Type": media.contentType,
      "Content-Disposition": "inline",
      "Accept-Ranges": "bytes",
    });
    if (media.contentRange) headers.set("Content-Range", media.contentRange);
    if (media.contentLength) headers.set("Content-Length", media.contentLength);

    return new Response(media.stream, { status: media.status, headers });
  } catch {
    return new Response("Private storage is unavailable", { status: 503, headers: privateHeaders });
  }
}

const privateHeaders = {
  "Cache-Control": "private, no-store",
  "Vary": "Cookie",
  "X-Content-Type-Options": "nosniff",
};