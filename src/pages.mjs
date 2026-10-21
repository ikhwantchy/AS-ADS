import { site } from '../site.config.mjs';
import { esc, badge, waHref } from './layout.mjs';
import {
  SERVICES, sectionHead, pageHero, marquee, stepCards, serviceCards, portfolioCarousel, portfolioGrid,
  questionRows, closingBox, blogSection,
} from './sections.mjs';

const home = {
  path: '/',
  out: 'index.html',
  active: 'home',
  title: 'Beranda',
  description: 'AS-ADS Cetak Desain membantu kebutuhan desain grafis dan percetakan, dari ide visual sampai hasil yang siap digunakan. Konsultasi langsung via WhatsApp.',
  body: ({ preview }) => `
<section class="hero" aria-labelledby="hero-title">
  <div class="container hero__inner">
    <h1 class="hero__title" id="hero-title" data-split>Ide bagus jangan berhenti di <em>layar.</em></h1>
    <p class="hero__text" data-hero-fade>AS-ADS Cetak Desain membantu kebutuhan desain grafis dan percetakan, dari ide visual sampai hasil yang bisa dipegang.</p>
    <p class="hero__meta" data-hero-fade><span class="hero__dot" aria-hidden="true"></span>Desain Grafis · Percetakan</p>
    <div class="hero__actions" data-hero-fade>
      <a class="btn btn--dark" href="/portofolio/">Jelajahi Karya</a>
      <a class="btn btn--outline" href="/layanan/">Lihat Layanan</a>
    </div>
  </div>
</section>

${marquee()}

<section class="section steps" aria-labelledby="cara-kerja">
  <div class="container">
    ${sectionHead({ eyebrow: 'Cara kerja', title: 'Dari obrolan sampai *hasil jadi.*', id: 'cara-kerja', intro: 'Empat langkah sederhana, semuanya berjalan di satu percakapan.' })}
    ${stepCards()}
  </div>
</section>

<section class="statement" aria-label="Ajakan bercerita">
  <div class="container">
    <p class="statement__text" data-words>Belum yakin mulai dari mana? Ceritakan saja idenya, sesederhana apa pun. Detailnya kita cari <em>bareng-bareng.</em></p>
  </div>
</section>

<section class="section works" aria-labelledby="portofolio-title">
  <div class="container">
    ${sectionHead({ eyebrow: 'Portofolio', title: 'Setiap karya punya *cerita.*', id: 'portofolio-title', intro: 'Lihat pilihan pekerjaan desain dan cetak AS-ADS.' })}
  </div>
  <div class="container container--bleed">${portfolioCarousel({ preview })}</div>
  <div class="container works__more" data-reveal><a class="btn btn--outline" href="/portofolio/">Lihat semua karya</a></div>
</section>

<section class="section services" aria-labelledby="layanan-title">
  <div class="container">
    ${sectionHead({ eyebrow: 'Layanan', title: 'Apa yang bisa kami *bantu?*', id: 'layanan-title', intro: 'Dua kebutuhan kreatif, satu tempat untuk mulai.' })}
    ${serviceCards()}
  </div>
</section>

<section class="section questions" aria-labelledby="obrolan-title">
  <div class="container container--narrow">
    ${sectionHead({ title: 'Obrolan biasanya *mulai dari sini*', id: 'obrolan-title' })}
    ${questionRows()}
  </div>
</section>

${blogSection()}

${closingBox()}
`,
};

