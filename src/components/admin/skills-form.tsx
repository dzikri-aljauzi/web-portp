"use client";

import { useState } from "react";
import { saveSkills } from "@/app/admin/actions";
import type { SkillGroup } from "@/lib/types";
import { Card, Rows, SaveBar, inputClass, useSave } from "./fields";

export function SkillsForm({ initial }: { initial: SkillGroup[] }) {
  const [groups, setGroups] = useState(initial);
  const { pending, status, save } = useSave(() => saveSkills(groups));

  return (
    <div className="flex flex-col gap-6">
      <Card title="Skill groups" description="Each group is one row in the Tech Stack section. Known technologies get their logo automatically.">
        <Rows label="Groups" items={groups} onChange={setGroups} blank={{ title: "", caption: "", items: [] }} max={8} addLabel="Add group">
          {(group, update) => (
            <>
              <input aria-label="Group title" placeholder="Title, e.g. Frontend" value={group.title} onChange={(e) => update({ title: e.target.value })} className={inputClass} />
              <input aria-label="Caption" placeholder="Short caption" value={group.caption} onChange={(e) => update({ caption: e.target.value })} className={inputClass} />
              <input
                aria-label="Skills"
                placeholder="Skills, separated by commas"
                value={group.items.join(",")}
                onChange={(e) => update({ items: e.target.value.split(",") })}
                className={`${inputClass} sm:col-span-2`}
              />
            </>
          )}
        </Rows>
      </Card>
      <SaveBar pending={pending} status={status} onSave={save} viewHref="/#stack" />
    </div>
  );
}
