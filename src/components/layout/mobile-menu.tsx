"use client";

import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { useEffect, useRef } from "react";

import { ResumeButton } from "@/components/ui/resume-button";
import { useLockBodyScroll } from "@/hooks/use-lock-body-scroll";
import { navItems } from "@/data/nav";
import { profile } from "@/data/profile";
import { socials } from "@/data/socials";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Full-screen navigation for small screens.
 *
 * Handles the things a modal menu is expected to do: locks background scroll,
 * closes on Escape, traps Tab focus inside the panel, and returns focus to the
 * trigger when it closes.
 */
export function MobileMenu({
  open,
  onClose,
  activeId,
}: {
  open: boolean;
  onClose: () => void;
  activeId: string;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useLockBodyScroll(open);

  /** Escape closes; Tab cycles within the panel. */
  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  /** Move focus into the panel when it opens. */
  useEffect(() => {
    if (open) panelRef.current?.focus();
  }, [open]);

  return (
    <AnimatePresence>
      {open ? (
        <m.div key="mobile-menu" className="fixed inset-0 z-[70] lg:hidden">
          <m.button
            type="button"
            aria-label="Close menu"
            tabIndex={-1}
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 h-full w-full cursor-default bg-canvas/70 backdrop-blur-sm"
          />

          <m.div
            ref={panelRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            tabIndex={-1}
            initial={reduceMotion ? { opacity: 0 } : { x: "100%" }}
            animate={reduceMotion ? { opacity: 1 } : { x: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { x: "100%" }}
            transition={{ duration: 0.4, ease: EASE }}
            className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col border-l border-line bg-surface shadow-lift outline-none"
          >
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-5">
              <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-ink-subtle uppercase">
                Menu
              </span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="grid size-10 place-items-center rounded-full border border-line text-ink-muted transition-colors hover:border-accent-solid hover:text-accent"
              >
                <X aria-hidden className="size-[1.05rem]" />
              </button>
            </div>

            <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 py-6">
              <ul className="flex flex-col gap-1">
                {navItems.map((item, index) => {
                  const isActive = item.id === activeId;

                  return (
                    <m.li
                      key={item.id}
                      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 18 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.35,
                        delay: reduceMotion ? 0 : 0.05 + index * 0.05,
                        ease: EASE,
                      }}
                    >
                      <a
                        href={`#${item.id}`}
                        onClick={onClose}
                        aria-current={isActive ? "true" : undefined}
                        className={cn(
                          "group flex items-center justify-between rounded-xl px-4 py-3.5 text-lg font-medium transition-colors duration-200",
                          isActive
                            ? "bg-accent-soft text-accent"
                            : "text-ink-muted hover:bg-canvas-subtle hover:text-ink",
                        )}
                      >
                        {item.label}
                        <span
                          aria-hidden
                          className={cn(
                            "font-mono text-[0.6875rem] tracking-wider transition-opacity",
                            isActive ? "opacity-70" : "opacity-0 group-hover:opacity-40",
                          )}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </a>
                    </m.li>
                  );
                })}
              </ul>

              <div className="mt-8">
                <ResumeButton
                  variant="primary"
                  size="md"
                  className="w-full"
                />
              </div>

              <div className="hairline my-8" aria-hidden />

              <p className="overline mb-4">Elsewhere</p>
              <ul className="flex flex-col gap-1">
                {socials.map((social) => (
                  <li key={social.id}>
                    <a
                      href={social.href}
                      target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                      rel={social.href.startsWith("mailto:") ? undefined : "noreferrer noopener"}
                      title={
                        social.isPlaceholder
                          ? "Placeholder link — update it in src/data/socials.ts"
                          : undefined
                      }
                      className={cn(
                        "inline-flex items-center gap-2 py-1.5 text-sm text-ink-muted transition-colors hover:text-accent",
                        social.isPlaceholder && "placeholder-link",
                      )}
                    >
                      {social.label}
                      <ArrowUpRight aria-hidden className="size-3.5" />
                    </a>
                  </li>
                ))}
              </ul>

              <p className="mt-8 font-mono text-[0.6875rem] text-ink-subtle">
                {profile.headline}
              </p>
            </nav>
          </m.div>
        </m.div>
      ) : null}
    </AnimatePresence>
  );
}
