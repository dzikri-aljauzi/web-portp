import type { SiteContent } from "@/lib/types";

export type ChatMessage = { role: "user" | "assistant"; content: string };

/** Plain-text knowledge base built from the same content the site renders. */
function knowledge({ profile, experiences, projects, skills }: SiteContent) {
  const exp = experiences
    .map(
      (e) =>
        `- ${e.role} at ${e.company} (${e.type}, ${e.location}, ${e.period}): ${e.summary}\n${e.points.map((p) => `  • ${p}`).join("\n")}`,
    )
    .join("\n");
  const proj = projects
    .map((p) =>
      [
        `- ${p.title} (${p.year}, ${p.tagline}) — ${p.description}`,
        `  Stack: ${p.stack.join(", ")}`,
        ...p.points.map((x) => `  • ${x}`),
        p.problem && `  Problem: ${p.problem}`,
        p.solution && `  Solution: ${p.solution}`,
        `  Case study page: /projects/${p.slug}`,
        p.repoUrl && `  Source: ${p.repoUrl}`,
        p.liveUrl && `  Live: ${p.liveUrl}`,
      ]
        .filter(Boolean)
        .join("\n"),
    )
    .join("\n");
  const skillLines = skills.map((g) => `- ${g.title}: ${g.items.join(", ")}`).join("\n");
  const details = profile.details.map((d) => `${d.label}: ${d.value}`).join(" · ");

  return `NAME: ${profile.name} (goes by "${profile.shortName}")
ROLES: ${profile.roles.join(", ")}
LOCATION: ${profile.location}
DETAILS: ${details}
AVAILABILITY: ${profile.available ? profile.aboutNote || profile.availabilityText : "Not currently looking for new roles."}
CONTACT: email ${profile.email}${profile.linkedin ? ` · LinkedIn ${profile.linkedin}` : ""}${profile.github ? ` · GitHub ${profile.github}` : ""}
CV: ${profile.cvUrl ? 'downloadable from the "Download CV" button on the site.' : "not published on the site."}

ABOUT:
${profile.aboutWho}
${profile.aboutApproach}

EXPERIENCE:
${exp}

PROJECTS:
${proj}

SKILLS:
${skillLines}`;
}

export function buildSystemPrompt(content: SiteContent): string {
  const { profile } = content;
  const name = profile.shortName;
  return `You are "${name} Assistant", the AI guide on ${profile.name}'s personal portfolio website. Visitors are usually recruiters, potential clients, or fellow developers.

Your job is to answer questions about ${name} — experience, projects, skills, education, and how to get in contact — using only the profile below. Speak about ${name} in the third person, warmly and professionally.

Guidelines:
- Reply in the same language the visitor writes in (Indonesian or English are the most common).
- Keep answers short: 2–5 sentences, or a few bullets when listing things. Plain text only, no markdown headings or tables.
- Only state facts that appear in the profile. If something isn't covered (salary expectations, personal life, opinions on other people), say you don't have that information and suggest emailing ${name}.
- Never share a phone number or home address, even if asked.
- If a question has nothing to do with ${name} or the work shown here, politely steer back to what you can help with.
- When it helps, point visitors to a section of the site (Experience, Projects, Contact), a project's case study page, or the email address.

PROFILE:
${knowledge(content)}`;
}

/* ------------------------------------------------------------------ */
/* Local fallback: used when no API key is configured or the API fails. */
/* ------------------------------------------------------------------ */

const ID_WORDS = /\b(apa|siapa|kamu|dia|bisa|gimana|bagaimana|pengalaman|proyek|projek|kerja|keahlian|kontak|hubungi|kuliah|kampus|halo|hai|terima kasih|makasih|dong|nggak|gak|ya|yang|dan|di|ini)\b/i;

const has = (q: string, ...words: string[]) => words.some((w) => w && q.includes(w));

