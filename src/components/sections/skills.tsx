import { SkillChip } from "@/components/ui/chip";
import { Card } from "@/components/ui/card";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import {
  featuredSkillCategoryId,
  skillCategories,
} from "@/data/skills";
import type { SkillCategory } from "@/types/content";
import { cn } from "@/lib/utils";

function SkillCategoryCard({
  category,
  featured = false,
}: {
  category: SkillCategory;
  featured?: boolean;
}) {
  const Icon = category.icon;

  return (
    <Card className="h-full bg-canvas-subtle p-6 transition-colors duration-300 hover:border-line-strong">
      <div className="flex items-start gap-4">
        <span
          aria-hidden
          className="grid size-11 shrink-0 place-items-center rounded-xl border border-line bg-surface text-accent"
        >
          <Icon className="size-[1.15rem]" />
        </span>

        <div className="min-w-0">
          <h3
            className={cn(
              "font-display font-semibold tracking-tight text-ink",
              featured ? "text-lg" : "text-base",
            )}
          >
            {category.title}
          </h3>
          <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-ink-muted">
            {category.description}
          </p>
        </div>
      </div>

      <ul
        className={cn(
          "mt-5",
          /*
           * The featured tile is twice as wide as its neighbours. A single
           * flex row of chips would leave a large empty block underneath it,
           * so the wide tile splits them into two balanced columns instead —
           * which uses the width and keeps its height in step with the tile
           * beside it.
           */
          featured ? "gap-x-3 sm:columns-2" : "flex flex-wrap gap-1.5",
        )}
      >
        {category.skills.map((skill) => (
          <li
            key={skill.name}
            className={featured ? "mb-1.5 break-inside-avoid" : undefined}
          >
            <SkillChip
              name={skill.name}
              level={skill.level}
              note={skill.note}
            />
          </li>
        ))}
      </ul>
    </Card>
  );
}

/**
 * Skills.
 *
 * Deliberately not a set of percentage bars. Proficiency indicators only
 * appear for skills where a `level` has actually been set in
 * `src/data/skills.ts`, which is the honest default for someone still
 * building their foundations.
 *
 * The first category in the data file becomes the wide "featured" tile; the
 * rest flow into the remaining columns.
 */
export function Skills() {
  const featured = skillCategories.find(
    (category) => category.id === featuredSkillCategoryId,
  );
  const rest = skillCategories.filter(
    (category) => category.id !== featuredSkillCategoryId,
  );

  return (
    <Section id="skills" labelledBy="skills-heading" className="grain">
      <SectionHeading
        id="skills-heading"
        overline="Skills"
        title="What I bring, and what I'm working towards."
        description="Grouped by where each one actually comes from. Nothing here is rated out of ten — that number would be made up."
      />

      <RevealGroup
        className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
        stagger={0.07}
      >
        {featured ? (
          <RevealItem className="md:col-span-2 xl:col-span-2">
            <SkillCategoryCard category={featured} featured />
          </RevealItem>
        ) : null}

        {rest.map((category) => (
          <RevealItem key={category.id}>
            <SkillCategoryCard category={category} />
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
