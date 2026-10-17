import type { Variants } from "framer-motion";

/**
 * Shared animation language.
 *
 * One easing curve and one distance value keep the whole site feeling like a
 * single designed object instead of a stack of unrelated effects.
 */
export const EASE = [0.16, 1, 0.3, 1] as const;

export const DURATION = {
  fast: 0.35,
  base: 0.55,
  slow: 0.8,
} as const;

/** Parent wrapper that staggers its children. */
export const staggerContainer = (
  stagger = 0.06,
  delayChildren = 0,
): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

/** The default "rise into place" entrance. */
export const riseIn: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE },
  },
};

/** Subtle scale-in, used for media and cards. */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: DURATION.base, ease: EASE },
  },
};

/** Horizontal entrance for side-by-side layouts. */
export const slideIn = (from: "left" | "right"): Variants => ({
  hidden: { opacity: 0, x: from === "left" ? -26 : 26 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DURATION.slow, ease: EASE },
  },
});

/** Shared viewport config so every section reveals at the same point. */
export const viewportOnce = { once: true, amount: 0.2 } as const;
