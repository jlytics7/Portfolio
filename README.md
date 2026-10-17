# Jessica Lindsey Miranda — Portfolio

A single-page personal portfolio built with Next.js, TypeScript and Tailwind CSS. Designed to be
professional enough for recruiters and internships, while staying easy to maintain: **all content
lives in `src/data/`, so you can rewrite the entire site without touching a component.**

---

## Table of contents

- [Quick start](#quick-start)
- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [⚠️ Before you publish — placeholder checklist](#-before-you-publish--placeholder-checklist)
- [Customising the content](#customising-the-content)
- [Contact form setup](#contact-form-setup)
- [Design system](#design-system)
- [Accessibility & performance](#accessibility--performance)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

---

## Quick start

Requires **Node.js 20.9 or newer** (Next.js 16 minimum).

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Script          | What it does                                          |
| --------------- | ----------------------------------------------------- |
| `npm run dev`   | Development server with hot reload                     |
| `npm run build` | Production build                                       |
| `npm run start` | Serve the production build locally                     |
| `npm run lint`  | Run ESLint                                             |

> **Note:** `next lint` was removed in Next.js 16. `npm run lint` calls the ESLint CLI directly.

---

## Tech stack

| Layer      | Choice                                                                 |
| ---------- | ---------------------------------------------------------------------- |
| Framework  | Next.js 16 (App Router, Turbopack, Cache Components)                    |
| Runtime    | React 19                                                               |
| Language   | TypeScript (strict)                                                    |
| Styling    | Tailwind CSS v4 — CSS-first config, no `tailwind.config.js`             |
| Animation  | Framer Motion (`LazyMotion` + `domMax` to keep the bundle down)         |
| Icons      | lucide-react, plus inline brand marks for GitHub/LinkedIn               |
| Fonts      | Sora (display), Inter (body), JetBrains Mono (labels) — self-hosted     |

No UI component library. Every component is hand-built against one shared set of design tokens, so
nothing looks like a stock template.

---

## Project structure

```
src/
├─ app/
│  ├─ layout.tsx          Root layout: fonts, metadata, theme script, nav/footer
│  ├─ page.tsx            Section order — reorder the page by moving one line
│  ├─ globals.css         Design tokens, base styles, custom utilities
│  ├─ not-found.tsx       Custom 404
│  ├─ icon.svg            Favicon (monogram)
│  ├─ sitemap.ts          sitemap.xml
│  ├─ robots.ts           robots.txt
│  └─ manifest.ts         Web app manifest
│
├─ components/
│  ├─ layout/             Navbar, mobile menu, footer, back-to-top, scroll progress
│  ├─ sections/           One file per page section
│  ├─ projects/           Project card, filterable explorer
│  ├─ creative/           Photo gallery + lightbox
│  ├─ contact/            Contact form
│  ├─ providers/          Theme + motion providers
│  └─ ui/                 Reusable primitives (Button, Card, Badge, Chip, Field, Reveal…)
│
├─ data/                  ← ALL EDITABLE CONTENT LIVES HERE
├─ hooks/                 Scroll-spy, body scroll lock
├─ lib/                   Utilities, motion variants, validation, SEO, dates
└─ types/                 The content model every data file is typed against
```

`public/` holds the four real certificate PDFs, their previews, the photography gallery placeholders
and the resume placeholder.

---

## ⚠️ Before you publish — placeholder checklist

Nothing in this project invents facts about you. Anything unknown is a clearly-labelled
placeholder. Your name, location, contact links, education, experience, about prose, skills, resume
and all four certifications are already filled in from your LinkedIn profile, your resume and your
own certificate PDFs. Work through what's left before sending the site to anyone:

### 1. Portrait — `src/data/profile.ts`

`profile.photo` points at a generated placeholder. Drop a real photo into
`public/images/profile/` and update the path (a 4:5 portrait crop works best). The hero's
"Portrait placeholder" caption disappears on its own once the path no longer contains
`placeholder`.

### 2. Skills — `src/data/skills.ts`

Every skill listed now traces back to a document you wrote: the SKILLS list on your resume, the
Fortinet courses you completed, or the analytics and creative topics from your original brief. The
"Focus Areas" category is labelled as interests rather than proficiency, because that is what your
resume calls them.

**The generic "Programming & Development", "Web Development" technology lists and "Tools &
Technologies" categories have been deleted** — nothing on your LinkedIn or resume names a language,
framework or tool, so listing them would have been a guess. When you can back one up with a project
or a course, add the category back; the file's header comment shows how.

No skill anywhere on the site carries a percentage or a bar. If you ever add a `level`, make it one
you would defend in an interview.

### 3. Projects — `src/data/projects.ts`

All three projects (Allora, TechZone, Isla Paint Center) currently have `status: "unconfirmed"`,
which renders a neutral **"TBC"** chip. Your LinkedIn doesn't list projects, so these are still
yours to confirm. For each one:

- Set `status` to the truth: `concept` · `in-progress` · `academic` · `completed`
- Replace `tech` with the stack you actually used
- Replace `features` with what the project actually does

The card labels the feature list **"Planned scope"** for `concept` and `in-progress` projects, and
**"Key functionality"** once a project is `academic` or `completed` — so nothing unfinished reads as
delivered.

`repoUrl` and `demoUrl` are `null`, which renders the buttons as **disabled with an explanation**
instead of linking somewhere that doesn't exist. Set them to real URLs when those things exist.

### 4. Photography — `src/data/gallery.ts`

Six generated placeholder tiles. Replace with your own images, updating `src`, `alt`, `width` and
`height` for each. Set `showCreativeSection` to `false` to hide the section completely.

### 5. Site URL — `src/data/site.ts`

The URL is resolved in this order: `NEXT_PUBLIC_SITE_URL` → Vercel's production URL →
`https://jessicamiranda.dev` (the domain on your LinkedIn, used for local development and for any
host that doesn't supply its own). It builds the canonical tags, Open Graph image URLs and the
sitemap.

**Local development is already correct.** Once you deploy:

- **Vercel + `jessicamiranda.dev` attached** → nothing to do, Vercel supplies it.
- **Anything else** → set `NEXT_PUBLIC_SITE_URL` (see `.env.example`) or edit the fallback in
  `site.ts`, or link previews and the sitemap will point at a domain that isn't yours.

### 6. Certificate verification URLs — `src/data/certifications.ts`

Every `credentialUrl` currently points at that certificate's own PDF served from this site, so
**View Certificate** opens the real document. If Cisco, DICT-ITU or Fortinet ever issues you a
public verification link (Credly, Badgr, or a vendor cert page), paste it in instead — a link a
stranger can check is worth more than a PDF you host yourself.

### Already wired to real files

These need no action, only a note so you know where they came from:

- **Resume** — `public/resume/Jessica-Lindsey-Miranda-Resume.pdf` is your actual resume, exported
  from `Jessica_Resume_Updated_Certifications.docx`. Its two placeholder fields were resolved first:
  the Accentline training period became **Apr 2026 – May 2026** (your LinkedIn dates), and the two
  `[Add profile URL]` markers became **github.com/jlytics7** and
  **linkedin.com/in/jessica-lindsey-miranda-7b9417360**. Nothing else in the document was touched, so
  your formatting is exactly as you left it. A copy of that resolved `.docx` sits in your Downloads
  as `Jessica-Lindsey-Miranda-Resume-RESOLVED.docx`. To publish an updated version, overwrite the PDF
  at that same path — no code changes.
- **Certificates** — the four PDFs in `public/certificates/` and their preview JPEGs in
  `public/images/certifications/` are your own documents.

---

## Customising the content

Everything below is a plain data file. No component changes required.

| I want to change…                    | Edit this file                     |
| ------------------------------------ | ---------------------------------- |
| Name, headline, intro, about, photo  | `src/data/profile.ts`              |
| Resume path or availability          | `src/data/profile.ts` → `resume`   |
| The resume PDF itself                | `public/resume/…-Resume.pdf`       |
| GitHub / LinkedIn / email            | `src/data/socials.ts`              |
| Nav links and their order            | `src/data/nav.ts`                  |
| Skills and categories                | `src/data/skills.ts`               |
| Projects and filter tabs             | `src/data/projects.ts`             |
| Certifications                       | `src/data/certifications.ts`       |
| Experience and education             | `src/data/experience.ts`           |
| Photography gallery                  | `src/data/gallery.ts`              |
| Page title, description, keywords    | `src/data/site.ts`                 |
| Section order on the page            | `src/app/page.tsx`                 |

### Adding a skill category

```ts
// src/data/skills.ts
{
  id: "cloud",                    // must be unique
  title: "Cloud & Deployment",
  description: "Where things live once they work.",
  icon: Cloud,                    // any icon from https://lucide.dev/icons
  skills: [{ name: "Vercel" }, { name: "Netlify" }],
}
```

### Showing skill proficiency (optional)

Proficiency indicators are **off by default** — nothing claims a level you didn't set. To enable one
for a specific skill:

```ts
{ name: "TypeScript", level: "learning" }   // "learning" | "comfortable" | "confident"
```

That renders a small coloured dot and screen-reader text. Skills without a `level` are unaffected.

### Adding a project

```ts
// src/data/projects.ts
{
  slug: "my-project",             // must be unique
  title: "My Project",
  tagline: "One-line summary",
  description: "A paragraph of context.",
  status: "completed",
  categories: ["web"],            // must match ids in projectFilters
  tech: ["Next.js", "TypeScript"],
  features: ["What it does"],
  image: "/images/projects/my-project.png",
  imageAlt: "Describe the image for screen readers.",
  repoUrl: "https://github.com/you/my-project",   // or null
  demoUrl: null,
}
```

New filter categories go in the `projectFilters` array in the same file.

---

## Contact form setup

**The form never fakes a successful send.** There are two real behaviours:

### Without configuration (default)

The form validates the input, then hands the message to the visitor's mail client and tells them
plainly that this is what happened. It works out of the box with no account or backend.

### With an endpoint

Set an environment variable and the form POSTs JSON instead:

```bash
# .env.local
NEXT_PUBLIC_CONTACT_ENDPOINT=https://formspree.io/f/xxxxxxxx
```

Copy `.env.example` to get started. Any endpoint that accepts a JSON `POST` works — Formspree,
Web3Forms, or your own API route. The payload is:

```json
{ "name": "…", "email": "…", "subject": "…", "message": "…" }
```

If the request fails, the form says so and offers the direct email address as a fallback — it will
not claim a message was delivered when it wasn't.

### Validation and spam

Validation lives in `src/lib/validation.ts` and runs client-side only, so it does not replace server
validation on your endpoint. There is also a hidden honeypot field; submissions that fill it are
silently discarded.

---

## Design system

Tokens are defined once in `src/app/globals.css` and consumed as Tailwind utilities. Because
components only reference semantic names (`bg-canvas`, `text-ink`, `border-line`,
`bg-accent-solid`), retheming means editing one block of CSS.

```
bg-canvas / bg-canvas-subtle     page and recessed backgrounds
bg-surface                       cards and raised elements
border-line / border-line-strong hairlines and dividers
text-ink / -muted / -subtle      three-level text hierarchy
accent / accent-solid / accent-fg / accent-soft
warn / warn-soft                 placeholder and warning states
```

### Changing the accent colour

Set `--accent`, `--accent-solid`, `--accent-fg` and `--accent-soft` in both the `:root` and
`[data-theme="dark"]` blocks. `--accent` is used for text and icons; `--accent-solid` for filled
surfaces. Keep them separate — a colour that reads well as a large fill usually fails contrast as
small text on a light background.

The current palette was contrast-checked against WCAG AA:

| Pairing                       | Light   | Dark    |
| ----------------------------- | ------- | ------- |
| Body text on background       | ~18:1   | ~15:1   |
| Muted text on background      | ~5.9:1  | ~8.3:1  |
| Accent text on background     | ~7.4:1  | ~13.3:1 |
| Button label on button fill   | ~5.6:1  | ~5.6:1  |

If you change colours, re-check them — `--accent-fg` on `--accent-solid` is the easiest one to
break.

---

## Accessibility & performance

Built in, not bolted on:

- **Skip to content** link as the first focusable element
- Semantic landmarks with `aria-labelledby` on every section
- Visible focus rings on one consistent accent token
- Mobile menu and image lightbox both trap focus, close on `Escape`, and restore focus on close
- Lightbox supports arrow-key navigation
- `prefers-reduced-motion` respected — a shared `Reveal` wrapper falls back to a plain fade
- Theme is applied by an inline `<head>` script before first paint, so there is no flash
- Custom 404 that matches the design
- A `<noscript>` fallback so animated sections are still visible without JavaScript
- Full keyboard operability throughout

Performance:

- **Fully static** — every route prerenders to HTML at build time
- Fonts self-hosted by `next/font`, no third-party requests
- Framer Motion loaded via `LazyMotion`, so the animation engine isn't in the initial bundle
- `next/image` with explicit aspect ratios (`sizes`, `fill`) to prevent layout shift
- Content shipped to the browser only where interaction requires it

---

## Deployment

### Vercel (recommended)

1. Push the repository to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new).
3. Vercel detects Next.js automatically — accept the defaults.
4. Add `NEXT_PUBLIC_CONTACT_ENDPOINT` and, if you have a custom domain,
   `NEXT_PUBLIC_SITE_URL` under **Settings → Environment Variables**.
5. Deploy. Without `NEXT_PUBLIC_SITE_URL`, the canonical and Open Graph URLs
   automatically use the `*.vercel.app` domain Vercel assigns — add the variable
   and redeploy once you attach a real domain.

### Anywhere else

```bash
npm run build
npm run start
```

The app is fully static, so it can also be exported to a static host — add `output: "export"` to
`next.config.ts` if your host requires a plain HTML bundle.

---

## Troubleshooting

**Fonts look wrong on first load.**
`next/font` fetches and self-hosts fonts at build time. Run `npm run build` once with a network
connection, or check that `Sora`, `Inter` and `JetBrains_Mono` aren't blocked.

**The contact form opens my mail client instead of sending.**
`NEXT_PUBLIC_CONTACT_ENDPOINT` isn't set. See [Contact form setup](#contact-form-setup).

**`new Date()` breaks the build.**
Cache Components treats `new Date()`, `Math.random()` and `crypto.randomUUID()` as blocking
prerender values, because they differ between renders. Wrap them in a `"use cache"` function — see
the working example in `src/lib/date.ts`.

**`next lint` doesn't exist.**
It was removed in Next.js 16. Use `npm run lint`, which calls ESLint directly.

**Odd build slowness or file-lock errors on Windows.**
If the project is inside a OneDrive folder, exclude `node_modules` and `.next` from sync. Both
contain tens of thousands of small files, and OneDrive's file watcher can lock them mid-build.

**A dev-mode warning says a gallery image "was detected as the Largest Contentful Paint".**
A false positive from Next.js's LCP heuristic. The photography tiles sit thousands of pixels below
the fold and are lazy-loaded on purpose, so they are never the real LCP on a normal page load — the
warning only appears after the viewport is resized while the browser has already loaded them. Do
not "fix" it with `loading="eager"`; that would eagerly download images no visitor has scrolled to.

---

## Licence and credits

Personal portfolio of Jessica Lindsey Miranda. Placeholder graphics were generated for this project
and are free to replace. GitHub and LinkedIn brand marks are used nominatively, to link to the site
owner's own profiles.
