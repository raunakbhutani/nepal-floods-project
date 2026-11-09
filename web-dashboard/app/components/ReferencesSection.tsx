// @ts-nocheck
"use client";

import { useState } from "react";

export default function ReferencesSection() {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="rounded-xl border border-white/[0.07] bg-[#101a29] p-6">
      <div className="mb-6">
        <h4 className="text-sm font-semibold mb-3">
          References & Data Sources
        </h4>
        <p className="text-[10px] text-slate-500">
          Source attribution and methodology for all project data. Clear distinction
          between verified data and preliminary results.
        </p>
      </div>
      <div className="mb-6">
        <h5 className="text-xs font-semibold text-cyan-300 mb-3">Research Modules</h5>
        <p className="text-[9px] text-slate-400">
          This project includes eight analytical modules documenting the multi-sensor
          flood mapping assessment:
        </p>
        <ul className="list-disc list-inside text-[9px] text-slate-400 space-y-1">
          <li>Module 1: Overview (/)</li>
          <li>Module 2: Map (/map)</li>
          <li>Module 3: Satellite (/satellite)</li>
          <li>Module 4: Flood Mapping (/flood-mapping)</li>
          <li>Module 5: Terrain (/terrain)</li>
          <li>Module 6: Machine Learning (/machine-learning)</li>
          <li>Module 7: Model Evaluation (/model-evaluation)</li>
          <li>Module 8: Infrastructure Impact (/infrastructure)</li>
        </ul>
      </div>
      {showDetails ? (
        <div>
          <p className="text-[9px] text-amber-300 mb-3">
            This project comprehensively assesses the August 2026 Nepal flood event
            using Sentinel-1 and Sentinel-2 data fusion in Timure, Rasuwa District.
          </p>
          <p className="text-[9px] text-slate-500">
            All analytical modules are documented with their respective routes.
          </p>
        </div>
      ) : (
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-[9px] text-cyan-300 hover:underline"
        >
          Show project modules
        </button>
      )}
    </div>
  );
}
