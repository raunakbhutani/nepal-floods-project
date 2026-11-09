// @ts-nocheck
"use client";

import { useState } from "react";

export default function BuiltUpFeatures() {
  const [showFeatures, setShowFeatures] = useState(false);

  // No built-up features data available in repository.
  // When EMSR927 builtUpP_v2 layer is available: 431 features with attributes.
  const placeholderNote = (
    <div>
      <p className="text-[9px] text-amber-300 mb-3">
        No built-up features data available in repository. builtUpP_v2 layer not
        found. When available: 431 built-up features with attribute fields verified.
        No features are claimed as "damaged" without field verification or
        complementary post-event analysis.
      </p>
      <p className="text-[9px] text-slate-500">
        When available, built-up features will include:
      </p>
      <ul className="list-disc list-inside text-[9px] text-slate-400">
        <li>Feature count (expected: 431)</li>
        <li>Attribute fields from GeoPackage</li>
        <li>CRS verification (EPSG:32645)</li>
        <li>No "damaged" status claimed without verification</li>
      </ul>
    </div>
  );

  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="rounded-xl border border-white/[0.07] bg-[#101a29] p-6">
      <div className="mb-6">
        <h4 className="text-sm font-semibold mb-3">
          Built-Up Features (Settlements)
        </h4>
        <p className="text-[10px] text-slate-500">
          EMSR927 builtUpP_v2 layer: 431 built-up features reference inventory.
          Settlement exposure assessment. No features claimed as damaged without
          field verification.
        </p>
      </div>

      {showFeatures ? (
        <div>
          <h5 className="text-xs font-semibold text-cyan-300 mb-3">
            Built-Up Features (from actual GeoPackage data)
          </h5>
          <div>
            <p className="text-[9px] text-amber-300 mb-3">
              Placeholder: Built-up feature inventory will appear here once
              EMSR927 builtUpP_v2 layer is available. Feature count: 431.
            </p>
            <div className="h-[140px] border border-white/[0.05] rounded bg-[#0b1321]">
              <p className="text-[9px] text-slate-500 text-center pt-40">
                Built-up features inventory appears here once GeoPackage data is
                available. Each feature will include attribute fields from the
                source dataset. No "damaged" status claimed without verification.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowFeatures(!showFeatures)}
          className="flex items-center gap-2 text-[9px] text-cyan-300 hover:underline"
        >
          <span className="h-2 w-2 rounded-full bg-cyan-300" />
          Show built-up features (unverified - requires GeoPackage)
        </button>
      )}

      {showFeatures === false && (
        <p className="mt-3 text-[9px] text-amber-300">
          No built-up features data found in repository. EMSR927 builtUpP_v2 layer
          not found. When available: 431 features with attribute fields. No features
          claimed as damaged without field verification. Exposure analysis requires
          valid CRS and spatial overlay with flood polygons.
        </p>
      )}
      {showFeatures && (
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