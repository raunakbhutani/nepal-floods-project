"use client";

import { useState } from "react";

export default function ModelConfig() {
  const [selectedModel, setSelectedModel] = useState("rf");

  const models = [
    { key: "rf", name: "Random Forest", library: "scikit-learn", params: "n_estimators=100, max_depth=None", note: "Default RF with 100 trees. Small dataset (n=45) limits optimal tuning." },
    { key: "svm", name: "Support Vector Machine", library: "scikit-learn", params: "C=1.0, kernel='rbf'", note: "SVM with RBF kernel. Requires feature scaling within CV folds. Sensitive to class imbalance." },
    { key: "lr", name: "Logistic Regression", library: "scikit-learn", params: "C=1.0, max_iter=1000", note: "Logistic regression with L2 regularization. Baseline model for comparison." },
    { key: "xgb", name: "XGBoost", library: "xgboost", params: "n_estimators=100, max_depth=3", note: "XGBoost if installed. Tree-based method. Requires Python environment." },
    { key: "mlp", name: "MLP / Deep Learning", library: "scikit-learn / torch", params: "hidden_layer_sizes=(50,), max_iter=1000", note: "Multilayer perceptron. Small dataset limits deep learning effectiveness. Requires PyTorch/TensorFlow." },
  ];

  const handleModelChange = (key: string) => setSelectedModel(key);

  return (
    <div className="rounded-xl border border-white/[0.07] bg-[#101a29] p-6">
      <div className="mb-6">
        <h4 className="text-sm font-semibold mb-3">
          Model Configuration
        </h4>
        <p className="text-[10px] text-slate-500">
          Model configuration interfaces for flood classification. Model training should
          be conducted in a Python environment, not inside the Next.js browser. The
          following models are described for configuration reference only. No models
          have been trained or evaluated in this application.
        </p>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {["Random Forest", "SVM", "Logistic Regression", "XGBoost", "MLP"].map((model) => (
          <button
            key={model}
            onClick={() => setSelectedModel(model)}
            className={`px-3 py-1.5 text-[10px] rounded border border-white/[0.15] transition ${selectedModel === model ? "bg-cyan-400/10 text-cyan-300" : "text-slate-400 hover:bg-white/[0.04]"}`}
          >
            {model}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {models.map((model) => (
          <div key={model.key} className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-4">
            <h5 className="text-xs font-semibold text-cyan-300 mb-3">
              {model.key === "rf"
                ? "Random Forest"
                : model.key === "svm"
                  ? "Support Vector Machine"
                  : model.key === "lr"
                    ? "Logistic Regression"
                    : model.key === "xgb"
                      ? "XGBoost"
                      : "MLP / Deep Learning"
              }
            </h5>
            <p className="text-[9px] text-slate-400 mb-3">
              {model.library}
            </p>
            <p className="text-[9px] text-slate-400 mb-3">
              Parameters: {model.params}
            </p>
            <p className="text-[9px] text-amber-300 mb-3">
              {model.note}
            </p>
            <details className="text-[9px] text-slate-400">
              <summary>Implementation Notes</summary>
              <ul>
                <li>Use stratified k-fold cross-validation (k=5 or k=10)</li>
                <li>Fit scalers and feature selectors within training folds only</li>
                <li>Investigate spatial dependence and sample leakage</li>
                <li>Compare against baseline: majority-class classifier</li>
                <li>Report class-specific precision, recall, F1-score and accuracy</li>
                <li>Do not claim 100% accuracy without independent verification</li>
                <li>Do not describe probability without calibration testing</li>
              </ul>
            </details>
          </div>
        ))}
      </div>

      <div>
        <p className="text-[9px] text-slate-500">
          Workflow: Prepare data (s1_features.csv + Sentinel-2 CSV) → Python script with
          train/test split using stratified shuffle split → Scale within training fold →
          Train model → Evaluate on held-out test set → Report metrics. Never fit
          preprocessing on entire dataset. Never use same sample in train and test.
        </p>
        <p className="mt-3 text-[9px] text-slate-500">
          Sample size: 45 points (30 background, 15 flood). Any model performance
          reported from this dataset is exploratory only and requires independent
          replication with expanded sample size before any scientific claims.
        </p>
      </div>
    </div>
  );
}