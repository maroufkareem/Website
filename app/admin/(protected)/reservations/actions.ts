"use server";

import { revalidatePath } from "next/cache";
import {
  deleteBookReservation,
  updateBookReservationStatus,
  type ReservationStatus,
} from "@/db/queries";

const STATUSES: ReservationStatus[] = ["new", "confirmed", "collected", "cancelled"];

export async function updateReservationStatusAction(formData: FormData) {
  const id = Number(formData.get("id"));
  const status = formData.get("status");
  if (!id || typeof status !== "string") return;
  if (!STATUSES.includes(status as ReservationStatus)) return;
  await updateBookReservationStatus(id, status as ReservationStatus);
  revalidatePath("/admin/reservations");
  revalidatePath("/admin");
}

export async function deleteReservationAction(formData: FormData) {
  const id = Number(formData.get("id"));
  if (!id) return;
  await deleteBookReservation(id);
  revalidatePath("/admin/reservations");
  revalidatePath("/admin");
}
