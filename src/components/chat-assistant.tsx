"use client";

import { AnimatePresence, motion } from "motion/react";
import { MessageCircle, SendHorizontal, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { localAnswer, type ChatMessage } from "@/lib/assistant";

type Bubble = ChatMessage & { time: string };

const suggestions = ["Who is Dzikri?", "What are his best projects?", "Tech stack?", "Pengalaman kerjanya apa aja?"];

const now = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const greeting: ChatMessage = {
  role: "assistant",
  content:
    "Hi! I'm Dzikri's assistant. Ask me anything about his experience, projects, or skills — in English or Bahasa Indonesia.",
};

export function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Bubble[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [offline, setOffline] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const id = setTimeout(() => inputRef.current?.focus(), 200);
    return () => clearTimeout(id);
  }, [open]);

  const toggle = () => {
    if (!open && messages.length === 0) setMessages([{ ...greeting, time: now() }]);
    setOpen((v) => !v);
  };

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy]);

  const send = async (text: string) => {
    const question = text.trim();
    if (!question || busy) return;
    setInput("");
    const history = [...messages, { role: "user" as const, content: question, time: now() }];
    setMessages(history);
    setBusy(true);

    let reply = "";
    if (!offline) {
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: history.map(({ role, content }) => ({ role, content })),
          }),
        });
        if (res.ok) reply = (await res.json()).reply ?? "";
        else if (res.status === 503 || res.status === 404) setOffline(true);
      } catch {
        // network error or static hosting without an API route: use local answers
      }
    }
    if (!reply) {
      await new Promise((r) => setTimeout(r, 450));
      reply = localAnswer(question);
    }

    setMessages((m) => [...m, { role: "assistant", content: reply, time: now() }]);
    setBusy(false);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    send(input);
  };

  return (
    <>
      <motion.button
        type="button"
        onClick={toggle}
        aria-label={open ? "Close assistant" : "Open AI assistant"}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2.2, type: "spring", stiffness: 260, damping: 20 }}
        className="fixed right-5 bottom-5 z-[60] grid h-14 w-14 place-items-center rounded-2xl bg-brand-strong text-on-brand shadow-[0_12px_32px_var(--brand-glow)] transition hover:-translate-y-0.5"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
        {!open && (
          <span className="absolute -top-1.5 -right-1.5 rounded-full border-2 border-bg bg-[#5eead4] px-1.5 py-0.5 font-mono text-[9px] font-bold text-[#04201c]">
            AI
          </span>
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            style={{ transformOrigin: "bottom right" }}
            className="fixed right-5 bottom-24 z-[60] flex h-[min(560px,calc(100vh-8rem))] w-[calc(100vw-2.5rem)] max-w-[380px] flex-col overflow-hidden rounded-3xl border border-line bg-surface shadow-lift"
            role="dialog"
            aria-label="Dzikri Assistant"
          >
            <div className="flex items-center gap-3 border-b border-line bg-gradient-to-r from-brand-soft to-transparent px-4 py-3.5">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-strong text-on-brand">
                <Sparkles size={18} />
              </span>
              <div className="flex-1">
                <p className="text-sm font-bold text-ink">Dzikri Assistant</p>
                <p className="flex items-center gap-1.5 text-[11px] font-medium text-brand-strong">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand" /> Online
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="grid h-8 w-8 place-items-center rounded-full text-muted hover:bg-surface-2 hover:text-ink"
              >
                <X size={16} />
              </button>
            </div>

            <div ref={scrollRef} className="flex flex-1 flex-col gap-3 overflow-y-auto bg-bg/50 p-4" aria-live="polite">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                    m.role === "user"
                      ? "self-end rounded-br-md bg-brand-strong text-on-brand"
                      : "self-start rounded-bl-md border border-line bg-surface text-ink shadow-soft"
                  }`}
                >
                  {m.content}
                  <span className={`mt-1 block text-[10px] ${m.role === "user" ? "opacity-70" : "text-muted"}`}>
                    {m.time}
                  </span>
                </div>
              ))}
              {busy && (
                <div className="flex gap-1 self-start rounded-2xl rounded-bl-md border border-line bg-surface px-4 py-3.5">
                  {[0, 1, 2].map((d) => (
                    <motion.span
                      key={d}
                      className="h-1.5 w-1.5 rounded-full bg-brand"
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: d * 0.15 }}
                    />
                  ))}
                </div>
              )}
              {messages.length <= 1 && !busy && (
                <div className="mt-1 flex flex-wrap gap-2">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => send(s)}
                      className="rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-medium text-muted transition hover:border-brand hover:text-brand-strong"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <form onSubmit={onSubmit} className="flex gap-2 border-t border-line p-3">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything…"
                maxLength={500}
                className="flex-1 rounded-xl border border-line bg-bg px-3.5 py-2.5 text-sm text-ink outline-none placeholder:text-muted/70 focus:border-brand"
              />
              <button
                type="submit"
                disabled={!input.trim() || busy}
                aria-label="Send"
                className="grid h-10 w-10 place-items-center rounded-xl bg-brand-strong text-on-brand transition disabled:opacity-40"
              >
                <SendHorizontal size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
