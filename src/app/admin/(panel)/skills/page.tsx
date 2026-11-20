import { DatabaseNotice, PageHeader } from "@/components/admin/page-parts";
import { SkillsForm } from "@/components/admin/skills-form";
import { Fresh } from "@/components/admin/fresh";
import { adminGate } from "@/lib/admin";
import { readSettings } from "@/lib/content";

export default async function SkillsPage() {
  const problem = await adminGate();
  return (
    <>
      <PageHeader title="Skills" description="The Tech Stack section on the home page." />
      {problem ? <DatabaseNotice problem={problem} /> : <Fresh><SkillsForm initial={(await readSettings()).skills} /></Fresh>}
    </>
  );
}
