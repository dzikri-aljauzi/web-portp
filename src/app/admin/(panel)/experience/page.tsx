import Link from "next/link";
import { ListActions } from "@/components/admin/list-actions";
import { DatabaseNotice, PageHeader } from "@/components/admin/page-parts";
import { adminGate } from "@/lib/admin";
import { db } from "@/lib/db";

export default async function ExperienceAdminPage() {
  const problem = await adminGate();
  if (problem) {
    return (
      <>
        <PageHeader title="Experience" />
        <DatabaseNotice problem={problem} />
      </>
    );
  }

  const entries = await db().experience.findMany({ orderBy: [{ position: "asc" }, { createdAt: "asc" }] });

  return (
    <>
      <PageHeader title="Experience" description="The timeline on the home page, top to bottom." action={{ href: "/admin/experience/new", label: "New entry" }} />
      {entries.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-line bg-surface p-8 text-center text-sm text-muted">No entries yet.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {entries.map((entry, i) => (
            <li key={entry.id} className="flex flex-wrap items-center gap-4 rounded-2xl border border-line bg-surface p-4 shadow-soft">
              <Link href={`/admin/experience/${entry.id}`} className="group min-w-0 flex-1">
                <p className="flex flex-wrap items-center gap-2 font-bold text-ink group-hover:text-brand-strong">
                  {entry.role}
                  {!entry.published && <span className="rounded-md bg-surface-2 px-2 py-0.5 font-mono text-[10px] font-medium text-muted uppercase">Hidden</span>}
                </p>
                <p className="mt-0.5 truncate text-sm text-muted">
                  {entry.company} · {entry.period}
                </p>
              </Link>
              <ListActions kind="experience" id={entry.id} title={`${entry.role} at ${entry.company}`} published={entry.published} first={i === 0} last={i === entries.length - 1} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
