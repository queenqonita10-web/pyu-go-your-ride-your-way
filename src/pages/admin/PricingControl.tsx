import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";

interface HailingPrice {
  type: string;
  baseFare: number;
  perKm: number;
  perMinute: number;
  surge: number;
}

interface ShuttleRoute {
  route: string;
  fare: number;
}

const initialHailing: HailingPrice[] = [
  { type: "Motor", baseFare: 5000, perKm: 2500, perMinute: 500, surge: 1.0 },
  { type: "Car", baseFare: 8000, perKm: 4000, perMinute: 800, surge: 1.0 },
  { type: "XL", baseFare: 12000, perKm: 5500, perMinute: 1000, surge: 1.0 },
];

const initialShuttle: ShuttleRoute[] = [
  { route: "Medan - KNO", fare: 45000 },
  { route: "KNO - Medan", fare: 45000 },
  { route: "Medan - Parapat", fare: 85000 },
  { route: "Medan - Berastagi", fare: 55000 },
  { route: "Medan - P. Siantar", fare: 65000 },
];

const fmt = (n: number) => `Rp ${n.toLocaleString("id-ID")}`;

const PricingControl = () => {
  const [hailing, setHailing] = useState(initialHailing);
  const [shuttle, setShuttle] = useState(initialShuttle);

  const updateHailing = (idx: number, field: keyof HailingPrice, value: string) => {
    setHailing((prev) => prev.map((h, i) => (i === idx ? { ...h, [field]: Number(value) || 0 } : h)));
  };

  const updateShuttle = (idx: number, value: string) => {
    setShuttle((prev) => prev.map((s, i) => (i === idx ? { ...s, fare: Number(value) || 0 } : s)));
  };

  const save = () => toast.success("Harga berhasil disimpan");

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Kontrol Harga</h1>

      <Tabs defaultValue="hailing">
        <TabsList>
          <TabsTrigger value="hailing">Hailing</TabsTrigger>
          <TabsTrigger value="shuttle">Shuttle</TabsTrigger>
        </TabsList>

        <TabsContent value="hailing" className="space-y-4 mt-4">
          {hailing.map((h, idx) => (
            <Card key={h.type}>
              <CardHeader className="pb-2"><CardTitle className="text-sm">{h.type}</CardTitle></CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-muted-foreground">Base Fare</label>
                    <Input type="number" value={h.baseFare} onChange={(e) => updateHailing(idx, "baseFare", e.target.value)} />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Per KM</label>
                    <Input type="number" value={h.perKm} onChange={(e) => updateHailing(idx, "perKm", e.target.value)} />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Per Menit</label>
                    <Input type="number" value={h.perMinute} onChange={(e) => updateHailing(idx, "perMinute", e.target.value)} />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Surge Multiplier</label>
                    <Input type="number" step="0.1" value={h.surge} onChange={(e) => updateHailing(idx, "surge", e.target.value)} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          <Button onClick={save} className="w-full">Simpan Harga Hailing</Button>
        </TabsContent>

        <TabsContent value="shuttle" className="mt-4 space-y-4">
          <Card>
            <CardContent className="p-0 overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rute</TableHead>
                    <TableHead>Tarif</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {shuttle.map((s, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-medium">{s.route}</TableCell>
                      <TableCell>
                        <Input type="number" className="w-32" value={s.fare} onChange={(e) => updateShuttle(idx, e.target.value)} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Button onClick={save} className="w-full">Simpan Harga Shuttle</Button>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PricingControl;
