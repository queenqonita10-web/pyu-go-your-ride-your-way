import { Clock, DollarSign, TrendingDown, AlertCircle, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PricePreviewProps {
  mode: "hailing" | "shuttle";
}

const PricePreview = ({ mode }: PricePreviewProps) => {
  if (mode === "hailing") {
    return (
      <div className="rounded-xl bg-accent/10 border border-accent/20 p-3 space-y-2">
        <div className="flex items-center gap-1.5">
          <AlertCircle className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Estimasi tarif</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-accent" />
            <span className="text-lg font-extrabold text-foreground">~Rp 300-400rb</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            <span className="text-xs font-semibold">5 min pickup</span>
          </div>
        </div>
        <p className="text-[10px] text-muted-foreground italic">*Harga dapat berubah sesuai kondisi jalan</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-3 space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <CheckCircle className="h-3.5 w-3.5 text-green-500" />
          <span className="text-[11px] font-semibold text-green-600 uppercase tracking-wide">Harga pasti</span>
        </div>
        <Badge className="bg-green-500/20 text-green-600 border-green-500/30 text-[10px] font-bold px-2 py-0.5 hover:bg-green-500/20">
          <TrendingDown className="h-3 w-3 mr-1" />
          Hemat hingga 40%
        </Badge>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-green-500" />
          <span className="text-lg font-extrabold text-foreground">Rp 150.000<span className="text-sm font-semibold text-muted-foreground">/org</span></span>
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          <span className="text-xs font-semibold">Berangkat 14:00</span>
        </div>
      </div>
      <p className="text-[10px] text-green-600 font-medium">Sudah termasuk semua biaya — tanpa biaya tambahan</p>
    </div>
  );
};

export default PricePreview;
