import { experiences, profile, projects, skillGroups } from "@/data/profile";

export type ChatMessage = { role: "user" | "assistant"; content: string };

/** Plain-text knowledge base built from the same data the site renders. */
function knowledge() {
  const exp = experiences
    .map(
      (e) =>
        `- ${e.role} at ${e.company} (${e.type}, ${e.location}, ${e.period}): ${e.summary}\n${e.points.map((p) => `  • ${p}`).join("\n")}`,
    )
    .join("\n");
  const proj = projects
    .map(
      (p) =>
        `- ${p.title} (${p.year}, ${p.tagline}) — ${p.description}\n  Stack: ${p.stack.join(", ")}\n${p.points.map((x) => `  • ${x}`).join("\n")}${p.repoUrl ? `\n  Source: ${p.repoUrl}` : ""}${p.liveUrl ? `\n  Live: ${p.liveUrl}` : ""}`,
    )
    .join("\n");
  const skills = skillGroups.map((g) => `- ${g.title}: ${g.items.join(", ")}`).join("\n");

  return `NAME: ${profile.name} (goes by "${profile.shortName}")
ROLES: ${profile.roles.join(", ")}
LOCATION: ${profile.location}
EDUCATION: Bachelor of Applied Science in Computer Engineering Technology, Semarang State Polytechnic. GPA 3.61/4.0. Graduated September 2026.
AVAILABILITY: Open to full-time roles in full-stack web development and applied AI.
CONTACT: email ${profile.email} · LinkedIn ${profile.socials.linkedin} · GitHub ${profile.socials.github}
CV: downloadable from the "Download CV" button on the site.

ABOUT:
${profile.about.who}
${profile.about.approach}

EXPERIENCE:
${exp}

PROJECTS:
${proj}

SKILLS:
${skills}`;
}

export const SYSTEM_PROMPT = `You are "Dzikri Assistant", the AI guide on ${profile.name}'s personal portfolio website. Visitors are usually recruiters, potential clients, or fellow developers.

Your job is to answer questions about Dzikri — his experience, projects, skills, education, and how to contact him — using only the profile below. Speak about him in the third person, warmly and professionally.

Guidelines:
- Reply in the same language the visitor writes in (Indonesian or English are the most common).
- Keep answers short: 2–5 sentences, or a few bullets when listing things. Plain text only, no markdown headings or tables.
- Only state facts that appear in the profile. If something isn't covered (salary expectations, personal life, opinions on other people), say you don't have that information and suggest emailing Dzikri.
- Never share a phone number or home address, even if asked.
- If a question has nothing to do with Dzikri or his work, politely steer back to what you can help with.
- When it helps, point visitors to a section of the site (Experience, Projects, Contact) or to his email.

PROFILE:
${knowledge()}`;

/* ------------------------------------------------------------------ */
/* Local fallback: used when no API key is configured or the API fails. */
/* ------------------------------------------------------------------ */

const ID_WORDS = /\b(apa|siapa|kamu|dia|bisa|gimana|bagaimana|pengalaman|proyek|projek|kerja|keahlian|kontak|hubungi|kuliah|kampus|halo|hai|terima kasih|makasih|dong|nggak|gak|ya|yang|dan|di|ini)\b/i;

const has = (q: string, ...words: string[]) => words.some((w) => q.includes(w));

