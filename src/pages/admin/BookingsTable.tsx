import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Search, ChevronDown, ChevronUp } from "lucide-react";

interface Booking {
  id: string;
  date: string;
  type: "Hailing" | "Shuttle";
  passenger: string;
  driverOrRoute: string;
  origin: string;
  destination: string;
  fare: number;
  payment: string;
  status: "Selesai" | "Berlangsung" | "Dibatalkan";
}

const allBookings: Booking[] = [
  { id: "BK-001", date: "2026-04-10", type: "Hailing", passenger: "Andi S.", driverOrRoute: "Budi R.", origin: "Medan Fair", destination: "USU", fare: 25000, payment: "GoPay", status: "Selesai" },
  { id: "BK-002", date: "2026-04-10", type: "Shuttle", passenger: "Citra M.", driverOrRoute: "Medan → KNO", origin: "Medan", destination: "KNO Airport", fare: 45000, payment: "Cash", status: "Selesai" },
  { id: "BK-003", date: "2026-04-10", type: "Hailing", passenger: "Dewi K.", driverOrRoute: "Eko P.", origin: "Sun Plaza", destination: "Thamrin Plaza", fare: 18000, payment: "OVO", status: "Selesai" },
  { id: "BK-004", date: "2026-04-10", type: "Shuttle", passenger: "Faisal H.", driverOrRoute: "KNO → Medan", origin: "KNO Airport", destination: "Medan", fare: 45000, payment: "Cash", status: "Dibatalkan" },
  { id: "BK-005", date: "2026-04-10", type: "Hailing", passenger: "Gita L.", driverOrRoute: "Hendra W.", origin: "Cemara Asri", destination: "Centre Point", fare: 32000, payment: "GoPay", status: "Selesai" },
  { id: "BK-006", date: "2026-04-09", type: "Hailing", passenger: "Irwan M.", driverOrRoute: "Joko S.", origin: "Ringroad", destination: "Tuntungan", fare: 22000, payment: "Cash", status: "Selesai" },
  { id: "BK-007", date: "2026-04-09", type: "Shuttle", passenger: "Kartika D.", driverOrRoute: "Medan → Parapat", origin: "Medan", destination: "Parapat", fare: 85000, payment: "Transfer", status: "Selesai" },
  { id: "BK-008", date: "2026-04-09", type: "Hailing", passenger: "Lina P.", driverOrRoute: "Maman R.", origin: "Krakatau", destination: "Asia Mega Mas", fare: 15000, payment: "OVO", status: "Selesai" },
  { id: "BK-009", date: "2026-04-09", type: "Hailing", passenger: "Nadia F.", driverOrRoute: "Oscar T.", origin: "Johor", destination: "Medan Baru", fare: 20000, payment: "GoPay", status: "Dibatalkan" },
  { id: "BK-010", date: "2026-04-09", type: "Shuttle", passenger: "Putri A.", driverOrRoute: "KNO → Medan", origin: "KNO Airport", destination: "Medan", fare: 45000, payment: "Cash", status: "Selesai" },
  { id: "BK-011", date: "2026-04-08", type: "Hailing", passenger: "Rudi H.", driverOrRoute: "Samsul B.", origin: "Helvetia", destination: "Sei Sikambing", fare: 28000, payment: "Cash", status: "Selesai" },
  { id: "BK-012", date: "2026-04-08", type: "Hailing", passenger: "Tina W.", driverOrRoute: "Umar K.", origin: "Pancing", destination: "Tembung", fare: 19000, payment: "GoPay", status: "Berlangsung" },
  { id: "BK-013", date: "2026-04-08", type: "Shuttle", passenger: "Vera S.", driverOrRoute: "Medan → KNO", origin: "Medan", destination: "KNO Airport", fare: 45000, payment: "Transfer", status: "Selesai" },
  { id: "BK-014", date: "2026-04-08", type: "Hailing", passenger: "Wawan D.", driverOrRoute: "Xander L.", origin: "Setia Budi", destination: "Iskandar Muda", fare: 16000, payment: "OVO", status: "Selesai" },
  { id: "BK-015", date: "2026-04-08", type: "Hailing", passenger: "Yuni R.", driverOrRoute: "Zainal A.", origin: "Amplas", destination: "Marelan", fare: 35000, payment: "Cash", status: "Selesai" },
  { id: "BK-016", date: "2026-04-07", type: "Shuttle", passenger: "Ahmad B.", driverOrRoute: "KNO → Medan", origin: "KNO Airport", destination: "Medan", fare: 45000, payment: "GoPay", status: "Selesai" },
  { id: "BK-017", date: "2026-04-07", type: "Hailing", passenger: "Bella C.", driverOrRoute: "Charlie D.", origin: "Gatot Subroto", destination: "Jamin Ginting", fare: 27000, payment: "Cash", status: "Selesai" },
  { id: "BK-018", date: "2026-04-07", type: "Hailing", passenger: "Dani E.", driverOrRoute: "Fajar G.", origin: "Sunggal", destination: "Binjai", fare: 40000, payment: "Transfer", status: "Dibatalkan" },
  { id: "BK-019", date: "2026-04-07", type: "Shuttle", passenger: "Eka H.", driverOrRoute: "Medan → Parapat", origin: "Medan", destination: "Parapat", fare: 85000, payment: "Cash", status: "Selesai" },
  { id: "BK-020", date: "2026-04-07", type: "Hailing", passenger: "Fitri I.", driverOrRoute: "Gunawan J.", origin: "Padang Bulan", destination: "Petisah", fare: 14000, payment: "OVO", status: "Selesai" },
];

