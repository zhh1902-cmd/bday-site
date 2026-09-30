# Only Us private originals

Put original `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`, `.gif`, and `.mp4` files in this directory. The uploader validates each file's signature, rejects unsupported files, and preserves the existing 25 MiB per-file limit; larger files are skipped. This directory is ignored by Git except for this setup guide, and it is never served by Next.js as a static asset.

Create a **private** Vercel Blob store and connect it to the Vercel project. Locally, link the project and run `vercel env pull .env.local` so `BLOB_READ_WRITE_TOKEN` is available. Set `PRIVATE_ALBUM_PASSWORD` in `.env.local` separately; do not commit secrets.

Run `npm run upload:private-album` to upload validated originals to the `private-album/` prefix with `access: "private"`. Original bytes and media metadata are preserved. The site derives stable opaque IDs server-side and streams images and videos only from that connected private store after password authentication. Video byte-range requests also pass through the protected application route. Blob paths, filenames, and Blob URLs are not returned to the browser. The local source directory is not a Vercel runtime storage provider and is not read by deployed functions.

For production, use a long, unique password and configure a Vercel Firewall rate limit for `POST /api/private-album/unlock`. The in-process application does not provide a durable serverless rate limiter.