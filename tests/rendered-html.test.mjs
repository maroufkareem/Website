// Smoke test for the Next.js app. `npm test` runs `next build` first (see
// package.json), which is the primary check: it fails loudly if the app
// doesn't compile. The public page (app/page.tsx) is a database-backed
// server component (`export const dynamic = "force-dynamic"`), so it can't
// be rendered here without a live DATABASE_URL — instead these tests check
// that the source still contains the site's core content/structure and that
// the database schema/query layer it depends on is in place, preserving the
// "does this still look like the Marouf Method site" intent of the previous
// vinext-era test in a way that doesn't require a live database.
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const rootDir = new URL("..", import.meta.url);

test("source still contains the Marouf Method content and structure", async () => {
  const [page, styles, layout] = await Promise.all([
    readFile(new URL("app/page.tsx", rootDir), "utf8"),
    readFile(new URL("app/globals.css", rootDir), "utf8"),
    readFile(new URL("app/layout.tsx", rootDir), "utf8"),
  ]);

  assert.match(page, /The Marouf Method/);
  assert.match(page, /className="hero"/);
  assert.match(page, /className="enrollment"/);
  assert.match(page, /ContactForm/);
  assert.match(page, /PageViewBeacon/);
  assert.match(styles, /\/marouf-assets\/hero\.jpg/);
  assert.match(styles, /--gold: #C9A65A/);
  assert.match(layout, /The Marouf Method \| Cambridge Biology & Psychology/);
});

test("database schema and query layer are in place", async () => {
  const [schema, queries] = await Promise.all([
    readFile(new URL("db/schema.ts", rootDir), "utf8"),
    readFile(new URL("db/queries.ts", rootDir), "utf8"),
  ]);

  for (const table of ["adminUsers", "siteSettings", "programs", "books", "achievements", "testimonials", "navItems", "enquiries", "pageViews"]) {
    assert.match(schema, new RegExp(`export const ${table} = pgTable`));
  }
  assert.match(queries, /export async function createEnquiry/);
  assert.match(queries, /export async function recordPageView/);
});
