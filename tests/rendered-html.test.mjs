import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the fast native Marouf Method page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Home Page - The Marouf Method<\/title>/i);
  assert.match(html, /DR\. KAREEM WAEL MAAROUF/);
  assert.match(html, /Where\s*Knowledge\s*Becomes\s*Mastery/);
  assert.match(html, /Cambridge Biology O Level/);
  assert.match(html, /Cambridge Psychology O Level/);
  assert.match(html, /class="hero"/);
  assert.doesNotMatch(html, /<iframe/i);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|SkeletonPreview/);
});

test("source is free of temporary starter preview code", async () => {
  const [page, styles, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /The Marouf Method/);
  assert.match(styles, /\/marouf-assets\/hero\.jpg/);
  assert.match(layout, /Home Page - The Marouf Method/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.doesNotMatch(page + layout, /SkeletonPreview|codex-preview|Your site is taking shape/);
});

test("static Vercel entry mirrors the live Marouf page", async () => {
  const [staticIndex, packageJson] = await Promise.all([
    readFile(new URL("../index.html", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(staticIndex, /Home Page &#8211; The Marouf Method|Home Page – The Marouf Method/);
  assert.match(staticIndex, /et_pb_section_0_tb_header/);
  assert.match(staticIndex, /dr_kareem_hero_exact_optimized\.jpg/);
  assert.match(staticIndex, /The Marouf Method/);
  assert.match(staticIndex, /#080808/);
  assert.match(staticIndex, /#C9A65A|#c9a65a/);
  assert.doesNotMatch(staticIndex, /<iframe|SkeletonPreview|codex-preview|Your site is taking shape/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});
