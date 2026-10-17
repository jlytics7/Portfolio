import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";

import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { ResumeButton } from "@/components/ui/resume-button";
import { SocialIconLinks } from "@/components/ui/social-links";
import { buttonStyles } from "@/components/ui/button";
import { profile } from "@/data/profile";

/**
 * Hero.
 *
 * Layout is deliberately asymmetric — the text column carries more weight than
 * the portrait, which stops it reading as a generic centred hero. The grid and
 * radial wash behind it are the only decoration on the whole page.
 */
export function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24"
    >
      {/* Background: faint grid fading out downwards --------------------- */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20 opacity-[0.55] [background-image:linear-gradient(to_right,var(--line)_1px,transparent_1px),linear-gradient(to_bottom,var(--line)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(ellipse_75%_55%_at_50%_0%,black,transparent)]"
      />
      {/* Background: soft accent glow ------------------------------------ */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-24 -z-10 size-[36rem] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--glow) 0%, transparent 68%)",
        }}
      />

      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <RevealGroup
          /* `content-center` + the min-height let the hero fill the first
             screen on tall displays instead of hugging the top and leaving a
             band of dead space above the About section. */
          className="grid items-center gap-14 lg:min-h-[calc(100svh-15rem)] lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:content-center lg:gap-16"
          stagger={0.08}
        >
          {/* ---------------------------------------------------------- */}
          {/* Copy                                                        */}
          {/* ---------------------------------------------------------- */}
          <div>
            {profile.availabilityNote ? (
              <RevealItem>
                <p className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/80 py-1.5 pr-4 pl-2.5 text-[0.8125rem] text-ink-muted backdrop-blur">
                  <span
                    aria-hidden
                    className="relative grid size-4 place-items-center"
                  >
                    <span className="absolute size-2 rounded-full bg-accent-solid/25" />
                    <span className="size-2 rounded-full bg-accent-solid" />
                  </span>
                  {profile.availabilityNote}
                </p>
              </RevealItem>
            ) : null}

            <RevealItem>
              <h1
                id="hero-heading"
                className="font-display text-[clamp(2.5rem,7.2vw,4.75rem)] leading-[0.98] font-semibold tracking-[-0.03em] text-ink"
              >
                {profile.fullName}
              </h1>
            </RevealItem>

            <RevealItem>
              <p className="mt-6 flex items-center gap-3 font-mono text-[0.8125rem] tracking-[0.1em] text-accent uppercase">
                <span aria-hidden className="h-px w-8 bg-accent-solid/60" />
                {profile.headline}
              </p>
            </RevealItem>

            <RevealItem>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-muted sm:text-[1.0625rem]">
                {profile.intro}
              </p>
            </RevealItem>

            <RevealItem>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a
                  href="#projects"
                  className={buttonStyles({ variant: "primary", size: "lg" })}
                >
                  View My Projects
                  <ArrowRight aria-hidden className="size-4" />
                </a>
                <ResumeButton variant="secondary" size="lg" />
              </div>
            </RevealItem>

            <RevealItem>
              <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
                <SocialIconLinks />
                {profile.location ? (
                  <p className="flex items-center gap-1.5 font-mono text-[0.6875rem] tracking-wide text-ink-subtle">
                    <MapPin aria-hidden className="size-3.5" />
                    {profile.location}
                  </p>
                ) : null}
              </div>
            </RevealItem>
          </div>

          {/* ---------------------------------------------------------- */}
          {/* Portrait                                                    */}
          {/* ---------------------------------------------------------- */}
          <RevealItem className="lg:justify-self-end">
            <div className="relative w-full max-w-[22rem] lg:max-w-none">
              {/* Offset accent frame */}
              <div
                aria-hidden
                className="absolute -inset-x-3 -inset-y-3 -z-10 rounded-[2rem] border border-accent-solid/25"
              />

              <figure className="overflow-hidden rounded-[1.75rem] border border-line bg-surface shadow-lift">
                <div className="relative aspect-4/5 w-full">
                  <Image
                    src={profile.photo}
                    alt={profile.photoAlt}
                    fill
                    priority
                    sizes="(min-width: 1024px) 34vw, (min-width: 640px) 60vw, 88vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="flex items-center justify-between gap-4 border-t border-line px-4 py-3">
                  <span className="font-mono text-[0.6875rem] tracking-wider text-ink-subtle uppercase">
                    Portrait
                  </span>
                  {/* Disappears automatically once a real photo is in place. */}
                  {profile.photo.includes("placeholder") ? (
                    <span className="font-mono text-[0.6875rem] text-warn">
                      Placeholder image
                    </span>
                  ) : null}
                </figcaption>
              </figure>
            </div>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}
