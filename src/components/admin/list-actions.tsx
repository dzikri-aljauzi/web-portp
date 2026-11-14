"use client";

import { ArrowDown, ArrowUp, Eye, EyeOff, Loader2, Trash2 } from "lucide-react";
import { useState, useTransition } from "react";
import { deleteItem, deleteMedia, moveItem, setPublished, type Result } from "@/app/admin/actions";

const button =
  "grid h-9 w-9 place-items-center rounded-lg border border-line text-muted transition hover:border-brand hover:text-brand-strong disabled:opacity-30";

function useAction() {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const run = (action: () => Promise<Result>) =>
    startTransition(async () => {
      const result = await action().catch((): Result => ({ ok: false, error: "Could not reach the server." }));
      setError(result.ok ? "" : result.error);
    });
  return { pending, error, run };
}

/** Reorder, publish/unpublish and delete buttons for a project or experience row. */
export function ListActions({ kind, id, title, published, first, last }: { kind: "project" | "experience"; id: string; title: string; published: boolean; first: boolean; last: boolean }) {
  const { pending, error, run } = useAction();
  return (
    <div className="flex flex-col items-end gap-1">
      <div className="flex gap-1.5">
        {pending && <Loader2 size={16} className="mt-2.5 animate-spin text-muted" />}
        <button type="button" aria-label="Move up" disabled={first || pending} onClick={() => run(() => moveItem(kind, id, -1))} className={button}>
          <ArrowUp size={15} />
        </button>
        <button type="button" aria-label="Move down" disabled={last || pending} onClick={() => run(() => moveItem(kind, id, 1))} className={button}>
          <ArrowDown size={15} />
        </button>
        <button type="button" aria-label={published ? "Hide from site" : "Publish"} title={published ? "Hide from site" : "Publish"} disabled={pending} onClick={() => run(() => setPublished(kind, id, !published))} className={button}>
          {published ? <Eye size={15} /> : <EyeOff size={15} />}
        </button>
        <button
          type="button"
          aria-label="Delete"
          disabled={pending}
          onClick={() => {
            if (window.confirm(`Delete “${title}”? This cannot be undone.`)) run(() => deleteItem(kind, id));
          }}
          className={`${button} hover:border-red-400 hover:text-red-500`}
        >
          <Trash2 size={15} />
        </button>
      </div>
      {error && <p className="text-xs font-medium text-red-500">{error}</p>}
    </div>
  );
}

export function DeleteMediaButton({ id, name }: { id: string; name: string }) {
  const { pending, error, run } = useAction();
  return (
    <>
      <button
        type="button"
        aria-label={`Delete ${name}`}
        disabled={pending}
        onClick={() => {
          if (window.confirm(`Delete “${name}”? Anything on the site still using it will show a broken image.`)) run(() => deleteMedia(id));
        }}
        className={`${button} hover:border-red-400 hover:text-red-500`}
      >
        {pending ? <Loader2 size={15} className="animate-spin" /> : <Trash2 size={15} />}
      </button>
      {error && <p className="text-xs font-medium text-red-500">{error}</p>}
    </>
  );
}
