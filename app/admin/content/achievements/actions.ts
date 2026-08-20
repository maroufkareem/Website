"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAchievement, deleteAchievement, updateAchievement } from "@/db/queries";

function str(formData: FormData, key: string): string {
  return (formData.get(key) as string | null)?.trim() ?? "";
}

export async function saveAchievementAction(formData: FormData) {
  const id = formData.get("id");
  const values = {
    title: str(formData, "title"),
    body: str(formData, "body"),
    sortOrder: Number(formData.get("sortOrder")) || 0,
    published: formData.get("published") === "on",
  };

  if (id) {
    await updateAchievement(Number(id), values);
  } else {
    await createAchievement(values);
  }

  revalidatePath("/");
  revalidatePath("/admin/content/achievements");
  redirect("/admin/content/achievements");
}

export async function deleteAchievementAction(formData: FormData) {
  const id = Number(formData.get("id"));
  if (!id) return;
  await deleteAchievement(id);
  revalidatePath("/");
  revalidatePath("/admin/content/achievements");
}
