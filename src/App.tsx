import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import BottomNav from "@/components/BottomNav";
import Index from "./pages/Index";
import LocationSearch from "./pages/LocationSearch";
import RideSelect from "./pages/RideSelect";
import ShuttleSelect from "./pages/ShuttleSelect";
import ShuttleSeatSelect from "./pages/ShuttleSeatSelect";
import ShuttleBooking from "./pages/ShuttleBooking";
import ShuttleTicket from "./pages/ShuttleTicket";
import BookingConfirmation from "./pages/BookingConfirmation";
import LiveTracking from "./pages/LiveTracking";
import RideHistory from "./pages/RideHistory";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import NotFound from "./pages/NotFound";
import DriverDashboard from "./pages/DriverDashboard";
import DriverEarnings from "./pages/DriverEarnings";
import DriverWithdraw from "./pages/DriverWithdraw";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import HailingAnalytics from "./pages/admin/HailingAnalytics";
import ShuttleAnalytics from "./pages/admin/ShuttleAnalytics";
import RayonManagement from "./pages/admin/RayonManagement";
import PricingControl from "./pages/admin/PricingControl";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/search" element={<LocationSearch />} />
          <Route path="/ride-select" element={<RideSelect />} />
          <Route path="/shuttle" element={<ShuttleSelect />} />
          <Route path="/shuttle-seat" element={<ShuttleSeatSelect />} />
          <Route path="/shuttle-booking" element={<ShuttleBooking />} />
          <Route path="/shuttle-ticket" element={<ShuttleTicket />} />
          <Route path="/booking" element={<BookingConfirmation />} />
          <Route path="/tracking" element={<LiveTracking />} />
          <Route path="/history" element={<RideHistory />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/driver" element={<DriverDashboard />} />
          <Route path="/driver/earnings" element={<DriverEarnings />} />
          <Route path="/driver/withdraw" element={<DriverWithdraw />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="hailing" element={<HailingAnalytics />} />
            <Route path="shuttle" element={<ShuttleAnalytics />} />
            <Route path="rayons" element={<RayonManagement />} />
            <Route path="pricing" element={<PricingControl />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <BottomNav />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
