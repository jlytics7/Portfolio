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
 * Landscape and portrait images mix well here; the grid is a masonry layout.
 *
 * Note: `photo-02` is a reserved slot — the second image has not been exported
 * yet, so entries run photo-01, photo-03, photo-04, photo-05.
 */
export const galleryItems: GalleryItem[] = [
  {
    id: "photo-01",
    src: "/images/photography/photo-01.jpg",
    alt: "Amber and cream concentric curves sweeping across a dark, textured surface.",
    caption: "Concentric curves in amber and cream",
    tag: "Colour study",
    width: 206,
    height: 206,
  },
  {
    id: "photo-03",
    src: "/images/photography/photo-03.jpg",
    alt: "Teal and ivory organic forms drifting over a black background with hints of crimson.",
    caption: "Teal and ivory forms against black",
    tag: "Colour study",
    width: 206,
    height: 206,
  },
  {
    id: "photo-04",
    src: "/images/photography/photo-04.jpg",
    alt: "Clusters of saturated red, green, blue and white spheres bunched together on black.",
    caption: "Saturated clusters, held on black",
    tag: "Colour study",
    width: 206,
    height: 206,
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
