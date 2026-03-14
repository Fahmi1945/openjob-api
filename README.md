# OpenJob API 🚀

OpenJob API adalah sebuah RESTful backend service untuk platform portal lowongan kerja. Proyek ini dibangun dengan Node.js dan Express.js, menggunakan struktur arsitektur berbasis fitur yang memisahkan routing, handler, service, dan validasi untuk memastikan kode lebih rapi, terstruktur, dan mudah dipelihara.

Proyek ini dibuat sebagai bagian dari pembelajaran pada kelas Backend Fundamental.

## 🛠️ Stack Teknologi Terkini

Proyek ini dibangun menggunakan teknologi berikut:

- **Runtime:** [Node.js](https://nodejs.org/)
- **Framework:** [Express.js](https://expressjs.com/) (v5.x)
- **Database:** PostgreSQL
- **Database Driver:** `pg`
- **Migration Tool:** `node-pg-migrate`
- **Validation:** `joi`
- **Authentication:** `jsonwebtoken` (JWT) & `bcrypt` (Hashing)
- **File Upload:** `multer`
- **Unique ID Generator:** `nanoid`

## 📁 Struktur Direktori Utama

Arsitektur aplikasi ini mengadopsi pemisahan **Layered Architecture**.

```text
openjob-api/
├── migrations/         # File migrasi skema database (node-pg-migrate)
├── src/                # Root kode sumber utama aplikasi
│   ├── api/            # Controller & Router (Features: Jobs, Users, dsb)
│   ├── middleware/     # Custom Middleware (Auth, Error Handler, Validasi)
│   ├── services/       # Bussiness Logic & Akses ke Database
│   ├── utils/          # Utility classes/functions (Token Manager, Custom Exceptions)
│   ├── validator/      # Joi schemas & logic validasi input
│   └── server.js       # Entry point / File utama server Express
├── uploads/            # Direktori tempat file lokal diunggah (Dokumen/Gambar)
├── package.json        # Node.js dependencies & scripts
└── ...
```

## ✨ Fitur-fitur (Entitas)

API ini mencakup berbagai entitas untuk membangun aplikasi lowongan kerja:

- **Users:** Manajemen data dan profil pengguna/pelamar.
- **Authentications:** Login & registrasi (Pembuatan dan refresh token JWT).
- **Companies:** Direktori profil perusahaan / employer.
- **Categories:** Manajemen kategori bidang pekerjaan.
- **Jobs:** Pembuatan dan pencarian lowongan kerja oleh instansi.
- **Applications:** Proses apply/melamar pekerjaan oleh user ke lowongan tertentu.
- **Bookmarks:** Fitur untuk menyimpan/meng-highlight lowongan kerja (simpan lowongan).
- **Documents:** Unggah dokumen penting (mis: CV, Portofolio, Ijazah).

## 🚀 Instalasi & Persiapan

Ikuti langkah-langkah berikut untuk menjalankan project di environment lokal (development).

### 1. Prasyarat

Pastikan Anda telah menginstal:

- [Node.js](https://nodejs.org/) terbaru.
- [PostgreSQL](https://www.postgresql.org/) database server.

### 2. Clone Repository & Install Dependencies

```bash
# Instal seluruh package NPM
npm install
```

### 3. Konfigurasi Environment Variables

Buat file `.env` di root direktori proyek, lalu sesuaikan isinya dengan kredensial database dan konfigurasi token Anda:

```env
# Server Configuration
PORT=3000
HOST=localhost

# Database Configuration (Postgres)
PGUSER=pengguna_db_anda
PGHOST=localhost
PGPASSWORD=password_db_anda
PGDATABASE=openjob_db
PGPORT=5432

# Token / JWT Secrets
ACCESS_TOKEN_KEY=masukkan_secret_bebas_dan_panjang_sekali
REFRESH_TOKEN_KEY=masukkan_secret_bebas_dan_panjang_sekali_juga
```

### 4. Menjalankan Database Migrations

Sebelum menjalankan aplikasi, pastikan database `openjob_db` sudah dibuat di PostgreSQL. Kemudian jalankan migrasi tabel-tabelnya:

```bash
npm run migrate up
```

### 5. Menjalankan Server

Untuk proses development dengan fitur hot-reload menggunakan nodemon:

```bash
npm run start:dev
```

Aplikasi sekarang dapat diakses secara default di `http://localhost:3000`.

## 📜 Lisensi

Lisensi ISC (lihat `package.json`).
