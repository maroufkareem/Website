"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createBook, deleteBook, updateBook } from "@/db/queries";

function str(formData: FormData, key: string): string {
  return (formData.get(key) as string | null)?.trim() ?? "";
}

export async function saveBookAction(formData: FormData) {
  const id = formData.get("id");
  const values = {
    imageUrl: str(formData, "imageUrl"),
    label: str(formData, "label"),
    title: str(formData, "title"),
    body: str(formData, "body"),
    sortOrder: Number(formData.get("sortOrder")) || 0,
    published: formData.get("published") === "on",
  };

  if (id) {
    await updateBook(Number(id), values);
  } else {
    await createBook(values);
  }

  revalidatePath("/");
  revalidatePath("/admin/content/books");
  redirect("/admin/content/books");
}

export async function deleteBookAction(formData: FormData) {
  const id = Number(formData.get("id"));
  if (!id) return;
  await deleteBook(id);
  revalidatePath("/");
  revalidatePath("/admin/content/books");
}
