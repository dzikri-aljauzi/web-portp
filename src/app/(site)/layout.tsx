import { ChatAssistant } from "@/components/chat-assistant";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { getContent } from "@/lib/content";

/** Shell for the public pages: navbar, footer and the AI assistant. */
export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const { profile } = await getContent();
  return (
    <>
      <Navbar brand={profile.shortName.toLowerCase()} />
      <main>{children}</main>
      <Footer name={profile.name} />
      <ChatAssistant name={profile.shortName} email={profile.email} />
    </>
  );
}
