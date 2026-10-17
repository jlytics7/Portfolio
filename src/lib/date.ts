import { cacheLife } from "next/cache";

/**
 * The copyright year.
 *
 * With Cache Components enabled, `new Date()` is a "blocking prerender" value:
 * it can differ between renders, so Next.js requires an explicit decision about
 * when it is captured. Wrapping it in `"use cache"` captures it into the static
 * shell at build time — which is exactly what a copyright year wants.
 *
 * `max` is the right profile here: stable content that rarely changes. The
 * value still refreshes on every deploy, because a new build produces new
 * cache keys.
 *
 * If you would rather the year were computed per request, wrap the footer's
 * year in a `<Suspense>` boundary and `await io()` from `next/cache` instead.
 */
export async function getCopyrightYear(): Promise<number> {
  "use cache";
  cacheLife("max");

  return new Date().getFullYear();
}

/**
 * The date the site was last built, as an ISO string.
 *
 * Used for the sitemap's `lastModified`. Cached the same way as the copyright
 * year so the route stays fully static: without this, `new Date()` in
 * `sitemap.ts` marks the whole route as dynamic and it becomes a serverless
 * function for no benefit.
 */
export async function getBuildDate(): Promise<string> {
  "use cache";
  cacheLife("max");

  return new Date().toISOString();
}
