import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const kpis = [
  { label: "Total Shuttle Trips", value: "186" },
  { label: "Avg Occupancy", value: "72%" },
  { label: "Total Penumpang", value: "1.488" },
  { label: "Revenue", value: "Rp 2.650.000" },
];

const passengersByRoute = [
  { route: "Medan-KNO", passengers: 420 },
  { route: "KNO-Medan", passengers: 380 },
  { route: "Medan-Parapat", passengers: 290 },
  { route: "Medan-Berastagi", passengers: 210 },
  { route: "Medan-P.Siantar", passengers: 188 },
];

const dailyRevenue = [
  { day: "Sen", revenue: 380000 }, { day: "Sel", revenue: 420000 },
  { day: "Rab", revenue: 350000 }, { day: "Kam", revenue: 450000 },
  { day: "Jum", revenue: 480000 }, { day: "Sab", revenue: 520000 },
  { day: "Min", revenue: 400000 },
];

const activeRoutes = [
  { route: "Medan - KNO", departures: 8, seats: 96, filled: 72, rate: "75%" },
  { route: "KNO - Medan", departures: 8, seats: 96, filled: 68, rate: "71%" },
  { route: "Medan - Parapat", departures: 4, seats: 48, filled: 38, rate: "79%" },
  { route: "Medan - Berastagi", departures: 4, seats: 48, filled: 30, rate: "63%" },
  { route: "Medan - P. Siantar", departures: 3, seats: 36, filled: 24, rate: "67%" },
];

const chartConfig = {
  passengers: { label: "Penumpang", color: "hsl(var(--primary))" },
  revenue: { label: "Revenue", color: "hsl(var(--primary))" },
};

const ShuttleAnalytics = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold text-foreground">Shuttle Analytics</h1>

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
        <CardHeader className="pb-2"><CardTitle className="text-sm">Penumpang per Rute</CardTitle></CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[250px]">
            <BarChart data={passengersByRoute} layout="vertical">
              <XAxis type="number" fontSize={12} />
              <YAxis dataKey="route" type="category" fontSize={11} width={100} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="passengers" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
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
              <YAxis fontSize={12} tickFormatter={(v) => `${(v / 1000).toFixed(0)}rb`} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>

    <Card>
      <CardHeader className="pb-2"><CardTitle className="text-sm">Rute Aktif</CardTitle></CardHeader>
      <CardContent className="overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rute</TableHead>
              <TableHead>Keberangkatan</TableHead>
              <TableHead>Kursi</TableHead>
              <TableHead>Terisi</TableHead>
              <TableHead>Fill Rate</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activeRoutes.map((r, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">{r.route}</TableCell>
                <TableCell>{r.departures}/hari</TableCell>
                <TableCell>{r.seats}</TableCell>
                <TableCell>{r.filled}</TableCell>
                <TableCell>
                  <Badge variant={parseInt(r.rate) >= 70 ? "default" : "secondary"}>{r.rate}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </div>
);

export default ShuttleAnalytics;
