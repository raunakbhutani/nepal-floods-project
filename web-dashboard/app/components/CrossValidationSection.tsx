"use client";

import { useState } from "react";

export default function CrossValidationSection() {
  const [showResults, setShowResults] = useState(false);

  // No actual cross-validation results exist in repository.
  // All fold-level scores, mean and std must be traced to actual evaluation outputs.
  const cvPlaceholder = {
    model: "Not available – requires actual CV outputs",
    folds: 5,
    foldScores: Array(5).fill("TBA – calculate from CV folds"),
    meanScore: "TBA – mean of fold scores",
    stdScore: "TBA – standard deviation of fold scores",
    note:
      "Cross-validation results must be traced to actual evaluation outputs. "
      + "Do not describe CV as independent external validation. "
      + "Small sample size (n=45) limits generalizability. "
      + "Stratified k-fold recommended for imbalanced 30:15 distribution.",
  };

  const baselineNote = (
    <p className="text-[9px] text-amber-300 mt-3">
      Baseline: majority-class classifier evaluated via same stratified CV framework.
      Do not describe CV performance as independent external validation.
    </p>
  );

  const [showResultsUI, setShowResultsUI] = useState(false);

  return (
    <div className="rounded-xl border border-white/[0.07] bg-[#101a29] p-6">
      <div className="mb-6">
        <h4 className="text-sm font-semibold mb-3">
          Cross-Validation Results
        </h4>
        <p className="text-[10px] text-slate-500">
          Cross-validation fold-level scores, mean and standard deviation. All metrics
          must be traced to actual evaluation outputs from stratified k-fold validation.
        </p>
      </div>

      {showResults ? (
        <div>
          <h5 className="text-xs font-semibold text-cyan-300 mb-3">
            Cross-Validation Results (from Actual Outputs)
          </h5>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-[10px] font-semibold text-cyan-300">Model</p>
              <p className="text-[12px]">{cvPlaceholder.model}</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-cyan-300">Folds</p>
              <p className="text-[12px]">{cvPlaceholder.folds}</p>
            </div>
          </div>
          <div className="mt-3">
            <p className="text-[9px] text-slate-500">Fold-level scores:</p>
            <p className="text-[9px] text-cyan-300 mt-1">{cvPlaceholder.foldScores.join(", ")}</p>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div>
              <p className="text-[9px] font-semibold text-cyan-300">Mean</p>
              <p className="text-[12px]">{cvPlaceholder.meanScore}</p>
            </div>
            <div>
              <p className="text-[9px] font-semibold text-cyan-300">Std Dev</p>
              <p className="text-[12px]">{cvPlaceholder.stdScore}</p>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowResultsUI(!showResults)}
          className="flex items-center gap-2 text-[9px] text-cyan-300 hover:underline"
        >
          <span className="h-2 w-2 rounded-full bg-cyan-300" />
          Show CV results (unverified - requires actual evaluation outputs)
        </button>
      )}

      {showResults === false && (
        <p className="mt-3 text-[9px] text-amber-300">
          No cross-validation results found in repository. All fold-level scores, mean
          and standard deviation must be calculated from actual model evaluation outputs
          using stratified k-fold validation (k=5 or k=10 recommended for n=45 with
          30:15 class imbalance). Do not describe CV as independent external validation.
        </p>
      )}
    </div>
  );
}