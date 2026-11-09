"use client";

import { useState } from "react";

export default function FeatureImportanceSection() {
  const [showImportance, setShowImportance] = useState(false);

  // No actual model training or feature importance data exists in repository.
  // Feature importance must be generated from trained models with proper validation.
  const importanceNote = (
    <div>
      <p className="text-[9px] text-amber-300 mb-3">
        No feature importance data available in repository. Feature importance rankings
        must be generated from trained models using proper validation workflows.
        Important: Feature importance should be calculated within cross-validation folds,
        not on the entire dataset before validation.
      </p>
      <p className="text-[9px] text-slate-500">
        For tree-based models (Random Forest, XGBoost):
      </p>
      <ul className="list-disc list-inside text-[9px] text-slate-400">
        <li>Mean decrease in impurity or permutation importance within CV folds</li>
        <li>Rank features by importance score</li>
        <li>Assess feature stability across folds</li>
      </ul>
      <p className="text-[9px] text-slate-500">
        For linear models (Logistic Regression):
      </p>
      <ul className="list-disc list-inside text-[9px] text-slate-400">
        <li>Coefficient magnitudes (with proper scaling and within-fold fitting)</li>
        <li>Statistical significance assessment</li>
      </ul>
      <p className="text-[9px] text-slate-500">
        Critical constraints for n=45 (30 background, 15 flood):
      </p>
      <ul className="list-disc list-inside text-[9px] text-slate-400 mt-2">
        <li>Small sample size limits reliability of feature importance rankings</li>
        <li>Permutation importance may be biased with imbalanced classes</li>
        <li>Feature selection must be within training folds only</li>
        <li>Results may not generalize to independent datasets</li>
      </ul>
    </div>
  );

  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="rounded-xl border border-white/[0.07] bg-[#101a29] p-6">
      <div className="mb-6">
        <h4 className="text-sm font-semibold mb-3">
          Feature Importance
        </h4>
        <p className="text-[10px] text-slate-500">
          Feature importance rankings for flood classification models. Must be generated
          from trained models with proper cross-validation. No feature importance scores
          are claimed or fabricated in this application.
        </p>
      </div>

      {showImportance ? (
        <div>
          <h5 className="text-xs font-semibold text-cyan-300 mb-3">
            Feature Importance (from trained models with CV)
          </h5>
          <div>
            <p className="text-[9px] text-amber-300 mb-3">
              Placeholder: Feature importance rankings will appear here once models
              are trained with proper cross-validation workflows. Importance scores
              should be calculated within training folds only.
            </p>
            <div className="h-[140px] border border-white/[0.05] rounded bg-[#0b1321]">
              <p className="text-[9px] text-slate-500 text-center pt-40">
                Feature importance rankings appear here once models are trained and
                evaluated with proper validation. For Random Forest/XGBoost: mean decrease
                in impurity or permutation importance across CV folds. For Logistic
                Regression: coefficient magnitudes with proper scaling.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowImportance(!showImportance)}
          className="flex items-center gap-2 text-[9px] text-cyan-300 hover:underline"
        >
          <span className="h-2 w-2 rounded-full bg-cyan-300" />
          Show feature importance (unverified - requires trained models)
        </button>
      )}

      {showImportance === false && (
        <p className="mt-3 text-[9px] text-amber-300">
          No feature importance data found in repository. Feature importance must be
          generated from trained models using cross-validation within folds only. For
          the imbalanced 30:15 dataset (n=45), importance rankings are unreliable
          without proper validation and may not generalize.
        </p>
      )}
      {showImportance && (
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="mt-3 text-[9px] text-cyan-300 float-right"
        >
          Hide details
        </button>
      )}
    </div>
  );
}