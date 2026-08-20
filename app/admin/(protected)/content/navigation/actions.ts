"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createNavItem, deleteNavItem, updateNavItem } from "@/db/queries";

function str(formData: FormData, key: string): string {
  return (formData.get(key) as string | null)?.trim() ?? "";
}

export async function saveNavItemAction(formData: FormData) {
  const id = formData.get("id");
  const values = {
    label: str(formData, "label"),
    href: str(formData, "href"),
    sortOrder: Number(formData.get("sortOrder")) || 0,
  };

  if (id) {
    await updateNavItem(Number(id), values);
  } else {
    await createNavItem(values);
  }

  revalidatePath("/");
  revalidatePath("/admin/content/navigation");
  redirect("/admin/content/navigation");
}

export async function deleteNavItemAction(formData: FormData) {
  const id = Number(formData.get("id"));
  if (!id) return;
  await deleteNavItem(id);
  revalidatePath("/");
  revalidatePath("/admin/content/navigation");
}
