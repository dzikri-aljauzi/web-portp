/**
 * Shows the profile photo when one is set, otherwise a branded monogram so
 * the layout still looks finished.
 */
export function Avatar({ photo, name, className = "" }: { photo: string; name: string; className?: string }) {
  if (photo) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element -- admin-managed image, already compressed on upload */}
        <img src={photo} alt={name} className="absolute inset-0 h-full w-full object-cover" />
      </div>
    );
  }
  const initials = name
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");
  return (
    <div
      className={`relative grid place-items-center overflow-hidden bg-gradient-to-br from-[#0f766e] via-[#14b8a6] to-[#5eead4] ${className}`}
      role="img"
      aria-label={name}
    >
      <div className="dot-grid absolute inset-0 opacity-30 mix-blend-overlay" />
      <span className="relative text-[clamp(3rem,10vw,6rem)] font-extrabold tracking-tighter text-white/95 drop-shadow-sm">
        {initials}
      </span>
    </div>
  );
}
