import type { SocialLink } from "@/types/content";

/**
 * Your social and contact links.
 *
 * GitHub and LinkedIn come from your LinkedIn profile's contact details. The
 * email address is the one on your resume (`jessica.lindsey728@gmail.com`),
 * since that is the address you give to employers — your LinkedIn lists a
 * different one, and this file is the single place to change it.
 *
 * While `isPlaceholder` is `true` the link renders with a dashed underline and
 * a tooltip, so you can see at a glance what still needs replacing. All three
 * are now real, so the styling falls back to normal.
 */
export const socials: SocialLink[] = [
  {
    id: "github",
    label: "GitHub",
    display: "github.com/jlytics7",
    href: "https://github.com/jlytics7",
    isPlaceholder: false,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    display: "linkedin.com/in/jessica-lindsey-miranda",
    href: "https://www.linkedin.com/in/jessica-lindsey-miranda-7b9417360",
    isPlaceholder: false,
  },
  {
    id: "email",
    label: "Email",
    display: "jessica.lindsey728@gmail.com",
    href: "mailto:jessica.lindsey728@gmail.com",
    isPlaceholder: false,
  },
];

/** Convenience lookups so components don't have to filter arrays inline. */
export function getSocial(id: string) {
  return socials.find((social) => social.id === id);
}

export const emailLink = getSocial("email");

/** True while any link is still a placeholder — used for the footer notice. */
export const hasPlaceholderLinks = socials.some((s) => s.isPlaceholder);
