/**
 * Content model for the portfolio.
 *
 * Every piece of editable content in the site is typed here. The UI components
 * read from `src/data/*`, so you can rewrite your entire portfolio without
 * touching a single component.
 */

/* -------------------------------------------------------------------------- */
/*  Navigation                                                                */
/* -------------------------------------------------------------------------- */

export interface NavItem {
  /** Must match the `id` of the corresponding <section> in the page. */
  id: string;
  label: string;
}

/* -------------------------------------------------------------------------- */
/*  Profile & social links                                                    */
/* -------------------------------------------------------------------------- */

/**
 * A social/contact link. Set `isPlaceholder: true` while the URL is still a
 * stand-in. Placeholder links render with a dashed underline and a tooltip so
 * you can spot them instantly, and so nobody mistakes them for real profiles.
 */
export interface SocialLink {
  id: string;
  label: string;
  /** Visible text, e.g. "@your-handle" or "you@example.com". */
  display: string;
  href: string;
  isPlaceholder: boolean;
}

/** A label/value pair rendered in the About details card. */
export interface ProfileDetail {
  label: string;
  value: string;
}

export interface Profile {
  fullName: string;
  /** Used in the nav wordmark and footer. */
  shortName: string;
  /** 2–4 characters shown in the logo mark. */
  initials: string;
  /**
   * The hero sets the name across two lines, with the second line in the
   * accent colour. Split it where it reads best — the surname usually takes
   * its own line. `fullName` remains the single-line form used everywhere
   * else: metadata, JSON-LD, the nav label and the footer.
   */
  nameLines: [string, string];
  headline: string;
  /** Small chip under the hero headline. Set to null to hide it. */
  availabilityNote: string | null;
  /**
   * e.g. "Manila, Philippines". Set to `null` to hide the location entirely —
   * it is hidden by default rather than assumed.
   */
  location: string | null;
  /** One or two sentences for the hero. */
  intro: string;
  /** Paragraphs for the About section — each string is its own <p>. */
  about: string[];
  details: ProfileDetail[];
  photo: string;
  photoAlt: string;
  resume: {
    /** File path under /public. */
    url: string;
    fileName: string;
    /**
     * Flip to `false` if the file at `url` does not exist yet. Download
     * buttons then render as a clearly-labelled "coming soon" state instead
     * of linking to a 404.
     */
    available: boolean;
  };
}

/* -------------------------------------------------------------------------- */
/*  Experience & education                                                    */
/* -------------------------------------------------------------------------- */

/** One entry in the Experience & Education block. */
export interface ExperienceEntry {
  id: string;
  /** Which column the entry appears in. Entries render in array order. */
  kind: "experience" | "education";
  /** Role title for experience, or the degree/major for education. */
  role: string;
  /** Company for experience, or the institution for education. */
  organisation: string;
  /** e.g. "Apprenticeship". Set to `null` to omit the line. */
  type: string | null;
  /** e.g. "Apr 2026 – May 2026" or "Jul 2024 – Mar 2028". */
  period: string;
  /** A second short line, e.g. "On-site" or a major. `null` omits it. */
  detail: string | null;
  /** One short paragraph. `null` renders a compact entry with no prose. */
  summary: string | null;
  /** Short factual tags only — skills or topics, never claims of mastery. */
  tags: string[];
}

/* -------------------------------------------------------------------------- */
/*  Skills                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Proficiency is intentionally optional. Leave `level` undefined and no
 * indicator is rendered — the honest default. If you do want to show it,
 * only assign levels you would defend in an interview.
 */
export type SkillLevel = "learning" | "comfortable" | "confident";

export interface Skill {
  name: string;
  level?: SkillLevel;
  /** Optional short note, shown as a tooltip. */
  note?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  /** Any lucide-react icon component. */
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  skills: Skill[];
}

/* -------------------------------------------------------------------------- */
/*  Projects                                                                  */
/* -------------------------------------------------------------------------- */

export type ProjectCategory = "web" | "data" | "academic" | "design";

/**
 * - `unconfirmed` — you have not told me the real status yet. Renders a neutral
 *   "TBC" chip. Replace it as soon as you know.
 * - `concept`     — idea or design stage, not built.
 * - `in-progress` — actively being worked on.
 * - `academic`    — completed as part of coursework or a school requirement.
 * - `completed`   — finished and working.
 */
export type ProjectStatus =
  | "unconfirmed"
  | "concept"
  | "in-progress"
  | "academic"
  | "completed";

export interface Project {
  /** Unique, URL-safe id. Also used as the React key. */
  slug: string;
  title: string;
  tagline: string;
  description: string;
  status: ProjectStatus;
  categories: ProjectCategory[];
  tech: string[];
  /**
   * Functionality. For `concept` and `in-progress` projects the card labels
   * this list "Planned scope" so nothing reads as already delivered.
   */
  features: string[];
  image: string;
  imageAlt: string;
  /** Set to a real URL when it exists. `null` disables the button. */
  repoUrl: string | null;
  demoUrl: string | null;
}

/* -------------------------------------------------------------------------- */
/*  Certifications                                                            */
/* -------------------------------------------------------------------------- */

export type CertificationStatus =
  | "unconfirmed"
  | "issued"
  | "in-progress"
  | "planned";

export interface Certification {
  id: string;
  title: string;
  /** `null` renders "Issuer to be added" rather than inventing one. */
  issuer: string | null;
  /** ISO-ish display string, e.g. "March 2026". `null` renders a placeholder. */
  dateIssued: string | null;
  credentialId: string | null;
  /** `null` disables the "View Certificate" button. */
  credentialUrl: string | null;
  /** `null` renders a neutral placeholder tile. */
  image: string | null;
  imageAlt: string;
  status: CertificationStatus;
}

/* -------------------------------------------------------------------------- */
/*  Creative gallery                                                          */
/* -------------------------------------------------------------------------- */

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  caption: string;
  tag?: string;
  /** Intrinsic dimensions — required so the grid never shifts while loading. */
  width: number;
  height: number;
}

/* -------------------------------------------------------------------------- */
/*  Form                                                                      */
/* -------------------------------------------------------------------------- */

export interface ContactFormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}
