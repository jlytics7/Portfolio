import { ProjectExplorer } from "@/components/projects/project-explorer";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { projects } from "@/data/projects";

/**
 * Featured projects.
 *
 * Project data is passed from this server component into the client-side
 * explorer, so the filter logic runs in the browser while the data itself
 * stays on the server.
 */
export function Projects() {
  return (
    <Section id="projects" labelledBy="projects-heading">
      <SectionHeading
        id="projects-heading"
        overline="Featured Projects"
        title="Things I've built, and things I'm building."
        description="Each project is labelled with its honest status. Where a repository or demo doesn't exist yet, the button says so instead of pretending."
      />

      <Reveal>
        <ProjectExplorer projects={projects} />
      </Reveal>
    </Section>
  );
}