const layanan = {
  path: '/layanan/',
  out: 'layanan/index.html',
  active: 'layanan',
  title: 'Layanan Desain Grafis & Percetakan',
  description: 'Layanan desain grafis dan percetakan AS-ADS Cetak Desain. Diskusikan kebutuhan visual dan cetakmu langsung lewat WhatsApp.',
  body: () => `
${pageHero({ eyebrow: 'Layanan', title: 'Satu ide, dua cara *menghidupkannya.*', intro: 'Ada ide yang cukup tampil cantik di layar. Ada juga yang baru terasa nyata setelah bisa dipegang. AS-ADS mengurus keduanya.' })}

<section class="section services services--page" aria-label="Kategori layanan">
  <div class="container">${serviceCards({ withThird: false })}</div>
</section>

<section class="section detail" id="desain-grafis" aria-labelledby="desain-grafis-title">
  <div class="container detail__grid">
    <div class="detail__body" data-reveal>
      ${badge('Visual')}
      <h2 class="section-title section-title--left" id="desain-grafis-title">Desain <em>Grafis</em></h2>
      <p class="section-intro section-intro--left">${esc(SERVICES[0].summary)}</p>
      <div class="note-card">
        <h3 class="note-card__title">Obrolan desain biasanya mulai dari sini</h3>
        <ul>
          ${['Visualnya nanti mau tampil di mana?', 'Sudah ada logo, foto, atau teks yang mau dipakai?', 'Gaya visual seperti apa yang paling kamu banget?', 'Kapan hasilnya mulai dipakai?'].map((t) => `<li>${t}</li>`).join('')}
        </ul>
        <p class="note-card__foot">Belum kepikiran semua? Santai. Jawabannya sering ketemu sambil ngobrol.</p>
      </div>
    </div>
    <figure class="detail__media" data-reveal data-parallax>
      <img src="/assets/img/ilustrasi-desain-grafis.svg" width="640" height="440" loading="lazy" decoding="async" alt="Ilustrasi kurva vektor, palet warna, dan panel desain">
    </figure>
  </div>
</section>

<section class="section detail detail--print" id="percetakan" aria-labelledby="percetakan-title">
  <div class="container">
    <div class="detail__grid detail__grid--reverse">
      <figure class="detail__media" data-reveal data-parallax>
        <img src="/assets/img/ilustrasi-percetakan.svg" width="640" height="440" loading="lazy" decoding="async" alt="Ilustrasi lembar cetak dengan crop mark, tanda registrasi, dan color bar CMYK">
      </figure>
      <div class="detail__body" data-reveal>
        ${badge('Cetak')}
        <h2 class="section-title section-title--left" id="percetakan-title"><em>Percetakan</em></h2>
        <p class="section-intro section-intro--left">${esc(SERVICES[1].summary)}</p>
        <p class="detail__aside">Masih ragu soal bahan atau ukuran? Wajar. Pilihannya bisa dibandingkan bareng sebelum ada yang dicetak.</p>
      </div>
    </div>
    <h3 class="tags-title" data-reveal>Empat pertanyaan sebelum mesin cetak jalan</h3>
    <ol class="tag-grid">
      ${[['Apa', 'Mau cetak apa, dan buat keperluan apa?'], ['Berapa', 'Kira-kira ukurannya berapa, jumlahnya berapa?'], ['File', 'Desainnya sudah siap, atau mau sekalian dibuatkan?'], ['Kapan', 'Kapan hasil cetaknya harus sampai di tangan?']].map(([k, t], i) => `<li class="tag-card" data-reveal style="--i:${i}"><span class="tag-card__num">${String(i + 1).padStart(2, '0')} · ${k}</span><span class="tag-card__text">${t}</span></li>`).join('')}
    </ol>
  </div>
</section>

${closingBox()}
`,
};

const portofolioPage = {
  path: '/portofolio/',
  out: 'portofolio/index.html',
  active: 'portofolio',
  title: 'Portofolio',
  description: 'Pilihan karya desain grafis dan hasil cetak AS-ADS Cetak Desain. Lihat contohnya, lalu diskusikan proyekmu lewat WhatsApp.',
  body: ({ preview }) => `
${pageHero({ eyebrow: 'Portofolio', title: 'Setiap karya punya *cerita.*', intro: 'Lihat pilihan pekerjaan desain dan cetak AS-ADS.' })}
<section class="section works works--page" aria-label="Galeri karya">
  <div class="container">${portfolioGrid({ preview })}</div>
</section>
${closingBox()}
`,
};

