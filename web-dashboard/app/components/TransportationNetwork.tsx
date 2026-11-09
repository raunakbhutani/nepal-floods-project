// @ts-nocheck
"use client";

import { useState } from "react";

export default function TransportationNetwork() {
  const [showNetwork, setShowNetwork] = useState(false);

  // No transportation data available in repository.
  // When EMSR927 transportationL_v2 and transportationP_v2 layers are available:
  // - 15 transportation line features
  // - 1 transportation point feature
  const placeholderNote = (
    <div>
      <p className="text-[9px] text-amber-300 mb-3">
        No transportation network data available in repository. EMSR927
        transportationL_v2 (15 line features) and transportationP_v2 (1 point
        feature) not found. When available: line lengths, road types, and
        attribute fields verified. CRS (EPSG:32645) verified before display.
      </p>
      <p className="text-[9px] text-slate-500">
        When available, transportation network will include:
      </p>
      <ul className="list-disc list-inside text-[9px] text-slate-400">
        <li>15 transportation line features (roads/paths)</li>
        <li>1 transportation point feature</li>
        <li>CRS: EPSG:32645 (UTM Zone 45N)</li>
        <li>No road lengths or damage status claimed without verification</li>
        <li>Spatial intersection with flood polygons required for exposure</li>
      </ul>
    </div>
  );

  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="rounded-xl border border-white/[0.07] bg-[#101a29] p-6">
      <div className="mb-6">
        <h4 className="text-sm font-semibold mb-3">
          Transportation Networks
        </h4>
        <p className="text-[10px] text-slate-500">
          EMSR927 transportation layer: 15 line features + 1 point feature reference
          inventory. Road and corridor exposure assessment. No damage status claimed
          without verification.
        </p>
      </div>

      {showNetwork ? (
        <div>
          <h5 className="text-xs font-semibold text-cyan-300 mb-3">
            Transportation Network (from actual GeoPackage data)
          </h5>
          <div>
            <p className="text-[9px] text-amber-300 mb-3">
              Placeholder: Transportation network will appear here once
              EMSR927 transportation layers are available. 15 line features + 1
              point feature. Line lengths and road types from source attributes.
            </p>
            <div className="h-[140px] border border-white/[0.05] rounded bg-[#0b1321]">
              <p className="text-[9px] text-slate-500 text-center pt-40">
                Transportation network inventory appears here once GeoPackage data
                is available. Each line feature will include attribute fields from
                the source dataset. No damage status claimed without verification.
                Spatial intersection with flood polygons required for exposure
                assessment.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowNetwork(!showNetwork)}
          className="flex items-center gap-2 text-[9px] text-cyan-300 hover:underline"
        >
          <span className="h-2 w-2 rounded-full bg-cyan-300" />
          Show transportation network (unverified - requires GeoPackage)
        </button>
      )}

      {showNetwork === false && (
        <p className="mt-3 text-[9px] text-amber-300">
          No transportation network data found in repository. EMSR927
          transportationL_v2 (15 line features) and transportationP_v2 (1 point
          feature) not found. When available: line geometries, road types, and
          attribute fields verified. CRS EPSG:32645. No road lengths or damage
          status claimed without verification. Spatial overlay with flood
          polygons required for exposure assessment.
        </p>
      )}
      {showNetwork && (
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="mt-3 text-[9px] text-cyan-300 float-right"
        >
          Hide details
        </button>
      )}
    </div>
  );
}