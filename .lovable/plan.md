

# Conversion Optimization — Price, Savings, Urgency, Speed

## Overview
Optimize the booking funnel for higher conversion by surfacing price/savings earlier, adding urgency cues, and streamlining the path to booking.

## Changes

### 1. Home Screen (`Index.tsx`) — Show price & seats early
- Add live seat availability to the shuttle card: "🔥 3 kursi tersisa — berangkat 06:00" below the shuttle pickup/dropoff selector
- Show price comparison inline: "Mulai Rp 75.000/org" on shuttle mode, "~Rp 300rb" on hailing mode as a subtle label on the CTA area
- PricePreview already shows savings — keep as-is

### 2. Location Search (`LocationSearch.tsx`) — Price on airport result
- Add price tag on the KNO Airport pinned button: "Mulai Rp 75.000" next to "Popular" badge
- Add hailing price comparison: "vs ~Rp 350rb Hailing" as small muted text below the shuttle suggestion

### 3. Shuttle Select (`ShuttleSelect.tsx`) — Urgency & savings
- Add a sticky savings comparison bar at top below header: "💰 Hemat Rp 200rb+ vs Hailing" 
- Add urgency text on low-seat departures: "🔥 Sisa 3 kursi!" (bold, colored) replacing the plain seat count when seats ≤ 3
- Add a "Termurah" badge on the cheapest departure option
- Auto-select the nearest departure on load (pre-select first item) so CTA is immediately visible — reduces taps

### 4. Shuttle Booking (`ShuttleBooking.tsx`) — Speed optimization
- Add a comparison line in price breakdown: "Hailing untuk rute ini: ~Rp 350.000" with strikethrough styling to reinforce savings
- Add countdown urgency: "⏱ Berangkat dalam 45 menit — segera konfirmasi" above CTA

### 5. Ride Select (`RideSelect.tsx`) — Show savings opportunity
- Add a small comparison note under the shuttle SmartSuggestion: price savings amount "Hemat ~Rp 250rb"

## Files to Edit
1. `src/pages/Index.tsx` — seat availability + price on shuttle mode
2. `src/pages/LocationSearch.tsx` — price on airport result
3. `src/pages/ShuttleSelect.tsx` — urgency labels, auto-select, savings bar, cheapest badge
4. `src/pages/ShuttleBooking.tsx` — hailing comparison, countdown urgency
5. `src/pages/RideSelect.tsx` — savings amount on shuttle suggestion

