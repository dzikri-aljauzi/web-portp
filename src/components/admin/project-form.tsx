"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { saveProject } from "@/app/admin/actions";
import { CATEGORIES, PREVIEWS, STATUSES, type ProjectInput } from "@/lib/types";
import { Card, FileInput, Grid, LinesInput, Rows, SaveBar, Select, TagsInput, TextArea, TextInput, Toggle, inputClass, uploadFile, useSave } from "./fields";

export const blankProject: ProjectInput = {
  slug: "",
  title: "",
  tagline: "",
  year: "",
  category: "web",
  role: "",
  status: "completed",
  duration: "",
  description: "",
  overview: "",
  problem: "",
  solution: "",
  learnings: "",
  points: [],
  stack: [],
  features: [],
  metrics: [],
  gallery: [],
  coverImage: "",
  preview: "generic",
  liveUrl: "",
  repoUrl: "",
  featured: true,
  published: true,
};

const slugify = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

const previewOptions = PREVIEWS.map((id) => ({ id, label: id[0].toUpperCase() + id.slice(1) }));

export function ProjectForm({ id, initial }: { id: string | null; initial: ProjectInput }) {
  const router = useRouter();
  const [form, setForm] = useState(initial);
  // For a new project the slug follows the title until it is edited by hand.
  const [slugTouched, setSlugTouched] = useState(Boolean(id));
  const set = <K extends keyof ProjectInput>(key: K, value: ProjectInput[K]) => setForm((current) => ({ ...current, [key]: value }));
  const { pending, status, save } = useSave(
    () => saveProject(id, form),
    () => {
      if (!id) router.push("/admin/projects");
    },
  );

  const addGalleryFiles = async (files: FileList | null) => {
    for (const file of Array.from(files ?? [])) {
      const result = await uploadFile(file);
      if ("url" in result) setForm((current) => ({ ...current, gallery: [...current.gallery, { url: result.url, caption: "" }] }));
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Card title="Basics" description="Shown on the project card and at the top of the project page.">
        <Grid>
          <TextInput
            label="Title"
            value={form.title}
            onChange={(v) => setForm((current) => ({ ...current, title: v, slug: slugTouched ? current.slug : slugify(v) }))}
          />
          <TextInput
            label="Slug"
            hint={`Page address: /projects/${form.slug || "…"}`}
            value={form.slug}
            onChange={(v) => {
              setSlugTouched(true);
              set("slug", v);
            }}
          />
          <TextInput label="Tagline" value={form.tagline} onChange={(v) => set("tagline", v)} placeholder="Certification & assessment platform" />
          <TextInput label="Your role" value={form.role} onChange={(v) => set("role", v)} placeholder="Full Stack Developer" />
          <TextInput label="Year" value={form.year} onChange={(v) => set("year", v)} />
          <TextInput label="Timeline" hint="Optional." value={form.duration} onChange={(v) => set("duration", v)} placeholder="Feb 2026 — Aug 2026" />
          <Select label="Category" value={form.category} onChange={(v) => set("category", v as ProjectInput["category"])} options={CATEGORIES} />
          <Select label="Status" value={form.status} onChange={(v) => set("status", v as ProjectInput["status"])} options={STATUSES} />
        </Grid>
        <TextArea label="Short description" hint="Two or three sentences. Used on the card and as the page intro." rows={3} value={form.description} onChange={(v) => set("description", v)} />
      </Card>

      <Card title="Links">
        <Grid>
          <TextInput label="Live demo URL" value={form.liveUrl} onChange={(v) => set("liveUrl", v)} placeholder="https://…" />
          <TextInput label="GitHub / source URL" value={form.repoUrl} onChange={(v) => set("repoUrl", v)} placeholder="https://github.com/…" />
        </Grid>
      </Card>

      <Card title="Case study" description="Each part becomes a section on the project page. Empty parts are skipped. Leave a blank line between paragraphs.">
        <TextArea label="Overview" rows={6} value={form.overview} onChange={(v) => set("overview", v)} />
        <TextArea label="The problem" rows={5} value={form.problem} onChange={(v) => set("problem", v)} />
        <TextArea label="The solution" rows={6} value={form.solution} onChange={(v) => set("solution", v)} />
        <LinesInput label="What I built" hint="One bullet per line." rows={5} value={form.points} onChange={(v) => set("points", v)} />
        <TextArea label="Takeaways" hint="What you learned, or what you would do differently." rows={4} value={form.learnings} onChange={(v) => set("learnings", v)} />
      </Card>

      <Card title="Key features">
        <Rows label="Features" hint="Shown as a grid of cards. Up to 9." items={form.features} onChange={(v) => set("features", v)} blank={{ title: "", description: "" }} max={9} addLabel="Add feature">
          {(item, update) => (
            <>
              <input aria-label="Feature title" placeholder="Title" value={item.title} onChange={(e) => update({ title: e.target.value })} className={inputClass} />
              <input aria-label="Feature description" placeholder="One-line description" value={item.description} onChange={(e) => update({ description: e.target.value })} className={inputClass} />
            </>
          )}
        </Rows>
      </Card>

      <Card title="Numbers and stack">
        <Rows label="Result numbers" hint="Big figures under the cover image. Up to 4." items={form.metrics} onChange={(v) => set("metrics", v)} blank={{ value: "", label: "" }} max={4} addLabel="Add number">
          {(item, update) => (
            <>
              <input aria-label="Value" placeholder="115×" value={item.value} onChange={(e) => update({ value: e.target.value })} className={inputClass} />
              <input aria-label="Label" placeholder="faster A* planner" value={item.label} onChange={(e) => update({ label: e.target.value })} className={inputClass} />
            </>
          )}
        </Rows>
        <TagsInput label="Tech stack" value={form.stack} onChange={(v) => set("stack", v)} />
      </Card>

      <Card title="Images">
        <FileInput label="Cover image" hint="Shown on the card and at the top of the page. Wide screenshots (16:9) work best." value={form.coverImage} onChange={(v) => set("coverImage", v)} />
        <Select label="Illustration when there is no cover image" value={form.preview} onChange={(v) => set("preview", v as ProjectInput["preview"])} options={previewOptions} />
        <Rows label="Gallery" hint="Screenshots shown on the project page. Up to 12." items={form.gallery} onChange={(v) => set("gallery", v)} blank={{ url: "", caption: "" }} max={12} addLabel="Add image by URL">
          {(item, update) => (
            <>
              <div className="flex gap-2">
                {item.url && (
                  // eslint-disable-next-line @next/next/no-img-element -- small admin preview
                  <img src={item.url} alt="" className="h-10 w-14 shrink-0 rounded-lg border border-line object-cover" />
                )}
                <input aria-label="Image URL" placeholder="Image URL" value={item.url} onChange={(e) => update({ url: e.target.value })} className={inputClass} />
              </div>
              <input aria-label="Caption" placeholder="Caption (optional)" value={item.caption} onChange={(e) => update({ caption: e.target.value })} className={inputClass} />
            </>
          )}
        </Rows>
        {form.gallery.length < 12 && (
          <label className="inline-flex cursor-pointer items-center gap-2 self-start rounded-xl border border-line px-3.5 py-2 text-sm font-semibold text-ink transition hover:border-brand hover:text-brand-strong">
            Upload screenshots
            <input type="file" hidden multiple accept="image/png,image/jpeg,image/webp,image/gif,image/avif" onChange={(e) => addGalleryFiles(e.target.files).then(() => (e.target.value = ""))} />
          </label>
        )}
      </Card>

      <Card title="Visibility">
        <Toggle label="Published" hint="Turn off to keep this project as a draft." checked={form.published} onChange={(v) => set("published", v)} />
        <Toggle label="Featured on the home page" hint="Other projects still appear on the All Projects page." checked={form.featured} onChange={(v) => set("featured", v)} />
      </Card>

      <SaveBar pending={pending} status={status} onSave={save} cancelHref="/admin/projects" viewHref={id && form.published ? `/projects/${form.slug}` : undefined} />
    </div>
  );
}
