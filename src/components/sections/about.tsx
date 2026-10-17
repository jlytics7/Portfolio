import { Card } from "@/components/ui/card";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { ExperienceEducation } from "@/components/sections/experience";
import { profile } from "@/data/profile";

/**
 * About.
 *
 * All prose lives in `src/data/profile.ts` — `about` is an array, so adding or
 * removing a paragraph here needs no component changes. The right-hand card is
 * driven by `details`, so it can't drift out of sync with the prose, and the
 * Experience & Education block below is driven by `src/data/experience.ts`.
 */
export function About() {
  return (
    <Section id="about" labelledBy="about-heading">
      <SectionHeading
        id="about-heading"
        overline="About"
        title="Curious by default, and building on it."
        description="Where I'm studying, what I'm drawn to, and how I like to work."
      />

      <div className="grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.6fr)] lg:gap-16">
        {/* Prose ------------------------------------------------------- */}
        <RevealGroup className="space-y-5" stagger={0.07}>
          {profile.about.map((paragraph, index) => (
            <RevealItem key={index}>
              <p
                className={
                  index === 0
                    ? "text-[1.0625rem] leading-relaxed text-ink"
                    : "text-[0.9375rem] leading-relaxed text-ink-muted"
                }
              >
                {paragraph}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* At a glance ------------------------------------------------- */}
        <Reveal>
          <Card className="p-6 lg:sticky lg:top-24">
            <h3 className="overline mb-5">At a glance</h3>

            <dl className="divide-y divide-line">
              {profile.details.map((detail) => (
                <div key={detail.label} className="py-3.5 first:pt-0 last:pb-0">
                  <dt className="font-mono text-[0.6875rem] tracking-wider text-ink-subtle uppercase">
                    {detail.label}
                  </dt>
                  <dd className="mt-1.5 text-sm leading-snug text-ink">
                    {detail.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Card>
        </Reveal>
      </div>

      <ExperienceEducation />
    </Section>
  );
}
