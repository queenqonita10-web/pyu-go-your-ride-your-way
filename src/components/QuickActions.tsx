import { Plane, Bookmark, Tag, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const actions = [
  { icon: Plane, label: "Airport", color: "bg-primary/10 text-primary" },
  { icon: Bookmark, label: "Tersimpan", color: "bg-accent/20 text-accent-foreground" },
  { icon: Tag, label: "Promo", color: "bg-success/10 text-success" },
  { icon: MapPin, label: "Sekitar", color: "bg-destructive/10 text-destructive" },
];

const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-3 px-1">
      {actions.map((action) => (
        <button
          key={action.label}
          onClick={() => {
            if (action.label === "Airport") navigate("/search?dest=kno");
          }}
          className="flex flex-col items-center gap-1"
        >
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${action.color}`}>
            <action.icon className="h-5 w-5" />
          </div>
          <span className="text-[10px] font-semibold text-muted-foreground">{action.label}</span>
        </button>
      ))}
    </div>
  );
};

export default QuickActions;
