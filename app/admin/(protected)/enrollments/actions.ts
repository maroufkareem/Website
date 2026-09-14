"use server";

import { revalidatePath } from "next/cache";
import { deleteEnrollment, updateEnrollmentStatus } from "@/db/queries";

export async function updateStatusAction(formData: FormData) {
  const id = Number(formData.get("id"));
  const status = formData.get("status");
  if (!id || (status !== "new" && status !== "contacted" && status !== "closed")) return;
  await updateEnrollmentStatus(id, status);
  revalidatePath("/admin/enrollments");
  revalidatePath("/admin");
}

export async function deleteEnrollmentAction(formData: FormData) {
  const id = Number(formData.get("id"));
  if (!id) return;
  await deleteEnrollment(id);
  revalidatePath("/admin/enrollments");
  revalidatePath("/admin");
}
