import { site } from '../site.config.mjs';
import { esc, fancy, badge, sectionHead, waHref } from './layout.mjs';
import { portfolio, layoutSamples, categories } from '../content/portfolio.mjs';

export const SERVICES = [
  {
    id: 'desain-grafis',
    title: 'Desain Grafis',
    summary: 'Punya pesan yang ingin sampai ke orang yang tepat? Di sini pesan itu diolah jadi visual yang enak dilihat dan gampang diingat.',
  },
  {
    id: 'percetakan',
    title: 'Percetakan',
    summary: 'Desain yang sudah jadi layak keluar dari layar. Ukuran, bahan, dan jumlahnya dibahas bareng sampai pas, baru masuk mesin cetak.',
  },
];

// TODO: KONFIRMASI PEMILIK — sesuaikan langkah dengan proses kerja AS-ADS yang sebenarnya.
export const STEPS = [
  { title: 'Ngobrol dulu', text: 'Cerita soal tujuan, pesan, dan gambaran yang kamu punya. Belum lengkap pun tidak apa-apa.' },
  { title: 'Cari bentuknya', text: 'Kebutuhanmu diterjemahkan jadi arah desain, rencana cetak, atau dua-duanya.' },
  { title: 'Cek detail', text: 'Ukuran, bahan, jumlah, dan hal teknis lain dicek bersama sebelum dikerjakan.' },
  { title: 'Jadi nyata', text: 'Semua koordinasi berjalan di satu obrolan WhatsApp, jadi mudah ditelusuri kembali.' },
];

export const QUESTIONS = [
  { tag: 'Desain', q: 'Visualnya nanti mau tampil di mana?' },
  { tag: 'Desain', q: 'Gaya visual seperti apa yang paling kamu banget?' },
  { tag: 'Cetak', q: 'Mau cetak apa, ukurannya berapa, jumlahnya berapa?' },
  { tag: 'Cetak', q: 'Desainnya sudah siap, atau mau sekalian dibuatkan?' },
];

export function pageHero({ eyebrow, title, intro, tag = 'h1' }) {
  return `<section class="page-hero">
    <div class="container page-hero__inner">
      ${badge(eyebrow)}
      <${tag} class="page-hero__title" data-split>${fancy(title)}</${tag}>
      ${intro ? `<p class="page-hero__intro" data-hero-fade>${esc(intro)}</p>` : ''}
    </div>
  </section>`;
}

export function marquee() {
  const words = ['Desain Grafis', 'Percetakan', 'Dari ide', 'Sampai jadi', 'Kreatif aja'];
  const row = words.map((w, i) => `<span class="marquee__item${i % 2 ? ' marquee__item--serif' : ''}">${w}</span><span class="marquee__dot" aria-hidden="true">✦</span>`).join('');
  return `<section class="marquee" aria-label="Yang dikerjakan AS-ADS: desain grafis dan percetakan">
    <p class="marquee__label">Desain dan cetak dalam satu alur</p>
    <div class="marquee__track" aria-hidden="true"><div class="marquee__row">${row}${row}</div></div>
  </section>`;
}

export function stepCards() {
  return `<ol class="step-list">
    ${STEPS.map((s, i) => `<li class="step-card" data-reveal style="--i:${i}">
      <div class="step-card__inner">
        <span class="step-card__num">${String(i + 1).padStart(2, '0')}</span>
        <h3 class="step-card__title">${s.title}</h3>
        <p class="step-card__text">${s.text}</p>
      </div>
    </li>`).join('')}
  </ol>`;
}

export function serviceCards({ withThird = true } = {}) {
  const cards = SERVICES.map((s, i) => `<article class="svc-card svc-card--${s.id}" data-reveal style="--i:${i}">
      <span class="svc-card__glow" aria-hidden="true"></span>
      <h3 class="svc-card__title">${s.title}</h3>
      <p class="svc-card__text">${esc(s.summary)}</p>
      <a class="svc-card__link" href="/layanan/#${s.id}">Lihat layanan ${s.title.toLowerCase()} <span aria-hidden="true">→</span></a>
    </article>`);
  if (withThird) {
    cards.push(`<article class="svc-card svc-card--wide" data-reveal style="--i:2">
      <span class="svc-card__glow" aria-hidden="true"></span>
      <span class="svc-card__glow svc-card__glow--2" aria-hidden="true"></span>
      <h3 class="svc-card__title">Masih mencari <em>arah?</em></h3>
      <p class="svc-card__text">Belum yakin butuh desain, cetak, atau dua-duanya? Tidak apa-apa. Banyak proyek seru berawal dari ide yang masih setengah jadi.</p>
    </article>`);
  }
  return `<div class="svc-grid">${cards.join('')}</div>`;
}

export function portfolioItems({ preview, limit }) {
  const real = portfolio.map((p) => ({ ...p, sample: false }));
  const items = real.length ? real : preview ? layoutSamples.map((p) => ({ ...p, sample: true })) : [];
  return typeof limit === 'number' ? items.slice(0, limit) : items;
}

