"use server";

import { revalidatePath } from "next/cache";
import { deleteEnquiry, updateEnquiryStatus } from "@/db/queries";

export async function updateStatusAction(formData: FormData) {
  const id = Number(formData.get("id"));
  const status = formData.get("status");
  if (!id || (status !== "new" && status !== "contacted" && status !== "closed")) return;
  await updateEnquiryStatus(id, status);
  revalidatePath("/admin/enquiries");
  revalidatePath("/admin");
}

export async function deleteEnquiryAction(formData: FormData) {
  const id = Number(formData.get("id"));
  if (!id) return;
  await deleteEnquiry(id);
  revalidatePath("/admin/enquiries");
  revalidatePath("/admin");
}
