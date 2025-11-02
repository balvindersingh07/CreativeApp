import React from "react";
import { useEffect, useState } from "react";
import { getAnalyticsSummary } from "../lib/api";

type CountMap = Record<string, number>;

interface AnalyticsSummary {
  counts: CountMap;                // e.g., { creators: 12, events: 20, matches: 48 }
  creatorsByCity: { city: string; count: number }[];
  topEvents: { title: string; score?: number; id?: string }[];
}

export default function Analytics() {
  const [data, setData] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await getAnalyticsSummary();
        setData(res);
      } catch (e: any) {
        setError(e?.message ?? "Failed to fetch analytics");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className="p-6">Loading analytics</div>;
  if (error)   return <div className="p-6 text-red-600">Error: {error}</div>;
  if (!data)   return <div className="p-6">No analytics available.</div>;

  const counts = data.counts || {};
  const kpis = [
    { label: "Creators", value: counts["creators"] ?? 0 },
    { label: "Events",   value: counts["events"] ?? 0 },
    { label: "Matches",  value: counts["matches"] ?? 0 },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Analytics</h1>

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {kpis.map((k) => (
          <div key={k.label} className="rounded-2xl shadow p-4 bg-white dark:bg-zinc-900">
            <div className="text-sm text-zinc-500">{k.label}</div>
            <div className="text-3xl font-bold mt-1">{k.value}</div>
          </div>
        ))}
      </div>

      {/* Creators by City */}
      <div className="rounded-2xl shadow bg-white dark:bg-zinc-900">
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
          <h2 className="text-lg font-medium">Creators by City</h2>
        </div>
        <div className="p-4 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-left text-zinc-500">
              <tr>
                <th className="py-2 pr-4">City</th>
                <th className="py-2">Count</th>
              </tr>
            </thead>
            <tbody>
              {data.creatorsByCity?.length ? (
                data.creatorsByCity.map((row, i) => (
                  <tr key={i} className="border-t border-zinc-100 dark:border-zinc-800">
                    <td className="py-2 pr-4">{row.city || "(unknown)"}</td>
                    <td className="py-2">{row.count ?? 0}</td>
                  </tr>
                ))
              ) : (
                <tr><td className="py-3" colSpan={2}>No data</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Events */}
      <div className="rounded-2xl shadow bg-white dark:bg-zinc-900">
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
          <h2 className="text-lg font-medium">Top Events</h2>
        </div>
        <div className="p-4 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-left text-zinc-500">
              <tr>
                <th className="py-2 pr-4">Title</th>
                <th className="py-2 pr-4">Score</th>
                <th className="py-2">Event ID</th>
              </tr>
            </thead>
            <tbody>
              {data.topEvents?.length ? (
                data.topEvents.map((row, i) => (
                  <tr key={i} className="border-t border-zinc-100 dark:border-zinc-800">
                    <td className="py-2 pr-4">{row.title || "(unknown)"}</td>
                    <td className="py-2 pr-4">{typeof row.score === "number" ? row.score.toFixed(2) : "—"}</td>
                    <td className="py-2">{row.id || "—"}</td>
                  </tr>
                ))
              ) : (
                <tr><td className="py-3" colSpan={3}>No data</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
