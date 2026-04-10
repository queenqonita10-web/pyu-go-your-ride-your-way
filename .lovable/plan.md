

# Fitur Withdraw / Penarikan Saldo Driver

## Overview
Tambahkan halaman dan flow penarikan saldo ke rekening bank untuk driver, accessible dari halaman Penghasilan.

## Changes

### 1. `src/pages/DriverEarnings.tsx` — Tambah tombol & saldo
- Tambahkan card "Saldo tersedia: Rp 5.250.000" di header (di bawah total bulan ini)
- Tambahkan tombol "Tarik Saldo" yang navigate ke `/driver/withdraw`

### 2. `src/pages/DriverWithdraw.tsx` — Halaman penarikan baru
- **Header**: back button + judul "Tarik Saldo"
- **Saldo card**: menampilkan saldo tersedia (Rp 5.250.000)
- **Input nominal**: field input angka dengan format Rupiah, tombol quick-amount (Rp 500rb, Rp 1jt, Rp 2jt, Semua)
- **Pilih rekening tujuan**: card seleksi dari daftar rekening tersimpan (mock: BCA ****4521, Mandiri ****7890) dengan radio selection
- **Ringkasan**: nominal penarikan, biaya admin (Rp 2.500), total diterima
- **Tombol "Konfirmasi Penarikan"** → navigasi ke halaman sukses/konfirmasi
- **Riwayat penarikan**: list 3-4 mock withdrawal history di bawah (tanggal, nominal, status: Berhasil/Diproses)

### 3. `src/App.tsx` — Tambah route
- Register `/driver/withdraw` route

### 4. `src/components/BottomNav.tsx` — Hide on withdraw path
- Tambahkan `/driver/withdraw` ke hiddenPaths

## Files
- Edit: `src/pages/DriverEarnings.tsx`, `src/App.tsx`, `src/components/BottomNav.tsx`
- Create: `src/pages/DriverWithdraw.tsx`

