import { Mail } from "lucide-react";

import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";
import { socials } from "@/data/socials";
import { cn } from "@/lib/utils";

const icons: Record<string, React.ComponentType<{ className?: string }>> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  email: Mail,
};

/**
 * Icon row for the hero and footer.
 *
 * Links still marked as placeholders in `src/data/socials.ts` get a dashed
 * amber outline and a tooltip, so an unfinished profile is obvious rather than
 * silently broken.
 */
export function SocialIconLinks({
  className,
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md";
}) {
  return (
    <ul className={cn("flex items-center gap-2.5", className)}>
      {socials.map((social) => {
        const Icon = icons[social.id];
        const isMail = social.href.startsWith("mailto:");

        return (
          <li key={social.id}>
            <a
              href={social.href}
              target={isMail ? undefined : "_blank"}
              rel={isMail ? undefined : "noreferrer noopener"}
              aria-label={social.label}
              title={
                social.isPlaceholder
                  ? `${social.label} — placeholder link, update src/data/socials.ts`
                  : social.label
              }
              className={cn(
                "grid place-items-center rounded-full border bg-surface text-ink-muted",
                "transition-colors duration-200 hover:border-accent-solid hover:text-accent",
                size === "md" ? "size-11" : "size-9",
                social.isPlaceholder
                  ? "border-dashed border-warn/60"
                  : "border-line",
              )}
            >
              {Icon ? (
                <Icon
                  className={size === "md" ? "size-[1.1rem]" : "size-4"}
                />
              ) : null}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