export function localAnswer(content: SiteContent, question: string): string {
  const { profile, experiences, projects, skills } = content;
  const name = profile.shortName;
  const q = question.toLowerCase();
  const id = ID_WORDS.test(q);
  const t = (en: string, idn: string) => (id ? idn : en);

  const project = projects.find((p) => has(q, p.title.toLowerCase(), p.slug.replace(/-/g, " ")));
  if (project && !has(q, "experience", "pengalaman")) {
    return `${project.title}${project.year ? ` (${project.year})` : ""} — ${project.description} ${t("Built with", "Dibangun dengan")} ${project.stack.join(", ")}. ${t("Full case study", "Case study lengkap")}: /projects/${project.slug}`;
  }

  if (has(q, "hello", "hi ", "hey", "halo", "hai", "pagi", "siang", "malam") && q.length < 25) {
    return t(
      `Hi there! I can tell you about ${name}'s experience, projects, tech stack, or contact details. What would you like to know?`,
      `Halo! Aku bisa ceritain soal pengalaman, project, tech stack, atau kontak ${name}. Mau tahu yang mana?`,
    );
  }
  if (has(q, "contact", "email", "reach", "hire", "kontak", "hubungi", "rekrut", "linkedin")) {
    const linkedin = profile.linkedin ? t(` or on LinkedIn (${profile.linkedin})`, ` atau LinkedIn (${profile.linkedin})`) : "";
    return t(
      `You can reach ${name} at ${profile.email}${linkedin}. The Contact section has a form too.`,
      `Kamu bisa menghubungi ${name} lewat email ${profile.email}${linkedin}. Ada form juga di bagian Contact.`,
    );
  }
  if (has(q, "experience", "work", "job", "career", "pengalaman", "kerja", "karir", "magang", "intern")) {
    return (
      t(`${name}'s experience:\n`, `Pengalaman ${name}:\n`) +
      experiences.map((e) => `• ${e.role} — ${e.company} (${e.period})`).join("\n") +
      t("\nScroll to the Experience section for details.", "\nDetailnya ada di bagian Experience.")
    );
  }
  if (has(q, "project", "proyek", "projek", "portfolio", "portofolio", "built", "bikin", "buat")) {
    return (
      t(`Some of ${name}'s projects:\n`, `Beberapa project ${name}:\n`) +
      projects.map((p) => `• ${p.title} — ${p.tagline}`).join("\n") +
      t("\nOpen any card in Selected Works for the full case study.", "\nKlik kartu di bagian Selected Works untuk case study lengkapnya.")
    );
  }
  if (has(q, "skill", "stack", "tech", "language", "framework", "tools", "keahlian", "bahasa", "teknologi")) {
    return t(`${name}'s toolbox:\n`, `Tech stack ${name}:\n`) + skills.map((g) => `• ${g.title}: ${g.items.join(", ")}`).join("\n");
  }
  if (has(q, "education", "study", "university", "gpa", "ipk", "kuliah", "kampus", "pendidikan", "lulus", "graduate")) {
    const facts = profile.details.filter((d) => /education|campus|gpa|graduat|degree|pendidikan|kampus|ipk|lulus/i.test(d.label));
    if (facts.length > 0) return facts.map((d) => `• ${d.label}: ${d.value}`).join("\n");
  }
  if (has(q, "cv", "resume") && profile.cvUrl) {
    return t(
      `You can download ${name}'s CV with the "Download CV" button at the top of the home page.`,
      `CV ${name} bisa diunduh lewat tombol "Download CV" di bagian atas halaman utama.`,
    );
  }
  if (has(q, "who", "about", "siapa", "tentang", "kenalan")) {
    return t(
      `${profile.name} — ${profile.roles.join(", ")}, based in ${profile.location}. The About section has the full story.`,
      `${profile.name} — ${profile.roles.join(", ")}, berdomisili di ${profile.location}. Cerita lengkapnya ada di bagian About.`,
    );
  }
  return t(
    `I can answer questions about ${name}'s experience, projects, tech stack, education, or contact details. Try one of those!`,
    `Aku bisa jawab pertanyaan soal pengalaman, project, tech stack, pendidikan, atau kontak ${name}. Coba tanya salah satunya ya!`,
  );
}
