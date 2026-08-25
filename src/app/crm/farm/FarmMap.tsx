"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { FarmTarget } from "./cluster";

/** Fit the map to all pins whenever the set changes. */
function FitBounds({ targets }: { targets: FarmTarget[] }) {
  const map = useMap();
  useEffect(() => {
    const pts = targets.filter((t) => Number.isFinite(t.lat) && Number.isFinite(t.lng));
    if (pts.length === 0) return;
    if (pts.length === 1) {
      map.setView([pts[0].lat, pts[0].lng], 15);
      return;
    }
    const bounds = pts.map((t) => [t.lat, t.lng]) as [number, number][];
    map.fitBounds(bounds, { padding: [40, 40] });
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
