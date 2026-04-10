import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Car, Bus, Users, DollarSign } from "lucide-react";

const summaryCards = [
  { label: "Total Trips Hari Ini", value: "342", icon: Car, change: "+12%" },
  { label: "Driver Aktif", value: "89", icon: Users, change: "+5" },
  { label: "Revenue Hari Ini", value: "Rp 8.450.000", icon: DollarSign, change: "+18%" },
  { label: "Shuttle Aktif", value: "12", icon: Bus, change: "0" },
];

const hailingTrend = [
  { hour: "06", trips: 12 }, { hour: "08", trips: 45 }, { hour: "10", trips: 38 },
  { hour: "12", trips: 52 }, { hour: "14", trips: 41 }, { hour: "16", trips: 60 },
  { hour: "18", trips: 55 }, { hour: "20", trips: 30 },
];

const shuttleTrend = [
  { hour: "06", trips: 8 }, { hour: "08", trips: 25 }, { hour: "10", trips: 20 },
  { hour: "12", trips: 30 }, { hour: "14", trips: 22 }, { hour: "16", trips: 35 },
  { hour: "18", trips: 28 }, { hour: "20", trips: 15 },
];

const revenueSplit = [
  { name: "Hailing", value: 5800000 },
  { name: "Shuttle", value: 2650000 },
];

const COLORS = ["hsl(var(--primary))", "hsl(var(--accent))"];

const recentTrips = [
  { id: 1, type: "Hailing", passenger: "Andi S.", driver: "Budi R.", fare: "Rp 25.000", time: "5 menit lalu" },
  { id: 2, type: "Shuttle", passenger: "Citra M.", route: "Medan - KNO", fare: "Rp 45.000", time: "8 menit lalu" },
  { id: 3, type: "Hailing", passenger: "Dewi K.", driver: "Eko P.", fare: "Rp 18.000", time: "12 menit lalu" },
  { id: 4, type: "Shuttle", passenger: "Faisal H.", route: "KNO - Medan", fare: "Rp 45.000", time: "15 menit lalu" },
  { id: 5, type: "Hailing", passenger: "Gita L.", driver: "Hendra W.", fare: "Rp 32.000", time: "20 menit lalu" },
];

const chartConfig = {
  trips: { label: "Trips", color: "hsl(var(--primary))" },
};

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {summaryCards.map((card) => (
          <Card key={card.label}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <card.icon className="h-5 w-5 text-muted-foreground" />
                <Badge variant="secondary" className="text-xs">{card.change}</Badge>
              </div>
              <p className="text-2xl font-bold text-foreground">{card.value}</p>
              <p className="text-xs text-muted-foreground">{card.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Hailing Trips (Hari Ini)</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[200px]">
              <LineChart data={hailingTrend}>
                <XAxis dataKey="hour" fontSize={12} />
                <YAxis fontSize={12} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="trips" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Shuttle Trips (Hari Ini)</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[200px]">
              <LineChart data={shuttleTrend}>
                <XAxis dataKey="hour" fontSize={12} />
                <YAxis fontSize={12} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="trips" stroke="hsl(var(--accent))" strokeWidth={2} dot={false} />
              </LineChart>
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
                <Pie data={revenueSplit} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value">
                  {revenueSplit.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
          <div className="flex justify-center gap-4 pb-4">
            {revenueSplit.map((item, i) => (
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
            <div className="space-y-3">
              {recentTrips.map((trip) => (
                <div key={trip.id} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Badge variant={trip.type === "Hailing" ? "default" : "secondary"} className="text-[10px]">
                      {trip.type}
                    </Badge>
                    <span className="text-foreground">{trip.passenger}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-foreground">{trip.fare}</span>
                    <span className="text-xs text-muted-foreground">{trip.time}</span>
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
