

# Dual-Mode System Redesign — "Understand in < 3 seconds"

## Problem
The current toggle is a minimal pill-switch with no visual explanation of what each mode means. Users must tap to discover the difference.

## Solution
Redesign the ServiceToggle and bottom sheet to immediately communicate the value proposition of each mode through visual cues, micro-copy, and distinct UI states.

## Changes

### 1. ServiceToggle.tsx — Visual Differentiation Cards
Replace the plain pill-switch with a **two-card selector** that shows key traits at a glance:

- **Hailing card**: Icon (🚗), label "Hailing", one-liner tagline chips: "Instan", "Pribadi", "Door-to-door"
- **Shuttle card**: Icon (🚌), label "Shuttle", tagline chips: "Terjadwal", "Berbagi", "Lebih Hemat"
- Active card gets primary border + subtle background tint; inactive card is muted
- Compact layout — two cards side by side, each ~50% width

### 2. Index.tsx — Mode-Aware Bottom Sheet Context Banner
Add a small **context banner** inside the bottom sheet that reinforces the selected mode:

- **Hailing mode**: Shows "⚡ Jemput sekarang, langsung ke tujuan" with an amber/accent left border
- **Shuttle mode**: Shows "💰 Rute tetap, harga hemat, kursi terbatas" with a green/success left border
- Animates on mode switch (fade transition)

### 3. Index.tsx — Differentiated Pickup/Destination UX
- **Hailing**: Keep current free-form pickup/destination input ("Lokasi saat ini" → "Mau ke mana?")
- **Shuttle**: Replace with a **route selector** feel — "Pilih titik jemput" and "Pilih titik turun" with a pin icon, signaling fixed points (not arbitrary locations)

### 4. CTA Buttons — Distinct Language & Color
Already partially done. Reinforce:
- Hailing: "Pesan Sekarang" (amber accent) — urgency
- Shuttle: "Cari Shuttle" (amber accent) with date/passenger selectors — planning

## Files to Edit
1. `src/components/ServiceToggle.tsx` — rebuild as dual-card selector with trait chips
2. `src/pages/Index.tsx` — add context banner, differentiate pickup UX per mode

## No New Dependencies

