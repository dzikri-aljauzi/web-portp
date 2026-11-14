import { notFound } from "next/navigation";
import { DatabaseNotice, PageHeader } from "@/components/admin/page-parts";
import { ProjectForm } from "@/components/admin/project-form";
import { Fresh } from "@/components/admin/fresh";
import { adminGate } from "@/lib/admin";
import { toProject } from "@/lib/content";
import { db } from "@/lib/db";

export default async function EditProjectPage({ params }: PageProps<"/admin/projects/[id]">) {
  const problem = await adminGate();
  if (problem) return <DatabaseNotice problem={problem} />;

  const { id } = await params;
  const row = await db().project.findUnique({ where: { id } });
  if (!row) notFound();
  const { id: projectId, ...project } = toProject(row);

  return (
    <>
      <PageHeader title={project.title} description="Edit the project card and its case study page." />
      <Fresh><ProjectForm id={projectId} initial={project} /></Fresh>
    </>
  );
}
