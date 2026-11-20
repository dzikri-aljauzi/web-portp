"use client";

import { Loader2 } from "lucide-react";
import { useActionState } from "react";
import { login, type LoginState } from "@/app/admin/actions";
import { inputClass } from "./fields";

export function LoginForm() {
  const [state, action, pending] = useActionState<LoginState, FormData>(login, {});
  return (
    <form action={action} className="mt-6 flex flex-col gap-4">
      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-semibold text-ink">Password</span>
        <input name="password" type="password" required autoFocus autoComplete="current-password" className={inputClass} />
      </label>
      {state.error && (
        <p role="alert" className="text-sm font-medium text-red-500">
          {state.error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-strong py-3 text-sm font-semibold text-on-brand transition disabled:opacity-60"
      >
        {pending && <Loader2 size={15} className="animate-spin" />}
        Sign in
      </button>
    </form>
  );
}
