// Blog di dalam website. Artikel ditulis di Blogger (site.blogUrl), lalu:
// - saat build: semua artikel diambil dari feed Blogger dan dibuat menjadi halaman statis /blog/<slug>/ (bisa diindeks Google);
// - di browser: artikel yang terbit setelah build tetap bisa dibaca di /blog/baca/?id=<postId> tanpa build ulang.
import { site } from '../site.config.mjs';
import { esc, sectionHead } from './layout.mjs';
import { pageHero, closingBox } from './sections.mjs';

const base = () => (site.blogUrl || '').replace(/\/$/, '');

// Slug dari URL Blogger: /2026/10/ukuran-banner-yang-umum.html -> ukuran-banner-yang-umum
export const slugOf = (url) => (url.split('/').pop() || '').replace(/\.html?$/, '');
const postIdOf = (id) => (id.match(/post-(\d+)/) || [])[1] || '';

const strip = (html = '') => html.replace(/<!--[\s\S]*?-->/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
const decode = (s = '') => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");

// Isi artikel milik sendiri dari Blogger; tetap dibersihkan dari skrip, atribut event, dan style inline
// supaya tampilannya mengikuti CSS website.
export function cleanHtml(html = '') {
  return html
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/\son\w+="[^"]*"/gi, '')
    .replace(/\s(style|border|cellpadding|cellspacing|width|height)="[^"]*"/gi, (m, attr, off, str) => (attr === 'width' || attr === 'height') && /<img[^>]*$/.test(str.slice(0, off)) ? m : '')
    // Gambar Blogger disimpan sebagai thumbnail (mis. /s320/); pakai ukuran asli agar tajam di halaman artikel.
    .replace(/(blogger\.googleusercontent\.com\/img\/[^"]*?\/)(s|w)\d+(-h\d+)?(-c)?\//g, '$1s1600/')
    .replace(/<img([^>]*?)\swidth="\d+"([^>]*?)data-original-height="(\d+)"([^>]*?)data-original-width="(\d+)"/gi, '<img$1$2width="$5" height="$3"$4')
    .replace(/<img /gi, '<img loading="lazy" decoding="async" ')
    .replace(/<table/gi, '<div class="prose__table"><table').replace(/<\/table>/gi, '</table></div>');
}

const fmtDate = (iso) => {
  try { return new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Jakarta' }); } catch { return ''; }
};

export async function loadPosts() {
  if (!site.blogUrl) return [];
  try {
    const res = await fetch(`${base()}/feeds/posts/default?alt=json&max-results=100`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return (data.feed.entry || []).map((e) => {
      const url = (e.link.find((l) => l.rel === 'alternate') || {}).href || '';
      const content = (e.content && e.content.$t) || '';
      const thumb = e.media$thumbnail ? e.media$thumbnail.url.replace(/\/s72(-c)?\//, '/s800/') : '';
      return {
        id: postIdOf(e.id.$t), slug: slugOf(url), blogUrl: url,
        title: decode(e.title.$t), date: e.published.$t, updated: e.updated.$t,
        excerpt: strip(content).slice(0, 155).replace(/\s\S*$/, '') + '…',
        html: cleanHtml(content), img: thumb,
        labels: (e.category || []).map((c) => c.term),
      };
    }).filter((p) => p.slug && p.title.trim()); // lewati postingan tanpa judul
  } catch (err) {
    console.warn(`  ⚠ Feed blog tidak bisa diambil (${err.message}); halaman artikel statis dilewati.`);
    return [];
  }
}

export const postHref = (p) => `/blog/${p.slug}/`;

export function postCard(p) {
  return `<a class="blog-card" href="${postHref(p)}">
    ${p.img ? `<img class="blog-card__img" src="${esc(p.img)}" alt="" width="640" height="360" loading="lazy" decoding="async">` : ''}
    <span class="chip">${esc(fmtDate(p.date))}</span>
    <span class="blog-card__title">${esc(p.title)}</span>
    <span class="blog-card__text">${esc(p.excerpt)}</span>
    <span class="blog-card__more">Baca artikel <span aria-hidden="true">→</span></span>
  </a>`;
}

// Grid kartu artikel. data-blog-* dipakai main.js untuk menambah artikel yang terbit setelah build.
export function blogGrid(posts, limit) {
  const list = typeof limit === 'number' ? posts.slice(0, limit) : posts;
  const built = JSON.stringify(posts.map((p) => p.slug));
  const empty = `<div class="blog-card blog-card--cta">
      <span class="chip">Blog AS-ADS</span>
      <span class="blog-card__title">Artikel pertama sedang disiapkan</span>
      <span class="blog-card__text">Tips soal ukuran, bahan, dan persiapan file cetak akan tampil di sini.</span>
    </div>`;
  return `<div class="blog-grid${list.length ? ' is-loaded' : ''}" data-blog-feed="${esc(base())}" data-blog-limit="${limit || 100}" data-blog-built='${esc(built)}' data-reveal>
    ${list.length ? list.map(postCard).join('') : empty}
  </div>`;
}

export function blogSection(posts) {
  if (!site.blogUrl) return '';
  return `<section class="section blog" aria-labelledby="blog-title">
    <div class="container">
      ${sectionHead({ eyebrow: 'Blog', title: 'Tips desain dan cetak, *biar nggak salah langkah.*', id: 'blog-title', intro: 'Panduan singkat soal ukuran, bahan, dan persiapan file sebelum dicetak.' })}
      ${blogGrid(posts, 3)}
      <div class="works__more"><a class="btn btn--outline" href="/blog/">Lihat semua artikel</a></div>
    </div>
  </section>`;
}

export const blogIndexPage = {
  path: '/blog/',
  out: 'blog/index.html',
  active: 'blog',
  title: 'Blog: Tips Desain dan Cetak',
  description: 'Artikel AS-ADS Cetak Desain seputar ukuran banner, bahan cetak, dan cara menyiapkan file desain sebelum dicetak.',
  body: ({ posts }) => `
${pageHero({ eyebrow: 'Blog', title: 'Tips desain dan cetak, *biar nggak salah langkah.*', intro: 'Panduan singkat soal ukuran, bahan, dan persiapan file sebelum dicetak, ditulis dari pengalaman mengerjakan pesanan AS-ADS.' })}
<section class="section blog blog--page" aria-label="Daftar artikel">
  <div class="container">${blogGrid(posts)}</div>
</section>
${closingBox()}
`,
};

// Halaman pembaca untuk artikel yang terbit setelah build terakhir (isi dimuat dari Blogger di browser).
export const blogReaderPage = {
  path: '/blog/baca/',
  out: 'blog/baca/index.html',
  active: 'blog',
  noindex: true,
  title: 'Baca Artikel',
  description: 'Artikel blog AS-ADS Cetak Desain.',
  body: () => `
<article class="post" data-blog-reader="${esc(base())}">
  <div class="container container--post">
    <a class="post__back" href="/blog/">← Semua artikel</a>
    <h1 class="post__title" data-post-title>Memuat artikel…</h1>
    <p class="post__meta" data-post-meta></p>
    <div class="prose" data-post-body><p>Kalau artikel tidak muncul, buka <a href="/blog/">daftar artikel</a>.</p></div>
  </div>
</article>
${closingBox()}
`,
};

export function postPage(p) {
  return {
    path: postHref(p),
    out: `blog/${p.slug}/index.html`,
    active: 'blog',
    title: p.title,
    description: p.excerpt.replace(/…$/, ''),
    article: { published: p.date, modified: p.updated, image: p.img },
    body: () => `
<article class="post">
  <div class="container container--post">
    <a class="post__back" href="/blog/">← Semua artikel</a>
    <h1 class="post__title">${esc(p.title)}</h1>
    <p class="post__meta"><time datetime="${esc(p.date)}">${esc(fmtDate(p.date))}</time> · AS-ADS Cetak Desain</p>
    <div class="prose">${p.html}</div>
  </div>
</article>
${closingBox()}
`,
  };
}
