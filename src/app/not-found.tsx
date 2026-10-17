import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";

import { buttonStyles } from "@/components/ui/button";
import { navItems } from "@/data/nav";

export const metadata: Metadata = {
  title: "Page not found",
  description:
    "That page doesn't exist. Head back to the portfolio to find what you were looking for.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="grain relative flex min-h-[80svh] items-center overflow-hidden">
      {/* Same faint grid as the hero, so the 404 still feels like the site. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20 opacity-50 [background-image:linear-gradient(to_right,var(--line)_1px,transparent_1px),linear-gradient(to_bottom,var(--line)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 left-1/2 -z-10 size-[34rem] -translate-x-1/2 rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, var(--glow) 0%, transparent 68%)",
        }}
      />

      <div className="mx-auto w-full max-w-6xl px-5 py-28 text-center sm:px-8">
        <p className="overline mb-6 justify-center">Error 404</p>

        <p
          aria-hidden
          className="font-display text-[clamp(4rem,18vw,10rem)] leading-none font-semibold tracking-tighter text-ink"
        >
          4<span className="text-accent">0</span>4
        </p>

        <h1 className="mt-6 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          This page wandered off
        </h1>

        <p className="mx-auto mt-4 max-w-md text-[0.9375rem] leading-relaxed text-ink-muted">
          The link may be outdated, or the page may never have existed. Either
          way, there&apos;s plenty to look at back on the main page.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className={buttonStyles({ variant: "primary", size: "lg" })}>
            <ArrowLeft aria-hidden className="size-4" />
            Back to the portfolio
          </Link>
        </div>

        {/* Quick jump back into the site. */}
        <nav aria-label="Site sections" className="mt-12">
          <p className="mb-4 flex items-center justify-center gap-2 font-mono text-[0.6875rem] tracking-wider text-ink-subtle uppercase">
            <Compass aria-hidden className="size-3.5" />
            Or jump straight to
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/#${item.id}`}
                  className="inline-flex rounded-full border border-line bg-surface px-3.5 py-2 text-[0.8125rem] text-ink-muted transition-colors duration-200 hover:border-line-strong hover:text-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
