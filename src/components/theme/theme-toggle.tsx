"use client";

import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";

/**
 * Light/dark switch.
 *
 * The icon is chosen with CSS (`dark:` variants keyed off the `data-theme`
 * attribute) rather than React state. That means the correct icon is painted
 * before hydration and there is nothing to mismatch, and the label stays
 * static so it is safe to render on the server.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle light and dark theme"
      className={cn(
        "grid size-10 shrink-0 place-items-center rounded-full border border-line bg-surface text-ink-muted",
        "transition-[color,border-color,background-color] duration-200",
        "hover:border-accent-solid/50 hover:text-accent",
        className,
      )}
    >
      <Sun aria-hidden className="hidden size-[1.05rem] dark:block" />
      <Moon aria-hidden className="block size-[1.05rem] dark:hidden" />
    </button>
  );
}
