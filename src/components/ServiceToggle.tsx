import { cn } from "@/lib/utils";
import { Car, Bus } from "lucide-react";

interface ServiceToggleProps {
  mode: "hailing" | "shuttle";
  onChange: (mode: "hailing" | "shuttle") => void;
}

const ServiceToggle = ({ mode, onChange }: ServiceToggleProps) => {
  return (
    <div className="flex gap-2 w-full max-w-sm">
      {/* Hailing Card */}
      <button
        onClick={() => onChange("hailing")}
        className={cn(
          "flex-1 rounded-xl p-3 text-left transition-all border-2",
          mode === "hailing"
            ? "border-primary bg-primary/10 shadow-md"
            : "border-transparent bg-card/80 opacity-70"
        )}
      >
        <div className="flex items-center gap-2 mb-1.5">
          <Car className="h-5 w-5 text-accent" />
          <span className="text-sm font-extrabold text-foreground">Hailing</span>
        </div>
        <div className="flex flex-wrap gap-1">
          {["Instan", "Pribadi", "Door-to-door"].map((tag) => (
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
      </button>

      {/* Shuttle Card */}
      <button
        onClick={() => onChange("shuttle")}
        className={cn(
          "flex-1 rounded-xl p-3 text-left transition-all border-2",
          mode === "shuttle"
            ? "border-primary bg-primary/10 shadow-md"
            : "border-transparent bg-card/80 opacity-70"
        )}
      >
        <div className="flex items-center gap-2 mb-1.5">
          <Bus className="h-5 w-5 text-green-500" />
          <span className="text-sm font-extrabold text-foreground">Shuttle</span>
        </div>
        <div className="flex flex-wrap gap-1">
          {["Terjadwal", "Berbagi", "Lebih Hemat"].map((tag) => (
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
      </button>
    </div>
  );
};

export default ServiceToggle;
