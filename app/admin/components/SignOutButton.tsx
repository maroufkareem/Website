"use client";

import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const router = useRouter();

  async function handleSignOut() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleSignOut}
      className="mt-4 w-full rounded border border-[#C9A65A]/30 px-3 py-2 text-left text-sm font-semibold text-neutral-300 transition hover:bg-[#C9A65A]/10 hover:text-[#C9A65A]"
    >
      Sign out
    </button>
  );
}
