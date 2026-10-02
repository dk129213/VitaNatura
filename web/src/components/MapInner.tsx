"use client";

import { MapContainer, TileLayer, CircleMarker, Popup, Polyline } from "react-leaflet";

export type MapPoint = {
  id: string;
  lat: number;
  lon: number;
  title: string;
  subtitle?: string;
  kind: "you" | "hospital" | "clinic" | "pharmacy" | "doctors" | "dentist" | "place";
};

// Marker colours follow meaning, not decoration: red = emergency care, accent = you / chosen place.
const style: Record<MapPoint["kind"], { color: string; radius: number }> = {
  you: { color: "#1d6b4f", radius: 11 },
  hospital: { color: "#b3261e", radius: 9 },
  clinic: { color: "#9a5b00", radius: 7 },
  doctors: { color: "#9a5b00", radius: 6 },
  pharmacy: { color: "#2f6fb0", radius: 6 },
  dentist: { color: "#66746d", radius: 5 },
  place: { color: "#1d6b4f", radius: 9 },
};

export default function MapInner({
  center,
  zoom,
  points,
  line,
}: {
  center: [number, number];
  zoom: number;
  points: MapPoint[];
  line?: [number, number][];
}) {
  return (
    <MapContainer center={center} zoom={zoom} scrollWheelZoom={false} className="h-full w-full">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {line && <Polyline positions={line} pathOptions={{ color: "#1d6b4f", weight: 4, dashArray: "8 8" }} />}
      {points.map((p) => (
        <CircleMarker
          key={p.id}
          center={[p.lat, p.lon]}
          radius={style[p.kind].radius}
          pathOptions={{ color: "#ffffff", weight: 2, fillColor: style[p.kind].color, fillOpacity: 1 }}
        >
          <Popup>
            <strong>{p.title}</strong>
            {p.subtitle && <div>{p.subtitle}</div>}
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
