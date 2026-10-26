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
import type { Certification, CertificationStatus } from "@/types/content";

export function AddCertificationModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [form, setForm] = useState<Partial<Certification>>({
    id: "",
    title: "",
    issuer: null,
    dateIssued: null,
    credentialId: null,
    credentialUrl: null,
    image: null,
    imageAlt: "",
    status: "issued",
  });

  const [copyMessage, setCopyMessage] = useState<string | null>(null);

  const updateField = useCallback((key: string, value: string | null) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleCopy = useCallback(() => {
    const snippet = generateSnippet(form as Certification);
    navigator.clipboard.writeText(snippet).then(() => {
      setCopyMessage("Copied to clipboard!");
      setTimeout(() => setCopyMessage(null), 2000);
    });
  }, [form]);

  const snippet = useMemo(() => generateSnippet(form as Certification), [form]);

  const statusOptions: CertificationStatus[] = ["issued", "in-progress", "planned"];

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogPanel>
        <DialogCloseButton onClose={onClose} />
        <DialogTitle>Add Certification</DialogTitle>
        <DialogDescription>
          Fill in the details below, then copy the generated TypeScript and
          paste it into `src/data/certifications.ts`.
        </DialogDescription>

        <form className="mt-6 space-y-5" onSubmit={(e) => e.preventDefault()}>
          <Field id="add-cert-id" label="Id (URL-safe, unique)" required>
            <Input id="add-cert-id" value={form.id ?? ""} onChange={(e) => updateField("id", e.target.value)} placeholder="my-certification" />
          </Field>

          <Field id="add-cert-title" label="Title" required>
            <Input id="add-cert-title" value={form.title ?? ""} onChange={(e) => updateField("title", e.target.value)} placeholder="Certification Name" />
          </Field>

          <Field id="add-cert-issuer" label="Issued by" hint="Leave empty to show placeholder">
            <Input id="add-cert-issuer" value={form.issuer ?? ""} onChange={(e) => updateField("issuer", e.target.value || null)} placeholder="e.g. Fortinet Training Institute" />
          </Field>

          <Field id="add-cert-date" label="Date issued" hint="e.g. 13 October 2026">
            <Input id="add-cert-date" value={form.dateIssued ?? ""} onChange={(e) => updateField("dateIssued", e.target.value || null)} placeholder="13 October 2026" />
          </Field>

          <Field id="add-cert-credential-id" label="Credential ID" hint="Optional">
            <Input id="add-cert-credential-id" value={form.credentialId ?? ""} onChange={(e) => updateField("credentialId", e.target.value || null)} placeholder="abc123-def456" />
          </Field>

          <Field id="add-cert-credential-url" label="Credential URL / PDF path" hint="e.g. /certificates/my-cert.pdf">
            <Input id="add-cert-credential-url" value={form.credentialUrl ?? ""} onChange={(e) => updateField("credentialUrl", e.target.value || null)} placeholder="/certificates/my-cert.pdf" />
          </Field>

          <Field id="add-cert-image" label="Certificate preview image" hint="e.g. /images/certifications/my-cert.jpg">
            <Input id="add-cert-image" value={form.image ?? ""} onChange={(e) => updateField("image", e.target.value || null)} placeholder="/images/certifications/my-cert.jpg" />
          </Field>

          <Field id="add-cert-image-alt" label="Image alt text">
            <Input id="add-cert-image-alt" value={form.imageAlt ?? ""} onChange={(e) => updateField("imageAlt", e.target.value)} placeholder="Description of the certificate image" />
          </Field>

          <Field id="add-cert-status" label="Status">
            <select id="add-cert-status" value={form.status ?? "issued"} onChange={(e) => updateField("status", e.target.value as CertificationStatus)} className="w-full rounded-xl border border-line bg-canvas px-3.5 py-2.5 text-[0.9375rem] text-ink">
              {statusOptions.map((s) => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
            </select>
          </Field>
        </form>

        <DialogFooter>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={handleCopy} disabled={!form.id || !form.title}>
            {copyMessage ? "Copied!" : "Copy TypeScript Snippet"}
          </Button>
        </DialogFooter>

        {snippet && (
          <div className="mt-6 rounded-xl border border-line bg-canvas-subtle p-4">
            <p className="mb-2 font-mono text-[0.6875rem] tracking-wider text-ink-muted uppercase">Generated code — paste into `src/data/certifications.ts`</p>
            <pre className="overflow-x-auto rounded-lg border border-line bg-surface p-3 text-[0.75rem] font-mono text-ink"><code>{snippet}</code></pre>
          </div>
        )}
      </DialogPanel>
    </Dialog>
  );
}

function generateSnippet(cert: Certification): string {
  const str = (v: string | null) => v === null ? "null" : `"${v.replace(/"/g, '\\"')}"`;
  return `  {\n    id: ${str(cert.id)},\n    title: ${str(cert.title)},\n    issuer: ${str(cert.issuer)},\n    dateIssued: ${str(cert.dateIssued)},\n    credentialId: ${str(cert.credentialId)},\n    credentialUrl: ${str(cert.credentialUrl)},\n    image: ${str(cert.image)},\n    imageAlt: ${str(cert.imageAlt)},\n    status: "${cert.status}",\n  },`;
}
