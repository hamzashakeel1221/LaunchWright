# Launchwright

Website for **Launchwright**, a web design studio for small businesses worldwide.

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
npm run db:push               # creates the tables
npm run dev                   # http://localhost:3000  (admin at /admin)
```

## Deploy for free

1. **Database:** create a free MySQL-compatible cluster on [TiDB Cloud](https://tidbcloud.com) (Serverless/Starter). Create a database named `launchwright` and copy the connection string, adding `?sslaccept=strict`.
2. From your computer, with `DATABASE_URL` set to that string, run `npm run db:push` once to create the tables.
3. **Website:** on [Netlify](https://app.netlify.com), choose *Add new site → Import from GitHub* and pick this repository. Netlify detects Next.js automatically.
4. In Netlify *Site configuration → Environment variables*, add `DATABASE_URL`, `ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH` and `SESSION_SECRET`, then redeploy.
5. When you buy a domain, add it under *Domain management* in Netlify.

Public pages are cached and refreshed automatically whenever you change something in the admin panel, so visitors get fast pages without waiting for the database.

## Changing contact details

Edit `src/lib/site.ts` (phone, WhatsApp, email).
