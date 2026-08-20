"use client";

import { useFormStatus } from "react-dom";

export default function SaveButton({ label = "Save changes" }: { label?: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded bg-[#C9A65A] px-5 py-2 text-sm font-bold text-black transition hover:opacity-90 disabled:opacity-60"
    >
      {pending ? "Saving…" : label}
    </button>
  );
}
