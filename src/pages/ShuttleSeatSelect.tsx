import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Users, Clock, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SeatStatus = "available" | "taken" | "selected";

interface Seat {
  id: string;
  row: number;
  col: number;
  status: SeatStatus;
}

const generateSeats = (): Seat[] => {
  const taken = new Set(["1-0", "1-1", "2-2", "3-1"]);
  const seats: Seat[] = [];
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 3; col++) {
      const key = `${row}-${col}`;
      seats.push({
        id: key,
        row,
        col,
        status: taken.has(key) ? "taken" : "available",
      });
    }
  }
  return seats;
};

const ShuttleSeatSelect = () => {
  const navigate = useNavigate();
  const [seats, setSeats] = useState<Seat[]>(generateSeats);
  const selected = seats.filter((s) => s.status === "selected");

  const toggleSeat = (id: string) => {
    setSeats((prev) =>
      prev.map((s) =>
        s.id === id && s.status !== "taken"
          ? { ...s, status: s.status === "selected" ? "available" : "selected" }
          : s
      )
    );
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-card border-b border-border p-4">
        <div className="flex items-center gap-3 mb-2">
          <button onClick={() => navigate(-1)} className="text-foreground">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h2 className="font-bold text-foreground">Pilih Kursi</h2>
        </div>

        {/* Departure summary bar */}
        <div className="flex items-center gap-3 bg-secondary rounded-lg px-3 py-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1 font-semibold text-foreground">
            <Clock className="h-3 w-3 text-primary" /> 06:00
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            Medan Fair <ArrowRight className="h-3 w-3" /> KNO
          </span>
          <span>•</span>
          <span>Hiace</span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-5 py-4">
        {[
          { label: "Tersedia", className: "bg-secondary border-border" },
          { label: "Dipilih", className: "bg-primary border-primary" },
          { label: "Terisi", className: "bg-muted border-muted opacity-50" },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            <div className={cn("w-5 h-5 rounded-md border", item.className)} />
            <span className="text-xs text-muted-foreground">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Seat grid */}
      <div className="px-4">
        <div className="bg-card rounded-2xl border border-border p-6">
          {/* Driver area & door */}
          <div className="flex justify-between items-center mb-6">
            <span className="text-[10px] text-muted-foreground font-medium bg-secondary px-2 py-1 rounded">🚪 Pintu</span>
            <div className="w-10 h-10 rounded-lg bg-muted border border-border flex items-center justify-center text-xs text-muted-foreground font-bold">
              🚐
            </div>
          </div>

          <div className="space-y-3">
            {[0, 1, 2, 3].map((row) => (
              <div key={row} className="flex justify-center gap-3">
                {seats
                  .filter((s) => s.row === row)
                  .map((seat) => (
                    <button
                      key={seat.id}
                      disabled={seat.status === "taken"}
                      onClick={() => toggleSeat(seat.id)}
                      className={cn(
                        "w-14 h-14 rounded-xl border-2 flex items-center justify-center text-sm font-bold transition-all",
                        seat.status === "available" &&
                          "bg-secondary border-border text-muted-foreground hover:border-primary",
                        seat.status === "selected" &&
                          "bg-primary border-primary text-primary-foreground scale-105",
                        seat.status === "taken" &&
                          "bg-muted border-muted text-muted-foreground/40 cursor-not-allowed"
                      )}
                    >
                      {seat.status === "taken" ? "✕" : seat.row * 3 + seat.col + 1}
                    </button>
                  ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      {selected.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-card border-t border-border animate-slide-up">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              <Users className="h-3.5 w-3.5 inline mr-1" />
              {selected.length} kursi dipilih
            </span>
            <span className="text-sm font-extrabold text-foreground">
              Rp {(85000 * selected.length).toLocaleString("id-ID")}
            </span>
          </div>
          <Button
            className="w-full h-12 rounded-xl font-bold text-base bg-accent text-accent-foreground hover:bg-accent/90"
            onClick={() => navigate("/shuttle-booking")}
          >
            Lanjut ke Pembayaran
          </Button>
        </div>
      )}
    </div>
  );
};

export default ShuttleSeatSelect;