const tentang = {
  path: '/tentang/',
  out: 'tentang/index.html',
  active: 'tentang',
  title: 'Tentang AS-ADS',
  description: 'Kenali AS-ADS Cetak Desain, partner kreatif untuk kebutuhan desain grafis dan percetakan, serta cara kerjanya dari konsultasi sampai hasil jadi.',
  body: () => `
${pageHero({ eyebrow: 'Tentang', title: 'Partner kreatif untuk desain dan *cetak.*', intro: 'AS-ADS Cetak Desain membantu individu, organisasi, dan pelaku usaha mewujudkan ide visual, baik di layar maupun dalam bentuk cetak.' })}
<section class="section about" aria-labelledby="pendekatan">
  <div class="container about__grid">
    <h2 class="section-title section-title--left" id="pendekatan" data-reveal>Ide bagus jangan berhenti di <em>layar.</em></h2>
    <div class="about__text" data-reveal>
      <!-- TODO: KONFIRMASI PEMILIK — tambahkan cerita singkat AS-ADS (sejak kapan, siapa di baliknya) bila ingin ditampilkan. -->
      <p>Desain yang baik perlu sampai ke tangan orang yang tepat. Karena itu AS-ADS menangani dua sisi sekaligus: merancang visualnya dan membantu menghadirkannya dalam bentuk cetak.</p>
      <p>Semua dimulai dari percakapan. Tidak perlu akun atau formulir panjang. Cerita lewat WhatsApp, lalu detailnya dibahas bareng.</p>
      <p><a class="text-link" href="/layanan/">Jelajahi layanan AS-ADS</a></p>
    </div>
  </div>
</section>
<section class="section steps" aria-labelledby="cara-kerja">
  <div class="container">
    ${sectionHead({ eyebrow: 'Cara kerja', title: 'Dari obrolan sampai *hasil jadi.*', id: 'cara-kerja' })}
    ${stepCards()}
  </div>
</section>
${closingBox()}
`,
};

const kontak = {
  path: '/kontak/',
  out: 'kontak/index.html',
  active: 'kontak',
  title: 'Kontak',
  description: 'Hubungi AS-ADS Cetak Desain lewat WhatsApp untuk konsultasi desain grafis dan percetakan.',
  body: () => `
${pageHero({ eyebrow: 'Kontak', title: 'Ceritakan kebutuhanmu ke *AS-ADS.*', intro: 'Mau tanya-tanya dulu, minta penawaran, atau langsung pesan? Semuanya cukup lewat satu obrolan WhatsApp.' })}
<section class="section contact" aria-label="Informasi kontak">
  <div class="container contact__grid">
    ${site.whatsappDisplay ? `<a class="contact-card" href="${waHref()}" target="_blank" rel="noopener noreferrer" data-wa-source="kontak-info" data-reveal style="--i:0">
      <span class="contact-card__label">WhatsApp</span>
      <span class="contact-card__value">${esc(site.whatsappDisplay)}</span>
      <span class="contact-card__hint">Konsultasi, penawaran, dan pemesanan</span>
    </a>` : ''}
    ${site.email ? `<a class="contact-card" href="mailto:${esc(site.email)}" data-reveal style="--i:1">
      <span class="contact-card__label">Email</span>
      <span class="contact-card__value">${esc(site.email)}</span>
      <span class="contact-card__hint">Untuk kirim file atau brief tertulis</span>
    </a>` : ''}
    ${site.locationPublic ? `<div class="contact-card" data-reveal style="--i:2">
      <span class="contact-card__label">Workshop</span>
      <span class="contact-card__value contact-card__value--sm">${esc(site.locationPublic)}</span>
    </div>` : ''}
  </div>
</section>
`,
};

const notFound = {
  path: '/404.html',
  out: '404.html',
  active: '',
  noindex: true,
  title: 'Halaman tidak ditemukan',
  description: 'Halaman yang kamu cari tidak ditemukan di website AS-ADS Cetak Desain.',
  body: () => `
${pageHero({ eyebrow: 'Error 404', title: 'Halaman ini *tidak ditemukan.*', intro: 'Alamatnya mungkin salah ketik atau halamannya sudah dipindahkan. Coba lanjut dari salah satu halaman ini:' })}
<div class="container hero__actions hero__actions--404">
  <a class="btn btn--dark" href="/">Kembali ke Beranda</a>
  <a class="btn btn--outline" href="/layanan/">Jelajahi Layanan</a>
  <a class="btn btn--outline" href="/portofolio/">Lihat Karya</a>
</div>
`,
};

export const pages = [home, layanan, portofolioPage, tentang, kontak, notFound];