const workCard = (p, i) => `<li class="work-card${p.sample ? ' work-card--sample' : ''}" data-category="${p.category}">
  <figure>
    <div class="work-card__media">
      <img src="${p.image}" width="${p.width || 666}" height="${p.height || 666}" alt="${esc(p.sample ? '' : p.alt)}" loading="${i < 3 ? 'eager' : 'lazy'}" decoding="async">
      ${p.sample ? '<span class="sample-badge">Ganti dengan portofolio AS-ADS</span>' : ''}
    </div>
    <figcaption>
      <span class="chip">${categories[p.category]}</span>
      <span class="work-card__title">${esc(p.title)}</span>
      ${p.description ? `<span class="work-card__desc">${esc(p.description)}</span>` : ''}
    </figcaption>
  </figure>
</li>`;

const emptyWorks = () => `<div class="empty-state" data-reveal>
  <p class="empty-state__title">Portofolio sedang kami siapkan.</p>
  <p>Ingin melihat contoh pekerjaan yang mirip dengan kebutuhanmu? Tanyakan lewat WhatsApp di ${esc(site.whatsappDisplay)}.</p>
</div>`;

// Carousel geser (Figma "Results"): scroll-snap native + tombol panah.
export function portfolioCarousel({ preview }) {
  const items = portfolioItems({ preview, limit: 9 });
  if (!items.length) return emptyWorks();
  return `<div class="carousel" data-carousel data-reveal>
    <ul class="carousel__track" data-carousel-track>${items.map(workCard).join('')}</ul>
    <div class="carousel__nav">
      <button type="button" class="round-btn" data-carousel-prev aria-label="Karya sebelumnya">←</button>
      <button type="button" class="round-btn" data-carousel-next aria-label="Karya berikutnya">→</button>
    </div>
  </div>`;
}

export function portfolioGrid({ preview }) {
  const items = portfolioItems({ preview });
  if (!items.length) return emptyWorks();
  const cats = [...new Set(items.map((i) => i.category))];
  const filter = items.length >= 6 && cats.length > 1
    ? `<div class="filter" role="group" aria-label="Filter kategori portofolio" data-reveal>
        <button type="button" class="filter__btn" aria-pressed="true" data-filter="semua">Semua</button>
        ${cats.map((c) => `<button type="button" class="filter__btn" aria-pressed="false" data-filter="${c}">${categories[c]}</button>`).join('')}
      </div>`
    : '';
  return `${filter}<ul class="work-grid" data-work-grid>${items.map((p, i) => workCard(p, i).replace('class="work-card', `data-reveal style="--i:${i % 3}" class="work-card`)).join('')}</ul>`;
}

// Baris ala daftar "Awards" di Figma: nomor, pertanyaan, label.
export function questionRows() {
  return `<ol class="q-list">
    ${QUESTIONS.map((r, i) => `<li class="q-row" data-reveal>
      <span class="q-row__num">${String(i + 1).padStart(2, '0')}</span>
      <span class="q-row__text">${r.q}</span>
      <span class="chip chip--outline">${r.tag}</span>
    </li>`).join('')}
  </ol>`;
}

// Kotak penutup (Figma "Ready to scale"). Tanpa tombol: kontak tampil sebagai teks/tautan biasa.
export function closingBox() {
  return `<section class="closing" aria-labelledby="penutup-title">
    <div class="container">
      <div class="closing__box" data-reveal>
        <h2 class="closing__title" id="penutup-title">Siap bikin idemu <em>jadi nyata?</em></h2>
        <p class="closing__text">Ceritakan kebutuhanmu lewat WhatsApp. Belum rapi juga tidak apa-apa, detailnya bisa dicari bareng.</p>
        <ul class="closing__contact">
          ${site.whatsappDisplay ? `<li><a href="${waHref()}" target="_blank" rel="noopener noreferrer" data-wa-source="closing">WhatsApp ${esc(site.whatsappDisplay)}</a></li>` : ''}
          ${site.email ? `<li><a href="mailto:${esc(site.email)}">${esc(site.email)}</a></li>` : ''}
        </ul>
      </div>
    </div>
  </section>`;
}

// Artikel terbaru dari Blogger. Isi diambil di browser lewat feed JSONP Blogger (main.js);
// tanpa JS atau bila feed gagal/kosong, kartu ajakan ke blog tetap tampil.
export function blogSection() {
  if (!site.blogUrl) return '';
  return `<section class="section blog" aria-labelledby="blog-title">
    <div class="container">
      ${sectionHead({ eyebrow: 'Blog', title: 'Tips desain dan cetak, *biar nggak salah langkah.*', id: 'blog-title', intro: 'Panduan singkat soal ukuran, bahan, dan persiapan file sebelum dicetak.' })}
      <div class="blog-grid" data-blog-feed="${esc(site.blogUrl)}" data-blog-platform="${esc(site.blogPlatform || 'blogger')}" data-reveal>
        <a class="blog-card blog-card--cta" href="${esc(site.blogUrl)}/">
          <span class="chip">Blog AS-ADS</span>
          <span class="blog-card__title">Baca artikel terbaru di blog AS-ADS</span>
          <span class="blog-card__more">Kunjungi blog <span aria-hidden="true">→</span></span>
        </a>
      </div>
      <div class="works__more"><a class="btn btn--outline" href="${esc(site.blogUrl)}/">Lihat semua artikel</a></div>
    </div>
  </section>`;
}

export { sectionHead };
