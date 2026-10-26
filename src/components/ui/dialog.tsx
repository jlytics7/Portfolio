"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Simple, accessible dialog (modal) rendered through a portal into <body>.
 *
 * Usage:
 *   const [open, setOpen] = useState(false);
 *   return (
 *     <>
 *       <button onClick={() => setOpen(true)}>Open</button>
 *       <Dialog open={open} onClose={() => setOpen(false)}>
 *         <DialogTitle>Title</DialogTitle>
 *         <DialogDescription>Content</DialogDescription>
 *       </Dialog>
 *     </>
 *   );
 */

interface DialogProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Dialog({ open, onClose, children }: DialogProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "";
      };
    }
  }, [open, handleKeyDown]);

  if (!open) return null;

  return createPortal(
    <div
      ref={containerRef}
      className="fixed inset-0 z-[80] flex items-center justify-center"
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className="relative z-10 w-full max-w-2xl mx-auto p-4 sm:p-6 md:p-8 max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
      >
        {children}
      </div>
    </div>,
    document.body
  );
}

interface DialogTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function DialogTitle({ children, className }: DialogTitleProps) {
  return (
    <h2
      className={cn(
        "font-display font-semibold tracking-tight text-ink text-lg sm:text-xl",
        className
      )}
    >
      {children}
    </h2>
  );
}

interface DialogDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export function DialogDescription({ children, className }: DialogDescriptionProps) {
  return (
    <p
      className={cn("text-[0.875rem] leading-relaxed text-ink-muted", className)}
    >
      {children}
    </p>
  );
}

interface DialogFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function DialogFooter({ children, className }: DialogFooterProps) {
  return (
    <div className={cn("mt-6 flex flex-col sm:flex-row sm:justify-end gap-3", className)}>
      {children}
    </div>
  );
}

/**
 * Make footer buttons full-width on mobile, side-by-side on larger screens.
 */
export function DialogFooterActions({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex flex-col sm:flex-row gap-2 w-full", className)}>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        return React.cloneElement(child as React.ReactElement, {
          className: cn(
            (child as React.ReactElement).props.className,
            "w-full sm:w-auto",
          ),
        });
      })}
    </div>
  );
}

interface DialogCloseButtonProps {
  onClose: () => void;
}

export function DialogCloseButton({ onClose }: DialogCloseButtonProps) {
  return (
    <button
      type="button"
      onClick={onClose}
      className="absolute right-4 top-4 rounded-full p-1.5 text-ink-muted hover:text-ink hover:bg-canvas-subtle transition-colors"
      aria-label="Close dialog"
    >
      <X className="size-5" aria-hidden />
    </button>
  );
}

interface DialogPanelProps {
  children: React.ReactNode;
  className?: string;
}

export function DialogPanel({ children, className }: DialogPanelProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-line bg-surface shadow-card p-6 sm:p-8",
        className
      )}
    >
      {children}
    </div>
  );
}