export function localAnswer(question: string): string {
  const q = question.toLowerCase();
  const id = ID_WORDS.test(q);
  const t = (en: string, idn: string) => (id ? idn : en);

  const project = projects.find((p) =>
    has(q, p.title.toLowerCase(), p.slug.replace("-", " "), ...(p.slug === "edge-perception" ? ["jetson", "a*", "yolo", "edge"] : []), ...(p.slug === "mevi-dashboard" ? ["mevi", "brin"] : [])),
  );
  if (project && !has(q, "experience", "pengalaman")) {
    return `${project.title} (${project.year}) — ${project.description} ${t("Built with", "Dibangun dengan")} ${project.stack.join(", ")}.${project.repoUrl ? ` ${t("Source", "Source code")}: ${project.repoUrl}` : ""}`;
  }

  if (has(q, "hello", "hi ", "hey", "halo", "hai", "pagi", "siang", "malam") && q.length < 25) {
    return t(
      "Hi there! I can tell you about Dzikri's experience, projects, tech stack, or how to reach him. What would you like to know?",
      "Halo! Aku bisa ceritain soal pengalaman, project, tech stack, atau cara menghubungi Dzikri. Mau tahu yang mana?",
    );
  }
  if (has(q, "contact", "email", "reach", "hire", "kontak", "hubungi", "rekrut", "linkedin")) {
    return t(
      `You can reach Dzikri at ${profile.email} or on LinkedIn (${profile.socials.linkedin}). He's currently open to full-time roles in full-stack web and applied AI — the Contact section has a form too.`,
      `Kamu bisa menghubungi Dzikri lewat email ${profile.email} atau LinkedIn (${profile.socials.linkedin}). Saat ini dia terbuka untuk posisi full-time di bidang full-stack web dan applied AI — ada form juga di bagian Contact.`,
    );
  }
  if (has(q, "experience", "work", "job", "career", "pengalaman", "kerja", "karir", "magang", "intern")) {
    return (
      t("Dzikri's experience:\n", "Pengalaman Dzikri:\n") +
      experiences.map((e) => `• ${e.role} — ${e.company} (${e.period})`).join("\n") +
      t("\nScroll to the Experience section for details.", "\nDetailnya ada di bagian Experience.")
    );
  }
  if (has(q, "project", "proyek", "projek", "portfolio", "portofolio", "built", "bikin", "buat")) {
    return (
      t("Some of Dzikri's projects:\n", "Beberapa project Dzikri:\n") +
      projects.map((p) => `• ${p.title} — ${p.tagline}`).join("\n") +
      t("\nOpen any card in Selected Works for the full story.", "\nKlik kartu di bagian Selected Works untuk detail lengkapnya.")
    );
  }
  if (has(q, "skill", "stack", "tech", "language", "framework", "tools", "keahlian", "bahasa", "teknologi")) {
    return (
      t("Dzikri's toolbox:\n", "Tech stack Dzikri:\n") + skillGroups.map((g) => `• ${g.title}: ${g.items.join(", ")}`).join("\n")
    );
  }
  if (has(q, "education", "study", "university", "gpa", "ipk", "kuliah", "kampus", "pendidikan", "lulus", "graduate")) {
    return t(
      "Dzikri studied Computer Engineering Technology (B.A.Sc.) at Semarang State Polytechnic, graduating in September 2026 with a GPA of 3.61/4.0.",
      "Dzikri lulus dari Teknologi Rekayasa Komputer (Sarjana Terapan) di Politeknik Negeri Semarang pada September 2026 dengan IPK 3.61/4.0.",
    );
  }
  if (has(q, "cv", "resume")) {
    return t(
      'You can download Dzikri\'s CV with the "Download CV" button at the top of the page.',
      'CV Dzikri bisa diunduh lewat tombol "Download CV" di bagian atas halaman.',
    );
  }
  if (has(q, "who", "about", "siapa", "tentang", "kenalan")) {
    return t(
      `${profile.name} is a full-stack developer and edge-AI engineer from ${profile.location}. He has shipped production web platforms with Next.js and Laravel, and built a real-time perception and path-planning system on NVIDIA Jetson that runs at ~25 FPS.`,
      `${profile.name} adalah full-stack developer dan edge-AI engineer dari Semarang. Dia sudah membangun platform web production dengan Next.js dan Laravel, serta sistem perception & path-planning real-time di NVIDIA Jetson yang berjalan ~25 FPS.`,
    );
  }
  return t(
    "I can answer questions about Dzikri's experience, projects, tech stack, education, or how to contact him. Try one of those!",
    "Aku bisa jawab pertanyaan soal pengalaman, project, tech stack, pendidikan, atau kontak Dzikri. Coba tanya salah satunya ya!",
  );
}
