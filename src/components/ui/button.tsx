import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-solid disabled:pointer-events-none disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-accent-solid text-accent-fg shadow-card hover:bg-accent-solid-hover hover:shadow-card-hover active:translate-y-px",
  secondary:
    "border border-line-strong bg-surface text-ink hover:border-accent-solid hover:text-accent active:translate-y-px",
  ghost: "text-ink-muted hover:bg-canvas-subtle hover:text-ink",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-[0.8125rem]",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-[0.9375rem]",
};

export function buttonStyles({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}) {
  return cn(base, variants[variant], sizes[size], className);
}

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({
  variant,
  size,
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonStyles({ variant, size, className })}
      {...props}
    />
  );
}

interface ButtonLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Renders as a non-interactive element with an explanatory tooltip. */
  disabledReason?: string;
  children: React.ReactNode;
}

/**
 * Anchor styled as a button.
 *
 * When `disabledReason` is set the link is removed from the tab order and
 * announced as disabled, instead of pointing somewhere that doesn't exist yet.
 * This is how project "GitHub" / "Live Demo" buttons behave while their URLs
 * are still `null` in the data files.
 */
export function ButtonLink({
  variant,
  size,
  className,
  disabledReason,
  children,
  href,
  ...props
}: ButtonLinkProps) {
  const isDisabled = Boolean(disabledReason);

  if (isDisabled) {
    return (
      <span
        role="link"
        aria-disabled="true"
        title={disabledReason}
        className={buttonStyles({
          variant: "secondary",
          size,
          className: cn(
            "cursor-not-allowed border-dashed opacity-55",
            className,
          ),
        })}
      >
        {children}
      </span>
    );
  }

  return (
    <a
      href={href}
      className={buttonStyles({ variant, size, className })}
      {...props}
    >
      {children}
    </a>
  );
}
