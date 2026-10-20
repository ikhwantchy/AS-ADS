# Content inventory & catatan implementasi

## TODO: KONFIRMASI PEMILIK (wajib sebelum production)

| Item | Lokasi | Status |
|---|---|---|
| Nomor WhatsApp resmi | `site.config.mjs` → `whatsappNumber`, `whatsappDisplay` | Kosong — build production diblokir |
| Logo resolusi tinggi | Header & footer saat ini memakai wordmark teks “AS-ADS”, seperti slot “Logo Company” di Figma | Belum ada file logo |
| Warna merah brand | `--red` di `main.css` memakai `#B72832` (PRD) | Validasi terhadap logo |
| Favicon | `scripts/build.mjs` membuat kotak merah polos | Ganti dengan turunan logo |
| Portofolio asli + izin publikasi | `content/portfolio.mjs` | Kosong — production menampilkan empty state + CTA WA |
| Lokasi umum (mis. Kalisuren, Bogor) | `site.config.mjs` → `locationPublic` | Tidak ditampilkan sampai diisi |
| Email, akun sosial | `site.config.mjs` | Tidak ditampilkan sampai diisi |
| Proses kerja 4 langkah | `src/sections.mjs` → `STEPS` | Sesuaikan dengan proses nyata |
| Cerita singkat AS-ADS | `src/pages.mjs` → halaman Tentang | Opsional |
| Sublayanan desain/percetakan | Belum dicantumkan sesuai PRD §7.3 | Halaman `/layanan/desain-grafis/` & `/layanan/percetakan/` dibuat setelah ada daftar sublayanan agar tidak jadi halaman tipis |
| Gambar Open Graph | Belum ada `og:image` | Tambahkan setelah ada foto asli |

## Penyesuaian dari Figma (beserta alasannya)

| Bagian Figma | Implementasi | Alasan |
|---|---|---|
| Hero “Digital Marketing Agency Surabaya” + blok 01/3 | Copy PRD; blok 01/3 jadi penghitung 3 sorotan dengan tombol ←/→ (tanpa autoplay) | Konten PRD; aksesibilitas |
| Nav Beranda/Program/Tentang Kami/Blog/Kontak Kami | Beranda/Layanan/Portofolio/Tentang/Kontak + tombol WA | PRD §7.1; artikel opsional |
| 8 kartu layanan “Creative Marketing…” | 2 kategori seimbang + 1 kartu “Masih mencari arah?” | PRD §7.3, FR-03, jangan mengarang sublayanan |
| Grid 3×3 gambar | Grid portofolio dari data; gambar Figma hanya di pratinjau berlabel | PRD §7.4 — itu bukan karya AS-ADS |
| Testimoni + bintang | Section “Cara kerja” 4 langkah dengan layout kartu kaca yang sama | PRD melarang testimoni fiktif |
| Logo klien | CTA penutup “Punya ide yang ingin diwujudkan?” | PRD melarang logo klien tanpa izin |
| Footer: alamat/email/telepon contoh, daftar program, sosial | Hanya data dari config yang sudah dikonfirmasi | PRD §7.7 |
| Merah `#E20044` | `#B72832` (PRD); teks merah kecil `#E8646C` | PRD §5; kontras WCAG AA |
| Hijau WA `#00AD30` | `#00852A` | Teks putih 20px pada #00AD30 hanya ±3:1 |
| Teks deskripsi 11–12px | 14px | Keterbacaan |
| Tidak ada frame mobile di Figma | Layout responsif 3→2→1 kolom, menu ringkas | PRD §5.8 |

## Aset Figma

Jaringan sandbox tempat website ini dibuat tidak bisa mengakses figma.com, sehingga aset belum terunduh.
Jalankan `scripts/fetch-figma-assets.sh` (URL berlaku ±7 hari sejak 20 Okt 2026) atau ekspor manual dari node yang
tercantum di skrip. Sampai itu dilakukan: latar hero/cara kerja/footer jatuh ke warna gelap, ikon disembunyikan otomatis.
Latar hero, cara kerja, footer, dan ilustrasi Layanan memakai SVG orisinal bertema cetak di src/assets/img/ (halftone, crop mark, tanda registrasi, color bar CMYK, cutting mat) — bukan foto stok, dan tidak diklaim sebagai karya. Aset Figma yang masih dipakai hanya ikon dan contoh tata letak portofolio (pratinjau).
