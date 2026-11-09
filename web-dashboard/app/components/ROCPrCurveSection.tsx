"use client";

import { useState } from "react";

export default function ROCPrCurveSection() {
  const [showCurves, setShowCurves] = useState(false);

  // No actual prediction probabilities or valid labels exist in repository.
  // ROC and PR curves must be generated from actual model score outputs.
  const curveNote = (
    <div>
      <p className="text-[9px] text-amber-300 mb-3">
        No ROC or Precision-Recall curves available in repository. Curves must be
        generated from actual model prediction probabilities on independent test sets.
        AUC values and curve plots are not claimed or fabricated.
      </p>
      <p className="text-[9px] text-slate-500">
        Required inputs for curve generation:
      </p>
      <ul className="list-disc list-inside text-[9px] text-slate-400">
        <li>Predicted probability scores for the positive (flood) class</li>
        <li>True binary labels for the test set</li>
        <li>No duplicate samples between training and test sets</li>
        <li>Preprocessing fitted only within training folds</li>
      </ul>
    </div>
  );

  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="rounded-xl border border-white/[0.07] bg-[#101a29] p-6">
      <div className="mb-6">
        <h4 className="text-sm font-semibold mb-3">
          ROC & Precision-Recall Curves
        </h4>
        <p className="text-[10px] text-slate-500">
          ROC (Receiver Operating Characteristic) and Precision-Recall curves for flood
          classification. AUC values and curve plots must be generated from actual model
          prediction probabilities on independent test sets.
        </p>
      </div>

      {showCurves ? (
        <div>
          <h5 className="text-xs font-semibold text-cyan-300 mb-3">
            Curves from Actual Prediction Probabilities
          </h5>
          <div>
            <p className="text-[9px] text-amber-300 mb-3">
              Placeholder: ROC and PR curves will appear here once actual model prediction
              probabilities are available on independent test sets.
            </p>
            <div className="h-[180px] border border-white/[0.05] rounded bg-[#0b1321]">
              <p className="text-[9px] text-slate-500 text-center pt-50">
                ROC curve (TPR vs FPR) and PR curve (Precision vs Recall) will appear
                here once evaluation outputs are available. AUC values must be calculated
                from actual predictions, not invented.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowCurves(!showCurves)}
          className="flex items-center gap-2 text-[10px] text-cyan-300 hover:underline"
        >
          <span className="h-2 w-2 rounded-full bg-cyan-300" />
          Show ROC & PR curves (unverified - requires prediction probabilities)
        </button>
      )}

      {showCurves === false && showCurves !== undefined && curveNote}
      {showCurves && (
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="mt-3 text-[9px] text-cyan-300 hover:underline float-right"
        >
          Hide details
        </button>
      )}
    </div>
  );
}