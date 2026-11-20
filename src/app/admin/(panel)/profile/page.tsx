import { DatabaseNotice, PageHeader } from "@/components/admin/page-parts";
import { ProfileForm } from "@/components/admin/profile-form";
import { Fresh } from "@/components/admin/fresh";
import { adminGate } from "@/lib/admin";
import { readSettings } from "@/lib/content";

export default async function ProfilePage() {
  const problem = await adminGate();
  return (
    <>
      <PageHeader title="Profile" description="Your identity, hero, about section and highlight numbers." />
      {problem ? <DatabaseNotice problem={problem} /> : <Fresh><ProfileForm initial={(await readSettings()).profile} /></Fresh>}
    </>
  );
}
