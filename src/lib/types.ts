import { z } from "zod";

/**
 * Content schemas shared by the public site, the admin forms and the server
 * actions. Everything the admin saves is validated against these.
 */

const text = (max: number) => z.string().trim().max(max);
const required = (max: number) => text(max).min(1, "Required");

/** List of short strings; blank entries are dropped. */
const list = (maxItems: number, maxLength: number) =>
  z
    .array(z.string().max(maxLength + 20))
    .max(maxItems * 2)
    .transform((items) => items.map((s) => s.trim().slice(0, maxLength)).filter(Boolean).slice(0, maxItems));

/** External link: empty or http(s) only (blocks javascript: and friends). */
const link = text(500).refine((v) => v === "" || /^https?:\/\//i.test(v), "Must start with http:// or https://");

/** Image/file reference: empty, http(s) URL, or a path on this site. */
const asset = text(500).refine(
  (v) => v === "" || /^https?:\/\//i.test(v) || /^\/(?!\/)/.test(v),
  "Must be a URL or a path starting with /",
);

/* ------------------------------ Profile ------------------------------ */

export const profileSchema = z.object({
  name: required(80),
  shortName: required(30),
  roles: list(6, 40),
  location: text(80),
  email: z.email("Enter a valid email").max(120),
  photo: asset,
  cvUrl: asset,
  available: z.boolean(),
  availabilityText: text(60),
  intro: text(600),
  github: link,
  linkedin: link,
  aboutWho: text(900),
  aboutApproach: text(900),
  aboutNote: text(140),
  chips: list(3, 34),
  marquee: list(10, 30),
  details: z.array(z.object({ label: required(30), value: required(80) })).max(8),
  stats: z
    .array(z.object({ value: z.number().min(0).max(1_000_000), suffix: text(8), label: required(70) }))
    .max(4),
});
export type Profile = z.infer<typeof profileSchema>;

/* ------------------------------- Skills ------------------------------ */

export const skillGroupSchema = z.object({
  title: required(40),
  caption: text(120),
  items: list(12, 30),
});
export const skillsSchema = z.array(skillGroupSchema).max(8);
export type SkillGroup = z.infer<typeof skillGroupSchema>;

/* ----------------------------- Experience ---------------------------- */

export const experienceSchema = z.object({
  role: required(80),
  company: required(100),
  type: text(30),
  location: text(60),
  period: text(40),
  summary: text(400),
  highlightValue: text(14),
  highlightLabel: text(40),
  points: list(8, 400),
  tags: list(12, 30),
  published: z.boolean(),
});
export type ExperienceInput = z.infer<typeof experienceSchema>;
export type Experience = ExperienceInput & { id: string };

/* ------------------------------ Projects ----------------------------- */

export const CATEGORIES = [
  { id: "web", label: "Web Platforms" },
  { id: "ai", label: "AI & Research" },
  { id: "mobile", label: "Mobile" },
  { id: "other", label: "Other" },
] as const;

export const STATUSES = [
  { id: "live", label: "Live" },
  { id: "completed", label: "Completed" },
  { id: "in-progress", label: "In progress" },
  { id: "research", label: "Research" },
] as const;

/** Built-in illustrations used when a project has no cover image. */
export const PREVIEWS = ["certify", "learn", "edge", "dashboard", "generic"] as const;

export const featuresSchema = z.array(z.object({ title: required(60), description: text(300) })).max(9);
export const metricsSchema = z.array(z.object({ value: required(14), label: required(60) })).max(4);
export const gallerySchema = z.array(z.object({ url: asset.min(1, "Required"), caption: text(140) })).max(12);

export const projectSchema = z.object({
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .max(80)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and dashes"),
  title: required(80),
  tagline: text(80),
  year: text(12),
  category: z.enum(CATEGORIES.map((c) => c.id)),
  role: text(60),
  status: z.enum(STATUSES.map((s) => s.id)),
  duration: text(40),
  description: text(400),
  overview: text(3000),
  problem: text(2000),
  solution: text(2000),
  learnings: text(2000),
  points: list(8, 300),
  stack: list(16, 30),
  features: featuresSchema,
  metrics: metricsSchema,
  gallery: gallerySchema,
  coverImage: asset,
  preview: z.enum(PREVIEWS),
  liveUrl: link,
  repoUrl: link,
  featured: z.boolean(),
  published: z.boolean(),
});
export type ProjectInput = z.infer<typeof projectSchema>;
export type Project = ProjectInput & { id: string };

/* ------------------------------- Site -------------------------------- */

export type SiteContent = {
  profile: Profile;
  skills: SkillGroup[];
  experiences: Experience[];
  projects: Project[];
  /** Where the content came from: the database, or the built-in defaults. */
  source: "database" | "defaults";
};

export const categoryLabel = (id: string) => CATEGORIES.find((c) => c.id === id)?.label ?? id;
export const statusLabel = (id: string) => STATUSES.find((s) => s.id === id)?.label ?? id;

/** First validation message, phrased for the admin form. */
export function firstIssue(error: z.ZodError): string {
  const issue = error.issues[0];
  if (!issue) return "Invalid data.";
  const path = issue.path.filter((p) => typeof p === "string").join(" → ");
  return path ? `${path}: ${issue.message}` : issue.message;
}