const PAGE_SIZE = 10;

const statusColor: Record<string, string> = {
  Selesai: "bg-green-500/15 text-green-700 border-green-500/30",
  Berlangsung: "bg-yellow-500/15 text-yellow-700 border-yellow-500/30",
  Dibatalkan: "bg-red-500/15 text-red-700 border-red-500/30",
};

const BookingsTable = () => {
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return allBookings.filter((b) => {
      if (typeFilter !== "All" && b.type !== typeFilter) return false;
      if (statusFilter !== "All" && b.status !== statusFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        if (!b.passenger.toLowerCase().includes(q) && !b.id.toLowerCase().includes(q) && !b.driverOrRoute.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [typeFilter, statusFilter, search]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const totalFare = filtered.reduce((sum, b) => sum + b.fare, 0);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Bookings</h1>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <CardTitle className="text-sm font-medium">Daftar Booking</CardTitle>
            <div className="flex flex-1 flex-wrap items-center gap-2">
              <div className="relative w-full md:w-52">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Cari ID, nama..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(0); }} className="pl-8 h-9 text-sm" />
              </div>
              <Select value={typeFilter} onValueChange={(v) => { setTypeFilter(v); setPage(0); }}>
                <SelectTrigger className="w-32 h-9 text-sm"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">Semua Tipe</SelectItem>
                  <SelectItem value="Hailing">Hailing</SelectItem>
                  <SelectItem value="Shuttle">Shuttle</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setPage(0); }}>
                <SelectTrigger className="w-36 h-9 text-sm"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">Semua Status</SelectItem>
                  <SelectItem value="Selesai">Selesai</SelectItem>
                  <SelectItem value="Berlangsung">Berlangsung</SelectItem>
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
                  <TableHead className="text-xs w-8"></TableHead>
                  <TableHead className="text-xs">ID</TableHead>
                  <TableHead className="text-xs">Tanggal</TableHead>
                  <TableHead className="text-xs">Tipe</TableHead>
                  <TableHead className="text-xs">Penumpang</TableHead>
                  <TableHead className="text-xs">Driver/Rute</TableHead>
                  <TableHead className="text-xs">Tarif</TableHead>
                  <TableHead className="text-xs">Bayar</TableHead>
                  <TableHead className="text-xs">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paged.map((b) => (
                  <Collapsible key={b.id} open={expandedId === b.id} onOpenChange={(open) => setExpandedId(open ? b.id : null)} asChild>
                    <>
                      <CollapsibleTrigger asChild>
                        <TableRow className="cursor-pointer hover:bg-muted/50">
                          <TableCell className="w-8">
                            {expandedId === b.id ? <ChevronUp className="h-3.5 w-3.5 text-muted-foreground" /> : <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />}
                          </TableCell>
                          <TableCell className="text-xs font-mono">{b.id}</TableCell>
                          <TableCell className="text-xs text-muted-foreground">{b.date}</TableCell>
                          <TableCell><Badge variant={b.type === "Hailing" ? "default" : "secondary"} className="text-[10px]">{b.type}</Badge></TableCell>
                          <TableCell className="text-sm">{b.passenger}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">{b.driverOrRoute}</TableCell>
                          <TableCell className="text-sm font-medium">Rp {b.fare.toLocaleString("id-ID")}</TableCell>
                          <TableCell className="text-xs text-muted-foreground">{b.payment}</TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium ${statusColor[b.status]}`}>{b.status}</span>
                          </TableCell>
                        </TableRow>
                      </CollapsibleTrigger>
                      <CollapsibleContent asChild>
                        <TableRow className="bg-muted/30">
                          <TableCell colSpan={9} className="py-3 px-6">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                              <div><span className="text-muted-foreground text-xs">Origin</span><p className="font-medium text-foreground">{b.origin}</p></div>
                              <div><span className="text-muted-foreground text-xs">Destination</span><p className="font-medium text-foreground">{b.destination}</p></div>
                              <div><span className="text-muted-foreground text-xs">Payment</span><p className="font-medium text-foreground">{b.payment}</p></div>
                              <div><span className="text-muted-foreground text-xs">Booking ID</span><p className="font-medium font-mono text-foreground">{b.id}</p></div>
                            </div>
                          </TableCell>
                        </TableRow>
                      </CollapsibleContent>
                    </>
                  </Collapsible>
                ))}
                {paged.length === 0 && (
                  <TableRow><TableCell colSpan={9} className="text-center text-muted-foreground py-8">Tidak ada booking ditemukan</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between px-4 py-3 border-t border-border">
            <div className="text-xs text-muted-foreground">
              {filtered.length} booking • Total: <span className="font-medium text-foreground">Rp {totalFare.toLocaleString("id-ID")}</span>
            </div>
            <div className="flex items-center gap-2 mt-2 md:mt-0">
              <Button variant="outline" size="sm" disabled={page === 0} onClick={() => setPage(page - 1)} className="h-7 text-xs">Prev</Button>
              <span className="text-xs text-muted-foreground">{page + 1} / {totalPages || 1}</span>
              <Button variant="outline" size="sm" disabled={page >= totalPages - 1} onClick={() => setPage(page + 1)} className="h-7 text-xs">Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingsTable;
