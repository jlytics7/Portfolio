import type { NavItem } from "@/types/content";

/**
 * Navigation links.
 *
 * Each `id` must match the `id` of a <section> in `src/app/page.tsx`.
 * Order here controls both the nav bar and the scroll-spy order.
 */
export const navItems: NavItem[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];
