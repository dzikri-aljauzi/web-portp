"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { saveExperience } from "@/app/admin/actions";
import type { ExperienceInput } from "@/lib/types";
import { Card, Grid, LinesInput, SaveBar, TagsInput, TextArea, TextInput, Toggle, useSave } from "./fields";

export const blankExperience: ExperienceInput = {
  role: "",
  company: "",
  type: "",
  location: "",
  period: "",
  summary: "",
  highlightValue: "",
  highlightLabel: "",
  points: [],
  tags: [],
  published: true,
};

export function ExperienceForm({ id, initial }: { id: string | null; initial: ExperienceInput }) {
  const router = useRouter();
  const [form, setForm] = useState(initial);
  const set = <K extends keyof ExperienceInput>(key: K, value: ExperienceInput[K]) => setForm((current) => ({ ...current, [key]: value }));
  const { pending, status, save } = useSave(
    () => saveExperience(id, form),
    () => {
      if (!id) router.push("/admin/experience");
    },
  );

  return (
    <div className="flex flex-col gap-6">
      <Card title="Position">
        <Grid>
          <TextInput label="Role" value={form.role} onChange={(v) => set("role", v)} placeholder="Full Stack Developer" />
          <TextInput label="Company / institution" value={form.company} onChange={(v) => set("company", v)} />
          <TextInput label="Type" hint="Part-time, Internship, Research…" value={form.type} onChange={(v) => set("type", v)} />
          <TextInput label="Location" value={form.location} onChange={(v) => set("location", v)} />
          <TextInput label="Period" value={form.period} onChange={(v) => set("period", v)} placeholder="May 2026 — Sep 2026" />
        </Grid>
      </Card>

      <Card title="Story">
        <TextArea label="Summary" hint="One or two sentences shown at the top of the card." rows={3} value={form.summary} onChange={(v) => set("summary", v)} />
        <LinesInput label="Achievements" hint="One bullet per line." rows={6} value={form.points} onChange={(v) => set("points", v)} />
        <TagsInput label="Tech / tags" value={form.tags} onChange={(v) => set("tags", v)} />
      </Card>

      <Card title="Highlight" description="The big number shown beside the card on wide screens.">
        <Grid>
          <TextInput label="Value" value={form.highlightValue} onChange={(v) => set("highlightValue", v)} placeholder="219→2 ms" />
          <TextInput label="Label" value={form.highlightLabel} onChange={(v) => set("highlightLabel", v)} placeholder="A* planner latency" />
        </Grid>
      </Card>

      <Card title="Visibility">
        <Toggle label="Published" hint="Turn off to hide this entry from the site without deleting it." checked={form.published} onChange={(v) => set("published", v)} />
      </Card>

      <SaveBar pending={pending} status={status} onSave={save} cancelHref="/admin/experience" viewHref="/#experience" />
    </div>
  );
}
