import Anthropic from "@anthropic-ai/sdk";
import { buildSystemPrompt, localAnswer, type ChatMessage } from "@/lib/assistant";
import { getContent } from "@/lib/content";

const MODEL = process.env.ANTHROPIC_MODEL || "claude-opus-5-5";
const MAX_TURNS = 12;
const MAX_CHARS = 1000;

// Minimal per-IP rate limit so a public API key can't be drained.
// (Per server instance; use a shared store such as Upstash for stricter limits.)
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 20;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_REQUESTS;
}

function parseMessages(body: unknown): ChatMessage[] | null {
  if (!body || typeof body !== "object" || !Array.isArray((body as { messages?: unknown }).messages)) return null;
  const raw = (body as { messages: unknown[] }).messages.slice(-MAX_TURNS);
  const messages: ChatMessage[] = [];
  for (const m of raw) {
    if (!m || typeof m !== "object") return null;
    const { role, content } = m as Record<string, unknown>;
    if ((role !== "user" && role !== "assistant") || typeof content !== "string" || !content.trim()) return null;
    messages.push({ role, content: content.slice(0, MAX_CHARS) });
  }
  // The API expects the conversation to start with a user turn.
  while (messages.length && messages[0].role !== "user") messages.shift();
  if (!messages.length || messages[messages.length - 1].role !== "user") return null;
  return messages;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return Response.json({ error: "rate_limited" }, { status: 429 });
  }

  const messages = parseMessages(await request.json().catch(() => null));
  if (!messages) {
    return Response.json({ error: "invalid_request" }, { status: 400 });
  }

  const content = await getContent();
  const question = messages[messages.length - 1].content;

  // Without an API key the assistant answers from the site content directly.
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json({ reply: localAnswer(content, question) });
  }

  const client = new Anthropic();

  try {
    const response = await client.beta.messages.create({
      model: MODEL,
      max_tokens: 16000,
      output_config: { effort: "low" },
      // Server-side fallback: if the model declines, the API retries on a suitable model.
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      system: [{ type: "text", text: buildSystemPrompt(content), cache_control: { type: "ephemeral" } }],
      messages,
    });

    if (response.stop_reason === "refusal") {
      return Response.json({
        reply: `Sorry, I can't help with that one. Feel free to ask about ${content.profile.shortName}'s experience, projects, or skills!`,
      });
    }

    const reply = response.content
      .flatMap((block) => (block.type === "text" ? [block.text] : []))
      .join("")
      .trim();

    return Response.json({ reply: reply || "Hmm, I couldn't come up with an answer. Could you rephrase?" });
  } catch (error) {
    // Rate limits, outages or a bad key: fall back to the built-in answers.
    if (error instanceof Anthropic.APIError) console.error(`Claude API error ${error.status}:`, error.message);
    else console.error("Chat route failed:", error);
    return Response.json({ reply: localAnswer(content, question) });
  }
}
