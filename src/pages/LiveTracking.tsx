import { useNavigate } from "react-router-dom";
import { Phone, MessageCircle, X, Navigation, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import MapView from "@/components/MapView";

const LiveTracking = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col relative">
      {/* Map */}
      <div className="flex-1">
        <MapView />
      </div>

      {/* ETA Banner */}
      <div className="absolute top-4 left-4 right-4 z-10 bg-primary text-primary-foreground rounded-xl p-3 flex items-center justify-between shadow-lg">
        <div>
          <p className="text-xs font-medium opacity-80">Driver sedang menuju ke Anda</p>
          <p className="text-lg font-extrabold">Tiba dalam 5 menit</p>
        </div>
        <div className="w-12 h-12 bg-primary-foreground/20 rounded-full flex items-center justify-center">
          <Navigation className="h-6 w-6 text-primary-foreground" />
        </div>
      </div>

      {/* Bottom sheet */}
      <div className="bg-card rounded-t-2xl shadow-[0_-4px_20px_rgba(0,0,0,0.08)] border-t border-border animate-slide-up">
        <div className="w-10 h-1 bg-muted rounded-full mx-auto mt-2" />
        <div className="p-4 space-y-4">
          {/* Driver info */}
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-secondary rounded-full flex items-center justify-center text-2xl">
              👨‍✈️
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-foreground">Budi Santoso</p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Star className="h-3 w-3 text-accent fill-accent" />
                <span className="font-semibold">4.9</span>
                <span>• Toyota Avanza • B 1234 ABC</span>
              </div>
              <p className="text-xs text-muted-foreground">Hitam • PYU-Car</p>
            </div>
          </div>

          {/* Contact buttons */}
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1 h-11 rounded-xl gap-2 font-semibold">
              <Phone className="h-4 w-4" /> Telepon
            </Button>
            <Button variant="outline" className="flex-1 h-11 rounded-xl gap-2 font-semibold">
              <MessageCircle className="h-4 w-4" /> Chat
            </Button>
          </div>

          {/* Route summary */}
          <div className="bg-secondary rounded-xl p-3">
            <div className="flex items-center gap-2">
              <div className="flex flex-col items-center gap-0.5">
                <div className="w-2 h-2 rounded-full bg-success" />
                <div className="w-px h-3 bg-border" />
                <div className="w-2 h-2 rounded-sm bg-destructive" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-foreground">Lokasi saat ini</p>
                <p className="text-xs font-semibold text-foreground">KNO Airport</p>
              </div>
              <span className="text-xs text-muted-foreground font-semibold">Rp 70.000</span>
            </div>
          </div>

          {/* Cancel */}
          <button
            onClick={() => navigate("/")}
            className="w-full text-center text-sm text-destructive font-semibold py-2"
          >
            Batalkan Perjalanan
          </button>
        </div>
      </div>
    </div>
  );
};

export default LiveTracking;
