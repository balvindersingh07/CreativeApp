import React, { useEffect, useMemo, useState } from "react";
import { getEvents, EventItem } from "../lib/api";

export default function Events() {
  const [all, setAll] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // filters
  const [q, setQ] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const list = await getEvents();
        setAll(list);
      } catch (e: any) {
        setError(e?.message ?? "Failed to fetch events");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const cities = useMemo(() => Array.from(new Set(all.map(e => (e.city || "").trim()).filter(Boolean))).sort(), [all]);
  const categories = useMemo(() => Array.from(new Set(all.map(e => (e.category || "").trim()).filter(Boolean))).sort(), [all]);

  const filtered = useMemo(() => {
    return all.filter(e => {
      const txt = (e.title || "").toLowerCase() + " " + (e.city || "").toLowerCase() + " " + (e.category || "").toLowerCase();
      if (q && !txt.includes(q.toLowerCase())) return false;
      if (city && (e.city || "") !== city) return false;
      if (category && (e.category || "") !== category) return false;

      const dt = e.date ? new Date(e.date) : null;
      if (from && dt && dt < new Date(from)) return false;
      if (to && dt && dt > new Date(to + "T23:59:59")) return false;

      return true;
    });
  }, [all, q, city, category, from, to]);

  if (loading) return <div className="p-6">Loading events</div>;
  if (error)   return <div className="p-6 text-red-600">Error: {error}</div>;

  return (
    <div className="p-6 space-y-6">
      <h1 data-testid="pg-events" className="text-2xl font-semibold">Events</h1>
  <div className="flex flex-wrap gap-2 mb-4">
    <input className="border rounded-xl px-3 py-2" placeholder="Filter by city" value={qCity} onChange={e=>setQCity(e.target.value)} />
    <input className="border rounded-xl px-3 py-2" placeholder="Filter by category" value={qCat} onChange={e=>setQCat(e.target.value)} />
    <input className="border rounded-xl px-3 py-2" type="date" value={qDate} onChange={e=>setQDate(e.target.value)} />
    {(qCity||qCat||qDate) && <button className="px-3 py-2 rounded-xl border" onClick={()=>{setQCity('');setQCat('');setQDate('')}}>Clear</button>}
  </div>

      {/* Filters toolbar (brand-safe Tailwind utilities only) */}
      <div className="rounded-2xl shadow bg-white dark:bg-zinc-900 p-4 grid gap-3 md:grid-cols-5">
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search title/city/category"
               className="border rounded-lg px-3 py-2 md:col-span-2" />

        <select value={city} onChange={e=>setCity(e.target.value)} className="border rounded-lg px-3 py-2">
          <option value="">All Cities</option>
          {cities.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        <select value={category} onChange={e=>setCategory(e.target.value)} className="border rounded-lg px-3 py-2">
          <option value="">All Categories</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        <div className="flex gap-2">
          <input type="date" value={from} onChange={e=>setFrom(e.target.value)} className="border rounded-lg px-3 py-2 w-full" />
          <input type="date" value={to} onChange={e=>setTo(e.target.value)} className="border rounded-lg px-3 py-2 w-full" />
        </div>
      </div>

      {/* Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((e, i) => (
          <div key={(e.id || i) + ""} className="rounded-2xl shadow bg-white dark:bg-zinc-900 p-4">
            <div className="text-xs text-zinc-500">{e.category || "—"}</div>
            <div className="text-lg font-semibold">{e.title || "(Untitled Event)"}</div>
            <div className="text-sm text-zinc-600 mt-1">{e.city || "(city unknown)"}  {e.date ? new Date(e.date).toLocaleDateString() : "date tbd"}</div>
            {e.fee !== undefined && <div className="text-sm mt-1">Fee: {e.fee}</div>}
            {e.applyLink &&
              <a className="inline-block mt-3 px-3 py-2 rounded-xl shadow hover:opacity-90"
                 href={e.applyLink} target="_blank" rel="noreferrer">Apply</a>}
          </div>
        ))}
      </div>

      {!filtered.length && <div className="text-sm text-zinc-500">No events match your filters.</div>}
    </div>
  );
}

