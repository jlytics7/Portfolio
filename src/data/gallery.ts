import type { GalleryItem } from "@/types/content";

/**
 * Photography & creative work.
 *
 * The images below are generated placeholder tiles, not photographs. To use
 * your own work:
 *
 *   1. Drop your files into `public/images/photography/`
 *   2. Point `src` at them, e.g. "/images/photography/street-01.jpg"
 *   3. Set `width` and `height` to the image's real pixel dimensions — these
 *      keep the grid from shifting while images load
 *   4. Write a real `alt` sentence describing the photo for screen readers
 *
 * Landscape and portrait images mix well here; the grid is a masonry layout.
 */
export const galleryItems: GalleryItem[] = [
  {
    id: "photo-01",
    src: "/images/photography/photo-01.svg",
    alt: "Placeholder tile — replace with one of your photographs.",
    caption: "Your photograph goes here",
    tag: "Placeholder",
    width: 1200,
    height: 1500,
  },
  {
    id: "photo-02",
    src: "/images/photography/photo-02.svg",
    alt: "Placeholder tile — replace with one of your photographs.",
    caption: "Your photograph goes here",
    tag: "Placeholder",
    width: 1600,
    height: 1067,
  },
  {
    id: "photo-03",
    src: "/images/photography/photo-03.svg",
    alt: "Placeholder tile — replace with one of your photographs.",
    caption: "Your photograph goes here",
    tag: "Placeholder",
    width: 1200,
    height: 1200,
  },
  {
    id: "photo-04",
    src: "/images/photography/photo-04.svg",
    alt: "Placeholder tile — replace with one of your photographs.",
    caption: "Your photograph goes here",
    tag: "Placeholder",
    width: 1200,
    height: 1500,
  },
  {
    id: "photo-05",
    src: "/images/photography/photo-05.svg",
    alt: "Placeholder tile — replace with one of your photographs.",
    caption: "Your photograph goes here",
    tag: "Placeholder",
    width: 1600,
    height: 1067,
  },
  {
    id: "photo-06",
    src: "/images/photography/photo-06.svg",
    alt: "Placeholder tile — replace with one of your photographs.",
    caption: "Your photograph goes here",
    tag: "Placeholder",
    width: 1200,
    height: 900,
  },
];

/** Set to `false` to hide the Creative section entirely. */
export const showCreativeSection = true;
