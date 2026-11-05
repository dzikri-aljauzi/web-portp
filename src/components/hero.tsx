"use client";

import { motion } from "motion/react";
import { ArrowRight, Cpu, Download, GraduationCap, Layers, Mail, MapPin } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { profile } from "@/data/profile";
import { Avatar } from "./avatar";

function useTypewriter(words: string[]) {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index % words.length];
    const done = !deleting && text === word;
    const empty = deleting && text === "";
    const delay = done ? 1600 : empty ? 300 : deleting ? 40 : 75;
    const id = setTimeout(() => {
      if (done) setDeleting(true);
      else if (empty) {
        setDeleting(false);
        setIndex((i) => i + 1);
      } else setText(word.slice(0, text.length + (deleting ? -1 : 1)));
    }, delay);
    return () => clearTimeout(id);
  }, [text, deleting, index, words]);

  return text;
}

const chips = [
  { icon: GraduationCap, label: "Fresh Graduate · GPA 3.61", pos: "left-0 top-6 sm:-left-14 sm:top-10" },
  { icon: Layers, label: "Next.js & Laravel", pos: "right-0 top-1/2 sm:-right-12" },
  { icon: Cpu, label: "Edge AI on Jetson", pos: "left-2 bottom-4 sm:-left-8 sm:bottom-6" },
];

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay: 1.6 + delay, ease: [0.22, 1, 0.36, 1] as const },
});

export function Hero() {
  const role = useTypewriter(profile.roles);

  return (
    <section id="home" className="relative overflow-hidden pt-32 pb-20 sm:pt-40">
      <div className="dot-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
      <div className="pointer-events-none absolute -top-40 right-0 h-[480px] w-[480px] rounded-full bg-brand/20 blur-[120px]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-6 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <motion.div {...fade(0)}>
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-medium text-muted shadow-soft">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
              </span>
              Open to opportunities
              <span className="text-line">|</span>
              <MapPin size={12} /> {profile.location}
            </span>
          </motion.div>

          <motion.h1
            {...fade(0.1)}
            className="mt-6 text-5xl leading-[1.05] font-extrabold tracking-tight text-ink sm:text-7xl"
          >
            Hi, I&apos;m <span className="gradient-text">{profile.shortName}</span>
          </motion.h1>

          <motion.p {...fade(0.2)} className="mt-4 h-9 font-mono text-xl font-medium text-ink/80 sm:text-2xl">
            <span className="text-brand">&gt;</span> {role}
            <span className="caret ml-0.5 inline-block h-6 w-[2px] translate-y-1 bg-brand" />
          </motion.p>

          <motion.p {...fade(0.3)} className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {profile.intro}
          </motion.p>

          <motion.div {...fade(0.4)} className="mt-9 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-xl bg-brand-strong px-6 py-3.5 text-sm font-semibold text-on-brand shadow-[0_8px_24px_var(--brand-glow)] transition hover:-translate-y-0.5"
            >
              Explore Work
              <ArrowRight size={16} className="transition group-hover:translate-x-1" />
            </a>
            <a
              href={profile.cvUrl}
              download
              className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-6 py-3.5 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:border-brand"
            >
              Download CV <Download size={16} />
            </a>
          </motion.div>

          <motion.div {...fade(0.5)} className="mt-10 flex items-center gap-4">
            <span className="font-mono text-[11px] tracking-[0.2em] text-muted uppercase">Connect</span>
            <span className="h-px w-8 bg-line" />
            {[
              { href: profile.socials.github, icon: FaGithub, label: "GitHub" },
              { href: profile.socials.linkedin, icon: FaLinkedinIn, label: "LinkedIn" },
              { href: profile.socials.email, icon: Mail, label: "Email" },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-surface text-muted transition hover:-translate-y-0.5 hover:border-brand hover:text-brand-strong"
              >
                <Icon size={17} />
              </a>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 1.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[380px]"
        >
          <div className="animate-spin-slow absolute -inset-6 rounded-[3rem] border-2 border-dashed border-brand/40" />
          <div className="relative aspect-square rotate-3 rounded-[2.5rem] bg-brand-soft p-3 shadow-lift">
            <Avatar className="h-full w-full -rotate-3 rounded-[2rem]" sizes="380px" />
          </div>

          {chips.map(({ icon: Icon, label, pos }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, x: i % 2 ? 20 : -20 }}
              animate={{ opacity: 1, x: 0, y: [0, -6, 0] }}
              transition={{
                opacity: { delay: 2 + i * 0.15 },
                x: { delay: 2 + i * 0.15 },
                y: { duration: 4, repeat: Infinity, delay: i * 0.8, ease: "easeInOut" },
              }}
              className={`absolute ${pos} flex items-center gap-2.5 rounded-2xl border border-line bg-surface/90 py-2 pr-4 pl-2 text-xs font-semibold text-ink shadow-lift backdrop-blur`}
            >
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-brand-soft text-brand-strong">
                <Icon size={15} />
              </span>
              {label}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
