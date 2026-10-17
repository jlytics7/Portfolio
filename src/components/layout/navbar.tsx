"use client";

import { m } from "framer-motion";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";

import { MobileMenu } from "@/components/layout/mobile-menu";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { ResumeButton } from "@/components/ui/resume-button";
import { navItems } from "@/data/nav";
import { profile } from "@/data/profile";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";

/** Module-level so the scroll-spy effect never re-subscribes. */
const sectionIds = navItems.map((item) => item.id);

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const activeId = useActiveSection(sectionIds);

  /**
   * The frosted background only appears once the page has moved. At the very
   * top the nav sits flush on the hero, which keeps the opening screen clean.
   */
  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 12);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
          scrolled
            ? "border-b border-line bg-canvas/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <nav
          aria-label="Main"
          className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-8"
        >
          {/* Wordmark ---------------------------------------------------- */}
          <a
            href="#home"
            className="group flex shrink-0 items-center gap-2.5"
            aria-label={`${profile.fullName} — back to top`}
          >
            <span
              aria-hidden
              className="grid size-9 place-items-center rounded-xl border border-line-strong bg-surface font-mono text-[0.6875rem] font-semibold tracking-wider text-accent transition-colors duration-200 group-hover:border-accent-solid"
            >
              {profile.initials}
            </span>
            <span className="hidden font-display text-sm font-semibold tracking-tight text-ink xl:block">
              {profile.shortName}
            </span>
          </a>

          {/* Desktop links ----------------------------------------------- */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const isActive = item.id === activeId;

              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative isolate block rounded-full px-3.5 py-2 text-[0.8125rem] font-medium transition-colors duration-200",
                      isActive
                        ? "text-accent"
                        : "text-ink-muted hover:text-ink",
                    )}
                  >
                    {isActive ? (
                      <m.span
                        aria-hidden
                        layoutId="nav-active-pill"
                        className="absolute inset-0 -z-10 rounded-full border border-line bg-canvas-subtle"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 34,
                        }}
                      />
                    ) : null}
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Actions ------------------------------------------------------ */}
          <div className="flex shrink-0 items-center gap-2">
            <ThemeToggle />
            <ResumeButton
              variant="secondary"
              size="sm"
              className="hidden md:inline-flex"
            />
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="grid size-10 place-items-center rounded-full border border-line bg-surface text-ink-muted transition-colors duration-200 hover:border-accent-solid hover:text-accent lg:hidden"
            >
              <Menu aria-hidden className="size-[1.05rem]" />
            </button>
          </div>
        </nav>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        activeId={activeId}
      />
    </>
  );
}
