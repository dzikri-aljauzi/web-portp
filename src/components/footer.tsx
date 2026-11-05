import { ArrowUp } from "lucide-react";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted sm:flex-row">
        <p>
          © 2026 <span className="font-semibold text-ink">{profile.name}</span>. Built with Next.js &amp; a lot of
          tosca.
        </p>
        <a href="#home" className="inline-flex items-center gap-2 font-mono text-xs hover:text-brand-strong">
          back to top <ArrowUp size={14} />
        </a>
      </div>
    </footer>
  );
}
