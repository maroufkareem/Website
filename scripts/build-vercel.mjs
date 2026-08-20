import { cp, mkdir } from "node:fs/promises";

await mkdir("vercel-output", { recursive: true });
await cp("index.html", "vercel-output/index.html");
