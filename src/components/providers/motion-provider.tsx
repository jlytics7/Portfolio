"use client";

import { LazyMotion, domMax } from "framer-motion";

/**
 * Framer Motion bundle control.
 *
 * `LazyMotion` loads the animation engine asynchronously instead of shipping it
 * in the initial bundle. `domMax` (rather than `domAnimation`) is required
 * because the nav's sliding active pill and the project grid's filter reflow
 * both use layout animations.
 *
 * Because of this, animated components must import `m` rather than `motion`:
 *   import { m } from "framer-motion"
 * Using `motion.*` still works but pulls in the full bundle and defeats the
 * optimisation. `AnimatePresence` is unaffected and imported normally.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <LazyMotion features={domMax}>{children}</LazyMotion>;
}
