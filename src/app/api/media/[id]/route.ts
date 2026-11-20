import { db, hasDatabase } from "@/lib/db";

/** Serves an uploaded file. Files never change once stored, so they cache forever. */
export async function GET(_request: Request, { params }: RouteContext<"/api/media/[id]">) {
  const { id } = await params;
  if (!hasDatabase() || !/^[a-z0-9]{10,40}$/.test(id)) return new Response("Not found", { status: 404 });

  const media = await db()
    .media.findUnique({ where: { id } })
    .catch(() => null);
  if (!media) return new Response("Not found", { status: 404 });

  return new Response(new Uint8Array(media.data), {
    headers: {
      "Content-Type": media.mimeType,
      "Content-Length": String(media.size),
      "Content-Disposition": `inline; filename="${media.filename.replace(/[^\w.\- ]/g, "_")}"`,
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
