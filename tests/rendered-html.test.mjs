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
  assert.match(html, /<title>The Marouf Method \| Cambridge Biology (?:&amp;|&) Psychology<\/title>/i);
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
  assert.match(layout, /The Marouf Method \| Cambridge Biology & Psychology/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.doesNotMatch(page + layout, /SkeletonPreview|codex-preview|Your site is taking shape/);
});

test("static Vercel entry keeps the Marouf look without WordPress runtime", async () => {
  const [staticIndex, packageJson] = await Promise.all([
    readFile(new URL("../index.html", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(staticIndex, /The Marouf Method \| Cambridge Biology & Psychology/);
  assert.match(staticIndex, /The Marouf Method/);
  assert.match(staticIndex, /href="\/about\/"/);
  assert.match(staticIndex, /href="\/courses\/"/);
  assert.match(staticIndex, /href="\/books\/"/);
  assert.match(staticIndex, /id="quizzes"/);
  assert.match(staticIndex, /data-track="register_header"/);
  assert.match(staticIndex, /#080808/);
  assert.match(staticIndex, /#C9A65A|#c9a65a/);
  assert.doesNotMatch(staticIndex, /et_pb_|wp-content|drkareemmarouf\.com/);
  assert.doesNotMatch(staticIndex, /<iframe|SkeletonPreview|codex-preview|Your site is taking shape/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});
