(() => {
  document.documentElement.classList.add('js');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Header: menyusut sedikit setelah halaman di-scroll.
  const header = document.querySelector('[data-header]');
  const onScrollHeader = () => header && header.classList.toggle('is-scrolled', window.scrollY > 24);

  // Menu mobile
  const toggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-nav]');
  if (toggle && nav) {
    const setOpen = (open) => {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.querySelector('.visually-hidden').textContent = open ? 'Tutup menu' : 'Buka menu';
    };
    toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { setOpen(false); toggle.focus(); }
    });
    nav.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
  }

  // Pecah teks jadi kata. Elemen <em> dipertahankan sebagai satu kata bergaya serif.
  const splitWords = (el, cls) => {
    const out = [];
    [...el.childNodes].forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        node.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) { out.push(document.createTextNode(part)); return; }
          const span = document.createElement('span');
          span.className = cls; span.textContent = part; out.push(span);
        });
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        node.classList.add(cls); out.push(node);
      }
    });
    el.replaceChildren(...out);
    return el.querySelectorAll('.' + cls);
  };

  if (!reduce) {
    document.querySelectorAll('[data-split]').forEach((el) => {
      el.setAttribute('aria-label', el.textContent.trim());
      splitWords(el, 'w').forEach((w, i) => { w.style.setProperty('--w', i); w.setAttribute('aria-hidden', 'true'); });
    });
    document.querySelectorAll('[data-hero-fade]').forEach((el, i) => el.style.setProperty('--d', `${0.55 + i * 0.12}s`));
  }

  // Muncul saat di-scroll. Setelah selesai, atribut dilepas supaya efek hover kartu berjalan normal.
  const revealEls = [...document.querySelectorAll('[data-reveal]')];
  if (reduce || !('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.removeAttribute('data-reveal'));
  } else {
    const finish = (el) => setTimeout(() => { el.removeAttribute('data-reveal'); el.classList.remove('is-in'); }, 1300);
    const io = new IntersectionObserver((entries) => entries.forEach((en) => {
      // Elemen yang sudah terlewati (scroll cepat / lompat anchor) ikut ditampilkan.
      if (!en.isIntersecting && en.boundingClientRect.top > 0) return;
      en.target.classList.add('is-in');
      io.unobserve(en.target);
      finish(en.target);
    }), { rootMargin: '0px 0px -10% 0px', threshold: 0 });
    revealEls.forEach((el) => io.observe(el));
  }

  // Kalimat besar: kata menyala bertahap mengikuti posisi scroll (Figma "Not sure where to start").
  const wordBlocks = reduce ? [] : [...document.querySelectorAll('[data-words]')].map((el) => {
    el.setAttribute('aria-label', el.textContent.trim());
    const words = [...splitWords(el, 'word')];
    words.forEach((w) => w.setAttribute('aria-hidden', 'true'));
    return { el, words };
  });

  // Parallax halus untuk ilustrasi.
  const parallaxEls = reduce ? [] : [...document.querySelectorAll('[data-parallax]')];

  let ticking = false;
  const frame = () => {
    ticking = false;
    onScrollHeader();
    const vh = window.innerHeight;
    wordBlocks.forEach(({ el, words }) => {
      const r = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.35)));
      const lit = p * words.length;
      words.forEach((w, i) => { w.style.opacity = String(Math.min(1, Math.max(0.18, lit - i + 0.18))); });
    });
    parallaxEls.forEach((el) => {
      const r = el.getBoundingClientRect();
      const offset = (r.top + r.height / 2 - vh / 2) / vh;
      el.style.translate = `0 ${(offset * -28).toFixed(1)}px`;
    });
  };
  const requestFrame = () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } };
  window.addEventListener('scroll', requestFrame, { passive: true });
  window.addEventListener('resize', requestFrame);
  frame();

  // Carousel portofolio
  document.querySelectorAll('[data-carousel]').forEach((car) => {
    const track = car.querySelector('[data-carousel-track]');
    const prev = car.querySelector('[data-carousel-prev]');
    const next = car.querySelector('[data-carousel-next]');
    const step = () => (track.firstElementChild ? track.firstElementChild.getBoundingClientRect().width + 24 : track.clientWidth);
    const update = () => {
      prev.disabled = track.scrollLeft <= 4;
      next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
    };
    prev.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: reduce ? 'auto' : 'smooth' }));
    next.addEventListener('click', () => track.scrollBy({ left: step(), behavior: reduce ? 'auto' : 'smooth' }));
    track.addEventListener('scroll', update, { passive: true });
    update();
  });

  // Filter portofolio
  const grid = document.querySelector('[data-work-grid]');
  const buttons = document.querySelectorAll('[data-filter]');
  if (grid && buttons.length) {
    buttons.forEach((btn) => btn.addEventListener('click', () => {
      const f = btn.dataset.filter;
      buttons.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      grid.querySelectorAll('[data-category]').forEach((card, i) => {
        const show = f === 'semua' || card.dataset.category === f;
        card.hidden = !show;
        card.classList.remove('is-filtered-in');
        if (show && !reduce) { void card.offsetWidth; card.style.animationDelay = `${(i % 3) * 60}ms`; card.classList.add('is-filtered-in'); }
      });
    }));
  }

  // Event whatsapp_click (PRD §9.9): hanya label sumber & halaman. Tidak mengirim nomor/isi pesan.
  document.addEventListener('click', (e) => {
    const link = e.target.closest('[data-wa-source]');
    if (!link) return;
    const payload = { source: link.dataset.waSource, page_path: location.pathname };
    if (typeof window.gtag === 'function') window.gtag('event', 'whatsapp_click', payload);
    else if (Array.isArray(window.dataLayer)) window.dataLayer.push({ event: 'whatsapp_click', ...payload });
  });
})();
