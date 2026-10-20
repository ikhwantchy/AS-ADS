// QA hasil build: tautan internal, satu H1, title/description unik, placeholder di production.
import { readFile, readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';
const root = process.argv[2] || 'dist';
const walk = async (d) => (await Promise.all((await readdir(d)).map(async (f) => { const p = join(d, f); return (await stat(p)).isDirectory() ? walk(p) : [p]; }))).flat();
const files = await walk(root);
const html = files.filter((f) => f.endsWith('.html'));
const exists = (u) => { const p = join(root, u.split('#')[0]); return files.includes(p) || files.includes(join(p, 'index.html')); };
const issues = []; const titles = new Map(); const descs = new Map();
let preview = false;
for (const f of html) {
  const s = await readFile(f, 'utf8');
  if (s.includes('class="is-preview"')) preview = true;
  const h1 = (s.match(/<h1[\s>]/g) || []).length; if (h1 !== 1) issues.push(`${f}: ${h1} elemen <h1>`);
  const t = s.match(/<title>(.*?)<\/title>/)?.[1]; const d = s.match(/name="description" content="(.*?)"/)?.[1];
  if (!t || !d) issues.push(`${f}: title/description kosong`);
  if (titles.has(t)) issues.push(`${f}: title sama dengan ${titles.get(t)}`); titles.set(t, f);
  if (descs.has(d)) issues.push(`${f}: description sama dengan ${descs.get(d)}`); descs.set(d, f);
  for (const [, u] of s.matchAll(/(?:href|src)="(\/[^"]*)"/g)) if (!u.startsWith('//') && !exists(u)) issues.push(`${f}: tautan/aset tidak ditemukan ${u}`);
  for (const [a] of s.matchAll(/<a [^>]*target="_blank"[^>]*>/g)) if (!/rel="noopener noreferrer"/.test(a)) issues.push(`${f}: target=_blank tanpa rel aman`);
  for (const [img] of s.matchAll(/<img [^>]*>/g)) if (!/ alt="/.test(img) || !/ width="/.test(img)) issues.push(`${f}: <img> tanpa alt/width`);
  if (!preview && /Ganti dengan portofolio|lorem ipsum|TODO/i.test(s.replace(/<!--[\s\S]*?-->/g, ''))) issues.push(`${f}: placeholder terlihat di production`);
  if (/wa\.me\/\?/.test(s)) issues.push(`${f}: nomor WhatsApp kosong`);
}
const label = preview ? 'PREVIEW' : 'PRODUCTION';
if (issues.length) { console.log(`✖ ${label}: ${issues.length} temuan`); [...new Set(issues)].forEach((i) => console.log('  - ' + i)); process.exitCode = 1; }
else console.log(`✔ ${label}: ${html.length} halaman lolos pemeriksaan`);
