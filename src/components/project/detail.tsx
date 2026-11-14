import { ArrowLeft, ArrowRight, ArrowUpRight, CalendarDays, CheckCircle2, ExternalLink, Layers, Timer, UserRound } from "lucide-react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa6";
import { categoryLabel, type Project } from "@/lib/types";
import { ProjectCover } from "../project-preview";
import { StatusBadge } from "../status-badge";
import { TechIcon } from "../tech-icon";
import { Reveal } from "../ui";
import { Gallery, ReadingProgress, ShareButton } from "./client";

function Paragraphs({ text }: { text: string }) {
  return (
    <div className="flex flex-col gap-4 leading-relaxed text-ink/85">
      {text.split(/\n\s*\n/).map((paragraph, i) => (
        <p key={i} className="whitespace-pre-line">
          {paragraph}
        </p>
      ))}
    </div>
  );
}

function Section({ id, number, title, children }: { id: string; number: string; title: string; children: React.ReactNode }) {
  return (
    <Reveal>
      <section id={id} className="scroll-mt-28">
        <h2 className="mb-5 flex items-baseline gap-3 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
          <span className="font-mono text-sm font-medium text-brand-strong">{number}</span>
          {title}
        </h2>
        {children}
      </section>
    </Reveal>
  );
}

export function ProjectDetail({ project, previous, next }: { project: Project; previous?: Project; next?: Project }) {
  // Only sections with content are rendered, and they are numbered in order.
  const sections = [
    { id: "overview", title: "Overview", show: Boolean(project.overview) },
    { id: "problem", title: "The Problem", show: Boolean(project.problem) },
    { id: "solution", title: "The Solution", show: Boolean(project.solution) },
    { id: "features", title: "Key Features", show: project.features.length > 0 },
    { id: "highlights", title: "What I Built", show: project.points.length > 0 },
    { id: "gallery", title: "Gallery", show: project.gallery.length > 0 },
    { id: "learnings", title: "Takeaways", show: Boolean(project.learnings) },
  ].filter((section) => section.show);
  const number = (id: string) => String(sections.findIndex((s) => s.id === id) + 1).padStart(2, "0");
  const has = (id: string) => sections.some((s) => s.id === id);

  const facts = [
    { icon: UserRound, label: "Role", value: project.role },
    { icon: CalendarDays, label: "Year", value: project.year },
    { icon: Timer, label: "Timeline", value: project.duration },
    { icon: Layers, label: "Category", value: categoryLabel(project.category) },
  ].filter((fact) => fact.value);

  return (
    <article className="relative overflow-hidden pt-32 pb-24 sm:pt-36">
      <ReadingProgress />
      <div className="dot-grid pointer-events-none absolute inset-x-0 top-0 h-[520px] [mask-image:radial-gradient(ellipse_at_top,black_25%,transparent_72%)]" />
      <div className="pointer-events-none absolute -top-40 right-0 h-[420px] w-[420px] rounded-full bg-brand/15 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <Link href="/projects" className="inline-flex items-center gap-2 font-mono text-xs text-muted transition hover:text-brand-strong">
          <ArrowLeft size={14} /> All projects
        </Link>

        <header className="mt-8 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={project.status} />
            <span className="rounded-full bg-brand-soft px-2.5 py-1 font-mono text-[10px] font-semibold tracking-wide text-brand-strong uppercase">
              {categoryLabel(project.category)}
            </span>
          </div>
          <h1 className="mt-5 text-4xl leading-[1.05] font-extrabold tracking-tight text-ink sm:text-6xl">{project.title}</h1>
          {project.tagline && <p className="mt-3 font-mono text-base text-brand-strong sm:text-lg">{project.tagline}</p>}
          {project.description && <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">{project.description}</p>}

          {(project.liveUrl || project.repoUrl) && (
            <div className="mt-8 flex flex-wrap gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-brand-strong px-6 py-3.5 text-sm font-semibold text-on-brand shadow-[0_8px_24px_var(--brand-glow)] transition hover:-translate-y-0.5"
                >
                  Live demo <ExternalLink size={15} />
                </a>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-6 py-3.5 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:border-brand"
                >
                  <FaGithub size={16} /> Source code
                </a>
              )}
            </div>
          )}
        </header>

        <Reveal className="group mt-12 aspect-[16/8] overflow-hidden rounded-3xl border border-line bg-surface shadow-lift">
          <ProjectCover project={project} />
        </Reveal>

        {project.metrics.length > 0 && (
          <Reveal className="mt-6 flex flex-wrap gap-px overflow-hidden rounded-3xl border border-line bg-line shadow-soft">
            {project.metrics.map((metric) => (
              <div key={metric.label} className="flex-1 basis-[45%] bg-surface p-6 lg:basis-0">
                <p className="text-3xl font-extrabold tracking-tight text-brand-strong">{metric.value}</p>
                <p className="mt-1 text-sm text-muted">{metric.label}</p>
              </div>
            ))}
          </Reveal>
        )}

        <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="flex min-w-0 flex-col gap-16">
            {has("overview") && (
              <Section id="overview" number={number("overview")} title="Overview">
                <Paragraphs text={project.overview} />
              </Section>
            )}

            {has("problem") && (
              <Section id="problem" number={number("problem")} title="The Problem">
                <div className="rounded-3xl border border-line bg-surface p-6 shadow-soft sm:p-8">
                  <Paragraphs text={project.problem} />
                </div>
              </Section>
            )}

            {has("solution") && (
              <Section id="solution" number={number("solution")} title="The Solution">
                <div className="rounded-3xl border border-brand/40 bg-brand-soft/40 p-6 sm:p-8">
                  <Paragraphs text={project.solution} />
                </div>
              </Section>
            )}

            {has("features") && (
              <Section id="features" number={number("features")} title="Key Features">
                <ul className="grid gap-4 sm:grid-cols-2">
                  {project.features.map((feature, i) => (
                    <li key={feature.title} className="rounded-2xl border border-line bg-surface p-5 transition hover:border-brand/60">
                      <p className="font-mono text-xs text-brand-strong">{String(i + 1).padStart(2, "0")}</p>
                      <h3 className="mt-2 font-bold text-ink">{feature.title}</h3>
                      {feature.description && <p className="mt-1.5 text-sm leading-relaxed text-muted">{feature.description}</p>}
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            {has("highlights") && (
              <Section id="highlights" number={number("highlights")} title="What I Built">
                <ul className="flex flex-col gap-3">
                  {project.points.map((point) => (
                    <li key={point} className="flex gap-3 leading-relaxed text-ink/85">
                      <CheckCircle2 size={18} className="mt-1 shrink-0 text-brand" />
                      {point}
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            {has("gallery") && (
              <Section id="gallery" number={number("gallery")} title="Gallery">
                <Gallery images={project.gallery} />
              </Section>
            )}

            {has("learnings") && (
              <Section id="learnings" number={number("learnings")} title="Takeaways">
                <div className="border-l-2 border-brand pl-5">
                  <Paragraphs text={project.learnings} />
                </div>
              </Section>
            )}
          </div>

          <aside className="flex flex-col gap-5 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-3xl border border-line bg-surface p-6 shadow-soft">
              <h2 className="font-mono text-[11px] tracking-[0.15em] text-muted uppercase">Project info</h2>
              <dl className="mt-4 flex flex-col gap-4">
                {facts.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand-strong">
                      <Icon size={15} />
                    </span>
                    <div>
                      <dt className="text-xs text-muted">{label}</dt>
                      <dd className="text-sm font-semibold text-ink">{value}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>

            {project.stack.length > 0 && (
              <div className="rounded-3xl border border-line bg-surface p-6 shadow-soft">
                <h2 className="font-mono text-[11px] tracking-[0.15em] text-muted uppercase">Tech stack</h2>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {project.stack.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm font-medium text-ink">
                      <TechIcon name={item} className="h-4 w-4 shrink-0 text-brand-strong" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {sections.length > 1 && (
              <nav aria-label="On this page" className="hidden rounded-3xl border border-line bg-surface p-6 shadow-soft lg:block">
                <h2 className="font-mono text-[11px] tracking-[0.15em] text-muted uppercase">On this page</h2>
                <ol className="mt-4 flex flex-col gap-2 text-sm">
                  {sections.map((section, i) => (
                    <li key={section.id}>
                      <a href={`#${section.id}`} className="flex gap-3 text-muted transition hover:text-brand-strong">
                        <span className="font-mono text-xs">{String(i + 1).padStart(2, "0")}</span>
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}

            <ShareButton />
          </aside>
        </div>

        {(previous || next) && (
          <nav aria-label="More projects" className="mt-20 grid gap-4 sm:grid-cols-2">
            {[
              { project: previous, label: "Previous project", icon: ArrowLeft, align: "" },
              { project: next, label: "Next project", icon: ArrowRight, align: "sm:text-right sm:items-end" },
            ].map(({ project: other, label, icon: Icon, align }) =>
              other ? (
                <Link
                  key={label}
                  href={`/projects/${other.slug}`}
                  className={`group flex flex-col rounded-3xl border border-line bg-surface p-6 shadow-soft transition hover:-translate-y-1 hover:border-brand/60 hover:shadow-lift ${align}`}
                >
                  <span className="inline-flex items-center gap-2 font-mono text-xs text-muted">
                    {label === "Previous project" && <Icon size={14} />}
                    {label}
                    {label === "Next project" && <Icon size={14} />}
                  </span>
                  <span className="mt-2 text-xl font-bold text-ink group-hover:text-brand-strong">{other.title}</span>
                  <span className="mt-1 text-sm text-muted">{other.tagline}</span>
                </Link>
              ) : (
                <span key={label} className="hidden sm:block" />
              ),
            )}
          </nav>
        )}

        <div className="mt-8 flex flex-col items-start justify-between gap-6 rounded-3xl bg-brand-strong p-8 text-on-brand shadow-lift sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight">Working on something similar?</h2>
            <p className="mt-1 text-sm opacity-80">I&apos;m happy to talk through a project, a role, or an idea.</p>
          </div>
          <Link
            href="/#contact"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white/15 px-5 py-3 text-sm font-semibold transition hover:bg-white/25"
          >
            Get in touch <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    </article>
  );
}
