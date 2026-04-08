

# Two Separated Booking Flows — Hailing & Shuttle

## Current State
- **Hailing flow exists**: Home → LocationSearch → RideSelect → BookingConfirmation → LiveTracking. Mostly complete but BookingConfirmation is generic (not mode-aware).
- **Shuttle flow exists partially**: Home → ShuttleSelect → BookingConfirmation. Missing dedicated pages for seat selection and ticket confirmation.
- Both flows share BookingConfirmation, which only shows hailing-style content.

## Plan

### Hailing Flow (6 steps — mostly exists, needs polish)
`Home → /search → /ride-select → /booking → /tracking`

1. **LocationSearch.tsx** — No changes needed. Already handles pickup/destination input.
2. **RideSelect.tsx** — No changes needed. Shows price + vehicle selection.
3. **BookingConfirmation.tsx** — Refactor to be mode-aware via `?type=hailing` query param. Keep existing content for hailing mode.
4. **LiveTracking.tsx** — No changes needed. Already shows driver info + live tracking.

### Shuttle Flow (6 steps — needs 2 new pages)
`Home → /shuttle → /shuttle-seat → /shuttle-booking → /shuttle-ticket`

1. **ShuttleSelect.tsx** — Minor update: after selecting a departure, navigate to `/shuttle-seat` instead of `/booking`.
2. **New: ShuttleSeatSelect.tsx** (`/shuttle-seat`) — Visual seat map grid showing available/taken/selected seats. Displays selected departure info at top. CTA: "Lanjut ke Pembayaran".
3. **New: ShuttleBooking.tsx** (`/shuttle-booking`) — Shuttle-specific confirmation page: route summary, departure time, seat number, passenger count, shuttle-specific payment options (no cash — prepaid only). Price breakdown (per-seat pricing). CTA: "Bayar & Konfirmasi".
4. **New: ShuttleTicket.tsx** (`/shuttle-ticket`) — E-ticket page with QR code placeholder, departure time, seat number, pickup point, vehicle info. "Simpan Tiket" and "Bagikan" buttons. Clean, printable layout.

### Shared Updates
5. **BookingConfirmation.tsx** — Add `type` query param check. If `type=shuttle`, redirect to `/shuttle-booking`. Keep hailing flow as-is.
6. **App.tsx** — Register 3 new routes: `/shuttle-seat`, `/shuttle-booking`, `/shuttle-ticket`.

## Files to Create
1. `src/pages/ShuttleSeatSelect.tsx` — seat picker with grid layout
2. `src/pages/ShuttleBooking.tsx` — shuttle-specific booking confirmation
3. `src/pages/ShuttleTicket.tsx` — e-ticket display

## Files to Edit
1. `src/pages/ShuttleSelect.tsx` — update navigation target
2. `src/App.tsx` — add 3 new routes
3. `src/pages/BookingConfirmation.tsx` — redirect shuttle type to dedicated page

## No New Dependencies

