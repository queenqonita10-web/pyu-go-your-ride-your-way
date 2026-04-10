

# Driver Mode — Hailing & Shuttle Driver Screens

## Overview
Add a driver-facing interface that adapts based on mode (Hailing vs Shuttle). Accessible via `/driver?mode=hailing` or `/driver?mode=shuttle`. This is a prototype UI — no backend, all mock data.

## New Pages

### 1. `src/pages/DriverDashboard.tsx` — Mode-adaptive driver home
Uses `?mode=shuttle|hailing` search param to switch UI.

**Hailing Driver UI:**
- **Incoming ride card** with passenger name, pickup/destination, distance, estimated fare
- "Terima" (Accept) / "Tolak" (Decline) buttons with countdown timer (15s auto-decline)
- After accept → switches to **Navigation state**: map with route line, pickup address, "Sudah di Lokasi" (Arrived) button
- After arrived → **Trip in progress**: destination shown, "Selesaikan Perjalanan" (Complete Trip) button
- After complete → fare summary card with "Kembali ke Beranda" button
- Status stepper at top: Menunggu → Menuju Jemput → Dalam Perjalanan → Selesai

**Shuttle Driver UI:**
- **Route header**: "Medan Fair → KNO Airport" with departure time
- **Pickup checklist**: list of stops with passenger counts, each stop has a checkbox "Tiba di Halte" (Arrived at Stop)
- When stop is checked → expands to show **passenger validation list**: passenger names with check icons to confirm boarding
- "Berangkat" (Depart) button enabled only after all passengers at current stop are validated
- Progress through stops shown as a vertical timeline (reuse pattern from LiveTracking shuttle stops)
- Final stop → "Perjalanan Selesai" summary with total passengers served

### 2. `src/components/DriverBottomNav.tsx` — Driver-specific bottom nav
- Tabs: Beranda (Home), Riwayat (History), Penghasilan (Earnings), Akun (Account)
- Only shown on `/driver*` routes

## Files to Create
1. `src/pages/DriverDashboard.tsx` — main driver screen with mode switching
2. `src/components/DriverBottomNav.tsx` — driver-specific navigation

## Files to Edit
1. `src/App.tsx` — add `/driver` route
2. `src/components/BottomNav.tsx` — hide on `/driver` paths

## Technical Notes
- All state managed with `useState` — no backend needed
- Mock data for incoming rides, passenger lists, stop checklists
- Reuse existing components: `MapView`, `Badge`, `Button`, `cn()` utility
- Step transitions use state machine pattern: `idle → accepted → navigating → arrived → in_progress → completed`
- Shuttle uses checklist pattern: `stops[]` with `arrived` and `passengers[].validated` booleans

