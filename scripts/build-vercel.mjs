import { cp, mkdir } from "node:fs/promises";

await mkdir("vercel-output", { recursive: true });
await cp("index.html", "vercel-output/index.html");
await cp("public/marouf-assets", "vercel-output/marouf-assets", {
  recursive: true,
});
