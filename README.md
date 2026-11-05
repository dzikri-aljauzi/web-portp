# dzikri. — Portfolio

Personal portfolio of **Laksamana Dzikri Al Jauzi** — Full Stack Developer & Edge AI Engineer.
Signature color: tosca / mint, with light & dark themes.

## Tech stack

| Layer | Pilihan |
| --- | --- |
| Framework | Next.js 16 (App Router) + React 19 + TypeScript |
| Styling | Tailwind CSS v4 dengan design token di `src/app/globals.css` |
| Animasi | Motion (`motion/react`) |
| Ikon | lucide-react + react-icons (Simple Icons untuk logo teknologi) |
| Font | Plus Jakarta Sans (heading/body) + JetBrains Mono (label) via `next/font` |
| AI assistant | Claude API (`@anthropic-ai/sdk`) di route `/api/chat`, dengan fallback jawaban lokal |

## Menjalankan

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint
```

## Mengubah konten

Semua isi website ada di **`src/data/profile.ts`**: profil, statistik, experience, project, dan skill.
UI dan AI assistant sama-sama membaca file ini, jadi cukup edit satu tempat.

- **Foto:** taruh foto di `public/profile.jpg`, lalu set `photo: "/profile.jpg"` di `profile.ts`.
  Selama kosong, tampil monogram "LD".
- **Link demo/repo project:** isi `liveUrl` / `repoUrl` per project. Kalau kosong, tombolnya disembunyikan.
- **CV:** file ada di `public/cv/CV_Laksamana_Dzikri.pdf`.

## AI assistant

Salin `.env.example` ke `.env.local`, lalu isi `ANTHROPIC_API_KEY` untuk mengaktifkan jawaban dari Claude.
Tanpa key (atau kalau API gagal), widget chat otomatis memakai jawaban lokal dari `src/lib/assistant.ts`.
Route `/api/chat` punya validasi input dan rate limit sederhana per IP (20 request / 10 menit).

## Deploy

Paling mudah di **Vercel**: import repo, tambahkan `ANTHROPIC_API_KEY` di Environment Variables, lalu deploy.
