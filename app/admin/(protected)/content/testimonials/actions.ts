"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createTestimonial, deleteTestimonial, updateTestimonial } from "@/db/queries";

function str(formData: FormData, key: string): string {
  return (formData.get(key) as string | null)?.trim() ?? "";
}

export async function saveTestimonialAction(formData: FormData) {
  const id = formData.get("id");
  const values = {
    body: str(formData, "body"),
    author: str(formData, "author"),
    sortOrder: Number(formData.get("sortOrder")) || 0,
    published: formData.get("published") === "on",
  };

  if (id) {
    await updateTestimonial(Number(id), values);
  } else {
    await createTestimonial(values);
  }

  revalidatePath("/");
  revalidatePath("/admin/content/testimonials");
  redirect("/admin/content/testimonials");
}

export async function deleteTestimonialAction(formData: FormData) {
  const id = Number(formData.get("id"));
  if (!id) return;
  await deleteTestimonial(id);
  revalidatePath("/");
  revalidatePath("/admin/content/testimonials");
}
