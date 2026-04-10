import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, BarChart, Bar } from "recharts";
import { DollarSign, TrendingUp, Car, Bus } from "lucide-react";

const periods = ["Harian", "Mingguan", "Bulanan"] as const;

const revenueByPeriod = {
  Harian: {
    kpis: [
      { label: "Total Revenue", value: "Rp 8.4M", icon: DollarSign, change: "+18%" },
      { label: "Avg/Trip", value: "Rp 24.500", icon: TrendingUp, change: "+3%" },
      { label: "Hailing Rev", value: "Rp 5.8M", icon: Car, change: "+15%" },
      { label: "Shuttle Rev", value: "Rp 2.6M", icon: Bus, change: "+22%" },
    ],
    trend: [
      { period: "06:00", hailing: 320000, shuttle: 180000 },
      { period: "08:00", hailing: 1200000, shuttle: 750000 },
      { period: "10:00", hailing: 950000, shuttle: 600000 },
      { period: "12:00", hailing: 1400000, shuttle: 900000 },
      { period: "14:00", hailing: 1100000, shuttle: 660000 },
      { period: "16:00", hailing: 1600000, shuttle: 1050000 },
      { period: "18:00", hailing: 1500000, shuttle: 840000 },
      { period: "20:00", hailing: 800000, shuttle: 450000 },
    ],
    byRoute: [
      { route: "Medan → KNO", revenue: 2100000 },
      { route: "KNO → Medan", revenue: 1800000 },
      { route: "Medan → Parapat", revenue: 850000 },
      { route: "Dalam Kota", revenue: 3650000 },
    ],
    breakdown: [
      { date: "10 Apr", hailing: 5800000, shuttle: 2650000, total: 8450000, trips: 342 },
      { date: "9 Apr", hailing: 5200000, shuttle: 2400000, total: 7600000, trips: 310 },
      { date: "8 Apr", hailing: 5500000, shuttle: 2550000, total: 8050000, trips: 328 },
      { date: "7 Apr", hailing: 4800000, shuttle: 2200000, total: 7000000, trips: 285 },
      { date: "6 Apr", hailing: 5100000, shuttle: 2350000, total: 7450000, trips: 302 },
    ],
  },
  Mingguan: {
    kpis: [
      { label: "Total Revenue", value: "Rp 54.2M", icon: DollarSign, change: "+15%" },
      { label: "Avg/Trip", value: "Rp 25.200", icon: TrendingUp, change: "+5%" },
      { label: "Hailing Rev", value: "Rp 35M", icon: Car, change: "+12%" },
      { label: "Shuttle Rev", value: "Rp 19.2M", icon: Bus, change: "+20%" },
    ],
    trend: [
      { period: "Sen", hailing: 5200000, shuttle: 2800000 },
      { period: "Sel", hailing: 5500000, shuttle: 3000000 },
      { period: "Rab", hailing: 5300000, shuttle: 2900000 },
      { period: "Kam", hailing: 5800000, shuttle: 3200000 },
      { period: "Jum", hailing: 6200000, shuttle: 3500000 },
      { period: "Sab", hailing: 4000000, shuttle: 2200000 },
      { period: "Min", hailing: 3000000, shuttle: 1600000 },
    ],
    byRoute: [
      { route: "Medan → KNO", revenue: 14500000 },
      { route: "KNO → Medan", revenue: 12800000 },
      { route: "Medan → Parapat", revenue: 5900000 },
      { route: "Dalam Kota", revenue: 21000000 },
    ],
    breakdown: [
      { date: "W1 Apr", hailing: 33000000, shuttle: 18000000, total: 51000000, trips: 2080 },
      { date: "W4 Mar", hailing: 31000000, shuttle: 17000000, total: 48000000, trips: 1950 },
      { date: "W3 Mar", hailing: 29000000, shuttle: 15500000, total: 44500000, trips: 1820 },
    ],
  },
  Bulanan: {
    kpis: [
      { label: "Total Revenue", value: "Rp 245M", icon: DollarSign, change: "+28%" },
      { label: "Avg/Trip", value: "Rp 24.900", icon: TrendingUp, change: "+8%" },
      { label: "Hailing Rev", value: "Rp 158M", icon: Car, change: "+25%" },
      { label: "Shuttle Rev", value: "Rp 87M", icon: Bus, change: "+33%" },
    ],
    trend: [
      { period: "Jan", hailing: 120000000, shuttle: 65000000 },
      { period: "Feb", hailing: 130000000, shuttle: 70000000 },
      { period: "Mar", hailing: 145000000, shuttle: 78000000 },
      { period: "Apr", hailing: 158000000, shuttle: 87000000 },
    ],
    byRoute: [
      { route: "Medan → KNO", revenue: 62000000 },
      { route: "KNO → Medan", revenue: 55000000 },
      { route: "Medan → Parapat", revenue: 25000000 },
      { route: "Dalam Kota", revenue: 103000000 },
    ],
    breakdown: [
      { date: "Apr 2026", hailing: 158000000, shuttle: 87000000, total: 245000000, trips: 9820 },
      { date: "Mar 2026", hailing: 145000000, shuttle: 78000000, total: 223000000, trips: 8950 },
      { date: "Feb 2026", hailing: 130000000, shuttle: 70000000, total: 200000000, trips: 8100 },
      { date: "Jan 2026", hailing: 120000000, shuttle: 65000000, total: 185000000, trips: 7500 },
    ],
  },
};

