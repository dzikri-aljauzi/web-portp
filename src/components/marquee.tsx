export function Marquee({ words }: { words: string[] }) {
  if (words.length === 0) return null;
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
