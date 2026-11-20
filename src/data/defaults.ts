import type { Experience, Profile, Project, SiteContent, SkillGroup } from "@/lib/types";

/**
 * Built-in content. The site shows this until a database is connected, and
 * the admin dashboard imports it into the database on first login. After
 * that, edit content from /admin instead of this file.
 */

const profile: Profile = {
  name: "Laksamana Dzikri Al Jauzi",
  shortName: "Dzikri",
  roles: ["Full Stack Developer", "Edge AI Engineer", "Problem Solver"],
  location: "Semarang, Indonesia",
  email: "laksamanadzikri9@gmail.com",
  photo: "",
  cvUrl: "/cv/CV_Laksamana_Dzikri.pdf",
  available: true,
  availabilityText: "Open to opportunities",
  intro:
    "I build production web platforms end-to-end and squeeze real-time performance out of AI on edge hardware. From a Laravel or Next.js app serving real users to a perception pipeline running at 25 FPS on a Jetson, I care about the same thing: software that is fast, reliable, and actually ships.",
  github: "https://github.com/dzikri-aljauzi",
  linkedin: "https://www.linkedin.com/in/dzikri-aljauzi",
  aboutWho:
    "I'm a Computer Engineering Technology graduate from Semarang State Polytechnic who works across two worlds: full-stack web development and applied AI research. I've shipped and maintained production websites for a company, and built edge perception systems for autonomous vehicles in research labs.",
  aboutApproach:
    "I start from the problem, measure before optimizing, and keep things simple enough to maintain. Whether it's a role-based admin dashboard or an A* planner, I aim for clean architecture, measurable results, and an interface people can use without a manual.",
  aboutNote: "Currently open to full-time roles in full-stack web & applied AI.",
  chips: ["Fresh Graduate · GPA 3.61", "Next.js & Laravel", "Edge AI on Jetson"],
  marquee: ["Full Stack Developer", "Edge AI Engineer", "Next.js", "Laravel", "TensorRT", "Clean Code"],
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

const experiences: Experience[] = [
  {
    id: "lna",
    role: "Full Stack Developer",
    company: "Leadership Nasional Asia (LNA)",
    type: "Part-time",
    location: "Indonesia",
    period: "May 2026 — Sep 2026",
    summary:
      "Owned the company's main production websites end-to-end, from new features and deployments to keeping the servers healthy.",
    highlightValue: "2",
    highlightLabel: "production stacks owned",
    points: [
      "Developed and maintained the company's main production websites end-to-end across two stacks: Next.js, and Laravel with Inertia.js + React.",
      "Administered the production VPS — deployments, server configuration, and ongoing maintenance to keep every site online.",
      "Configured Cloudflare rules for the company's domains and VPS to secure and manage incoming traffic.",
    ],
    tags: ["Next.js", "Laravel", "Inertia.js", "React", "VPS", "Nginx", "Cloudflare"],
    published: true,
  },
  {
    id: "polines",
    role: "Research Assistant",
    company: "Semarang State Polytechnic",
    type: "Research",
    location: "Semarang, Indonesia",
    period: "Feb 2026 — Aug 2026",
    summary:
      "Built a complete edge perception and path-planning system for an autonomous platform, then made it fast enough to run in real time.",
    highlightValue: "219→2 ms",
    highlightLabel: "A* planner latency",
    points: [
      "Built an end-to-end edge perception and path-planning system on NVIDIA Jetson Orin NX: YOLO detection, stereo depth, BEV projection, occupancy grid mapping, and A* planning, running at ~25 FPS.",
      "Optimized the A* planner with Numba JIT, lookup tables, and a weighted heuristic — cutting latency from 219 ms to ~2 ms (~115×) and lifting pipeline throughput from 4 to 25 FPS with identical output paths.",
      "Deployed detection models via ONNX Runtime and TensorRT with FP16/INT8; FP16 reduced latency by 31% (36.6 → 25.3 ms) with under 0.2-point mAP50 loss.",
    ],
    tags: ["Python", "YOLO", "TensorRT", "ONNX Runtime", "Numba", "Jetson Orin NX"],
    published: true,
  },
  {
    id: "brin",
    role: "Research Intern",
    company: "National Research and Innovation Agency (BRIN)",
    type: "Internship",
    location: "Indonesia",
    period: "Aug 2025 — Dec 2025",
    summary:
      "Worked on the MEVI autonomous vehicle project — from the operator dashboard to the data that trains the driving model.",
    highlightValue: "6",
    highlightLabel: "sensors synchronized",
    points: [
      "Redesigned the UI/UX of the MEVI autonomous vehicle dashboard, making its core functions more accessible to operators.",
      "Engineered a 50,000-record driving dataset pipeline synchronizing 6 multi-modal sensors: cameras, LiDAR, IMU, GPS, and wheel encoders.",
      "Prototyped a predictive model for waypoint navigation and analyzed training loss to establish baselines for obstacle avoidance.",
    ],
    tags: ["UI/UX", "Python", "LiDAR", "Sensor Fusion", "Deep Learning"],
    published: true,
  },
];

const projects: Project[] = [
  {
    id: "sangkala-certify",
    slug: "sangkala-certify",
    title: "Sangkala Certify",
    tagline: "Certification & assessment platform",
    year: "2026",
    category: "web",
    role: "Full Stack Developer",
    status: "live",
    duration: "",
    description:
      "A full-stack certification platform that replaces spreadsheet-based certificate tracking with a proper system: a bilingual marketing site, an admin dashboard, and a multi-role assessment portal.",
    overview:
      "Sangkala Certify brings the whole certification lifecycle into one place. Visitors land on a bilingual (Indonesian/English) marketing site, participants go through assessments in a dedicated portal, and admins issue, track, and renew certificates from a dashboard.\n\nEvery certificate that leaves the system carries a QR code pointing to a public verification page, so anyone holding it can confirm it is genuine.",
    problem:
      "Certificates were being tracked in spreadsheets. That works for a handful of participants, but it gives no reliable way to see which certificates are about to expire, no way for a third party to verify one, and issuing them in bulk means repeating the same manual steps for every person.",
    solution:
      "I built a single platform around the certificate itself. Admins import participants from Excel, pick a template, and generate PDFs in one flow. Each PDF gets a QR code linked to a public verification page. Expiry dates are tracked automatically, with scheduled email reminders going out before a certificate lapses.\n\nBecause certificates are only worth something if they can be trusted, access is locked down: five roles with separate permissions, an audit log of every admin change, and brute-force lockout on login.",
    learnings: "",
    points: [
      "End-to-end certificate issuance: PDF generation with selectable templates and QR codes linked to a public verification page.",
      "Bulk participant import from Excel and automated expiry tracking with scheduled email reminders.",
      "Secured with NextAuth, role-based access for five roles, an audit log of admin changes, and per-email / per-IP brute-force lockout.",
      "Bilingual (ID/EN) marketing site; deployed on Vercel with Neon PostgreSQL.",
    ],
    stack: ["Next.js", "React", "TypeScript", "Prisma", "PostgreSQL", "NextAuth", "Vercel"],
    features: [
      { title: "PDF certificates", description: "Generated from selectable templates, ready to download or send." },
      { title: "QR verification", description: "Every certificate links to a public page that confirms it is genuine." },
      { title: "Bulk import", description: "Participants are imported straight from an Excel file." },
      { title: "Expiry tracking", description: "Automatic tracking with scheduled email reminders before expiry." },
      { title: "Five access roles", description: "Role-based permissions across the admin dashboard and assessment portal." },
      { title: "Audit log & lockout", description: "Admin changes are logged; repeated failed logins are locked out per email and IP." },
    ],
    metrics: [
      { value: "5", label: "access roles" },
      { value: "2", label: "languages (ID / EN)" },
      { value: "QR", label: "public certificate verification" },
    ],
    gallery: [],
    coverImage: "",
    preview: "certify",
    liveUrl: "",
    repoUrl: "",
    featured: true,
    published: true,
  },
  {
    id: "sangkalearn",
    slug: "sangkalearn",
    title: "SangkaLearn",
    tagline: "Learning & certification LMS",
    year: "2026",
    category: "web",
    role: "Full Stack Developer",
    status: "live",
    duration: "",
    description:
      "A learning platform covering the whole journey from buying a course to earning a certificate — with course authoring, payments, and real-time notifications.",
    overview:
      "SangkaLearn is a learning management system built for training and certification programs. Instructors author courses out of video, PDF, and text lessons; learners enroll, follow their progress, take quizzes, submit assignments, and join live sessions.\n\nPayment, enrollment, and notifications are wired together so that a learner who pays can start learning right away, without anyone confirming the transfer by hand.",
    problem:
      "Running paid training means stitching together several things that usually live in different tools: course material, payments, enrollment, assessments, and communication with learners. Every manual hand-off between them — especially confirming a payment before granting access — slows learners down and creates work for the team.",
    solution:
      "I built the platform as one Laravel + Inertia + React application with role-based access for four roles. Midtrans handles payments through QRIS, e-wallets, and virtual accounts; a webhook listens for successful payments, creates the enrollment automatically, and sends a confirmation email.\n\nThe app ships as a Docker image (multi-stage build with PHP-FPM, nginx, and a queue worker) and runs on Railway with managed PostgreSQL and health checks. Laravel Echo pushes notifications to learners in real time.",
    learnings: "",
    points: [
      "Course authoring (video, PDF, text), enrollment, progress tracking, quizzes, assignments, live sessions, and messaging with role-based access for 4 roles.",
      "Midtrans payments (QRIS, e-wallets, virtual accounts) with a webhook that auto-creates enrollments and sends confirmation emails.",
      "Containerized with Docker (multi-stage build, PHP-FPM, nginx, queue worker) and deployed to Railway with managed PostgreSQL and health checks.",
      "Real-time notifications via Laravel Echo.",
    ],
    stack: ["Laravel 12", "React 18", "Inertia.js", "PostgreSQL", "Docker", "Midtrans", "Railway"],
    features: [
      { title: "Course authoring", description: "Lessons built from video, PDF, and text content." },
      { title: "Progress & assessments", description: "Progress tracking, quizzes, and assignments for every enrollment." },
      { title: "Live sessions & messaging", description: "Learners and instructors meet and talk inside the platform." },
      { title: "Automated payments", description: "Midtrans checkout with QRIS, e-wallets, and virtual accounts." },
      { title: "Instant enrollment", description: "A payment webhook enrolls the learner and emails a confirmation." },
      { title: "Real-time notifications", description: "Updates are pushed live with Laravel Echo." },
    ],
    metrics: [
      { value: "4", label: "access roles" },
      { value: "3", label: "payment channels" },
      { value: "3", label: "lesson formats" },
    ],
    gallery: [],
    coverImage: "",
    preview: "learn",
    liveUrl: "",
    repoUrl: "https://github.com/dzikri-aljauzi/SangkaLearn",
    featured: true,
    published: true,
  },
  {
    id: "edge-perception",
    slug: "edge-perception",
    title: "Edge Perception & Planner",
    tagline: "Real-time autonomy on Jetson",
    year: "2026",
    category: "ai",
    role: "Research Assistant",
    status: "research",
    duration: "Feb 2026 — Aug 2026",
    description:
      "A camera-to-path pipeline for an autonomous platform that detects obstacles, builds a bird's-eye occupancy map, and plans a route — all on a Jetson Orin NX in real time.",
    overview:
      "This research project puts a complete perception and planning stack on a single NVIDIA Jetson Orin NX. Camera frames go in; a drivable path comes out.\n\nThe pipeline runs YOLO object detection and stereo depth, projects the results into a bird's-eye view, builds an occupancy grid from it, and plans a path across that grid with A*. End to end, it runs at around 25 FPS on the device.",
    problem:
      "An autonomous platform has to perceive and plan on the hardware it carries. The first working version of the pipeline ran at about 4 FPS, too slow for real-time use, and the path planner alone took 219 ms per frame.",
    solution:
      "I optimized the pipeline stage by stage. The A* planner was rewritten around Numba JIT compilation, precomputed lookup tables, and a weighted heuristic, taking it from 219 ms to roughly 2 ms per plan while producing identical paths.\n\nOn the perception side, the detection models were exported through ONNX Runtime and TensorRT and evaluated at FP16 and INT8 precision. FP16 cut detection latency by 31% (36.6 ms to 25.3 ms) while costing less than 0.2 points of mAP50.",
    learnings:
      "The biggest gain did not come from the neural network. Speeding up the planner is what lifted the whole pipeline from 4 to 25 FPS, with no change in the paths it produces.",
    points: [
      "YOLO detection + stereo depth → BEV projection → occupancy grid → A* planning, at ~25 FPS end-to-end.",
      "A* planner optimized ~115× (219 ms → ~2 ms) with Numba JIT, lookup tables, and a weighted heuristic — identical output paths.",
      "TensorRT FP16 cut detection latency by 31% with under 0.2-point mAP50 loss.",
    ],
    stack: ["Python", "YOLO", "TensorRT", "ONNX Runtime", "Numba", "NVIDIA Jetson"],
    features: [
      { title: "Object detection", description: "YOLO models deployed through ONNX Runtime and TensorRT." },
      { title: "Stereo depth", description: "Depth estimated from a stereo camera pair." },
      { title: "Bird's-eye projection", description: "Detections and depth are projected into a top-down view." },
      { title: "Occupancy grid", description: "The top-down view becomes a grid of free and blocked cells." },
      { title: "A* path planning", description: "A route is planned across the grid in about 2 ms." },
    ],
    metrics: [
      { value: "115×", label: "faster A* planner" },
      { value: "25 FPS", label: "end-to-end on Jetson Orin NX" },
      { value: "−31%", label: "detection latency with FP16" },
      { value: "<0.2", label: "mAP50 points lost" },
    ],
    gallery: [],
    coverImage: "",
    preview: "edge",
    liveUrl: "",
    repoUrl: "",
    featured: true,
    published: true,
  },
  {
    id: "mevi-dashboard",
    slug: "mevi-dashboard",
    title: "MEVI Vehicle Dashboard",
    tagline: "Autonomous vehicle UI & data",
    year: "2025",
    category: "ai",
    role: "Research Intern · BRIN",
    status: "completed",
    duration: "Aug 2025 — Dec 2025",
    description:
      "A redesigned operator dashboard for the MEVI autonomous vehicle, plus the data pipeline behind its driving model.",
    overview:
      "During my internship at Indonesia's National Research and Innovation Agency (BRIN), I worked on MEVI, an autonomous vehicle project. My work covered two ends of the system: the dashboard operators use to run the vehicle, and the dataset used to train its driving model.",
    problem:
      "The vehicle's dashboard made its core functions harder to reach than they should be. Separately, training a driving model needs recordings from several different sensors lined up in time — cameras, LiDAR, IMU, GPS, and wheel encoders each produce data in their own format and at their own rate.",
    solution:
      "I redesigned the dashboard's UI/UX so the functions operators use most are more accessible. For the data side, I engineered a pipeline that synchronizes all six sensors into a single driving dataset of 50,000 records.\n\nOn top of that dataset I prototyped a predictive model for waypoint navigation and analyzed its training loss to establish baselines for obstacle avoidance.",
    learnings: "",
    points: [
      "Reworked the dashboard UI/UX so core vehicle functions are easier to reach and read.",
      "50,000-record dataset pipeline synchronizing cameras, LiDAR, IMU, GPS, and encoders.",
      "Waypoint-navigation model prototype with loss analysis to set obstacle-avoidance baselines.",
    ],
    stack: ["UI/UX", "Python", "Sensor Fusion", "Deep Learning"],
    features: [
      { title: "Dashboard redesign", description: "Core vehicle functions made more accessible to operators." },
      { title: "Sensor synchronization", description: "Cameras, LiDAR, IMU, GPS, and encoders aligned into one dataset." },
      { title: "Waypoint model", description: "A predictive navigation prototype with baseline loss analysis." },
    ],
    metrics: [
      { value: "50K", label: "driving records" },
      { value: "6", label: "sensors synchronized" },
    ],
    gallery: [],
    coverImage: "",
    preview: "dashboard",
    liveUrl: "",
    repoUrl: "",
    featured: true,
    published: true,
  },
];

const skills: SkillGroup[] = [
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

export const defaultContent: SiteContent = { profile, skills, experiences, projects, source: "defaults" };
