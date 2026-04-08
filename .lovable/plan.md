

# Home Screen Redesign — Instant Decision, Zero Confusion

## Current State
The home screen already has a dual-card ServiceToggle, context banners, differentiated location inputs, and mode-specific CTAs. The structure is solid but can be improved for clarity, visual hierarchy, and adding the requested **price preview**.

## Changes

### 1. ServiceToggle.tsx — Enhanced Card Layout with Price Anchoring
Upgrade the two-card selector to include a price hint so users immediately understand the cost difference:
- **Hailing card**: Car icon, "Ride Now" subtitle, chips "Instan · Pribadi", price hint "~Rp 350rb"
- **Shuttle card**: Bus icon, "Airport Shuttle" subtitle, chips "Terjadwal · Hemat", price hint "~Rp 150rb"
- Active card: primary border + filled background + scale-up subtle transform
- Inactive card: muted, slightly smaller, dashed border

### 2. Index.tsx — Streamlined Bottom Sheet
Restructure the bottom sheet for a cleaner flow:
1. **ServiceToggle** — move inside the bottom sheet (not floating above it) for a more cohesive feel
2. **Location input** — already mode-aware, keep as-is
3. **Price preview row** — new compact row showing estimated price range and ETA
   - Hailing: "~Rp 300-400rb · 5 min pickup"
   - Shuttle: "~Rp 150rb/org · Berangkat 14:00"
4. **CTA button** — full-width, prominent

Remove the QuickActions row to reduce clutter and keep focus on the primary booking flow. (Can be moved to a dedicated explore section later.)

### 3. New Component: PricePreview.tsx
Small component showing:
- Estimated price (bold)
- ETA or next departure time
- Mode-specific icon/color

## Files to Edit
1. `src/components/ServiceToggle.tsx` — add price hints, visual polish
2. `src/pages/Index.tsx` — move toggle into sheet, add price preview, remove QuickActions
3. `src/components/PricePreview.tsx` — new component for price/ETA preview

## No New Dependencies

