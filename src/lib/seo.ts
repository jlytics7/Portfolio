import { profile } from "@/data/profile";
import { siteConfig } from "@/data/site";
import { socials } from "@/data/socials";

/**
 * JSON-LD structured data.
 *
 * These tell search engines that this page is a person and a website. Links
 * marked as placeholders in `src/data/socials.ts` are deliberately excluded —
 * publishing a schema that points at `your-username` would be worse than
 * publishing no schema at all.
 */

const realProfileUrls = socials
  .filter((social) => !social.isPlaceholder && !social.href.startsWith("mailto:"))
  .map((social) => social.href);

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.fullName,
    alternateName: profile.initials,
    jobTitle: profile.headline,
    description: siteConfig.shortDescription,
    url: siteConfig.url,
    ...(realProfileUrls.length > 0 ? { sameAs: realProfileUrls } : {}),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.shortDescription,
    inLanguage: "en",
  };
}
