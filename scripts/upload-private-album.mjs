import { open, readdir, readFile, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { extname, join, relative, sep } from "node:path";
import { list, put } from "@vercel/blob";

const sourceDirectory = fileURLToPath(new URL("../private-media/private-album/", import.meta.url));
const maximumImageFileSize = 25 * 1024 * 1024;
const maximumVideoFileSize = 100 * 1024 * 1024;
const contentTypes = new Map([
  [".avif", "image/avif"],
  [".gif", "image/gif"],
  [".jpeg", "image/jpeg"],
  [".jpg", "image/jpeg"],
  [".png", "image/png"],
  [".webp", "image/webp"],
  [".mp4", "video/mp4"],
]);
const mp4Brands = new Set(["isom", "iso2", "iso3", "iso4", "iso5", "iso6", "mp41", "mp42", "avc1", "M4V "]);

if (!process.env.BLOB_READ_WRITE_TOKEN && !(process.env.BLOB_STORE_ID && process.env.VERCEL_OIDC_TOKEN)) {
  console.error("Connect a private Vercel Blob store and load its credentials before uploading.");
  process.exit(1);
}

const files = await findPrivateMedia(sourceDirectory);
if (files.length === 0) {
  console.info("No supported private media found to upload.");
  process.exit(0);
}

const acceptedFiles = [];
const skippedFiles = [];
for (const file of files) {
  if (!await hasMatchingMediaSignature(file.path, file.extension)) {
    throw new Error(`File content does not match its media extension: ${file.name}`);
  }
  const maximumFileSize = file.extension === ".mp4" ? maximumVideoFileSize : maximumImageFileSize;
  if (file.size > maximumFileSize) {
    skippedFiles.push(file);
    continue;
  }
  acceptedFiles.push(file);
}

const existingPathnames = await listPrivateAlbumPathnames();
const filesToUpload = acceptedFiles.filter((file) => {
  const pathname = relative(sourceDirectory, file.path).split(sep).join("/");
  return !existingPathnames.has(`private-album/${pathname}`);
});

for (const file of filesToUpload) {
  const pathname = relative(sourceDirectory, file.path).split(sep).join("/");
  await put(`private-album/${pathname}`, await readFile(file.path), {
    access: "private",
    contentType: contentTypes.get(file.extension),
    allowOverwrite: true,
  });
}

const uploadedImages = filesToUpload.filter((file) => file.extension !== ".mp4").length;
const uploadedVideos = filesToUpload.length - uploadedImages;
console.info(`Uploaded ${filesToUpload.length} private media files (${uploadedImages} images, ${uploadedVideos} videos).`);
const existingCount = acceptedFiles.length - filesToUpload.length;
if (existingCount > 0) {
  console.info(`Skipped ${existingCount} media files already present in private storage.`);
}
if (skippedFiles.length > 0) {
  console.warn(`Skipped ${skippedFiles.length} file${skippedFiles.length === 1 ? "" : "s"} over the per-file size limit.`);
}

async function listPrivateAlbumPathnames() {
  const pathnames = new Set();
  let cursor;
  let hasMore = true;

  while (hasMore) {
    const page = await list({ prefix: "private-album/", limit: 1000, cursor });
    for (const blob of page.blobs) pathnames.add(blob.pathname);
    cursor = page.cursor;
    hasMore = page.hasMore;
  }

  return pathnames;
}

async function findPrivateMedia(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await findPrivateMedia(path));
    else if (entry.isSymbolicLink()) throw new Error("Symbolic links are not accepted in private media.");
    else if (path === join(sourceDirectory, "README.md")) continue;
    else {
      const extension = extname(entry.name).toLowerCase();
      if (!contentTypes.has(extension)) throw new Error(`Unsupported private media file: ${entry.name}`);

      const { size } = await stat(path);
      if (size === 0) throw new Error(`Private media files cannot be empty: ${entry.name}`);
      files.push({ path, extension, size, name: entry.name });
    }
  }

  return files.sort((left, right) => left.path.localeCompare(right.path));
}

async function hasMatchingMediaSignature(path, extension) {
  const file = await open(path, "r");
  const header = Buffer.alloc(16);

  try {
    const { bytesRead } = await file.read(header, 0, header.length, 0);
    const bytes = header.subarray(0, bytesRead);
    if (extension === ".jpg" || extension === ".jpeg") return bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
    if (extension === ".png") return bytes.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
    if (extension === ".gif") return bytes.subarray(0, 6).toString("ascii").match(/^GIF8[79]a$/) !== null;
    if (extension === ".webp") return bytes.subarray(0, 4).toString("ascii") === "RIFF" && bytes.subarray(8, 12).toString("ascii") === "WEBP";
    if (extension === ".avif") return bytes.subarray(4, 8).toString("ascii") === "ftyp" && ["avif", "avis"].includes(bytes.subarray(8, 12).toString("ascii"));
    if (extension === ".mp4") return bytes.length === 16 && bytes.subarray(4, 8).toString("ascii") === "ftyp" && mp4Brands.has(bytes.subarray(8, 12).toString("ascii"));
    return false;
  } finally {
    await file.close();
  }
}