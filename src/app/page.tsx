import { About } from "@/components/about";
import { ChatAssistant } from "@/components/chat-assistant";
import { Contact } from "@/components/contact";
import { ExperienceSection } from "@/components/experience";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Loader } from "@/components/loader";
import { Marquee } from "@/components/marquee";
import { Navbar } from "@/components/navbar";
import { Projects } from "@/components/projects";
import { Stats } from "@/components/stats";
import { TechStack } from "@/components/tech-stack";

export default function Home() {
  return (
    <>
      <Loader />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <About />
        <ExperienceSection />
        <Marquee />
        <TechStack />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <ChatAssistant />
    </>
  );
}
