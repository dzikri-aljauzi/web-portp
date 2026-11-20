import { notFound } from "next/navigation";
import { ExperienceForm } from "@/components/admin/experience-form";
import { DatabaseNotice, PageHeader } from "@/components/admin/page-parts";
import { Fresh } from "@/components/admin/fresh";
import { adminGate } from "@/lib/admin";
import { toExperience } from "@/lib/content";
import { db } from "@/lib/db";

export default async function EditExperiencePage({ params }: PageProps<"/admin/experience/[id]">) {
  const problem = await adminGate();
  if (problem) return <DatabaseNotice problem={problem} />;

  const { id } = await params;
  const row = await db().experience.findUnique({ where: { id } });
  if (!row) notFound();
  const { id: experienceId, ...experience } = toExperience(row);

  return (
    <>
      <PageHeader title={experience.role} description={experience.company} />
      <Fresh><ExperienceForm id={experienceId} initial={experience} /></Fresh>
    </>
  );
}
