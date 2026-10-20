// Sumber data portofolio. Tambahkan HANYA karya asli AS-ADS yang sudah mendapat izin publikasi.
// Simpan gambar di src/assets/portfolio/ (nama file deskriptif, mis. desain-brosur-umkm-kuliner.webp).
//
// Bentuk item:
// { title, category: 'desain-grafis' | 'percetakan', description, image: '/assets/portfolio/xxx.webp',
//   width, height, alt }
export const portfolio = [
  // TODO: KONFIRMASI PEMILIK — isi dengan portofolio asli AS-ADS.
];

// Contoh tata letak dari file Figma. HANYA dirender pada build preview (npm run dev / build:preview)
// dengan label "Ganti dengan portofolio AS-ADS". Tidak pernah ikut ke build production.
export const layoutSamples = [
  { title: 'Ganti dengan portofolio AS-ADS', category: 'desain-grafis', image: '/assets/figma/sample-1.png' },
  { title: 'Ganti dengan portofolio AS-ADS', category: 'percetakan', image: '/assets/figma/sample-2.png' },
  { title: 'Ganti dengan portofolio AS-ADS', category: 'desain-grafis', image: '/assets/figma/sample-3.png' },
  { title: 'Ganti dengan portofolio AS-ADS', category: 'percetakan', image: '/assets/figma/sample-1.png' },
  { title: 'Ganti dengan portofolio AS-ADS', category: 'desain-grafis', image: '/assets/figma/sample-2.png' },
  { title: 'Ganti dengan portofolio AS-ADS', category: 'percetakan', image: '/assets/figma/sample-3.png' },
];

export const categories = {
  'desain-grafis': 'Desain Grafis',
  percetakan: 'Percetakan',
};
