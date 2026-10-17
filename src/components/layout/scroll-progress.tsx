"use client";

import { m, useReducedMotion, useScroll, useSpring } from "framer-motion";

/**
 * Thin progress bar pinned to the very top of the viewport.
 *
 * Sits above the nav (z-60 vs z-50) so it reads as a property of the page
 * rather than of the header.
 */
export function ScrollProgress() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  // The spring smooths out wheel and trackpad jumps. With reduced motion we
  // track the scroll position directly instead.
  const smooth = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <m.div
      aria-hidden
      style={{ scaleX: reduceMotion ? scrollYProgress : smooth }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-accent-solid"
    />
  );
}
