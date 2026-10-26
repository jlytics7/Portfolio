"use client";

import { Plus } from "lucide-react";
import { Award, ExternalLink } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { CertificationStatusBadge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AddCertificationModal } from "@/components/admin/add-certification-modal";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import {
  certificationPlaceholders,
  certificationStatusLabels,
  certifications,
} from "@/data/certifications";
import type { Certification } from "@/types/content";
import { cn } from "@/lib/utils";

/**
 * A single metadata row.
 *
 * Missing values render the instruction from
 * `certificationPlaceholders` in an amber tone rather than inventing an issuer
 * or a date. Filling the field in `src/data/certifications.ts` makes the
 * placeholder disappear on its own.
 */
function MetaRow({
  label,
  value,
  placeholder,
}: {
  label: string;
  value: string | null;
  placeholder: string;
}) {
  return (
    <div className="py-3 first:pt-0">
      <dt className="font-mono text-[0.6875rem] tracking-wider text-ink-subtle uppercase">
        {label}
      </dt>
      <dd
        className={cn(
          "mt-1.5 text-[0.8125rem] leading-snug",
          value ? "text-ink" : "text-warn",
        )}
      >
        {value ?? placeholder}
      </dd>
    </div>
  );
}

function CertificationCard({
  certification,
}: {
  certification: Certification;
}) {
  const hasCredential = Boolean(certification.credentialUrl);

  return (
    <Card className="flex flex-col overflow-hidden">
      {/* Preview ------------------------------------------------------ */}
      {/* Certificates are landscape documents, so the frame is 3:2 rather
          than the usual 4:3 and `object-contain` never crops the issuer,
          date or credential ID out of the image. */}
      <div className="relative aspect-3/2 border-b border-line bg-canvas-subtle">
        {certification.image ? (
          <Image
            src={certification.image}
            alt={certification.imageAlt}
            fill
            sizes="(min-width: 1280px) 33vw, (min-width: 768px) 45vw, 92vw"
            quality={100}
            className="object-contain"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
            <span
              aria-hidden
              className="grid size-11 place-items-center rounded-full border border-line bg-surface text-ink-subtle"
            >
              <Award className="size-[1.15rem]" />
            </span>
            <p className="font-mono text-[0.6875rem] tracking-wider text-ink-subtle uppercase">
              Certificate preview to be added
            </p>
          </div>
        )}

        <div className="absolute top-3 right-3">
          <CertificationStatusBadge
            status={certification.status}
            label={certificationStatusLabels[certification.status]}
          />
        </div>
      </div>

      {/* Details ------------------------------------------------------ */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-lg leading-snug font-semibold tracking-tight text-ink">
          {certification.title}
        </h3>

        <dl className="mt-5 divide-y divide-line">
          <MetaRow
            label="Issued by"
            value={certification.issuer}
            placeholder={certificationPlaceholders.issuer}
          />
          <MetaRow
            label="Date issued"
            value={certification.dateIssued}
            placeholder={certificationPlaceholders.date}
          />
          {certification.credentialId ? (
            <MetaRow
              label="Credential ID"
              value={certification.credentialId}
              placeholder={certificationPlaceholders.credentialId}
            />
          ) : null}
        </dl>

        <div className="mt-auto pt-6">
          <ButtonLink
            href={certification.credentialUrl ?? undefined}
            target="_blank"
            rel="noreferrer noopener"
            variant={hasCredential ? "secondary" : "secondary"}
            size="sm"
            className="w-full"
            disabledReason={
              hasCredential
                ? undefined
                : "No verification link yet — add credentialUrl in src/data/certifications.ts"
            }
          >
            <ExternalLink aria-hidden className="size-4" />
            View Certificate
          </ButtonLink>
        </div>
      </div>
    </Card>
  );
}

/**
 * Certifications & achievements.
 *
 * Everything here is driven by `src/data/certifications.ts`. Adding an entry is
 * a copy-paste of one object; no changes to this component are needed.
 */
export function Certifications() {
  const [addCertificationOpen, setAddCertificationOpen] = useState(false);

  return (
    <Section id="certifications" labelledBy="certifications-heading">
      <SectionHeading
        id="certifications-heading"
        overline="Certifications & Achievements"
        title="Credentials, and the progress towards them."
        description="Each entry shows the certificate itself, with a link to open it in full."
      />

      <div className="flex justify-between items-end mb-4">
        <Button variant="primary" size="sm" onClick={() => setAddCertificationOpen(true)}>
          <Plus className="size-4" aria-hidden /> Add Certificate
        </Button>
        <AddCertificationModal open={addCertificationOpen} onClose={() => setAddCertificationOpen(false)} />
      </div>

      {certifications.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-line-strong bg-canvas-subtle px-6 py-12 text-center text-sm text-ink-muted">
          No certifications added yet. Add one in{" "}
          <span className="font-mono text-[0.8125rem] text-accent">
            src/data/certifications.ts
          </span>
          .
        </p>
      ) : (
        <RevealGroup
          className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
          stagger={0.08}
        >
          {certifications.map((certification) => (
            <RevealItem key={certification.id}>
              <CertificationCard certification={certification} />
            </RevealItem>
          ))}
        </RevealGroup>
      )}
    </Section>
  );
}
