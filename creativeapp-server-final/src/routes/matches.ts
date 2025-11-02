import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const r = Router();

function scoreMatch(creator: any, event: any) {
  let score = 0;
  const ccat = (creator.category ?? '').toLowerCase();
  let tags: string[] = [];
  try { tags = JSON.parse(event.tagsJson ?? '[]').map((t:any)=>String(t).toLowerCase()); } catch {}
  if (ccat && tags.includes(ccat)) score += 50;
  if (creator.city && event.city && creator.city.toLowerCase() === String(event.city).toLowerCase()) score += 25;
  if (event.fee != null && creator.priceRange) {
    const m = String(creator.priceRange).match(/(\d{2,})/g);
    if (m && m.length) {
      const approx = Number(m[Math.floor(m.length/2)]);
      if (!isNaN(approx) && Number(event.fee) <= approx * 5) score += 15;
    }
  }
  if (event.startDate) score += 10;
  return score;
}

r.post('/run', async (_req, res) => {
  const creators = await prisma.creator.findMany();
  const events = await prisma.event.findMany({
    where: { startDate: { gte: new Date() } }
  });

  // clear & recompute
  await prisma.match.deleteMany({});
  const payload: any[] = [];
  for (const c of creators) {
    for (const e of events) {
      const s = scoreMatch(c, e);
      if (s >= 30) payload.push({ creatorId: c.id, eventId: e.id, score: s });
    }
  }
  if (payload.length) await prisma.match.createMany({ data: payload });
  res.json({ ok: true, creators: creators.length, events: events.length, matches: payload.length });
});

r.get('/', async (_req, res) => {
  const rows = await prisma.match.findMany({
    orderBy: [{ score: 'desc' }, { createdAt: 'desc' }],
    include: { creator: true, event: true }
  });
  res.json(rows);
});

export default r;