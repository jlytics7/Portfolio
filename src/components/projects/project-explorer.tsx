"use client";

import { AnimatePresence, m } from "framer-motion";
import { useMemo, useState } from "react";

import {
  FutureProjectsCard,
  ProjectCard,
} from "@/components/projects/project-card";
import { projectFilters } from "@/data/projects";
import type { Project, ProjectCategory } from "@/types/content";
import { cn } from "@/lib/utils";

type FilterId = ProjectCategory | "all";

/**
 * Filterable project grid.
 *
 * State is local and the project list is small, so filtering is instant with no
 * server round-trip. `AnimatePresence` is placed *inside* the grid rather than
 * around it — it renders a fragment, so the cards stay direct grid children and
 * `layout` can animate them to their new positions as items are filtered out.
 */
export function ProjectExplorer({ projects }: { projects: Project[] }) {
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");

  const counts = useMemo(() => {
    const result = new Map<FilterId, number>();
    for (const filter of projectFilters) {
      result.set(
        filter.id,
        filter.id === "all"
          ? projects.length
          : projects.filter((project) =>
              project.categories.includes(filter.id as ProjectCategory),
            ).length,
      );
    }
    return result;
  }, [projects]);

  const visible = useMemo(
    () =>
      activeFilter === "all"
        ? projects
        : projects.filter((project) =>
            project.categories.includes(activeFilter),
          ),
    [projects, activeFilter],
  );

  // The "more to come" slot only belongs in the unfiltered view.
  const showFutureCard = activeFilter === "all";

  return (
    <div>
      {/* Filters ------------------------------------------------------- */}
      <div
        role="group"
        aria-label="Filter projects by category"
        className="mb-8 flex flex-wrap items-center gap-2"
      >
        {projectFilters.map((filter) => {
          const isActive = filter.id === activeFilter;
          const count = counts.get(filter.id) ?? 0;
          const isEmpty = count === 0;

          return (
            <button
              key={filter.id}
              type="button"
              onClick={() => setActiveFilter(filter.id)}
              aria-pressed={isActive}
              disabled={isEmpty}
              className={cn(
                "relative isolate inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[0.8125rem] font-medium",
                "transition-colors duration-200",
                isActive
                  ? "border-transparent text-accent-fg"
                  : "border-line bg-surface text-ink-muted hover:border-line-strong hover:text-ink",
                isEmpty && "cursor-not-allowed opacity-40",
              )}
            >
              {isActive ? (
                <m.span
                  aria-hidden
                  layoutId="project-filter-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-accent-solid"
                  transition={{ type: "spring", stiffness: 380, damping: 34 }}
                />
              ) : null}
              {filter.label}
              <span
                className={cn(
                  "font-mono text-[0.6875rem]",
                  isActive ? "opacity-70" : "opacity-50",
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Screen-reader feedback --------------------------------------- */}
      <p aria-live="polite" className="sr-only">
        {visible.length} {visible.length === 1 ? "project" : "projects"} shown
        {activeFilter === "all"
          ? ""
          : ` in ${projectFilters.find((f) => f.id === activeFilter)?.label}`}
        .
      </p>

      {/* Grid ---------------------------------------------------------- */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((project, index) => {
            const isFeatured = index === 0;

            return (
              <ProjectCard
                key={project.slug}
                project={project}
                featured={isFeatured}
                className={isFeatured ? "md:col-span-2" : undefined}
              />
            );
          })}

          {showFutureCard ? (
            <FutureProjectsCard key="future-projects" className="md:col-span-2" />
          ) : null}
        </AnimatePresence>
      </div>

      {/* Empty state --------------------------------------------------- */}
      {visible.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-line-strong bg-canvas-subtle px-6 py-12 text-center text-sm text-ink-muted">
          Nothing here yet. Projects in this category are still being added.
        </p>
      ) : null}
    </div>
  );
}
