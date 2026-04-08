import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CreditCard, Wallet, Banknote, ChevronRight, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const paymentMethods = [
  { id: "cash", name: "Tunai", icon: Banknote, desc: "Bayar langsung" },
  { id: "ewallet", name: "PYU-Pay", icon: Wallet, desc: "Saldo: Rp 250.000" },
  { id: "card", name: "Kartu", icon: CreditCard, desc: "•••• 4832" },
];

const BookingConfirmation = () => {
  const navigate = useNavigate();
  const [payment, setPayment] = useState("ewallet");

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <div className="bg-card border-b border-border p-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-foreground">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h2 className="font-bold text-foreground">Konfirmasi Pesanan</h2>
      </div>

      <div className="p-4 space-y-4">
        {/* Route */}
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
                <p className="text-sm font-bold text-foreground">Lokasi saat ini</p>
                <p className="text-xs text-muted-foreground">Jl. Gatot Subroto No. 12, Medan</p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground font-medium">TUJUAN</p>
                <p className="text-sm font-bold text-foreground">KNO Airport</p>
                <p className="text-xs text-muted-foreground">Kualanamu International Airport</p>
              </div>
            </div>
          </div>
        </div>

        {/* Service detail */}
        <div className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Detail Layanan</h4>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl">🚗</span>
            <div className="flex-1">
              <p className="text-sm font-bold text-foreground">PYU-Car</p>
              <p className="text-xs text-muted-foreground">4 seat • Est. 1j 15m</p>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-border space-y-1.5">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tarif dasar</span>
              <span className="text-foreground">Rp 45.000</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tol & parkir</span>
              <span className="text-foreground">Rp 35.000</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-success font-semibold">Promo</span>
              <span className="text-success font-semibold">- Rp 10.000</span>
            </div>
            <div className="flex justify-between text-sm font-extrabold pt-2 border-t border-border">
              <span className="text-foreground">Total</span>
              <span className="text-foreground">Rp 70.000</span>
            </div>
          </div>
        </div>

        {/* Payment */}
        <div className="bg-card rounded-xl border border-border p-4">
          <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Pembayaran</h4>
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

        {/* Safety note */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground bg-secondary rounded-lg p-3">
          <Shield className="h-4 w-4 text-primary" />
          <span>Perjalanan Anda dilindungi asuransi kecelakaan</span>
        </div>

        {/* CTA */}
        <Button
          className="w-full h-12 rounded-xl font-bold text-base bg-accent text-accent-foreground hover:bg-accent/90"
          onClick={() => navigate("/tracking")}
        >
          Konfirmasi & Bayar • Rp 70.000
        </Button>
      </div>
    </div>
  );
};

export default BookingConfirmation;
