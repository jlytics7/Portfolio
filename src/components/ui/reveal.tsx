"use client";

import { m, useReducedMotion, type Variants } from "framer-motion";

import { riseIn, staggerContainer, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Fade-only fallback used whenever the visitor has asked for reduced motion.
 * Content still appears deliberately — it just doesn't travel.
 */
const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
};

/**
 * Animates a single element into view on scroll.
 *
 * Pass module-level variant constants (from `@/lib/motion`) rather than object
 * literals — a new object identity on every render can retrigger the animation.
 */
export function Reveal({
  children,
  className,
  variants,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();
  const active = reduceMotion ? fadeIn : (variants ?? riseIn);

  return (
    <m.div
      className={className}
      data-reveal
      variants={active}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </m.div>
  );
}

/**
 * Parent for staggered groups. Combine with `<RevealItem>` children — the
 * parent drives the timing, so children must not set their own viewport.
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.06,
  delayChildren = 0,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <m.div
      className={className}
      data-reveal
      variants={reduceMotion ? fadeIn : staggerContainer(stagger, delayChildren)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {children}
    </m.div>
  );
}

/** A single animated child inside a `<RevealGroup>`. */
export function RevealItem({
  children,
  className,
  variants,
}: {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <m.div className={cn(className)} data-reveal variants={reduceMotion ? fadeIn : (variants ?? riseIn)}>
      {children}
    </m.div>
  );
}
