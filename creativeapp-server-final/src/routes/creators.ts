import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const r = Router();

r.get('/', async (_req, res) => {
  const rows = await prisma.creator.findMany({ orderBy: { createdAt: 'desc' } });
  res.json(rows);
});

r.post('/', async (req, res) => {
  const { name, businessName, phone, email, city, pincode, category, bio, images, priceRange } = req.body ?? {};
  const created = await prisma.creator.create({
    data: {
      name, businessName, phone, email, city, pincode, category, bio,
      imagesJson: JSON.stringify(images ?? []),
      priceRange
    }
  });
  res.status(201).json(created);
});

r.get('/:id', async (req, res) => {
  const row = await prisma.creator.findUnique({ where: { id: req.params.id } });
  if (!row) return res.status(404).json({ error: 'not_found' });
  res.json(row);
});

r.put('/:id', async (req, res) => {
  const { images, ...rest } = req.body ?? {};
  const updated = await prisma.creator.update({
    where: { id: req.params.id },
    data: {
      ...rest,
      imagesJson: images ? JSON.stringify(images) : undefined
    }
  });
  res.json(updated);
});

export default r;