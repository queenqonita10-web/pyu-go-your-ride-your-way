import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import MapView from "@/components/MapView";
import DriverBottomNav from "@/components/DriverBottomNav";
import {
  Navigation,
  MapPin,
  User,
  Clock,
  CheckCircle2,
  Users,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

// ── Hailing types & data ──
type HailingState = "idle" | "accepted" | "navigating" | "arrived" | "completed";

const hailingSteps = [
  { key: "idle", label: "Menunggu" },
  { key: "accepted", label: "Menuju Jemput" },
  { key: "arrived", label: "Dalam Perjalanan" },
  { key: "completed", label: "Selesai" },
] as const;

const incomingRide = {
  passenger: "Andi Wijaya",
  pickup: "Jl. Gatot Subroto No. 45",
  destination: "KNO Airport",
  distance: "32 km",
  fare: "Rp 280.000",
};

// ── Shuttle types & data ──
interface ShuttlePassenger {
  name: string;
  validated: boolean;
}

interface ShuttleStop {
  name: string;
  eta: string;
  passengers: ShuttlePassenger[];
  arrived: boolean;
}

const initialStops: ShuttleStop[] = [
  { name: "Medan Fair", eta: "06:00", passengers: [{ name: "Andi W.", validated: false }, { name: "Siti R.", validated: false }, { name: "Budi S.", validated: false }], arrived: false },
  { name: "Sun Plaza", eta: "06:20", passengers: [{ name: "Dewi L.", validated: false }, { name: "Rudi H.", validated: false }], arrived: false },
  { name: "Tol Amplas", eta: "06:40", passengers: [], arrived: false },
  { name: "KNO Airport", eta: "07:15", passengers: [], arrived: false },
];

// ── Hailing Driver ──
const HailingDriver = () => {
  const [state, setState] = useState<HailingState>("idle");
  const [countdown, setCountdown] = useState(15);

  useEffect(() => {
    if (state !== "idle") return;
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [state, countdown]);

  const stepIndex = hailingSteps.findIndex((s) => s.key === state);

  return (
    <div className="h-screen flex flex-col relative pb-14">
      <div className="flex-1 relative">
        <MapView />

        {/* Stepper */}
        <div className="absolute top-4 left-4 right-4 z-10">
          <div className="bg-card rounded-xl p-3 shadow-lg border border-border">
            <div className="flex items-center justify-between">
              {hailingSteps.map((step, i) => {
                const done = i <= stepIndex;
                return (
                  <div key={step.key} className="flex items-center gap-1">
                    <div className={cn(
                      "w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold",
                      done ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    )}>
                      {done ? "✓" : i + 1}
                    </div>
                    <span className={cn("text-[10px] font-semibold", done ? "text-foreground" : "text-muted-foreground")}>
                      {step.label}
                    </span>
                    {i < hailingSteps.length - 1 && (
                      <div className={cn("w-4 h-px mx-0.5", done ? "bg-primary" : "bg-border")} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom sheet */}
      <div className="bg-card rounded-t-2xl shadow-[0_-4px_20px_rgba(0,0,0,0.08)] border-t border-border">
        <div className="w-10 h-1 bg-muted rounded-full mx-auto mt-2" />
        <div className="p-4 space-y-4">
          {state === "idle" && (
            <>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-xl">
                  <User className="h-6 w-6 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-foreground">{incomingRide.passenger}</p>
                  <p className="text-xs text-muted-foreground">{incomingRide.distance} • {incomingRide.fare}</p>
                </div>
                <div className="flex items-center gap-1 text-sm font-bold text-destructive">
                  <Clock className="h-4 w-4" />
                  {countdown}s
                </div>
              </div>
              <div className="bg-secondary rounded-xl p-3 space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-success" />
                  <p className="text-xs font-semibold text-foreground">{incomingRide.pickup}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-sm bg-destructive" />
                  <p className="text-xs font-semibold text-foreground">{incomingRide.destination}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 h-11 rounded-xl font-semibold text-destructive border-destructive">
                  Tolak
                </Button>
                <Button className="flex-1 h-11 rounded-xl font-semibold" onClick={() => setState("accepted")}>
                  Terima
                </Button>
              </div>
            </>
          )}

          {state === "accepted" && (
            <>
              <div className="bg-primary text-primary-foreground rounded-xl p-3 flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium opacity-80">Menuju lokasi jemput</p>
                  <p className="text-lg font-extrabold">{incomingRide.pickup}</p>
                </div>
                <Navigation className="h-6 w-6" />
              </div>
              <Button className="w-full h-12 rounded-xl font-semibold text-base" onClick={() => setState("arrived")}>
                <MapPin className="h-5 w-5 mr-2" /> Sudah di Lokasi
              </Button>
            </>
          )}

          {state === "arrived" && (
            <>
              <div className="bg-primary text-primary-foreground rounded-xl p-3 flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium opacity-80">Dalam perjalanan ke</p>
                  <p className="text-lg font-extrabold">{incomingRide.destination}</p>
                </div>
                <Navigation className="h-6 w-6" />
              </div>
              <Button className="w-full h-12 rounded-xl font-semibold text-base" onClick={() => setState("completed")}>
                <CheckCircle2 className="h-5 w-5 mr-2" /> Selesaikan Perjalanan
              </Button>
            </>
          )}

          {state === "completed" && (
            <>
              <div className="text-center space-y-1">
                <CheckCircle2 className="h-10 w-10 text-success mx-auto" />
                <p className="text-lg font-extrabold text-foreground">Perjalanan Selesai!</p>
              </div>
              <div className="bg-secondary rounded-xl p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Penumpang</span>
                  <span className="font-semibold text-foreground">{incomingRide.passenger}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Jarak</span>
                  <span className="font-semibold text-foreground">{incomingRide.distance}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total</span>
                  <span className="font-bold text-primary">{incomingRide.fare}</span>
                </div>
              </div>
              <Button className="w-full h-12 rounded-xl font-semibold" onClick={() => { setState("idle"); setCountdown(15); }}>
                Kembali ke Beranda
              </Button>
            </>
          )}
        </div>
      </div>
      <DriverBottomNav />
    </div>
  );
};

// ── Shuttle Driver ──
const ShuttleDriver = () => {
  const [stops, setStops] = useState<ShuttleStop[]>(initialStops);
  const [expandedStop, setExpandedStop] = useState<number | null>(null);
  const [completed, setCompleted] = useState(false);

  const currentStopIdx = stops.findIndex((s) => !s.arrived);
  const allDone = stops.every((s) => s.arrived);

  const handleArrived = useCallback((idx: number) => {
    setStops((prev) => prev.map((s, i) => (i === idx ? { ...s, arrived: true } : s)));
    setExpandedStop(idx);
  }, []);

  const handleValidate = useCallback((stopIdx: number, passIdx: number) => {
    setStops((prev) =>
      prev.map((s, si) =>
        si === stopIdx
          ? { ...s, passengers: s.passengers.map((p, pi) => (pi === passIdx ? { ...p, validated: true } : p)) }
          : s
      )
    );
  }, []);

  const canDepart = (stopIdx: number) => {
    const stop = stops[stopIdx];
    return stop.arrived && stop.passengers.every((p) => p.validated);
  };

  const totalPassengers = stops.reduce((sum, s) => sum + s.passengers.length, 0);
  const validatedPassengers = stops.reduce((sum, s) => sum + s.passengers.filter((p) => p.validated).length, 0);

  if (completed) {
    return (
      <div className="h-screen flex flex-col pb-14">
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center space-y-4 w-full max-w-sm">
            <CheckCircle2 className="h-16 w-16 text-success mx-auto" />
            <p className="text-xl font-extrabold text-foreground">Perjalanan Selesai!</p>
            <div className="bg-secondary rounded-xl p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Rute</span>
                <span className="font-semibold text-foreground">Medan Fair → KNO Airport</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Halte dilalui</span>
                <span className="font-semibold text-foreground">{stops.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Penumpang terangkut</span>
                <span className="font-bold text-primary">{validatedPassengers}/{totalPassengers}</span>
              </div>
            </div>
            <Button className="w-full h-12 rounded-xl font-semibold" onClick={() => { setStops(initialStops.map(s => ({ ...s, arrived: false, passengers: s.passengers.map(p => ({ ...p, validated: false })) }))); setCompleted(false); setExpandedStop(null); }}>
              Kembali ke Beranda
            </Button>
          </div>
        </div>
        <DriverBottomNav />
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col pb-14">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4">
        <p className="text-xs font-medium opacity-80">Rute Shuttle</p>
        <p className="text-lg font-extrabold">Medan Fair → KNO Airport</p>
        <div className="flex items-center gap-3 mt-1">
          <Badge className="bg-primary-foreground/20 text-primary-foreground border-0 text-xs">
            Berangkat 06:00
          </Badge>
          <span className="text-xs opacity-80 flex items-center gap-1">
            <Users className="h-3 w-3" /> {validatedPassengers}/{totalPassengers} penumpang
          </span>
        </div>
      </div>

      {/* Stops timeline */}
      <div className="flex-1 overflow-y-auto p-4 space-y-0">
        {stops.map((stop, i) => {
          const isCurrent = i === currentStopIdx;
          const isExpanded = expandedStop === i;

          return (
            <div key={stop.name}>
              <div className="flex items-start gap-3">
                {/* Timeline dot + line */}
                <div className="flex flex-col items-center">
                  <div className={cn(
                    "w-4 h-4 rounded-full border-2 flex items-center justify-center",
                    stop.arrived ? "bg-success border-success" : isCurrent ? "bg-primary border-primary animate-pulse" : "bg-muted border-border"
                  )}>
                    {stop.arrived && <CheckCircle2 className="h-2.5 w-2.5 text-success-foreground" />}
                  </div>
                  {i < stops.length - 1 && (
                    <div className={cn("w-px flex-1 min-h-[24px]", stop.arrived ? "bg-success" : "bg-border")} />
                  )}
                </div>

                {/* Stop content */}
                <div className="flex-1 pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={cn("text-sm font-bold", isCurrent ? "text-primary" : stop.arrived ? "text-muted-foreground" : "text-foreground")}>
                        {stop.name}
                      </p>
                      <p className="text-xs text-muted-foreground">ETA {stop.eta} • {stop.passengers.length} penumpang</p>
                    </div>

                    {!stop.arrived && isCurrent && (
                      <Button size="sm" className="rounded-xl text-xs font-semibold h-8" onClick={() => handleArrived(i)}>
                        Tiba di Halte
                      </Button>
                    )}

                    {stop.arrived && stop.passengers.length > 0 && (
                      <button onClick={() => setExpandedStop(isExpanded ? null : i)} className="text-muted-foreground">
                        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </button>
                    )}
                  </div>

                  {/* Passenger validation */}
                  {isExpanded && stop.arrived && stop.passengers.length > 0 && (
                    <div className="mt-2 bg-secondary rounded-xl p-3 space-y-2">
                      <p className="text-xs font-semibold text-muted-foreground">Validasi Penumpang</p>
                      {stop.passengers.map((p, pi) => (
                        <div key={pi} className="flex items-center gap-2">
                          <Checkbox
                            checked={p.validated}
                            onCheckedChange={() => handleValidate(i, pi)}
                            disabled={p.validated}
                          />
                          <span className={cn("text-sm", p.validated ? "text-muted-foreground line-through" : "text-foreground font-medium")}>
                            {p.name}
                          </span>
                          {p.validated && <CheckCircle2 className="h-3.5 w-3.5 text-success ml-auto" />}
                        </div>
                      ))}
                      {canDepart(i) && (
                        <Button size="sm" className="w-full rounded-xl mt-1 font-semibold" onClick={() => setExpandedStop(null)}>
                          Berangkat ✓
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Complete button */}
      {allDone && (
        <div className="p-4 border-t border-border">
          <Button className="w-full h-12 rounded-xl font-semibold text-base" onClick={() => setCompleted(true)}>
            <CheckCircle2 className="h-5 w-5 mr-2" /> Perjalanan Selesai
          </Button>
        </div>
      )}

      <DriverBottomNav />
    </div>
  );
};

// ── Main ──
const DriverDashboard = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") === "shuttle" ? "shuttle" : "hailing";

  return mode === "shuttle" ? <ShuttleDriver /> : <HailingDriver />;
};

export default DriverDashboard;
