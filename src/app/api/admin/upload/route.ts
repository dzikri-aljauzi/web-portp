import { isAdmin } from "@/lib/auth";
import { db, hasDatabase } from "@/lib/db";

const MAX_BYTES = 4 * 1024 * 1024;

// SVG is deliberately excluded: it can carry scripts.
const ALLOWED: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/avif": "avif",
  "application/pdf": "pdf",
};

export async function POST(request: Request) {
  if (!(await isAdmin())) return Response.json({ error: "Not signed in." }, { status: 401 });
  if (!hasDatabase()) return Response.json({ error: "No database is connected." }, { status: 503 });

  const form = await request.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) return Response.json({ error: "No file was sent." }, { status: 400 });
  if (!ALLOWED[file.type]) {
    return Response.json({ error: "Only PNG, JPG, WebP, GIF, AVIF or PDF files are allowed." }, { status: 415 });
  }
  if (file.size > MAX_BYTES) return Response.json({ error: "The file is larger than 4 MB." }, { status: 413 });

  try {
    const media = await db().media.create({
      data: {
        filename: file.name.slice(0, 120) || `upload.${ALLOWED[file.type]}`,
        mimeType: file.type,
        size: file.size,
        data: new Uint8Array(await file.arrayBuffer()),
      },
      select: { id: true },
    });
    return Response.json({ url: `/api/media/${media.id}` });
  } catch (error) {
    console.error("Upload failed:", error);
    return Response.json({ error: "Could not store the file." }, { status: 500 });
  }
}
