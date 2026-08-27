# Google Auth Setup

PancaRuang memakai Auth.js dengan Google OAuth. Kode aplikasi sudah siap; credential dibuat dari Google Cloud Console memakai akun pemilik project.

## Google Cloud Console

1. Buka `https://console.cloud.google.com/`.
2. Buat atau pilih project Google Cloud untuk PancaRuang.
3. Buka `APIs & Services` lalu `OAuth consent screen`.
4. Pilih user type yang sesuai. Untuk testing pribadi, `External` tetap bisa dipakai dengan test users.
5. Isi app name `PancaRuang`, support email, dan developer contact email.
6. Tambahkan test user: `arjunanazril486@gmail.com` jika app masih testing.
7. Buka `Credentials` lalu pilih `Create Credentials` dan `OAuth client ID`.
8. Pilih application type `Web application`.
9. Tambahkan authorized JavaScript origins:

```txt
http://localhost:3000
https://domain-production-kamu.com
```

10. Tambahkan authorized redirect URIs:

```txt
http://localhost:3000/api/auth/callback/google
https://domain-production-kamu.com/api/auth/callback/google
```

11. Simpan, lalu salin `Client ID` dan `Client Secret`.

## Local Environment

Buat `.env.local` berdasarkan `.env.example` dan isi nilai berikut:

```env
AUTH_URL=http://localhost:3000
AUTH_GOOGLE_ID=client-id-dari-google
AUTH_GOOGLE_SECRET=client-secret-dari-google
ADMIN_EMAIL=arjunanazril486@gmail.com
```

Isi juga `DATABASE_URL`, `AUTH_SECRET`, dan `BLOB_READ_WRITE_TOKEN` saat fitur database/upload ingin dites penuh.

Generate `AUTH_SECRET`:

```bash
npx auth secret
```

## Production Environment

Di Vercel, isi environment variables:

```env
AUTH_URL=https://domain-production-kamu.com
AUTH_GOOGLE_ID=client-id-dari-google
AUTH_GOOGLE_SECRET=client-secret-dari-google
ADMIN_EMAIL=arjunanazril486@gmail.com
DATABASE_URL=neon-connection-string
BLOB_READ_WRITE_TOKEN=vercel-blob-token
```

## Admin Rule

Hanya email berikut yang otomatis menjadi admin:

```txt
arjunanazril486@gmail.com
```

Role ditentukan ulang di server saat session dibuat. Menu admin yang disembunyikan di UI bukan mekanisme keamanan utama; semua halaman dan action admin tetap memakai guard server-side.
