// Shared helpers. Files starting with "_" are not exposed as routes.
export function isAdmin(c) {
  const u = (process.env.ADMIN_USER || 'shubh07').toLowerCase();
  const p = process.env.ADMIN_PASS || 'Shubh@80';
  return !!c && String(c.u || '').trim().toLowerCase() === u && c.p === p;
}
export function credsFromHeader(req) {
  try { return JSON.parse(Buffer.from(String(req.headers['x-admin'] || ''), 'base64').toString('utf8')); }
  catch { return null; }
}
export function parseBody(req) {
  const b = req.body;
  if (typeof b === 'string') { try { return JSON.parse(b); } catch { return null; } }
  return b && typeof b === 'object' ? b : null;
}
