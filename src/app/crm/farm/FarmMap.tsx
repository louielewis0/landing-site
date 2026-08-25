"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, CircleMarker, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { FarmTarget } from "./cluster";

/** Louie's home — a fixed reference pin on the farm map. */
const HOME = { lat: 42.6495781, lng: -83.2000812, label: "Home · 3449 Greenspring Ln, Rochester Hills" };

const homeIcon = L.divIcon({
  className: "",
  html: `<div style="width:32px;height:32px;background:#2E5A9C;border:3px solid #fff;border-radius:50%;box-shadow:0 3px 10px rgba(0,0,0,.4);display:flex;align-items:center;justify-content:center">
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10l9-7 9 7M5 9v11h14V9"/></svg>
  </div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

/** Fit the map to all pins (plus home) whenever the set changes. */
function FitBounds({ targets }: { targets: FarmTarget[] }) {
  const map = useMap();
  useEffect(() => {
    const pts = targets.filter((t) => Number.isFinite(t.lat) && Number.isFinite(t.lng));
    if (pts.length === 0) {
      map.setView([HOME.lat, HOME.lng], 12);
      return;
    }
    const bounds = [
      ...pts.map((t) => [t.lat, t.lng]),
      [HOME.lat, HOME.lng],
    ] as [number, number][];
    map.fitBounds(bounds, { padding: [45, 45] });
  }, [map, targets]);
  return null;
}

export default function FarmMap({
  targets,
  onToggle,
  focusId,
}: {
  targets: FarmTarget[];
  onToggle: (t: FarmTarget) => void;
  focusId?: string | null;
}) {
  const withCoords = targets.filter((t) => Number.isFinite(t.lat) && Number.isFinite(t.lng));
  const center: [number, number] = withCoords.length
    ? [withCoords[0].lat, withCoords[0].lng]
    : [42.6, -83.1]; // Metro Detroit default

  return (
    <MapContainer
      center={center}
      zoom={12}
      scrollWheelZoom
      style={{ height: "100%", width: "100%", borderRadius: 18 }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FitBounds targets={withCoords} />
      <Marker position={[HOME.lat, HOME.lng]} icon={homeIcon} zIndexOffset={1000}>
        <Popup>
          <div style={{ fontFamily: "Manrope, system-ui, sans-serif", fontWeight: 600, fontSize: 13, color: "#191a1c" }}>
            🏠 {HOME.label}
          </div>
        </Popup>
      </Marker>
      {withCoords.map((t) => {
        const focused = t.id === focusId;
        return (
          <CircleMarker
            key={t.id}
            center={[t.lat, t.lng]}
            radius={focused ? 11 : 8}
            pathOptions={{
              color: "#fff",
              weight: 2,
              fillColor: t.carded ? "#1d7a4f" : "#E4501E",
              fillOpacity: t.carded ? 0.65 : 1,
            }}
          >
            <Popup>
              <div style={{ minWidth: 180, fontFamily: "Manrope, system-ui, sans-serif" }}>
                <div style={{ fontWeight: 600, fontSize: 13.5, marginBottom: 8, color: "#191a1c" }}>
                  {t.address}
                </div>
                <button
                  onClick={() => onToggle(t)}
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "8px 10px",
                    borderRadius: 8,
                    border: "none",
                    cursor: "pointer",
                    fontWeight: 600,
                    fontSize: 12.5,
                    marginBottom: 6,
                    background: t.carded ? "#e9e5dc" : "#E4501E",
                    color: t.carded ? "#191a1c" : "#fff",
                  }}
                >
                  {t.carded ? "✓ Carded — undo" : "Mark carded"}
                </button>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(t.address)}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{ fontSize: 12, color: "#2E5A9C", fontWeight: 600 }}
                >
                  Directions →
                </a>
              </div>
            </Popup>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
}
