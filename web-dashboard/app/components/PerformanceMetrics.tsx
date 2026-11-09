"use client";

import { useState } from "react";

export default function PerformanceMetrics() {
  const [showResults, setShowResults] = useState(false);

  const baselineMetrics = {
    model: "Majority-Class Baseline",
    accuracy: "TBA - calculate from actual evaluation outputs",
    precision: "TBA",
    recall: "TBA",
    f1: "TBA",
    note: "Baseline: always predict majority class (background).",
  };

  const modelDescriptions = {
    rf: "Random Forest – Not trained. Small dataset (n=45) limits optimal tuning.",
    svm: "SVM – Not trained. Requires feature scaling within CV folds.",
    lr: "Logistic Regression – Not trained. Baseline model.",
    xgb: "XGBoost – Not trained. Small dataset limits boosting effectiveness.",
    mlp: "MLP / Deep Learning – Not trained. Small dataset limits effectiveness.",
  };

  return (
    <div className="rounded-xl border border-white/[0.07] bg-[#101a29] p-6">
      <div className="mb-6">
        <h4 className="text-sm font-semibold mb-3">
          Model Performance Metrics
        </h4>
        <p className="text-[10px] text-slate-500">
          Model evaluation results. All metrics must be calculated from actual evaluation
          outputs. No model scores are claimed or fabricated in this application.
        </p>
      </div>

      <div className="mb-6 p-4 border border-white/[0.05] rounded">
        <h5 className="text-xs font-semibold text-slate-400 mb-3">
          Majority-Class Baseline
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
          Scientific Requirements:
        </p>
        <ul className="list-disc list-inside text-[9px] text-slate-400 space-y-1">
          <li>Stratified validation for imbalanced 30:15 distribution</li>
          <li>Scaling/feature selection within training folds only</li>
          <li>Spatial dependence investigated – no sample leakage</li>
          <li>Class-specific precision, recall, F1-score reported</li>
          <li>Comparison against majority-class baseline</li>
          <li>Small sample size (n=45) limitations stated</li>
          <li>Model confidence not described as calibrated probability</li>
          <li>Results exploratory only – independent replication required</li>
        </ul>
      </div>
    </div>
  );
}