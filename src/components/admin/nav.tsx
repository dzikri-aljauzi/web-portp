"use client";

import { BriefcaseBusiness, FolderKanban, ImageIcon, LayoutDashboard, UserRound, Wrench } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/profile", label: "Profile", icon: UserRound },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/experience", label: "Experience", icon: BriefcaseBusiness },
  { href: "/admin/skills", label: "Skills", icon: Wrench },
  { href: "/admin/media", label: "Media", icon: ImageIcon },
];

export function AdminNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Admin" className="flex gap-1 overflow-x-auto lg:flex-col">
      {links.map(({ href, label, icon: Icon }) => {
        const active = href === "/admin" ? pathname === href : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={`flex shrink-0 items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition ${
              active ? "bg-brand-soft text-brand-strong" : "text-muted hover:bg-surface-2 hover:text-ink"
            }`}
          >
            <Icon size={16} /> {label}
          </Link>
        );
      })}
    </nav>
  );
}
