import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { ProjectGrid } from "@/components/project-grid";
import { getContent } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const { profile } = await getContent();
  return {
    title: `Projects — ${profile.shortName}`,
    description: `Case studies of web platforms and AI research built by ${profile.name}.`,
  };
}

export default async function ProjectsPage() {
  const { projects } = await getContent();
  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24">
      <div className="dot-grid pointer-events-none absolute inset-x-0 top-0 h-[420px] [mask-image:radial-gradient(ellipse_at_top,black_25%,transparent_72%)]" />
      <div className="relative mx-auto max-w-6xl px-6">
        <Link href="/" className="inline-flex items-center gap-2 font-mono text-xs text-muted transition hover:text-brand-strong">
          <ArrowLeft size={14} /> Back to home
        </Link>
        <header className="mt-8 mb-12 max-w-2xl">
          <p className="font-mono text-xs tracking-[0.2em] text-brand-strong uppercase">
            {projects.length} {projects.length === 1 ? "project" : "projects"}
          </p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-ink sm:text-6xl">All Projects</h1>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            Each one is written up as a short case study: the problem, how I approached it, and what came out of it.
          </p>
        </header>
        <ProjectGrid projects={projects} />
      </div>
    </section>
  );
}
