# Website AS-ADS Cetak Desain — Versi 2

Versi kedua dengan UI dari Figma “Digital Marketing Agency (Community)”, frame **Landing page** (node `65:183`,
file `ZdbyhgzdfAJ1eBt5qxzuvf`). Versi pertama tetap ada di folder `../site/`.

Konten bisnis (WhatsApp, email, workshop) sama dengan versi 1 dan diatur di `site.config.mjs`.
Bagian Figma yang butuh data yang belum ada (testimoni, tim, penghargaan, logo klien, angka hasil) tidak dipakai
supaya tidak ada klaim karangan. Penggantinya: strip teks berjalan, kartu cara kerja, dan daftar pertanyaan.

## Menjalankan

```bash
npm run dev      # build pratinjau + server lokal di http://localhost:4174 (versi 1 di port 4173)
npm run check    # QA hasil build
npm run build    # build production → dist/
```

## Animasi

- Perpindahan halaman: View Transitions lintas dokumen (Chrome/Edge 126+, Safari 18.2+); header dan latar tetap diam.
- Judul hero muncul kata per kata dengan efek blur.
- Section muncul saat di-scroll; kalimat besar di beranda menyala kata demi kata mengikuti scroll.
- Latar gradien pink–oranye bergerak pelan, strip teks berjalan, parallax ringan pada ilustrasi layanan.
- Semua animasi dimatikan bila pengguna memilih “kurangi gerakan” di sistem operasinya.
"# AS-ADS" 
