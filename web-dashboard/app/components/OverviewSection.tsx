"use client";

import { useState } from "react";

export default function OverviewSection() {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="rounded-xl border border-white/[0.07] bg-[#101a29] p-6">
      <div className="mb-6">
        <h4 className="text-sm font-semibold mb-3">
          Dataset and Evaluation Setup
        </h4>
        <p className="text-[10px] text-slate-500">
          Master sampled dataset from Timure, Rasuwa District, Nepal. Sentinel-1 (VV/VH)
          and Sentinel-2 multi-sensor fusion for August 2026 flood event analysis.
        </p>
      </div>

      <div className="mb-6 p-4 border border-white/[0.05] rounded">
        <h5 className="text-xs font-semibold text-slate-400 mb-3">
          Sample Composition
        </h5>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="text-[12px] font-semibold text-cyan-300">Total Samples</p>
            <p className="text-[20px] font-bold">45</p>
          </div>
          <div>
            <p className="text-[12px] font-semibold text-amber-300">Background</p>
            <p className="text-[20px] font-bold">30</p>
          </div>
          <div>
            <p className="text-[12px] font-semibold text-cyan-300">Flood</p>
            <p className="text-[20px] font-bold">15</p>
          </div>
        </div>
      </div>

      <div className="mb-6 p-4 border border-white/[0.05] rounded">
        <h5 className="text-xs font-semibold text-slate-400 mb-3">
          Class Distribution
        </h5>
        <div>
          <p className="text-[10px] text-slate-500">Background (target=0): 30 samples ({calcPct(30, 45)}%)</p>
          <p className="text-[10px] text-slate-500">Flood (target=1): 15 samples ({calcPct(15, 45)}%)</p>
          <p className="mt-2 text-[9px] text-amber-300">Imbalance ratio: 2:1 (background:flood)</p>
        </div>
      </div>

      <div className="mb-6 p-4 border border-white/[0.05] rounded">
        <h5 className="text-xs font-semibold text-slate-400 mb-3">
          Evaluation Framework
        </h5>
        <ul className="list-disc list-inside text-[9px] text-slate-400">
          <li>
            Stratified validation required for imbalanced 30:15 distribution
          </li>
          <li>
            Preprocessing and feature selection must be fitted independently within
            training folds only. Never fit on entire dataset before cross-validation.
          </li>
          <li>
            Investigate spatial dependence and potential sample leakage. No duplicate
            physical samples should appear in both training and validation sets.
          </li>
          <li>
            Compare against majority-class baseline (always predict background).
          </li>
          <li>
            Report class-specific precision, recall, F1-score and accuracy (not just
            overall accuracy).
          </li>
          <li>
            Small sample size (n=45) limits generalization. Results not statistically
            generalizable.
          </li>
        </ul>
      </div>

      <div>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="mt-3 text-[9px] text-cyan-300 hover:underline"
        >
          {showDetails ? "Hide scientific constraints" : "Show scientific constraints"}
        </button>
      </div>
    </div>
  );

  function calcPct(part: number, total: number): string {
    return Math.round((part / total) * 100).toString();
  }
}