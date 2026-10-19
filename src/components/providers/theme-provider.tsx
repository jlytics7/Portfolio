"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
} from "react";

export type Theme = "light" | "dark";

interface ThemeContextValue {
  /** Flips between light and dark, persists the choice, updates the DOM. */
  toggleTheme: () => void;
  /** Applies a specific theme and persists it. */
  setTheme: (theme: Theme) => void;
  /** Reads the theme currently applied to <html>. Not reactive by design. */
  getTheme: () => Theme;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "theme";

/**
 * The `data-theme` attribute on <html> is the single source of truth.
 *
 * Deliberately not mirrored into React state: in development, Strict Mode
 * remounts the tree and resets <html> to only the attributes React manages
 * from JSX, which would leave a state copy describing a theme the DOM is no
 * longer showing. Reading the attribute at the moment it's needed removes that
 * whole class of bug — and since the toggle's icon is driven by CSS `dark:`
 * variants, nothing here needs to trigger a re-render.
 */
function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);

  /*
   * The <meta name="theme-color"> tags in the layout follow the *OS*
   * preference via their media attributes, which is the right no-JS default
   * but wrong once someone flips the site's own toggle. Overwriting them here
   * keeps the mobile browser chrome in step with what's actually on screen.
   *
   * The value is read back off the cascade rather than kept in a constant.
   * A hardcoded map has to be edited in lockstep with `--canvas`, and the
   * moment it isn't the browser chrome silently disagrees with the page — so
   * asking the element itself is both less code and impossible to get stale.
   */
  const canvas = getComputedStyle(document.documentElement)
    .getPropertyValue("--canvas")
    .trim();

  if (!canvas) return;

  for (const meta of document.querySelectorAll<HTMLMetaElement>(
    'meta[name="theme-color"]',
  )) {
    meta.content = canvas;
  }
}

function getTheme(): Theme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.getAttribute("data-theme") === "dark"
    ? "dark"
    : "light";
}

function readStoredTheme(): Theme | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === "light" || stored === "dark" ? stored : null;
  } catch {
    // Storage can be blocked (private mode, hardened settings).
    return null;
  }
}

function systemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  /**
   * The inline <head> script has already set the attribute before first paint.
   * This re-applies it because React's development remount clears attributes
   * it doesn't manage from JSX. Runs before paint, so there is no flash.
   * In production it is a harmless no-op.
   */
  useLayoutEffect(() => {
    applyTheme(readStoredTheme() ?? systemTheme());
  }, []);

  /** Keep following the OS preference while no explicit choice is stored. */
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    function handleChange(event: MediaQueryListEvent) {
      if (readStoredTheme()) return;
      applyTheme(event.matches ? "dark" : "light");
    }

    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  const setTheme = useCallback((next: Theme) => {
    applyTheme(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // The theme still applies for this session even if it can't persist.
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(getTheme() === "dark" ? "light" : "dark");
  }, [setTheme]);

  const value = useMemo(
    () => ({ toggleTheme, setTheme, getTheme }),
    [toggleTheme, setTheme],
  );

  return <ThemeContext value={value}>{children}</ThemeContext>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used inside a ThemeProvider");
  }
  return context;
}
