import { site } from '../site.config.mjs';

export const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function waHref(messageKey = 'general') {
  const text = encodeURIComponent(site.messages[messageKey] || site.messages.general);
  return `https://wa.me/${site.whatsappNumber}?text=${text}`;
}

const WA_ICON = '<svg class="btn__icon" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z"/></svg>';

// Satu-satunya tombol WhatsApp ada di header. `source` dipakai untuk event analytics whatsapp_click.
export function waButton({ label, message = 'general', source, size = '' }) {
  return `<a class="btn btn--dark${size ? ` btn--${size}` : ''}" href="${waHref(message)}" target="_blank" rel="noopener noreferrer" data-wa-source="${esc(source)}">
    ${WA_ICON}<span>${esc(label)}</span><span class="visually-hidden"> (membuka WhatsApp di tab baru)</span>
  </a>`;
}

export const NAV = [
  { href: '/', label: 'Beranda', key: 'home' },
  { href: '/layanan/', label: 'Layanan', key: 'layanan' },
  { href: '/portofolio/', label: 'Portofolio', key: 'portofolio' },
  { href: '/tentang/', label: 'Tentang', key: 'tentang' },
  { href: '/kontak/', label: 'Kontak', key: 'kontak' },
];

function header(active) {
  const links = NAV.map(
    (n) => `<li><a href="${n.href}"${n.key === active ? ' aria-current="page"' : ''}>${n.label}</a></li>`
  ).join('');
  return `<header class="site-header" data-header>
  <div class="nav-pill">
    <a class="brand" href="/" aria-label="${esc(site.name)}, ke beranda"><img src="/assets/img/logo-as-ads-dark.webp" width="91" height="36" alt="AS-ADS"></a>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" data-nav-toggle>
      <span class="nav-toggle__bars" aria-hidden="true"></span><span class="visually-hidden">Buka menu</span>
    </button>
    <nav class="site-nav" id="site-nav" aria-label="Navigasi utama" data-nav>
      <ul>${links}</ul>
      ${waButton({ label: 'Konsultasi via WhatsApp', source: 'header', size: 'sm' })}
    </nav>
  </div>
</header>`;
}

function footer() {
  const year = new Date().getFullYear();
  const contact = [
    site.whatsappDisplay && `<li><span>WhatsApp</span><a href="${waHref()}" target="_blank" rel="noopener noreferrer" data-wa-source="footer-contact">${esc(site.whatsappDisplay)}</a></li>`,
    site.email && `<li><span>Email</span><a href="mailto:${esc(site.email)}">${esc(site.email)}</a></li>`,
    site.locationPublic && `<li><span>Workshop</span>${esc(site.locationPublic)}</li>`,
  ].filter(Boolean);
  return `<footer class="site-footer">
  <div class="container site-footer__grid">
    <div class="site-footer__about">
      <a class="footer-logo" href="/" aria-label="${esc(site.name)}, ke beranda"><img src="/assets/img/logo-as-ads.webp" width="152" height="60" alt="AS-ADS" loading="lazy" decoding="async"></a>
      <p>${esc(site.tagline)}</p>
      <ul class="footer-contact">${contact.join('')}</ul>
    </div>
    <div class="site-footer__links">
      <div>
        <h2 class="footer-title">Halaman</h2>
        <ul>${NAV.map((n) => `<li><a href="${n.href}">${n.label}</a></li>`).join('')}</ul>
      </div>
      <div>
        <h2 class="footer-title">Layanan</h2>
        <ul>
          <li><a href="/layanan/#desain-grafis">Desain Grafis</a></li>
          <li><a href="/layanan/#percetakan">Percetakan</a></li>
        </ul>
      </div>
    </div>
  </div>
  <div class="container site-footer__bottom">
    <p>© ${year} ${esc(site.name)}. Hak cipta dilindungi.</p>
  </div>
</footer>`;
}

export function page({ path, title, description, active, body, noindex = false, preview = false }) {
  const canonical = site.url + path;
  const fullTitle = path === '/' ? `${site.name} | Desain Grafis & Percetakan` : `${title} | ${site.name}`;
  const jsonLd = path === '/'
    ? `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'Organization', name: site.name, url: site.url + '/', email: site.email || undefined, telephone: site.whatsappNumber ? '+' + site.whatsappNumber : undefined })}</script>`
    : '';
  return `<!doctype html>
<html lang="${site.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(description)}">
${noindex || preview ? '<meta name="robots" content="noindex">' : ''}
${path === '/404.html' ? '' : `<link rel="canonical" href="${canonical}">`}
<meta property="og:type" content="website">
<meta property="og:locale" content="${site.locale}">
<meta property="og:site_name" content="${esc(site.name)}">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta name="twitter:card" content="summary">
<meta name="theme-color" content="#fefae0">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Instrument+Serif:ital@0;1&display=swap">
<link rel="stylesheet" href="/assets/css/main.css">
${jsonLd}
</head>
<body${preview ? ' class="is-preview"' : ''}>
<a class="skip-link" href="#konten">Lewati ke konten utama</a>
${preview ? '<div class="preview-bar" role="note">Mode pratinjau: gambar bertanda “Ganti dengan portofolio AS-ADS” masih contoh. Jangan dipublikasikan.</div>' : ''}
<div class="bg-blobs" aria-hidden="true"><span class="blob blob--1"></span><span class="blob blob--2"></span><span class="blob blob--3"></span></div>
${header(active)}
<main id="konten">
${body}
</main>
${footer()}
<script src="/assets/js/main.js" defer></script>
</body>
</html>`;
}

// Judul dengan satu kata/frasa bergaya serif miring, seperti di Figma ("What we *do!*").
// `title` boleh memuat *teks* untuk bagian miring.
export const fancy = (title) => esc(title).replace(/\*(.+?)\*/g, '<em>$1</em>');

export const badge = (text) => `<span class="badge">${esc(text)}</span>`;

export const sectionHead = ({ eyebrow, title, intro = '', tag = 'h2', id = '' }) =>
  `<div class="section-head" data-reveal>
    ${eyebrow ? badge(eyebrow) : ''}
    <${tag} class="section-title"${id ? ` id="${id}"` : ''}>${fancy(title)}</${tag}>
    ${intro ? `<p class="section-intro">${esc(intro)}</p>` : ''}
  </div>`;
