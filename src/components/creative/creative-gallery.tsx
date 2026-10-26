"use client";

import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";

import { useLockBodyScroll } from "@/hooks/use-lock-body-scroll";
import type { GalleryItem } from "@/types/content";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Every photo spans the full row so the gallery has the same layout across
 * all images — matching the "Between two frames" wide-photo treatment.
 */
function isWide(item: GalleryItem) {
  return true;
}

/** The client snapshot never changes, so there is nothing to subscribe to. */
const subscribeNoop = () => () => {};

function useIsClient() {
  return useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );
}

/* -------------------------------------------------------------------------- */
/*  Lightbox                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * Full-screen image viewer.
 *
 * Rendered through a portal into <body>. This matters: the section it would
 * otherwise live inside creates a stacking context, and the scroll-reveal
 * wrapper can carry a transform — either of which would size the overlay to
 * its container instead of the viewport, and let the sticky nav paint over it.
 * A portal puts it at the root, where `fixed inset-0` means what it says.
 */
function PhotoLightbox({
  items,
  index,
  onClose,
  onStep,
  reduceMotion,
}: {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onStep: (direction: 1 | -1) => void;
  reduceMotion: boolean | null;
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const current = items[index];

  useLockBodyScroll(true);

  /** Keyboard controls. */
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        onStep(1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        onStep(-1);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onStep]);

  /** Move focus into the dialog when it opens. */
  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  if (!current) return null;

  return (
    <m.div
      role="dialog"
      aria-modal="true"
      aria-label={`Image viewer: ${current.caption}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      className="fixed inset-0 z-[80] flex flex-col bg-black/90 backdrop-blur-sm"
    >
      {/* Toolbar */}
      <div className="flex shrink-0 items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <p className="font-mono text-[0.6875rem] tracking-wider text-white/60">
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(items.length).padStart(2, "0")}
        </p>

        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close image viewer"
          className="grid size-10 place-items-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-white/50 hover:text-white"
        >
          <X aria-hidden className="size-[1.05rem]" />
        </button>
      </div>

      {/* Image */}
      <div
        className="relative flex flex-1 items-center justify-center px-4 pb-4 sm:px-16"
        onClick={onClose}
      >
        <m.div
          key={current.id}
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="relative max-h-full"
          onClick={(event) => event.stopPropagation()}
        >
          <Image
            src={current.src}
            alt={current.alt}
            width={current.width}
            height={current.height}
            sizes="(min-width: 1024px) 70vw, 92vw"
            className="max-h-[72vh] w-auto rounded-xl object-contain"
          />
        </m.div>

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onStep(-1);
          }}
          aria-label="Previous image"
          className="absolute left-2 grid size-11 place-items-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-white/50 hover:text-white sm:left-4"
        >
          <ChevronLeft aria-hidden className="size-5" />
        </button>
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onStep(1);
          }}
          aria-label="Next image"
          className="absolute right-2 grid size-11 place-items-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-white/50 hover:text-white sm:right-4"
        >
          <ChevronRight aria-hidden className="size-5" />
        </button>
      </div>

      {/* Caption */}
      <div className="shrink-0 px-4 pb-6 text-center sm:px-6">
        <p className="text-sm text-white/85">{current.caption}</p>
        {current.tag ? (
          <p className="mt-1 font-mono text-[0.6875rem] tracking-wider text-white/50 uppercase">
            {current.tag}
          </p>
        ) : null}
      </div>
    </m.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Gallery                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * Photography gallery.
 *
 * A grid rather than a CSS column "masonry": masonry balances uneven column
 * heights by leaving a hole at the bottom of the shorter ones, which showed up
 * as a large blank block once the images stopped being equal-sized tiles.
 * Landscape images span the full row for the same reason (see `isWide`).
 *
 * Clicking any tile opens the lightbox, and focus returns to that tile when it
 * closes.
 */
export function CreativeGallery({ items }: { items: GalleryItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();
  const isClient = useIsClient();
  const tileRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const isOpen = openIndex !== null;

  const close = useCallback(() => {
    const index = openIndex;
    setOpenIndex(null);
    // Return focus to the tile that was opened, next frame.
    if (index !== null) {
      requestAnimationFrame(() => tileRefs.current[index]?.focus());
    }
  }, [openIndex]);

  const step = useCallback(
    (direction: 1 | -1) => {
      setOpenIndex((index) => {
        if (index === null) return index;
        return (index + direction + items.length) % items.length;
      });
    },
    [items.length],
  );

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <button
            key={item.id}
            ref={(element) => {
              tileRefs.current[index] = element;
            }}
            type="button"
            onClick={() => setOpenIndex(index)}
            aria-label={`Open image: ${item.caption}`}
            className={cn(
              "group relative block w-full overflow-hidden rounded-2xl border border-line bg-canvas-subtle text-left",
              isWide(item) && "lg:col-span-3",
            )}
          >
            <Image
              src={item.src}
              alt={item.alt}
              width={item.width}
              height={item.height}
              quality={100}
              sizes={
                isWide(item)
                  ? "(min-width: 1024px) 1152px, (min-width: 640px) 92vw, 92vw"
                  : "(min-width: 1024px) 33vw, (min-width: 640px) 45vw, 92vw"
              }
              className={cn(
                "h-auto w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] sm:h-full"
              )}
            />

            {/* Caption reveal */}
            <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
              <span className="text-[0.8125rem] font-medium text-white">
                {item.caption}
              </span>
              {item.tag ? (
                <span className="rounded-full border border-white/25 px-2 py-0.5 font-mono text-[0.625rem] tracking-wider text-white/80 uppercase">
                  {item.tag}
                </span>
              ) : null}
            </span>
          </button>
        ))}
      </div>

      {isClient
        ? createPortal(
            <AnimatePresence>
              {isOpen ? (
                <PhotoLightbox
                  key="lightbox"
                  items={items}
                  index={openIndex}
                  onClose={close}
                  onStep={step}
                  reduceMotion={reduceMotion}
                />
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </>
  );
}
