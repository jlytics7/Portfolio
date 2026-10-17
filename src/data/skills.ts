import { BarChart3, Palette, ShieldCheck, Target, Users } from "lucide-react";

import type { SkillCategory } from "@/types/content";

/**
 * Your skills, grouped into categories.
 *
 * Everything here comes from a document you wrote, not from a guess:
 *
 *   • Professional Skills — the SKILLS list on your resume.
 *   • Cybersecurity       — the three Fortinet Training Institute courses you
 *                           completed in October 2026 (see certifications.ts).
 *   • Data Analytics      — the analytics topics from your original brief,
 *                           backed up by your Cisco certification.
 *   • Creative Skills     — from your original brief.
 *   • Focus Areas         — your resume's own "Areas of interest" line. These
 *                           are interests, and the category name says so,
 *                           rather than claiming proficiency you haven't
 *                           claimed either.
 *
 * The earlier "Programming & Development", "Web Development" technology lists
 * and "Tools & Technologies" were a generic IT-student template I wrote. They
 * have been removed because nothing in your LinkedIn or resume names a
 * language, framework or tool. When you can back one up — a project, a
 * course, a job — add it back here.
 *
 * You can optionally tag a skill with a level:
 *   { name: "TypeScript", level: "learning" }
 * Levels are NOT displayed unless you set them. Nothing here claims
 * proficiency by default.
 *
 * To add a category, copy an existing block. `icon` accepts any icon from
 * lucide-react — see https://lucide.dev/icons
 */
export const skillCategories: SkillCategory[] = [
  {
    id: "data",
    title: "Data Analytics",
    description: "Turning raw data into something a person can act on.",
    icon: BarChart3,
    skills: [
      { name: "Data Analytics Essentials" },
      { name: "Data Visualization" },
      { name: "Spreadsheet Analysis" },
      { name: "Data Interpretation" },
      { name: "Data Cleaning" },
    ],
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    description:
      "Three Fortinet Training Institute courses, all completed in October 2026.",
    icon: ShieldCheck,
    skills: [
      { name: "FortiGate 7.6" },
      { name: "Next-Generation Firewalls" },
      { name: "Cloud Fundamentals" },
    ],
  },
  {
    id: "professional",
    title: "Professional Skills",
    description: "How I work with people, taken straight from my resume.",
    icon: Users,
    skills: [
      { name: "Customer Service" },
      { name: "Call Handling" },
      { name: "Communication" },
      { name: "Active Listening" },
      { name: "Teamwork" },
      { name: "Adaptability" },
      { name: "Attention to Detail" },
      { name: "Problem Solving" },
      { name: "Time Management" },
      { name: "Public Speaking" },
    ],
  },
  {
    id: "creative",
    title: "Creative Skills",
    description: "Where the eye for composition comes from.",
    icon: Palette,
    skills: [
      { name: "Photography" },
      { name: "Adobe Lightroom" },
      { name: "Photo Editing" },
      { name: "Basic Digital Design" },
    ],
  },
  {
    id: "focus",
    title: "Focus Areas",
    description:
      "Where I'm pointing next. These are areas of interest, not claims of mastery.",
    icon: Target,
    skills: [{ name: "Web Development" }, { name: "Business Analytics" }],
  },
];

/**
 * Categories rendered in the wide "bento" column. Everything else flows into
 * the narrower column. Purely a layout decision.
 */
export const featuredSkillCategoryId = skillCategories[0].id;
