import { Clock, DollarSign } from "lucide-react";

interface PricePreviewProps {
  mode: "hailing" | "shuttle";
}

const PricePreview = ({ mode }: PricePreviewProps) => {
  if (mode === "hailing") {
    return (
      <div className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-accent/10 border border-accent/20">
        <div className="flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-accent" />
          <span className="text-sm font-bold text-foreground">~Rp 300-400rb</span>
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          <span className="text-xs font-semibold">5 min pickup</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-green-500/10 border border-green-500/20">
      <div className="flex items-center gap-2">
        <DollarSign className="h-4 w-4 text-green-500" />
        <span className="text-sm font-bold text-foreground">~Rp 150rb/org</span>
      </div>
      <div className="flex items-center gap-1.5 text-muted-foreground">
        <Clock className="h-3.5 w-3.5" />
        <span className="text-xs font-semibold">Berangkat 14:00</span>
      </div>
    </div>
  );
};

export default PricePreview;
