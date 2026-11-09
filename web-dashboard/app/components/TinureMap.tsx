
"use client";

import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  LayersControl,
  ScaleControl,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

const timureCenter: [number, number] = [28.254, 85.367];

export default function TimureMap() {
  const [showStudyPoint, setShowStudyPoint] = useState(true);

  return (
    <div className="relative h-[650px] w-full overflow-hidden rounded-xl border border-white/10">

      <div className="absolute left-4 top-4 z-[1000] rounded-lg border border-white/10 bg-[#0b1321]/95 p-4 shadow-xl backdrop-blur">
        <p className="text-xs font-bold text-cyan-300">
          TIMURE STUDY AREA
        </p>
        <p className="mt-1 text-[11px] text-slate-300">
          Rasuwa District, Nepal
        </p>

        <div className="mt-3 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-cyan-400" />
          <span className="text-[10px] text-slate-400">
            Study area reference point
          </span>
        </div>

        <label className="mt-3 flex cursor-pointer items-center gap-2 text-[11px] text-slate-300">
          <input
            type="checkbox"
            checked={showStudyPoint}
            onChange={(event) => setShowStudyPoint(event.target.checked)}
          />
          Show study point
        </label>
      </div>

      <MapContainer
        center={timureCenter}
        zoom={13}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="OpenStreetMap">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer name="Satellite Imagery">
            <TileLayer
              attribution="Tiles &copy; Esri"
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />
          </LayersControl.BaseLayer>
        </LayersControl>

        {showStudyPoint && (
          <CircleMarker
            center={timureCenter}
            radius={8}
            pathOptions={{
              color: "#22d3ee",
              fillColor: "#0891b2",
              fillOpacity: 0.9,
              weight: 2,
            }}
          >
            <Popup>
              <strong>Timure Study Area</strong>
              <br />
              Rasuwa District, Nepal
              <br />
              Reference coordinate: 28.254° N, 85.367° E
            </Popup>
          </CircleMarker>
        )}

        <ScaleControl position="bottomleft" />
      </MapContainer>
    </div>
  );
}
