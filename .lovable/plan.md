

# PYU-GO — Hybrid Mobility App

## Design Direction
Functional & dense UI (Gojek-inspired), interactive map, unified home screen with both Hailing and Shuttle services.

## Pages & Features

### 1. Home Screen (Unified Hub)
- **Top bar**: User greeting, notification bell, profile avatar
- **Interactive map** showing user's current location with nearby drivers/shuttles
- **Service toggle** (Hailing / Shuttle) as a prominent pill-switch overlaying the bottom of the map
- **Quick booking card** (bottom sheet):
  - Pickup & destination fields (tap to expand into search)
  - For **Hailing**: "Book Now" CTA
  - For **Shuttle**: Date/time picker + passenger count + "Find Shuttles" CTA
- **Quick actions row**: Airport Transfer, Saved Places, Promo

### 2. Location Search
- Full-screen search overlay with text input
- Recent locations, saved places, popular destinations (KNO Airport pinned)
- Search results with address + distance
- "Set on map" option for pickup pin adjustment

### 3. Ride Selection (Hailing)
- Bottom sheet listing vehicle options (Motor, Car, Car XL) with price, ETA, capacity
- Each option shows icon, name, price estimate, arrival time
- Promo/discount badge if applicable
- "Confirm Booking" CTA

### 4. Shuttle Selection
- List of available shuttle departures for the chosen route/date
- Each card: departure time, seats available, price, vehicle type, pickup point
- Filter by time-of-day
- "Reserve Seat" CTA

### 5. Booking Confirmation
- Route summary with pickup → destination
- Service type, vehicle, price breakdown
- Payment method selector (Cash, E-Wallet, Card)
- "Confirm & Pay" button

### 6. Live Tracking
- Full-screen map with driver/shuttle location in real-time
- Driver info card: name, photo, vehicle, plate number, rating
- Contact driver (call/chat) buttons
- ETA countdown
- "Cancel Ride" option

### 7. Ride History
- List of past rides with date, route, price, service type
- Tap to see ride details and receipt
- Re-book button for frequent routes

### 8. Profile & Settings
- User info (name, phone, email)
- Saved places management
- Payment methods
- Language toggle (ID/EN)
- Notification preferences
- Help & Support link

### 9. Notifications
- Booking confirmations, driver assigned, shuttle reminders
- Promo alerts
- System notifications

## Color & Branding
- Primary: Deep blue (#1a365d) — trust, transport
- Accent: Bright yellow/amber — energy, CTAs
- Functional dense layout with compact cards, icon-heavy navigation
- Bottom tab navigation: Home, Activity, Notifications, Profile

## Mobile-First
- Designed for mobile viewport primarily
- Bottom sheet patterns for booking flows
- Thumb-friendly tap targets

