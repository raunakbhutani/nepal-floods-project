"use client";

import { useState } from "react";

export default function PerformanceMetrics() {
  const [showResults, setShowResults] = useState(false);

  const baselineMetrics = {
    model: "Majority-Class Baseline",
    accuracy: "N/A (requires evaluation)",
    precision: "N/A",
    recall: "N/A",
    f1: "N/A",
    note: `Baseline: always predict the majority class (background). Accuracy = proportion of majority class in test set. Must be calculated from actual evaluation outputs.`,
  };

  const modelDescriptions = {
    rf: `Random Forest – Not trained. If trained on n=45 with 30/15 split, expected variance high. Class-weighted RF may improve recall for flood class.`,
    svm: `Support Vector Machine – Not trained. Requires feature scaling within CV folds. RBF kernel with small sample size may overfit. Class weights recommended.`,
    lr: `Logistic Regression – Not trained. Baseline model. Should outperform majority-class baseline if features have any signal. Calibration required for probabilities.`,
    xgb: `XGBoost – Not trained. Tree-based method. Small dataset (n=45) limits boosting effectiveness. May overfit with too many trees.`,
    mlp: `MLP / Deep Learning – Not trained. Small dataset limits deep learning effectiveness. Requires PyTorch/TensorFlow. Small dataset limits effectiveness.`,
  };

  return (
    <div className="rounded-xl border border-white/[0.07] bg-[#101a29] p-6">
      <div className="mb-6">
        <h4 className="text-sm font-semibold mb-3">
          Model Performance Metrics
        </h4>
        <p className="text-[10px] text-slate-500">
          Model evaluation results. All metrics must be calculated from actual evaluation
          outputs. No model scores are claimed or fabricated in this application. The
          following placeholder represents a majority-class baseline that must be compared
          against any trained model results.
        </p>
      </div>

      <div className="mb-6 p-4 border border-white/[0.05] rounded">
        <h5 className="text-xs font-semibold text-slate-400 mb-3">
          Majority-Class Baseline (must be compared against any trained model)
        </h5>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="text-[12px] font-semibold text-cyan-300">Accuracy</p>
            <p className="text-[20px] font-bold">{baselineMetrics.accuracy}</p>
          </div>
          <div>
            <p className="text-[12px] font-semibold text-cyan-300">Precision</p>
            <p className="text-[20px] font-bold">{baselineMetrics.precision}</p>
          </div>
          <div>
            <p className="text-[12px] font-semibold text-cyan-300">Recall</p>
            <p className="text-[20px] font-bold">{baselineMetrics.recall}</p>
          </div>
          <div>
            <p className="text-[12px] font-semibold text-cyan-300">F1-score</p>
            <p className="text-[20px] font-bold">{baselineMetrics.f1}</p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <button
          onClick={() => setShowResults(!showResults)}
          className="flex items-center gap-2 text-[10px] text-cyan-300 hover:underline"
        >
          <span className="h-2 w-2 rounded-full bg-cyan-300" />
          Show model descriptions and scientific constraints
        </button>
      </div>

      {showResults && (
        <div>
          <h5 className="text-xs font-semibold text-cyan-300 mb-4">
            Model Descriptions (Not Trained – Reference Only)
          </h5>
          <div className="space-y-3">
            {Object.entries(modelDescriptions).map(
              ([key, desc]) => (
                <div key={key} className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-3">
                  <p className="font-medium text-slate-100">{key.toUpperCase()}:</p>
                  <p className="text-[9px] text-slate-400">{desc}</p>
                </div>
              )
            )}
          </div>
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-white/[0.05]">
        <p className="text-[9px] text-slate-500">
          Scientific Requirements Checklist:
        </p>
        <ul className="list-disc list-inside text-[9px] text-slate-400 space-y-1">
          <li>
            Stratified validation used (appropriate for imbalanced 30:15 distribution)
          </li>
          <li>
            Scaling/feature selection fit only within training folds – not entire dataset
          </li>
          <li>
            Spatial dependence investigated – no sample leakage between train/test splits
          </li>
          <li>
            Class-specific precision, recall and F1-score reported (not just overall accuracy)
          </li>
          <li>
            Comparison against majority-class baseline performed
          </li>
          <li>
            Small sample size (n=45) limitations explicitly stated
          </li>
          <li>
            Model confidence not described as calibrated probability without calibration
            testing
          </li>
          <li>
            Results exploratory only – independent replication with expanded sample size
            required before any scientific claims
          </li>
        </ul>
      </div>
    </div>
  );
}