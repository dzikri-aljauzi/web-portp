"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const steps = ["resolving modules", "compiling components", "warming up assistant", "ready"];

export function Loader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const start = performance.now();
    const duration = 1500;
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      if (t < 1) frame = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 250);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = done ? "" : "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [done]);

  const step = steps[Math.min(steps.length - 1, Math.floor((progress / 100) * steps.length))];

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-bg"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden
        >
          <div className="pointer-events-none absolute h-72 w-72 rounded-full bg-brand/20 blur-3xl" />
          <div className="relative flex w-64 flex-col items-center gap-5">
            <p className="text-4xl font-extrabold tracking-tight text-ink">
              dzikri<span className="text-brand">.</span>
            </p>
            <div className="h-[3px] w-full overflow-hidden rounded-full bg-line">
              <div
                className="h-full rounded-full bg-gradient-to-r from-brand-strong to-brand"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex w-full justify-between font-mono text-[11px] text-muted">
              <span>
                <span className="text-brand">❯</span> {step}
              </span>
              <span className="tabular-nums">{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
