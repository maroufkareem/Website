import { getPageViewStats } from "@/db/queries";

export const dynamic = "force-dynamic";

export default async function AnalyticsPage() {
  const stats = await getPageViewStats(30).catch(() => []);
  const total = stats.reduce((sum, row) => sum + row.count, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-[#FCFAF6]">Analytics</h1>
        <p className="text-sm text-neutral-400">Page views over the last 30 days ({total} total).</p>
      </div>

      <div className="overflow-x-auto rounded-lg border border-[#C9A65A]/20 bg-[#111111]">
        <table className="w-full min-w-[300px] text-left text-sm">
          <thead>
            <tr className="border-b border-neutral-800 text-xs uppercase tracking-wide text-neutral-500">
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Views</th>
            </tr>
          </thead>
          <tbody>
            {stats.length === 0 && (
              <tr>
                <td colSpan={2} className="px-4 py-8 text-center text-neutral-500">
                  No page view data yet.
                </td>
              </tr>
            )}
            {stats.map((row) => (
              <tr key={row.date} className="border-b border-neutral-900">
                <td className="px-4 py-3 text-neutral-100">{row.date}</td>
                <td className="px-4 py-3 text-neutral-400">{row.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
