import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Search, MapPin } from "lucide-react";
import ServiceToggle from "@/components/ServiceToggle";
import MapView from "@/components/MapView";
import PricePreview from "@/components/PricePreview";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 11) return "Selamat pagi ☀️";
  if (h < 15) return "Selamat siang 🌤️";
  if (h < 18) return "Selamat sore 🌅";
  return "Selamat malam 🌙";
};

const Index = () => {
  const [mode, setMode] = useState<"hailing" | "shuttle">("hailing");
  const navigate = useNavigate();
  const greeting = useMemo(getGreeting, []);

  return (
    <div className="h-screen flex flex-col relative">
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 z-10 px-4 pt-3 pb-2 flex items-center justify-between bg-gradient-to-b from-background/90 to-transparent">
        <div className="animate-fade-in">
          <p className="text-xs text-muted-foreground font-medium">{greeting}</p>
          <h1 className="text-lg font-extrabold text-foreground tracking-tight">PYU-GO</h1>
        </div>
        <button
          onClick={() => navigate("/notifications")}
          className="w-10 h-10 rounded-full bg-card shadow-md flex items-center justify-center border border-border"
        >
          <Bell className="h-5 w-5 text-foreground" />
          <span className="absolute top-3 right-5 w-2 h-2 bg-destructive rounded-full" />
        </button>
      </div>

      {/* Map */}
      <div className="flex-1">
        <MapView />
      </div>

      {/* Bottom Sheet */}
      <div className="absolute bottom-14 left-0 right-0 z-10 bg-card rounded-t-2xl shadow-[0_-4px_20px_rgba(0,0,0,0.08)] border-t border-border animate-slide-up">
        <div className="w-10 h-1 bg-muted rounded-full mx-auto mt-2" />
        <div className="p-4 space-y-3">
          {/* Service Toggle inside sheet */}
          <ServiceToggle mode={mode} onChange={setMode} />

          {/* Pickup & Destination */}
          {mode === "hailing" ? (
            <button
              onClick={() => navigate("/search")}
              className="w-full flex items-center gap-3 bg-secondary rounded-xl p-3"
            >
              <div className="flex flex-col items-center gap-1">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-green-500/30" />
                <div className="w-px h-4 bg-border" />
                <div className="w-2.5 h-2.5 rounded-sm bg-destructive border-2 border-destructive/30" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-xs text-muted-foreground">Lokasi jemput</p>
                <p className="text-sm font-semibold text-foreground">Lokasi saat ini</p>
                <div className="border-t border-border my-1.5" />
                <p className="text-xs text-muted-foreground">Tujuan</p>
                <p className="text-sm font-medium text-muted-foreground">Mau ke mana?</p>
              </div>
              <Search className="h-5 w-5 text-muted-foreground" />
            </button>
          ) : (
            <button
              onClick={() => navigate("/shuttle")}
              className="w-full flex items-center gap-3 bg-secondary rounded-xl p-3"
            >
              <div className="flex flex-col items-center gap-1">
                <MapPin className="h-4 w-4 text-primary" />
                <div className="w-px h-4 bg-border" />
                <MapPin className="h-4 w-4 text-destructive" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-xs text-muted-foreground">Titik jemput</p>
                <p className="text-sm font-semibold text-foreground">Pilih titik jemput</p>
                <div className="border-t border-border my-1.5" />
                <p className="text-xs text-muted-foreground">Titik turun</p>
                <p className="text-sm font-semibold text-foreground">Pilih titik turun</p>
              </div>
              <Search className="h-5 w-5 text-muted-foreground" />
            </button>
          )}

          {/* Savings Banner */}
          {mode === "shuttle" && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-500/10 border border-green-500/20">
              <span className="text-sm">💰</span>
              <span className="text-xs font-bold text-green-600">Hemat hingga 40% dibanding Hailing</span>
            </div>
          )}

          {/* Price Preview */}
          <PricePreview mode={mode} />

          {/* CTA */}
          {mode === "hailing" ? (
            <Button
              className="w-full h-12 rounded-xl font-bold text-base bg-accent text-accent-foreground hover:bg-accent/90"
              onClick={() => navigate("/search")}
            >
              Pesan Sekarang
            </Button>
          ) : (
            <div className="flex gap-2">
              <div className="flex-1 bg-secondary rounded-xl p-3">
                <p className="text-[10px] text-muted-foreground font-medium">Tanggal</p>
                <p className="text-sm font-bold text-foreground">{format(new Date(), "dd MMM")}</p>
              </div>
              <div className="flex-1 bg-secondary rounded-xl p-3">
                <p className="text-[10px] text-muted-foreground font-medium">Penumpang</p>
                <p className="text-sm font-bold text-foreground">1 org</p>
              </div>
              <Button
                className="flex-1 h-auto rounded-xl font-bold bg-accent text-accent-foreground hover:bg-accent/90"
                onClick={() => navigate("/shuttle")}
              >
                Cari Shuttle
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
