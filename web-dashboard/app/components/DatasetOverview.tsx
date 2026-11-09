"use client";

import { useState, useEffect } from "react";

export default function DatasetOverview() {
  const [datasetLoaded, setDatasetLoaded] = useState(false);

  const sampleData = {
    totalSamples: 45,
    backgroundSamples: 30,
    floodSamples: 15,
    classImbalanceRatio: "30:15 (2:1 background vs flood)",
    acquisitionDates: [
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
    polarization: "Sentinel-1 VV / VH",
    referenceDates: {
      preEvent: "11 July 2026",
      postEvent: "28 August 2026",
    },
    metadataColumns: ["Name", "X", "Y", "Lon", "Lat", "target"],
    featureCount: 51,
  };

  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="rounded-xl border border-white/[0.07] bg-[#101a29] p-6">
      <div className="mb-6">
        <h4 className="text-sm font-semibold mb-3">
          Dataset Composition
        </h4>
        <p className="text-[10px] text-slate-500">
          Master sampled dataset from Timure, Rasuwa District, Nepal. Sentinel-1 and
          Sentinel-2 data fusion for August 2026 flood event analysis.
        </p>
      </div>

      <div className="mb-6 p-4 border border-white/[0.05] rounded">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <p className="text-[12px] font-semibold text-cyan-300">Total Samples</p>
            <p className="text-[24px] font-bold">45</p>
          </div>
          <div className="flex-1">
            <p className="text-[12px] font-semibold text-amber-300">Background</p>
            <p className="text-[24px] font-bold">30</p>
          </div>
          <div className="flex-1">
            <p className="text-[12px] font-semibold text-cyan-300">Flood</p>
            <p className="text-[24px] font-bold">15</p>
          </div>
        </div>
      </div>

      <div className="mb-6 p-4 border border-white/[0.05] rounded">
        <h5 className="text-xs font-semibold text-slate-400 mb-3">Class Distribution</h5>
        <div className="space-y-2">
          <div>
            <span className="text-[10px] font-medium text-cyan-300">Background (target=0):</span>
            <span className="ml-2 text-[10px]">30 samples ({calcPercentage(30, 45)}%)</span>
          </div>
          <div>
            <span className="text-[10px] font-medium text-cyan-300">Flood (target=1):</span>
            <span className="ml-2 text-[10px]">15 samples ({calcPercentage(15, 45)}%)</span>
          </div>
        </div>
      </div>

      <div className="mb-6 p-4 border border-white/[0.05] rounded">
        <h5 className="text-xs font-semibold text-slate-400 mb-3">Acquisition Timeline</h5>
        <div className="space-y-1">
          {sampleData.acquisitionDates.map((date, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-cyan-300" />
              <span className="text-[9px] text-slate-400">{date}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="text-[10px] text-slate-500 mb-3">
          Pre-event reference: {sampleData.referenceDates.preEvent}. Post-event reference:
          {sampleData.referenceDates.postEvent}. Polarization: {sampleData.polarization}.
        </p>
        <p className="text-[9px] text-slate-500">
          {sampleData.totalSamples} sampled points from the study area. 51 Sentinel-1
          feature bands. Class imbalance of 2:1 (background:flood) is significant.
          Results from any model trained on this dataset are exploratory only and not
          statistically generalizable. No model scores are claimed or fabricated.
        </p>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="mt-3 text-[9px] text-cyan-300 hover:underline"
        >
          {showDetails ? "Hide details" : "Show scientific constraints"}
        </button>
      </div>
    </div>
  );
}

function calcPercentage(part: number, total: number): string {
  return Math.round((part / total) * 100).toString();
}