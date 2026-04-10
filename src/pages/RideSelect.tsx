import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Users, Clock, Tag, Route } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import MapView from "@/components/MapView";
import SmartSuggestion from "@/components/SmartSuggestion";

interface VehicleOption {
  id: string;
  name: string;
  emoji: string;
  eta: string;
  price: string;
  capacity: string;
  promo?: string;
}

const vehicles: VehicleOption[] = [
  { id: "motor", name: "PYU-Ride", emoji: "🏍️", eta: "3 min", price: "Rp 15.000", capacity: "1", promo: "-30%" },
  { id: "car", name: "PYU-Car", emoji: "🚗", eta: "5 min", price: "Rp 45.000", capacity: "4" },
  { id: "xl", name: "PYU-Car XL", emoji: "🚐", eta: "8 min", price: "Rp 65.000", capacity: "6" },
];

const RideSelect = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("car");

  const selectedVehicle = vehicles.find((v) => v.id === selected)!;

  return (
    <div className="h-screen flex flex-col relative">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 z-10 w-10 h-10 bg-card rounded-full shadow-md flex items-center justify-center border border-border"
      >
        <ArrowLeft className="h-5 w-5 text-foreground" />
      </button>

      {/* Route info */}
      <div className="absolute top-4 left-16 right-4 z-10 bg-card rounded-xl shadow-md p-3 border border-border">
        <div className="flex items-center gap-2">
          <div className="flex flex-col items-center gap-0.5">
            <div className="w-2 h-2 rounded-full bg-success" />
            <div className="w-px h-1 bg-border" />
            <div className="w-1 h-1 rounded-full bg-primary/40" />
            <div className="w-px h-1 bg-border" />
            <div className="w-2 h-2 rounded-sm bg-destructive" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold text-foreground">Lokasi saat ini</p>
            <p className="text-xs font-semibold text-foreground">KNO Airport</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <Route className="h-3 w-3" />
              <span className="font-semibold">~39 km</span>
            </div>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="flex-1">
        <MapView />
      </div>

      {/* Bottom sheet - Vehicle selection */}
      <div className="bg-card rounded-t-2xl shadow-[0_-4px_20px_rgba(0,0,0,0.08)] border-t border-border animate-slide-up">
        <div className="w-10 h-1 bg-muted rounded-full mx-auto mt-2" />
        <div className="p-4 space-y-3">
          <SmartSuggestion
            variant="shuttle-suggest"
            message="💡 Shuttle berangkat 06:00 — Rp 75.000 • Hemat ~Rp 250rb"
            cta="Lihat Shuttle"
            to="/shuttle"
          />
          <h3 className="font-bold text-foreground">Pilih Kendaraan</h3>

          {vehicles.map((v) => (
            <button
              key={v.id}
              onClick={() => setSelected(v.id)}
              className={cn(
                "w-full flex items-center gap-3 p-3 rounded-xl border transition-all",
                selected === v.id
                  ? "border-primary bg-primary/5 shadow-sm ring-1 ring-primary/20"
                  : "border-border bg-card"
              )}
            >
              <span className="text-2xl">{v.emoji}</span>
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-foreground">{v.name}</p>
                  {v.promo && (
                    <span className="text-[10px] font-bold bg-success/10 text-success px-1.5 py-0.5 rounded">
                      {v.promo}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{v.eta}</span>
                  <span>•</span>
                  <Users className="h-3 w-3" />
                  <span>{v.capacity} seat</span>
                </div>
              </div>
              <p className="text-sm font-extrabold text-foreground">{v.price}</p>
            </button>
          ))}

          <Button
            className="w-full h-12 rounded-xl font-bold text-base bg-accent text-accent-foreground hover:bg-accent/90"
            onClick={() => navigate("/booking")}
          >
            Konfirmasi {selectedVehicle.name} • {selectedVehicle.price}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RideSelect;
