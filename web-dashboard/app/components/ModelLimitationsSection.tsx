"use client";

import { useState } from "react";

export default function ModelLimitationsSection() {
  const [showLimitations, setShowLimitations] = useState(true);

  const limitations = [
    {
      title: "Small Sample Size (n=45)",
      text: `Only 45 sampled points available (30 background, 15 flood). Results are
exploratory only and not statistically generalizable. Independent replication with
expanded sample size required before any scientific claims.`,
    },
    {
      title: "Class Imbalance (2:1 Ratio)",
      text: `30 background vs 15 flood samples. Accuracy alone is misleading. Must
report class-specific precision, recall, F1-score. Majority-class baseline must
be compared against any trained model.`,
    },
    {
      title: "Spatial Dependence and Sample Leakage",
      text: `Samples from the same geographic area may not be independent. Must
investigate spatial dependence. No duplicate physical observations in both
training and validation sets. Spatial block CV may be required.`,
    },
    {
      title: "Preprocessing and Feature Selection Outside Folds",
      text: `Scaling, feature selection and preprocessing must be fitted independently
within training folds only. Never fit on entire dataset before cross-validation.
Data leakage inflates performance and invalidates results.`,
    },
    {
      title: "No Independent External Validation",
      text: `Do not describe cross-validation performance as independent external
validation. CV estimates are optimistic. Truly independent test set with
geographically distinct samples required for external validation.`,
    },
    {
      title: "No Probability Calibration",
      text: `Do not describe model confidence as calibrated probability without
calibration testing (e.g., Platt scaling, isotonic regression, cross-validation
ROC AUC calibration). Predicted probabilities from RF/SVM/MLP are scores, not
calibrated probabilities.`,
    },
    {
      title: "Model Selection on Full Dataset",
      text: `Do not perform feature selection or model hyperparameter tuning using the
entire dataset before cross-validation. Use pipeline with CV to avoid inflated
performance estimates.`,
    },
    {
      title: "Limited Spectral Features",
      text: `54 Sentinel-2 spectral features with only 45 samples. High-dimensional
feature space with limited samples risks overfitting. Dimensionality reduction
or regularization required. Feature selection within CV folds only.`,
    },
    {
      title: "Sentinel-1/Sentinel-2 Fusion Not Verified",
      text: `Sentinel-1 (VV/VH) and Sentinel-2 feature fusion results not verified in
repository. Multi-sensor integration requires careful calibration and
validation. Results from separate models do not constitute fusion.`,
    },
  ];

  return (
    <div className="rounded-xl border border-white/[0.07] bg-[#101a29] p-6">
      <div className="mb-6">
        <h4 className="text-sm font-semibold mb-3">
          Model Limitations
        </h4>
        <p className="text-[10px] text-slate-500">
          Scientific limitations must be explicitly stated. No model metrics are claimed
          or fabricated. All results require actual evaluation outputs and independent
          replication.
        </p>
      </div>

      {showLimitations ? (
        <div>
          <h5 className="text-xs font-semibold text-cyan-300 mb-3">
            Critical Scientific Limitations
          </h5>
          <div className="space-y-3">
            {limitations.map((lim, idx) => (
              <div key={idx} className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-3">
                <p className="font-medium text-slate-100 text-[9px]">{lim.title}:</p>
                <p className="text-[9px] text-slate-400">{lim.text}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowLimitations(!showLimitations)}
          className="flex items-center gap-2 text-[9px] text-cyan-300 hover:underline float-right"
        >
          <span className="h-2 w-2 rounded-full bg-cyan-300" />
          Hide limitations
        </button>
      )}

      <div className="mt-6 pt-4 border-t border-white/[0.05]">
        <p className="text-[9px] text-slate-500">
          Validation Requirements Checklist:
        </p>
        <ul className="list-disc list-inside text-[9px] text-slate-400 space-y-1">
          <li>Metrics traced to actual evaluation outputs (not invented)</li>
          <li>Stratified validation for imbalanced 30:15 distribution</li>
          <li>Preprocessing/feature selection within training folds only</li>
          <li>No sample leakage between train/test splits</li>
          <li>Class-specific precision, recall, F1-score reported</li>
          <li>Majority-class baseline compared against trained models</li>
          <li>Small sample size (n=45) limitations stated</li>
          <li>No probability calibration without testing</li>
          <li>CV not described as independent external validation</li>
          <li>Results exploratory only – independent replication required</li>
        </ul>
      </div>
    </div>
  );
}