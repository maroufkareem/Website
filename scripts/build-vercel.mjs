import { cp } from "node:fs/promises";
import { writeStaticSite } from "./render-static-site.mjs";

await writeStaticSite("vercel-output");
await cp("public/marouf-assets", "vercel-output/marouf-assets", {
  recursive: true,
});
