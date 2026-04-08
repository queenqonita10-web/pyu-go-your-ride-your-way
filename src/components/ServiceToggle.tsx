import { cn } from "@/lib/utils";
import { Car, Bus } from "lucide-react";

interface ServiceToggleProps {
  mode: "hailing" | "shuttle";
  onChange: (mode: "hailing" | "shuttle") => void;
}

const ServiceToggle = ({ mode, onChange }: ServiceToggleProps) => {
  return (
    <div className="flex gap-2 w-full">
      {/* Hailing Card */}
      <button
        onClick={() => onChange("hailing")}
        className={cn(
          "flex-1 rounded-xl p-3 text-left transition-all duration-200",
          mode === "hailing"
            ? "border-2 border-primary bg-primary/10 shadow-md scale-[1.02]"
            : "border-2 border-dashed border-muted-foreground/30 bg-card/60 opacity-70 scale-100"
        )}
      >
        <div className="flex items-center gap-2 mb-1">
          <Car className="h-5 w-5 text-accent" />
          <div>
            <span className="text-sm font-extrabold text-foreground block leading-tight">Hailing</span>
            <span className="text-[10px] text-muted-foreground font-medium">Ride Now</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-1 mb-1.5">
          {["Instan", "Pribadi"].map((tag) => (
            <span
              key={tag}
              className={cn(
                "text-[10px] font-semibold px-1.5 py-0.5 rounded-full",
                mode === "hailing"
                  ? "bg-primary/20 text-primary"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="text-xs font-bold text-accent">~Rp 350rb</p>
      </button>

      {/* Shuttle Card */}
      <button
        onClick={() => onChange("shuttle")}
        className={cn(
          "flex-1 rounded-xl p-3 text-left transition-all duration-200",
          mode === "shuttle"
            ? "border-2 border-primary bg-primary/10 shadow-md scale-[1.02]"
            : "border-2 border-dashed border-muted-foreground/30 bg-card/60 opacity-70 scale-100"
        )}
      >
        <div className="flex items-center gap-2 mb-1">
          <Bus className="h-5 w-5 text-green-500" />
          <div>
            <span className="text-sm font-extrabold text-foreground block leading-tight">Shuttle</span>
            <span className="text-[10px] text-muted-foreground font-medium">Airport Shuttle</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-1 mb-1.5">
          {["Terjadwal", "Hemat"].map((tag) => (
            <span
              key={tag}
              className={cn(
                "text-[10px] font-semibold px-1.5 py-0.5 rounded-full",
                mode === "shuttle"
                  ? "bg-primary/20 text-primary"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="text-xs font-bold text-green-500">~Rp 150rb</p>
      </button>
    </div>
  );
};

export default ServiceToggle;
