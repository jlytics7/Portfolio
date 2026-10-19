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
          className="mx-auto grid h-16 w-full max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-5 sm:px-8"
        >
          {/* Wordmark ---------------------------------------------------- */}
          <a
            href="#home"
            className="group justify-self-start"
            aria-label={`${profile.fullName} — back to top`}
          >
            <span className="font-display text-[1.375rem] font-extrabold tracking-tight text-ink">
              {profile.initials}
              <span className="text-accent-solid transition-colors duration-200 group-hover:text-accent">
                .
              </span>
            </span>
          </a>

          {/* Desktop links — optically centred by the grid, not by flex ----- */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const isActive = item.id === activeId;

              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative block px-3 py-2.5 text-[0.75rem] font-medium tracking-[0.12em] uppercase transition-colors duration-200",
                      isActive
                        ? "text-ink"
                        : "text-ink-muted hover:text-ink",
                    )}
                  >
                    {item.label}
                    {/* The underline slides between items rather than fading. */}
                    {isActive ? (
                      <m.span
                        aria-hidden
                        layoutId="nav-active-rule"
                        className="absolute inset-x-2.5 bottom-0.5 h-[2px] rounded-full bg-accent-solid"
                        transition={{
                          type: "spring",
                          stiffness: 420,
                          damping: 36,
                        }}
                      />
                    ) : null}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Actions ------------------------------------------------------
              `col-start-3` matters: on mobile the link list is `display:none`,
              which removes its `auto` track from the grid entirely. Without an
              explicit placement the actions would slide into column 2 and stop
              being right-aligned. */}
          <div className="col-start-3 flex shrink-0 items-center justify-end gap-2">
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
