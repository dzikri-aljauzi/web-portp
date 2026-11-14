import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ProjectDetail } from "@/components/project/detail";
import { getContent } from "@/lib/content";

export async function generateStaticParams() {
  const { projects } = await getContent();
  // At least one entry is required; an unknown slug simply renders "not found".
  return projects.length > 0 ? projects.map((project) => ({ slug: project.slug })) : [{ slug: "none" }];
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const { projects, profile } = await getContent();
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project not found" };
  return {
    title: `${project.title} — ${profile.shortName}`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: "article",
      images: project.coverImage ? [project.coverImage] : undefined,
    },
  };
}

async function ProjectContent({ params }: Pick<PageProps<"/projects/[slug]">, "params">) {
  const { slug } = await params;
  const { projects } = await getContent();
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  return <ProjectDetail project={projects[index]} previous={projects[index - 1]} next={projects[index + 1]} />;
}

export default function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <ProjectContent params={params} />
    </Suspense>
  );
}
