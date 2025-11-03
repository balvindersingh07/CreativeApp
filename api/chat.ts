import type { VercelRequest, VercelResponse } from '@vercel/node';
import OpenAI from 'openai';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

    const { messages } = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    if (!messages) return res.status(400).json({ error: 'Missing messages' });

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages
    });

    return res.status(200).json(completion);
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: err.message || 'Server error' });
  }
}
