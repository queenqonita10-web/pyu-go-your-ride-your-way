import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, CreditCard, Globe, Bell as BellIcon, HelpCircle, ChevronRight, LogOut } from "lucide-react";

const menuItems = [
  { icon: MapPin, label: "Alamat Tersimpan", desc: "2 lokasi", href: "#" },
  { icon: CreditCard, label: "Metode Pembayaran", desc: "PYU-Pay, Tunai", href: "#" },
  { icon: Globe, label: "Bahasa", desc: "Indonesia", href: "#" },
  { icon: BellIcon, label: "Notifikasi", desc: "Aktif", href: "#" },
  { icon: HelpCircle, label: "Bantuan & Dukungan", desc: "", href: "#" },
];

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-primary p-4 pb-8">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate("/")} className="text-primary-foreground">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h2 className="font-bold text-primary-foreground">Profil</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-primary-foreground/20 rounded-full flex items-center justify-center text-3xl">
            👤
          </div>
          <div>
            <p className="text-lg font-extrabold text-primary-foreground">Ahmad Rizky</p>
            <p className="text-sm text-primary-foreground/70">+62 812 3456 7890</p>
            <p className="text-sm text-primary-foreground/70">ahmad@email.com</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mx-4 -mt-4 bg-card rounded-xl border border-border p-4 flex justify-around shadow-sm">
        <div className="text-center">
          <p className="text-lg font-extrabold text-foreground">42</p>
          <p className="text-[10px] text-muted-foreground font-medium">Perjalanan</p>
        </div>
        <div className="w-px bg-border" />
        <div className="text-center">
          <p className="text-lg font-extrabold text-foreground">4.8</p>
          <p className="text-[10px] text-muted-foreground font-medium">Rating</p>
        </div>
        <div className="w-px bg-border" />
        <div className="text-center">
          <p className="text-lg font-extrabold text-accent-foreground">Rp 250K</p>
          <p className="text-[10px] text-muted-foreground font-medium">PYU-Pay</p>
        </div>
      </div>

      {/* Menu */}
      <div className="p-4 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.label}
            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-secondary transition-colors"
          >
            <item.icon className="h-5 w-5 text-muted-foreground" />
            <div className="flex-1 text-left">
              <p className="text-sm font-semibold text-foreground">{item.label}</p>
              {item.desc && <p className="text-xs text-muted-foreground">{item.desc}</p>}
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
        ))}
      </div>

      <div className="px-4">
        <button className="w-full flex items-center gap-3 p-3 rounded-xl text-destructive hover:bg-destructive/5 transition-colors">
          <LogOut className="h-5 w-5" />
          <span className="text-sm font-semibold">Keluar</span>
        </button>
      </div>
    </div>
  );
};

export default Profile;
