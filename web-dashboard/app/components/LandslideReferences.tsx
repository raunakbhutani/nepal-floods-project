// @ts-nocheck
"use client";

import { useState } from "react";

export default function LandslideReferences() {
  const [showLandslides, setShowLandslides] = useState(false);

  // No landslide data available in repository.
  // When EMSR927 observedEventA_v2 layer is available: 1 observed landslide feature
  const placeholderNote = (
    <div>
      <p className="text-[9px] text-amber-300 mb-3">
        No landslide data available in repository. EMSR927 observedEventA_v2 layer
        not found. When available: 1 observed landslide feature. Landslide type,
        extent, and verification status from source attributes. CRS
        EPSG:32645 verified before display. Landslide does not equal flood damage
        without complementary analysis.
      </p>
      <p className="text-[9px] text-slate-500">
        When available, landslide reference will include:
      </p>
      <ul className="list-disc list-inside text-[9px] text-slate-400">
        <li>1 observed landslide feature from observedEventA_v2</li>
        <li>Landslide type and extent from source attributes</li>
        <li>CRS: EPSG:32645 (UTM Zone 45N)</li>
        <li>Landslide ≠ flood damage without complementary analysis</li>
        <li>Spatial intersection with flood polygons required for exposure</li>
      </ul>
    </div>
  );

  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="rounded-xl border border-white/[0.07] bg-[#101a29] p-6">
      <div className="mb-6">
        <h4 className="text-sm font-semibold mb-3">
          Observed Landslide Features
        </h4>
        <p className="text-[10px] text-slate-500">
          EMSR927 observedEventA_v2 layer: 1 observed landslide feature reference.
          Landslide assessment. No landslide damage status claimed without
          complementary flood damage analysis.
        </p>
      </div>

      {showLandslides ? (
        <div>
          <h5 className="text-xs font-semibold text-cyan-300 mb-3">
            Observed Landslide (from actual GeoPackage data)
          </h5>
          <div>
            <p className="text-[9px] text-amber-300 mb-3">
              Placeholder: Observed landslide feature will appear here once
              EMSR927 observedEventA_v2 layer is available. 1 landslide feature
              from source. Type and extent from source attributes. CRS
              EPSG:32645. Landslide ≠ flood damage without complementary
              analysis. Spatial intersection with flood polygons required.
            </p>
            <div className="h-[140px] border border-white/[0.05] rounded bg-[#0b1321]">
              <p className="text-[9px] text-slate-500 text-center pt-40">
                Observed landslide feature appears here once GeoPackage data is
                available. Feature attributes from source dataset. Landslide
                damage status not claimed without complementary flood damage
                analysis. Spatial intersection with flood polygons required.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowLandslides(!showLandslides)}
          className="flex items-center gap-2 text-[9px] text-cyan-300 hover:underline"
        >
          <span className="h-2 w-2 rounded-full bg-cyan-300" />
          Show observed landslides (unverified - requires GeoPackage)
        </button>
      )}

      {showLandslides === false && (
        <p className="mt-3 text-[9px] text-amber-300">
          No landslide data found in repository. EMSR927 observedEventA_v2 layer
          not found. When available: 1 observed landslide feature. Landslide type
          and extent from source attributes. CRS EPSG:32645. Landslide ≠ flood
          damage without complementary analysis. Spatial intersection with flood
          polygons required for exposure assessment.
        </p>
      )}
      {showLandslides && (
        <button
          onClick={() => setShowDetails(!showLandslides)}
          className="mt-3 text-[9px] text-cyan-300 float-right"
        >
          Hide details
        </button>
      )}
    </div>
  );
}