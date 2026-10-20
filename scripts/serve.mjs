// Server lokal sederhana: node scripts/serve.mjs dist [port]
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname, normalize } from 'node:path';
const root = process.argv[2] || 'dist';
const port = Number(process.argv[3] || 4173);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.xml': 'application/xml', '.txt': 'text/plain' };
createServer(async (req, res) => {
  let p = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname)).replace(/^(\.\.[/\\])+/, '');
  let file = join(root, p);
  try { if ((await stat(file)).isDirectory()) file = join(file, 'index.html'); 
    res.writeHead(200, { 'content-type': types[extname(file)] || 'application/octet-stream' }); res.end(await readFile(file));
  } catch { res.writeHead(404, { 'content-type': types['.html'] }); res.end(await readFile(join(root, '404.html')).catch(() => 'Not found')); }
}).on('error', (e) => {
  if (e.code !== 'EADDRINUSE') throw e;
  console.error(`
✖ Port ${port} sudah dipakai. Server lain masih jalan: buka http://localhost:${port} atau tutup terminal lama dulu (Ctrl+C).
`);
  process.exit(1);
}).listen(port, () => console.log(`→ http://localhost:${port}`));
