import Image from "next/image";
import { profile } from "@/data/profile";

/**
 * Shows /public photo when profile.photo is set, otherwise a branded
 * monogram so the layout still looks finished.
 */
export function Avatar({ className = "", sizes }: { className?: string; sizes: string }) {
  if (profile.photo) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image src={profile.photo} alt={profile.name} fill sizes={sizes} className="object-cover" priority />
      </div>
    );
  }
  return (
    <div
      className={`relative grid place-items-center overflow-hidden bg-gradient-to-br from-[#0f766e] via-[#14b8a6] to-[#5eead4] ${className}`}
      role="img"
      aria-label={profile.name}
    >
      <div className="dot-grid absolute inset-0 opacity-30 mix-blend-overlay" />
      <span className="relative text-[clamp(3rem,10vw,6rem)] font-extrabold tracking-tighter text-white/95 drop-shadow-sm">
        LD
      </span>
    </div>
  );
}
