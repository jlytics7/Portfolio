/**
 * Site-wide settings used for SEO metadata, the sitemap and the manifest.
 *
 * `url` below resolves to `https://jessicamiranda.dev` — the domain listed on
 * your LinkedIn. If you deploy somewhere else, set `NEXT_PUBLIC_SITE_URL` (see
 * `.env.example`); it is used to build the absolute URLs for canonical tags,
 * Open Graph images and the sitemap, so search engines and link previews need
 * it to be correct.
 */

/**
 * Canonical origin, no trailing slash.
 *
 * Resolution order:
 *   1. `NEXT_PUBLIC_SITE_URL` — overrides everything below.
 *   2. Vercel's own production URL, so a first deploy already emits correct
 *      canonical and Open Graph URLs without any edits.
 *   3. The custom domain listed on your LinkedIn, so a deploy is correct even
 *      before any environment variable is set.
 */
const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : undefined) ??
  "https://jessicamiranda.dev"
).replace(/\/+$/, "");

export const siteConfig = {
  /** Canonical origin, no trailing slash. */
  url: siteUrl,
  name: "Jessica Lindsey Miranda",
  title: "Jessica Lindsey Miranda — Aspiring IT Professional",
  shortDescription:
    "Information Technology student majoring in Business Analytics Management, focused on data analytics and web development.",
  description:
    "Portfolio of Jessica Lindsey Miranda, an Information Technology student at the University of Iloilo majoring in Business Analytics Management, with a growing focus on data analytics and web development. Academic projects, certifications and creative work.",
  keywords: [
    "Jessica Lindsey Miranda",
    "IT portfolio",
    "Information Technology student",
    "University of Iloilo",
    "Business Analytics Management",
    "data analyst",
    "data analytics",
    "web development portfolio",
    "Iloilo Philippines",
    "entry level developer",
  ],
  locale: "en_US",
  /** Update when you have one; used as the Open Graph image alt text. */
  ogImageAlt:
    "Jessica Lindsey Miranda — Aspiring IT Professional portfolio preview.",
} as const;

/** Shown in the README checklist as well, so nothing gets missed. */
export const placeholderNotice =
  "This is placeholder content. Replace it in src/data/.";
