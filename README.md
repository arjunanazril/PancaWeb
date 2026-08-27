# PancaRuang

> Digital Living Gallery of Pancasila  
> Website edukasi modern untuk mengenal, memahami, dan melihat penerapan nilai-nilai Pancasila dalam kehidupan sehari-hari.

## Project Overview

PancaRuang adalah website edukasi berbasis galeri visual yang membahas penerapan Pancasila dari sila ke-1 sampai sila ke-5. Website memadukan materi edukasi, galeri dokumentasi penerapan Pancasila, autentikasi Google, role `USER` dan `ADMIN`, feedback user, serta dashboard admin untuk mengelola dokumentasi dan membaca feedback.

## Main Goals

1. Menjelaskan makna dan penerapan Pancasila dari Sila 1 sampai Sila 5.
2. Menampilkan dokumentasi penerapan Pancasila melalui gallery yang menarik.
3. Memberikan pengalaman website modern, clean, formal, elegan, nasional, dan responsif.
4. Menyediakan autentikasi Google OAuth menggunakan Auth.js/NextAuth.
5. Menyediakan role `USER` dan `ADMIN`.
6. Hanya admin yang dapat mengunggah, mengedit, dan menghapus dokumentasi.
7. User login dapat mengirim feedback.
8. Website mudah dideploy melalui GitHub, Vercel, Neon PostgreSQL, dan Vercel Blob.

## Tech Stack

- Next.js latest stable dengan App Router
- TypeScript
- Tailwind CSS v4
- shadcn/ui-style primitives bila diperlukan
- Motion/Framer Motion hanya bila mendukung hierarchy/interaksi
- Lucide Icons
- Auth.js / NextAuth dengan Google OAuth only
- Neon PostgreSQL
- Drizzle ORM
- Vercel Blob untuk image storage

## Design Concept

Visual utama: government/educational credibility + modern visual gallery + subtle motion. Website harus terasa modern, clean, formal, elegan, nasional, tidak kaku, tidak seperti website pemerintahan lama, tidak seperti landing page SaaS, dan tidak terlalu futuristik.

Hindari cyberpunk, neon berlebihan, particle background, 3D orb, mouse follower, excessive blur, text scramble, shader berlebihan, dan animasi yang mengganggu pembacaan.

## Color System

- `--background: #FFFFFF`
- `--surface-soft: #F7F7F5`
- `--primary: #C8102E`
- `--gold: #FFD700`
- `--gold-dark: #D6A800`
- `--green: #006D4E`
- `--navy: #112A4F`

Proporsi visual: 60% neutral/background, 20% primary, 10% gold, 5% green, 5% navy/detail.

## Typography

Gunakan Plus Jakarta Sans atau Geist. Jika memakai dua font, heading dapat memakai Plus Jakarta Sans dan body Inter. Typography harus clean, mudah dibaca, responsive, dan memiliki hierarchy jelas.

## Branding

Nama project: PancaRuang.

Tagline: Pancasila dalam kehidupan, bukan sekadar hafalan.

Supporting copy: Mengenal, memahami, dan melihat bagaimana nilai-nilai Pancasila hidup dalam keseharian.

Visual branding boleh memakai simbol sila, elemen Merah Putih, dan Garuda sebagai watermark halus tanpa distorsi atau modifikasi tidak pantas.

## Sitemap

- `/`
- `/pancasila`
- `/gallery`
- `/gallery/[slug]`
- `/feedback`
- `/about`
- `/auth`
- `/admin`
- `/admin/gallery`
- `/admin/upload`
- `/admin/feedback`

## Navbar

Public navbar: PancaRuang/logo, Beranda, Pancasila, Galeri, Tentang, Login. Setelah login tampil avatar menu untuk Profile, Feedback Saya, Logout. Admin melihat Dashboard Admin, Upload Dokumentasi, Kelola Galeri, Feedback, Logout. Menu admin tidak boleh tampil untuk non-admin, dan authorization tidak boleh hanya bergantung pada UI.

## Authentication and Authorization

Gunakan Google OAuth saja. Saat login, user dibuat/diupdate di database dan diberi role default `USER`. Admin utama ditentukan via `ADMIN_EMAIL=arjunanazril486@gmail.com`. Email admin tidak boleh hard-code di client. Semua route/action admin harus memverifikasi session dan role `ADMIN` server-side melalui helper seperti `requireUser()` dan `requireAdmin()`.

## Homepage Sections

Homepage minimal memiliki navbar, hero, introduction, interactive five principles, gallery preview, feedback CTA, dan footer. Hero memakai headline kuat, short description, CTA, identity Indonesia halus, whitespace besar, dan tidak dipenuhi card.

## Pancasila Content

Konten lima sila boleh static TypeScript karena jarang berubah. Setiap sila memiliki nomor, nama, simbol, makna singkat, nilai utama, dan contoh penerapan.

## Gallery

