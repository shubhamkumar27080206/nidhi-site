import { readJson, writeJson } from './data.js';
import { isAdmin, credsFromHeader, parseBody } from './_lib.js';

// POST {text}            -> anyone can drop a wish
// POST {op:'delete',id}  -> admin only
export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const body = parseBody(req) || {};
    const wishes = (await readJson('nidhi/wishes.json')) || [];
    if (body.op === 'delete') {
      if (!isAdmin(credsFromHeader(req))) return res.status(401).json({ error: 'Not authorised' });
      const next = wishes.filter(w => w.id !== body.id);
      await writeJson('nidhi/wishes.json', next);
      return res.status(200).json({ ok: true, wishes: next });
    }
    const text = String(body.text || '').trim().slice(0, 1000);
    if (!text) return res.status(400).json({ error: 'Empty wish' });
    const w = { id: 'w' + Date.now() + Math.random().toString(36).slice(2, 6), text, date: new Date().toISOString().slice(0, 10) };
    wishes.push(w);
    await writeJson('nidhi/wishes.json', wishes.slice(-500));
    return res.status(200).json({ ok: true, wish: w });
  } catch (e) {
    return res.status(500).json({ error: String((e && e.message) || e) });
  }
}
