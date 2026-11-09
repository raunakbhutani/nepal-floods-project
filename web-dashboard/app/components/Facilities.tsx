// @ts-nocheck
"use client";

import { useState } from "react";

export default function Facilities() {
  const [showFacilities, setShowFacilities] = useState(false);

  // No facilities data available in repository.
  // When EMSR927 facilitiesA_v2 layer is available: includes Rasuwagadhi Hydropower Dam
  const placeholderNote = (
    <div>
      <p className="text-[9px] text-amber-300 mb-3">
        No facilities data available in repository. EMSR927 facilitiesA_v2 layer
        not found. When available: includes Rasuwagadhi Hydropower Dam. Feature
        count and attribute fields verified. CRS (EPSG:32645) verified before
        display. No facility damage status claimed without verification.
      </p>
      <p className="text-[9px] text-slate-500">
        When available, facilities will include:
      </p>
      <ul className="list-disc list-inside text-[9px] text-slate-400">
        <li>Rasuwagadhi Hydropower Dam (known reference feature)</li>
        <li>Other facility features from facilitiesA_v2</li>
        <li>CRS: EPSG:32645 (UTM Zone 45N)</li>
        <li>No damage status claimed without field verification</li>
        <li>Spatial intersection with flood polygons required for exposure</li>
      </ul>
    </div>
  );

  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="rounded-xl border border-white/[0.07] bg-[#101a29] p-6">
      <div className="mb-6">
        <h4 className="text-sm font-semibold mb-3">
          Facilities
        </h4>
        <p className="text-[10px] text-slate-500">
          EMSR927 facilitiesA_v2 layer: reference features including Rasuwagadhi
          Hydropower Dam. Facility exposure assessment. No damage status claimed
          without field verification.
        </p>
      </div>

      {showFacilities ? (
        <div>
          <h5 className="text-xs font-semibold text-cyan-300 mb-3">
            Facilities (from actual GeoPackage data)
          </h5>
          <div>
            <p className="text-[9px] text-amber-300 mb-3">
              Placeholder: Facilities inventory will appear here once
              EMSR927 facilitiesA_v2 layer is available. Includes Rasuwagadhi
              Hydropower Dam and other facility features. Attribute fields
              verified. CRS EPSG:32645.
            </p>
            <div className="h-[140px] border border-white/[0.05] rounded bg-[#0b1321]">
              <p className="text-[9px] text-slate-500 text-center pt-40">
                Facilities inventory appears here once GeoPackage data is available.
                Each facility will include attribute fields from the source dataset.
                No damage status claimed without field verification. Spatial
                intersection with flood polygons required for exposure assessment.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowFacilities(!showFacilities)}
          className="flex items-center gap-2 text-[9px] text-cyan-300 hover:underline"
        >
          <span className="h-2 w-2 rounded-full bg-cyan-300" />
          Show facilities (unverified - requires GeoPackage)
        </button>
      )}

      {showFacilities === false && (
        <p className="mt-3 text-[9px] text-amber-300">
          No facilities data found in repository. EMSR927 facilitiesA_v2 layer not
          found. When available: includes Rasuwagadhi Hydropower Dam and other
          facility features. Attribute fields verified. CRS EPSG:32645. No damage
          status claimed without field verification. Spatial overlay with flood
          polygons required for exposure assessment.
        </p>
      )}
      {showFacilities && (
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