"use client";

import { useState } from "react";

export default function ConfusionMatrixSection() {
  const [showMatrices, setShowMatrices] = useState(false);

  // Placeholder - no actual confusion matrices exist in repository
  // All matrices would need to be generated from actual model evaluation outputs
  const modelNames = ["Random Forest", "Support Vector Machine", "Logistic Regression", "XGBoost", "MLP"];

  return (
    <div className="rounded-xl border border-white/[0.07] bg-[#101a29] p-6">
      <div className="mb-6">
        <h4 className="text-sm font-semibold mb-3">
          Confusion Matrices
        </h4>
        <p className="text-[10px] text-slate-500">
          Per-model confusion matrices for flood classification. Must be calculated from
          actual model predictions on independent test sets.
        </p>
      </div>

      {showMatrices ? (
        <div>
          <h5 className="text-xs font-semibold text-cyan-300 mb-3">
            Confusion Matrices (Generated from Actual Evaluation Outputs)
          </h5>
          {modelNames.map((model, idx) => (
            <div key={model} className="mb-4 rounded-xl border border-white/[0.05] bg-white/[0.02] p-4">
              <p className="text-xs font-semibold text-slate-100 mb-2">
                {model}
              </p>
              <p className="text-[9px] text-amber-300 mb-2">
                <strong>Note:</strong> Confusion matrix must be calculated from actual
                model predictions. Placeholder not displayed until evaluation outputs
                are available.
              </p>
              <div className="h-48 border opacity-10 rounded bg-slate-950">
                Confusion matrix will appear here once evaluation outputs are available.
              </div>
            </div>
          ))}
        </div>
      ) : (
        <button
          onClick={() => setShowMatrices(!showMatrices)}
          className="flex items-center gap-2 text-[10px] text-cyan-300 hover:underline"
        >
          <span className="h-2 w-2 rounded-full bg-cyan-300" />
          Show confusion matrices (unverified - requires evaluation outputs)
        </button>
      )}

      {!showMatrices && showMatrices !== undefined && <p className="text-[9px] text-amber-300 mt-3">
        No confusion matrices available in repository. Confusion matrices must be generated
        from actual model evaluation outputs using test set predictions. Each matrix should
        show True Positives, True Negatives, False Positives, False Negatives for the
        flood (positive) class against background (negative) class. Metrics derived from
        these matrices (precision, recall, F1-score) must be calculated from actual
        predictions, not invented.
      </p>}
    </div>
  );
}