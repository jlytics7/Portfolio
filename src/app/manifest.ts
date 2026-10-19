import type { MetadataRoute } from "next";

import { profile } from "@/data/profile";
import { siteConfig } from "@/data/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.title,
    short_name: profile.shortName,
    description: siteConfig.shortDescription,
    start_url: "/",
    display: "standalone",
    /**
     * A manifest can only name one colour, but this site has two themes. The
     * per-theme `<meta name="theme-color">` in layout.tsx overrides this in
     * every browser that supports it, so these only cover the fallback case —
     * the light pair, which is the more common default.
     */
    background_color: "#fffcf2",
    theme_color: "#fffcf2",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
