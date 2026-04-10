import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Bus, Zap, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

type SuggestionVariant = "shuttle-suggest" | "hailing-suggest" | "no-seats";

interface SmartSuggestionProps {
  variant: SuggestionVariant;
  message: string;
  cta: string;
  to: string;
  className?: string;
}

const variantStyles: Record<SuggestionVariant, { bg: string; border: string; icon: typeof Bus; iconColor: string; ctaBg: string; ctaText: string }> = {
  "shuttle-suggest": {
    bg: "bg-success/10",
    border: "border-success/20",
    icon: Bus,
    iconColor: "text-success",
    ctaBg: "bg-success",
    ctaText: "text-white",
  },
  "hailing-suggest": {
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
    icon: Zap,
    iconColor: "text-yellow-600",
    ctaBg: "bg-yellow-500",
    ctaText: "text-white",
  },
  "no-seats": {
    bg: "bg-destructive/10",
    border: "border-destructive/20",
    icon: AlertTriangle,
    iconColor: "text-destructive",
    ctaBg: "bg-destructive",
    ctaText: "text-destructive-foreground",
  },
};

const SmartSuggestion = ({ variant, message, cta, to, className }: SmartSuggestionProps) => {
  const navigate = useNavigate();
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const style = variantStyles[variant];
  const Icon = style.icon;

  return (
    <div className={cn("flex items-center gap-2.5 p-3 rounded-xl border", style.bg, style.border, className)}>
      <Icon className={cn("h-5 w-5 shrink-0", style.iconColor)} />
      <p className="flex-1 text-xs font-semibold text-foreground leading-tight">{message}</p>
      <button
        onClick={() => navigate(to)}
        className={cn("shrink-0 px-3 py-1.5 rounded-lg text-[11px] font-bold", style.ctaBg, style.ctaText)}
      >
        {cta}
      </button>
      <button onClick={() => setDismissed(true)} className="shrink-0 p-0.5 text-muted-foreground">
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
};

export default SmartSuggestion;
