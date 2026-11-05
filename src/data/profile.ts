/**
 * Single source of truth for every piece of content on the site.
 * Edit this file to update the portfolio — the UI and the AI assistant
 * both read from here.
 */

export type Experience = {
  role: string;
  company: string;
  type: string;
  location: string;
  period: string;
  summary: string;
  highlight: { value: string; label: string };
  points: string[];
  tags: string[];
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  year: string;
  category: "web" | "ai";
  role: string;
  description: string;
  points: string[];
  stack: string[];
  /** Fill these in when the links are public. Empty string hides the button. */
  liveUrl: string;
  repoUrl: string;
  preview: "certify" | "learn" | "edge" | "dashboard";
};

export const profile = {
  name: "Laksamana Dzikri Al Jauzi",
  shortName: "Dzikri",
  handle: "dzikri-aljauzi",
  roles: ["Full Stack Developer", "Edge AI Engineer", "Problem Solver"],
  location: "Semarang, Indonesia",
  email: "laksamanadzikri9@gmail.com",
  /** Put your photo at /public/profile.jpg and set this to "/profile.jpg". */
  photo: "",
  cvUrl: "/cv/CV_Laksamana_Dzikri.pdf",
  available: true,
  intro:
    "I build production web platforms end-to-end and squeeze real-time performance out of AI on edge hardware. From a Laravel or Next.js app serving real users to a perception pipeline running at 25 FPS on a Jetson, I care about the same thing: software that is fast, reliable, and actually ships.",
  socials: {
    github: "https://github.com/dzikri-aljauzi",
    linkedin: "https://www.linkedin.com/in/dzikri-aljauzi",
    email: "mailto:laksamanadzikri9@gmail.com",
  },
  about: {
    who: "I'm a Computer Engineering Technology graduate from Semarang State Polytechnic who works across two worlds: full-stack web development and applied AI research. I've shipped and maintained production websites for a company, and built edge perception systems for autonomous vehicles in research labs.",
    approach:
      "I start from the problem, measure before optimizing, and keep things simple enough to maintain. Whether it's a role-based admin dashboard or an A* planner, I aim for clean architecture, measurable results, and an interface people can use without a manual.",
  },
  details: [
    { label: "Name", value: "Laksamana Dzikri Al Jauzi" },
    { label: "Based in", value: "Semarang, Indonesia" },
    { label: "Education", value: "B.A.Sc. Computer Engineering Technology" },
    { label: "Campus", value: "Semarang State Polytechnic" },
    { label: "GPA", value: "3.61 / 4.00" },
    { label: "Graduated", value: "September 2026" },
  ],
  stats: [
    { value: 115, suffix: "×", label: "faster A* path planner after optimization" },
    { value: 25, suffix: " FPS", label: "real-time edge perception on Jetson Orin NX" },
    { value: 50, suffix: "K+", label: "multi-sensor driving records engineered" },
    { value: 3, suffix: "", label: "production-grade platforms shipped" },
  ],
};

export const experiences: Experience[] = [
  {
    role: "Full Stack Developer",
    company: "Leadership Nasional Asia (LNA)",
    type: "Part-time",
    location: "Indonesia",
    period: "May 2026 — Sep 2026",
    summary:
      "Owned the company's main production websites end-to-end, from new features and deployments to keeping the servers healthy.",
    highlight: { value: "2", label: "production stacks owned" },
    points: [
      "Developed and maintained the company's main production websites end-to-end across two stacks: Next.js, and Laravel with Inertia.js + React.",
      "Administered the production VPS — deployments, server configuration, and ongoing maintenance to keep every site online.",
      "Configured Cloudflare rules for the company's domains and VPS to secure and manage incoming traffic.",
    ],
    tags: ["Next.js", "Laravel", "Inertia.js", "React", "VPS", "Nginx", "Cloudflare"],
  },
  {
    role: "Research Assistant",
    company: "Semarang State Polytechnic",
    type: "Research",
    location: "Semarang, Indonesia",
    period: "Feb 2026 — Aug 2026",
    summary:
      "Built a complete edge perception and path-planning system for an autonomous platform, then made it fast enough to run in real time.",
    highlight: { value: "219→2 ms", label: "A* planner latency" },
    points: [
      "Built an end-to-end edge perception and path-planning system on NVIDIA Jetson Orin NX: YOLO detection, stereo depth, BEV projection, occupancy grid mapping, and A* planning, running at ~25 FPS.",
      "Optimized the A* planner with Numba JIT, lookup tables, and a weighted heuristic — cutting latency from 219 ms to ~2 ms (~115×) and lifting pipeline throughput from 4 to 25 FPS with identical output paths.",
      "Deployed detection models via ONNX Runtime and TensorRT with FP16/INT8; FP16 reduced latency by 31% (36.6 → 25.3 ms) with under 0.2-point mAP50 loss.",
    ],
    tags: ["Python", "YOLO", "TensorRT", "ONNX Runtime", "Numba", "Jetson Orin NX"],
  },
  {
    role: "Research Intern",
    company: "National Research and Innovation Agency (BRIN)",
    type: "Internship",
    location: "Indonesia",
    period: "Aug 2025 — Dec 2025",
    summary:
      "Worked on the MEVI autonomous vehicle project — from the operator dashboard to the data that trains the driving model.",
    highlight: { value: "6", label: "sensors synchronized" },
    points: [
      "Redesigned the UI/UX of the MEVI autonomous vehicle dashboard, making its core functions more accessible to operators.",
      "Engineered a 50,000-record driving dataset pipeline synchronizing 6 multi-modal sensors: cameras, LiDAR, IMU, GPS, and wheel encoders.",
      "Prototyped a predictive model for waypoint navigation and analyzed training loss to establish baselines for obstacle avoidance.",
    ],
    tags: ["UI/UX", "Python", "LiDAR", "Sensor Fusion", "Deep Learning"],
  },
];

