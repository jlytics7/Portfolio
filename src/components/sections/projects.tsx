"use client";

import { Plus } from "lucide-react";
import { ProjectExplorer } from "@/components/projects/project-explorer";
import { AddProjectModal } from "@/components/admin/add-project-modal";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/projects";
import { useState } from "react";

/**
 * Featured projects.
 *
 * Project data is passed from this server component into the client-side
 * explorer, so the filter logic runs in the browser while the data itself
 * stays on the server.
 */
export function Projects() {
  const [addProjectOpen, setAddProjectOpen] = useState(false);

  return (
    <Section id="projects" labelledBy="projects-heading">
      <SectionHeading
        id="projects-heading"
        overline="Featured Projects"
        title="Things I've built, and things I'm building."
        description="Each project is labelled with its honest status. Where a repository or demo doesn't exist yet, the button says so instead of pretending."
      />

      <div className="flex justify-between items-end mb-4">
        <Button variant="primary" size="sm" onClick={() => setAddProjectOpen(true)}>
          <Plus className="size-4" aria-hidden /> Add Project
        </Button>
        <AddProjectModal open={addProjectOpen} onClose={() => setAddProjectOpen(false)} />
      </div>

      <Reveal>
        <ProjectExplorer projects={projects} />
      </Reveal>
    </Section>
  );
}
