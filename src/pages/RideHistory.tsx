import { useNavigate } from "react-router-dom";
import { ArrowLeft, RotateCcw } from "lucide-react";

interface RideRecord {
  id: string;
  date: string;
  from: string;
  to: string;
  price: string;
  type: string;
  emoji: string;
  status: string;
}

const rides: RideRecord[] = [
  { id: "1", date: "8 Apr 2026, 09:15", from: "Medan Fair", to: "KNO Airport", price: "Rp 70.000", type: "PYU-Car", emoji: "🚗", status: "Selesai" },
  { id: "2", date: "6 Apr 2026, 14:30", from: "KNO Airport", to: "Sun Plaza", price: "Rp 85.000", type: "Shuttle", emoji: "🚌", status: "Selesai" },
  { id: "3", date: "3 Apr 2026, 07:00", from: "Rumah", to: "KNO Airport", price: "Rp 15.000", type: "PYU-Ride", emoji: "🏍️", status: "Selesai" },
  { id: "4", date: "1 Apr 2026, 18:45", from: "Kantor", to: "Medan Fair", price: "Rp 25.000", type: "PYU-Car", emoji: "🚗", status: "Dibatalkan" },
];

const RideHistory = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-card border-b border-border p-4 flex items-center gap-3">
        <button onClick={() => navigate("/")} className="text-foreground">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h2 className="font-bold text-foreground">Riwayat Perjalanan</h2>
      </div>

      <div className="p-4 space-y-2">
        {rides.map((ride) => (
          <div key={ride.id} className="bg-card rounded-xl border border-border p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">{ride.emoji}</span>
                <span className="text-xs font-bold text-muted-foreground">{ride.type}</span>
              </div>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                ride.status === "Selesai" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
              }`}>
                {ride.status}
              </span>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <div className="flex flex-col items-center gap-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-success" />
                <div className="w-px h-2 bg-border" />
                <div className="w-1.5 h-1.5 rounded-sm bg-destructive" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-foreground">{ride.from}</p>
                <p className="text-xs font-semibold text-foreground">{ride.to}</p>
              </div>
              <p className="text-sm font-extrabold text-foreground">{ride.price}</p>
            </div>
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-border">
              <span className="text-[10px] text-muted-foreground">{ride.date}</span>
              {ride.status === "Selesai" && (
                <button className="flex items-center gap-1 text-xs font-bold text-primary">
                  <RotateCcw className="h-3 w-3" /> Pesan Lagi
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RideHistory;
