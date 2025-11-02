import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const r = Router();

r.get('/', async (req, res) => {
  const { city, category, date_from, date_to } = req.query as any;
  const where: any = {};
  if (city) where.city = String(city);
  // naive LIKE filters on tagsJson
  if (category) where.tagsJson = { contains: String(category), mode: 'insensitive' };
  if (date_from || date_to) {
    where.startDate = {};
    if (date_from) where.startDate.gte = new Date(String(date_from));
    if (date_to) where.endDate = { lte: new Date(String(date_to)) };
  }
  const rows = await prisma.event.findMany({ where, orderBy: { startDate: 'asc' } });
  res.json(rows);
});

r.post('/', async (req, res) => {
  const { title, organizer, city, startDate, endDate, fee, tags, applyLink, contact } = req.body ?? {};
  const created = await prisma.event.create({
    data: {
      title, organizer, city,
      startDate: startDate ? new Date(startDate) : null,
      endDate: endDate ? new Date(endDate) : null,
      fee, tagsJson: JSON.stringify(tags ?? []),
      applyLink, contact
    }
  });
  res.status(201).json(created);
});

r.get('/:id', async (req, res) => {
  const row = await prisma.event.findUnique({ where: { id: req.params.id } });
  if (!row) return res.status(404).json({ error: 'not_found' });
  res.json(row);
});

export default r;