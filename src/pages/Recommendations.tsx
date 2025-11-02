import { useEffect, useState } from "react";
import { http, API_BASE } from "../lib/api";

type Creator = { id:string; name?:string; city?:string; category?:string; priceRange?:string };
type RecItem = { event: { title:string; city?:string; startDate?:string; fee?:number; applyLink?:string }, score:number };

export default function Recommendations(){
  const [creators,setCreators] = useState<Creator[]>([]);
  const [selected,setSelected] = useState<string>("");
  const [data,setData] = useState<RecItem[]>([]);
  const [loading,setLoading] = useState(false);
  const [err,setErr] = useState("");

  useEffect(()=>{ (async ()=>{
    try{
      const r = await http.get<Creator[]>("/api/v1/creators");
      setCreators(r.data || []);
      if(r.data?.[0]?.id){ setSelected(String(r.data[0].id)); }
    }catch(e:any){ setErr(e.message || "load failed"); }
  })(); },[]);

  useEffect(()=>{ if(!selected) return;
    setLoading(true); setErr(""); setData([]);
    (async ()=>{
      try{
        const r = await http.get<RecItem[]>(`/api/v1/recommendations/${encodeURIComponent(selected)}`);
        setData(r.data || []);
      }catch(e:any){ setErr(e.message || "fetch failed"); }
      finally{ setLoading(false); }
    })();
  },[selected]);

  return (
    <div className="container">
      <h3 className="title">Recommendations</h3>

      <div className="toolbar" style={{display:"flex",gap:12,alignItems:"center",marginBottom:12}}>
        <label style={{fontWeight:600}}>Creator</label>
        <select value={selected} onChange={e=>setSelected(e.target.value)} className="input">
          {creators.map(c=>(
            <option key={c.id} value={String(c.id)}>
              {(c.name||"Creator")} • {(c.city||"")} • {(c.category||"")}
            </option>
          ))}
        </select>
        <span style={{opacity:.7}}>API: {API_BASE}</span>
      </div>

      {loading && <div className="card">Loading…</div>}
      {err && <div className="card" style={{color:"crimson"}}>Error: {err}</div>}

      {!loading && !err && (
        <div style={{display:"grid",gap:12}}>
          {data.slice(0,10).map((r,idx)=>{
            const e = r.event || {} as any;
            const when = e.startDate ? new Date(e.startDate).toLocaleDateString() : "TBA";
            const fee  = (e.fee!=null) ? ("₹"+e.fee) : "Fee NA";
            return (
              <div key={idx} className="card">
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline"}}>
                  <h4 style={{margin:0}}>{e.title||"(Event)"}</h4>
                  <span style={{opacity:.7}}>score {r.score}</span>
                </div>
                <div style={{opacity:.8,marginTop:4}}>
                  {e.city||""} • {when} • {fee}
                </div>
                {e.applyLink && (
                  <a href={e.applyLink} target="_blank" rel="noreferrer" className="btn" style={{marginTop:8,display:"inline-block"}}>
                    Apply / Details
                  </a>
                )}
              </div>
            );
          })}
          {data.length===0 && <div className="card">No strong matches yet.</div>}
        </div>
      )}
    </div>
  );
}
function buildMailto(title?: string, email?: string) {
  if (!email) return null;
  const subject = encodeURIComponent(Stall Request: \);
  const body = encodeURIComponent('Hello,\n\nI would like to request a stall at your event. Please share the next steps.\n\nThanks,');
  return \mailto:\?subject=\&body=\\;
}
