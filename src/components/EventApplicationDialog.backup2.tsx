import { useEffect, useRef } from "react";

type Props = { open: boolean; onClose: () => void };

export default function EventApplicationDialog({ open, onClose }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);

  // close on ESC
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      aria-modal="true"
      role="dialog"
      aria-labelledby="apply-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose(); // click outside to close
      }}
      style={overlay}
    >
      <div ref={panelRef} style={panel}>
        {/* Top bar with BACK + Title + Close */}
        <div style={topbar}>
          <button onClick={onClose} style={backBtn} aria-label="Back to main page">
             Back
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={logo}>T</div>
            <h2 id="apply-title" style={title}>Apply to Event</h2>
          </div>

          <button onClick={onClose} style={closeBtn} aria-label="Close dialog"></button>
        </div>

        {/* Body */}
        <div style={body}>
          {/* your existing form fields — keep ids/placeholders same */}
          <div style={grid2}>
            <div>
              <label style={label}>Your Name *</label>
              <input style={input} placeholder="Sarah Martinez" />
            </div>
            <div>
              <label style={label}>Email *</label>
              <input style={input} placeholder="your@email.com" />
            </div>
            <div>
              <label style={label}>Phone Number</label>
              <input style={input} placeholder="(555) 123-4567" />
            </div>
            <div>
              <label style={label}>Business Name *</label>
              <input style={input} placeholder="Your Creative Business" />
            </div>
            <div>
              <label style={label}>Preferred Stall Size</label>
              <select style={select}>
                <option>Select stall size</option>
                <option>Small (6x6)</option>
                <option>Medium (8x8)</option>
                <option>Large (10x10)</option>
              </select>
            </div>
            <div>
              <label style={label}>Category</label>
              <select style={select}>
                <option>Select category</option>
                <option>Pottery</option>
                <option>Home Decor</option>
                <option>Textiles</option>
              </select>
            </div>
          </div>

          <div>
            <label style={label}>Tell us about your products</label>
            <textarea style={textarea} placeholder="Describe what you'll be selling at this event..." />
          </div>
        </div>

        {/* Footer */}
        <div style={footer}>
          <small style={{ opacity:.75 }}>We'll review your application and reach out via email.</small>
          <div style={{ display:"flex", gap:10 }}>
            <button onClick={onClose} style={backGhost}>Back</button>
            <button style={cta}>Apply</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------- styles (inline to avoid global css) ------- */
const TERRACOTTA = "#D4745E";
const overlay: React.CSSProperties = {
  position:"fixed", inset:0, background:"rgba(0,0,0,.45)", display:"grid",
  placeItems:"center", zIndex:9999, padding:16
};
const panel: React.CSSProperties = {
  width:"min(980px, 96vw)", maxHeight:"92vh", overflow:"auto",
  background:"#fff", borderRadius:16, boxShadow:"0 30px 80px rgba(0,0,0,.35)"
};
const topbar: React.CSSProperties = {
  display:"grid", gridTemplateColumns:"120px 1fr 44px", alignItems:"center",
  padding:"16px 20px", position:"sticky", top:0,
  background:"linear-gradient(180deg,#fff, #fff0)", borderTopLeftRadius:16, borderTopRightRadius:16
};
const backBtn: React.CSSProperties = {
  justifySelf:"start", border:"1px solid #eee", background:"#fff", color:"#374151",
  padding:"8px 12px", borderRadius:10, cursor:"pointer", fontWeight:600
};
const closeBtn: React.CSSProperties = {
  width:36, height:36, borderRadius:10, border:"1px solid #eee",
  background:"#fff", cursor:"pointer"
};
const logo: React.CSSProperties = {
  width:28, height:28, borderRadius:8, background:TERRACOTTA, color:"#fff",
  display:"grid", placeItems:"center", fontWeight:800
};
const title: React.CSSProperties = { fontSize:22, margin:0 };
const body: React.CSSProperties = { padding:"12px 20px 4px", display:"grid", gap:16 };
const grid2: React.CSSProperties = { display:"grid", gap:16, gridTemplateColumns:"1fr 1fr" };
const label: React.CSSProperties = { fontSize:14, marginBottom:6, display:"block", color:"#4b5563" };
const input: React.CSSProperties = {
  width:"100%", height:44, borderRadius:12, border:"1px solid #e5e7eb", padding:"0 12px", background:"#fff"
};
const select = input;
const textarea: React.CSSProperties = { ...input, height:140, padding:"10px 12px", resize:"vertical" };
const footer: React.CSSProperties = {
  display:"flex", justifyContent:"space-between", alignItems:"center",
  padding:"14px 20px 18px", borderTop:"1px solid #f1f5f9", background:"linear-gradient(#fff, #fff0)"
};
const backGhost: React.CSSProperties = { ...backBtn, padding:"10px 14px", borderRadius:12, border:"1px solid #e5e7eb" };
const cta: React.CSSProperties = {
  background:TERRACOTTA, color:"#fff", border:"none", padding:"10px 16px",
  borderRadius:12, fontWeight:700, cursor:"pointer"
};
