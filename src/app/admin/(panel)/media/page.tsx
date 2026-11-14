import { FileText } from "lucide-react";
import { DeleteMediaButton } from "@/components/admin/list-actions";
import { MediaUploader } from "@/components/admin/media-uploader";
import { DatabaseNotice, PageHeader } from "@/components/admin/page-parts";
import { adminGate } from "@/lib/admin";
import { db } from "@/lib/db";

const size = (bytes: number) => (bytes > 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`);

export default async function MediaPage() {
  const problem = await adminGate();
  if (problem) {
    return (
      <>
        <PageHeader title="Media" />
        <DatabaseNotice problem={problem} />
      </>
    );
  }

  const files = await db().media.findMany({
    select: { id: true, filename: true, mimeType: true, size: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <PageHeader title="Media" description="Every file you have uploaded. Images up to 4 MB; photos are shrunk automatically." />
      <MediaUploader />
      {files.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-dashed border-line bg-surface p-8 text-center text-sm text-muted">Nothing uploaded yet.</p>
      ) : (
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {files.map((file) => (
            <li key={file.id} className="overflow-hidden rounded-2xl border border-line bg-surface shadow-soft">
              <a href={`/api/media/${file.id}`} target="_blank" rel="noreferrer" className="grid aspect-video place-items-center bg-surface-2">
                {file.mimeType.startsWith("image/") ? (
                  // eslint-disable-next-line @next/next/no-img-element -- admin thumbnail
                  <img src={`/api/media/${file.id}`} alt={file.filename} loading="lazy" className="h-full w-full object-cover" />
                ) : (
                  <FileText size={28} className="text-muted" />
                )}
              </a>
              <div className="flex items-center gap-3 p-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-ink">{file.filename}</p>
                  <p className="font-mono text-[11px] text-muted">
                    {size(file.size)} · /api/media/{file.id}
                  </p>
                </div>
                <DeleteMediaButton id={file.id} name={file.filename} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
