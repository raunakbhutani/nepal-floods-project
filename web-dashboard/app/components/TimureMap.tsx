import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  LayersControl,
  ScaleControl,
  ZoomControl,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

const timureCenter: [number, number] = [28.254, 85.367] as const;

export default function TimureMap() {
  const [showStudyPoint, setShowStudyPoint] = useState(true);

  return (
    <div className="relative w-full overflow-hidden rounded-lg border border-white/10">

      <MapContainer
        center={timureCenter}
        zoom={13}
        scrollWheelZoom={true}
        className="h-[500px] w-full"
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

        <ZoomControl position="topright" />

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