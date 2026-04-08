import { useNavigate } from "react-router-dom";
import { ArrowLeft, Car, Tag, Bell as BellIcon, Info } from "lucide-react";

interface Notification {
  id: string;
  type: "booking" | "promo" | "system";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const notifications: Notification[] = [
  { id: "1", type: "booking", title: "Driver Ditemukan!", message: "Budi Santoso sedang menuju lokasi Anda. Toyota Avanza hitam, B 1234 ABC.", time: "2 menit lalu", read: false },
  { id: "2", type: "promo", title: "Diskon 30% ke Airport! ✈️", message: "Gunakan kode TERBANG30 untuk perjalanan ke KNO Airport. Berlaku s/d 15 Apr.", time: "1 jam lalu", read: false },
  { id: "3", type: "booking", title: "Perjalanan Selesai", message: "Terima kasih! Perjalanan Anda ke KNO Airport telah selesai. Total: Rp 70.000", time: "Kemarin", read: true },
  { id: "4", type: "system", title: "Update Aplikasi", message: "Versi terbaru PYU-GO tersedia dengan fitur baru.", time: "2 hari lalu", read: true },
  { id: "5", type: "promo", title: "Shuttle Murah! 🚌", message: "Mulai Rp 75.000 ke KNO Airport. Pesan shuttle sekarang!", time: "3 hari lalu", read: true },
];

const iconMap = {
  booking: Car,
  promo: Tag,
  system: Info,
};

const colorMap = {
  booking: "bg-primary/10 text-primary",
  promo: "bg-accent/20 text-accent-foreground",
  system: "bg-secondary text-muted-foreground",
};

const Notifications = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-card border-b border-border p-4 flex items-center gap-3">
        <button onClick={() => navigate("/")} className="text-foreground">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h2 className="font-bold text-foreground">Notifikasi</h2>
      </div>

      <div className="divide-y divide-border">
        {notifications.map((n) => {
          const Icon = iconMap[n.type];
          return (
            <div key={n.id} className={`flex items-start gap-3 p-4 ${!n.read ? "bg-primary/[0.03]" : ""}`}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${colorMap[n.type]}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-foreground truncate">{n.title}</p>
                  {!n.read && <div className="w-2 h-2 rounded-full bg-primary shrink-0" />}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{n.message}</p>
                <p className="text-[10px] text-muted-foreground mt-1">{n.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Notifications;
