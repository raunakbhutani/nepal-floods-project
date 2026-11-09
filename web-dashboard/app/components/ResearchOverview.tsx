// @ts-nocheck
"use client";

import { useState } from "react";

export default function ResearchOverview() {
  const [showDetails, setShowDetails] = useState(false);

  const researchSummary = {
    title: "Multi-Sensor Flood Mapping in the Timure/Rasuwa Gorge using Sentinel-1 and Sentinel-2 Data Fusion",
    subtitle: "An Assessment of the August 2026 Nepal Flood Event",
    studyArea: "Timure, Rasuwa District, Nepal",
    corridor: "Bhote Koshi–Lhende Khola corridor",
    eventDate: "August 2026 flood event",
    datasets: [
      "Sentinel-1 SAR VV/VH pre-event and post-event observations",
      "Sentinel-2 L2A optical imagery and sampled spectral features",
      "Copernicus DEM GLO-30 (30 m resolution, EPSG:32645)",
      "Copernicus EMSR927 reference GeoPackage",
      "Machine-learning model training and evaluation outputs",
    ],
    sampleCount: 45,
    backgroundCount: 30,
    floodCount: 15,
    acquisitionTimeline: [
      "4 May 2026",
      "8 June 2026",
      "23 July 2026",
      "12 August 2026",
      "24 August 2026",
      "27 August 2026",
      "6 September 2026",
      "21 September 2026",
      "6 October 2026",
    ],
    polarization: "Sentinel-1 VV and VH",
    referenceDates: {
      preEvent: "11 July 2026",
      postEvent: "28 August 2026",
    },
    analyticalZones: [
      { number: "01", name: "Source Zone", description: "Glacier, steep slopes, landslide and potential source processes" },
      { number: "02", name: "Transport Corridor", description: "Lhende Khola and Bhote Koshi river corridor and sediment transport" },
      { number: "03", name: "Downstream Impact", description: "Water expansion, erosion, settlements, roads and infrastructure" },
    ],
    methodologyModules: [
      "Module 1: Overview and Dashboard (/)",
      "Module 2: Map View (/map)",
      "Module 3: Satellite Intelligence (/satellite)",
      "Module 4: Flood Mapping (/flood-mapping)",
      "Module 5: Terrain Analysis (/terrain)",
      "Module 6: Machine Learning (/machine-learning)",
      "Module 7: Model Evaluation (/model-evaluation)",
      "Module 8: Infrastructure Impact (/infrastructure)",
    ],
    scientificConstraints: [
      "Only 45 sampled points (30 background, 15 flood) — small sample size limits generalization",
      "Class imbalance of 2:1 (background:flood) requires stratified validation",
      "No model metrics are claimed or fabricated — all require actual evaluation outputs",
      "EMSR927 reference data is reference/grading only, not a complete damage inventory",
      "Spatial dependence and sample leakage must be investigated",
      "Preprocessing and feature selection fitted only within training folds",
      "Cross-validation not described as independent external validation",
      "Model confidence not described as calibrated probability without calibration testing",
    ],
  };

  return (
    <div className="rounded-xl border border-white/[0.07] bg-[#101a29] p-6">
      <div className="mb-6">
        <h4 className="text-sm font-semibold mb-3">
          Research Overview & Executive Summary
        </h4>
        <p className="text-[10px] text-slate-500">
          Multi-sensor flood mapping assessment of the August 2026 Nepal flood event
          in Timure, Rasuwa District, Nepal, using Sentinel-1 and Sentinel-2 data fusion.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-[12px] font-semibold text-cyan-300">Study Area</p>
          <p className="text-[20px] font-bold">Timure, Rasuwa District, Nepal</p>
        </div>
        <div>
          <p className="text-[12px] font-semibold text-cyan-300">Corridor</p>
          <p className="text-[20px] font-bold">Bhote Koshi–Lhende Khola</p>
        </div>
        <div>
          <p className="text-[12px] font-semibold text-cyan-300">Event</p>
          <p className="text-[20px] font-bold">August 2026 flood</p>
        </div>
        <div>
          <p className="text-[12px] font-semibold text-cyan-300">Sentinel-1 Dates</p>
          <p className="text-[20px] font-bold">
            Pre-event: 11 July 2026 · Post-event: 28 August 2026
          </p>
        </div>
      </div>

      <div className="mt-6 p-4 border border-white/[0.05] rounded">
        <h5 className="text-xs font-semibold text-slate-400 mb-3">Dataset Summary</h5>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="text-[11px] font-medium text-cyan-300">Total Samples</p>
            <p className="text-[18px] font-bold">45</p>
          </div>
          <div>
            <p className="text-[11px] font-medium text-amber-300">Background</p>
            <p className="text-[18px] font-bold">30</p>
          </div>
          <div>
            <p className="text-[11px] font-medium text-cyan-300">Flood</p>
            <p className="text-[18px] font-bold">15</p>
          </div>
        </div>
        <div>
          <p className="text-[11px] font-medium text-cyan-300">Sentinel-2 Acquisitions</p>
          <p className="text-[18px] font-bold">9</p>
        </div>
      </div>

      <div>
        <p className="text-[10px] text-slate-500 mb-3">
          This research integrates eight analytical modules: overview and dashboard (/),
          map view (/map), satellite intelligence (/satellite), flood mapping (
          /flood-mapping), terrain analysis (/terrain), machine learning (
          /machine-learning), model evaluation (/model-evaluation), and infrastructure
          impact assessment (/infrastructure). Each module contributes verified data
          and scientific constraints to the comprehensive assessment.
        </p>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="mt-3 text-[9px] text-cyan-300 hover:underline"
        >
          {showDetails ? "Hide research summary" : "Show scientific constraints"}
        </button>
      </div>
    </div>
  );
}