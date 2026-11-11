NIDHI 1st ANNIVERSARY SITE - DEPLOY TO VERCEL

Deploy: drag the "nidhi-site" folder onto https://vercel.com/new and click Deploy (no build command, output directory = ".").

NEW in this version
- Weather themes: tap ☔ / ☀️ / ❄️ (top-left) for rainy, sunny or snowy mood (animated rain + lightning, golden sun rays, falling snow). Choice is remembered.
- Play Our Game: Love Quiz, Memory Lane (photo + memory questions), Match Hearts (card game). Scores can be sent to you on WhatsApp.
- Final "Yes! 💍" opens WhatsApp to +91 88097 83125 with a ready-made message (includes her game scores).
- Edit quiz / memory questions in the Admin panel (tabs "quiz" and "memory": 4 options + correct option number 1-4).

Logins:  admin shubh07 / Shubh@80   |   Nidhi bubu27 / Zuv@28   |   private video password: loveububu

UPDATE 2
- No built-in song any more. To add yours: put an mp3 named song.mp3 in this folder (next to index.html) before deploying. It starts right after login and stops on logout. (Songs added through the Admin panel only live on that one device.)
- Avatars: the round photo at the top changes with the theme. Put avatar-rain.jpg, avatar-sun.jpg and avatar-snow.jpg in this folder (any missing one falls back to the couple photo), or upload them in Admin on your own device.
- "Happy 1st Anniversary" is now italic, with a different typeface per theme (rain: Cormorant, sun: Playfair, snow: EB Garamond).

UPDATE 3
- The avatar at the top is now Meenu & Kabir from the "Monsoon Between Us" cover, in all three themes (umbrella for rain, sun rays for sunny, snow caps for snow).
- To override with a different picture, add avatar-rain.jpg / avatar-sun.jpg / avatar-snow.jpg to this folder (it replaces the pair for that theme).


UPDATE 4 - CLOUD STORAGE (admin edits now reach everyone)
Admin edits used to live only in the browser of the device they were made on. Now they are saved to Vercel Blob and every visitor loads them.

ONE-TIME SETUP on Vercel (after the first deploy):
1. Vercel dashboard -> your project -> Storage tab -> Create Database -> Blob -> connect it to the project (Public access).
   This automatically adds the BLOB_READ_WRITE_TOKEN environment variable.
2. Redeploy (Deployments -> ... -> Redeploy), or just deploy this folder again.
3. (Optional) Environment Variables ADMIN_USER / ADMIN_PASS to change the admin login the server checks (defaults shubh07 / Shubh@80; keep them in sync with the login in index.html).

Deploy with the Vercel CLI (`vercel --prod` inside this folder) or via Git. The folder now contains an /api directory and package.json, so Vercel installs @vercel/blob automatically.

How it works
- Text content (timeline, diary, quiz, gallery photos, avatars...) -> nidhi/data.json in Blob.
- Songs, videos, private video -> uploaded straight from the browser to Blob (large files OK, up to 1 GB), the site stores their URL.
- Wishes from Nidhi -> nidhi/wishes.json (works without admin login).
- First admin login after deploying uploads whatever was already saved on that device, so nothing is lost.
- Photos are auto-shrunk; the text data (incl. photos) must stay under ~4 MB total.
