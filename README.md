# The Marouf Method — Site + Admin Panel

A Next.js (App Router) site for **The Marouf Method** (Dr. Kareem Wael Maarouf's
Cambridge Biology & Psychology tutoring brand), backed by **Postgres (Neon)**
via **Drizzle ORM**, with a no-code **admin panel** for editing content,
reviewing contact-form enquiries, and viewing basic traffic analytics.

## Stack

- **Next.js 16** (App Router), React 19, TypeScript
- **Postgres via Neon** (`@neondatabase/serverless`) + **Drizzle ORM**
- **bcryptjs** + **jose** for admin auth (signed JWT session cookie)
- **Vercel Blob** for image uploads in the admin panel
- Deploys natively on **Vercel** — no custom build/rewrite config needed

## Prerequisites

- Node.js `>=22.13.0`
- A Neon Postgres database (or any Postgres instance reachable via a
  `DATABASE_URL` connection string)

## Environment variables

Create a `.env.local` for local development (and set the same in your Vercel
project settings for deployment):

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | Postgres connection string (Neon). |
| `SESSION_SECRET` | Random secret used to sign admin session JWTs. |
| `ADMIN_EMAIL` | Email for the first admin user, used only by the seed script. |
| `ADMIN_PASSWORD` | Password for the first admin user, used only by the seed script. |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob token, used by the admin image-upload route. |

## Quick start

```bash
npm install

# Push the schema to your database (one-time / after schema changes)
npm run db:generate      # generates SQL migrations from db/schema.ts into ./drizzle
# then apply them with your preferred method (e.g. `npx drizzle-kit migrate`,
# or run the generated SQL directly against your Neon database)

# Seed the database with the site's original content + first admin user
DATABASE_URL=... ADMIN_EMAIL=you@example.com ADMIN_PASSWORD=change-me node scripts/seed.mjs

npm run dev
```

Visit `http://localhost:3000` for the public site and
`http://localhost:3000/admin/login` to sign in to the admin panel with the
seeded credentials (change the password from `/admin/settings/password` after
first login).

## Project structure

- `app/page.tsx` — the public site. An async Server Component that reads all
  content (hero/about/method/featured copy, programs, books, achievements,
  testimonials, nav) from the database via `db/queries.ts`, falling back to
  the site's original content (`app/lib/defaults.ts`) if the database is
  empty or briefly unreachable, so the public page never breaks.
- `app/components/ContactForm.tsx` — the real enrollment/contact form, POSTs
  to `app/api/enquiries/route.ts`.
- `app/components/PageViewBeacon.tsx` — fires one lightweight, cookie-free
  pageview beacon per visit to `app/api/analytics/pageview/route.ts`.
- `app/admin/*` — the admin panel (dashboard, enquiries, per-section content
  editors, analytics, change password), guarded by `middleware.ts`.
- `app/api/*` — enquiry submission, pageview beacon, admin login/logout, and
  admin image upload routes.
- `db/schema.ts` — Drizzle Postgres schema (admin_users, site_settings,
  programs, books, achievements, testimonials, nav_items, enquiries,
  page_views).
- `db/queries.ts` — typed query/mutation helpers used by pages, API routes,
  and Server Actions (no raw Drizzle queries scattered through the app).
- `db/index.ts` — lazy Neon/Drizzle client (`getDb()`), connected only when
  actually invoked so `next build` never requires a reachable database.
- `lib/auth.ts` / `lib/session.ts` — password hashing, session JWT sign/verify,
  and the server-side session reader.
- `scripts/seed.mjs` — one-time content + first-admin seed script.

## Useful commands

- `npm run dev` — start the local dev server
- `npm run build` — production build (type-checks and compiles all
  routes/server components; DB-backed routes use `force-dynamic` so they
  don't require a reachable database at build time)
- `npm start` — run the production build
- `npm run lint` — ESLint
- `npm test` — build, then run the source/schema smoke tests in
  `tests/rendered-html.test.mjs`
- `npm run db:generate` — generate Drizzle migrations from `db/schema.ts`
- `npm run seed` — alias for `node scripts/seed.mjs` (reads env vars above)

## Deploying

The app is a standard Next.js project — push to a Git repo connected to
Vercel and it will be auto-detected and built with no extra configuration.
Set the environment variables above in the Vercel project settings, provision
a Neon Postgres database and a Vercel Blob store from the Vercel dashboard
(or link an existing Neon project), run the migration + seed steps against
that database, and deploy.
