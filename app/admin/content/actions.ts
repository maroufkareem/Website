"use server";

import { revalidatePath } from "next/cache";
import { updateSiteSettings } from "@/db/queries";

function str(formData: FormData, key: string): string {
  return (formData.get(key) as string | null)?.trim() ?? "";
}

function jsonArray(formData: FormData, key: string): string[] {
  const raw = str(formData, key);
  if (!raw) return [];
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export async function updateHeroAction(formData: FormData) {
  const stats = [0, 1, 2, 3].map((i) => ({
    number: str(formData, `stat_${i}_number`),
    label: str(formData, `stat_${i}_label`),
    sub: str(formData, `stat_${i}_sub`),
  }));

  await updateSiteSettings({
    heroEyebrow: str(formData, "heroEyebrow"),
    heroDoctorName: str(formData, "heroDoctorName"),
    heroDoctorRole: str(formData, "heroDoctorRole"),
    heroHeadline: str(formData, "heroHeadline"),
    heroCopy: str(formData, "heroCopy"),
    heroQuote: str(formData, "heroQuote"),
    heroBadges: jsonArray(formData, "heroBadges"),
    heroImageUrl: str(formData, "heroImageUrl"),
    stats,
  });
  revalidatePath("/");
  revalidatePath("/admin/content/hero");
}

export async function updateAboutAction(formData: FormData) {
  await updateSiteSettings({
    aboutEyebrow: str(formData, "aboutEyebrow"),
    aboutHeading: str(formData, "aboutHeading"),
    aboutParagraph1: str(formData, "aboutParagraph1"),
    aboutParagraph2: str(formData, "aboutParagraph2"),
    aboutCredentials: jsonArray(formData, "aboutCredentials"),
    aboutPortraitUrl: str(formData, "aboutPortraitUrl"),
  });
  revalidatePath("/");
  revalidatePath("/admin/content/about");
}

export async function updateMethodAction(formData: FormData) {
  const methodSteps = [0, 1, 2, 3].map((i) => ({
    number: str(formData, `step_${i}_number`),
    title: str(formData, `step_${i}_title`),
    body: str(formData, `step_${i}_body`),
  }));
  await updateSiteSettings({ methodSteps });
  revalidatePath("/");
  revalidatePath("/admin/content/method");
}

export async function updateFeaturedAction(formData: FormData) {
  await updateSiteSettings({
    featuredEyebrow: str(formData, "featuredEyebrow"),
    featuredHeading: str(formData, "featuredHeading"),
    featuredBody: str(formData, "featuredBody"),
    featuredChecklist: jsonArray(formData, "featuredChecklist"),
    featuredImage1Url: str(formData, "featuredImage1Url"),
    featuredImage2Url: str(formData, "featuredImage2Url"),
  });
  revalidatePath("/");
  revalidatePath("/admin/content/featured");
}

export async function updateContactAction(formData: FormData) {
  await updateSiteSettings({
    contactEmail: str(formData, "contactEmail"),
    contactPhone: str(formData, "contactPhone"),
    contactWhatsapp: str(formData, "contactWhatsapp"),
    socialLinks: {
      instagram: str(formData, "instagram"),
      linkedin: str(formData, "linkedin"),
      tiktok: str(formData, "tiktok"),
      whatsapp: str(formData, "socialWhatsapp"),
    },
    footerBlurb: str(formData, "footerBlurb"),
  });
  revalidatePath("/");
  revalidatePath("/admin/content/contact");
}
