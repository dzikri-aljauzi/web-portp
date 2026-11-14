import { LockKeyhole } from "lucide-react";
import Link from "next/link";
import { LoginForm } from "@/components/admin/login-form";

export default function LoginPage() {
  return (
    <main className="grid min-h-screen place-items-center px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="rounded-3xl border border-line bg-surface p-8 shadow-lift">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-soft text-brand-strong">
            <LockKeyhole size={20} />
          </span>
          <h1 className="mt-5 text-2xl font-extrabold tracking-tight text-ink">Admin sign in</h1>
          <p className="mt-1 text-sm text-muted">Enter the admin password to manage this site.</p>
          <LoginForm />
        </div>
        <p className="mt-6 text-center text-sm">
          <Link href="/" className="text-muted hover:text-brand-strong">
            ← Back to the site
          </Link>
        </p>
      </div>
    </main>
  );
}
