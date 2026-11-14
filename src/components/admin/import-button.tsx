"use client";

import { importDefaults } from "@/app/admin/actions";
import { useSave } from "./fields";

export function ImportButton() {
  const { pending, status, save } = useSave(importDefaults);
  return (
    <div className="mt-5">
      <button type="button" onClick={save} disabled={pending} className="rounded-xl bg-brand-strong px-5 py-2.5 text-sm font-semibold text-on-brand disabled:opacity-60">
        {pending ? "Importing…" : "Import current content"}
      </button>
      {status.kind === "error" && <p className="mt-3 text-sm font-medium text-red-500">{status.message}</p>}
    </div>
  );
}
