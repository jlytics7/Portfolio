"use client";

import { AlertTriangle, CheckCircle2, Loader2, Mail, Send } from "lucide-react";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Field, Honeypot, Input, Textarea } from "@/components/ui/field";
import { emailLink } from "@/data/socials";
import {
  EMPTY_CONTACT_FORM,
  hasErrors,
  validateContactForm,
  type ContactFormErrors,
} from "@/lib/validation";
import type { ContactFormValues } from "@/types/content";

/**
 * Contact form.
 *
 * There is no fake success state here. Two real outcomes exist:
 *
 *  1. An endpoint is configured via `NEXT_PUBLIC_CONTACT_ENDPOINT`
 *     (Formspree, Web3Forms, a custom API route — anything that accepts a JSON
 *     POST). The form sends to it and reports what actually happened.
 *
 *  2. No endpoint is configured. The form validates, then hands the message to
 *     the visitor's mail client, and says so plainly.
 *
 * Never claim a message was delivered when no delivery took place.
 */

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "delivered" }
  | { kind: "handed-off" }
  | { kind: "failed"; message: string };

const ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;

/** "mailto:someone@example.com" -> "someone@example.com" */
const recipient = emailLink?.href.replace(/^mailto:/, "") ?? "";

export function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>(EMPTY_CONTACT_FORM);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  /** Errors only appear after a submit attempt, or on blur once touched. */
  const [submitted, setSubmitted] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  function update<K extends keyof ContactFormValues>(
    key: K,
    value: ContactFormValues[K],
  ) {
    setValues((previous) => ({ ...previous, [key]: value }));

    // Clear a field's error as soon as the visitor starts fixing it.
    if (errors[key]) {
      setErrors((previous) => ({ ...previous, [key]: undefined }));
    }
    if (status.kind !== "idle") setStatus({ kind: "idle" });
  }

  function handleBlur(field: keyof ContactFormValues) {
    if (!submitted) return;
    const next = validateContactForm(values);
    setErrors((previous) => ({ ...previous, [field]: next[field] }));
  }

  function buildMailtoLink() {
    const subject = values.subject.trim() || "Portfolio enquiry";
    const body = [
      values.message.trim(),
      "",
      "—",
      values.name.trim(),
      values.email.trim(),
    ].join("\n");

    return `mailto:${recipient}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);

    const validationErrors = validateContactForm(values);
    setErrors(validationErrors);

    if (hasErrors(validationErrors)) {
      // Move focus to the first problem so keyboard users aren't left guessing.
      const firstKey = Object.keys(validationErrors)[0];
      formRef.current
        ?.querySelector<HTMLElement>(`[name="${firstKey}"]`)
        ?.focus();
      return;
    }

    // Silently accept and discard bot submissions.
    if (honeypot.trim() !== "") {
      setStatus({ kind: "delivered" });
      return;
    }

    if (!ENDPOINT) {
      // No backend configured — hand off to the mail client, and say so.
      window.location.href = buildMailtoLink();
      setStatus({ kind: "handed-off" });
      return;
    }

    setStatus({ kind: "submitting" });

    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          subject: values.subject.trim(),
          message: values.message.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      setStatus({ kind: "delivered" });
      setValues(EMPTY_CONTACT_FORM);
      setSubmitted(false);
    } catch (error) {
      setStatus({
        kind: "failed",
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong while sending.",
      });
    }
  }

  const isSubmitting = status.kind === "submitting";

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="relative rounded-2xl border border-line bg-surface p-6 shadow-card sm:p-7"
    >
      <Honeypot value={honeypot} onChange={setHoneypot} />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="contact-name" label="Name" error={errors.name}>
          <Input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your full name"
            value={values.name}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            onChange={(event) => update("name", event.target.value)}
            onBlur={() => handleBlur("name")}
          />
        </Field>

        <Field id="contact-email" label="Email" error={errors.email}>
          <Input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={values.email}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            onChange={(event) => update("email", event.target.value)}
            onBlur={() => handleBlur("email")}
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field id="contact-subject" label="Subject" error={errors.subject}>
          <Input
            id="contact-subject"
            name="subject"
            type="text"
            placeholder="What is this about?"
            value={values.subject}
            aria-invalid={Boolean(errors.subject)}
            aria-describedby={
              errors.subject ? "contact-subject-error" : undefined
            }
            onChange={(event) => update("subject", event.target.value)}
            onBlur={() => handleBlur("subject")}
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field id="contact-message" label="Message" error={errors.message}>
          <Textarea
            id="contact-message"
            name="message"
            rows={6}
            placeholder="A little context helps — what are you reaching out about?"
            value={values.message}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={
              errors.message ? "contact-message-error" : undefined
            }
            onChange={(event) => update("message", event.target.value)}
            onBlur={() => handleBlur("message")}
          />
        </Field>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 aria-hidden className="size-4 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              <Send aria-hidden className="size-4" />
              Send Message
            </>
          )}
        </Button>

        <p className="text-[0.75rem] text-ink-subtle">
          All fields are required.
        </p>
      </div>

      {/* Status ------------------------------------------------------- */}
      <div aria-live="polite" className="mt-5 empty:mt-0">
        {status.kind === "delivered" ? (
          <p className="flex items-start gap-2.5 rounded-xl border border-accent-solid/30 bg-accent-soft px-4 py-3 text-[0.8125rem] text-accent">
            <CheckCircle2 aria-hidden className="mt-px size-4 shrink-0" />
            Your message was sent. Thanks for reaching out — I&apos;ll reply as
            soon as I can.
          </p>
        ) : null}

        {status.kind === "handed-off" ? (
          <p className="flex items-start gap-2.5 rounded-xl border border-warn/35 bg-warn-soft px-4 py-3 text-[0.8125rem] text-warn">
            <Mail aria-hidden className="mt-px size-4 shrink-0" />
            <span>
              This form has no backend configured, so your mail client should
              now be open with the message ready to send. If nothing happened,
              email{" "}
              <a
                href={`mailto:${recipient}`}
                className="font-medium underline underline-offset-2"
              >
                {recipient}
              </a>{" "}
              directly. To send from this form instead, set{" "}
              <code className="font-mono text-[0.75rem]">
                NEXT_PUBLIC_CONTACT_ENDPOINT
              </code>{" "}
              — see the README.
            </span>
          </p>
        ) : null}

        {status.kind === "failed" ? (
          <p className="flex items-start gap-2.5 rounded-xl border border-warn/35 bg-warn-soft px-4 py-3 text-[0.8125rem] text-warn">
            <AlertTriangle aria-hidden className="mt-px size-4 shrink-0" />
            <span>
              The message could not be sent ({status.message}). Please try
              again, or email{" "}
              <a
                href={`mailto:${recipient}`}
                className="font-medium underline underline-offset-2"
              >
                {recipient}
              </a>{" "}
              directly.
            </span>
          </p>
        ) : null}
      </div>

      {/* Configuration hint for the site owner, not visitors. ---------- */}
      {!ENDPOINT ? (
        <p className="mt-5 border-t border-line pt-5 font-mono text-[0.6875rem] leading-relaxed text-ink-subtle">
          Note: NEXT_PUBLIC_CONTACT_ENDPOINT is unset, so submissions fall back
          to a mailto hand-off. See the README to connect a real endpoint.
        </p>
      ) : null}
    </form>
  );
}
