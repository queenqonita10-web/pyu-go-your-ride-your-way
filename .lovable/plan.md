

# Redesign Admin Dashboard — Data Clarity & Fast Filtering

## Overview
Enhance the existing admin dashboard with 4 focused views: Overview, Trips Monitoring, Bookings Table, and Revenue Analytics. Add filtering controls across all pages for fast data exploration.

## Changes

### 1. Sidebar — Update navigation items
**`src/components/AdminSidebar.tsx`**
- Replace current 5 items with: Overview, Trips, Bookings, Revenue, Rayons, Pricing
- Add `ClipboardList` and `TrendingUp` icons for new items

### 2. Overview page — Redesign with filters
**`src/pages/admin/AdminDashboard.tsx`** — Major rewrite
- **Date filter bar**: "Hari Ini", "7 Hari", "30 Hari" toggle buttons (using `Tabs` or `Button` group with state)
- **KPI cards row**: Trips, Revenue, Active Drivers, Completion Rate — each with sparkline trend indicator and % change badge
- **Two-column charts**: Hailing vs Shuttle trip volume (area chart), Revenue split (donut)
- **Live activity feed**: Last 10 trips with auto-scroll, type badge, timestamp

### 3. Trips Monitoring — New page
**`src/pages/admin/TripsMonitoring.tsx`** — Create new
- **Filter bar**: Type filter (All/Hailing/Shuttle), Status filter (All/Berlangsung/Selesai/Dibatalkan), Date range selector
- **KPI strip**: Active trips now, completed today, cancelled today, avg duration
- **Trips per hour bar chart** with hailing/shuttle stacked bars
- **Live trips table**: Sortable columns — ID, Type, Passenger, Driver/Route, Status, Fare, Duration, Time
- Status badges: color-coded (green=Selesai, yellow=Berlangsung, red=Dibatalkan)
- Search input for passenger/driver name filtering

### 4. Bookings Table — New page
**`src/pages/admin/BookingsTable.tsx`** — Create new
- **Filter bar**: Service type toggle, date range, status dropdown, search input
- **Full-width data table** with 20+ mock rows:
  - Columns: Booking ID, Date, Type, Passenger, Driver/Route, Origin, Destination, Fare, Payment Method, Status
- **Pagination** component at bottom
- **Summary row**: Total bookings shown, total fare sum
- Click row to expand detail (collapsible row or sheet)

### 5. Revenue Analytics — New page
**`src/pages/admin/RevenueAnalytics.tsx`** — Create new
- **Period filter**: Tabs for Harian/Mingguan/Bulanan view
- **KPI cards**: Total Revenue, Avg Revenue/Trip, Hailing Revenue, Shuttle Revenue
- **Area chart**: Revenue over time (combined or split by type, toggle-able)
- **Horizontal bar chart**: Revenue by route/rayon
- **Revenue breakdown table**: Daily rows with Hailing rev, Shuttle rev, Total, Trip count

### 6. Routing — Register new pages
**`src/App.tsx`**
- Add routes: `/admin/trips`, `/admin/bookings`, `/admin/revenue`

### 7. Existing pages — Keep as-is
- `HailingAnalytics`, `ShuttleAnalytics`, `RayonManagement`, `PricingControl` remain unchanged and accessible from sidebar

## Files Summary
- **Edit**: `AdminSidebar.tsx`, `AdminDashboard.tsx`, `App.tsx`
- **Create**: `TripsMonitoring.tsx`, `BookingsTable.tsx`, `RevenueAnalytics.tsx`

## Technical Notes
- All mock data, no backend
- Filters use `useState` for client-side filtering of mock arrays
- Reuse existing `ChartContainer`, `Table`, `Tabs`, `Badge`, `Input`, `Select`, `Pagination` components
- Dense information layout consistent with existing Gojek-inspired design

