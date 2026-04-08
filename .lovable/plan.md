

# Screen Design Polish — All Key Screens

## Current State
All screens exist but need design refinement for consistency and completeness. Here's what each needs:

## Changes

### 1. HOME (`Index.tsx`)
Already solid. Minor polish:
- Add subtle greeting animation or time-based greeting ("Selamat pagi/siang/sore")
- Ensure mode switch cards have equal visual weight
- No structural changes needed

### 2. HAILING FLOW

**Map Screen (`RideSelect.tsx`)**
- Add animated route line placeholder between pickup/destination markers in the route info card
- Add "Jarak: ~39 km" distance label to route summary
- Add subtle pulse animation on selected vehicle card

**Driver Tracking (`LiveTracking.tsx`)**
- Add progress steps indicator at top (Mencari → Driver ditemukan → Dalam perjalanan → Tiba)
- Add estimated arrival countdown that's more prominent
- Add vehicle plate number in a highlighted badge for easy identification
- Add "Bagikan lokasi" (share location) button

### 3. SHUTTLE FLOW

**Pickup Selection (`ShuttleSelect.tsx`)**
- Add route header with visual from→to indicator (not just text)
- Add seat availability color coding: green (>4), yellow (2-3), red (1)
- Add "Tersedia hari ini" section header

**Schedule List** (already in `ShuttleSelect.tsx`)
- Add departure countdown for nearest shuttle ("Berangkat dalam 45 menit")
- Highlight the next upcoming departure with a "Segera" badge

**Seat Map (`ShuttleSeatSelect.tsx`)**
- Add seat legend (Available/Taken/Selected) at top
- Add departure info summary bar (time, route, vehicle)
- Add driver seat indicator and door position for spatial orientation

### 4. TICKET (`ShuttleTicket.tsx`)
- Add dashed separator line between QR section and trip info (tear-off effect)
- Add countdown to departure ("Berangkat dalam 2 jam 15 menit")
- Add "Tunjukkan ke driver" instruction text near QR code
- Add ticket status badge ("Aktif" / "Digunakan" / "Kedaluwarsa")

### 5. TRACKING (`LiveTracking.tsx`)
- Make the screen mode-aware: detect if tracking hailing or shuttle
- **Hailing mode**: current layout (driver info, contact buttons, cancel)
- **Shuttle mode**: show shuttle vehicle info, all pickup stops with ETA per stop, current stop highlighted, no cancel (show "Hubungi CS" instead), passenger count

## Files to Edit
1. `src/pages/Index.tsx` — time-based greeting
2. `src/pages/RideSelect.tsx` — distance label, vehicle selection polish
3. `src/pages/LiveTracking.tsx` — progress steps, mode-aware (hailing vs shuttle), share location
4. `src/pages/ShuttleSelect.tsx` — seat availability colors, next departure badge, countdown
5. `src/pages/ShuttleSeatSelect.tsx` — seat legend, departure summary bar, driver seat indicator
6. `src/pages/ShuttleTicket.tsx` — departure countdown, status badge, tear-off styling, instruction text

## No New Dependencies

