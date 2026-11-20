import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { ExperienceSection } from "@/components/experience";
import { Hero } from "@/components/hero";
import { Loader } from "@/components/loader";
import { Marquee } from "@/components/marquee";
import { Projects } from "@/components/projects";
import { Stats } from "@/components/stats";
import { TechStack } from "@/components/tech-stack";
import { getContent } from "@/lib/content";

export default async function Home() {
  const { profile, skills, experiences, projects } = await getContent();
  return (
    <>
      <Loader brand={profile.shortName.toLowerCase()} />
      <Hero profile={profile} />
      <Stats stats={profile.stats} />
      <About profile={profile} />
      <ExperienceSection experiences={experiences} />
      <Marquee words={profile.marquee} />
      <TechStack skills={skills} />
      <Projects projects={projects} github={profile.github} />
      <Contact profile={profile} />
    </>
  );
}
