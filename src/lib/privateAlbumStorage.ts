import "server-only";

import { get, list } from "@vercel/blob";

import { privatePhotoId } from "@/lib/privateAlbumAuth";

const PRIVATE_PREFIX = "private-album/";
const mediaContentTypes = new Map([
  [".avif", "image/avif"],
  [".gif", "image/gif"],
  [".jpeg", "image/jpeg"],
  [".jpg", "image/jpeg"],
  [".png", "image/png"],
  [".webp", "image/webp"],
  [".mp4", "video/mp4"],
]);

export function isPrivateStorageConfigured(): boolean {
  return Boolean(
    process.env.BLOB_READ_WRITE_TOKEN ||
    (process.env.BLOB_STORE_ID && process.env.VERCEL_OIDC_TOKEN),
  );
}

export async function listPrivateAlbumMedia() {
  const blobs = [];
  let cursor: string | undefined;

  do {
    const result = await list({ prefix: PRIVATE_PREFIX, limit: 1000, cursor });
    blobs.push(...result.blobs);
    cursor = result.hasMore ? result.cursor : undefined;
  } while (cursor);

  return blobs
    .filter((blob) => blob.pathname.startsWith(PRIVATE_PREFIX))
    .filter((blob) => mediaContentTypes.has(blob.pathname.slice(blob.pathname.lastIndexOf(".")).toLowerCase()))
    .sort((left, right) => left.pathname.localeCompare(right.pathname));
}

export async function getPrivateAlbumMedia(id: string, range: string | null) {
  if (!/^[a-f0-9]{32}$/.test(id)) return null;

  const blobs = await listPrivateAlbumMedia();
  const blob = blobs.find((item) => privatePhotoId(item.pathname) === id);
  if (!blob) return null;

  const extension = blob.pathname.slice(blob.pathname.lastIndexOf(".")).toLowerCase();
  const contentType = mediaContentTypes.get(extension);
  const result = await get(blob.pathname, {
    access: "private",
    headers: range ? { Range: range } : undefined,
  });
  if (!result || ![200, 206].includes(result.statusCode) || !result.stream || result.blob.contentType !== contentType) return null;
  const contentRange = result.headers.get("content-range");
  return {
    stream: result.stream,
    contentType,
    status: contentRange ? 206 : result.statusCode,
    contentRange,
    contentLength: result.headers.get("content-length"),
  };
}