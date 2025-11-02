import axios from "axios";

type Creator = { id: string; name?: string; city?: string; category?: string; priceRange?: string };
type RecItem = { event: { title: string; city?: string; startDate?: string; fee?: number; applyLink?: string }; score: number };

export async function buildDailySummary(BASE: string, matchResult?: any) {
  try {
    const creatorsRes = await axios.get(`${BASE}/api/v1/creators`);
    const creators: Creator[] = creatorsRes.data || [];

    const lines: string[] = [];
    lines.push("CreativeApp — Daily Match Summary");
    lines.push(`Date: ${new Date().toLocaleString()}`);
    if (matchResult) {
      try { lines.push(`Matches run result: ${JSON.stringify(matchResult)}`); } catch {}
    }
    lines.push("");

    for (const c of creators) {
      const recsRes = await axios.get(`${BASE}/api/v1/recommendations/${encodeURIComponent(c.id)}`);
      const recs: RecItem[] = (recsRes.data || []).slice(0, 3);

      lines.push(`Creator: ${c.name ?? c.id} — ${c.city ?? ""} — ${c.category ?? ""} — ${c.priceRange ?? ""}`);
      if (!recs.length) {
        lines.push("   No strong matches today");
      } else {
        for (const r of recs) {
          const e = r.event || {};
          const when = e.startDate ? new Date(e.startDate).toLocaleDateString() : "TBA";
          const fee = (e.fee != null) ? `₹${e.fee}` : "Fee NA";
          lines.push(`   ${e.title} — ${e.city ?? ""} — ${when} — ${fee} — score ${r.score}`);
          if (e.applyLink) lines.push(`     apply: ${e.applyLink}`);
        }
      }
      lines.push("");
    }

    return lines.join("\n");
  } catch (err: any) {
    return `Summary build failed: ${err?.message || err}`;
  }
}
