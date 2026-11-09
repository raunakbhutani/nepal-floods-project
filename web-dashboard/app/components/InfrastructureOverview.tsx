// @ts-nocheck
"use client";

import { useState } from "react";

export default function InfrastructureOverview() {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="rounded-xl border border-white/[0.07] bg-[#101a29] p-6">
      <div className="mb-6">
        <h4 className="text-sm font-semibold mb-3">
          Infrastructure Impact Assessment Overview
        </h4>
        <p className="text-[10px] text-slate-500">
          EMSR927_AOI02_GRA_PRODUCT_v2.gpkg reference data assessment for Timure,
          Rasuwa District, Nepal. Bhote Koshi–Lhende Khola corridor. August 2026 flood
          event. This assessment framework is designed for when the GeoPackage data
          becomes available. No infrastructure features or exposure counts are claimed
          or fabricated in this application.
        </p>
      </div>

      <div className="mb-6 p-4 border border-white/[0.05] rounded">
        <h5 className="text-xs font-semibold text-slate-400 mb-3">
          Expected EMSR927 GeoPackage Layers (When Available)
        </h5>
        <ul className="list-disc list-inside text-[9px] text-slate-400">
          <li>
            <strong>builtUpP_v2:</strong> 431 built-up features (potential settlements).
            When available: field attributes and CRS verified before display.
          </li>
          <li>
            <strong>transportationL_v2:</strong> 15 transportation line features.
            When available: line lengths, road types, and attribute fields verified.
          </li>
          <li>
            <strong>transportationP_v2:</strong> 1 transportation point feature.
            When available: point geometry and attributes verified.
          </li>
          <li>
            <strong>facilitiesA_v2:</strong> Includes Rasuwagadhi Hydropower Dam.
            When available: facility type, status, and attribute fields verified.
          </li>
          <li>
            <strong>observedEventA_v2:</strong> 1 observed landslide feature.
            When available: landslide type, extent, and verification status.
          </li>
          <li>
            <strong>areaOfInterestA_v2:</strong> Study area boundary.
            When available: geometry, CRS, and attribution.
          </li>
          <li>
            <strong>imageFootprintA_v2:</strong> Source imagery footprints.
            When available: footprint geometry and acquisition dates.
          </li>
        </ul>
      </div>

      <div>
        <p className="text-[10px] text-slate-500 mb-3">
          Current Status: EMSR927 GeoPackage data not found in repository. All
          infrastructure feature counts and exposure assessments are pending actual
          GeoPackage availability. No damaged feature counts, affected road lengths,
          or settlement counts are claimed or fabricated.
        </p>
        <p className="text-[9px] text-slate-500">
          When the GeoPackage becomes available, the following methodology will be
          applied:
        </p>
        <ul className="list-disc list-inside text-[9px] text-slate-400">
          <li>Verify CRS compatibility (target: UTM Zone 45N / EPSG:32645)</li>
          <li>Verify geometric types and attribute fields for each layer</li>
          <li>Perform spatial intersection with verified flood polygons (when available)</li>
          <li>Calculate exposed feature counts only after valid overlay analysis</li>
          <li>Distinguish potentially exposed from confirmed damaged features</li>
          <li>Report source attribution and methodology for every statistic</li>
        </ul>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="mt-3 text-[9px] text-cyan-300 hover:underline"
        >
          {showDetails ? "Hide methodology" : "Show scientific requirements"}
        </button>
      </div>
    </div>
  );
}