"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which page section is currently in view, for the nav's active
 * indicator.
 *
 * Rather than watching whole sections (which are taller than the viewport and
 * produce ambiguous overlaps), this watches a narrow horizontal band near the
 * upper third of the screen. Whichever section crosses that band is active.
 *
 * The end of the page is a special case: the final section can be too short to
 * ever reach the band, so reaching the bottom of the document forces the last
 * section active.
 */
export function useActiveSection(sectionIds: string[]) {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? "");

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    const lastId = sectionIds[sectionIds.length - 1];

    const observer = new IntersectionObserver(
      (entries) => {
        // A section that is intersecting the band wins. If several do, the
        // one closest to the top of the band is the more accurate answer.
        const intersecting = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (intersecting.length > 0) {
          setActiveId(intersecting[0].target.id);
        }
      },
      {
        // Top 28% and bottom 62% are excluded, leaving a 10% trigger band.
        rootMargin: "-28% 0px -62% 0px",
        threshold: 0,
      },
    );

    elements.forEach((element) => observer.observe(element));

    function handleScroll() {
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;
      if (atBottom) setActiveId(lastId);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sectionIds]);

  return activeId;
}
