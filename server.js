// server.js
import "dotenv/config";
import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
const PORT = process.env.PORT || 8080;

// --- CORS (allow localhost variants) ---
const allowed = (process.env.CORS_ORIGIN?.split(",") ?? [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
]);
app.use(
  cors({
    origin(origin, cb) {
      // allow same-origin / server-to-server / file://
      if (!origin || allowed.includes(origin)) return cb(null, true);
      return cb(null, false);
    },
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

// --- body parsing ---
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// small helper: pull user text from many shapes
function pickUserText(body = {}) {
  if (typeof body.content === "string" && body.content.trim()) return body.content.trim();
  if (typeof body.message === "string" && body.message.trim()) return body.message.trim();
  if (typeof body.prompt === "string" && body.prompt.trim()) return body.prompt.trim();
  if (typeof body.input === "string" && body.input.trim()) return body.input.trim();

  // messages array fallback (take last user message)
  if (Array.isArray(body.messages) && body.messages.length) {
    const last = [...body.messages].reverse().find((m) => typeof m?.content === "string");
    if (last?.content?.trim()) return last.content.trim();
  }
  return "";
}

// ---------- health ----------
app.get("/health", (_req, res) => res.json({ status: "ok" }));

// ---------- simple reply (non-stream) ----------
app.post("/api/chat", async (req, res) => {
  try {
    const content = pickUserText(req.body);
    const { threadId = null, userId = null } = req.body ?? {};

    if (!content) {
      console.warn("[/api/chat] 400: missing content", req.body);
      return res.status(400).json({ error: "missing_content" });
    }

    if (!process.env.OPENAI_API_KEY) {
      console.error("[/api/chat] 500: OPENAI_API_KEY missing");
      return res.status(500).json({ error: "server_config_error" });
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const r = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a concise, friendly assistant." },
        ...(Array.isArray(req.body.messages) ? req.body.messages : []),
        { role: "user", content },
      ],
      temperature: 0.7,
    });

    const reply = r.choices?.[0]?.message?.content || "…";
    res.json({ reply, threadId, userId });
  } catch (e) {
    console.error("[/api/chat] 500:", e?.message || e);
    res.status(500).json({ error: "server_error" });
  }
});

// ---------- streaming (SSE) ----------
app.post("/api/chat/stream", async (req, res) => {
  try {
    const content = pickUserText(req.body);
    if (!content) {
      console.warn("[/api/chat/stream] 400: missing content", req.body);
      res.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
      return res.end("Missing content");
    }

    if (!process.env.OPENAI_API_KEY) {
      console.error("[/api/chat/stream] 500: OPENAI_API_KEY missing");
      res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      return res.end("Server config error");
    }

    // SSE headers
    res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
    res.setHeader("Cache-Control", "no-cache, no-transform");
    res.setHeader("Connection", "keep-alive");

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const stream = await client.chat.completions.create({
      model: "gpt-4o-mini",
      stream: true,
      messages: [
        { role: "system", content: "You are a concise, friendly assistant." },
        ...(Array.isArray(req.body.messages) ? req.body.messages : []),
        { role: "user", content },
      ],
      temperature: 0.7,
    });

    for await (const chunk of stream) {
      const token = chunk.choices?.[0]?.delta?.content ?? "";
      if (token) res.write(`data: ${token}\n\n`);
    }
    res.write("data: [DONE]\n\n");
    res.end();
  } catch (e) {
    console.error("[/api/chat/stream] 500:", e?.message || e);
    try {
      res.write(`event: error\ndata: server_error\n\n`);
    } catch {}
    res.end();
  }
});

// ---------- start ----------
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Backend running at http://127.0.0.1:${PORT}`);
});
