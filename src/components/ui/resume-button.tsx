import { Download } from "lucide-react";

import { ButtonLink } from "@/components/ui/button";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

/**
 * Download Resume, wired to `profile.resume`.
 *
 * When `profile.resume.available` is `false` this renders a non-interactive
 * "unavailable" state with an explanation, rather than a link to a missing
 * file. Used in the nav, the hero and the mobile menu.
 */
export function ResumeButton({
  variant = "secondary",
  size = "md",
  className,
}: {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const { url, fileName, available } = profile.resume;

  return (
    <ButtonLink
      href={url}
      download={fileName}
      variant={variant}
      size={size}
      className={cn(className)}
      disabledReason={
        available
          ? undefined
          : "Resume file not added yet — drop it into public/resume/ and set profile.resume.available to true"
      }
    >
      <Download aria-hidden className="size-4" />
      Download Resume
    </ButtonLink>
  );
}
