"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { CATEGORIES, type Project } from "@/lib/types";
import { ProjectCard } from "./project-card";

/** Project cards with category tabs. Tabs only appear for categories in use. */
export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState("all");
  const categories = CATEGORIES.filter((c) => projects.some((p) => p.category === c.id));
  const tabs = [{ id: "all", label: "All" }, ...categories];
  const shown = projects.filter((p) => filter === "all" || p.category === filter);

  if (projects.length === 0) {
    return <p className="py-16 text-center text-muted">Projects will show up here soon.</p>;
  }

  return (
    <>
      {categories.length > 1 && (
        <div className="mb-10 flex justify-center">
          <div className="inline-flex max-w-full overflow-x-auto rounded-full border border-line bg-surface p-1 shadow-soft">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id)}
                className={`relative shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  filter === tab.id ? "text-on-brand" : "text-muted hover:text-ink"
                }`}
              >
                {filter === tab.id && (
                  <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-full bg-brand-strong" />
                )}
                <span className="relative">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <motion.div layout className="grid gap-6 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {shown.map((project, i) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
