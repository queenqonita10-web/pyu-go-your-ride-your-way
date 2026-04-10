

# Tambah Rekening Bank Baru untuk Driver

## Overview
Tambahkan fitur untuk menambah rekening bank baru langsung di halaman withdraw, dengan dialog form dan daftar bank yang dinamis (state-managed).

## Changes

### `src/pages/DriverWithdraw.tsx`
- Convert static `banks` array to `useState` so new banks can be added dynamically
- Add "Tambah Rekening" button below the bank list
- Add a `Dialog` with form fields:
  - **Nama Bank** — Select dropdown (BCA, BNI, BRI, Mandiri, CIMB, Danamon, BSI, Permata)
  - **Nomor Rekening** — Input with number validation
  - **Nama Pemilik** — Text input
- On submit: add new bank to state, auto-select it, close dialog, show toast
- Add delete button (trash icon) on each bank card for removing saved accounts
- Update the confirmation screen to reference banks from state instead of the static const

### Components Used (existing)
- `Dialog`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogTrigger`
- `Input`, `Button`, `Select` (from shadcn)
- `toast` from sonner

## Technical Notes
- All client-side with mock data (no backend)
- Single file edit: `src/pages/DriverWithdraw.tsx`

