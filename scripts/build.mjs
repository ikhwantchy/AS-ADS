// Build statis tanpa dependency: node scripts/build.mjs [--preview]
import { mkdir, writeFile, cp, rm, readdir, access } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { site } from '../site.config.mjs';
import { page } from '../src/layout.mjs';
import { pages as basePages } from '../src/pages.mjs';
import { loadPosts, blogIndexPage, blogReaderPage, postPage } from '../src/blog.mjs';

const preview = process.argv.includes('--preview');
const posts = await loadPosts();
const pages = [...basePages.slice(0, -1), ...(site.blogUrl ? [blogIndexPage, blogReaderPage, ...posts.map(postPage)] : []), basePages[basePages.length - 1]];
const out = 'dist';
const errors = [];
const warn = [];

if (!/^\d{9,15}$/.test(site.whatsappNumber)) {
  (preview ? warn : errors).push('site.config.mjs: whatsappNumber belum diisi/valid (format 62xxxxxxxxxx).');
}

if (errors.length) {
  console.error('\n✖ Build production dibatalkan:\n  - ' + errors.join('\n  - ') + '\n\nGunakan `npm run build:preview` untuk pratinjau.\n');
  process.exit(1);
}

await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
await cp('src/assets', join(out, 'assets'), { recursive: true });
// Contoh tata letak portofolio hanya untuk pratinjau.
if (!preview) for (const f of ['sample-1.png', 'sample-2.png', 'sample-3.png']) await rm(join(out, 'assets/figma', f), { force: true });

for (const p of pages) {
  const html = page({ ...p, body: p.body({ preview, posts }), preview });
  const file = join(out, p.out);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, html);
}

const indexable = pages.filter((p) => !p.noindex);
const today = new Date().toISOString().slice(0, 10);
await writeFile(join(out, 'sitemap.xml'),
`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexable.map((p) => `  <url><loc>${site.url}${p.path}</loc><lastmod>${p.article ? p.article.modified.slice(0, 10) : today}</lastmod></url>`).join('\n')}
</urlset>
`);
await writeFile(join(out, 'robots.txt'), preview
  ? 'User-agent: *\nDisallow: /\n'
  : `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`);
// TODO: KONFIRMASI PEMILIK — ganti dengan favicon turunan logo asli.
await writeFile(join(out, 'favicon.svg'), '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" fill="#0a0a0a"/></svg>\n');
await cp('deploy/.htaccess', join(out, '.htaccess')).catch(() => {});

console.log(`✔ Build ${preview ? 'PREVIEW (noindex, dengan contoh tata letak)' : 'PRODUCTION'} → ${out}/ (${pages.length} halaman, ${posts.length} artikel blog)`);
for (const w of warn) console.warn('  ⚠ ' + w);
