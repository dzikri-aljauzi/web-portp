"use client";

import { useRouter } from "next/navigation";
import { Fragment, type ReactNode } from "react";

/**
 * Next.js keeps a page's client state alive when you navigate away and come
 * back. For admin editors that would show stale drafts (for example the
 * previous project inside "New project"), so editors start fresh on every
 * new navigation. Browser back/forward still restores an unsaved draft.
 */
export function Fresh({ children }: { children: ReactNode }) {
  const { bfcacheId } = useRouter();
  return <Fragment key={bfcacheId}>{children}</Fragment>;
}
