import { CreativeGallery } from "@/components/creative/creative-gallery";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import { galleryItems, showCreativeSection } from "@/data/gallery";

/**
 * Creative portfolio.
 *
 * Intentionally a single band rather than a full section with its own sub-nav,
 * so it complements the technical work instead of competing with it. Set
 * `showCreativeSection` to `false` in `src/data/gallery.ts` to remove it
 * entirely.
 */
export function Creative() {
  if (!showCreativeSection || galleryItems.length === 0) return null;

  return (
    <Section id="creative" labelledBy="creative-heading" className="grain">
      <SectionHeading
        id="creative-heading"
        overline="Creative Portfolio"
        title="Photography, and what it taught me about restraint."
        description="Composition and colour grading work the same muscles as interface design — decide what earns its place, then remove everything else."
      />

      <Reveal>
        <CreativeGallery items={galleryItems} />
      </Reveal>
    </Section>
  );
}
