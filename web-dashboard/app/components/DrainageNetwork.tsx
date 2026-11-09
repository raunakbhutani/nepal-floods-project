"use client";

import { useState } from "react";

export default function DrainageNetwork() {
  const [showNotes, setShowNotes] = useState(true);

  return (
    <div className="rounded-xl border border-white/[0.07] bg-[#101a29] p-6">
      <div className="mb-6">
        <h4 className="text-sm font-semibold mb-3">
          Drainage Network Analysis
        </h4>
        <p className="text-[10px] text-slate-500">
          Drainage network and river corridor analysis for the Timure, Rasuwa District
          study area. Bhote Koshi–Lhende Khola corridor. Specific drainage vector
          data, network lengths and watershed boundaries are not currently available in
          the repository. Drainage pathways are inferred from DEM-derived terrain
          gradients and river corridor mapping from optical imagery.
        </p>
      </div>

      <div className="mb-6 p-4 border border-white/[0.05] rounded">
        <p className="text-[10px] text-slate-500">
          <strong>Available data:</strong> Copernicus DEM GLO-30 (30m resolution),
          Sentinel-2 optical acquisitions, Sentinel-1 SAR time series.
        </p>
        <p className="mt-2 text-[10px] text-slate-500">
          <strong>Not available in this module:</strong> Vector drainage network,
          stream order, watershed boundaries, river centerlines. These datasets would
          require additional GIS processing of the DEM and imagery.
        </p>
      </div>

      <div>
        < details>
          <summary className="cursor-pointer text-[10px] text-cyan-300 hover:underline">
            Show terrain interpretation notes
          </summary>
          <div className="mt-3 text-[10px] text-slate-400">
            <p>Drainage pathways in mountain terrain are controlled by:</p>
            <ul className="list-disc list-inside">
              <li>Valley floor topography and elevation minima</li>
              <li>Slope gradient and flow direction</li>
              <li>Confluences of the Bhote Koshi and Lhende Khola</li>
              <li>Alluvial fan deposition at corridor junctions</li>
            </ul>
            <p>Flood routing follows the lowest-elevation pathways through the valley.
              Post-event Sentinel-1 and Sentinel-2 analysis identifies observed water
              extent and change areas. No drainage length statistics, watershed areas, or
              pixel counts are claimed or fabricated.</p>
          </div>
        </details>
      </div>
    </div>
  );
}