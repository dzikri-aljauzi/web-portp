import { BadgeCheck, Play } from "lucide-react";
import type { Project } from "@/data/profile";

/** Illustrated mock screens so each project card has a visual without screenshots. */
export function ProjectPreview({ kind }: { kind: Project["preview"] }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-brand-soft to-surface-2">
      <div className="dot-grid absolute inset-0 opacity-60" />
      <div className="absolute inset-x-6 top-6 bottom-0 overflow-hidden rounded-t-xl border border-line bg-surface shadow-lift transition-transform duration-500 group-hover:-translate-y-2">
        <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-[#ff6b6b]" />
          <span className="h-2 w-2 rounded-full bg-[#ffd166]" />
          <span className="h-2 w-2 rounded-full bg-brand" />
          <span className="ml-2 h-3 flex-1 rounded bg-surface-2" />
        </div>
        <div className="p-4">{screens[kind]}</div>
      </div>
    </div>
  );
}

const bar = (w: string, extra = "") => <div className={`h-2 rounded bg-line ${extra}`} style={{ width: w }} />;

const screens: Record<Project["preview"], React.ReactNode> = {
  certify: (
    <div className="flex gap-4">
      <div className="flex-1 rounded-lg border border-dashed border-brand/50 p-3">
        <div className="flex items-center gap-1.5 text-[10px] font-bold text-brand-strong">
          <BadgeCheck size={12} /> CERTIFIED
        </div>
        <div className="mt-2 h-3 w-3/4 rounded bg-ink/80" />
        <div className="mt-2 flex flex-col gap-1.5">
          {bar("90%")}
          {bar("70%")}
        </div>
        <div className="mt-3 flex items-end justify-between">
          <div className="h-1 w-12 rounded bg-brand" />
          <div className="grid grid-cols-4 gap-[2px]">
            {Array.from({ length: 16 }).map((_, i) => (
              <span key={i} className={`h-1.5 w-1.5 ${[0, 2, 5, 6, 9, 11, 12, 15].includes(i) ? "bg-ink" : "bg-line"}`} />
            ))}
          </div>
        </div>
      </div>
      <div className="flex w-1/3 flex-col gap-2">
        {["Active", "Expiring", "Expired"].map((s, i) => (
          <div key={s} className="rounded-md bg-surface-2 p-2">
            <div className="text-[9px] text-muted">{s}</div>
            <div className={`mt-1 h-2 rounded ${i === 0 ? "bg-brand" : i === 1 ? "bg-[#ffd166]" : "bg-line"}`} style={{ width: `${80 - i * 25}%` }} />
          </div>
        ))}
      </div>
    </div>
  ),
  learn: (
    <div className="flex gap-3">
      <div className="flex-1">
        <div className="grid aspect-video place-items-center rounded-lg bg-ink/90">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-brand text-white">
            <Play size={14} fill="currentColor" />
          </span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded bg-line">
          <div className="h-full w-3/5 bg-brand" />
        </div>
      </div>
      <div className="flex w-2/5 flex-col gap-1.5">
        {[1, 1, 1, 0, 0].map((done, i) => (
          <div key={i} className="flex items-center gap-1.5 rounded-md bg-surface-2 p-1.5">
            <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${done ? "bg-brand" : "border border-line"}`} />
            {bar(`${70 - i * 6}%`)}
          </div>
        ))}
      </div>
    </div>
  ),
  edge: (
    <div className="relative aspect-[16/8] overflow-hidden rounded-lg bg-[#071a17]">
      <div className="absolute inset-0 grid grid-cols-16 grid-rows-8">
        {Array.from({ length: 128 }).map((_, i) => (
          <span
            key={i}
            className={`border-[0.5px] border-[#12332d] ${[21, 22, 37, 38, 53, 70, 71, 86, 43, 59, 75, 102, 103].includes(i) ? "bg-[#ff6b6b]/60" : ""}`}
          />
        ))}
      </div>
      <svg viewBox="0 0 160 80" className="absolute inset-0 h-full w-full">
        <path d="M8 72 C 40 70, 40 40, 70 38 S 120 20, 150 10" fill="none" stroke="#2dd4bf" strokeWidth="2.5" strokeDasharray="4 3" />
        <circle cx="8" cy="72" r="4" fill="#2dd4bf" />
        <circle cx="150" cy="10" r="4" fill="none" stroke="#5eead4" strokeWidth="2" />
      </svg>
      <span className="absolute bottom-2 right-2 rounded bg-black/50 px-1.5 py-0.5 font-mono text-[9px] text-[#5eead4]">25 FPS</span>
    </div>
  ),
  dashboard: (
    <div className="grid grid-cols-3 gap-2">
      <div className="col-span-2 grid aspect-[16/9] place-items-center rounded-lg bg-surface-2">
        <svg viewBox="0 0 100 60" className="w-3/4">
          <path d="M10 55 A40 40 0 0 1 90 55" fill="none" stroke="var(--line)" strokeWidth="8" strokeLinecap="round" />
          <path d="M10 55 A40 40 0 0 1 72 20" fill="none" stroke="var(--brand)" strokeWidth="8" strokeLinecap="round" />
          <text x="50" y="52" textAnchor="middle" fontSize="14" fontWeight="800" fill="var(--ink)">
            42
          </text>
        </svg>
      </div>
      <div className="flex flex-col gap-2">
        {["CAM", "LiDAR", "GPS"].map((s) => (
          <div key={s} className="flex items-center justify-between rounded-md bg-surface-2 px-2 py-1.5">
            <span className="font-mono text-[9px] text-muted">{s}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
          </div>
        ))}
      </div>
      <div className="col-span-3 flex h-8 items-end gap-1">
        {[30, 55, 40, 70, 50, 85, 60, 75, 45, 90, 65, 80].map((h, i) => (
          <span key={i} className="flex-1 rounded-sm bg-brand/70" style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  ),
};
