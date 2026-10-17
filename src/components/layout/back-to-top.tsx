"use client";

import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

const VISIBILITY_THRESHOLD = 700;

/** Floating "scroll back to top" control, revealed past the first screen. */
export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > VISIBILITY_THRESHOLD);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }

  return (
    <AnimatePresence>
      {visible ? (
        <m.button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          title="Back to top"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.9 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="fixed right-5 bottom-5 z-40 grid size-11 place-items-center rounded-full border border-line-strong bg-surface text-ink-muted shadow-lift transition-colors duration-200 hover:border-accent-solid hover:text-accent sm:right-8 sm:bottom-8"
        >
          <ArrowUp aria-hidden className="size-[1.05rem]" />
        </m.button>
      ) : null}
    </AnimatePresence>
  );
}
