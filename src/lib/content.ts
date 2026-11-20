import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { defaultContent } from "@/data/defaults";
import type { Experience as ExperienceRow, Project as ProjectRow } from "@/generated/prisma/client";
import { db, hasDatabase } from "./db";
import {
  featuresSchema,
  gallerySchema,
  metricsSchema,
  profileSchema,
  projectSchema,
  skillsSchema,
  type Experience,
  type Profile,
  type Project,
  type SiteContent,
  type SkillGroup,
} from "./types";

/** Cache tag for all public content; admin saves call updateTag(CONTENT_TAG). */
export const CONTENT_TAG = "content";

export function toProject(row: ProjectRow): Project {
  const pick = <T,>(values: readonly T[], value: string, fallback: T) =>
    (values as readonly string[]).includes(value) ? (value as T) : fallback;
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    tagline: row.tagline,
    year: row.year,
    category: pick(projectSchema.shape.category.options, row.category, "other"),
    role: row.role,
    status: pick(projectSchema.shape.status.options, row.status, "completed"),
    duration: row.duration,
    description: row.description,
    overview: row.overview,
    problem: row.problem,
    solution: row.solution,
    learnings: row.learnings,
    points: row.points,
    stack: row.stack,
    features: featuresSchema.catch([]).parse(row.features),
    metrics: metricsSchema.catch([]).parse(row.metrics),
    gallery: gallerySchema.catch([]).parse(row.gallery),
    coverImage: row.coverImage,
    preview: pick(projectSchema.shape.preview.options, row.preview, "generic"),
    liveUrl: row.liveUrl,
    repoUrl: row.repoUrl,
    featured: row.featured,
    published: row.published,
  };
}

export function toExperience(row: ExperienceRow): Experience {
  return {
    id: row.id,
    role: row.role,
    company: row.company,
    type: row.type,
    location: row.location,
    period: row.period,
    summary: row.summary,
    highlightValue: row.highlightValue,
    highlightLabel: row.highlightLabel,
    points: row.points,
    tags: row.tags,
    published: row.published,
  };
}

/** Stored profile/skills documents; falls back to defaults if missing or invalid. */
export async function readSettings(): Promise<{ profile: Profile; skills: SkillGroup[]; seeded: boolean }> {
  const rows = await db().setting.findMany({ where: { key: { in: ["profile", "skills"] } } });
  const value = (key: string) => rows.find((r) => r.key === key)?.value;
  const profile = profileSchema.safeParse(value("profile"));
  const skills = skillsSchema.safeParse(value("skills"));
  return {
    profile: profile.success ? profile.data : defaultContent.profile,
    skills: skills.success ? skills.data : defaultContent.skills,
    seeded: rows.some((r) => r.key === "profile"),
  };
}

/**
 * Everything the public site renders. Cached and tagged, so pages stay static
 * and refresh the moment the admin saves a change.
 */
export async function getContent(): Promise<SiteContent> {
  "use cache";
  cacheTag(CONTENT_TAG);

  if (!hasDatabase()) {
    cacheLife("hours");
    return defaultContent;
  }

  try {
    const [settings, projects, experiences] = await Promise.all([
      readSettings(),
      db().project.findMany({ where: { published: true }, orderBy: [{ position: "asc" }, { createdAt: "asc" }] }),
      db().experience.findMany({ where: { published: true }, orderBy: [{ position: "asc" }, { createdAt: "asc" }] }),
    ]);
    cacheLife("hours");
    // Until the admin has imported content, keep showing the built-in defaults.
    if (!settings.seeded) return defaultContent;
    return {
      profile: settings.profile,
      skills: settings.skills,
      projects: projects.map(toProject),
      experiences: experiences.map(toExperience),
      source: "database",
    };
  } catch (error) {
    // Database unreachable or not migrated yet: degrade to defaults, retry soon.
    console.error("Could not load content from the database:", error);
    cacheLife("minutes");
    return defaultContent;
  }
}
