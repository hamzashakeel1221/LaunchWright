# WebDoorstep

Website for **WebDoorstep**, a web design studio for small businesses worldwide.

Built with **Next.js 15 (App Router) · TypeScript · Tailwind CSS 4 · MySQL (Prisma)**.

## Features

**Public site**
- Home: headline offer, how it works (design → develop → test → deploy), packages (no prices, 2 months maintenance included, optional ongoing care), latest projects, worldwide section, approved reviews, contact.
- `/projects` and `/projects/[slug]`: projects added from the admin panel, with a "Sample" label where set.
- `/reviews`: approved reviews with average rating, plus a form anyone can use. New reviews stay hidden until the admin approves them.
- `/contact`: contact form (saved to the admin panel), WhatsApp, phone and email.
- Mobile menu, floating WhatsApp button, spam honeypot and rate limiting on forms.

**Admin panel** (`/admin`, single admin login)
- Dashboard with new messages and reviews waiting.
- Projects: add (with cover image upload), edit, hide/show, reorder, delete.
- Reviews: approve, reject, unpublish, delete.
- Messages: full sender details, reply by email or WhatsApp (pre-filled), mark replied / unread / archived, private notes, delete.

## Run locally

```bash
npm install
cp .env.example .env          # then fill in the values
npm run hash-password -- "your-strong-password"   # paste the output into ADMIN_PASSWORD_HASH
npx prisma migrate deploy     # creates the tables
npm run dev                   # http://localhost:3000  (admin at /admin)
```

## Deploy for free (Cloudflare Workers)

1. **Database:** create a free MySQL-compatible cluster on [TiDB Cloud](https://tidbcloud.com) (Starter) and copy the Prisma connection string (with `?sslaccept=strict`). On Cloudflare the app talks to TiDB over HTTPS with TiDB's serverless driver.
2. **Website:** in the [Cloudflare dashboard](https://dash.cloudflare.com) open *Workers & Pages → Create → Import a repository* and pick this repository.
   - Build command: `npm run cf-build` (creates/updates the tables, then builds)
   - Deploy command: `npx wrangler deploy`
3. Add `DATABASE_URL`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` (or `ADMIN_PASSWORD_HASH`) and `SESSION_SECRET` twice: as **build variables** (the build runs migrations) and as **variables and secrets** of the Worker (used at runtime).
4. When you buy a domain, add it under the Worker's *Settings → Domains & Routes*.

Pages that show projects and reviews are rendered fresh on every request, so admin changes show up immediately.

`netlify.toml` is kept so the old Netlify deploy keeps working until it is switched off.

## Changing contact details

Edit `src/lib/site.ts` (phone, WhatsApp, email).
