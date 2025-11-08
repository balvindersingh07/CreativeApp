import React, { useEffect, useState } from "react";

type Summary = {
  counts: { creators: number; events: number; matches: number };
  creatorsByCity: { city: string; count: number }[];
  topEvents: { title: string; city?: string; date?: string; matches?: number }[];
};

export default function Analytics() {
  const [data, setData] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const base = import.meta.env.VITE_API_BASE || "http://localhost:8081";
        const res = await fetch(`${base}/api/v1/analytics/summary`);
        if (!res.ok) throw new Error(await res.text());
        const json = await res.json();
        setData(json);
      } catch (e:any) {
        setErr(e?.message || "Failed to load analytics");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 data-testid="pg-analytics" className="text-2xl font-semibold mb-6">
        Analytics
      </h1>

      {loading && <div className="opacity-70">Loading…</div>}
      {err && <div className="text-red-600">{err}</div>}
      {!loading && !err && data && (
        <div className="space-y-8">
          {/* KPI cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-2xl shadow p-4 bg-white/80 dark:bg-zinc-900">
              <div className="text-sm opacity-70">Creators</div>
              <div className="text-3xl font-bold">{data.counts.creators ?? 0}</div>
            </div>
            <div className="rounded-2xl shadow p-4 bg-white/80 dark:bg-zinc-900">
              <div className="text-sm opacity-70">Events</div>
              <div className="text-3xl font-bold">{data.counts.events ?? 0}</div>
            </div>
            <div className="rounded-2xl shadow p-4 bg-white/80 dark:bg-zinc-900">
              <div className="text-sm opacity-70">Matches</div>
              <div className="text-3xl font-bold">{data.counts.matches ?? 0}</div>
            </div>
          </div>

          {/* Creators by City */}
          <div className="rounded-2xl shadow p-4 bg-white/80 dark:bg-zinc-900">
            <div className="text-lg font-semibold mb-2">Creators by City</div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left opacity-70">
                  <tr><th className="py-2">City</th><th className="py-2">Count</th></tr>
                </thead>
                <tbody>
                  {data.creatorsByCity?.map((r, i) => (
                    <tr key={i} className="border-t border-zinc-200/60">
                      <td className="py-2">{r.city || "—"}</td>
                      <td className="py-2">{r.count ?? 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Events */}
          <div className="rounded-2xl shadow p-4 bg-white/80 dark:bg-zinc-900">
            <div className="text-lg font-semibold mb-2">Top Events</div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left opacity-70">
                  <tr>
                    <th className="py-2">Title</th>
                    <th className="py-2">City</th>
                    <th className="py-2">Date</th>
                    <th className="py-2">Matches</th>
                  </tr>
                </thead>
                <tbody>
                  {data.topEvents?.map((e, i) => (
                    <tr key={i} className="border-t border-zinc-200/60">
                      <td className="py-2">{e.title || "—"}</td>
                      <td className="py-2">{e.city || "—"}</td>
                      <td className="py-2">{e.date || "—"}</td>
                      <td className="py-2">{e.matches ?? "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
