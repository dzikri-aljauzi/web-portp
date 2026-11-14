import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { type Project } from "@/lib/types";
import { ProjectCover } from "./project-preview";
import { StatusBadge } from "./status-badge";
import { Tag } from "./ui";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface shadow-soft transition duration-300 hover:-translate-y-1 hover:border-brand/60 hover:shadow-lift"
    >
      <div className="relative aspect-[16/9] overflow-hidden border-b border-line">
        <ProjectCover project={project} />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-3 font-mono text-[11px] text-muted">
          <StatusBadge status={project.status} />
          <span className="shrink-0">{project.year}</span>
        </div>
        <h3 className="mt-3 text-2xl font-bold text-ink">{project.title}</h3>
        {project.tagline && <p className="mt-1 font-mono text-xs text-brand-strong">{project.tagline}</p>}
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">{project.description}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 5).map((item) => (
            <Tag key={item}>{item}</Tag>
          ))}
          {project.stack.length > 5 && <Tag>+{project.stack.length - 5}</Tag>}
        </div>
        <span className="mt-auto flex items-center justify-between pt-6 text-xs font-bold tracking-[0.15em] text-ink uppercase">
          Read case study
          <span className="grid h-9 w-9 place-items-center rounded-full border border-line transition group-hover:border-brand group-hover:bg-brand-strong group-hover:text-on-brand">
            <ArrowUpRight size={15} />
          </span>
        </span>
      </div>
    </Link>
  );
}
