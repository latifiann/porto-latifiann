# Portofolio Latifian Iman

Situs portofolio statis Latifian Iman, Mobile Developer. Dibangun menggunakan HTML, CSS, dan JavaScript tanpa build system.

## Menjalankan secara lokal

Jalankan static server dari direktori proyek:

```bash
python3 -m http.server 4173
```

Buka `http://127.0.0.1:4173`.

## Struktur

- `index.html`: konten dan metadata halaman utama.
- `projects/`: halaman case study untuk proyek dengan showcase lengkap.
- `assets/css/style.css`: tampilan responsif dan aksesibilitas visual.
- `assets/css/project-detail.css`: layout shared untuk halaman case study.
- `assets/js/script.js`: navigasi hash, filter proyek, sidebar, dan validasi form.
- `assets/images/`: ikon, gambar proyek, dan foto profil.

## Data

Konten awal disusun dari `../cv-latifian/cv-latifianiman-master.md`. Hanya bagian CV final yang digunakan. Draft, catatan verifikasi, dan daftar sumber internal tidak dipublikasikan.

## Detail proyek

- FMS-CREATE tersedia pada `projects/fms-create.html`.
- ReMi Mobile tersedia pada `projects/remi-mobile.html`.
- Semina tersedia pada `projects/semina.html`.
- ReMi Web App tersedia pada `projects/remi-web.html`.
- Mooda App tersedia pada `projects/mooda.html`.
- NKRI tersedia pada `projects/nkri.html`.
- Showcase FMS-CREATE memakai satu gambar utama.
- Showcase ReMi Mobile memuat video promosi YouTube dan gambar cover.
- Showcase Semina, ReMi Web App, Mooda App, dan NKRI masing-masing memakai satu gambar utama.

## Status sementara

- Tombol unduh CV menunggu PDF publik.
- Form kontak belum terhubung ke backend. UI tidak menyatakan pesan berhasil terkirim.
- Internasionalisasi Indonesia/Inggris belum diterapkan.

## Mengganti aset

Cover proyek berada di `assets/images/projects/`. Pertahankan rasio sekitar `8:5` dan tambahkan teks alternatif yang menjelaskan isi gambar.

Media showcase dapat diperbarui melalui elemen `<img>` atau `<iframe>` pada halaman proyek terkait. Video tidak memakai autoplay.

## Lisensi

Turunan dari [vCard Personal Portfolio](https://github.com/codewithsadee/vcard-personal-portfolio) oleh codewithsadee. Lisensi MIT asli tersedia pada `LICENSE`.