export const projects: Project[] = [
  {
    slug: "sangkala-certify",
    title: "Sangkala Certify",
    tagline: "Certification & assessment platform",
    year: "2026",
    category: "web",
    role: "Full Stack Developer",
    description:
      "A full-stack certification platform that replaces spreadsheet-based certificate tracking with a proper system: a bilingual marketing site, an admin dashboard, and a multi-role assessment portal.",
    points: [
      "End-to-end certificate issuance: PDF generation with selectable templates and QR codes linked to a public verification page.",
      "Bulk participant import from Excel and automated expiry tracking with scheduled email reminders.",
      "Secured with NextAuth, role-based access for five roles, an audit log of admin changes, and per-email / per-IP brute-force lockout.",
      "Bilingual (ID/EN) marketing site; deployed on Vercel with Neon PostgreSQL.",
    ],
    stack: ["Next.js", "React", "TypeScript", "Prisma", "PostgreSQL", "NextAuth", "Vercel"],
    liveUrl: "",
    repoUrl: "",
    preview: "certify",
  },
  {
    slug: "sangkalearn",
    title: "SangkaLearn",
    tagline: "Learning & certification LMS",
    year: "2026",
    category: "web",
    role: "Full Stack Developer",
    description:
      "A learning platform covering the whole journey from buying a course to earning a certificate — with course authoring, payments, and real-time notifications.",
    points: [
      "Course authoring (video, PDF, text), enrollment, progress tracking, quizzes, assignments, live sessions, and messaging with role-based access for 4 roles.",
      "Midtrans payments (QRIS, e-wallets, virtual accounts) with a webhook that auto-creates enrollments and sends confirmation emails.",
      "Containerized with Docker (multi-stage build, PHP-FPM, nginx, queue worker) and deployed to Railway with managed PostgreSQL and health checks.",
      "Real-time notifications via Laravel Echo.",
    ],
    stack: ["Laravel 12", "React 18", "Inertia.js", "PostgreSQL", "Docker", "Midtrans", "Railway"],
    liveUrl: "",
    repoUrl: "https://github.com/dzikri-aljauzi/SangkaLearn",
    preview: "learn",
  },
  {
    slug: "edge-perception",
    title: "Edge Perception & Planner",
    tagline: "Real-time autonomy on Jetson",
    year: "2026",
    category: "ai",
    role: "Research Assistant",
    description:
      "A camera-to-path pipeline for an autonomous platform that detects obstacles, builds a bird's-eye occupancy map, and plans a route — all on a Jetson Orin NX in real time.",
    points: [
      "YOLO detection + stereo depth → BEV projection → occupancy grid → A* planning, at ~25 FPS end-to-end.",
      "A* planner optimized ~115× (219 ms → ~2 ms) with Numba JIT, lookup tables, and a weighted heuristic — identical output paths.",
      "TensorRT FP16 cut detection latency by 31% with under 0.2-point mAP50 loss.",
    ],
    stack: ["Python", "YOLO", "TensorRT", "ONNX Runtime", "Numba", "NVIDIA Jetson"],
    liveUrl: "",
    repoUrl: "",
    preview: "edge",
  },
  {
    slug: "mevi-dashboard",
    title: "MEVI Vehicle Dashboard",
    tagline: "Autonomous vehicle UI & data",
    year: "2025",
    category: "ai",
    role: "Research Intern · BRIN",
    description:
      "A redesigned operator dashboard for the MEVI autonomous vehicle, plus the data pipeline behind its driving model.",
    points: [
      "Reworked the dashboard UI/UX so core vehicle functions are easier to reach and read.",
      "50,000-record dataset pipeline synchronizing cameras, LiDAR, IMU, GPS, and encoders.",
      "Waypoint-navigation model prototype with loss analysis to set obstacle-avoidance baselines.",
    ],
    stack: ["UI/UX", "Python", "Sensor Fusion", "Deep Learning"],
    liveUrl: "",
    repoUrl: "",
    preview: "dashboard",
  },
];

export const skillGroups = [
  {
    title: "Frontend",
    caption: "Interfaces that are fast, responsive, and easy to use.",
    items: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "HTML/CSS"],
  },
  {
    title: "Backend & Data",
    caption: "APIs, auth, payments, and the databases behind them.",
    items: ["Laravel", "Inertia.js", "PHP", "Prisma", "PostgreSQL", "MySQL"],
  },
  {
    title: "DevOps & Cloud",
    caption: "Shipping it, and keeping it online.",
    items: ["Docker", "Nginx", "Cloudflare", "Vercel", "Railway", "Git"],
  },
  {
    title: "AI & Edge",
    caption: "Perception models tuned for real-time hardware.",
    items: ["Python", "YOLO", "TensorRT", "ONNX Runtime", "Numba", "NVIDIA Jetson"],
  },
];
