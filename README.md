This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## PRIVATE ONLY US ALBUM SETUP

The Only Us album reads original photos and videos from a **private Vercel Blob store**. The local `private-media/private-album/` directory is ignored by Git and is never served by the site or read by deployed functions.

1. Create a Vercel Blob store and set its access to **Private**.
2. Connect the store to this Vercel project. For local uploads, link the project and run `vercel env pull .env.local` to load `BLOB_READ_WRITE_TOKEN`.
3. Set `PRIVATE_ALBUM_PASSWORD` in `.env.local` for local development. Do not commit `.env.local` or share the password. The browser receives only an HttpOnly session cookie after a successful check.
4. Place `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`, `.gif`, and `.mp4` files in `private-media/private-album/`. The uploader rejects unsupported or mismatched files; files over the existing 25 MiB per-file limit are skipped.
5. Run `npm run upload:private-album`. The script uploads originals with private access only; it does not copy files to `public/` or print Blob URLs.
6. Run `npm run dev`, set a test password in `.env.local`, and open Only Us from the memories section. Verify incorrect passwords are rejected and the private gallery loads after authentication.
7. Configure `PRIVATE_ALBUM_PASSWORD` in the Vercel project's Production environment. Connect the private Blob store to the same project so Vercel provides its server-side Blob credentials.
8. Deploy the site to Vercel. Do not move private originals into `public/` or use a public Blob store.
9. On the production domain, verify a correct password opens the album and that the session cookie is HttpOnly and Secure.
10. Verify an unauthenticated request to `/api/private-album/photos` and `/api/private-album/media/<opaque-id>` is denied. Also verify that no raw Blob URL is returned to the browser. Configure a Vercel Firewall rate limit for `POST /api/private-album/unlock` before production use.

`.env.example` contains variable names only. Keep actual password and Blob credentials in local ignored environment files or Vercel project settings.
