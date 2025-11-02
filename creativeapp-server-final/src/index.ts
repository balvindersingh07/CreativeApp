import express from "express";
import cors from "cors";
import morgan from "morgan";
import cron from "node-cron";
import axios from "axios";
import nodemailer from "nodemailer";
import { PrismaClient } from "@prisma/client";

import api from "./api";
import analyticsRoutes from "./routes/analytics";
import recRoutes from "./routes/recommendations";
import { buildDailySummary } from "./lib/summary";

const app = express();
const prisma = new PrismaClient();

app.use(morgan("dev"));
app.use(express.json());

// Base URL for internal calls (respects PORT)
const BASE = process.env.SELF_BASE || `http://localhost:${process.env.PORT || 8080}`;

// --- CORS ---
const allowedList = (process.env.ALLOWED_ORIGIN ?? "*")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin || allowedList.includes("*") || allowedList.includes(origin)) return cb(null, true);
      return cb(new Error("CORS blocked"), false);
    },
    credentials: true,
  })
);

// --- HEALTH ---
app.get("/health", (_req, res) => res.json({ ok: true }));

// --- CHAT ENDPOINT (safe even if prisma chat tables absent) ---
app.post("/api/chat", async (req, res) => {
  try {
    const { userId, threadId, content } = req.body as { userId?: string; threadId?: string; content: string };
    if (!content || typeof content !== "string") {
      return res.status(400).json({ error: "bad_request", message: "content required" });
    }

    let reply = "Thanks! We'll get back soon.";
    try {
      const user = userId
        ? await prisma.user.upsert({ where: { id: userId }, update: {}, create: { id: userId } })
        : await prisma.user.create({ data: {} });

      const existing = threadId ? await prisma.thread.findUnique({ where: { id: threadId } }) : null;
      const thread = existing ?? (await prisma.thread.create({ data: { userId: user.id, title: content.slice(0, 40) } }));

      await prisma.message.create({ data: { role: "user", content, threadId: thread.id } });

      const r = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: "You are CraftConnect support bot. Be concise and helpful." },
            { role: "user", content },
          ],
          temperature: 0.3,
        }),
      });
      const data: any = await r.json();
      reply = data?.choices?.[0]?.message?.content ?? reply;

      await prisma.message.create({ data: { role: "assistant", content: reply, threadId: thread.id } });
      res.json({ threadId: thread.id, reply, userId: user.id });
      return;
    } catch {
      // If chat tables don't exist, still respond
      res.json({ threadId, reply, userId });
      return;
    }
  } catch (e: any) {
    console.error(e);
    res.status(500).json({ error: "chat_failed", message: e?.message ?? "server error" });
  }
});

// --- MAIN ROUTES ---
app.use("/api/v1", api);
app.use("/api/v1/analytics", analyticsRoutes);
app.use("/api/v1/recommendations", recRoutes);

// --- Mail transport helpers ---
async function getTransport() {
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    const secure = process.env.SMTP_SECURE === "true";
    const port = Number(process.env.SMTP_PORT || (secure ? 465 : 587));
    const tx = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
    try { await tx.verify(); console.log(" SMTP OK (custom)"); } catch (e: any) { console.log(" SMTP ERROR (custom):", e.message); }
    return tx;
  }

  if (process.env.NOTIFY_EMAIL && process.env.NOTIFY_PASS) {
    const tx = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user: process.env.NOTIFY_EMAIL, pass: process.env.NOTIFY_PASS },
    });
    try { await tx.verify(); console.log(" SMTP OK (Gmail)"); } catch (e: any) { console.log(" SMTP ERROR (Gmail):", e.message); }
    return tx;
  }

  const test = await nodemailer.createTestAccount();
  console.log(" Using Ethereal test SMTP");
  const tx = nodemailer.createTransport({
    host: test.smtp.host,
    port: test.smtp.port,
    secure: test.smtp.secure,
    auth: { user: test.user, pass: test.pass },
  });
  try { await tx.verify(); console.log(" SMTP OK (Ethereal)"); } catch (e: any) { console.log(" SMTP ERROR (Ethereal):", e.message); }
  return tx;
}

// --- CRON (9 AM daily) ---
cron.schedule("*/1 * * * *", async () => {
  console.log(" Running daily auto-match task...");
  try {
    const res = await axios.post(`${BASE}/api/v1/matches/run`);
    console.log(" Auto-match done:", res.data);

    const transporter = await getTransport();
    const info = await transporter.sendMail({
      from: process.env.NOTIFY_EMAIL || "no-reply@creativeapp.local",
      to: process.env.NOTIFY_EMAIL || "demo@creativeapp.local",
      subject: "Daily Match Summary",
      text: await buildDailySummary(BASE, res.data),
    });

    const preview = (nodemailer as any).getTestMessageUrl?.(info);
    if (preview) console.log(" Email preview:", preview);

    console.log(" Summary email sent!");
  } catch (err: any) {
    console.error(" Auto-match failed:", err.message);
  }
});

// --- Demo notification stubs (idempotent) ---
declare global {
  // eslint-disable-next-line no-var
  var __CREATIVEAPP_STUBS__: boolean | undefined;
}
if (!globalThis.__CREATIVEAPP_STUBS__) {
  globalThis.__CREATIVEAPP_STUBS__ = true;
  console.log(" WhatsApp stub: enabled (console-only)");
  console.log(" SMS stub: enabled (console-only)");
}
export function demoNotify(creator?: { name?: string; phone?: string }) {
  if (!creator) return;
  console.log(` Sent WhatsApp to ${creator.name ?? "Creator"} (${creator.phone ?? "n/a"})`);
  console.log(` Sent SMS to ${creator.name ?? "Creator"} (${creator.phone ?? "n/a"})`);
}

// --- START SERVER ---
const port = Number(process.env.PORT || 8080);
app.listen(port, () => console.log(`API on :${port}`));

