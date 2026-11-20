# dzikri. — Portfolio

Portofolio pribadi **Laksamana Dzikri Al Jauzi** — Full Stack Developer & Edge AI Engineer.
Warna utama tosca/mint, tema terang dan gelap, dengan admin dashboard untuk mengelola semua isinya.

## Tech stack

| Layer | Pilihan |
| --- | --- |
| Framework | Next.js 16 (App Router, Cache Components) + React 19 + TypeScript |
| Styling | Tailwind CSS v4 dengan design token di `src/app/globals.css` |
| Animasi | Motion (`motion/react`) |
| Ikon | lucide-react + react-icons (Simple Icons untuk logo teknologi) |
| Font | Plus Jakarta Sans + JetBrains Mono via `next/font` |
| Database | PostgreSQL + Prisma 7 (adapter `pg`) — cocok dengan Neon |
| Login admin | Satu password admin, sesi cookie bertanda tangan (JWT via `jose`) |
| Validasi | Zod, dipakai bersama oleh form admin dan server |
| AI assistant | Claude API (`@anthropic-ai/sdk`) di `/api/chat`, dengan jawaban bawaan sebagai cadangan |

## Halaman

| Alamat | Isi |
| --- | --- |
| `/` | Hero, angka sorotan, About, Experience, Tech Stack, Selected Works, Contact |
| `/projects` | Semua project, dengan filter kategori |
| `/projects/[slug]` | Case study satu project: overview, masalah, solusi, fitur, angka hasil, galeri, tech stack, link demo dan GitHub |
| `/admin` | Dashboard admin (perlu login) |

## Menjalankan di komputer sendiri

```bash
npm install
```

```bash
cp .env.example .env
```

Isi `.env` (lihat bagian berikutnya), lalu:

```bash
npm run dev
```

Tanpa `DATABASE_URL`, website tetap jalan dengan konten bawaan dari `src/data/defaults.ts`, tetapi admin tidak bisa menyimpan perubahan.

## Mengaktifkan admin dashboard

Butuh tiga environment variable:

| Variable | Isi |
| --- | --- |
| `DATABASE_URL` | Connection string PostgreSQL. Database gratis dari [Neon](https://neon.tech) sudah cukup. |
| `ADMIN_PASSWORD` | Password untuk `/admin/login`, minimal 12 karakter. |
| `AUTH_SECRET` | String acak minimal 32 karakter untuk menandatangani sesi. Buat dengan `openssl rand -base64 32`. |

Langkahnya di Vercel:

1. Buat database (Storage → Neon, atau langsung di neon.tech) dan pastikan `DATABASE_URL` terisi.
2. Tambahkan `ADMIN_PASSWORD` dan `AUTH_SECRET` di Settings → Environment Variables.
3. Deploy ulang. Saat build, tabel database dibuat otomatis (`prisma migrate deploy`).
4. Buka `/admin/login` dan masuk. Pada login pertama, konten bawaan otomatis disalin ke database.

Setelah itu semua perubahan dilakukan dari `/admin` dan langsung tampil di website tanpa deploy ulang.

### Yang bisa dikelola

- **Profile** — nama, peran, intro, foto, CV, link GitHub/LinkedIn, badge ketersediaan, About, detail pribadi, angka sorotan, teks berjalan.
- **Projects** — tambah, edit, hapus, urutkan, sembunyikan (draft), tandai *featured*. Tiap project punya halaman case study sendiri, dengan cover, galeri screenshot, fitur, angka hasil, link demo dan GitHub.
- **Experience** — tambah, edit, hapus, urutkan, sembunyikan.
- **Skills** — grup dan isi bagian Tech Stack.
- **Media** — semua file yang diunggah (gambar dan PDF, maksimal 4 MB; foto dikecilkan otomatis di browser sebelum diunggah). File disimpan di database dan disajikan dari `/api/media/[id]`.

### Keamanan

- Semua halaman admin, server action, dan route upload memeriksa sesi sendiri-sendiri; `src/proxy.ts` hanya mengalihkan lebih awal.
- Login dibatasi 5 percobaan salah per IP tiap 15 menit (per instance server).
- Link project hanya menerima `http://`/`https://`; upload SVG ditolak.

## Mengubah struktur database

Edit `prisma/schema.prisma`, lalu:

```bash
npm run db:migrate
```

Commit folder `prisma/migrations`. Migrasi diterapkan otomatis saat build berikutnya.

## AI assistant

Isi `ANTHROPIC_API_KEY` untuk mengaktifkan jawaban dari Claude. Pengetahuannya dibangun dari konten website saat itu, jadi ikut berubah ketika konten diedit dari admin.
Tanpa key, atau kalau API gagal, widget chat menjawab dari konten website secara langsung (`src/lib/assistant.ts`).
Route `/api/chat` punya validasi input dan batas 20 request per IP tiap 10 menit.

## Perintah lain

```bash
npm run build
```

```bash
npm run lint
```
