import { ArrowLeft, TrendingUp, Car, Clock, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import DriverBottomNav from "@/components/DriverBottomNav";

const dailyData = [
  { time: "06:00", trips: 2, amount: 145000 },
  { time: "08:00", trips: 3, amount: 210000 },
  { time: "10:00", trips: 1, amount: 85000 },
  { time: "12:00", trips: 2, amount: 160000 },
  { time: "14:00", trips: 1, amount: 95000 },
  { time: "16:00", trips: 2, amount: 180000 },
  { time: "18:00", trips: 3, amount: 250000 },
];

const weeklyData = [
  { day: "Sen", trips: 12, amount: 980000 },
  { day: "Sel", trips: 10, amount: 850000 },
  { day: "Rab", trips: 14, amount: 1125000 },
  { day: "Kam", trips: 8, amount: 720000 },
  { day: "Jum", trips: 15, amount: 1250000 },
  { day: "Sab", trips: 18, amount: 1480000 },
  { day: "Min", trips: 6, amount: 520000 },
];

const fmt = (n: number) => `Rp ${n.toLocaleString("id-ID")}`;

const todayTotal = dailyData.reduce((s, d) => s + d.amount, 0);
const todayTrips = dailyData.reduce((s, d) => s + d.trips, 0);
const weekTotal = weeklyData.reduce((s, d) => s + d.amount, 0);
const weekTrips = weeklyData.reduce((s, d) => s + d.trips, 0);
const maxDaily = Math.max(...dailyData.map((d) => d.amount));
const maxWeekly = Math.max(...weeklyData.map((d) => d.amount));

const StatCard = ({ icon: Icon, label, value }: { icon: typeof TrendingUp; label: string; value: string }) => (
  <div className="bg-secondary rounded-xl p-3 flex items-center gap-3 flex-1">
    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
      <Icon className="h-4 w-4 text-primary" />
    </div>
    <div>
      <p className="text-[10px] text-muted-foreground font-medium">{label}</p>
      <p className="text-sm font-extrabold text-foreground">{value}</p>
    </div>
  </div>
);

const BarChart = ({ data, labelKey, max }: { data: { label: string; amount: number }[]; labelKey: string; max: number }) => (
  <div className="flex items-end gap-1.5 h-32">
    {data.map((d) => (
      <div key={d.label} className="flex-1 flex flex-col items-center gap-1">
        <div className="w-full bg-primary/20 rounded-t-md relative overflow-hidden" style={{ height: `${(d.amount / max) * 100}%`, minHeight: 4 }}>
          <div className="absolute inset-0 bg-primary rounded-t-md" />
        </div>
        <span className="text-[9px] text-muted-foreground font-medium">{d.label}</span>
      </div>
    ))}
  </div>
);

const DriverEarnings = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-16">
      {/* Header */}
      <div className="bg-primary p-4 pb-6">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate("/driver?mode=hailing")} className="text-primary-foreground">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h2 className="font-bold text-primary-foreground">Penghasilan</h2>
        </div>
        <p className="text-xs text-primary-foreground/70">Total bulan ini</p>
        <p className="text-2xl font-extrabold text-primary-foreground">Rp 12.450.000</p>
        <div className="mt-3 flex items-center justify-between bg-primary-foreground/10 rounded-xl p-3">
          <div>
            <p className="text-[10px] text-primary-foreground/70">Saldo tersedia</p>
            <p className="text-sm font-bold text-primary-foreground">Rp 5.250.000</p>
          </div>
          <button
            onClick={() => navigate("/driver/withdraw")}
            className="bg-primary-foreground text-primary text-xs font-bold px-4 py-2 rounded-lg"
          >
            Tarik Saldo
          </button>
        </div>
      </div>

      <div className="p-4 -mt-3 space-y-4">
        <Tabs defaultValue="daily">
          <TabsList className="w-full">
            <TabsTrigger value="daily" className="flex-1">Hari Ini</TabsTrigger>
            <TabsTrigger value="weekly" className="flex-1">Minggu Ini</TabsTrigger>
          </TabsList>

          <TabsContent value="daily" className="space-y-4 mt-3">
            <div className="flex gap-2">
              <StatCard icon={TrendingUp} label="Pendapatan" value={fmt(todayTotal)} />
              <StatCard icon={Car} label="Perjalanan" value={`${todayTrips} trip`} />
            </div>
            <div className="flex gap-2">
              <StatCard icon={Clock} label="Jam aktif" value="10 jam" />
              <StatCard icon={Users} label="Penumpang" value={`${todayTrips + 4} org`} />
            </div>

            <div className="bg-card rounded-xl border border-border p-4">
              <p className="text-xs font-semibold text-muted-foreground mb-3">Pendapatan per jam</p>
              <BarChart data={dailyData.map((d) => ({ label: d.time, amount: d.amount }))} labelKey="time" max={maxDaily} />
            </div>

            <div className="bg-card rounded-xl border border-border divide-y divide-border">
              {dailyData.map((d) => (
                <div key={d.time} className="flex items-center justify-between p-3">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{d.time}</p>
                    <p className="text-xs text-muted-foreground">{d.trips} trip</p>
                  </div>
                  <p className="text-sm font-bold text-primary">{fmt(d.amount)}</p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="weekly" className="space-y-4 mt-3">
            <div className="flex gap-2">
              <StatCard icon={TrendingUp} label="Pendapatan" value={fmt(weekTotal)} />
              <StatCard icon={Car} label="Perjalanan" value={`${weekTrips} trip`} />
            </div>

            <div className="bg-card rounded-xl border border-border p-4">
              <p className="text-xs font-semibold text-muted-foreground mb-3">Pendapatan per hari</p>
              <BarChart data={weeklyData.map((d) => ({ label: d.day, amount: d.amount }))} labelKey="day" max={maxWeekly} />
            </div>

            <div className="bg-card rounded-xl border border-border divide-y divide-border">
              {weeklyData.map((d) => (
                <div key={d.day} className="flex items-center justify-between p-3">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{d.day}</p>
                    <p className="text-xs text-muted-foreground">{d.trips} trip</p>
                  </div>
                  <p className="text-sm font-bold text-primary">{fmt(d.amount)}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <DriverBottomNav />
    </div>
  );
};

export default DriverEarnings;
