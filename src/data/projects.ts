import type { Project, ProjectCategory } from "@/types/content";

/**
 * Filter tabs for the project grid.
 *
 * `id: "all"` is handled specially and shows everything. The `categories` array
 * on each project below refers to these ids, so if you rename one, update both.
 */
export const projectFilters: { id: ProjectCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "web", label: "Web Development" },
  { id: "data", label: "Data Analytics" },
  { id: "academic", label: "Academic Projects" },
];

/**
 * ⚠️  EVERY PROJECT BELOW IS A PLACEHOLDER.
 *
 * These are the three projects you named, written up as neutral starting
 * points. I have not invented any results, features you shipped, or links.
 * Before publishing, work through each one and:
 *
 *   1. Set `status` to the truth. "unconfirmed" renders a neutral "TBC" chip
 *      and should not survive to a live portfolio you send to recruiters.
 *   2. Replace `tech` with the stack you actually used.
 *   3. Replace `features` with what the project actually does. For anything
 *      not yet finished, phrase it as intent ("Planned: ...") — the card
 *      automatically labels this list "Planned scope" for concept and
 *      in-progress projects, and "Key functionality" once completed.
 *   4. Add `repoUrl` / `demoUrl` only when those things genuinely exist.
 *      While they are `null` the buttons render disabled with an explanation
 *      rather than linking somewhere broken.
 */
export const projects: Project[] = [
  {
    slug: "allora",
    title: "Allora",
    tagline: "Multi-Service Event Booking Platform",
    description:
      "A booking concept for events that need more than one service at once — venue, styling, photography and catering coordinated through a single flow, instead of the usual scatter of separate enquiries and spreadsheets.",
    // TODO: set to "concept" | "in-progress" | "academic" | "completed"
    status: "unconfirmed",
    categories: ["web"],
    // TODO: replace with the stack you actually used.
    tech: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL"],
    features: [
      "Planned: a single booking flow covering several service types in one request",
      "Planned: service and package browsing with availability in mind",
      "Planned: a booking summary the customer can review before submitting",
      "Planned: a simple admin view for reviewing incoming bookings",
    ],
    image: "/images/projects/allora.svg",
    imageAlt: "Placeholder thumbnail for the Allora event booking platform.",
    repoUrl: null,
    demoUrl: null,
  },
  {
    slug: "techzone",
    title: "TechZone",
    tagline: "Data Analytics Project",
    description:
      "A data analytics project built around turning a raw dataset into readable insight — cleaning and organising the data, then analysing and visualising it so the patterns worth acting on are actually visible.",
    // TODO: set the real status.
    status: "unconfirmed",
    categories: ["data", "academic"],
    // TODO: replace with the tools you actually used (e.g. Excel, Python, Power BI).
    tech: ["Microsoft Excel", "Data Cleaning", "Data Visualization"],
    features: [
      "Planned: dataset cleaning and preparation before analysis",
      "Planned: exploratory analysis to surface trends and outliers",
      "Planned: charts and dashboards that make the findings readable at a glance",
      "Planned: a short written interpretation of what the numbers suggest",
    ],
    image: "/images/projects/techzone.svg",
    imageAlt: "Placeholder thumbnail for the TechZone data analytics project.",
    repoUrl: null,
    demoUrl: null,
  },
  {
    slug: "isla-paint-center",
    title: "Isla Paint Center",
    tagline: "Business Process Analysis",
    description:
      "A business process analysis of a paint retail business — mapping how the operation currently runs end to end, documenting each step, and identifying where the workflow could be simplified or tightened up.",
    // TODO: set the real status.
    status: "unconfirmed",
    categories: ["academic", "data"],
    // TODO: replace with what you actually used.
    tech: ["Business Process Analysis", "Process Mapping", "Documentation"],
    features: [
      "Planned: documentation of current workflows from enquiry to fulfilment",
      "Planned: process maps showing each step and who owns it",
      "Planned: identification of bottlenecks and manual workarounds",
      "Planned: recommendations for streamlining the process",
    ],
    image: "/images/projects/isla-paint-center.svg",
    imageAlt:
      "Placeholder thumbnail for the Isla Paint Center business process analysis.",
    repoUrl: null,
    demoUrl: null,
  },
];

/** The id of the project rendered as the large featured card. */
export const featuredProjectSlug = projects[0]?.slug ?? null;

/** Human-readable labels for the status chip. */
export const projectStatusLabels: Record<Project["status"], string> = {
  unconfirmed: "TBC",
  concept: "Concept",
  "in-progress": "In Progress",
  academic: "Academic",
  completed: "Completed",
};

/** Longer explanation, exposed via the status chip's tooltip. */
export const projectStatusDescriptions: Record<Project["status"], string> = {
  unconfirmed: "Status not confirmed yet — update this in src/data/projects.ts",
  concept: "Idea or design stage — not built yet",
  "in-progress": "Actively being worked on",
  academic: "Completed as part of coursework",
  completed: "Finished and working",
};

/**
 * The heading above each project's functionality list. Concept and in-progress
 * projects describe intent, so they must not read as delivered features.
 */
export function featureListLabel(status: Project["status"]) {
  return status === "completed" || status === "academic"
    ? "Key functionality"
    : "Planned scope";
}
