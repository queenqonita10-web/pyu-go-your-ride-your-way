import { useState } from "react";
import { ArrowLeft, CheckCircle2, Clock, Building2, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import DriverBottomNav from "@/components/DriverBottomNav";

const SALDO = 5250000;
const ADMIN_FEE = 2500;

const bankOptions = ["BCA", "BNI", "BRI", "Mandiri", "CIMB", "Danamon", "BSI", "Permata"];

const initialBanks = [
  { id: "bca-1", name: "BCA", number: "****4521", holder: "Ahmad Fauzi" },
  { id: "mandiri-1", name: "Mandiri", number: "****7890", holder: "Ahmad Fauzi" },
];

const quickAmounts = [
  { label: "Rp 500rb", value: 500000 },
  { label: "Rp 1jt", value: 1000000 },
  { label: "Rp 2jt", value: 2000000 },
  { label: "Semua", value: SALDO },
];

const withdrawHistory = [
  { date: "8 Apr 2026", amount: 1500000, status: "success" as const },
  { date: "5 Apr 2026", amount: 2000000, status: "success" as const },
  { date: "1 Apr 2026", amount: 750000, status: "processing" as const },
  { date: "28 Mar 2026", amount: 1000000, status: "success" as const },
];

const fmt = (n: number) => `Rp ${n.toLocaleString("id-ID")}`;

const DriverWithdraw = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [banks, setBanks] = useState(initialBanks);
  const [selectedBank, setSelectedBank] = useState("bca-1");
  const [confirmed, setConfirmed] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  // New bank form state
  const [newBankName, setNewBankName] = useState("");
  const [newBankNumber, setNewBankNumber] = useState("");
  const [newBankHolder, setNewBankHolder] = useState("");

  const numAmount = parseInt(amount.replace(/\D/g, "")) || 0;
  const isValid = numAmount >= 10000 && numAmount <= SALDO;
  const totalReceived = Math.max(0, numAmount - ADMIN_FEE);

  const handleAmountChange = (val: string) => {
    const num = val.replace(/\D/g, "");
    setAmount(num ? parseInt(num).toLocaleString("id-ID") : "");
  };

  const handleQuickAmount = (val: number) => {
    setAmount(val.toLocaleString("id-ID"));
  };

  const handleAddBank = () => {
    if (!newBankName || !newBankNumber || !newBankHolder) {
      toast.error("Semua field wajib diisi");
      return;
    }
    if (newBankNumber.length < 8) {
      toast.error("Nomor rekening minimal 8 digit");
      return;
    }
    const id = `${newBankName.toLowerCase()}-${Date.now()}`;
    const masked = "****" + newBankNumber.slice(-4);
    const newBank = { id, name: newBankName, number: masked, holder: newBankHolder.trim() };
    setBanks((prev) => [...prev, newBank]);
    setSelectedBank(id);
    setNewBankName("");
    setNewBankNumber("");
    setNewBankHolder("");
    setDialogOpen(false);
    toast.success(`Rekening ${newBankName} berhasil ditambahkan`);
  };

  const handleDeleteBank = (bankId: string) => {
    if (banks.length <= 1) {
      toast.error("Minimal harus ada satu rekening");
      return;
    }
    setBanks((prev) => prev.filter((b) => b.id !== bankId));
    if (selectedBank === bankId) {
      setSelectedBank(banks.find((b) => b.id !== bankId)?.id || "");
    }
    toast("Rekening berhasil dihapus");
  };

  const selectedBankData = banks.find((b) => b.id === selectedBank);

  if (confirmed) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-lg font-bold text-foreground mb-1">Penarikan Berhasil</h2>
        <p className="text-sm text-muted-foreground mb-1">
          {fmt(numAmount)} sedang diproses ke rekening {selectedBankData?.name} {selectedBankData?.number}
        </p>
        <p className="text-xs text-muted-foreground mb-6">Estimasi 1-2 hari kerja</p>
        <Button onClick={() => navigate("/driver/earnings")} className="w-full max-w-xs">
          Kembali ke Penghasilan
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-primary p-4">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/driver/earnings")} className="text-primary-foreground">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h2 className="font-bold text-primary-foreground">Tarik Saldo</h2>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Saldo card */}
        <div className="bg-card rounded-xl border border-border p-4 text-center">
          <p className="text-xs text-muted-foreground font-medium">Saldo tersedia</p>
          <p className="text-xl font-extrabold text-foreground">{fmt(SALDO)}</p>
        </div>

        {/* Input nominal */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">Nominal penarikan</label>
          <Input
            placeholder="Masukkan nominal"
            value={amount ? `Rp ${amount}` : ""}
            onChange={(e) => handleAmountChange(e.target.value.replace("Rp ", ""))}
            className="text-lg font-bold"
          />
          <div className="flex gap-2">
            {quickAmounts.map((q) => (
              <button
                key={q.label}
                onClick={() => handleQuickAmount(q.value)}
                className="flex-1 py-1.5 rounded-lg bg-secondary text-xs font-semibold text-secondary-foreground hover:bg-secondary/80 transition-colors"
              >
                {q.label}
              </button>
            ))}
          </div>
          {numAmount > 0 && numAmount < 10000 && (
            <p className="text-xs text-destructive">Minimum penarikan Rp 10.000</p>
          )}
          {numAmount > SALDO && (
            <p className="text-xs text-destructive">Melebihi saldo tersedia</p>
          )}
        </div>

        {/* Bank selection */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">Rekening tujuan</label>
          <RadioGroup value={selectedBank} onValueChange={setSelectedBank} className="gap-2">
            {banks.map((bank) => (
              <label
                key={bank.id}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors",
                  selectedBank === bank.id ? "border-primary bg-primary/5" : "border-border bg-card"
                )}
              >
                <RadioGroupItem value={bank.id} />
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">{bank.name} {bank.number}</p>
                  <p className="text-xs text-muted-foreground">{bank.holder}</p>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleDeleteBank(bank.id);
                  }}
                  className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </label>
            ))}
          </RadioGroup>

          {/* Add bank button */}
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <button className="w-full flex items-center justify-center gap-2 p-3 rounded-xl border border-dashed border-border text-sm font-semibold text-muted-foreground hover:border-primary hover:text-primary transition-colors">
                <Plus className="h-4 w-4" />
                Tambah Rekening
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-sm">
              <DialogHeader>
                <DialogTitle>Tambah Rekening Baru</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-2">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Nama Bank</label>
                  <Select value={newBankName} onValueChange={setNewBankName}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih bank" />
                    </SelectTrigger>
                    <SelectContent>
                      {bankOptions.map((b) => (
                        <SelectItem key={b} value={b}>{b}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Nomor Rekening</label>
                  <Input
                    placeholder="Masukkan nomor rekening"
                    value={newBankNumber}
                    onChange={(e) => setNewBankNumber(e.target.value.replace(/\D/g, ""))}
                    maxLength={20}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Nama Pemilik</label>
                  <Input
                    placeholder="Nama sesuai rekening"
                    value={newBankHolder}
                    onChange={(e) => setNewBankHolder(e.target.value)}
                    maxLength={100}
                  />
                </div>
                <Button className="w-full" onClick={handleAddBank}>
                  Simpan Rekening
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Summary */}
        {numAmount > 0 && (
          <div className="bg-card rounded-xl border border-border p-4 space-y-2">
            <p className="text-xs font-semibold text-muted-foreground mb-2">Ringkasan</p>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Nominal</span>
              <span className="font-semibold text-foreground">{fmt(numAmount)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Biaya admin</span>
              <span className="font-semibold text-foreground">- {fmt(ADMIN_FEE)}</span>
            </div>
            <div className="border-t border-border pt-2 flex justify-between text-sm">
              <span className="font-semibold text-foreground">Total diterima</span>
              <span className="font-bold text-primary">{fmt(totalReceived)}</span>
            </div>
          </div>
        )}

        {/* Confirm button */}
        <Button
          className="w-full"
          disabled={!isValid}
          onClick={() => setConfirmed(true)}
        >
          Konfirmasi Penarikan
        </Button>

        {/* Withdrawal history */}
        <div className="space-y-2">
          <p className="text-sm font-semibold text-foreground">Riwayat Penarikan</p>
          <div className="bg-card rounded-xl border border-border divide-y divide-border">
            {withdrawHistory.map((w, i) => (
              <div key={i} className="flex items-center justify-between p-3">
                <div>
                  <p className="text-sm font-semibold text-foreground">{fmt(w.amount)}</p>
                  <p className="text-xs text-muted-foreground">{w.date}</p>
                </div>
                <div className={cn(
                  "flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full",
                  w.status === "success" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                )}>
                  {w.status === "success" ? <CheckCircle2 className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                  {w.status === "success" ? "Berhasil" : "Diproses"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <DriverBottomNav />
    </div>
  );
};

export default DriverWithdraw;
