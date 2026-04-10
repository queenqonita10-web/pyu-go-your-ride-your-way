import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, PieChart, Pie, Cell } from "recharts";
import { Car, Users, DollarSign, TrendingUp, CheckCircle } from "lucide-react";

const periods = ["Hari Ini", "7 Hari", "30 Hari"] as const;

const dataByPeriod = {
  "Hari Ini": {
    kpis: [
      { label: "Total Trips", value: "342", icon: Car, change: "+12%", up: true },
      { label: "Revenue", value: "Rp 8.4M", icon: DollarSign, change: "+18%", up: true },
      { label: "Driver Aktif", value: "89", icon: Users, change: "+5", up: true },
      { label: "Completion Rate", value: "94.2%", icon: CheckCircle, change: "+1.2%", up: true },
    ],
    hailing: [
      { hour: "06", trips: 12 }, { hour: "08", trips: 45 }, { hour: "10", trips: 38 },
      { hour: "12", trips: 52 }, { hour: "14", trips: 41 }, { hour: "16", trips: 60 },
      { hour: "18", trips: 55 }, { hour: "20", trips: 30 },
    ],
    shuttle: [
      { hour: "06", trips: 8 }, { hour: "08", trips: 25 }, { hour: "10", trips: 20 },
      { hour: "12", trips: 30 }, { hour: "14", trips: 22 }, { hour: "16", trips: 35 },
      { hour: "18", trips: 28 }, { hour: "20", trips: 15 },
    ],
    revenue: [{ name: "Hailing", value: 5800000 }, { name: "Shuttle", value: 2650000 }],
  },
  "7 Hari": {
    kpis: [
      { label: "Total Trips", value: "2,148", icon: Car, change: "+8%", up: true },
      { label: "Revenue", value: "Rp 54.2M", icon: DollarSign, change: "+15%", up: true },
      { label: "Driver Aktif", value: "124", icon: Users, change: "+12", up: true },
      { label: "Completion Rate", value: "92.8%", icon: CheckCircle, change: "-0.5%", up: false },
    ],
    hailing: [
      { hour: "Sen", trips: 280 }, { hour: "Sel", trips: 310 }, { hour: "Rab", trips: 295 },
      { hour: "Kam", trips: 340 }, { hour: "Jum", trips: 380 }, { hour: "Sab", trips: 250 },
      { hour: "Min", trips: 200 },
    ],
    shuttle: [
      { hour: "Sen", trips: 150 }, { hour: "Sel", trips: 170 }, { hour: "Rab", trips: 160 },
      { hour: "Kam", trips: 180 }, { hour: "Jum", trips: 200 }, { hour: "Sab", trips: 130 },
      { hour: "Min", trips: 110 },
    ],
    revenue: [{ name: "Hailing", value: 35000000 }, { name: "Shuttle", value: 19200000 }],
  },
  "30 Hari": {
    kpis: [
      { label: "Total Trips", value: "9,820", icon: Car, change: "+22%", up: true },
      { label: "Revenue", value: "Rp 245M", icon: DollarSign, change: "+28%", up: true },
      { label: "Driver Aktif", value: "156", icon: Users, change: "+34", up: true },
      { label: "Completion Rate", value: "93.5%", icon: CheckCircle, change: "+2.1%", up: true },
    ],
    hailing: [
      { hour: "W1", trips: 1200 }, { hour: "W2", trips: 1350 }, { hour: "W3", trips: 1450 }, { hour: "W4", trips: 1500 },
    ],
    shuttle: [
      { hour: "W1", trips: 650 }, { hour: "W2", trips: 720 }, { hour: "W3", trips: 800 }, { hour: "W4", trips: 850 },
    ],
    revenue: [{ name: "Hailing", value: 158000000 }, { name: "Shuttle", value: 87000000 }],
  },
};

