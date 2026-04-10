import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis } from "recharts";
import { Activity, CheckCircle, XCircle, Clock, Search } from "lucide-react";

type TripStatus = "Berlangsung" | "Selesai" | "Dibatalkan";
type TripType = "Hailing" | "Shuttle";

interface Trip {
  id: string;
  type: TripType;
  passenger: string;
  driverOrRoute: string;
  status: TripStatus;
  fare: string;
  duration: string;
  time: string;
}

const allTrips: Trip[] = [
  { id: "TRP-001", type: "Hailing", passenger: "Andi S.", driverOrRoute: "Budi R.", status: "Selesai", fare: "Rp 25.000", duration: "12 mnt", time: "14:32" },
  { id: "TRP-002", type: "Shuttle", passenger: "Citra M.", driverOrRoute: "Medan → KNO", status: "Berlangsung", fare: "Rp 45.000", duration: "35 mnt", time: "14:28" },
  { id: "TRP-003", type: "Hailing", passenger: "Dewi K.", driverOrRoute: "Eko P.", status: "Selesai", fare: "Rp 18.000", duration: "8 mnt", time: "14:20" },
  { id: "TRP-004", type: "Shuttle", passenger: "Faisal H.", driverOrRoute: "KNO → Medan", status: "Dibatalkan", fare: "Rp 45.000", duration: "-", time: "14:15" },
  { id: "TRP-005", type: "Hailing", passenger: "Gita L.", driverOrRoute: "Hendra W.", status: "Selesai", fare: "Rp 32.000", duration: "18 mnt", time: "14:10" },
  { id: "TRP-006", type: "Hailing", passenger: "Irwan M.", driverOrRoute: "Joko S.", status: "Berlangsung", fare: "Rp 22.000", duration: "5 mnt", time: "14:05" },
  { id: "TRP-007", type: "Shuttle", passenger: "Kartika D.", driverOrRoute: "Medan → Parapat", status: "Selesai", fare: "Rp 85.000", duration: "180 mnt", time: "13:50" },
  { id: "TRP-008", type: "Hailing", passenger: "Lina P.", driverOrRoute: "Maman R.", status: "Selesai", fare: "Rp 15.000", duration: "6 mnt", time: "13:45" },
  { id: "TRP-009", type: "Hailing", passenger: "Nadia F.", driverOrRoute: "Oscar T.", status: "Dibatalkan", fare: "Rp 20.000", duration: "-", time: "13:40" },
  { id: "TRP-010", type: "Shuttle", passenger: "Putri A.", driverOrRoute: "KNO → Medan", status: "Selesai", fare: "Rp 45.000", duration: "55 mnt", time: "13:30" },
  { id: "TRP-011", type: "Hailing", passenger: "Rudi H.", driverOrRoute: "Samsul B.", status: "Selesai", fare: "Rp 28.000", duration: "15 mnt", time: "13:20" },
  { id: "TRP-012", type: "Hailing", passenger: "Tina W.", driverOrRoute: "Umar K.", status: "Berlangsung", fare: "Rp 19.000", duration: "3 mnt", time: "13:15" },
];

const hourlyData = [
  { hour: "06", hailing: 12, shuttle: 8 },
  { hour: "08", hailing: 45, shuttle: 25 },
  { hour: "10", hailing: 38, shuttle: 20 },
  { hour: "12", hailing: 52, shuttle: 30 },
  { hour: "14", hailing: 41, shuttle: 22 },
];

const statusColor: Record<TripStatus, string> = {
  Berlangsung: "bg-yellow-500/15 text-yellow-700 border-yellow-500/30",
  Selesai: "bg-green-500/15 text-green-700 border-green-500/30",
  Dibatalkan: "bg-red-500/15 text-red-700 border-red-500/30",
};

const chartConfig = {
  hailing: { label: "Hailing", color: "hsl(var(--primary))" },
  shuttle: { label: "Shuttle", color: "hsl(var(--accent))" },
};

const TripsMonitoring = () => {
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return allTrips.filter((t) => {
      if (typeFilter !== "All" && t.type !== typeFilter) return false;
      if (statusFilter !== "All" && t.status !== statusFilter) return false;
      if (search && !t.passenger.toLowerCase().includes(search.toLowerCase()) && !t.driverOrRoute.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [typeFilter, statusFilter, search]);

  const active = allTrips.filter((t) => t.status === "Berlangsung").length;
  const completed = allTrips.filter((t) => t.status === "Selesai").length;
  const cancelled = allTrips.filter((t) => t.status === "Dibatalkan").length;

  const kpis = [
    { label: "Berlangsung", value: active, icon: Activity, color: "text-yellow-600" },
    { label: "Selesai Hari Ini", value: completed, icon: CheckCircle, color: "text-green-600" },
    { label: "Dibatalkan", value: cancelled, icon: XCircle, color: "text-red-600" },
    { label: "Avg Durasi", value: "14 mnt", icon: Clock, color: "text-muted-foreground" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Trips Monitoring</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {kpis.map((k) => (
          <Card key={k.label}>
            <CardContent className="p-4 flex items-center gap-3">
              <k.icon className={`h-5 w-5 ${k.color}`} />
              <div>
                <p className="text-xl font-bold text-foreground">{k.value}</p>
                <p className="text-xs text-muted-foreground">{k.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Trips per Jam (Hari Ini)</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[180px]">
            <BarChart data={hourlyData}>
              <XAxis dataKey="hour" fontSize={12} />
              <YAxis fontSize={12} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="hailing" stackId="a" fill="hsl(var(--primary))" radius={[0, 0, 0, 0]} />
              <Bar dataKey="shuttle" stackId="a" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <CardTitle className="text-sm font-medium">Live Trips</CardTitle>
            <div className="flex flex-1 flex-wrap items-center gap-2">
              <div className="relative w-full md:w-48">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Cari..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-8 h-9 text-sm" />
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-32 h-9 text-sm"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">Semua Tipe</SelectItem>
                  <SelectItem value="Hailing">Hailing</SelectItem>
                  <SelectItem value="Shuttle">Shuttle</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-36 h-9 text-sm"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">Semua Status</SelectItem>
                  <SelectItem value="Berlangsung">Berlangsung</SelectItem>
                  <SelectItem value="Selesai">Selesai</SelectItem>
                  <SelectItem value="Dibatalkan">Dibatalkan</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">ID</TableHead>
                  <TableHead className="text-xs">Tipe</TableHead>
                  <TableHead className="text-xs">Penumpang</TableHead>
                  <TableHead className="text-xs">Driver/Rute</TableHead>
                  <TableHead className="text-xs">Status</TableHead>
                  <TableHead className="text-xs">Tarif</TableHead>
                  <TableHead className="text-xs">Durasi</TableHead>
                  <TableHead className="text-xs">Waktu</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((trip) => (
                  <TableRow key={trip.id}>
                    <TableCell className="text-xs font-mono">{trip.id}</TableCell>
                    <TableCell>
                      <Badge variant={trip.type === "Hailing" ? "default" : "secondary"} className="text-[10px]">{trip.type}</Badge>
                    </TableCell>
                    <TableCell className="text-sm">{trip.passenger}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{trip.driverOrRoute}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium ${statusColor[trip.status]}`}>
                        {trip.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm font-medium">{trip.fare}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{trip.duration}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{trip.time}</TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-muted-foreground py-8">Tidak ada trip ditemukan</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TripsMonitoring;
