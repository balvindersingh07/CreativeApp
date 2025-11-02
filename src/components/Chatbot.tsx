import { useEffect, useMemo, useRef, useState } from "react";

/** ---------- THEME ---------- */
const TERRACOTTA = "#D4745E";
const BG_PANEL = "#ffffff";
const BG_USER = "#FFE7DF";   // soft terracotta tint
const BG_BOT  = "#F5F6F8";   // light grey
const TEXT    = "#1f2937";
const SHADOW  = "0 16px 36px rgba(0,0,0,.25)";

/** ---------- TYPES ---------- */
type Msg = { id: string; role: "user" | "assistant" | "system"; content: string };

/** ---------- SMALL UTILS ---------- */
const ls = {
  get<T>(k: string, fallback: T): T {
    try { const val = localStorage.getItem(k); return val ? JSON.parse(val) as T : fallback; }
    catch { return fallback; }
  },
  set<T>(k: string, v: T) {
    try { localStorage.setItem(k, JSON.stringify(v)); } catch {}
  },
  del(k: string) { try { localStorage.removeItem(k); } catch {} }
};

// super tiny Markdown ? HTML (bold, italic, inline `code`, links, autolink)
function mdInline(s: string) {
  // escape
  const esc = s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  // code
  let out = esc.replace(/`([^`]+)`/g, "<code>$1</code>");
  // bold **text**
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  // italic *text*
  out = out.replace(/(^|[^\*])\*([^*]+)\*/g, (_, p1, p2) => `${p1}<em>${p2}</em>`);
  // links [text](url)
  out = out.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, `<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>`);
  // autolink urls
  out = out.replace(/(?<!["'=\]])(https?:\/\/[^\s)]+)(?![^<]*>)/g, `<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>`);
  // newlines
  out = out.replace(/\n/g, "<br/>");
  return out;
}

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

/** ---------- COMPONENT ---------- */
export default function Chatbot() {
  /** env + constants */
  const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8080";
  const USER_ID = "web";
  const LS_KEY = "chatbot.messages.v1";
  const LS_THREAD = "chatbot.thread.v1";
  const LS_OPEN = "chatbot.open.v1";
  const LS_DARK = "chatbot.dark.v1";

  /** state */
  const [open, setOpen] = useState<boolean>(() => ls.get(LS_OPEN, false));
  const [messages, setMessages] = useState<Msg[]>(() => ls.get<Msg[]>(LS_KEY, []));
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"unknown" | "ok" | "fail">("unknown");
  const [threadId, setThreadId] = useState<string | null>(() => ls.get<string | null>(LS_THREAD, null));
  const [dark, setDark] = useState<boolean>(() => ls.get(LS_DARK, false));
  const [file, setFile] = useState<File | null>(null);

  /** refs */
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  /** effects */
  useEffect(() => { ls.set(LS_OPEN, open); if (open) healthCheck(); }, [open]);
  useEffect(() => { healthCheck(); }, []);
  useEffect(() => { ls.set(LS_KEY, messages); }, [messages]);
  useEffect(() => { ls.set(LS_THREAD, threadId); }, [threadId]);
  useEffect(() => { ls.set(LS_DARK, dark); }, [dark]);
  // autoscroll
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  /** derived theme */
  const panelStyle = useMemo(() => ({
    background: dark ? "#121212" : BG_PANEL,
    color: dark ? "#F5F5F5" : TEXT,
    boxShadow: SHADOW,
    borderRadius: 16,
    padding: 12,
  }), [dark]);

  const bubbleColors = (role: Msg["role"]) => {
    if (role === "user") return { bg: dark ? "#2b1f1c" : BG_USER, color: dark ? "#fee" : TEXT };
    if (role === "assistant") return { bg: dark ? "#1E2126" : BG_BOT, color: dark ? "#EDEFF3" : TEXT };
    return { bg: "transparent", color: "inherit" };
  };

  /** API: health */
  async function healthCheck() {
    try {
      const r = await fetch(`${API_URL}/health`);
      setStatus(r.ok ? "ok" : "fail");
    } catch { setStatus("fail"); }
  }

  /** send message with streaming fallback */
  async function send() {
    const text = (inputRef.current?.value || "").trim();
    if ((!text && !file) || loading) return;

    inputRef.current!.value = "";
    const myId = uid();
    setMessages(m => [...m, { id: myId, role: "user", content: text || (file ? `Uploaded file: ${file.name}` : "") }]);

    setLoading(true);

    try {
      // prefer streaming endpoint if server supports it
      const supportsStreaming = true; // optimistic; will fallback if fails

      if (supportsStreaming) {
        const fd = new FormData();
        fd.append("userId", USER_ID);
        if (threadId) fd.append("threadId", threadId);
        fd.append("content", text);
        if (file) fd.append("file", file);

        const resp = await fetch(`${API_URL}/api/chat/stream`, {
          method: "POST",
          body: fd,
          // NOTE: no Content-Type header with FormData
        });

        if (!resp.ok || !resp.body) throw new Error(`HTTP ${resp.status}`);

        // create a placeholder assistant message we append into
        const botId = uid();
        let botText = "";
        setMessages(m => [...m, { id: botId, role: "assistant", content: "" }]);

        // read chunks
        const reader = resp.body.getReader();
        const decoder = new TextDecoder();
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          botText += decoder.decode(value, { stream: true });
          setMessages(m => m.map(msg => msg.id === botId ? ({ ...msg, content: botText }) : msg));
        }

        // server might send threadId in header
        const newThread = resp.headers.get("x-thread-id");
        if (newThread && newThread !== threadId) setThreadId(newThread);

      } else {
        // JSON POST fallback (non-streaming)
        const fd = new FormData();
        fd.append("userId", USER_ID);
        if (threadId) fd.append("threadId", threadId);
        fd.append("content", text);
        if (file) fd.append("file", file);

        const r = await fetch(`${API_URL}/api/chat`, { method: "POST", body: fd });
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const d = await r.json();
        if (d?.threadId && d.threadId !== threadId) setThreadId(d.threadId);
        setMessages(m => [...m, { id: uid(), role: "assistant", content: d?.reply ?? "…" }]);
      }
    } catch (e: any) {
      setMessages(m => [...m, { id: uid(), role: "assistant", content: `?? ${e?.message || "Server error"}` }]);
    } finally {
      setLoading(false);
      setFile(null);
    }
  }

  /** keyboard send */
  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  /** clear chat */
  function clearChat() {
    setMessages([]);
    setThreadId(null);
    ls.del(LS_KEY); ls.del(LS_THREAD);
  }

  /** typing indicator */
  function TypingDots() {
    return (
      <div style={{ opacity: .8, fontSize: 12, display: "inline-flex", gap: 4 }}>
        <span className="dot" style={dotStyle(0)} />
        <span className="dot" style={dotStyle(1)} />
        <span className="dot" style={dotStyle(2)} />
      </div>
    );
  }
  function dotStyle(i: number): React.CSSProperties {
    const anim = `typingDot 1.3s ${i * .15}s infinite`;
    return {
      width: 6, height: 6, borderRadius: 9999,
      background: TERRACOTTA, display: "inline-block", animation: anim as any
    };
  }

  /** styles kept minimal & inline to not disturb global UI */
  const fabBtn: React.CSSProperties = {
    position: "fixed", right: 24, bottom: 24, zIndex: 99999,
    background: TERRACOTTA, color: "#fff", border: "none",
    padding: "14px 16px", borderRadius: 9999,
    boxShadow: "0 12px 28px rgba(0,0,0,.18)", cursor: "pointer",
    fontWeight: 700, letterSpacing: .2, transition: "transform .15s ease"
  };

  const headerPill: React.CSSProperties = {
    display: "inline-flex", alignItems: "center", gap: 8,
    border: "1px solid #e5e7eb", padding: "4px 8px", borderRadius: 9999,
    background: dark ? "#1a1a1a" : "#fff", cursor: "pointer", fontSize: 12
  };

  const iconBtn: React.CSSProperties = {
    border: "1px solid #e5e7eb", padding: "6px 8px", borderRadius: 8,
    background: dark ? "#1f1f1f" : "#fff", cursor: "pointer", fontSize: 12
  };

  return (
    <>
      {/* Floating toggle */}
      <button
        onClick={() => setOpen(o => !o)}
        style={fabBtn}
        onMouseDown={e => (e.currentTarget.style.transform = "scale(.97)")}
        onMouseUp={e => (e.currentTarget.style.transform = "scale(1)")}
        aria-label="Open chat"
      >
        {open ? "Close" : "Chat"}
      </button>

      {/* Panel */}
      {open && (
        <div
          style={{
            position: "fixed", right: 24, bottom: 100, zIndex: 99999,
            width: 380, maxWidth: "92vw", ...panelStyle
          }}
        >
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div
                style={{
                  width: 28, height: 28, borderRadius: 8,
                  background: TERRACOTTA, display: "grid", placeItems: "center", color: "#fff",
                  fontSize: 16, fontWeight: 800
                }}
                title="Terracotta"
              >
                T
              </div>
              <strong>Chatbot</strong>
              <span
                title={status}
                style={{
                  width: 10, height: 10, borderRadius: 9999,
                  background: status === "ok" ? "#22c55e" : status === "fail" ? "#ef4444" : "#a3a3a3",
                  marginLeft: 6
                }}
              />
            </div>

            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <button onClick={healthCheck} style={headerPill}>Health</button>
              <button onClick={() => setDark(d => !d)} style={headerPill}>
                {dark ? "Light" : "Dark"}
              </button>
              <button onClick={clearChat} style={headerPill}>Clear</button>
            </div>
          </div>

          {/* Messages */}
          <div ref={listRef} style={{ height: 320, overflowY: "auto", padding: 2 }}>
            {messages.map((m) => {
              const colors = bubbleColors(m.role);
              return (
                <div key={m.id}
                  style={{
                    background: colors.bg, color: colors.color,
                    margin: "8px 0", padding: "10px 12px",
                    borderRadius: 14,
                    borderTopLeftRadius: m.role === "assistant" ? 4 : 14,
                    borderTopRightRadius: m.role === "user" ? 4 : 14,
                    textAlign: m.role === "user" ? "right" : "left",
                    whiteSpace: "pre-wrap"
                  }}>
                  {/* markdown-rendered content */}
                  <div
                    style={{ lineHeight: 1.45 }}
                    dangerouslySetInnerHTML={{ __html: mdInline(m.content) }}
                  />
                </div>
              );
            })}
            {loading && (
              <div style={{
                background: bubbleColors("assistant").bg, color: bubbleColors("assistant").color,
                margin: "8px 0", padding: "10px 12px", borderRadius: 14, width: "fit-content"
              }}>
                <TypingDots />
              </div>
            )}
          </div>

          {/* Composer */}
          <div style={{ display: "flex", gap: 8, marginTop: 8, alignItems: "flex-end" }}>
            <div style={{ position: "relative", flex: 1 }}>
              <textarea
                ref={inputRef}
                rows={2}
                placeholder="Type…  (Enter to send • Shift+Enter new line)"
                onKeyDown={onKeyDown}
                style={{
                  width: "100%",
                  border: "1px solid #e5e7eb",
                  borderRadius: 10,
                  padding: "10px 40px 10px 10px",
                  background: dark ? "#161616" : "#fff",
                  color: dark ? "#eee" : TEXT,
                  resize: "none",
                }}
                disabled={loading}
              />
              {/* file picker button in the textarea */}
              <label
                style={{
                  position: "absolute", right: 8, bottom: 8,
                  ...iconBtn, border: "none", padding: "6px 10px",
                  background: dark ? "#222" : "#f9fafb"
                }}
              >
                ??
                <input
                  type="file"
                  style={{ display: "none" }}
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
              </label>
              {file && (
                <div style={{ position: "absolute", left: 10, top: -22, fontSize: 11, opacity: .8 }}>
                  {file.name} <button style={{ marginLeft: 6, color: TERRACOTTA, border: "none", background: "none", cursor: "pointer" }} onClick={() => setFile(null)}>?</button>
                </div>
              )}
            </div>

            <button
              onClick={send}
              disabled={loading}
              style={{
                background: TERRACOTTA,
                color: "#fff",
                border: "none",
                padding: "10px 14px",
                borderRadius: 10,
                cursor: "pointer",
                fontWeight: 700,
                opacity: loading ? .75 : 1,
                transition: "box-shadow .15s ease, transform .06s ease"
              }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 8px 18px rgba(212, 116, 94, .35)")}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}
              onMouseDown={e => (e.currentTarget.style.transform = "translateY(1px)")}
              onMouseUp={e => (e.currentTarget.style.transform = "translateY(0)")}
            >
              Send
            </button>
          </div>

          {/* subtle footnote */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
            <small style={{ opacity: .7 }}>Enter to send • Shift+Enter for newline</small>
            <small style={{ opacity: .7 }}>Thread: {threadId ?? "—"}</small>
          </div>
        </div>
      )}

      {/* tiny keyframes for typing dots */}
      <style>{`
        @keyframes typingDot {
          0% { transform: translateY(0); opacity: .6 }
          30% { transform: translateY(-3px); opacity: 1 }
          60% { transform: translateY(0); opacity: .6 }
          100% { transform: translateY(0); opacity: .6 }
        }
        code { 
          background: ${dark ? "#2a2a2a" : "#f3f4f6"}; 
          padding: 2px 6px; border-radius: 6px; 
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
          font-size: .95em;
        }
        a { color: ${TERRACOTTA}; text-decoration: underline; }
      `}</style>
    </>
  );
}