const recentTrips = [
  { id: 1, type: "Hailing", passenger: "Andi S.", info: "Budi R.", fare: "Rp 25.000", time: "2 mnt lalu" },
  { id: 2, type: "Shuttle", passenger: "Citra M.", info: "Medan → KNO", fare: "Rp 45.000", time: "5 mnt lalu" },
  { id: 3, type: "Hailing", passenger: "Dewi K.", info: "Eko P.", fare: "Rp 18.000", time: "8 mnt lalu" },
  { id: 4, type: "Shuttle", passenger: "Faisal H.", info: "KNO → Medan", fare: "Rp 45.000", time: "10 mnt lalu" },
  { id: 5, type: "Hailing", passenger: "Gita L.", info: "Hendra W.", fare: "Rp 32.000", time: "12 mnt lalu" },
  { id: 6, type: "Hailing", passenger: "Irwan M.", info: "Joko S.", fare: "Rp 22.000", time: "15 mnt lalu" },
  { id: 7, type: "Shuttle", passenger: "Kartika D.", info: "Medan → Parapat", fare: "Rp 85.000", time: "18 mnt lalu" },
  { id: 8, type: "Hailing", passenger: "Lina P.", info: "Maman R.", fare: "Rp 15.000", time: "20 mnt lalu" },
];

const COLORS = ["hsl(var(--primary))", "hsl(var(--accent))"];
const chartConfig = { trips: { label: "Trips", color: "hsl(var(--primary))" } };

const AdminDashboard = () => {
  const [period, setPeriod] = useState<typeof periods[number]>("Hari Ini");
  const data = dataByPeriod[period];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Overview</h1>
        <div className="flex gap-1 bg-muted rounded-lg p-1">
          {periods.map((p) => (
            <Button
              key={p}
              size="sm"
              variant={period === p ? "default" : "ghost"}
              className="text-xs h-7 px-3"
              onClick={() => setPeriod(p)}
            >
              {p}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data.kpis.map((kpi) => (
          <Card key={kpi.label}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <kpi.icon className="h-5 w-5 text-muted-foreground" />
                <Badge variant={kpi.up ? "default" : "destructive"} className="text-[10px]">
                  {kpi.change}
                </Badge>
              </div>
              <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
              <p className="text-xs text-muted-foreground">{kpi.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Hailing Trip Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[200px]">
              <AreaChart data={data.hailing}>
                <XAxis dataKey="hour" fontSize={12} />
                <YAxis fontSize={12} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area type="monotone" dataKey="trips" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.15} strokeWidth={2} />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Shuttle Trip Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[200px]">
              <AreaChart data={data.shuttle}>
                <XAxis dataKey="hour" fontSize={12} />
                <YAxis fontSize={12} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area type="monotone" dataKey="trips" stroke="hsl(var(--accent))" fill="hsl(var(--accent))" fillOpacity={0.15} strokeWidth={2} />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Revenue Split</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <ChartContainer config={chartConfig} className="h-[200px] w-[200px]">
              <PieChart>
                <Pie data={data.revenue} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value">
                  {data.revenue.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
          <div className="flex justify-center gap-4 pb-4">
            {data.revenue.map((item, i) => (
              <div key={item.name} className="flex items-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                <span className="text-xs text-muted-foreground">{item.name}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Aktivitas Terkini</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2.5 max-h-[280px] overflow-y-auto">
              {recentTrips.map((trip) => (
                <div key={trip.id} className="flex items-center justify-between text-sm py-1 border-b border-border/50 last:border-0">
                  <div className="flex items-center gap-2">
                    <Badge variant={trip.type === "Hailing" ? "default" : "secondary"} className="text-[10px] w-16 justify-center">
                      {trip.type}
                    </Badge>
                    <div>
                      <span className="text-foreground font-medium">{trip.passenger}</span>
                      <span className="text-muted-foreground ml-1.5 text-xs">• {trip.info}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-foreground text-xs">{trip.fare}</span>
                    <span className="text-[11px] text-muted-foreground w-16 text-right">{trip.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
