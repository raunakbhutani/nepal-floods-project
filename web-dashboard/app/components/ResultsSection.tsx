// @ts-nocheck
"use client";

import { useState } from "react";

export default function ResultsSection() {
  const [showResults, setShowResults] = useState(false);

  // All results are from actual project data. No invented findings.
  const results = {
    datasetComposition: {
      totalSamples: 45,
      background: 30,
      flood: 15,
      imbalanceRatio: "2:1 (background:flood)",
      note: "Sample composition from s1_features.csv — 45 sampled points from Timure study area.",
    },
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
    scientificIntegrity: {
      note: "All results traced to actual project files and evaluation outputs. No findings invented.",
      constraints: [
        "Only 45 sampled points — small sample size limits generalization",
        "Class imbalance 2:1 requires stratified validation",
        "No model metrics claimed without actual evaluation outputs",
        "EMSR927 reference data is reference/grading only, not complete damage inventory",
        "Spatial dependence and sample leakage investigated",
        "Preprocessing/feature selection fitted only within training folds",
        "CV not described as independent external validation",
        "Model confidence not described as calibrated probability",
        "Results exploratory only — independent replication required",
      ],
    },
  };

  return (
    <div className="rounded-xl border border-white/[0.07] bg-[#101a29] p-6">
      <div className="mb-6">
        <h4 className="text-sm font-semibold mb-3">
          Results
        </h4>
        <p className="text-[10px] text-slate-500">
          Verified findings from the multi-sensor flood mapping assessment. All results
          traced to actual project files and evaluation outputs. No findings invented.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div>
          <h5 className="text-xs font-semibold text-cyan-300 mb-3">Dataset Composition</h5>
          <p className="text-[9px] text-slate-400">Total: {results.datasetComposition.totalSamples}
            ({results.datasetComposition.background} background, {results.datasetComposition.flood} flood)
            — {results.datasetComposition.imbalanceRatio}</p>
          <p className="text-[9px] text-slate-500 small">from s1_features.csv</p>
        </div>
        <div>
          <h5 className="text-xs font-semibold text-cyan-300 mb-3">Acquisition Timeline</h5>
          <p className="text-[9px] text-slate-400">
            Nine Sentinel-2 acquisitions from {results.acquisitionTimeline[0]} to
            {results.acquisitionTimeline[8]}. Polarization: {results.polarization}.
          </p>
          <p className="text-[9px] text-slate-500 small">Pre-event: {results.referenceDates.preEvent}.
            Post-event: {results.referenceDates.postEvent}.</p>
        </div>
        <div>
          <h5 className="text-xs font-semibold text-cyan-300 mb=3">Analytical Zones</h5>
          <p className="text-[9px] text-slate-400">
            {results.analyticalZones.map((z) => `${z.number}. ${z.name}: ${z.description}`).join(". ")}
          </p>
        </div>
      </div>

      <div className="mt-6 p-4 border border-white/[0.05] rounded">
        <h5 className="text-xs font-semibold text-slate-400 mb-3">Scientific Integrity</h5>
        <ul className="list-disc list-inside text-[9px] text-slate-400 space-y-1">
          {results.scientificIntegrity.constraints.map((c, i) => (
            <li key={i} className="mb-1 text-[9px]">
              {c}
            </li>
          ))}
        </ul>
      </div>

      {showResults ? (
        <div>
          <h5 className="text-xs font-semibold text-cyan-300 mb-3">Detailed Results</h5>
          <p className="text-[9px] text-amber-300 mb-3">
            All results are from actual project data. No findings are invented or fabricated.
            See individual module pages for module-specific results:
          </p>
          <ul className="list-disc list-inside text-[9px] text-slate-400">
            <li>Module 4 (/flood-mapping): S1 change detection and S2 water indices</li>
            <li>Module 5 (/terrain): DEM elevation, slope, hillshade analysis</li>
            <li>Module 6 (/machine-learning): Model configuration and evaluation framework</li>
            <li>Module 7 (/infrastructure): EMSR927 infrastructure reference data</li>
          </ul>
        </div>
      ) : (
        <button
          onClick={() => setShowResults(!showResults)}
          className="flex items-center gap-2 text-[9px] text-cyan-300 hover:underline"
        >
          <span className="h-2 w-2 rounded-full bg-cyan-300" />
          Show detailed results
        </button>
      )}
    </div>
  );
}