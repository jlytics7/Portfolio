import { cn } from "@/lib/utils";
import { projectStatusLabels } from "@/data/projects";
import type { CertificationStatus, ProjectStatus } from "@/types/content";

/* -------------------------------------------------------------------------- */
/*  Generic badge                                                             */
/* -------------------------------------------------------------------------- */

export function Badge({
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
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1",
        "font-mono text-[0.6875rem] leading-none font-medium tracking-wider uppercase",
        className,
      )}
    >
      {children}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*  Project status                                                            */
/* -------------------------------------------------------------------------- */

/**
 * `unconfirmed` is deliberately neutral — it is a placeholder telling you to
 * fill in the real status, not a claim about the project.
 */
const projectStatusStyles: Record<ProjectStatus, string> = {
  unconfirmed: "border-line-strong bg-canvas-subtle text-ink-subtle",
  concept: "border-line-strong bg-canvas-subtle text-ink-muted",
  "in-progress": "border-warn/35 bg-warn-soft text-warn",
  academic: "border-accent-solid/30 bg-accent-soft text-accent",
  completed: "border-accent-solid bg-accent-solid text-accent-fg",
};

export function ProjectStatusBadge({
  status,
  description,
}: {
  status: ProjectStatus;
  description?: string;
}) {
  return (
    <Badge className={projectStatusStyles[status]} title={description}>
      {status === "in-progress" || status === "completed" ? (
        <span
          aria-hidden
          className="size-1.5 rounded-full bg-current opacity-80"
        />
      ) : null}
      {projectStatusLabels[status]}
    </Badge>
  );
}

/* -------------------------------------------------------------------------- */
/*  Certification status                                                      */
/* -------------------------------------------------------------------------- */

const certificationStatusStyles: Record<CertificationStatus, string> = {
  unconfirmed: "border-line-strong bg-canvas-subtle text-ink-subtle",
  issued: "border-accent-solid bg-accent-solid text-accent-fg",
  "in-progress": "border-warn/35 bg-warn-soft text-warn",
  planned: "border-line-strong bg-canvas-subtle text-ink-muted",
};

export function CertificationStatusBadge({
  status,
  label,
}: {
  status: CertificationStatus;
  label: string;
}) {
  return (
    <Badge className={certificationStatusStyles[status]}>{label}</Badge>
  );
}
