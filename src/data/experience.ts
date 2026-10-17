import type { ExperienceEntry } from "@/types/content";

/**
 * Your work experience and education, taken from your LinkedIn profile.
 *
 * Two columns are rendered from this one array: entries with
 * `kind: "experience"` appear under "Experience" and `kind: "education"`
 * under "Education". Adding a new entry is a copy-paste of one object — the
 * component needs no changes.
 *
 * Keep every value factual. A missing field renders nothing rather than
 * inventing a date, an employer, or a qualification.
 */
export const experienceEntries: ExperienceEntry[] = [
  {
    id: "accentline-csr-trainee",
    kind: "experience",
    role: "Customer Service Representative Trainee",
    organisation: "Accentline Inc.",
    type: "Apprenticeship",
    period: "Apr 2026 – May 2026",
    detail: "On-site · Iloilo, Western Visayas, Philippines",
    summary:
      "Participated in customer service training focused on call handling, professional communication, and customer interaction. Gained practical exposure to handling calls, following established procedures, and developing essential customer service skills.",
    tags: ["Customer Service", "Communication"],
  },
  {
    id: "university-of-iloilo-bsit",
    kind: "education",
    role: "Bachelor of Science in Information Technology",
    organisation: "University of Iloilo",
    type: null,
    period: "Jul 2024 – Mar 2028",
    detail: "Majoring in Business Analytics Management",
    summary: null,
    tags: ["Data Analysis"],
  },
];
