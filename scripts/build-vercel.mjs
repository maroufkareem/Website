import { cp, mkdir, rm } from "node:fs/promises";

await rm("vercel-output", { recursive: true, force: true });
await mkdir("vercel-output", { recursive: true });
await cp("index.html", "vercel-output/index.html");
await cp("public/marouf-assets", "vercel-output/marouf-assets", {
  recursive: true,
});