Gallery adalah bagian utama website dengan konsep floating/infinite documentation gallery. Desktop dapat memakai dua baris marquee berlawanan arah, hover subtle, clickable card, dan metadata. Mobile harus usability-first dengan horizontal swipe, stacked cards, atau snap scrolling. Detail gallery menampilkan image, title, description, related sila, created date, location optional, dan close/detail interaction yang smooth.

Satu dokumentasi dapat terkait lebih dari satu sila, sehingga schema harus many-to-many melalui `gallery_post_sila` atau relasi setara.

## Feedback

User harus login sebelum mengirim feedback. Feedback memiliki authenticated user, category, rating, message, dan createdAt. Kategori: Konten, Desain, Bug, Saran, Lainnya. Admin dapat membaca semua feedback.

## Admin Dashboard

Dashboard admin minimal menampilkan total gallery posts, total feedback, recent uploads, dan quick upload button. Admin gallery management harus bisa melihat semua dokumentasi, mencari, filter berdasarkan sila, membuka detail, edit, dan delete dengan confirmation dialog. Upload form wajib title, description, image, dan minimal satu sila; optional location, documentedAt, short caption.

## Upload Flow

Admin memilih image, server memvalidasi admin/session, MIME type, ukuran file, dan safe filename. Upload dilakukan ke Vercel Blob terlebih dahulu. Setelah URL diterima, record gallery dibuat di PostgreSQL beserta relasi sila. Jangan menyimpan binary image di PostgreSQL.

## Database Schema

Gunakan Drizzle dengan tabel konsep berikut:

- `users`: id, name, email, image, role, createdAt, updatedAt
- `gallery_posts`: id, slug, title, description, imageUrl, location, documentedAt, createdAt, updatedAt, createdBy
- `gallery_post_sila`: postId, silaNumber
- `feedback`: id, userId, category, rating, message, createdAt
- tabel Auth.js adapter: accounts, sessions, verificationTokens bila diperlukan

## Suggested Types

```ts
export type UserRole = "USER" | "ADMIN";
export type FeedbackCategory = "CONTENT" | "DESIGN" | "BUG" | "SUGGESTION" | "OTHER";
```

## Validation and Security

Gunakan schema validation server-side, disarankan Zod. Jangan percaya request body, form data, query params, route params, hidden input, client role, atau client email. Gunakan ORM parameterization dan jangan membangun raw SQL dari user input. Secrets hanya di environment variables dan `.env*` tidak boleh commit.

## Environment Variables

Siapkan `.env.example`:

```env
DATABASE_URL=
AUTH_SECRET=
AUTH_URL=http://localhost:3000
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
ADMIN_EMAIL=arjunanazril486@gmail.com
BLOB_READ_WRITE_TOKEN=
```

Panduan Google Cloud OAuth tersedia di `docs/google-auth-setup.md`.

## Animation and Accessibility

Motion selektif: hero entrance, section fade/slide ringan, sila transition, gallery marquee, card hover, modal entrance, navbar state. Hormati `prefers-reduced-motion`. Accessibility minimal: semantic HTML, heading hierarchy, keyboard navigation, focus-visible, alt text, form labels, accessible dialog/modal, sufficient contrast, dan buttons tidak hanya dibedakan warna.

## SEO and States

Implement basic Next.js metadata: title, description, Open Graph, favicon. Setiap async operation perlu loading, disabled submit, success/error message, dan friendly empty state. Jangan expose raw stack trace atau sensitive server error.

## Performance

Prioritaskan Next.js Image, proper image sizes, lazy loading, Server Components by default, minimalkan client components, database query selektif, dan pagination/filter gallery bila data bertambah.

## Development Workflow

1. Foundation: Next.js, TypeScript, Tailwind v4, design tokens, font, base layout.
2. Public UI: navbar, hero, intro, five principles, gallery mock, footer.
3. Database: Neon, Drizzle, migrations, schema.
4. Authentication: Auth.js, Google OAuth, session, role logic, ADMIN_EMAIL.
5. Gallery backend: Vercel Blob, upload, create/edit/delete post.
6. Admin dashboard: route protection, dashboard, manager, upload, feedback viewer.
7. Feedback: form, validation, database, admin viewer.
8. UX polish: animation, loading, error, responsive, accessibility.
9. Deployment: GitHub, Vercel, Neon, Blob, OAuth callback, smoke testing.

## Definition of Done

Project dianggap selesai jika public pages, auth, authorization, gallery admin, feedback, security checks, loading/error/empty states, accessibility, lint, typecheck, tests, dan production build berhasil diverifikasi. Jangan menyatakan selesai hanya berdasarkan pemeriksaan kode.

## AI Coding Agent Instructions

Implementasikan PancaRuang, bukan demo generic. Inspeksi repo sebelum perubahan arsitektur. Jangan invent major feature yang tidak perlu. Gunakan TypeScript, Server Components by default, Client Components hanya ketika dibutuhkan, Tailwind v4, semantic HTML, validasi server-side, dan server-side authorization. Jangan memperkenalkan Express backend, Firebase, Supabase, credential source-code, atau mock API yang berpura-pura production. Pilih clarity, visual hierarchy, dan safety daripada fitur berlebih.
