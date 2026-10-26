import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { ResumeButton } from "@/components/ui/resume-button";
import { SocialIconLinks } from "@/components/ui/social-links";
import { buttonStyles } from "@/components/ui/button";
import { profile } from "@/data/profile";

/**
 * Hero.
 *
 * Three layers, all on the same z-stack:
 *   1. a giant pale wordmark, clipped by the section
 *   2. the portrait, bleeding off the right edge and fading into the canvas
 *   3. the copy, held to a narrow measure so it never reaches the photograph
 *
 * The portrait is deliberately not in a frame. It fades at its left edge
 * instead, which is what lets a studio background sit against the page colour
 * without reading as a pasted-in rectangle.
 */
export function Hero() {
  const [firstName, lastName] = profile.nameLines;

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden pt-28 pb-0 sm:pt-32 lg:flex lg:min-h-[100svh] lg:items-center lg:pt-36 lg:pb-32"
    >
      {/* Layer 1 — the watermark word ------------------------------------ */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-[6%] -z-20 select-none overflow-hidden"
      >
        {/*
          `text-accent-solid` at 7% reads as a tint of the brand colour rather
          than as grey, which keeps the page from going flat.
        */}
        <p className="-translate-y-[22%] font-mega text-[clamp(3.5rem,15vw,13rem)] leading-none tracking-[-0.03em] whitespace-nowrap text-accent-solid/[0.07] uppercase">
          Aspiring IT Professional
        </p>
      </div>

      {/* Layer 2 — portrait, full-bleed right (desktop) ------------------
          Two nested masks rather than one multi-gradient mask with
          `mask-composite: intersect`: nesting composes identically everywhere,
          and the support story is much better. The outer element fades the top
          so the photograph never runs up behind the nav bar — its studio-grey
          background would otherwise sit directly behind the nav links. */}
      <div className="pointer-events-none absolute inset-y-0 right-0 -z-10 hidden w-[42vw] [mask-image:linear-gradient(to_bottom,transparent_0%,black_16%)] lg:block xl:w-[46vw]">
        <div className="relative h-full w-full [mask-image:linear-gradient(to_right,transparent_0%,black_32%)]">
          <Image
            src={profile.photo}
            alt={profile.photoAlt}
            fill
            priority
            quality={100}
            sizes="46vw"
            className="object-cover object-top"
          />
        </div>
      </div>

      {/* Layer 3 — copy -------------------------------------------------- */}
      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">
        <RevealGroup
          className="max-w-[26rem] lg:max-w-[34rem] xl:max-w-[38rem]"
          stagger={0.07}
        >
          <RevealItem>
            {/*
              The eyebrow takes the shape of a closing tag, which suits a
              developer-facing hero. It carries `profile.headline`, so the hero
              headline stays real, announced content — the watermark behind it
              is `aria-hidden`, and a string that only exists as decoration is
              not a headline.
            */}
            <p className="mb-7 font-mono text-[0.8125rem] tracking-[0.14em] text-accent uppercase">
              <span aria-hidden className="text-ink-subtle">
                ‹&nbsp;
              </span>
              {profile.headline}
              <span aria-hidden className="text-ink-subtle">
                &nbsp;/&gt;
              </span>
            </p>
          </RevealItem>

          <RevealItem>
            <p className="text-[1.375rem] leading-snug text-ink-muted sm:text-[1.5rem]">
              Hi, I&apos;m
            </p>
          </RevealItem>

          <RevealItem>
            {/*
              Archivo Black at this size clears the WCAG "large text" bar
              (3:1) even using the brighter fill token — the light-mode accent
              text token is reserved for sizes where 4.5:1 is required.
            */}
            <h1
              id="hero-heading"
              className="mt-1 font-mega text-[clamp(2.75rem,9.5vw,6.25rem)] leading-[0.88] tracking-[-0.02em] text-ink uppercase"
            >
              <span className="block">{firstName}</span>
              <span className="block text-accent-solid">{lastName}</span>
            </h1>
          </RevealItem>

          <RevealItem>
            <p className="mt-7 max-w-lg text-base leading-relaxed text-ink-muted sm:text-[1.0625rem]">
              {profile.intro}
            </p>
          </RevealItem>

          <RevealItem>
            <div className="mt-9 flex flex-wrap items-center gap-x-2.5 gap-y-3">
              <a
                href="#projects"
                className={buttonStyles({ variant: "primary", size: "lg" })}
              >
                View My Projects
                <ArrowRight aria-hidden className="size-4" />
              </a>
              <ResumeButton variant="secondary" size="lg" />
              <a
                href="#contact"
                className={buttonStyles({ variant: "secondary", size: "lg" })}
              >
                Let&apos;s Talk
              </a>
            </div>
          </RevealItem>

          <RevealItem>
            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
              <SocialIconLinks />

              {/*
                The chip and the location share one row — two separate lines
                above the name would crowd out the hierarchy.
              */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                {profile.availabilityNote ? (
                  <p className="flex items-center gap-2 font-mono text-[0.6875rem] tracking-wide text-ink-subtle uppercase">
                    <span aria-hidden className="relative grid size-3.5 place-items-center">
                      <span className="absolute size-2 rounded-full bg-accent-solid/25" />
                      <span className="size-2 rounded-full bg-accent-solid" />
                    </span>
                    {profile.availabilityNote}
                  </p>
                ) : null}

                {profile.location ? (
                  <p className="font-mono text-[0.6875rem] tracking-wide text-ink-subtle">
                    {profile.location}
                  </p>
                ) : null}
              </div>
            </div>
          </RevealItem>
        </RevealGroup>
      </div>

      {/* Layer 2 — portrait, in flow (mobile) ---------------------------- */}
      <div className="relative mt-14 h-[24rem] w-full sm:h-[30rem] lg:hidden">
        <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,black_58%,transparent)]">
          {/*
            Same alt as the desktop copy: the other one is `display: none` at
            any given breakpoint, so assistive tech only ever meets one.
          */}
          <Image
            src={profile.photo}
            alt={profile.photoAlt}
            fill
            quality={100}
            sizes="100vw"
            className="object-cover object-top"
          />
        </div>
      </div>
    </section>
  );
}
