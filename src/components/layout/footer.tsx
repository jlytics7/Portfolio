import { Mail } from "lucide-react";

import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";
import { navItems } from "@/data/nav";
import { profile } from "@/data/profile";
import { siteConfig } from "@/data/site";
import { socials } from "@/data/socials";
import { getCopyrightYear } from "@/lib/date";
import { cn } from "@/lib/utils";

const socialIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  email: Mail,
};

export async function Footer() {
  // Captured into the static shell at build time — see src/lib/date.ts.
  const year = await getCopyrightYear();

  return (
    <footer className="grain relative border-t border-line bg-canvas-subtle">
      <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          {/* Identity --------------------------------------------------- */}
          <div className="max-w-sm">
            <a
              href="#home"
              className="inline-flex items-center gap-3"
              aria-label={`${profile.fullName} — back to top`}
            >
              <span
                aria-hidden
                className="grid size-10 place-items-center rounded-xl border border-line-strong bg-surface font-mono text-xs font-semibold tracking-wider text-accent"
              >
                {profile.initials}
              </span>
              <span className="font-display text-sm font-semibold tracking-tight text-ink">
                {profile.fullName}
              </span>
            </a>

            <p className="mt-5 text-sm leading-relaxed text-ink-muted">
              {profile.headline} — {siteConfig.shortDescription}
            </p>

            <ul className="mt-6 flex items-center gap-2">
              {socials.map((social) => {
                const Icon = socialIcons[social.id];
                const isMail = social.href.startsWith("mailto:");

                return (
                  <li key={social.id}>
                    <a
                      href={social.href}
                      target={isMail ? undefined : "_blank"}
                      rel={isMail ? undefined : "noreferrer noopener"}
                      aria-label={social.label}
                      title={
                        social.isPlaceholder
                          ? `${social.label} — placeholder link, update src/data/socials.ts`
                          : social.label
                      }
                      className={cn(
                        "grid size-10 place-items-center rounded-full border bg-surface text-ink-muted transition-colors duration-200 hover:border-accent-solid hover:text-accent",
                        social.isPlaceholder
                          ? "border-dashed border-warn/60"
                          : "border-line",
                      )}
                    >
                      {Icon ? <Icon className="size-[1.05rem]" /> : null}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Navigation -------------------------------------------------- */}
          <nav aria-label="Footer" className="lg:pt-1">
            <h2 className="overline mb-5">Navigate</h2>
            <ul className="grid grid-cols-2 gap-x-12 gap-y-2.5 sm:grid-cols-3 lg:gap-x-16">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-sm text-ink-muted transition-colors duration-200 hover:text-accent"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div aria-hidden className="hairline my-10" />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-ink-subtle">
            © {year} {profile.fullName}. All rights reserved.
          </p>
          <p className="font-mono text-[0.6875rem] tracking-wide text-ink-subtle">
            Built with Next.js, TypeScript &amp; Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
