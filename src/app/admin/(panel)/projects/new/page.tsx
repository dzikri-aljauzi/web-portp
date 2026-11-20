import { DatabaseNotice, PageHeader } from "@/components/admin/page-parts";
import { ProjectForm, blankProject } from "@/components/admin/project-form";
import { Fresh } from "@/components/admin/fresh";
import { adminGate } from "@/lib/admin";

export default async function NewProjectPage() {
  const problem = await adminGate();
  return (
    <>
      <PageHeader title="New project" description="Only the title and slug are required. You can fill in the rest later." />
      {problem ? <DatabaseNotice problem={problem} /> : <Fresh><ProjectForm id={null} initial={blankProject} /></Fresh>}
    </>
  );
}
