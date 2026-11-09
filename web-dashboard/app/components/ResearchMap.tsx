"use client";

import { useEffect, useState } from "react";
import {
  CircleMarker,
  GeoJSON,
  ImageOverlay,
  LayersControl,
  MapContainer,
  Popup,
  ScaleControl,
  TileLayer,
  ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { fetchJson } from "../lib/api";

type PinFC = {
  features: Array<{
    geometry: { coordinates: [number, number] };
    properties: {
      name: string;
      label: string;
      lat: number;
      lon: number;
      target: number;
    };
  }>;
};

type FloodStats = {
  bounds: { west: number; south: number; east: number; north: number };
  candidate_area_km2: number;
  method: string;
};

export default function ResearchMap() {
  const [pins, setPins] = useState<PinFC | null>(null);
  const [stats, setStats] = useState<FloodStats | null>(null);
  const [polygons, setPolygons] = useState<object | null>(null);

  useEffect(() => {
    fetchJson<PinFC>("/pins", "/data/pins.geojson").then(setPins).catch(() => setPins(null));
    fetchJson<FloodStats>("/flood/stats", "/data/flood_stats.json").then(setStats).catch(() => setStats(null));
    fetchJson<object>("/flood/polygons", "/data/flood_polygons.geojson")
      .then(setPolygons)
      .catch(() => setPolygons(null));
  }, []);

  const bounds = stats
    ? ([[stats.bounds.south, stats.bounds.west], [stats.bounds.north, stats.bounds.east]] as [
        [number, number],
        [number, number],
      ])
    : null;

  return (
    <div className="relative w-full overflow-hidden rounded-lg border border-white/10">
      <MapContainer
        center={[28.254, 85.367]}
        zoom={14}
        scrollWheelZoom
        className="h-[560px] w-full"
        style={{ height: 560, width: "100%" }}
        zoomControl={false}
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="OpenStreetMap">
            <TileLayer
              attribution="&copy; OpenStreetMap"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Esri imagery">
            <TileLayer
              attribution="Tiles &copy; Esri"
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />
          </LayersControl.BaseLayer>
          {bounds && (
            <LayersControl.Overlay checked name="SAR change mask">
              <ImageOverlay url="/data/flood_overlay.png" bounds={bounds} opacity={0.65} />
            </LayersControl.Overlay>
          )}
          {bounds && (
            <LayersControl.Overlay name="SAR darkening intensity">
              <ImageOverlay url="/data/change_overlay.png" bounds={bounds} opacity={0.7} />
            </LayersControl.Overlay>
          )}
          {bounds && (
            <LayersControl.Overlay name="Legacy S1-only RF score ≥ 0.5">
              <ImageOverlay url="/data/rf_overlay.png" bounds={bounds} opacity={0.55} />
            </LayersControl.Overlay>
          )}
        </LayersControl>
        {polygons && (
          <GeoJSON
            data={polygons as never}
            style={{ color: "#22d3ee", weight: 1, fillOpacity: 0.05 }}
          />
        )}
        {pins?.features.map((f) => {
          const [lon, lat] = f.geometry.coordinates;
          const flood = f.properties.target === 1;
          return (
            <CircleMarker
              key={`${f.properties.name}-${f.properties.label}`}
              center={[lat, lon]}
              radius={6}
              pathOptions={{
                color: flood ? "#22d3ee" : "#94a3b8",
                fillColor: flood ? "#0891b2" : "#334155",
                fillOpacity: 0.9,
                weight: 1.5,
              }}
            >
              <Popup>
                <strong>{f.properties.name}</strong>
                <br />
                {f.properties.label}
                <br />
                {lat.toFixed(5)} N, {lon.toFixed(5)} E
              </Popup>
            </CircleMarker>
          );
        })}
        <ZoomControl position="topright" />
        <ScaleControl position="bottomleft" />
      </MapContainer>
      {stats && (
        <p className="border-t border-white/10 bg-[#0b1321] px-4 py-3 text-[10px] leading-5 text-slate-500">
          Candidate inundation area (downsampled SAR change mask):{" "}
          {stats.candidate_area_km2.toFixed(3)} km². {stats.method}
        </p>
      )}
    </div>
  );
}
