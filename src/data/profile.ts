import type { Profile } from "@/types/content";

/**
 * Your personal details.
 *
 * Everything the Hero, About and Footer sections show comes from this file.
 * The name, location, about prose, education and skills listed below are taken
 * from your LinkedIn profile as it stands.
 *
 * Only two things are still placeholders: `photo` (LinkedIn won't let you
 * easily export your own picture — re-save it and drop it into
 * `public/images/profile/`) and the resume file (see `resume` at the bottom).
 */
export const profile: Profile = {
  fullName: "Jessica Lindsey Miranda",
  shortName: "Jessica Miranda",
  initials: "JLM",
  headline: "Aspiring IT Professional",

  // Set to `null` to hide the chip entirely.
  availabilityNote: "Information Technology Student",

  location: "Iloilo, Western Visayas, Philippines",

  intro:
    "I'm a Bachelor of Science in Information Technology student majoring in Business Analytics Management, with a growing focus on data analytics and web development.",

  /**
   * The About paragraphs. The first is your own LinkedIn "About" section;
   * the rest are your LinkedIn education paragraphs, in order. Edit them to
   * your liking — they are already your words rather than a generated draft.
   */
  about: [
    "I am a Bachelor of Science in Information Technology student majoring in Business Analytics Management, with a passion for technology, creativity, and continuous learning. Curious and adaptable, I enjoy exploring new interests, developing my skills, and embracing opportunities for personal and professional growth. I look forward to gaining meaningful experiences, building connections, and discovering new possibilities.",
    "Currently pursuing a Bachelor of Science in Information Technology (BSIT), with a growing interest in Data Analytics and Web Development.",
    "Actively expanding my technical knowledge through academic projects, collaborative learning, and participation in technology-related organizations and events, including F1Stack and the RELX Reed Elsevier 2026 AI Summit.",
    "Also involved as a member of the CITE Technical Team, gaining opportunities to develop technical, communication, and teamwork skills.",
  ],

  /**
   * Rendered as a definition list in the About card. Keep values factual.
   */
  details: [
    { label: "Currently", value: "BS Information Technology student" },
    { label: "Studying at", value: "University of Iloilo" },
    { label: "Focus areas", value: "Data analytics · Web development" },
    {
      label: "Top skills",
      value: "Communication · Adaptability · Data Analysis · Public Speaking · Teamwork",
    },
    { label: "Also into", value: "Photography · Digital design" },
  ],

  // Square image works best (rendered around 4:5 on desktop).
  photo: "/images/profile/profile-placeholder.svg",
  photoAlt:
    "Portrait placeholder for Jessica Lindsey Miranda — replace with your own photo.",

  resume: {
    url: "/resume/Jessica-Lindsey-Miranda-Resume.pdf",
    fileName: "Jessica-Lindsey-Miranda-Resume.pdf",
    /**
     * This is your real resume, exported from
     * `Jessica_Resume_Updated_Certifications.docx` with its two placeholder
     * fields resolved (Accentline: Apr 2026 – May 2026; GitHub and LinkedIn
     * URLs). To swap in a newer version, overwrite the file at `url` — the
     * path and file name above need no changes.
     *
     * Set this to `false` (or delete the file) and the buttons switch to a
     * "coming soon" state instead of offering a download that doesn't exist.
     */
    available: true,
  },
};
