const words = ["Full Stack Developer", "Edge AI Engineer", "Next.js", "Laravel", "TensorRT", "Clean Code"];

export function Marquee() {
  const row = [...words, ...words];
  return (
    <div className="relative -rotate-1 overflow-hidden border-y border-line bg-surface py-6" aria-hidden>
      <div className="animate-marquee flex w-max gap-10 whitespace-nowrap">
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-10 text-4xl font-extrabold tracking-tight sm:text-6xl">
            <span className={i % 2 ? "text-ink" : "text-outline"}>{w}</span>
            <span className="text-2xl text-brand">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
