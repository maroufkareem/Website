# Site Analysis — The Marouf Method

## What this is
A single-page marketing/landing site for **"The Marouf Method"**, an online tutoring brand run by **Dr. Kareem Wael Maarouf** (a dentist by profession who teaches Cambridge/O-Level **Biology and Psychology**, grades 10–12). The codebase is a mirror/rebuild of the client's original WordPress site, now implemented as a native React/Next.js page for speed (per commit history: "Replace iframe with fast native landing page", "Mirror live Marouf page exactly").

## Tech stack
- **Framework:** Next.js (App Router) running on **vinext** (Cloudflare's Next-on-Workers style dev/build tool), deployable to **Cloudflare Workers** (`worker/index.ts`) with an ASSETS/D1/IMAGES binding setup.
- **Styling:** Tailwind CSS v4 imported via `@import "tailwindcss"` but the page is almost entirely hand-written CSS in [app/globals.css](app/globals.css) (877 lines) — Tailwind utility classes are barely used; this is really a custom design system with CSS variables.
- **Fonts:** Google Fonts — "Cinzel" (serif, for headings/brand) + "Open Sans" (body).
- **React 19** / **Next 16**-generation tooling, TypeScript, ESLint 9.
- **Data layer:** Drizzle ORM configured for Cloudflare D1, but [db/schema.ts](db/schema.ts) is intentionally empty — no database is actually used by the live site. An opt-in example lives in `examples/d1/`.
- **Auth scaffold:** [app/chatgpt-auth.ts](app/chatgpt-auth.ts) provides helpers for "Sign in with ChatGPT" (SIWC), a feature of the OpenAI/"Sites" hosting platform this starter is built for — unused by the current page, but available if account-gated pages are added later.
- **Alternate deploy path:** [vercel.json](vercel.json) + [scripts/build-vercel.mjs](scripts/build-vercel.mjs) produce a static `vercel-output/` bundle (plain `index.html` + assets) so the same site can also be hosted on Vercel as a static SPA-style rewrite.
- **Tests:** [tests/rendered-html.test.mjs](tests/rendered-html.test.mjs) builds the site and asserts the rendered HTML contains the Marouf Method content (smoke test, run via `npm test`).

## Page structure (`app/page.tsx`)
Single `Home` component, content-driven by small data arrays at the top of the file, rendered as sections in this order:
1. **Header/Nav** — fixed header, brand mark "M", nav links (Home, About, Courses, Books, Achievements, Testimonials, Contact, Quizzes), "REGISTER NOW" CTA.
2. **Hero** — full-bleed background, doctor name card, big serif headline "Where Knowledge Becomes Mastery", tagline, two CTA buttons (Explore Courses / Discover Books), badge row.
3. **Stats strip** — 4 stat callouts (5+ years, 3 books, grades 10–12, Bio & Psych specialization).
4. **About** — portrait image + bio copy + credentials list + CTA.
5. **Programs/Courses** — 2 program cards (Cambridge Biology O Level, Cambridge Psychology O Level, one priced at $400) with dates ("1 OCTOBER – 1 MAY") and reserve CTAs.
6. **Method** — 4-step "Understand / Connect / Practice / Master" methodology grid.
7. **Books** — 4 published resources (Grade 9 Biology, Grade 10 Biology O Level, Bio Capsule revision guide, Psychology O Level) with cover images and "Order Now" links.
8. **Featured guide** — highlighted "Complete Biology Companion" with feature checklist and two supporting images.
9. **Achievements/Credentials** — 4 credential blocks + pull-quote from Dr. Kareem.
10. **Testimonials** — 3 student quotes + a parent testimonial callout.
11. **Enrollment/Contact** — CTA section with `mailto:` and WhatsApp (`wa.me`) links, phone/email line.
12. **Footer** — brand blurb, quick links, program links, contact links (phone, email, Instagram/LinkedIn/TikTok placeholders — social hrefs are `#`, not real profiles), copyright.

All navigation both anchors to in-page sections (`#courses`, `#books`, etc.) and links to would-be sub-pages (`/about/`, `/contact/`, `/quizzes/`, etc.) that **don't currently exist** as routes in `app/` — this is a single-route site; those paths will 404 unless added.

## Design system ([app/globals.css](app/globals.css))
- **Palette:** near-black navy background (`--navy:#080808`, `--navy-2:#111111`, `--navy-3:#000000`), cream text (`--cream:#FCFAF6`), muted grey, and a **gold/bronze accent** (`--gold:#C9A65A`, `--bronze:#985e23`) used for eyebrows, borders, and highlighted spans — a premium/academic aesthetic.
- Smooth scrolling with `scroll-margin-top` compensation for the fixed header (recently added per "Make WordPress mirror phone ready" commit — implies responsive/mobile fixes were a recent focus).
- Fixed header with a subtle radial-gradient glow.
- Heavy use of custom classes per section (`.hero`, `.program-card`, `.book-card`, `.achievement-grid`, etc.) rather than Tailwind utilities — Tailwind is imported but effectively unused in the current markup.

## Assets ([public/marouf-assets/](public/marouf-assets/))
8 images: hero background, doctor portrait, 2 clinic/preview photos, and 4 book covers (grade 9, grade 10, bio capsule, psychology). All referenced directly by absolute `/marouf-assets/...` paths.

## Contact/business info surfaced in the code
- Email: `maroufkareem0@gmail.com`
- Phone/WhatsApp: `01114626999` (`+20 111 462 6999`)
- Pricing shown: Psychology O Level = `$400`; Biology O Level price is blank/not yet set.

## Housekeeping notes
- Two stray, **untracked duplicate files** exist in the working tree and are not part of git history:
  - `app/globals 2.css` — an older/lighter color palette (navy `#001d39`, cream `#fcfaf6`) predating the current near-black theme; looks like an editor auto-save backup, not used by the app (the real stylesheet is `app/globals.css`).
  - `tests/rendered-html.test 2.mjs` — an older test asserting a "site is taking shape" loading-skeleton placeholder page, superseded by the current test that checks for real Marouf Method content.
  - Recommend deleting both if they're not intentionally kept, since they're just clutter (`git status` already flags them as untracked).
- `examples/d1/` and the `.openai/hosting.json` D1/R2 bindings are unused scaffolding from the underlying "vinext-starter" template — the site has no real backend/data needs today.
- Social links (Instagram, LinkedIn, TikTok) in the footer are placeholder `#` hrefs — not wired to real profiles yet.
- Sub-nav routes (`/about/`, `/courses/`, `/books/`, `/achievements/`, `/testimonials/`, `/contact/`, `/quizzes/`) are referenced in the header/footer nav but don't exist as actual pages — everything currently lives on one route with in-page anchors.

## Recent history (git log, newest first)
1. Make WordPress mirror phone ready (mobile/responsiveness pass)
2. Restore exact Marouf WordPress mirror
3. Rebuild Marouf site with native WordPress-inspired design
4. Mirror live Marouf page exactly
5. Match live Marouf color palette
6. Use black site background
7. Replace iframe with fast native landing page (the pivot from embedding the old WP site to a real React rebuild)
8. Improve mobile viewport support
9. Add Vercel static deployment output
10. Mirror original Marouf design exactly
11. Build Marouf Method landing page (initial build)

This shows an iterative process of progressively matching the original WordPress site's exact design/colors while migrating it to a faster, natively-rendered stack, with mobile responsiveness as the most recent concern.
