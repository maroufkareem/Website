"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createProgram, deleteProgram, updateProgram } from "@/db/queries";

function str(formData: FormData, key: string): string {
  return (formData.get(key) as string | null)?.trim() ?? "";
}

export async function saveProgramAction(formData: FormData) {
  const id = formData.get("id");
  const values = {
    label: str(formData, "label"),
    title: str(formData, "title"),
    price: str(formData, "price"),
    meta: str(formData, "meta"),
    date: str(formData, "date"),
    body: str(formData, "body"),
    sortOrder: Number(formData.get("sortOrder")) || 0,
    published: formData.get("published") === "on",
  };

  if (id) {
    await updateProgram(Number(id), values);
  } else {
    await createProgram(values);
  }

  revalidatePath("/");
  revalidatePath("/admin/content/programs");
  redirect("/admin/content/programs");
}

export async function deleteProgramAction(formData: FormData) {
  const id = Number(formData.get("id"));
  if (!id) return;
  await deleteProgram(id);
  revalidatePath("/");
  revalidatePath("/admin/content/programs");
}
