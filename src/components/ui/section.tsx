import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  Section shell                                                             */
/* -------------------------------------------------------------------------- */

/**
 * Every top-level band on the page uses this, so the horizontal container
 * width, gutters and vertical rhythm are defined in exactly one place.
 */
export function Section({
  id,
  children,
  className,
  labelledBy,
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
  /** The id of this section's heading, for aria-labelledby. */
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("relative py-20 sm:py-24 lg:py-28", className)}
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">{children}</div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section heading                                                           */
/* -------------------------------------------------------------------------- */

/**
 * The repeating header pattern: monospace overline, display heading, optional
 * description, then a hairline rule that ties it to the content below.
 */
export function SectionHeading({
  overline,
  title,
  description,
  id,
  className,
  children,
}: {
  overline: string;
  title: React.ReactNode;
  description?: string;
  id: string;
  className?: string;
  /** Extra content rendered opposite the heading on wide screens. */
  children?: React.ReactNode;
}) {
  return (
    <header className={cn("mb-12 sm:mb-14", className)}>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="overline mb-3 flex items-center gap-2.5">
            <span
              aria-hidden
              className="inline-block h-px w-6 bg-accent-solid/50"
            />
            {overline}
          </p>
          <h2
            id={id}
            className="text-3xl leading-[1.1] font-semibold text-ink sm:text-4xl"
          >
            {title}
          </h2>
          {description ? (
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-muted sm:text-base">
              {description}
            </p>
          ) : null}
        </div>
        {children ? <div className="shrink-0">{children}</div> : null}
      </div>
      <div aria-hidden className="hairline mt-8" />
    </header>
  );
}
