import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Phone, MessageCircle, Navigation, Star, Share2, MapPin, Users, Headphones, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import MapView from "@/components/MapView";
import { Badge } from "@/components/ui/badge";

const hailingSteps = [
  { label: "Mencari", done: true },
  { label: "Ditemukan", done: true },
  { label: "Menuju", done: true },
  { label: "Tiba", done: false },
];

const shuttleStops = [
  { name: "Medan Fair", eta: "06:00", passengers: 3, active: false, done: true },
  { name: "Sun Plaza", eta: "06:20", passengers: 2, active: true, done: false },
  { name: "Tol Amplas", eta: "06:40", passengers: 0, active: false, done: false },
  { name: "KNO Airport", eta: "07:15", passengers: 0, active: false, done: false },
];

const LiveTracking = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const trackingMode = searchParams.get("mode") === "shuttle" ? "shuttle" : "hailing";

  return (
    <div className="h-screen flex flex-col relative">
      {/* Map */}
      <div className="flex-1">
        <MapView />
      </div>

      {/* Progress steps / ETA banner */}
      {trackingMode === "hailing" ? (
        <div className="absolute top-4 left-4 right-4 z-10 space-y-2">
          {/* Progress steps */}
          <div className="bg-card rounded-xl p-3 shadow-lg border border-border">
            <div className="flex items-center justify-between">
              {hailingSteps.map((step, i) => (
                <div key={step.label} className="flex items-center gap-1">
                  <div className={cn(
                    "w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold",
                    step.done ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  )}>
                    {step.done ? "✓" : i + 1}
                  </div>
                  <span className={cn(
                    "text-[10px] font-semibold",
                    step.done ? "text-foreground" : "text-muted-foreground"
                  )}>{step.label}</span>
                  {i < hailingSteps.length - 1 && (
                    <div className={cn("w-4 h-px mx-0.5", step.done ? "bg-primary" : "bg-border")} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ETA */}
          <div className="bg-primary text-primary-foreground rounded-xl p-3 flex items-center justify-between shadow-lg">
            <div>
              <p className="text-xs font-medium opacity-80">Driver sedang menuju ke Anda</p>
              <p className="text-lg font-extrabold">Tiba dalam 5 menit</p>
            </div>
            <div className="w-12 h-12 bg-primary-foreground/20 rounded-full flex items-center justify-center">
              <Navigation className="h-6 w-6 text-primary-foreground" />
            </div>
          </div>
        </div>
      ) : (
        <div className="absolute top-4 left-4 right-4 z-10">
          <div className="bg-primary text-primary-foreground rounded-xl p-3 flex items-center justify-between shadow-lg">
            <div>
              <p className="text-xs font-medium opacity-80">Shuttle dalam perjalanan</p>
              <p className="text-lg font-extrabold">Tiba di Sun Plaza ~06:20</p>
            </div>
            <div className="w-12 h-12 bg-primary-foreground/20 rounded-full flex items-center justify-center">
              <span className="text-xl">🚐</span>
            </div>
          </div>
        </div>
      )}

      {/* Bottom sheet */}
      <div className="bg-card rounded-t-2xl shadow-[0_-4px_20px_rgba(0,0,0,0.08)] border-t border-border animate-slide-up">
        <div className="w-10 h-1 bg-muted rounded-full mx-auto mt-2" />
        <div className="p-4 space-y-4">
          {trackingMode === "hailing" ? (
            <>
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
                    <span>• Toyota Avanza</span>
                  </div>
                  <Badge variant="outline" className="mt-1 text-[10px] font-extrabold tracking-widest px-2">
                    B 1234 ABC
                  </Badge>
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
                <Button variant="outline" className="h-11 rounded-xl px-3" title="Bagikan lokasi">
                  <Share2 className="h-4 w-4" />
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
            </>
          ) : (
            <>
              {/* Shuttle info */}
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-secondary rounded-full flex items-center justify-center text-2xl">
                  🚐
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-foreground">Shuttle Hiace</p>
                  <p className="text-xs text-muted-foreground">Medan Fair → KNO Airport</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-[10px] font-extrabold tracking-widest px-2">
                      BK 5678 XY
                    </Badge>
                    <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                      <Users className="h-3 w-3" /> 5/8
                    </span>
                  </div>
                </div>
              </div>

              {/* Route stops */}
              <div className="bg-secondary rounded-xl p-3 space-y-0">
                {shuttleStops.map((stop, i) => (
                  <div key={stop.name} className="flex items-start gap-2">
                    <div className="flex flex-col items-center">
                      <div className={cn(
                        "w-3 h-3 rounded-full border-2 flex items-center justify-center",
                        stop.done ? "bg-success border-success" : stop.active ? "bg-primary border-primary animate-pulse" : "bg-muted border-border"
                      )}>
                        {stop.done && <CheckCircle2 className="h-2 w-2 text-success-foreground" />}
                      </div>
                      {i < shuttleStops.length - 1 && (
                        <div className={cn("w-px h-6", stop.done ? "bg-success" : "bg-border")} />
                      )}
                    </div>
                    <div className="flex-1 pb-2">
                      <p className={cn(
                        "text-xs font-semibold",
                        stop.active ? "text-primary" : stop.done ? "text-muted-foreground" : "text-foreground"
                      )}>
                        {stop.name}
                        {stop.active && <span className="ml-1 text-[10px] text-primary font-bold">← Anda</span>}
                      </p>
                      <p className="text-[10px] text-muted-foreground">ETA {stop.eta}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Contact CS */}
              <Button variant="outline" className="w-full h-11 rounded-xl gap-2 font-semibold">
                <Headphones className="h-4 w-4" /> Hubungi CS
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveTracking;
