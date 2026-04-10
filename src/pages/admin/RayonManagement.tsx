import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, MapPin } from "lucide-react";

interface Rayon {
  id: number;
  name: string;
  description: string;
  coverage: string;
  stops: number;
  active: boolean;
}

const initialRayons: Rayon[] = [
  { id: 1, name: "Medan Kota", description: "Area pusat kota Medan", coverage: "Medan Barat, Medan Timur, Medan Kota", stops: 24, active: true },
  { id: 2, name: "Medan Timur", description: "Kawasan timur Medan", coverage: "Medan Tembung, Medan Perjuangan", stops: 18, active: true },
  { id: 3, name: "Deli Serdang", description: "Kabupaten Deli Serdang", coverage: "Lubuk Pakam, Tanjung Morawa, Batang Kuis", stops: 15, active: true },
  { id: 4, name: "KNO Area", description: "Sekitar Bandara Kualanamu", coverage: "Kualanamu, Batang Kuis, Pantai Cermin", stops: 8, active: false },
];

const RayonManagement = () => {
  const [rayons, setRayons] = useState<Rayon[]>(initialRayons);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ name: "", description: "", coverage: "" });

  const toggleActive = (id: number) => {
    setRayons((prev) => prev.map((r) => (r.id === id ? { ...r, active: !r.active } : r)));
    toast.success("Status rayon diperbarui");
  };

  const addRayon = () => {
    if (!form.name) return;
    const newRayon: Rayon = {
      id: Date.now(),
      name: form.name,
      description: form.description,
      coverage: form.coverage,
      stops: 0,
      active: true,
    };
    setRayons((prev) => [...prev, newRayon]);
    setForm({ name: "", description: "", coverage: "" });
    setDialogOpen(false);
    toast.success("Rayon berhasil ditambahkan");
  };

  const deleteRayon = (id: number) => {
    setRayons((prev) => prev.filter((r) => r.id !== id));
    toast.success("Rayon dihapus");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Manajemen Rayon</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm"><Plus className="h-4 w-4 mr-1" /> Tambah Rayon</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Tambah Rayon Baru</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <Input placeholder="Nama Rayon" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <Input placeholder="Deskripsi" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              <Input placeholder="Area cakupan" value={form.coverage} onChange={(e) => setForm({ ...form, coverage: e.target.value })} />
              <Button onClick={addRayon} className="w-full">Simpan</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {rayons.map((rayon) => (
          <Card key={rayon.id}>
            <CardContent className="p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-foreground">{rayon.name}</h3>
                  <p className="text-xs text-muted-foreground">{rayon.description}</p>
                </div>
                <Switch checked={rayon.active} onCheckedChange={() => toggleActive(rayon.id)} />
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" />
                <span>{rayon.coverage}</span>
              </div>
              <div className="flex items-center justify-between">
                <Badge variant={rayon.active ? "default" : "secondary"}>
                  {rayon.active ? "Aktif" : "Nonaktif"} · {rayon.stops} stops
                </Badge>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8"><Pencil className="h-3.5 w-3.5" /></Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => deleteRayon(rayon.id)}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RayonManagement;
