

# Admin Dashboard

## Overview
Build an admin dashboard at `/admin/*` routes with a sidebar layout. Includes overview dashboard, hailing analytics, shuttle analytics, rayon management, and pricing control — all with mock data.

## Layout
- **`src/layouts/AdminLayout.tsx`** — Sidebar + main content area using Shadcn `Sidebar` component
  - Sidebar items: Dashboard, Hailing Analytics, Shuttle Analytics, Rayons, Pricing
  - Responsive: collapsible sidebar on mobile
  - No BottomNav on `/admin*` routes

## Pages to Create

### 1. `src/pages/admin/AdminDashboard.tsx` — `/admin`
- Summary cards: Total trips today, active drivers, revenue today, active shuttles
- Split mini-charts: Hailing trips (line) vs Shuttle trips (line) side by side
- Recent activity feed (last 10 trips across both modes)
- Revenue donut chart (Hailing vs Shuttle split)

### 2. `src/pages/admin/HailingAnalytics.tsx` — `/admin/hailing`
- KPI cards: total hailing trips, avg fare, completion rate, avg wait time
- Bar chart: trips per hour (today)
- Line chart: daily revenue (7-day trend)
- Table: top 10 recent hailing trips (passenger, driver, fare, status)

### 3. `src/pages/admin/ShuttleAnalytics.tsx` — `/admin/shuttle`
- KPI cards: total shuttle trips, avg occupancy %, total passengers, revenue
- Bar chart: passengers per route
- Line chart: daily revenue (7-day trend)
- Table: active routes with seat fill rates

### 4. `src/pages/admin/RayonManagement.tsx` — `/admin/rayons`
- List of rayons (mock: Medan Kota, Medan Timur, Deli Serdang, KNO Area)
- Each rayon card: name, area description, number of active stops, status toggle (Aktif/Nonaktif)
- "Tambah Rayon" button (opens form dialog: name, description, coverage area)
- Edit/delete actions per rayon

### 5. `src/pages/admin/PricingControl.tsx` — `/admin/pricing`
- **Hailing pricing**: base fare, per-km rate, per-minute rate, surge multiplier — editable fields per vehicle type (Motor, Car, XL)
- **Shuttle pricing**: per-route pricing table with editable fare per route
- Save button with toast confirmation

## Files to Edit
- `src/App.tsx` — add `/admin/*` routes
- `src/components/BottomNav.tsx` — add `/admin` to hiddenPaths

## Technical Notes
- All mock data, no backend
- Reuse Recharts via existing `ChartContainer` from `src/components/ui/chart.tsx`
- Reuse `Card`, `Button`, `Input`, `Badge`, `Tabs`, `Dialog`, `Table` components
- Sidebar uses Shadcn Sidebar with `collapsible="icon"`

