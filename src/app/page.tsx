import { About } from "@/components/sections/about";
import { Certifications } from "@/components/sections/certifications";
import { Contact } from "@/components/sections/contact";
import { Creative } from "@/components/sections/creative";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";

/**
 * The whole portfolio, in order.
 *
 * Each section is self-contained and reads its content from `src/data/*`, so
 * reordering the page is a matter of moving one line.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Certifications />
      <Creative />
      <Contact />
    </>
  );
}
