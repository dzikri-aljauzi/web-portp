import { ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa6";
import type { Project } from "@/lib/types";
import { ProjectGrid } from "./project-grid";
import { SectionHeading } from "./ui";

const HOME_LIMIT = 6;

/** Home page section: featured projects, with a link to the full list. */
export function Projects({ projects, github }: { projects: Project[]; github: string }) {
  const featured = projects.filter((p) => p.featured);
  const shown = (featured.length > 0 ? featured : projects).slice(0, HOME_LIMIT);

  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-28">
      <SectionHeading index="04" eyebrow="Portfolio" title="Selected Works" />
      <ProjectGrid projects={shown} />

      <div className="mt-12 flex flex-wrap justify-center gap-3">
        <Link
          href="/projects"
          className="group inline-flex items-center gap-2 rounded-xl bg-brand-strong px-5 py-3 text-xs font-bold tracking-[0.15em] text-on-brand uppercase shadow-[0_8px_24px_var(--brand-glow)] transition hover:-translate-y-0.5"
        >
          All projects ({projects.length})
          <ArrowRight size={14} className="transition group-hover:translate-x-1" />
        </Link>
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-5 py-3 text-xs font-bold tracking-[0.15em] text-ink uppercase shadow-soft transition hover:-translate-y-0.5 hover:border-brand hover:text-brand-strong"
          >
            <FaGithub size={15} /> More on GitHub <ExternalLink size={13} />
          </a>
        )}
      </div>
    </section>
  );
}
