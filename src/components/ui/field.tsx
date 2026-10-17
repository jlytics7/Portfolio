import { cn } from "@/lib/utils";

const controlStyles =
  "w-full rounded-xl border border-line bg-canvas px-3.5 py-2.5 text-[0.9375rem] text-ink placeholder:text-ink-subtle/70 transition-[border-color,box-shadow] duration-200 focus:border-accent-solid focus:outline-none aria-[invalid=true]:border-warn";

/**
 * Label + control + error message.
 *
 * The error is wired up with `role="alert"` and an `${id}-error` id that the
 * matching control points at with `aria-describedby`. `aria-invalid` drives
 * the red border through the `aria-[invalid=true]` variant, so the visual
 * state and the accessibility tree can never disagree.
 */
export function Field({
  id,
  label,
  error,
  hint,
  required = true,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="font-mono text-[0.6875rem] tracking-wider text-ink-muted uppercase"
      >
        {label}
        {required ? (
          <span aria-hidden className="ml-1 text-accent-solid">
            *
          </span>
        ) : (
          <span className="ml-1 text-ink-subtle normal-case">(optional)</span>
        )}
      </label>

      {children}

      {hint && !error ? (
        <p className="text-[0.75rem] text-ink-subtle">{hint}</p>
      ) : null}

      {error ? (
        <p
          id={`${id}-error`}
          role="alert"
          className="text-[0.75rem] text-warn"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(controlStyles, className)} {...props} />;
}

export function Textarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(controlStyles, "resize-y", className)}
      {...props}
    />
  );
}

/** Visually hidden but still in the DOM — used for the spam honeypot. */
export function Honeypot({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div aria-hidden className="absolute h-0 w-0 overflow-hidden opacity-0">
      <label htmlFor="contact-company">Company (leave this empty)</label>
      <input
        id="contact-company"
        name="company"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
