"use client";

import { m } from "framer-motion";
import { Check, ExternalLink } from "lucide-react";
import Image from "next/image";

import { ProjectStatusBadge } from "@/components/ui/badge";
import { GithubIcon } from "@/components/ui/brand-icons";
import { ButtonLink } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import {
  featureListLabel,
  projectStatusDescriptions,
} from "@/data/projects";
import type { Project } from "@/types/content";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

/* -------------------------------------------------------------------------- */
/*  Shared pieces                                                             */
/* -------------------------------------------------------------------------- */

function ProjectMedia({
  project,
  className,
  sizes,
  priority = false,
}: {
  project: Project;
  className?: string;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-canvas-subtle", className)}>
      <Image
        src={project.image}
        alt={project.imageAlt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover transition-transform duration-500 ease-out group-hover/card:scale-[1.03]"
      />
      <div className="absolute top-3 right-3">
        <ProjectStatusBadge
          status={project.status}
          description={projectStatusDescriptions[project.status]}
        />
      </div>
    </div>
  );
}

function TechList({ tech }: { tech: string[] }) {
  if (tech.length === 0) return null;

  return (
    <ul className="flex flex-wrap gap-1.5">
      {tech.map((item) => (
        <li key={item}>
          <Chip className="group-hover/card:border-line-strong">{item}</Chip>
        </li>
      ))}
    </ul>
  );
}

/**
 * The functionality list.
 *
 * The heading comes from `featureListLabel(status)` so concept and in-progress
 * projects read "Planned scope" — nothing unfinished is presented as delivered.
 */
function FeatureList({ project }: { project: Project }) {
  if (project.features.length === 0) return null;

  return (
    <div className="rounded-xl border border-line bg-canvas-subtle p-4">
      <h4 className="font-mono text-[0.6875rem] tracking-wider text-ink-subtle uppercase">
        {featureListLabel(project.status)}
      </h4>
      <ul className="mt-3 space-y-2">
        {project.features.map((feature) => (
          <li key={feature} className="flex gap-2.5">
            <Check
              aria-hidden
              className="mt-[0.2rem] size-3.5 shrink-0 text-accent"
            />
            <span className="text-[0.8125rem] leading-relaxed text-ink-muted">
              {feature}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProjectActions({ project }: { project: Project }) {
  const noRepo = !project.repoUrl;
  const noDemo = !project.demoUrl;

  return (
    <div className="flex flex-wrap gap-2">
      <ButtonLink
        href={project.repoUrl ?? undefined}
        target="_blank"
        rel="noreferrer noopener"
        variant="secondary"
        size="sm"
        disabledReason={
          noRepo
            ? "No public repository for this project yet."
            : undefined
        }
      >
        <GithubIcon className="size-4" />
        GitHub Repository
      </ButtonLink>

      <ButtonLink
        href={project.demoUrl ?? undefined}
        target="_blank"
        rel="noreferrer noopener"
        variant={noDemo ? "secondary" : "primary"}
        size="sm"
        disabledReason={
          noDemo ? "There is no live demo for this project yet." : undefined
        }
      >
        <ExternalLink aria-hidden className="size-4" />
        Live Demo
      </ButtonLink>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Card                                                                      */
/* -------------------------------------------------------------------------- */

export function ProjectCard({
  project,
  featured = false,
  priority = false,
  className,
}: {
  project: Project;
  featured?: boolean;
  priority?: boolean;
  className?: string;
}) {
  return (
    <m.article
      layout
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.4, ease: EASE }}
      className={cn(
        "group/card overflow-hidden rounded-2xl border border-line bg-surface shadow-card",
        "transition-[border-color,box-shadow,transform] duration-300 ease-out",
        "hover:-translate-y-0.5 hover:border-line-strong hover:shadow-card-hover",
        featured && "lg:grid lg:grid-cols-2",
        className,
      )}
    >
      <ProjectMedia
        project={project}
        priority={priority}
        sizes={
          featured
            ? "(min-width: 1024px) 50vw, (min-width: 640px) 90vw, 92vw"
            : "(min-width: 1280px) 33vw, (min-width: 768px) 45vw, 92vw"
        }
        className={cn(
          featured
            ? "aspect-16/10 lg:aspect-auto lg:h-full lg:min-h-[26rem]"
            : "aspect-16/10",
        )}
      />

      <div className="flex flex-col p-6 sm:p-7">
        <p className="font-mono text-[0.6875rem] tracking-wider text-accent uppercase">
          {project.tagline}
        </p>

        <h3
          className={cn(
            "mt-2.5 font-display font-semibold tracking-tight text-ink",
            featured ? "text-2xl sm:text-3xl" : "text-xl",
          )}
        >
          {project.title}
        </h3>

        <p
          className={cn(
            "mt-3 leading-relaxed text-ink-muted",
            featured ? "text-[0.9375rem]" : "text-[0.875rem]",
          )}
        >
          {project.description}
        </p>

        <div className="mt-5">
          <TechList tech={project.tech} />
        </div>

        <div className="mt-5 flex-1">
          <FeatureList project={project} />
        </div>

        <div className="mt-6">
          <ProjectActions project={project} />
        </div>
      </div>
    </m.article>
  );
}

/* -------------------------------------------------------------------------- */
/*  "More to come" placeholder                                                */
/* -------------------------------------------------------------------------- */

/**
 * Stands in for the "additional future projects" slot. It is a card rather
 * than a fabricated project entry — it makes no claims about anything.
 */
export function FutureProjectsCard({ className }: { className?: string }) {
  return (
    <m.article
      layout
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.4, ease: EASE }}
      className={cn(
        "flex min-h-[16rem] flex-col items-center justify-center rounded-2xl border border-dashed border-line-strong bg-canvas-subtle p-8 text-center",
        className,
      )}
    >
      <span
        aria-hidden
        className="grid size-11 place-items-center rounded-full border border-line bg-surface text-accent"
      >
        <span className="font-mono text-lg leading-none">+</span>
      </span>
      <h3 className="mt-5 font-display text-base font-semibold text-ink">
        More projects on the way
      </h3>
      <p className="mt-2 max-w-xs text-[0.8125rem] leading-relaxed text-ink-muted">
        This space is reserved for work that isn&apos;t finished yet. Add an
        entry to
        <span className="mx-1 font-mono text-[0.75rem] text-accent">
          src/data/projects.ts
        </span>
        when the next one is ready.
      </p>
    </m.article>
  );
}
