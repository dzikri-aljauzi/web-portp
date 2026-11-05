"use client";

import { Check, Copy, Sparkles } from "lucide-react";
import { useState } from "react";
import { profile } from "@/data/profile";
import { Avatar } from "./avatar";
import { Reveal, SectionHeading } from "./ui";

export function About() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-28">
      <SectionHeading index="01" eyebrow="Discover" title="About Me" />

      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal className="relative">
          <div className="sticky top-28">
            <div className="relative overflow-hidden rounded-[2rem] border border-line bg-surface p-3 shadow-lift">
              <Avatar className="aspect-[4/5] w-full rounded-[1.5rem]" sizes="(min-width: 1024px) 420px, 100vw" />
              <div className="absolute inset-x-6 bottom-6 flex items-center gap-3 rounded-2xl border border-white/30 bg-black/30 p-3 text-white backdrop-blur-md">
                <Sparkles size={18} className="shrink-0" />
                <p className="text-xs leading-snug font-medium">
                  Currently open to full-time roles in full-stack web &amp; applied AI.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="flex flex-col gap-10">
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              { title: "Who I Am", body: profile.about.who },
              { title: "How I Work", body: profile.about.approach },
            ].map((block, i) => (
              <Reveal
                key={block.title}
                delay={i * 0.1}
                className="rounded-3xl border border-line bg-surface p-6 shadow-soft"
              >
                <p className="font-mono text-xs text-brand-strong">0{i + 1}.</p>
                <h3 className="mt-2 text-lg font-bold text-ink">{block.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{block.body}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="rounded-3xl border border-line bg-surface p-6 shadow-soft sm:p-8">
            <h3 className="flex items-center gap-3 text-lg font-bold text-ink">
              <span className="h-5 w-1 rounded-full bg-brand" />
              Personal Details
            </h3>
            <dl className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {profile.details.map((d) => (
                <div key={d.label} className="border-b border-dashed border-line pb-4">
                  <dt className="font-mono text-[11px] tracking-[0.15em] text-muted uppercase">{d.label}</dt>
                  <dd className="mt-1.5 font-semibold text-ink">{d.value}</dd>
                </div>
              ))}
              <div className="sm:col-span-2">
                <dt className="font-mono text-[11px] tracking-[0.15em] text-muted uppercase">Email</dt>
                <dd className="mt-1.5 flex flex-wrap items-center gap-3">
                  <a href={profile.socials.email} className="font-semibold text-ink hover:text-brand-strong">
                    {profile.email}
                  </a>
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-line px-2.5 py-1 font-mono text-[11px] text-muted transition hover:border-brand hover:text-brand-strong"
                  >
                    {copied ? <Check size={12} /> : <Copy size={12} />}
                    {copied ? "copied" : "copy"}
                  </button>
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
