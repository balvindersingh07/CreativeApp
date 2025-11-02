import { Router } from "express";
import axios from "axios";

const r = Router();
const BASE = process.env.SELF_BASE || `http://localhost:${process.env.PORT || 8080}`;

async function safeGet<T=any>(url:string, def:T):Promise<T>{
  try{ const res=await axios.get(url,{timeout:5000}); return (res.data as T) ?? def; }
  catch{ return def; }
}

r.get("/summary", async (_req, res) => {
  const creators = await safeGet<any[]>(`${BASE}/api/v1/creators`, []);
  const events   = await safeGet<any[]>(`${BASE}/api/v1/events`, []);
  const matches  = await safeGet<any[]>(`${BASE}/api/v1/matches`, []);
  const apps     = await safeGet<any[]>(`${BASE}/api/v1/applications`, []);

  const cityMap: Record<string, number> = {};
  for (const c of creators) {
    const city = String(c?.city ?? "Unknown");
    cityMap[city] = (cityMap[city] || 0) + 1;
  }
  const creatorsByCity = Object.entries(cityMap)
    .map(([city,count]) => ({ city, _count: { _all: count }}))
    .sort((a,b)=> b._count._all - a._count._all);

  // ✅ Fixed logic for eventId
  const idOfEvent = (o:any) => o?.eventId ?? o?.event_id ?? o?.eventID ?? o?.event_id_fk ?? o?.id;
  const matchCount: Record<string, number> = {};
  for (const m of matches) {
    const eid = String(idOfEvent(m) || "");
    if (!eid) continue;
    matchCount[eid] = (matchCount[eid] || 0) + 1;
  }
  const topEvents = Object.entries(matchCount)
    .map(([event_id, cnt]) => {
      const ev = events.find((e:any) => String(idOfEvent(e) ?? e?.id) === event_id);
      return { event_id, title: ev?.title ?? ev?.name ?? "(unknown)", _count: { _all: cnt }};
    })
    .sort((a,b)=> b._count._all - a._count._all)
    .slice(0,5);

  res.json({
    creators: creators.length,
    events: events.length,
    matches: matches.length,
    applications: apps.length,
    creatorsByCity,
    topEvents
  });
});

export default r;
