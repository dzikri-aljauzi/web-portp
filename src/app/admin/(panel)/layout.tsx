import { ExternalLink, LogOut } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { logout } from "@/app/admin/actions";
import { AdminNav } from "@/components/admin/nav";
import { ThemeToggle } from "@/components/theme-toggle";

/** Frame around every admin page. The pages themselves verify the session. */
export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-5 sm:px-6 lg:flex-row lg:gap-10 lg:py-10">
      <aside className="flex flex-col gap-4 lg:sticky lg:top-10 lg:w-52 lg:shrink-0 lg:self-start">
        <div className="flex items-center justify-between">
          <Link href="/admin" className="text-lg font-extrabold tracking-tight text-ink">
            admin<span className="text-brand">.</span>
          </Link>
          <ThemeToggle />
        </div>
        <Suspense fallback={<div className="h-10" />}>
          <AdminNav />
        </Suspense>
        <div className="flex gap-1 border-t border-line pt-3 lg:flex-col">
          <a href="/" target="_blank" rel="noreferrer" className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-muted hover:bg-surface-2 hover:text-ink">
            <ExternalLink size={16} /> View site
          </a>
          <form action={logout}>
            <button type="submit" className="flex w-full items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-muted hover:bg-surface-2 hover:text-ink">
              <LogOut size={16} /> Sign out
            </button>
          </form>
        </div>
      </aside>
      <main className="min-w-0 flex-1 pb-10">{children}</main>
    </div>
  );
}
