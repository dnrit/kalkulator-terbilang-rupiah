# Kalkulator Terbilang Rupiah

Kalkulator Terbilang Rupiah adalah project static sederhana untuk mengubah angka nominal rupiah menjadi teks terbilang Bahasa Indonesia.

## Fitur

- Convert angka ke terbilang rupiah
- Format input otomatis dengan titik ribuan
- Tombol salin hasil
- Contoh nominal cepat
- Responsive mobile
- Tanpa backend dan database

## Cara Menjalankan Lokal

Buka file `index.html` langsung di browser.

## Deploy ke Cloudflare Pages

1. Upload project ini ke GitHub.
2. Buka Cloudflare Dashboard.
3. Masuk ke Workers & Pages.
4. Pilih Create Application > Pages > Connect to Git.
5. Pilih repository project ini.
6. Framework preset: None.
7. Build command: kosong.
8. Build output directory: `/` atau kosong.
9. Deploy.

## Deploy Drag & Drop

Cloudflare Pages juga bisa deploy static site dengan drag-and-drop folder project.

## Struktur File

```txt
terbilang-rupiah-calculator/
├── index.html
├── style.css
├── script.js
└── README.md
```
