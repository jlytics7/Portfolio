"use client";

import { useCallback, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogCloseButton,
  DialogDescription,
  DialogFooter,
  DialogPanel,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, Input, Textarea } from "@/components/ui/field";
import type { Project, ProjectCategory, ProjectStatus } from "@/types/content";

export function AddProjectModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [form, setForm] = useState<Partial<Project>>({
    slug: "",
    title: "",
    tagline: "",
    description: "",
    status: "unconfirmed",
    categories: ["web"],
    tech: [],
    features: [],
    image: "/images/projects/placeholder.svg",
    imageAlt: "Placeholder thumbnail.",
  });

  const [feature, setFeature] = useState("");
  const [tech, setTech] = useState("");
  const [copyMessage, setCopyMessage] = useState<string | null>(null);

  const updateField = useCallback((key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  }, []);

  const toggleCategory = useCallback((id: ProjectCategory) => {
    setForm((prev) => {
      const current = prev.categories ?? [];
      if (current.includes(id)) {
        return { ...prev, categories: current.filter((c) => c !== id) };
      }
      return { ...prev, categories: [...current, id] };
    });
  }, []);

  const addTech = useCallback(() => {
    if (!tech.trim()) return;
    setForm((prev) => ({
      ...prev,
      tech: [...(prev.tech ?? []), tech.trim()],
    }));
    setTech("");
  }, [tech]);

  const removeTech = useCallback((index: number) => {
    setForm((prev) => ({
      ...prev,
      tech: prev.tech ? prev.tech.filter((_, i) => i !== index) : [],
    }));
  }, []);

  const addFeature = useCallback(() => {
    if (!feature.trim()) return;
    setForm((prev) => ({
      ...prev,
      features: [...(prev.features ?? []), feature.trim()],
    }));
    setFeature("");
  }, [feature]);

  const removeFeature = useCallback((index: number) => {
    setForm((prev) => ({
      ...prev,
      features: prev.features ? prev.features.filter((_, i) => i !== index) : [],
    }));
  }, []);

  const handleCopy = useCallback(() => {
    const snippet = generateSnippet(form as Project);
    navigator.clipboard.writeText(snippet).then(() => {
      setCopyMessage("Copied to clipboard!");
      setTimeout(() => setCopyMessage(null), 2000);
    });
  }, [form]);

  const snippet = useMemo(() => generateSnippet(form as Project), [form]);

  const categoryOptions: { id: ProjectCategory; label: string }[] = [
    { id: "web", label: "Web Development" },
    { id: "data", label: "Data Analytics" },
    { id: "academic", label: "Academic Projects" },
    { id: "design", label: "Design" },
  ];

  const statusOptions: ProjectStatus[] = ["concept", "in-progress", "academic", "completed"];

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogPanel>
        <DialogCloseButton onClose={onClose} />
        <DialogTitle>Add Project</DialogTitle>
        <DialogDescription>
          Fill in the details below, then copy the generated TypeScript and
          paste it into `src/data/projects.ts`.
        </DialogDescription>

        <form className="mt-6 space-y-5" onSubmit={(e) => e.preventDefault()}>
          <Field id="add-project-slug" label="Slug (URL-safe id)" required>
            <Input
              id="add-project-slug"
              value={form.slug ?? ""}
              onChange={(e) => updateField("slug", e.target.value)}
              placeholder="my-project"
            />
          </Field>

          <Field id="add-project-title" label="Title" required>
            <Input
              id="add-project-title"
              value={form.title ?? ""}
              onChange={(e) => updateField("title", e.target.value)}
              placeholder="My Project"
            />
          </Field>

          <Field id="add-project-tagline" label="Tagline">
            <Input
              id="add-project-tagline"
              value={form.tagline ?? ""}
              onChange={(e) => updateField("tagline", e.target.value)}
              placeholder="A short description"
            />
          </Field>

          <Field id="add-project-description" label="Description">
            <Textarea
              id="add-project-description"
              value={form.description ?? ""}
              onChange={(e) => updateField("description", e.target.value)}
              rows={3}
              placeholder="What does this project do?"
            />
          </Field>

          <Field id="add-project-status" label="Status">
            <select
              id="add-project-status"
              value={form.status ?? "unconfirmed"}
              onChange={(e) => updateField("status", e.target.value as ProjectStatus)}
              className="w-full rounded-xl border border-line bg-canvas px-3.5 py-2.5 text-[0.9375rem] text-ink"
            >
              <option value="unconfirmed">TBC (unconfirmed)</option>
              {statusOptions.map((s) => (
                <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
              ))}
            </select>
          </Field>

          <div className="flex flex-col gap-3">
            <label className="font-mono text-[0.6875rem] tracking-wider text-ink-muted uppercase">Categories</label>
            <div className="flex flex-wrap gap-2">
              {categoryOptions.map((cat) => {
                const active = (form.categories ?? []).includes(cat.id);
                return (
                  <button key={cat.id} type="button" onClick={() => toggleCategory(cat.id)}
                    className={`rounded-full border px-3 py-1.5 text-[0.8125rem] font-medium transition-colors ${active ? "border-transparent bg-accent-solid text-accent-fg" : "border-line bg-surface text-ink-muted hover:border-line-strong hover:text-ink"}`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-baseline gap-2">
              <label className="font-mono text-[0.6875rem] tracking-wider text-ink-muted uppercase">Tech stack</label>
              <div className="flex gap-2">
                <Input value={tech} onChange={(e) => setTech(e.target.value)} placeholder="e.g. React, TypeScript" />
                <Button onClick={addTech} size="sm">Add</Button>
              </div>
            </div>
            {(form.tech ?? []).length > 0 && (
              <div className="flex flex-wrap gap-2">
                {(form.tech ?? []).map((item, index) => (
                  <span key={item} className="rounded-full border border-line bg-canvas-subtle px-3 py-1.5 text-[0.8125rem] text-ink-muted flex items-center gap-2">
                    {item}
                    <button type="button" onClick={() => removeTech(index)} className="text-ink-subtle hover:text-accent" aria-label={`Remove ${item}`}>×</button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-baseline gap-2">
              <label className="font-mono text-[0.6875rem] tracking-wider text-ink-muted uppercase">Features</label>
              <div className="flex gap-2">
                <Input value={feature} onChange={(e) => setFeature(e.target.value)} placeholder="e.g. User authentication" />
                <Button onClick={addFeature} size="sm">Add</Button>
              </div>
            </div>
            {(form.features ?? []).length > 0 && (
              <div className="flex flex-wrap gap-2">
                {(form.features ?? []).map((item, index) => (
                  <span key={item} className="rounded-full border border-line bg-canvas-subtle px-3 py-1.5 text-[0.8125rem] text-ink-muted flex items-center gap-2">
                    {item}
                    <button type="button" onClick={() => removeFeature(index)} className="text-ink-subtle hover:text-accent" aria-label={`Remove ${item}`}>×</button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <Field id="add-project-image" label="Image path" hint="e.g. /images/projects/my-project.svg">
            <Input id="add-project-image" value={form.image ?? ""} onChange={(e) => updateField("image", e.target.value)} />
          </Field>

          <Field id="add-project-image-alt" label="Image alt text">
            <Input id="add-project-image-alt" value={form.imageAlt ?? ""} onChange={(e) => updateField("imageAlt", e.target.value)} placeholder="Description of the project image" />
          </Field>
        </form>

        <DialogFooter>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={handleCopy} disabled={!form.slug || !form.title}>
            {copyMessage ? "Copied!" : "Copy TypeScript Snippet"}
          </Button>
        </DialogFooter>

        {snippet && (
          <div className="mt-6 rounded-xl border border-line bg-canvas-subtle p-4">
            <p className="mb-2 font-mono text-[0.6875rem] tracking-wider text-ink-muted uppercase">Generated code — paste into `src/data/projects.ts`</p>
            <pre className="overflow-x-auto rounded-lg border border-line bg-surface p-3 text-[0.75rem] font-mono text-ink"><code>{snippet}</code></pre>
          </div>
        )}
      </DialogPanel>
    </Dialog>
  );
}

function generateSnippet(project: Project): string {
  const techList = project.tech.map((t) => `"${t}"`).join(", ");
  const featuresList = project.features.map((f) => `      "${f}"`).join(",\n");
  const categoriesList = project.categories.map((c) => `"${c}"`).join(", ");
  return `  {\n    slug: "${project.slug}",\n    title: "${project.title}",\n    tagline: "${project.tagline ?? ""}",\n    description: "${project.description ?? ""}",\n    status: "${project.status}",\n    categories: [${categoriesList}],\n    tech: [${techList}],\n    features: [\n${featuresList}\n    ],\n    image: "${project.image}",\n    imageAlt: "${project.imageAlt}",\n    repoUrl: null,\n    demoUrl: null,\n  },`;
}
