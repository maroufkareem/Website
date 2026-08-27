"use client";

import { useRef } from "react";
import { updateReservationStatusAction } from "./actions";

const STATUSES = ["new", "confirmed", "collected", "cancelled"] as const;

export default function StatusSelect({ id, status }: { id: number; status: string }) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form action={updateReservationStatusAction} ref={formRef}>
      <input type="hidden" name="id" value={id} />
      <select
        name="status"
        defaultValue={status}
        onChange={() => formRef.current?.requestSubmit()}
        className="rounded border border-neutral-700 bg-neutral-900 px-2 py-1 text-xs text-neutral-100"
      >
        {STATUSES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
    </form>
  );
}
