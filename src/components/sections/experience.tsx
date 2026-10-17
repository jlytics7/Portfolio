import { Card } from "@/components/ui/card";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { experienceEntries } from "@/data/experience";
import type { ExperienceEntry } from "@/types/content";

/**
 * One Experience & Education card.
 *
 * Every field is optional in the data, so a missing `type`, `detail`,
 * `summary` or `tags` simply removes that line — nothing is ever invented to
 * fill a gap.
 */
function EntryCard({ entry }: { entry: ExperienceEntry }) {
  return (
    <Card className="p-6">
      <p className="font-mono text-[0.6875rem] tracking-wider text-accent uppercase">
        {entry.period}
      </p>

      <h4 className="mt-2.5 font-display text-base leading-snug font-semibold tracking-tight text-ink">
        {entry.role}
      </h4>

      <p className="mt-1 text-sm text-ink-muted">
        {entry.organisation}
        {entry.type ? <span className="text-ink-subtle"> · {entry.type}</span> : null}
      </p>

      {entry.detail ? (
        <p className="mt-1 text-[0.8125rem] text-ink-subtle">{entry.detail}</p>
      ) : null}

      {entry.summary ? (
        <p className="mt-3.5 text-sm leading-relaxed text-ink-muted">
          {entry.summary}
        </p>
      ) : null}

      {entry.tags.length > 0 ? (
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {entry.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-line px-2.5 py-1 font-mono text-[0.625rem] tracking-wider text-ink-subtle uppercase"
            >
              {tag}
            </li>
          ))}
        </ul>
      ) : null}
    </Card>
  );
}

/**
 * Experience & Education.
 *
 * Rendered at the foot of the About section and driven entirely by
 * `src/data/experience.ts`. The two columns are produced from one array by
 * filtering on `kind`, so reordering the data file reorders the columns.
 */
export function ExperienceEducation() {
  const columns: { kind: ExperienceEntry["kind"]; label: string }[] = [
    { kind: "experience", label: "Experience" },
    { kind: "education", label: "Education" },
  ];

  return (
    <div className="mt-16 lg:mt-20">
      <div className="mb-8 flex items-center gap-5">
        <h3 className="overline shrink-0">Experience &amp; Education</h3>
        <span className="h-px flex-1 bg-line" aria-hidden />
      </div>

      <div className="grid gap-8 md:grid-cols-2 md:gap-6">
        {columns.map(({ kind, label }) => {
          const entries = experienceEntries.filter((e) => e.kind === kind);
          if (entries.length === 0) return null;

          return (
            <div key={kind}>
              <h4 className="mb-4 font-mono text-[0.6875rem] tracking-wider text-ink-subtle uppercase">
                {label}
              </h4>

              <RevealGroup className="space-y-4" stagger={0.07}>
                {entries.map((entry) => (
                  <RevealItem key={entry.id}>
                    <EntryCard entry={entry} />
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          );
        })}
      </div>
    </div>
  );
}
