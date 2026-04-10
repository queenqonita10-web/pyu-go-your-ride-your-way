import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CreditCard, Wallet, Shield, Clock, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const paymentMethods = [
  { id: "ewallet", name: "PYU-Pay", icon: Wallet, desc: "Saldo: Rp 250.000" },
  { id: "card", name: "Kartu Debit/Kredit", icon: CreditCard, desc: "•••• 4832" },
];

const ShuttleBooking = () => {
  const navigate = useNavigate();
  const [payment, setPayment] = useState("ewallet");

  const seatCount = 1;
  const pricePerSeat = 85000;
  const total = seatCount * pricePerSeat;

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <div className="bg-card border-b border-border p-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-foreground">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h2 className="font-bold text-foreground">Konfirmasi Shuttle</h2>
      </div>

      <div className="p-4 space-y-4">
        {/* Route summary */}
        <div className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-start gap-3">
            <div className="flex flex-col items-center gap-0.5 mt-1">
              <div className="w-2.5 h-2.5 rounded-full bg-success" />
              <div className="w-px h-8 bg-border" />
              <div className="w-2.5 h-2.5 rounded-sm bg-destructive" />
            </div>
            <div className="flex-1 space-y-3">
              <div>
                <p className="text-[10px] text-muted-foreground font-medium">JEMPUT</p>
                <p className="text-sm font-bold text-foreground">Medan Fair</p>
                <p className="text-xs text-muted-foreground">Titik jemput tetap</p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground font-medium">TUJUAN</p>
                <p className="text-sm font-bold text-foreground">KNO Airport</p>
                <p className="text-xs text-muted-foreground">Kualanamu International Airport</p>
              </div>
            </div>
          </div>
        </div>

        {/* Departure details */}
        <div className="bg-card rounded-xl border border-border p-4">
          <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Detail Keberangkatan</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-foreground font-semibold">06:00</span>
              <span className="text-muted-foreground">• Hari ini</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-foreground">Hiace • Est. 1j 15m</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-foreground">Kursi #3 • {seatCount} penumpang</span>
            </div>
          </div>
        </div>

        {/* Price breakdown */}
        <div className="bg-card rounded-xl border border-border p-4">
          <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Rincian Harga</h4>
          <div className="space-y-1.5">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{seatCount}x Kursi shuttle</span>
              <span className="text-foreground">Rp {total.toLocaleString("id-ID")}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-success font-semibold">Promo hemat</span>
              <span className="text-success font-semibold">- Rp 10.000</span>
            </div>
            <div className="flex justify-between text-xs pt-1.5">
              <span className="text-muted-foreground">Hailing untuk rute ini</span>
              <span className="text-muted-foreground line-through">~Rp 350.000</span>
            </div>
            <div className="flex justify-between text-sm font-extrabold pt-2 border-t border-border">
              <span className="text-foreground">Total</span>
              <span className="text-foreground">Rp {(total - 10000).toLocaleString("id-ID")}</span>
            </div>
            <div className="flex items-center gap-1.5 pt-1">
              <span className="text-xs font-bold text-success">Anda hemat ~Rp 275.000!</span>
            </div>
          </div>
        </div>

        {/* Payment */}
        <div className="bg-card rounded-xl border border-border p-4">
          <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Pembayaran</h4>
          <p className="text-xs text-muted-foreground mb-2">Shuttle hanya menerima pembayaran non-tunai</p>
          {paymentMethods.map((pm) => (
            <button
              key={pm.id}
              onClick={() => setPayment(pm.id)}
              className={cn(
                "w-full flex items-center gap-3 p-3 rounded-lg mb-1.5 transition-all",
                payment === pm.id ? "bg-primary/5 border border-primary" : "border border-transparent"
              )}
            >
              <pm.icon className={cn("h-5 w-5", payment === pm.id ? "text-primary" : "text-muted-foreground")} />
              <div className="flex-1 text-left">
                <p className="text-sm font-semibold text-foreground">{pm.name}</p>
                <p className="text-xs text-muted-foreground">{pm.desc}</p>
              </div>
              <div className={cn(
                "w-4 h-4 rounded-full border-2",
                payment === pm.id ? "border-primary bg-primary" : "border-muted-foreground"
              )}>
                {payment === pm.id && <div className="w-1.5 h-1.5 bg-primary-foreground rounded-full m-auto mt-0.5" />}
              </div>
            </button>
          ))}
        </div>

        {/* Safety */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground bg-secondary rounded-lg p-3">
          <Shield className="h-4 w-4 text-primary" />
          <span>Perjalanan dilindungi asuransi kecelakaan</span>
        </div>

        {/* Urgency */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 border border-primary/20">
          <span className="text-sm">⏱</span>
          <span className="text-xs font-bold text-primary">Berangkat dalam 45 menit — segera konfirmasi</span>
        </div>

        {/* CTA */}
        <Button
          className="w-full h-12 rounded-xl font-bold text-base bg-accent text-accent-foreground hover:bg-accent/90"
          onClick={() => navigate("/shuttle-ticket")}
        >
          Bayar & Konfirmasi • Rp {(total - 10000).toLocaleString("id-ID")}
        </Button>
      </div>
    </div>
  );
};

export default ShuttleBooking;
