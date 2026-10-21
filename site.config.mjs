// Konfigurasi bisnis. Semua nilai bertanda TODO wajib dikonfirmasi pemilik sebelum production.
// Build production (`npm run build`) akan GAGAL selama ada nilai wajib yang kosong.
export const site = {
  name: 'AS-ADS Cetak Desain',
  shortName: 'AS-ADS',
  url: 'https://as-ads.cetakdesain.biz.id',
  // Blog artikel (Blogger). Menu Blog dan bagian "Artikel terbaru" di Beranda mengarah ke sini.
  blogUrl: 'https://asads-cetakdesain.blogspot.com',
  // Platform blog untuk menarik artikel terbaru: 'blogger' (feed JSONP) atau 'wordpress' (REST API /wp-json).
  blogPlatform: 'blogger',
  lang: 'id',
  locale: 'id_ID',
  tagline: 'Partner kreatif untuk kebutuhan desain dan cetak.',

  // TODO: KONFIRMASI PEMILIK — nomor WhatsApp resmi, format internasional tanpa "+", spasi, atau tanda baca.
  // Contoh format: '6281234567890'. Wajib diisi untuk production.
  whatsappNumber: '6287809078359',
  // Tampilan nomor di footer/kontak, mis. '0812-3456-7890'. Kosongkan bila tidak ingin ditampilkan.
  whatsappDisplay: '0878-0907-8359',

  // TODO: KONFIRMASI PEMILIK — lokasi umum (bukan alamat lengkap), mis. 'Kalisuren, Bogor'. Kosong = tidak ditampilkan.
  locationPublic: 'Jabon Mekar Parung · Ciputat · Kebayoran Lama',
  // TODO: KONFIRMASI PEMILIK — email bisnis. Kosong = tidak ditampilkan.
  email: 'halo@cetakdesain.biz.id',
  // TODO: KONFIRMASI PEMILIK — URL profil sosial resmi. Kosong = ikon tidak ditampilkan.
  social: { instagram: '', facebook: '' },

  // Pesan pembuka WhatsApp per konteks (PRD §10).
  messages: {
    general: 'Halo AS-ADS Cetak Desain, saya ingin konsultasi mengenai layanan desain/percetakan. Boleh saya jelaskan kebutuhan saya?',
    design: 'Halo AS-ADS Cetak Desain, saya ingin konsultasi mengenai layanan desain grafis. Boleh saya jelaskan kebutuhan saya?',
    print: 'Halo AS-ADS Cetak Desain, saya ingin konsultasi mengenai layanan percetakan. Boleh saya jelaskan kebutuhan saya?',
    portfolio: 'Halo AS-ADS Cetak Desain, saya sudah melihat portofolio di website dan ingin mendiskusikan proyek saya. Boleh saya jelaskan kebutuhan saya?',
  },
};
