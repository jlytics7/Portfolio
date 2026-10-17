import { ArrowUpRight, Mail } from "lucide-react";

import { ContactForm } from "@/components/contact/contact-form";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { socials } from "@/data/socials";
import { cn } from "@/lib/utils";

const icons: Record<string, React.ComponentType<{ className?: string }>> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  email: Mail,
};

/**
 * Contact.
 *
 * The direct channels are listed first — some visitors would rather just send
 * an email than fill in a form, and the form genuinely may not have a backend.
 */
export function Contact() {
  return (
    <Section id="contact" labelledBy="contact-heading" className="grain">
      <SectionHeading
        id="contact-heading"
        overline="Contact"
        title="Let's talk about the work, or the opportunity."
        description="Whether it's an internship, an entry-level role, or a project you want a second pair of eyes on — I read everything that comes in."
      />

      {/* `minmax(0, …)` instead of a bare `fr` — long unbreakable strings
          (like a LinkedIn URL) would otherwise grow the track past the
          container and cause horizontal scrolling on small screens. */}
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-14">
        {/* Direct channels --------------------------------------------- */}
        <div className="min-w-0">
          <Reveal>
            <p className="text-[0.9375rem] leading-relaxed text-ink-muted">
              I&apos;m at the start of my career and actively building towards it.
              The quickest way to reach me is email — if you&apos;d rather look
              at my work first, everything is linked above.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="mt-8 flex flex-col gap-3">
              {socials.map((social) => {
                const Icon = icons[social.id];
                const isMail = social.href.startsWith("mailto:");

                return (
                  <li key={social.id}>
                    <a
                      href={social.href}
                      target={isMail ? undefined : "_blank"}
                      rel={isMail ? undefined : "noreferrer noopener"}
                      title={
                        social.isPlaceholder
                          ? "Placeholder link — update it in src/data/socials.ts"
                          : undefined
                      }
                      className={cn(
                        "group flex items-center gap-4 rounded-2xl border bg-surface p-4 transition-[border-color,box-shadow] duration-300 hover:shadow-card",
                        social.isPlaceholder
                          ? "border-dashed border-warn/50"
                          : "border-line hover:border-line-strong",
                      )}
                    >
                      <span
                        aria-hidden
                        className="grid size-10 shrink-0 place-items-center rounded-xl border border-line bg-canvas-subtle text-accent"
                      >
                        {Icon ? <Icon className="size-[1.05rem]" /> : null}
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="block font-mono text-[0.6875rem] tracking-wider text-ink-subtle uppercase">
                          {social.label}
                        </span>
                        <span className="mt-0.5 block truncate text-[0.875rem] text-ink">
                          {social.display}
                        </span>
                      </span>

                      <ArrowUpRight
                        aria-hidden
                        className="size-4 shrink-0 text-ink-subtle transition-colors group-hover:text-accent"
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>

        {/* Form --------------------------------------------------------- */}
        <Reveal delay={0.15} className="min-w-0">
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}
