import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const r = Router();

r.post('/', async (req, res) => {
  const { creatorId, eventId, status } = req.body ?? {};
  const created = await prisma.application.create({
    data: { creatorId, eventId, status: status ?? 'interested' }
  });
  res.status(201).json(created);
});

r.get('/', async (_req, res) => {
  const rows = await prisma.application.findMany({
    orderBy: { appliedAt: 'desc' },
    include: { creator: true, event: true }
  });
  res.json(rows);
});

export default r;