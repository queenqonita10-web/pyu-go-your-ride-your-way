import { cn } from "@/lib/utils";

interface ServiceToggleProps {
  mode: "hailing" | "shuttle";
  onChange: (mode: "hailing" | "shuttle") => void;
}

const ServiceToggle = ({ mode, onChange }: ServiceToggleProps) => {
  return (
    <div className="inline-flex bg-card rounded-full p-1 shadow-lg border border-border">
      <button
        onClick={() => onChange("hailing")}
        className={cn(
          "px-5 py-2 rounded-full text-sm font-bold transition-all",
          mode === "hailing"
            ? "bg-primary text-primary-foreground shadow-md"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        🚗 Hailing
      </button>
      <button
        onClick={() => onChange("shuttle")}
        className={cn(
          "px-5 py-2 rounded-full text-sm font-bold transition-all",
          mode === "shuttle"
            ? "bg-primary text-primary-foreground shadow-md"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        🚌 Shuttle
      </button>
    </div>
  );
};

export default ServiceToggle;
