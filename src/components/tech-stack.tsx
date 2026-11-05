import { skillGroups } from "@/data/profile";
import { TechIcon } from "./tech-icon";
import { Reveal, SectionHeading } from "./ui";

export function TechStack() {
  return (
    <section id="stack" className="mx-auto max-w-6xl px-6 py-28">
      <SectionHeading index="03" eyebrow="Toolbox" title="My Tech Stack" />

      <div className="flex flex-col divide-y divide-line rounded-3xl border border-line bg-surface shadow-soft">
        {skillGroups.map((group, gi) => (
          <Reveal
            key={group.title}
            delay={gi * 0.05}
            className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[260px_1fr] lg:items-center"
          >
            <div>
              <p className="font-mono text-xs text-brand-strong">0{gi + 1} /</p>
              <h3 className="mt-1 text-xl font-bold text-ink">{group.title}</h3>
              <p className="mt-1.5 text-sm text-muted">{group.caption}</p>
            </div>
            <ul className="grid grid-cols-3 gap-3 sm:grid-cols-6">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="group flex flex-col items-center gap-2.5 rounded-2xl border border-transparent px-2 py-4 text-center transition hover:-translate-y-1 hover:border-line hover:bg-surface-2"
                >
                  <TechIcon
                    name={item}
                    className="h-8 w-8 text-muted transition-colors duration-300 group-hover:text-brand"
                  />
                  <span className="text-xs font-semibold text-ink/80">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
