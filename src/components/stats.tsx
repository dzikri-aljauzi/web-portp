"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/profile";
import { Reveal } from "./ui";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {n}
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section aria-label="Highlights" className="mx-auto max-w-6xl px-6">
      <div className="grid grid-cols-2 overflow-hidden rounded-3xl border border-line bg-surface shadow-soft lg:grid-cols-4">
        {profile.stats.map((stat, i) => (
          <Reveal
            key={stat.label}
            delay={i * 0.08}
            className={`group relative p-6 sm:p-8 ${i % 2 ? "" : "border-r border-line"} ${i < 2 ? "border-b border-line lg:border-b-0" : ""} ${i === 1 ? "lg:border-r" : ""}`}
          >
            <div className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-brand transition-transform duration-500 group-hover:scale-x-100" />
            <p className="text-3xl font-extrabold tracking-tight text-brand-strong sm:text-4xl">
              <Counter value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-2 text-sm leading-snug text-muted">{stat.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
