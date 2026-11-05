"use client";

import { ArrowUpRight, Mail, MapPin, Send } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { useState, type FormEvent } from "react";
import { profile } from "@/data/profile";
import { Reveal, SectionHeading } from "./ui";

const channels = [
  { icon: Mail, label: "Email", value: profile.email, href: profile.socials.email },
  { icon: FaLinkedinIn, label: "LinkedIn", value: "in/dzikri-aljauzi", href: profile.socials.linkedin },
  { icon: FaGithub, label: "GitHub", value: "@dzikri-aljauzi", href: profile.socials.github },
  { icon: MapPin, label: "Location", value: profile.location, href: "" },
];

const inputClass =
  "w-full rounded-xl border border-line bg-bg px-4 py-3 text-sm text-ink placeholder:text-muted/70 outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/15";

export function Contact() {
  const [sent, setSent] = useState(false);

  // No backend needed: composes the message in the visitor's email client.
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-28">
      <SectionHeading index="05" eyebrow="Get in Touch" title="Contact Me" />

      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal className="flex flex-col justify-between gap-8 rounded-3xl bg-brand-strong p-8 text-on-brand shadow-lift">
          <div>
            <h3 className="text-3xl leading-tight font-extrabold tracking-tight">
              Have a project, a role, or an idea? Let&apos;s talk.
            </h3>
            <p className="mt-4 text-sm leading-relaxed opacity-80">
              I usually reply within a day. Whether it&apos;s a full-stack product, an AI-on-the-edge problem, or
              just a hello — my inbox is open.
            </p>
          </div>
          <ul className="flex flex-col gap-3">
            {channels.map(({ icon: Icon, label, value, href }) => {
              const content = (
                <>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/15">
                    <Icon size={17} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-mono text-[10px] tracking-[0.15em] uppercase opacity-70">{label}</span>
                    <span className="block truncate text-sm font-semibold">{value}</span>
                  </span>
                  {href && <ArrowUpRight size={16} className="opacity-60 transition group-hover:opacity-100" />}
                </>
              );
              return (
                <li key={label}>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      className="group flex items-center gap-3 rounded-2xl p-2 transition hover:bg-white/10"
                    >
                      {content}
                    </a>
                  ) : (
                    <div className="flex items-center gap-3 p-2">{content}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </Reveal>

        <Reveal delay={0.1} className="rounded-3xl border border-line bg-surface p-6 shadow-soft sm:p-8">
          <h3 className="text-2xl font-bold tracking-tight text-ink">Send an email directly.</h3>
          <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className="font-mono text-[11px] tracking-[0.15em] text-muted uppercase">Name</span>
                <input name="name" required placeholder="John Doe" className={inputClass} />
              </label>
              <label className="flex flex-col gap-2">
                <span className="font-mono text-[11px] tracking-[0.15em] text-muted uppercase">Email</span>
                <input name="email" type="email" required placeholder="john@example.com" className={inputClass} />
              </label>
            </div>
            <label className="flex flex-col gap-2">
              <span className="font-mono text-[11px] tracking-[0.15em] text-muted uppercase">Message</span>
              <textarea
                name="message"
                required
                rows={6}
                placeholder="Tell me about your project…"
                className={`${inputClass} resize-none`}
              />
            </label>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-ink py-4 text-xs font-bold tracking-[0.2em] text-bg uppercase transition hover:bg-brand-strong hover:text-on-brand"
            >
              Send Message <Send size={14} />
            </button>
            {sent && (
              <p className="text-center text-xs text-muted">
                Your email app should open now. If it doesn&apos;t, write to{" "}
                <a href={profile.socials.email} className="font-semibold text-brand-strong">
                  {profile.email}
                </a>
                .
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
