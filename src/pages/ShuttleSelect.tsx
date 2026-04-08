import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Users, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ShuttleDeparture {
  id: string;
  time: string;
  seatsLeft: number;
  totalSeats: number;
  price: string;
  vehicle: string;
  pickup: string;
  duration: string;
}

const departures: ShuttleDeparture[] = [
  { id: "1", time: "06:00", seatsLeft: 4, totalSeats: 8, price: "Rp 85.000", vehicle: "Hiace", pickup: "Medan Fair", duration: "1j 15m" },
  { id: "2", time: "07:30", seatsLeft: 2, totalSeats: 8, price: "Rp 85.000", vehicle: "Hiace", pickup: "Sun Plaza", duration: "1j 20m" },
  { id: "3", time: "09:00", seatsLeft: 6, totalSeats: 12, price: "Rp 75.000", vehicle: "Bus Mini", pickup: "Amplas", duration: "1j 30m" },
  { id: "4", time: "10:30", seatsLeft: 1, totalSeats: 8, price: "Rp 90.000", vehicle: "Hiace", pickup: "Medan Fair", duration: "1j 15m" },
  { id: "5", time: "12:00", seatsLeft: 7, totalSeats: 12, price: "Rp 75.000", vehicle: "Bus Mini", pickup: "Ring Road", duration: "1j 10m" },
];

const timeFilters = ["Semua", "Pagi", "Siang", "Sore"];

const getSeatColor = (seats: number) => {
  if (seats <= 1) return "text-destructive";
  if (seats <= 3) return "text-yellow-600";
  return "text-success";
};

const ShuttleSelect = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("Semua");
  const [selected, setSelected] = useState<string | null>(null);

  // Nearest departure is the first one
  const nearestId = departures[0].id;

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-card border-b border-border p-4">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={() => navigate(-1)} className="text-foreground">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex-1">
            {/* Visual route header */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-extrabold text-foreground">Medan</span>
              <ArrowRight className="h-4 w-4 text-primary" />
              <span className="text-sm font-extrabold text-foreground">KNO Airport</span>
            </div>
            <p className="text-xs text-muted-foreground">Hari ini • 1 penumpang</p>
          </div>
        </div>

        {/* Time filter */}
        <div className="flex gap-2">
          {timeFilters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-bold transition-all",
                filter === f
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Departures */}
      <div className="p-4 space-y-2">
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Tersedia hari ini</p>

        {departures.map((dep) => (
          <button
            key={dep.id}
            onClick={() => setSelected(dep.id)}
            className={cn(
              "w-full rounded-xl border p-3 text-left transition-all",
              selected === dep.id
                ? "border-primary bg-primary/5 shadow-sm"
                : "border-border bg-card"
            )}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-lg font-extrabold text-foreground">{dep.time}</span>
                <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-md">{dep.duration}</span>
                {dep.id === nearestId && (
                  <Badge className="text-[10px] bg-primary/10 text-primary border-primary/20 px-1.5 py-0">
                    Segera
                  </Badge>
                )}
              </div>
              <span className="text-sm font-extrabold text-foreground">{dep.price}</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" /> {dep.pickup}
              </span>
              <span>•</span>
              <span>{dep.vehicle}</span>
              <span>•</span>
              <span className={cn(
                "flex items-center gap-1 font-bold",
                getSeatColor(dep.seatsLeft)
              )}>
                <Users className="h-3 w-3" /> {dep.seatsLeft}/{dep.totalSeats}
              </span>
            </div>
            {dep.id === nearestId && (
              <p className="text-[10px] text-primary font-semibold mt-1.5">⏱ Berangkat dalam 45 menit</p>
            )}
          </button>
        ))}
      </div>

      {/* CTA */}
      {selected && (
        <div className="fixed bottom-14 left-0 right-0 p-4 bg-card border-t border-border animate-slide-up">
          <Button
            className="w-full h-12 rounded-xl font-bold text-base bg-accent text-accent-foreground hover:bg-accent/90"
            onClick={() => navigate("/shuttle-seat")}
          >
            Reservasi Seat
          </Button>
        </div>
      )}
    </div>
  );
};

export default ShuttleSelect;
