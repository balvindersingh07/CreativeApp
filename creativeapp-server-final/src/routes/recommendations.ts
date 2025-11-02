import { Router } from "express";
import axios from "axios";

const r = Router();
const BASE = process.env.SELF_BASE || "http://localhost:8080";

const toLower = (s?: string) => (s || "").toLowerCase();
const get = (o:any, ...keys:string[]) => { for (const k of keys) if (o && o[k] != null) return o[k]; };
const parseTags = (val:any): string[] => {
  if (!val) return [];
  if (Array.isArray(val)) return val.map(String);
  if (typeof val === "string") {
    // try JSON array string first, else split by commas
    try { const arr = JSON.parse(val); if (Array.isArray(arr)) return arr.map(String); } catch {}
    return val.split(",").map(s=>s.trim()).filter(Boolean);
  }
  return [];
};

r.get("/:creatorId", async (req, res) => {
  try {
    const creatorId = String(req.params.creatorId).trim();
    const [creatorsRes, eventsRes] = await Promise.all([
      axios.get(`${BASE}/api/v1/creators`),
      axios.get(`${BASE}/api/v1/events`),
    ]);

    const creators: any[] = creatorsRes.data || [];
    const events: any[] = eventsRes.data || [];

    const creator = creators.find(c => String(get(c,"id")) === creatorId);
    if (!creator) return res.status(404).json({ error: "creator_not_found" });

    // ----- normalize creator -----
    const cCity       = toLower(get(creator,"city"));
    const cCategory   = toLower(get(creator,"category"));
    const cTags       = parseTags(get(creator,"tags","tagsJson","imagesJson")); // imagesJson fallback ignored in scoring normally
    const cPriceRange = String(get(creator,"priceRange","price_range") || "");
    const cSet        = new Set([cCategory, ...cTags.map(toLower)].filter(Boolean));

    // rupee-aware banding
    const priceBand = (s:string) => {
      const x = toLower(s);
      if (x.includes("low") || x.includes("budget") || x.includes("0-")) return 1;
      if (x.includes("high") || x.includes("premium")) return 3;
      const nums = (x.match(/\d+/g)||[]).map(n=>parseInt(n,10));
      if (nums.length) {
        const avg = nums.reduce((a,b)=>a+b,0)/nums.length;
        if (avg <= 800) return 1; if (avg <= 2500) return 2; return 3;
      }
      return 2;
    };
    const band = priceBand(cPriceRange);

    // ----- score events -----
    const scored = events.map((e:any) => {
      const eCity  = toLower(get(e,"city"));
      const eTitle = toLower(get(e,"title","name"));
      const eTags  = parseTags(get(e,"tags","tagsJson"));
      const eSet   = new Set([eTitle, ...eTags.map(toLower)].filter(Boolean));
      const feeVal = get(e,"fee","fees","stallFee","price","cost");
      const eFee: number|null = typeof feeVal === "number" ? feeVal : null;

      let score = 0;

      // category/tag overlap (now works if tagsJson is string)
      const catHit = [...cSet].some(t => [...eSet].some(v => v.includes(t)));
      if (catHit) score += 50;

      // same city bonus
      if (cCity && eCity && cCity === eCity) score += 15;

      // fee vs price band
      if (eFee == null) score += 7;
      else {
        if (band === 1 && eFee <= 500) score += 15;
        else if (band === 2 && eFee <= 1500) score += 12;
        else if (band === 3 && eFee <= 4000) score += 10;
      }

      return { event: e, score };
    })
    .sort((a,b)=>b.score-a.score)
    .slice(0,10);

    res.json(scored);
  } catch (err:any) {
    console.error("recommendations error", err?.message || err);
    res.status(500).json({ error: "recommendations_failed" });
  }
});

export default r;
