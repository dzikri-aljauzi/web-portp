import { DatabaseZap, Plus } from "lucide-react";
import Link from "next/link";
import type { DatabaseProblem } from "@/lib/admin";
import { ImportButton } from "./import-button";

export function PageHeader({ title, description, action }: { title: string; description?: string; action?: { href: string; label: string } }) {
  return (
    <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">{title}</h1>
        {description && <p className="mt-1 text-sm text-muted">{description}</p>}
      </div>
      {action && (
        <Link href={action.href} className="inline-flex items-center gap-2 rounded-xl bg-brand-strong px-4 py-2.5 text-sm font-semibold text-on-brand">
          <Plus size={15} /> {action.label}
        </Link>
      )}
    </header>
  );
}

const messages: Record<DatabaseProblem, { title: string; body: string }> = {
  missing: {
    title: "No database connected yet",
    body: "The site is showing its built-in content. To edit it from here, add a PostgreSQL database: set DATABASE_URL in your hosting settings (a free Neon database works), then redeploy.",
  },
  unreachable: {
    title: "The database could not be reached",
    body: "DATABASE_URL is set, but the connection failed or the tables are missing. Check the connection string, then redeploy so the tables are created.",
  },
  empty: {
    title: "The database is empty",
    body: "Import the content the site is showing now, then edit it from here.",
  },
};

/** Shown instead of an editor while the database is not ready. */
export function DatabaseNotice({ problem }: { problem: DatabaseProblem }) {
  const { title, body } = messages[problem];
  return (
    <div className="rounded-2xl border border-dashed border-line bg-surface p-8 text-center">
      <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-brand-soft text-brand-strong">
        <DatabaseZap size={20} />
      </span>
      <h2 className="mt-4 text-lg font-bold text-ink">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">{body}</p>
      {problem === "empty" && <ImportButton />}
    </div>
  );
}
