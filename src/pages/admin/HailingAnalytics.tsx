import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const kpis = [
  { label: "Total Hailing Trips", value: "1.248" },
  { label: "Rata-rata Tarif", value: "Rp 28.500" },
  { label: "Completion Rate", value: "94.2%" },
  { label: "Avg Wait Time", value: "4.2 min" },
];

const tripsPerHour = [
  { hour: "06", trips: 12 }, { hour: "07", trips: 28 }, { hour: "08", trips: 45 },
  { hour: "09", trips: 38 }, { hour: "10", trips: 30 }, { hour: "11", trips: 35 },
  { hour: "12", trips: 52 }, { hour: "13", trips: 48 }, { hour: "14", trips: 41 },
  { hour: "15", trips: 44 }, { hour: "16", trips: 55 }, { hour: "17", trips: 60 },
  { hour: "18", trips: 58 }, { hour: "19", trips: 42 }, { hour: "20", trips: 30 },
];

const dailyRevenue = [
  { day: "Sen", revenue: 1200000 }, { day: "Sel", revenue: 1350000 },
  { day: "Rab", revenue: 1100000 }, { day: "Kam", revenue: 1450000 },
  { day: "Jum", revenue: 1600000 }, { day: "Sab", revenue: 1800000 },
  { day: "Min", revenue: 1250000 },
];

const recentTrips = [
  { passenger: "Andi S.", driver: "Budi R.", fare: "Rp 25.000", distance: "5.2 km", status: "Selesai" },
  { passenger: "Citra M.", driver: "Deni A.", fare: "Rp 18.000", distance: "3.8 km", status: "Selesai" },
  { passenger: "Eko P.", driver: "Faisal H.", fare: "Rp 42.000", distance: "12.1 km", status: "Selesai" },
  { passenger: "Gita L.", driver: "Hendra W.", fare: "Rp 15.000", distance: "2.5 km", status: "Dibatalkan" },
  { passenger: "Irma N.", driver: "Joko S.", fare: "Rp 32.000", distance: "8.3 km", status: "Selesai" },
  { passenger: "Kiki R.", driver: "Lukman D.", fare: "Rp 28.000", distance: "6.7 km", status: "Berlangsung" },
];

const chartConfig = {
  trips: { label: "Trips", color: "hsl(var(--primary))" },
  revenue: { label: "Revenue", color: "hsl(var(--primary))" },
};

const HailingAnalytics = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold text-foreground">Hailing Analytics</h1>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {kpis.map((kpi) => (
        <Card key={kpi.label}>
          <CardContent className="p-4">
            <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
            <p className="text-xs text-muted-foreground">{kpi.label}</p>
          </CardContent>
        </Card>
      ))}
    </div>

    <div className="grid md:grid-cols-2 gap-4">
      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-sm">Trips per Jam (Hari Ini)</CardTitle></CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[250px]">
            <BarChart data={tripsPerHour}>
              <XAxis dataKey="hour" fontSize={12} />
              <YAxis fontSize={12} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="trips" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-sm">Revenue Harian (7 Hari)</CardTitle></CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[250px]">
            <LineChart data={dailyRevenue}>
              <XAxis dataKey="day" fontSize={12} />
              <YAxis fontSize={12} tickFormatter={(v) => `${(v / 1000000).toFixed(1)}jt`} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>

    <Card>
      <CardHeader className="pb-2"><CardTitle className="text-sm">Trip Terkini</CardTitle></CardHeader>
      <CardContent className="overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Penumpang</TableHead>
              <TableHead>Driver</TableHead>
              <TableHead>Jarak</TableHead>
              <TableHead>Tarif</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentTrips.map((t, i) => (
              <TableRow key={i}>
                <TableCell>{t.passenger}</TableCell>
                <TableCell>{t.driver}</TableCell>
                <TableCell>{t.distance}</TableCell>
                <TableCell>{t.fare}</TableCell>
                <TableCell>
                  <Badge variant={t.status === "Selesai" ? "default" : t.status === "Dibatalkan" ? "destructive" : "secondary"}>
                    {t.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </div>
);

export default HailingAnalytics;