const chartConfig = {
  hailing: { label: "Hailing", color: "hsl(var(--primary))" },
  shuttle: { label: "Shuttle", color: "hsl(var(--accent))" },
};

const fmt = (n: number) => {
  if (n >= 1000000) return `Rp ${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `Rp ${(n / 1000).toFixed(0)}K`;
  return `Rp ${n.toLocaleString("id-ID")}`;
};

const RevenueAnalytics = () => {
  const [period, setPeriod] = useState<typeof periods[number]>("Harian");
  const [showSplit, setShowSplit] = useState(true);
  const data = revenueByPeriod[period];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Revenue Analytics</h1>
        <div className="flex gap-1 bg-muted rounded-lg p-1">
          {periods.map((p) => (
            <Button key={p} size="sm" variant={period === p ? "default" : "ghost"} className="text-xs h-7 px-3" onClick={() => setPeriod(p)}>
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
                <Badge variant="default" className="text-[10px]">{kpi.change}</Badge>
              </div>
              <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
              <p className="text-xs text-muted-foreground">{kpi.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium">Revenue Trend</CardTitle>
            <Button variant="ghost" size="sm" className="text-xs h-7" onClick={() => setShowSplit(!showSplit)}>
              {showSplit ? "Combined" : "Split"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[250px]">
            <AreaChart data={data.trend}>
              <XAxis dataKey="period" fontSize={12} />
              <YAxis fontSize={12} tickFormatter={(v) => fmt(v)} />
              <ChartTooltip content={<ChartTooltipContent />} />
              {showSplit ? (
                <>
                  <Area type="monotone" dataKey="hailing" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.15} strokeWidth={2} />
                  <Area type="monotone" dataKey="shuttle" stroke="hsl(var(--accent))" fill="hsl(var(--accent))" fillOpacity={0.15} strokeWidth={2} />
                </>
              ) : (
                <Area type="monotone" dataKey="hailing" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.2} strokeWidth={2} />
              )}
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Revenue by Rute</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[200px]">
              <BarChart data={data.byRoute} layout="vertical">
                <XAxis type="number" fontSize={12} tickFormatter={(v) => fmt(v)} />
                <YAxis type="category" dataKey="route" fontSize={11} width={110} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Periode</TableHead>
                  <TableHead className="text-xs">Hailing</TableHead>
                  <TableHead className="text-xs">Shuttle</TableHead>
                  <TableHead className="text-xs">Total</TableHead>
                  <TableHead className="text-xs">Trips</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.breakdown.map((row) => (
                  <TableRow key={row.date}>
                    <TableCell className="text-xs font-medium">{row.date}</TableCell>
                    <TableCell className="text-xs">{fmt(row.hailing)}</TableCell>
                    <TableCell className="text-xs">{fmt(row.shuttle)}</TableCell>
                    <TableCell className="text-xs font-bold">{fmt(row.total)}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{row.trips.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RevenueAnalytics;
