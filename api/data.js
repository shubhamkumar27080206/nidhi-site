import { put, list } from '@vercel/blob';
import { isAdmin, credsFromHeader, parseBody } from './_lib.js';

export async function readJson(path) {
  const { blobs } = await list({ prefix: path, limit: 5 });
  const b = blobs.find(x => x.pathname === path);
  if (!b) return null;
  const r = await fetch(b.url + '?t=' + Date.now(), { cache: 'no-store' }); // query string bypasses the CDN cache
  return r.ok ? r.json() : null;
}
export function writeJson(path, obj) {
  return put(path, JSON.stringify(obj), {
    access: 'public', addRandomSuffix: false, allowOverwrite: true,
    contentType: 'application/json', cacheControlMaxAge: 60,
  });
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  try {
    if (req.method === 'GET') {
      const [data, wishes] = await Promise.all([readJson('nidhi/data.json'), readJson('nidhi/wishes.json')]);
      return res.status(200).json({ data, wishes: wishes || [] });
    }
    if (req.method === 'POST') {
      if (!isAdmin(credsFromHeader(req))) return res.status(401).json({ error: 'Not authorised' });
      const body = parseBody(req);
      if (!body) return res.status(400).json({ error: 'Bad JSON' });
      delete body.wishes; // wishes live in their own file
      await writeJson('nidhi/data.json', body);
      return res.status(200).json({ ok: true });
    }
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (e) {
    return res.status(500).json({ error: String((e && e.message) || e) });
  }
}
