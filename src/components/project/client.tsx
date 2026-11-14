"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { Check, ChevronLeft, ChevronRight, Link2, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import type { Project } from "@/lib/types";

/** Thin tosca bar at the top of the page that fills as you read. */
export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });
  return <motion.div style={{ scaleX }} className="fixed inset-x-0 top-0 z-[55] h-1 origin-left bg-brand" />;
}

export function ShareButton() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };
  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-line px-4 py-3 text-sm font-semibold text-ink transition hover:border-brand hover:text-brand-strong"
    >
      {copied ? <Check size={15} /> : <Link2 size={15} />}
      {copied ? "Link copied" : "Copy link"}
    </button>
  );
}

/** Screenshot grid; clicking an image opens it full screen with arrow-key navigation. */
export function Gallery({ images }: { images: Project["gallery"] }) {
  const [open, setOpen] = useState<number | null>(null);
  const step = useCallback(
    (by: number) => setOpen((current) => (current === null ? null : (current + by + images.length) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open, step]);

  const current = open === null ? null : images[open];

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        {images.map((image, i) => (
          <figure key={image.url + i} className={i === 0 && images.length % 2 === 1 ? "sm:col-span-2" : ""}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`Open image ${i + 1}`}
              className="group block w-full overflow-hidden rounded-2xl border border-line bg-surface-2"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- admin-managed image */}
              <img
                src={image.url}
                alt={image.caption || `Screenshot ${i + 1}`}
                loading="lazy"
                className="aspect-video w-full object-cover transition duration-500 group-hover:scale-[1.03]"
              />
            </button>
            {image.caption && <figcaption className="mt-2 text-xs text-muted">{image.caption}</figcaption>}
          </figure>
        ))}
      </div>

      <AnimatePresence>
        {current && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Image viewer"
            className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-black/90 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          >
            <button type="button" aria-label="Close" className="absolute top-4 right-4 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white">
              <X size={18} />
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element -- admin-managed image */}
            <img
              src={current.url}
              alt={current.caption || "Screenshot"}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[80vh] max-w-full rounded-xl object-contain"
            />
            <p className="mt-4 text-center text-sm text-white/80">
              {current.caption} <span className="ml-2 font-mono text-xs text-white/50">{open! + 1} / {images.length}</span>
            </p>
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Previous image"
                  onClick={(e) => (e.stopPropagation(), step(-1))}
                  className="absolute left-3 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  aria-label="Next image"
                  onClick={(e) => (e.stopPropagation(), step(1))}
                  className="absolute right-3 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
