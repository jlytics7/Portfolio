import { cn } from "@/lib/utils";

/**
 * The surface used by nearly every block on the page — projects, skills,
 * certifications, the contact form. One definition keeps the border radius,
 * border weight and shadow consistent everywhere.
 */
export function Card({
  children,
  className,
  interactive = false,
  as: Component = "div",
}: {
  children: React.ReactNode;
  className?: string;
  /** Adds lift + border shift on hover. Use for cards that are clickable. */
  interactive?: boolean;
  as?: React.ElementType;
}) {
  return (
    <Component
      className={cn(
        "rounded-2xl border border-line bg-surface shadow-card",
        interactive &&
          "transition-[border-color,box-shadow,transform] duration-300 ease-out hover:-translate-y-0.5 hover:border-line-strong hover:shadow-card-hover",
        className,
      )}
    >
      {children}
    </Component>
  );
}
