import type { IconType } from "react-icons";
import {
  SiCloudflare,
  SiCss,
  SiDocker,
  SiGit,
  SiInertia,
  SiJavascript,
  SiLaravel,
  SiMysql,
  SiNextdotjs,
  SiNginx,
  SiNumba,
  SiNvidia,
  SiOnnx,
  SiPhp,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiRailway,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiYolo,
} from "react-icons/si";
import { Cpu } from "lucide-react";

const icons: Record<string, IconType> = {
  React: SiReact,
  "Next.js": SiNextdotjs,
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  "Tailwind CSS": SiTailwindcss,
  "HTML/CSS": SiCss,
  Laravel: SiLaravel,
  "Inertia.js": SiInertia,
  PHP: SiPhp,
  Prisma: SiPrisma,
  PostgreSQL: SiPostgresql,
  MySQL: SiMysql,
  Docker: SiDocker,
  Nginx: SiNginx,
  Cloudflare: SiCloudflare,
  Vercel: SiVercel,
  Railway: SiRailway,
  Git: SiGit,
  Python: SiPython,
  YOLO: SiYolo,
  TensorRT: SiNvidia,
  "ONNX Runtime": SiOnnx,
  Numba: SiNumba,
  "NVIDIA Jetson": SiNvidia,
};

export function TechIcon({ name, className }: { name: string; className?: string }) {
  const Icon = icons[name];
  if (!Icon) return <Cpu className={className} aria-hidden />;
  return <Icon className={className} aria-hidden />;
}
