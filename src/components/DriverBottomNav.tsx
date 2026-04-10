import { Home, Clock, Wallet, User } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { icon: Home, label: "Beranda", active: true },
  { icon: Clock, label: "Riwayat", active: false },
  { icon: Wallet, label: "Penghasilan", active: false },
  { icon: User, label: "Akun", active: false },
];

const DriverBottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border">
      <div className="flex items-center justify-around h-14 max-w-lg mx-auto">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            className={cn(
              "flex flex-col items-center justify-center gap-0.5 flex-1 h-full transition-colors",
              tab.active ? "text-primary" : "text-muted-foreground"
            )}
          >
            <tab.icon className="h-5 w-5" strokeWidth={tab.active ? 2.5 : 2} />
            <span className="text-[10px] font-semibold">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default DriverBottomNav;
