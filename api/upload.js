import { handleUpload } from '@vercel/blob/client';
import { isAdmin, parseBody } from './_lib.js';

// Issues short-lived tokens so the browser uploads big songs/videos/photos
// straight to Vercel Blob (bypasses the 4.5 MB serverless body limit).
export default async function handler(req, res) {
  try {
    const body = parseBody(req);
    const json = await handleUpload({
      body, request: req,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        let c = null; try { c = JSON.parse(clientPayload || ''); } catch {}
        if (!isAdmin(c)) throw new Error('Not authorised');
        return {
          allowedContentTypes: ['audio/*', 'video/*', 'image/*'],
          maximumSizeInBytes: 1024 * 1024 * 1024,
          addRandomSuffix: true,
        };
      },
      onUploadCompleted: async () => {},
    });
    return res.status(200).json(json);
  } catch (e) {
    return res.status(400).json({ error: String((e && e.message) || e) });
  }
}
