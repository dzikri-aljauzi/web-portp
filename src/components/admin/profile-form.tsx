"use client";

import { useState } from "react";
import { saveProfile } from "@/app/admin/actions";
import type { Profile } from "@/lib/types";
import { Card, FileInput, Grid, LinesInput, Rows, SaveBar, TagsInput, TextArea, TextInput, Toggle, inputClass, useSave } from "./fields";

export function ProfileForm({ initial }: { initial: Profile }) {
  const [form, setForm] = useState(initial);
  const set = <K extends keyof Profile>(key: K, value: Profile[K]) => setForm((current) => ({ ...current, [key]: value }));
  const { pending, status, save } = useSave(() => saveProfile(form));

  return (
    <div className="flex flex-col gap-6">
      <Card title="Identity" description="Who you are. Shown in the hero, the footer and the browser tab.">
        <Grid>
          <TextInput label="Full name" value={form.name} onChange={(v) => set("name", v)} />
          <TextInput label="Short name" hint="Used in “Hi, I'm …” and the logo." value={form.shortName} onChange={(v) => set("shortName", v)} />
          <TextInput label="Location" value={form.location} onChange={(v) => set("location", v)} />
          <TextInput label="Email" type="email" value={form.email} onChange={(v) => set("email", v)} />
        </Grid>
        <TagsInput label="Roles" hint="Typed one after another under your name. Separate with commas." value={form.roles} onChange={(v) => set("roles", v)} />
        <TextArea label="Intro" hint="The paragraph in the hero. Also used as the site description on Google." rows={4} value={form.intro} onChange={(v) => set("intro", v)} />
      </Card>

      <Card title="Photo, CV and links">
        <FileInput label="Profile photo" hint="Leave empty to show your initials instead." value={form.photo} onChange={(v) => set("photo", v)} />
        <FileInput label="CV (PDF)" kind="pdf" hint="The file behind the “Download CV” button. Leave empty to hide the button." value={form.cvUrl} onChange={(v) => set("cvUrl", v)} />
        <Grid>
          <TextInput label="GitHub URL" value={form.github} onChange={(v) => set("github", v)} placeholder="https://github.com/…" />
          <TextInput label="LinkedIn URL" value={form.linkedin} onChange={(v) => set("linkedin", v)} placeholder="https://www.linkedin.com/in/…" />
        </Grid>
      </Card>

      <Card title="Availability">
        <Toggle label="Show availability badge" hint="The pulsing badge above your name." checked={form.available} onChange={(v) => set("available", v)} />
        <Grid>
          <TextInput label="Badge text" value={form.availabilityText} onChange={(v) => set("availabilityText", v)} />
          <TextInput label="Note on the About photo" value={form.aboutNote} onChange={(v) => set("aboutNote", v)} />
        </Grid>
      </Card>

      <Card title="Hero extras">
        <LinesInput label="Floating badges" hint="Up to 3, one per line. They float around your photo." rows={3} value={form.chips} onChange={(v) => set("chips", v)} />
        <TagsInput label="Scrolling banner words" hint="The big moving text between sections. Separate with commas." value={form.marquee} onChange={(v) => set("marquee", v)} />
      </Card>

      <Card title="About">
        <TextArea label="Who I am" rows={5} value={form.aboutWho} onChange={(v) => set("aboutWho", v)} />
        <TextArea label="How I work" rows={5} value={form.aboutApproach} onChange={(v) => set("aboutApproach", v)} />
        <Rows label="Personal details" hint="Label and value pairs, such as Education or GPA." items={form.details} onChange={(v) => set("details", v)} blank={{ label: "", value: "" }} max={8} addLabel="Add detail">
          {(item, update) => (
            <>
              <input aria-label="Label" placeholder="Label" value={item.label} onChange={(e) => update({ label: e.target.value })} className={inputClass} />
              <input aria-label="Value" placeholder="Value" value={item.value} onChange={(e) => update({ value: e.target.value })} className={inputClass} />
            </>
          )}
        </Rows>
      </Card>

      <Card title="Highlight numbers" description="The strip of big numbers under the hero. Up to 4.">
        <Rows label="Numbers" items={form.stats} onChange={(v) => set("stats", v)} blank={{ value: 0, suffix: "", label: "" }} max={4} addLabel="Add number">
          {(item, update) => (
            <>
              <div className="flex gap-2">
                <input aria-label="Number" type="number" min={0} placeholder="115" value={item.value} onChange={(e) => update({ value: Number(e.target.value) || 0 })} className={inputClass} />
                <input aria-label="Suffix" placeholder="× / K+ / %" value={item.suffix} onChange={(e) => update({ suffix: e.target.value })} className={`${inputClass} w-28`} />
              </div>
              <input aria-label="Description" placeholder="What the number means" value={item.label} onChange={(e) => update({ label: e.target.value })} className={inputClass} />
            </>
          )}
        </Rows>
      </Card>

      <SaveBar pending={pending} status={status} onSave={save} viewHref="/" />
    </div>
  );
}
