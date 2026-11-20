import { ExperienceForm, blankExperience } from "@/components/admin/experience-form";
import { DatabaseNotice, PageHeader } from "@/components/admin/page-parts";
import { Fresh } from "@/components/admin/fresh";
import { adminGate } from "@/lib/admin";

export default async function NewExperiencePage() {
  const problem = await adminGate();
  return (
    <>
      <PageHeader title="New experience" />
      {problem ? <DatabaseNotice problem={problem} /> : <Fresh><ExperienceForm id={null} initial={blankExperience} /></Fresh>}
    </>
  );
}
