import { BriefcaseBusiness, CheckCircle2, CircleAlert, FolderKanban, ImageIcon, UserRound, Wrench } from "lucide-react";
import Link from "next/link";
import { DatabaseNotice, PageHeader } from "@/components/admin/page-parts";
import { adminGate } from "@/lib/admin";
import { db } from "@/lib/db";

export default async function AdminHome() {
  const problem = await adminGate();

  const counts = problem
    ? null
    : await Promise.all([
        db().project.count(),
        db().project.count({ where: { published: false } }),
        db().experience.count(),
        db().media.count(),
      ]).catch(() => null);

  const checks = [
    { ok: problem !== "missing" && problem !== "unreachable", label: "Database connected", fix: "Set DATABASE_URL and redeploy." },
    { ok: problem === null, label: "Content imported into the database", fix: "Use the import button below." },
    { ok: Boolean(process.env.ANTHROPIC_API_KEY), label: "AI assistant uses Claude", fix: "Optional: set ANTHROPIC_API_KEY. Without it the assistant gives built-in answers." },
  ];

  const sections = [
    { href: "/admin/profile", icon: UserRound, title: "Profile", text: "Name, intro, photo, CV, links, about and highlight numbers." },
    { href: "/admin/projects", icon: FolderKanban, title: "Projects", text: counts ? `${counts[0]} projects${counts[1] ? `, ${counts[1]} hidden` : ""}.` : "Case studies, links and screenshots." },
    { href: "/admin/experience", icon: BriefcaseBusiness, title: "Experience", text: counts ? `${counts[2]} entries on the timeline.` : "The work timeline." },
    { href: "/admin/skills", icon: Wrench, title: "Skills", text: "Groups in the Tech Stack section." },
    { href: "/admin/media", icon: ImageIcon, title: "Media", text: counts ? `${counts[3]} uploaded files.` : "Uploaded images and files." },
  ];

  return (
    <>
      <PageHeader title="Overview" description="Everything on the public site is edited from here. Changes go live as soon as you save." />

      <ul className="mb-6 flex flex-col gap-2 rounded-2xl border border-line bg-surface p-5 shadow-soft">
        {checks.map((check) => (
          <li key={check.label} className="flex items-start gap-3 text-sm">
            {check.ok ? <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-brand" /> : <CircleAlert size={17} className="mt-0.5 shrink-0 text-[#f59e0b]" />}
            <span>
              <span className="font-semibold text-ink">{check.label}</span>
              {!check.ok && <span className="block text-muted">{check.fix}</span>}
            </span>
          </li>
        ))}
      </ul>

      {problem && (
        <div className="mb-6">
          <DatabaseNotice problem={problem} />
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {sections.map(({ href, icon: Icon, title, text }) => (
          <Link key={href} href={href} className="group rounded-2xl border border-line bg-surface p-5 shadow-soft transition hover:-translate-y-0.5 hover:border-brand/60">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-soft text-brand-strong">
              <Icon size={18} />
            </span>
            <h2 className="mt-4 font-bold text-ink group-hover:text-brand-strong">{title}</h2>
            <p className="mt-1 text-sm text-muted">{text}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
