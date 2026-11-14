"use client";

import { ArrowDown, ArrowUp, Check, Loader2, Plus, Trash2, Upload } from "lucide-react";
import Link from "next/link";
import { useId, useRef, useState, useTransition, type ReactNode } from "react";
import type { Result } from "@/app/admin/actions";

export const inputClass =
  "w-full rounded-xl border border-line bg-bg px-3.5 py-2.5 text-sm text-ink outline-none transition placeholder:text-muted/60 focus:border-brand focus:ring-4 focus:ring-brand/15";

const labelClass = "text-xs font-semibold text-ink";

/* ------------------------------ Layout ------------------------------- */

export function Card({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-line bg-surface p-5 shadow-soft sm:p-6">
      <h2 className="text-base font-bold text-ink">{title}</h2>
      {description && <p className="mt-1 text-sm text-muted">{description}</p>}
      <div className="mt-5 flex flex-col gap-5">{children}</div>
    </section>
  );
}

export function Grid({ children }: { children: ReactNode }) {
  return <div className="grid gap-5 sm:grid-cols-2">{children}</div>;
}

function Field({ label, hint, htmlFor, children }: { label: string; hint?: string; htmlFor?: string; children: ReactNode }) {
  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <label htmlFor={htmlFor} className={labelClass}>
        {label}
      </label>
      {children}
      {hint && <p className="text-xs text-muted">{hint}</p>}
    </div>
  );
}

/* ------------------------------ Inputs ------------------------------- */

type TextProps = {
  label: string;
  hint?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
};

export function TextInput({ label, hint, value, onChange, placeholder, type = "text" }: TextProps) {
  const id = useId();
  return (
    <Field label={label} hint={hint} htmlFor={id}>
      <input id={id} type={type} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className={inputClass} />
    </Field>
  );
}

export function TextArea({ label, hint, value, onChange, placeholder, rows = 4 }: TextProps & { rows?: number }) {
  const id = useId();
  return (
    <Field label={label} hint={hint} htmlFor={id}>
      <textarea id={id} rows={rows} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className={`${inputClass} resize-y leading-relaxed`} />
    </Field>
  );
}

/** A list of strings edited as one item per line. */
export function LinesInput({ label, hint, value, onChange, rows = 4 }: { label: string; hint?: string; value: string[]; onChange: (value: string[]) => void; rows?: number }) {
  return <TextArea label={label} hint={hint ?? "One item per line."} rows={rows} value={value.join("\n")} onChange={(text) => onChange(text.split("\n"))} />;
}

/** A list of short strings edited as comma-separated text. */
export function TagsInput({ label, hint, value, onChange }: { label: string; hint?: string; value: string[]; onChange: (value: string[]) => void }) {
  return <TextInput label={label} hint={hint ?? "Separate items with commas."} value={value.join(",")} onChange={(text) => onChange(text.split(","))} />;
}

export function Select({ label, hint, value, onChange, options }: { label: string; hint?: string; value: string; onChange: (value: string) => void; options: readonly { id: string; label: string }[] }) {
  const id = useId();
  return (
    <Field label={label} hint={hint} htmlFor={id}>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className={inputClass}>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
    </Field>
  );
}

