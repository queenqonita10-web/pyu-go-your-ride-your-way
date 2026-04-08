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
import BookingConfirmation from "./pages/BookingConfirmation";
import LiveTracking from "./pages/LiveTracking";
import RideHistory from "./pages/RideHistory";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import NotFound from "./pages/NotFound";

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
          <Route path="/booking" element={<BookingConfirmation />} />
          <Route path="/tracking" element={<LiveTracking />} />
          <Route path="/history" element={<RideHistory />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <BottomNav />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
