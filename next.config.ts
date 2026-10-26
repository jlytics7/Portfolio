import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    /**
     * Default quality for optimized images. Bumped to 100 so source
     * photographs render as sharply as the original file allows.
     */
    quality: 100,
    /**
     * Image widths Next.js will generate on demand. Small source files
     * (e.g. the 206px photography thumbnails) won't be upscaled beyond
     * their intrinsic size, which prevents blur from upsampling.
     */
    deviceSizes: [206, 320, 640, 750, 828, 1080, 1200, 1920, 2048],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
