"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, ExternalLink, X } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { profile, projects, type Project } from "@/data/profile";
import { ProjectPreview } from "./project-preview";
import { SectionHeading, Tag } from "./ui";

const filters = [
  { id: "all", label: "All" },
  { id: "web", label: "Web Platforms" },
  { id: "ai", label: "AI & Research" },
] as const;

type Filter = (typeof filters)[number]["id"];

export function Projects() {
  const [filter, setFilter] = useState<Filter>("all");
  const [selected, setSelected] = useState<Project | null>(null);
  const shown = projects.filter((p) => filter === "all" || p.category === filter);

  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-28">
      <SectionHeading index="04" eyebrow="Portfolio" title="Selected Works" />

      <div className="mb-10 flex justify-center">
        <div className="inline-flex rounded-full border border-line bg-surface p-1 shadow-soft">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                filter === f.id ? "text-on-brand" : "text-muted hover:text-ink"
              }`}
            >
              {filter === f.id && (
                <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-full bg-brand-strong" />
              )}
              <span className="relative">{f.label}</span>
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className="grid gap-6 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {shown.map((project, i) => (
            <motion.article
              layout
              key={project.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-surface shadow-soft transition-shadow hover:shadow-lift"
            >
              <div className="aspect-[16/9] border-b border-line">
                <ProjectPreview kind={project.preview} />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center justify-between font-mono text-[11px] text-muted">
                  <span className="text-brand-strong">{project.tagline}</span>
                  <span>{project.year}</span>
                </div>
                <h3 className="mt-2 text-2xl font-bold text-ink">{project.title}</h3>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.stack.slice(0, 5).map((s) => (
                    <Tag key={s}>{s}</Tag>
                  ))}
                  {project.stack.length > 5 && <Tag>+{project.stack.length - 5}</Tag>}
                </div>
                <button
                  type="button"
                  onClick={() => setSelected(project)}
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl border border-line py-3 text-xs font-bold tracking-[0.15em] text-ink uppercase transition group-hover:border-brand group-hover:bg-brand-soft group-hover:text-brand-strong"
                >
                  View Details <ArrowUpRight size={14} />
                </button>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      <div className="mt-12 flex justify-center">
        <a
          href={profile.socials.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-5 py-3 text-xs font-bold tracking-[0.15em] text-ink uppercase shadow-soft transition hover:-translate-y-0.5 hover:border-brand hover:text-brand-strong"
        >
          <FaGithub size={15} /> More on GitHub <ExternalLink size={13} />
        </a>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-end justify-center bg-ink/40 p-0 backdrop-blur-sm sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="group relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl border border-line bg-surface shadow-lift sm:rounded-3xl"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 z-10 grid h-9 w-9 place-items-center rounded-full border border-line bg-surface text-muted hover:text-ink"
            >
              <X size={16} />
            </button>
            <div className="aspect-[16/7] border-b border-line">
              <ProjectPreview kind={project.preview} />
            </div>
            <div className="p-6 sm:p-8">
              <p className="font-mono text-xs text-brand-strong">
                {project.role} · {project.year}
              </p>
              <h3 className="mt-2 text-3xl font-extrabold tracking-tight text-ink">{project.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{project.description}</p>

              <h4 className="mt-6 font-mono text-[11px] tracking-[0.15em] text-muted uppercase">What I built</h4>
              <ul className="mt-3 flex flex-col gap-2.5">
                {project.points.map((p) => (
                  <li key={p} className="flex gap-3 text-sm leading-relaxed text-ink/85">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                    {p}
                  </li>
                ))}
              </ul>

              <h4 className="mt-6 font-mono text-[11px] tracking-[0.15em] text-muted uppercase">Stack</h4>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.stack.map((s) => (
                  <Tag key={s}>{s}</Tag>
                ))}
              </div>

              {(project.liveUrl || project.repoUrl) && (
                <div className="mt-8 flex flex-wrap gap-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-brand-strong px-5 py-3 text-sm font-semibold text-on-brand"
                    >
                      Live Demo <ExternalLink size={14} />
                    </a>
                  )}
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-line px-5 py-3 text-sm font-semibold text-ink hover:border-brand"
                    >
                      <FaGithub size={15} /> Source
                    </a>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
