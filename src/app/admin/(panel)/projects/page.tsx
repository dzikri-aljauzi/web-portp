import { Star } from "lucide-react";
import Link from "next/link";
import { ListActions } from "@/components/admin/list-actions";
import { DatabaseNotice, PageHeader } from "@/components/admin/page-parts";
import { adminGate } from "@/lib/admin";
import { db } from "@/lib/db";
import { categoryLabel, statusLabel } from "@/lib/types";

export default async function ProjectsAdminPage() {
  const problem = await adminGate();
  if (problem) {
    return (
      <>
        <PageHeader title="Projects" />
        <DatabaseNotice problem={problem} />
      </>
    );
  }

  const projects = await db().project.findMany({ orderBy: [{ position: "asc" }, { createdAt: "asc" }] });

  return (
    <>
      <PageHeader title="Projects" description="The order here is the order on the site." action={{ href: "/admin/projects/new", label: "New project" }} />
      {projects.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-line bg-surface p-8 text-center text-sm text-muted">No projects yet. Add your first one.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {projects.map((project, i) => (
            <li key={project.id} className="flex flex-wrap items-center gap-4 rounded-2xl border border-line bg-surface p-4 shadow-soft">
              <Link href={`/admin/projects/${project.id}`} className="group min-w-0 flex-1">
                <p className="flex flex-wrap items-center gap-2 font-bold text-ink group-hover:text-brand-strong">
                  {project.title}
                  {project.featured && <Star size={13} className="fill-brand text-brand" aria-label="Featured" />}
                  {!project.published && <span className="rounded-md bg-surface-2 px-2 py-0.5 font-mono text-[10px] font-medium text-muted uppercase">Hidden</span>}
                </p>
                <p className="mt-0.5 truncate text-sm text-muted">
                  {categoryLabel(project.category)} · {statusLabel(project.status)} · /projects/{project.slug}
                </p>
              </Link>
              <ListActions kind="project" id={project.id} title={project.title} published={project.published} first={i === 0} last={i === projects.length - 1} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
