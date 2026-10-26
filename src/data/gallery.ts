import type { GalleryItem } from "@/types/content";

/**
 * Photography & creative work.
 *
 * To add more:
 *
 *   1. Drop your files into `public/images/photography/`
 *   2. Point `src` at them, e.g. "/images/photography/photo-06.jpg"
 *   3. Set `width` and `height` to the image's real pixel dimensions — these
 *      keep the grid from shifting while images load
 *   4. Write a real `alt` sentence describing the photo for screen readers
 *
 * Landscape and portrait images mix well here; the grid fills one row at a
 * time. Wide (landscape) images span more columns so the grid never leaves a
 * hole beneath a short column.
 */
export const galleryItems: GalleryItem[] = [
  {
    id: "photo-01",
    src: "/images/photography/photo-01.jpg",
    alt: "Portrait-format photography study in soft, natural tones.",
    caption: "Soft tones portrait study",
    tag: "Photography",
    width: 532,
    height: 800,
  },
  {
    id: "photo-02",
    src: "/images/photography/photo-02.jpg",
    alt: "Landscape-format photography with balanced composition and natural light.",
    caption: "Balanced landscape study",
    tag: "Photography",
    width: 800,
    height: 532,
  },
  {
    id: "photo-03",
    src: "/images/photography/photo-03.jpg",
    alt: "Portrait-format photography with rich, warm color palette.",
    caption: "Warm palette portrait study",
    tag: "Photography",
    width: 532,
    height: 800,
  },
  {
    id: "photo-04",
    src: "/images/photography/photo-04.jpg",
    alt: "Landscape-format photography showing open space and texture.",
    caption: "Open texture landscape study",
    tag: "Photography",
    width: 800,
    height: 532,
  },
  {
    id: "photo-05",
    src: "/images/photography/photo-05.jpg",
    alt: "A visitor stands with their back to the camera, looking at framed prints on a pale gallery wall.",
    caption: "Between two frames",
    tag: "Gallery",
    width: 2048,
    height: 1362,
  },
];

/** Set to `false` to hide the Creative section entirely. */
export const showCreativeSection = true;