export function Toggle({ label, hint, checked, onChange }: { label: string; hint?: string; checked: boolean; onChange: (checked: boolean) => void }) {
  return (
    <label className="flex cursor-pointer items-start gap-3">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={`relative mt-0.5 h-6 w-11 shrink-0 rounded-full transition ${checked ? "bg-brand-strong" : "bg-line"}`}
      >
        <span className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${checked ? "translate-x-5" : ""}`} />
      </button>
      <span>
        <span className="block text-sm font-semibold text-ink">{label}</span>
        {hint && <span className="block text-xs text-muted">{hint}</span>}
      </span>
    </label>
  );
}

/* --------------------------- Repeatable rows -------------------------- */

export function Rows<T>({
  label,
  hint,
  items,
  onChange,
  blank,
  max,
  addLabel = "Add",
  children,
}: {
  label: string;
  hint?: string;
  items: T[];
  onChange: (items: T[]) => void;
  blank: T;
  max: number;
  addLabel?: string;
  children: (item: T, update: (patch: Partial<T>) => void) => ReactNode;
}) {
  const move = (from: number, to: number) => {
    const next = [...items];
    [next[from], next[to]] = [next[to], next[from]];
    onChange(next);
  };
  const iconButton = "grid h-8 w-8 place-items-center rounded-lg border border-line text-muted transition hover:border-brand hover:text-brand-strong disabled:opacity-30";

  return (
    <div className="flex flex-col gap-3">
      <div>
        <p className={labelClass}>{label}</p>
        {hint && <p className="mt-0.5 text-xs text-muted">{hint}</p>}
      </div>
      {items.map((item, i) => (
        <div key={i} className="flex flex-col gap-3 rounded-xl border border-line bg-surface-2/50 p-3 sm:flex-row sm:items-start">
          <div className="grid min-w-0 flex-1 gap-3 sm:grid-cols-2">
            {children(item, (patch) => onChange(items.map((current, index) => (index === i ? { ...current, ...patch } : current))))}
          </div>
          <div className="flex shrink-0 gap-1.5 sm:pt-6">
            <button type="button" aria-label="Move up" disabled={i === 0} onClick={() => move(i, i - 1)} className={iconButton}>
              <ArrowUp size={14} />
            </button>
            <button type="button" aria-label="Move down" disabled={i === items.length - 1} onClick={() => move(i, i + 1)} className={iconButton}>
              <ArrowDown size={14} />
            </button>
            <button type="button" aria-label="Remove" onClick={() => onChange(items.filter((_, index) => index !== i))} className={`${iconButton} hover:border-red-400 hover:text-red-500`}>
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      ))}
      {items.length < max && (
        <button
          type="button"
          onClick={() => onChange([...items, blank])}
          className="inline-flex items-center gap-2 self-start rounded-xl border border-dashed border-line px-3.5 py-2 text-sm font-semibold text-muted transition hover:border-brand hover:text-brand-strong"
        >
          <Plus size={15} /> {addLabel}
        </button>
      )}
    </div>
  );
}

/* ------------------------------ Uploads ------------------------------- */

/** Shrinks photos in the browser (max 2000px, WebP) so uploads stay small. */
async function compressImage(file: File): Promise<File> {
  if (!/^image\/(png|jpeg|webp)$/.test(file.type)) return file;
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, 2000 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext("2d")?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/webp", 0.86));
    if (!blob || blob.size >= file.size) return file;
    return new File([blob], file.name.replace(/\.\w+$/, "") + ".webp", { type: "image/webp" });
  } catch {
    return file;
  }
}

export async function uploadFile(file: File): Promise<{ url: string } | { error: string }> {
  const body = new FormData();
  body.set("file", await compressImage(file));
  try {
    const response = await fetch("/api/admin/upload", { method: "POST", body });
    const data = await response.json().catch(() => ({}));
    if (response.ok && typeof data.url === "string") return { url: data.url };
    return { error: typeof data.error === "string" ? data.error : "Upload failed." };
  } catch {
    return { error: "Upload failed. Check your connection." };
  }
}

/** URL field with an upload button. `kind` picks which files are accepted. */
export function FileInput({ label, hint, value, onChange, kind = "image" }: { label: string; hint?: string; value: string; onChange: (value: string) => void; kind?: "image" | "pdf" }) {
  const id = useId();
  const picker = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const onPick = async (file: File | undefined) => {
    if (!file) return;
    setBusy(true);
    setError("");
    const result = await uploadFile(file);
    setBusy(false);
    if ("url" in result) onChange(result.url);
    else setError(result.error);
  };

  return (
    <Field label={label} hint={hint} htmlFor={id}>
      <div className="flex gap-2">
        {kind === "image" && value && (
          // eslint-disable-next-line @next/next/no-img-element -- small admin preview
          <img src={value} alt="" className="h-10 w-10 shrink-0 rounded-lg border border-line object-cover" />
        )}
        <input id={id} value={value} placeholder={kind === "image" ? "Upload, or paste an image URL" : "Upload, or paste a link"} onChange={(e) => onChange(e.target.value)} className={inputClass} />
        <button
          type="button"
          disabled={busy}
          onClick={() => picker.current?.click()}
          className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-line px-3.5 text-sm font-semibold text-ink transition hover:border-brand hover:text-brand-strong disabled:opacity-60"
        >
          {busy ? <Loader2 size={15} className="animate-spin" /> : <Upload size={15} />}
          <span className="hidden sm:inline">Upload</span>
        </button>
        <input
          ref={picker}
          type="file"
          hidden
          accept={kind === "image" ? "image/png,image/jpeg,image/webp,image/gif,image/avif" : "application/pdf"}
          onChange={(e) => {
            onPick(e.target.files?.[0]);
            e.target.value = "";
          }}
        />
      </div>
      {error && <p className="text-xs font-medium text-red-500">{error}</p>}
    </Field>
  );
}

/* ------------------------------- Saving ------------------------------- */

type SaveStatus = { kind: "idle" } | { kind: "saved" } | { kind: "error"; message: string };

export function useSave(action: () => Promise<Result>, onSaved?: (id?: string) => void) {
  const [pending, startTransition] = useTransition();
  const [status, setStatus] = useState<SaveStatus>({ kind: "idle" });
  const save = () =>
    startTransition(async () => {
      try {
        const result = await action();
        if (result.ok) {
          setStatus({ kind: "saved" });
          onSaved?.(result.id);
        } else setStatus({ kind: "error", message: result.error });
      } catch {
        setStatus({ kind: "error", message: "Could not reach the server. Try again." });
      }
    });
  return { pending, status, save };
}

/** Sticky bar at the bottom of every editor. */
export function SaveBar({ pending, status, onSave, viewHref, cancelHref }: { pending: boolean; status: SaveStatus; onSave: () => void; viewHref?: string; cancelHref?: string }) {
  return (
    <div className="sticky bottom-3 z-10 flex flex-wrap items-center gap-3 rounded-2xl border border-line bg-surface/95 p-3 shadow-lift backdrop-blur">
      <button
        type="button"
        onClick={onSave}
        disabled={pending}
        className="inline-flex items-center gap-2 rounded-xl bg-brand-strong px-5 py-2.5 text-sm font-semibold text-on-brand transition disabled:opacity-60"
      >
        {pending ? <Loader2 size={15} className="animate-spin" /> : <Check size={15} />}
        {pending ? "Saving…" : "Save changes"}
      </button>
      {cancelHref && (
        <Link href={cancelHref} className="rounded-xl px-3 py-2.5 text-sm font-semibold text-muted hover:text-ink">
          Back
        </Link>
      )}
      <p role="status" className="min-w-0 flex-1 text-sm">
        {status.kind === "saved" && <span className="font-medium text-brand-strong">Saved. The site is updated.</span>}
        {status.kind === "error" && <span className="font-medium text-red-500">{status.message}</span>}
      </p>
      {viewHref && (
        <a href={viewHref} target="_blank" rel="noreferrer" className="text-sm font-semibold text-muted underline-offset-4 hover:text-brand-strong hover:underline">
          View on site ↗
        </a>
      )}
    </div>
  );
}
