"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { Briefcase, MapPin } from "lucide-react";
import { useRef } from "react";
import { experiences } from "@/data/profile";
import { Reveal, SectionHeading, Tag } from "./ui";

export function ExperienceSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 py-28">
      <SectionHeading index="02" eyebrow="Career Path" title="Work Experience" />

      <div ref={ref} className="relative">
        {/* track + scroll-linked tosca fill */}
        <div className="absolute top-0 bottom-0 left-4 w-px bg-line md:left-1/2" />
        <motion.div
          style={{ scaleY }}
          className="absolute top-0 bottom-0 left-4 w-px origin-top bg-gradient-to-b from-brand to-brand-strong md:left-1/2"
        />

        <ol className="flex flex-col gap-14">
          {experiences.map((exp, i) => {
            const right = i % 2 === 1;
            return (
              <li key={exp.company + exp.role} className="relative md:grid md:grid-cols-2 md:gap-16">
                <span className="absolute top-7 left-4 z-10 grid h-4 w-4 -translate-x-1/2 place-items-center rounded-full border-2 border-brand bg-bg md:left-1/2">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                </span>

                <div
                  className={`hidden md:flex md:flex-col md:pt-5 ${right ? "md:order-1 md:items-end md:text-right" : "md:order-2"}`}
                >
                  <span className="font-mono text-sm text-brand-strong">{exp.period}</span>
                  <p className="mt-6 text-5xl font-extrabold tracking-tight text-ink/90">{exp.highlight.value}</p>
                  <p className="mt-1 text-sm text-muted">{exp.highlight.label}</p>
                </div>

                <Reveal
                  y={32}
                  className={`ml-10 md:ml-0 ${right ? "md:order-2" : "md:order-1"}`}
                >
                  <article className="group rounded-3xl border border-line bg-surface p-6 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-brand/60 hover:shadow-lift sm:p-7">
                    <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] text-muted">
                      <span className="rounded-full bg-brand-soft px-2.5 py-1 font-semibold text-brand-strong">
                        {exp.type}
                      </span>
                      <span className="md:hidden">{exp.period}</span>
                    </div>
                    <h3 className="mt-4 text-xl font-bold text-ink">{exp.role}</h3>
                    <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
                      <span className="inline-flex items-center gap-1.5 font-semibold text-ink/80">
                        <Briefcase size={14} /> {exp.company}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin size={14} /> {exp.location}
                      </span>
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-ink/80">{exp.summary}</p>
                    <ul className="mt-4 flex flex-col gap-2.5">
                      {exp.points.map((p) => (
                        <li key={p} className="flex gap-3 text-sm leading-relaxed text-muted">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                          {p}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {exp.tags.map((t) => (
                        <Tag key={t}>{t}</Tag>
                      ))}
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
