"use client";

import { useActionState } from "react";
import { changePasswordAction, type ChangePasswordResult } from "./actions";

const initialState: ChangePasswordResult = { ok: false };

export default function ChangePasswordPage() {
  const [state, formAction, pending] = useActionState(changePasswordAction, initialState);

  return (
    <div className="max-w-md space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-[#FCFAF6]">Change Password</h1>
        <p className="text-sm text-neutral-400">Update your admin login password.</p>
      </div>

      <form action={formAction} className="space-y-5 rounded-lg border border-[#C9A65A]/20 bg-[#111111] p-6">
        <label className="block">
          <span className="mb-1 block text-sm font-semibold text-neutral-300">Current password</span>
          <input
            type="password"
            name="currentPassword"
            required
            className="w-full rounded border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-neutral-100 outline-none focus:border-[#C9A65A]"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-semibold text-neutral-300">New password</span>
          <input
            type="password"
            name="newPassword"
            required
            minLength={8}
            className="w-full rounded border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-neutral-100 outline-none focus:border-[#C9A65A]"
          />
        </label>

        {state.error && <p className="text-sm text-red-400">{state.error}</p>}
        {state.ok && <p className="text-sm text-green-400">Password updated successfully.</p>}

        <button
          type="submit"
          disabled={pending}
          className="rounded bg-[#C9A65A] px-5 py-2 text-sm font-bold text-black transition hover:opacity-90 disabled:opacity-60"
        >
          {pending ? "Saving…" : "Update password"}
        </button>
      </form>
    </div>
  );
}
