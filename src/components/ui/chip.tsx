import { cn } from "@/lib/utils";
import type { SkillLevel } from "@/types/content";

/* -------------------------------------------------------------------------- */
/*  Tech tag                                                                  */
/* -------------------------------------------------------------------------- */

export function Chip({
  children,
  className,
  title,
}: {
  children: React.ReactNode;
  className?: string;
  title?: string;
}) {
  return (
    <span
      title={title}
      className={cn(
        "inline-flex items-center rounded-md border border-line bg-canvas-subtle px-2 py-1",
        "font-mono text-[0.6875rem] leading-none text-ink-muted",
        "transition-colors duration-200",
        className,
      )}
    >
      {children}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*  Skill chip (with an optional, opt-in proficiency indicator)                */
/* -------------------------------------------------------------------------- */

const levelStyles: Record<SkillLevel, string> = {
  learning: "text-ink-subtle",
  comfortable: "text-ink-muted",
  confident: "text-accent",
};

const levelLabels: Record<SkillLevel, string> = {
  learning: "Learning",
  comfortable: "Comfortable",
  confident: "Confident",
};

/**
 * Skill name as a chip. The proficiency dot only appears when a `level` has
 * been set in `src/data/skills.ts` — nothing claims a level by default.
 */
export function SkillChip({
  name,
  level,
  note,
}: {
  name: string;
  level?: SkillLevel;
  note?: string;
}) {
  return (
    <span
      title={note}
      className={cn(
        "group/skill inline-flex items-center gap-2 rounded-lg border border-line bg-canvas-subtle px-2.5 py-1.5",
        "text-[0.8125rem] text-ink-muted",
        "transition-[border-color,background-color,color] duration-200",
        "hover:border-accent-solid/40 hover:bg-surface hover:text-ink",
      )}
    >
      {level ? (
        <span
          aria-hidden
          className={cn(
            "size-1.5 shrink-0 rounded-full bg-current",
            levelStyles[level],
          )}
        />
      ) : null}
      <span>{name}</span>
      {level ? (
        <span className="sr-only"> — {levelLabels[level]}</span>
      ) : null}
    </span>
  );
}
