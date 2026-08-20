"use server";

import { getSession } from "@/lib/session";
import { hashPassword, verifyPassword } from "@/lib/auth";
import { getAdminUserByEmail, updateAdminPasswordHash } from "@/db/queries";

export type ChangePasswordResult = { ok: boolean; error?: string };

export async function changePasswordAction(
  _prevState: ChangePasswordResult,
  formData: FormData
): Promise<ChangePasswordResult> {
  const session = await getSession();
  if (!session) return { ok: false, error: "Not signed in." };

  const currentPassword = (formData.get("currentPassword") as string | null) ?? "";
  const newPassword = (formData.get("newPassword") as string | null) ?? "";

  if (!currentPassword || !newPassword) {
    return { ok: false, error: "Both fields are required." };
  }
  if (newPassword.length < 8) {
    return { ok: false, error: "New password must be at least 8 characters." };
  }

  const admin = await getAdminUserByEmail(session.email);
  if (!admin) return { ok: false, error: "Admin account not found." };

  const valid = await verifyPassword(currentPassword, admin.passwordHash);
  if (!valid) return { ok: false, error: "Current password is incorrect." };

  const newHash = await hashPassword(newPassword);
  await updateAdminPasswordHash(admin.id, newHash);

  return { ok: true };
}
