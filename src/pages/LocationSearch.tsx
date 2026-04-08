import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, MapPin, Clock, Star, Plane } from "lucide-react";
import { Input } from "@/components/ui/input";

const savedPlaces = [
  { name: "Rumah", address: "Jl. Gatot Subroto No. 12, Medan", icon: Star },
  { name: "Kantor", address: "Jl. Asia No. 45, Medan", icon: Star },
];

const recentPlaces = [
  { name: "KNO Airport", address: "Kualanamu International Airport", icon: Plane, distance: "39 km" },
  { name: "Medan Fair Plaza", address: "Jl. Gatot Subroto, Medan", icon: Clock, distance: "3.2 km" },
  { name: "Sun Plaza", address: "Jl. KH Zainul Arifin, Medan", icon: Clock, distance: "2.1 km" },
  { name: "RS Columbia Asia", address: "Jl. Listrik No.2A, Medan", icon: Clock, distance: "4.5 km" },
];

const LocationSearch = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const filtered = recentPlaces.filter(
    (p) => p.name.toLowerCase().includes(query.toLowerCase()) || p.address.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-card border-b border-border p-4 space-y-3">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-foreground">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h2 className="font-bold text-foreground">Pilih Lokasi</h2>
        </div>

        {/* Search inputs */}
        <div className="flex gap-3">
          <div className="flex flex-col items-center gap-1 pt-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-success" />
            <div className="w-px h-6 bg-border" />
            <div className="w-2.5 h-2.5 rounded-sm bg-destructive" />
          </div>
          <div className="flex-1 space-y-2">
            <Input
              placeholder="Lokasi jemput"
              value="Lokasi saat ini"
              readOnly
              className="h-9 text-sm bg-secondary border-0"
            />
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Mau ke mana?"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
                className="h-9 text-sm pl-9 bg-secondary border-0"
              />
            </div>
          </div>
        </div>
      </div>

      {/* KNO Airport pinned */}
      <button
        onClick={() => navigate("/ride-select")}
        className="flex items-center gap-3 p-4 bg-accent/10 border-b border-border"
      >
        <div className="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center">
          <Plane className="h-5 w-5 text-accent-foreground" />
        </div>
        <div className="flex-1 text-left">
          <p className="text-sm font-bold text-foreground">KNO Airport</p>
          <p className="text-xs text-muted-foreground">Kualanamu International Airport • 39 km</p>
        </div>
        <span className="text-xs font-bold text-accent-foreground bg-accent px-2 py-1 rounded-md">Popular</span>
      </button>

      {/* Saved */}
      {!query && (
        <div className="p-4">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Tersimpan</p>
          {savedPlaces.map((place) => (
            <button
              key={place.name}
              onClick={() => navigate("/ride-select")}
              className="flex items-center gap-3 py-2.5 w-full"
            >
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <place.icon className="h-4 w-4 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-foreground">{place.name}</p>
                <p className="text-xs text-muted-foreground">{place.address}</p>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Recent / Search Results */}
      <div className="p-4">
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
          {query ? "Hasil Pencarian" : "Terakhir"}
        </p>
        {filtered.map((place) => (
          <button
            key={place.name}
            onClick={() => navigate("/ride-select")}
            className="flex items-center gap-3 py-2.5 w-full"
          >
            <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center">
              <place.icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-semibold text-foreground">{place.name}</p>
              <p className="text-xs text-muted-foreground">{place.address}</p>
            </div>
            <span className="text-xs text-muted-foreground">{place.distance}</span>
          </button>
        ))}
      </div>

      {/* Set on map */}
      <button className="mx-4 mt-auto mb-20 flex items-center justify-center gap-2 py-3 rounded-xl border border-border text-sm font-semibold text-primary">
        <MapPin className="h-4 w-4" />
        Set di Peta
      </button>
    </div>
  );
};

export default LocationSearch;
