# Oleh-Oleh Kopi Gayo Lhokseumawe

## Menjalankan source code

Gunakan Bun versi 1.3 atau lebih baru:

```sh
bun install
bun run dev
```

Untuk produksi, gunakan hosting yang mendukung TanStack Start/Cloudflare Workers dan ikuti konfigurasi Vite dalam proyek. Proyek ini bukan Next.js dan bukan HTML statis.

## Halaman

- `/`: Beranda
- `/tentang`: Cerita brand
- `/katalog`: Filter dan pencarian kopi
- `/katalog/:slug`: Profil produk, kemasan, gilingan, sangrai, jumlah
- `/kemitraan`: Pengajuan mitra dan unduhan katalog PDF
- `/jurnal`: Artikel edukasi
- `/jurnal/:slug`: Artikel lengkap
- `/galeri`: Galeri dengan pembesaran foto
- `/kontak`: Peta, informasi toko, marketplace

Semua halaman mendukung pilihan bahasa Indonesia/Inggris. Formulir menyiapkan pesan WhatsApp tanpa menyimpan data pengunjung.

## Data yang harus dilengkapi sebelum publikasi

`src/lib/content.ts` memusatkan katalog, artikel, dan data bisnis. Isi `business.whatsapp` menggunakan format internasional hanya angka (tanpa +), alamat lengkap, jam buka, email, serta tautan resmi marketplace dan media sosial. Nomor WhatsApp kosong menyebabkan tombol menyiapkan pesan yang dapat disalin, bukan mengirim ke nomor palsu. Peta saat ini menunjukkan kota Lhokseumawe, bukan posisi toko.

Harga, profil rasa, testimoni, serta kemasan adalah contoh. Ganti dengan data produk dan ulasan terverifikasi. Foto di `src/assets` dibuat untuk ilustrasi dan tidak mendokumentasikan kebun atau toko asli. Video belum disertakan karena tidak ada video toko yang diberikan. Katalog PDF menampilkan harga eceran contoh; harga grosir dan minimum pembelian belum tersedia.

CMS pengelolaan, Google Business Profile, statistik ulasan asli, penyimpanan pengajuan, dan konfigurasi domain/hosting tidak diaktifkan. Tidak ada jaminan waktu muat dua detik; ukur kembali pada hosting produksi dan jaringan target.

## Pemeriksaan

```sh
bun run test
```

Source ZIP tidak menyertakan dependensi, keluaran build, metadata Git, atau rahasia. `src/routeTree.gen.ts` dibuat otomatis ketika server atau proses build dijalankan.
