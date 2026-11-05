"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";

/** Fades + lifts its children into view once, when scrolled into the viewport. */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  ...rest
}: { children: ReactNode; delay?: number; y?: number } & HTMLMotionProps<"div">) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  index,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  index: string;
  align?: "center" | "left";
}) {
  return (
    <Reveal
      className={`mb-14 flex flex-col gap-3 ${align === "center" ? "items-center text-center" : "items-start"}`}
    >
      <span className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-brand-strong uppercase">
        <span className="text-muted">{index}</span>
        <span className="h-px w-6 bg-brand" />
        {eyebrow}
      </span>
      <h2 className="text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">{title}</h2>
    </Reveal>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-md border border-line bg-surface-2 px-2 py-1 font-mono text-[11px] font-medium text-muted">
      {children}
    </span>
  );
}
