

# Clear Pricing Display with Savings Comparison

## Changes

### 1. PricePreview.tsx — Redesign with pricing clarity and savings badge

**Hailing mode:**
- Label: "Estimasi tarif" (estimated fare) with a subtle "Harga dapat berubah" disclaimer
- Price: `~Rp 300-400rb` with a pulsing/dynamic indicator icon
- Keep pickup ETA

**Shuttle mode:**
- Label: "Harga pasti" (fixed price) with "Sudah termasuk semua biaya" (all-in, no extra cost)
- Price: `Rp 150.000/org` (no tilde — it's fixed)
- Add a green savings badge: "Hemat hingga 40%" (Save up to 40%)
- Keep departure time

### 2. ServiceToggle.tsx — Add pricing language to cards

- Hailing card: change `~Rp 350rb` to `~Rp 350rb*` with micro-text "estimasi" below
- Shuttle card: change `~Rp 150rb` to `Rp 150rb` (no tilde) with micro-text "harga pasti" below

### 3. Index.tsx — Add comparison banner when shuttle is selected

When mode is "shuttle", show a compact comparison strip above the PricePreview:
- "💰 Hemat hingga 40% dibanding Hailing" in a green-tinted banner

## Files to Edit
1. `src/components/PricePreview.tsx` — full redesign with labels, disclaimers, savings badge
2. `src/components/ServiceToggle.tsx` — pricing language tweaks
3. `src/pages/Index.tsx` — add savings comparison banner for shuttle mode

## No New Dependencies

