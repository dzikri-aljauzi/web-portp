import { statusLabel, type Project } from "@/lib/types";

const styles: Record<Project["status"], { dot: string; pulse: boolean }> = {
  live: { dot: "bg-brand", pulse: true },
  completed: { dot: "bg-muted", pulse: false },
  "in-progress": { dot: "bg-[#f59e0b]", pulse: true },
  research: { dot: "bg-[#818cf8]", pulse: false },
};

export function StatusBadge({ status }: { status: Project["status"] }) {
  const style = styles[status];
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface/90 px-2.5 py-1 font-mono text-[10px] font-semibold tracking-wide text-ink uppercase backdrop-blur">
      <span className="relative flex h-1.5 w-1.5">
        {style.pulse && <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-70 ${style.dot}`} />}
        <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${style.dot}`} />
      </span>
      {statusLabel(status)}
    </span>
  );
}
