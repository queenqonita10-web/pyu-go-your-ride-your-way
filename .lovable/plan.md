

# Bottom Navigation Redesign — Clean 4-Tab Structure

## Problem
Current tabs are Home, Activity, Notifikasi, Profil. The user wants: **Home, Trips, Ticket, Profile** — cleaner separation that avoids mixing flows and overloading the UI.

## Changes

### 1. BottomNav.tsx — Update tabs
Replace the current 4 tabs:
- **Home** (`/`) — `Home` icon, keeps mode selection (Hailing/Shuttle)
- **Trips** (`/history`) — `Route` icon, label "Trips" — shows ride history for both modes
- **Ticket** (`/shuttle-ticket`) — `Ticket` icon, label "Tiket" — quick access to active shuttle e-tickets
- **Profile** (`/profile`) — `User` icon, label "Profil"

Remove Notifications tab from bottom nav. Notifications remain accessible via the bell icon on the Home screen top bar.

Also hide bottom nav on booking flow pages (`/search`, `/ride-select`, `/booking`, `/shuttle`, `/shuttle-seat`, `/shuttle-booking`) to keep flows clean and unmixed.

### 2. BottomNav.tsx — Hide on flow pages
Expand the hide logic to cover all in-flow pages so the nav doesn't distract during active booking.

## Files to Edit
1. `src/components/BottomNav.tsx` — update tab config and hide logic

