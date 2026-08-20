import Link from "next/link";
import { getNavItems } from "@/db/queries";
import { deleteNavItemAction } from "./actions";

export const dynamic = "force-dynamic";

export default async function NavigationListPage() {
  const items = await getNavItems().catch(() => []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#FCFAF6]">Navigation</h1>
          <p className="text-sm text-neutral-400">Manage header/footer navigation links.</p>
        </div>
        <Link
          href="/admin/content/navigation/new"
          className="rounded bg-[#C9A65A] px-4 py-2 text-sm font-bold text-black hover:opacity-90"
        >
          + Add Link
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg border border-[#C9A65A]/20 bg-[#111111]">
        <table className="w-full min-w-[500px] text-left text-sm">
          <thead>
            <tr className="border-b border-neutral-800 text-xs uppercase tracking-wide text-neutral-500">
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3">Label</th>
              <th className="px-4 py-3">Href</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-neutral-500">
                  No navigation items yet.
                </td>
              </tr>
            )}
            {items.map((item) => (
              <tr key={item.id} className="border-b border-neutral-900">
                <td className="px-4 py-3 text-neutral-400">{item.sortOrder}</td>
                <td className="px-4 py-3 font-semibold text-neutral-100">{item.label}</td>
                <td className="px-4 py-3 text-neutral-400">{item.href}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/admin/content/navigation/${item.id}/edit`}
                      className="text-xs font-semibold text-[#C9A65A] hover:underline"
                    >
                      Edit
                    </Link>
                    <form action={deleteNavItemAction}>
                      <input type="hidden" name="id" value={item.id} />
                      <button type="submit" className="text-xs font-semibold text-red-400 hover:underline">
                        Delete
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
