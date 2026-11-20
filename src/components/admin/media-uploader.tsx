"use client";

import { Loader2, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { uploadFile } from "./fields";

export function MediaUploader() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const onFiles = async (files: FileList | null) => {
    setBusy(true);
    setError("");
    for (const file of Array.from(files ?? [])) {
      const result = await uploadFile(file);
      if ("error" in result) setError(`${file.name}: ${result.error}`);
    }
    setBusy(false);
    router.refresh();
  };

  return (
    <div>
      <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-brand-strong px-4 py-2.5 text-sm font-semibold text-on-brand">
        {busy ? <Loader2 size={15} className="animate-spin" /> : <Upload size={15} />}
        {busy ? "Uploading…" : "Upload files"}
        <input type="file" hidden multiple disabled={busy} accept="image/png,image/jpeg,image/webp,image/gif,image/avif,application/pdf" onChange={(e) => onFiles(e.target.files).then(() => (e.target.value = ""))} />
      </label>
      {error && <p className="mt-2 text-sm font-medium text-red-500">{error}</p>}
    </div>
  );
}
