"use client";

import { useState } from "react";

export default function MetricsTableSection() {
  const [showMetrics, setShowMetrics] = useState(false);

  // No actual model evaluation outputs exist in repository.
  // All metrics must be traced to actual evaluation outputs.
  const placeholderMetrics = {
    model: "Not available – requires actual evaluation outputs",
    accuracy: "TBA – calculate from test set predictions",
    precision: "TBA – class-specific (flood class)",
    recall: "TBA – class-specific (flood class)",
    f1: "TBA – class-specific (flood class)",
    specificity: "TBA – TN / (TN + FP)",
  };

  const baselineMetrics = {
    model: "Majority-Class Baseline",
    accuracy: "TBA – proportion of majority class in test set",
    precision: "TBA",
    recall: "TBA – equals accuracy for majority-class baseline",
    f1: "TBA – equals accuracy for majority-class baseline",
    specificity: "TBA",
  };

  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="rounded-xl border border-white/[0.07] bg-[#101a29] p-6">
      <div className="mb-6">
        <h4 className="text-sm font-semibold mb-3">
          Performance Metrics
        </h4>
        <p className="text-[10px] text-slate-500">
          All model performance metrics must be traced to actual evaluation outputs.
          No model scores are claimed or fabricated in this application.
        </p>
      </div>

      <div className="mb-6 p-4 border border-white/[0.05] rounded">
        <h5 className="text-xs font-semibold text-slate-400 mb-3">
          Model Metrics (From Actual Evaluation Outputs)
        </h5>
        {showMetrics ? (
          <div>
            <h5 className="text-xs font-semibold text-cyan-300 mb-3">
              Trained Model Metrics (from actual outputs)
            </h5>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-[10px] font-semibold text-cyan-300">Model</p>
                <p className="text-[12x]">{placeholderMetrics.model}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold text-cyan-300">Accuracy</p>
                <p className="text-[12x]">{placeholderMetrics.accuracy}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <p className="text-[10px] font-semibold text-cyan-300">Precision</p>
                <p className="text-[12x]">{placeholderMetrics.precision}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold text-cyan-300">Recall</p>
                <p className="text-[12x]">{placeholderMetrics.recall}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold text-cyan-300">F1-score</p>
                <p className="text-[12x]">{placeholderMetrics.f1}</p>
              </div>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-cyan-300">Specificity</p>
              <p className="text-[12x]">{placeholderMetrics.specificity}</p>
            </div>
          </div>
        ) : (
          <div>
            <h5 className="text-xs font-semibold text-cyan-300 mb-3">
              Baseline Comparison
            </h5>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <p className="text-[10px] font-semibold text-cyan-300">Model</p>
                <p className="text-[12x]">{baselineMetrics.model}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold text-cyan-300">Accuracy</p>
                <p className="text-[12x]">{baselineMetrics.accuracy}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold text-cyan-300">Precision</p>
                <p className="text-[12x]">{baselineMetrics.precision}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <p className="text-[10px] font-semibold text-cyan-300">Recall</p>
                <p className="text-[12x]">{baselineMetrics.recall}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold text-cyan-300">F1-score</p>
                <p className="text-[12x]">{baselineMetrics.f1}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold text-cyan-300">Specificity</p>
                <p className="text-[12x]">{baselineMetrics.specificity}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={() => setShowMetrics(!showMetrics)}
        className="mt-3 flex items-center gap-2 text-[9px] text-cyan-300 hover:underline"
      >
        <span className="h-2 w-2 rounded-full bg-cyan-300" />
        Show metrics (note: unverified - requires actual evaluation outputs)
      </button>

      {showMetrics === false && (
        <p className="mt-3 text-[9px] text-amber-300">
          No model evaluation outputs found in repository. All metrics must be calculated
          from actual model predictions on independent test sets. Metrics include:
          accuracy, precision, recall, F1-score and specificity, with class-specific
          breakdowns for the imbalanced 30:15 (background:flood) dataset.
        </p>
      )}
    </div>
  );
}