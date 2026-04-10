

# Smart Suggestions — Context-Aware Cross-Sell Banners

## Overview
Add intelligent suggestion banners that appear at key decision points, nudging users toward the optimal service mode based on context (destination, time, seat availability).

## Changes

### 1. New Component: `SmartSuggestion.tsx`
A reusable dismissible banner component with variants:
- **shuttle-suggest** (green): "Shuttle ke KNO mulai Rp 75.000 — hemat 40%" with CTA to `/shuttle`
- **hailing-suggest** (amber): "Butuh cepat? Hailing tersedia dalam 3 menit" with CTA to `/search`
- **no-seats** (red/amber): "Kursi penuh? Pesan Hailing langsung ke tujuan" with CTA to `/search`

Each variant has an icon, message text, and a small action button. Includes a dismiss (X) button.

### 2. `LocationSearch.tsx` — Airport destination suggestion
When user taps "KNO Airport" (or any airport result), show a shuttle suggestion banner between the search header and results:
- Banner: "🚌 Shuttle ke KNO mulai Rp 75.000 — hemat hingga 40%"
- CTA button: "Lihat Shuttle" → navigates to `/shuttle`
- Still allows proceeding to hailing via the normal flow

### 3. `RideSelect.tsx` — Late/urgent hailing confirmation
Add a subtle "fastest option" highlight. No cross-sell needed here since user already chose hailing. Instead, on the route info card, add a small time-context chip:
- If current hour is close to a shuttle departure: show "💡 Shuttle berangkat 06:00 — Rp 75.000" as an info banner below the route card
- Tapping it navigates to `/shuttle`

### 4. `ShuttleSelect.tsx` — No seats fallback
When a user selects a departure with `seatsLeft === 0` (or when all departures are nearly full), show a hailing fallback banner at the bottom:
- Banner: "🏍️ Kursi terbatas? Hailing tersedia — sampai dalam ~45 menit"
- CTA: "Pesan Hailing" → navigates to `/search`
- Also show inline on departures where `seatsLeft <= 1`: a small "Coba Hailing?" link

## Files to Create
1. `src/components/SmartSuggestion.tsx` — reusable suggestion banner

## Files to Edit
1. `src/pages/LocationSearch.tsx` — add shuttle suggestion when airport selected
2. `src/pages/RideSelect.tsx` — add shuttle alternative info banner
3. `src/pages/ShuttleSelect.tsx` — add hailing fallback when seats are scarce

