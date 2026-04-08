import { useNavigate } from "react-router-dom";
import { Clock, MapPin, Users, QrCode, Download, Share2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const ShuttleTicket = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Success header */}
      <div className="bg-primary px-4 pt-10 pb-8 text-center">
        <CheckCircle2 className="h-12 w-12 text-primary-foreground mx-auto mb-3" />
        <h2 className="text-lg font-extrabold text-primary-foreground">Booking Berhasil!</h2>
        <p className="text-sm text-primary-foreground/80 mt-1">E-tiket Anda sudah siap</p>
      </div>

      <div className="px-4 -mt-4 space-y-4">
        {/* Ticket card */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
          {/* QR Code */}
          <div className="flex flex-col items-center py-6 border-b border-dashed border-border">
            <div className="w-36 h-36 bg-secondary rounded-xl flex items-center justify-center mb-3">
              <QrCode className="h-20 w-20 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground font-medium">PYU-SHT-240408-001</p>
          </div>

          {/* Details */}
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] text-muted-foreground font-medium">RUTE</p>
                <p className="text-sm font-bold text-foreground">Medan Fair → KNO Airport</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <p className="text-[10px] text-muted-foreground font-medium">BERANGKAT</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <span className="text-sm font-bold text-foreground">06:00</span>
                </div>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground font-medium">KURSI</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <Users className="h-3 w-3 text-muted-foreground" />
                  <span className="text-sm font-bold text-foreground">#3</span>
                </div>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground font-medium">KENDARAAN</p>
                <span className="text-sm font-bold text-foreground">Hiace</span>
              </div>
            </div>

            <div>
              <p className="text-[10px] text-muted-foreground font-medium">TITIK JEMPUT</p>
              <div className="flex items-center gap-1 mt-0.5">
                <MapPin className="h-3 w-3 text-muted-foreground" />
                <span className="text-sm text-foreground">Medan Fair, Lobby Utama</span>
              </div>
            </div>

            <div className="pt-3 border-t border-border flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Total dibayar</span>
              <span className="text-base font-extrabold text-foreground">Rp 75.000</span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1 h-12 rounded-xl font-bold gap-2"
            onClick={() => {}}
          >
            <Download className="h-4 w-4" />
            Simpan
          </Button>
          <Button
            variant="outline"
            className="flex-1 h-12 rounded-xl font-bold gap-2"
            onClick={() => {}}
          >
            <Share2 className="h-4 w-4" />
            Bagikan
          </Button>
        </div>

        <Button
          className="w-full h-12 rounded-xl font-bold text-base bg-accent text-accent-foreground hover:bg-accent/90"
          onClick={() => navigate("/")}
        >
          Kembali ke Beranda
        </Button>
      </div>
    </div>
  );
};

export default ShuttleTicket;
