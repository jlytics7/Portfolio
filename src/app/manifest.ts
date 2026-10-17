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
    background_color: "#080c0e",
    theme_color: "#12a594",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
