import { neon } from "@neondatabase/serverless";
import { drizzle, type NeonHttpDatabase } from "drizzle-orm/neon-http";
import * as schema from "./schema";

let cached: NeonHttpDatabase<typeof schema> | null = null;

/**
 * Lazily creates (and memoizes) the Drizzle/Neon client. Deliberately NOT
 * connected at module import time so that `next build` can succeed without
 * `DATABASE_URL` being set (e.g. in CI or this sandbox with no live DB).
 */
export function getDb(): NeonHttpDatabase<typeof schema> {
  if (cached) return cached;

  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL is not set. Configure it in your environment (Vercel project settings or .env.local) before making database calls."
    );
  }

  const sql = neon(url);
  cached = drizzle(sql, { schema });
  return cached;
}
