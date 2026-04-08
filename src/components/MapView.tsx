import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icon
const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = defaultIcon;

// Medan center
const MEDAN_CENTER: [number, number] = [3.5952, 98.6722];

const driverPositions: [number, number][] = [
  [3.5975, 98.6745],
  [3.5930, 98.6700],
  [3.5990, 98.6680],
  [3.5910, 98.6760],
];

const MapView = () => {
  return (
    <MapContainer
      center={MEDAN_CENTER}
      zoom={14}
      scrollWheelZoom={false}
      className="w-full h-full"
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={MEDAN_CENTER}>
        <Popup>📍 Lokasi Anda</Popup>
      </Marker>
      {driverPositions.map((pos, i) => (
        <Marker key={i} position={pos}>
          <Popup>🚗 Driver #{i + 1}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;
