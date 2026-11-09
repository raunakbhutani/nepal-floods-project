from __future__ import annotations

import json

import joblib
import numpy as np
import pandas as pd
from sklearn.base import clone
from sklearn.cluster import KMeans
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import (
    accuracy_score,
    confusion_matrix,
    f1_score,
    precision_score,
    recall_score,
    roc_auc_score,
)
from sklearn.model_selection import GroupKFold, StratifiedKFold, train_test_split
from sklearn.neural_network import MLPClassifier
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVC

from .config import MODELS, PUBLIC_DATA, S1_CSV, STUDY


META_COLS = ["Name", "X", "Y", "Lon", "Lat", "target"]


def _safe_auc(y_true, y_score) -> float | None:
    if y_score is None or len(np.unique(y_true)) < 2:
        return None
    return float(roc_auc_score(y_true, y_score))


def _pack_scores(y_true, y_pred, y_score=None) -> dict:
    return {
        "accuracy": float(accuracy_score(y_true, y_pred)),
        "precision": float(precision_score(y_true, y_pred, zero_division=0)),
        "recall": float(recall_score(y_true, y_pred, zero_division=0)),
        "f1": float(f1_score(y_true, y_pred, zero_division=0)),
        "roc_auc": _safe_auc(y_true, y_score),
        "confusion_matrix": confusion_matrix(y_true, y_pred, labels=[0, 1]).tolist(),
        "n": int(len(y_true)),
        "n_flood": int(np.sum(y_true == 1)),
        "n_background": int(np.sum(y_true == 0)),
    }


def _summarise_folds(folds: list[dict]) -> dict:
    if not folds:
        return {"folds": [], "mean_f1": None, "std_f1": None, "mean_accuracy": None}
    f1s = [f["f1"] for f in folds]
    accs = [f["accuracy"] for f in folds]
    return {
        "folds": folds,
        "mean_f1": float(np.mean(f1s)),
        "std_f1": float(np.std(f1s)),
        "mean_accuracy": float(np.mean(accs)),
        "std_accuracy": float(np.std(accs)),
    }


def _predict_score(model, X):
    if hasattr(model, "predict_proba"):
        return model.predict_proba(X)[:, 1]
    if hasattr(model, "decision_function"):
        return model.decision_function(X)
    return None


def _cv_evaluate(estimator, X, y, groups, n_splits=5) -> dict:
    stratified = []
    skf = StratifiedKFold(n_splits=n_splits, shuffle=True, random_state=42)
    for train_idx, test_idx in skf.split(X, y):
        model = clone(estimator)
        model.fit(X[train_idx], y[train_idx])
        pred = model.predict(X[test_idx])
        stratified.append(_pack_scores(y[test_idx], pred, _predict_score(model, X[test_idx])))

    spatial = []
    n_splits_g = min(n_splits, len(np.unique(groups)))
    gkf = GroupKFold(n_splits=n_splits_g)
    for train_idx, test_idx in gkf.split(X, y, groups):
        if len(np.unique(y[train_idx])) < 2:
            continue
        model = clone(estimator)
        model.fit(X[train_idx], y[train_idx])
        pred = model.predict(X[test_idx])
        spatial.append(_pack_scores(y[test_idx], pred, _predict_score(model, X[test_idx])))

    return {
        "stratified_kfold": _summarise_folds(stratified),
        "spatial_group_kfold": _summarise_folds(spatial),
    }


def _estimators() -> dict:
    rf = RandomForestClassifier(
        n_estimators=200,
        min_samples_leaf=2,
        class_weight="balanced",
        random_state=42,
        n_jobs=1,
    )
    svm = Pipeline(
        [
            ("scaler", StandardScaler()),
            (
                "clf",
                SVC(
                    kernel="rbf",
                    C=1.0,
                    class_weight="balanced",
                    probability=True,
                    random_state=42,
                ),
            ),
        ]
    )
    mlp = Pipeline(
        [
            ("scaler", StandardScaler()),
            (
                "clf",
                MLPClassifier(
                    hidden_layer_sizes=(32, 16),
                    alpha=0.05,
                    max_iter=1200,
                    early_stopping=True,
                    validation_fraction=0.25,
                    random_state=42,
                ),
            ),
        ]
    )
    logreg = Pipeline(
        [
            ("scaler", StandardScaler()),
            (
                "clf",
                LogisticRegression(class_weight="balanced", max_iter=500, random_state=42),
            ),
        ]
    )
    return {
        "random_forest": rf,
        "svm_rbf": svm,
        "mlp": mlp,
        "logistic_regression": logreg,
    }


def train_and_export() -> dict:
    MODELS.mkdir(parents=True, exist_ok=True)
    PUBLIC_DATA.mkdir(parents=True, exist_ok=True)

    df = pd.read_csv(S1_CSV)
    feature_cols = [c for c in df.columns if c not in META_COLS]
    X = df[feature_cols].to_numpy(dtype=np.float32)
    y = df["target"].to_numpy(dtype=np.int32)
    coords = df[["Lon", "Lat"]].to_numpy(dtype=np.float64)
    groups = KMeans(n_clusters=5, random_state=42, n_init=10).fit_predict(coords)

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.33, stratify=y, random_state=42
    )

    majority_pred = np.zeros_like(y_test)
    majority_holdout = _pack_scores(y_test, majority_pred)

    results = {
        "status": "trained_on_sentinel1_only",
        "disclaimer": (
            "This separate pipeline run uses 18 Sentinel-1 stack bands only; it does "
            "not use the currently published seven Sentinel-2 change features. The "
            "previous 100% notebook scores are not used. Metrics remain exploratory "
            "because flood and background pins are spatially clustered."
        ),
        "dataset": {
            "path": S1_CSV.name,
            "n_samples": int(len(df)),
            "n_flood": int((y == 1).sum()),
            "n_background": int((y == 0).sum()),
            "n_features": int(X.shape[1]),
            "feature_names": feature_cols,
            "holdout_n_train": int(len(y_train)),
            "holdout_n_test": int(len(y_test)),
        },
        "study": STUDY,
        "majority_class_baseline_holdout": majority_holdout,
        "models": {},
        "limitations": [
            "45 labelled samples is too small for a high-dimensional classifier to generalise.",
            "Flood pins follow the river; background pins sit on adjacent slopes.",
            "Random stratified CV overestimates skill because neighbouring pixels are dependent.",
            "Scaler and hyperparameters were not nested-cross-validated.",
            "No independent flood-extent polygon was available for map validation.",
            "scikit-learn MLP has no dropout; L2 regularisation and early stopping are used.",
        ],
    }

    for name, est in _estimators().items():
        holdout_model = clone(est)
        holdout_model.fit(X_train, y_train)
        pred = holdout_model.predict(X_test)
        holdout = _pack_scores(y_test, pred, _predict_score(holdout_model, X_test))
        cv = _cv_evaluate(est, X, y, groups)
        results["models"][name] = {"holdout": holdout, "cross_validation": cv}
        joblib.dump({"model": holdout_model, "feature_names": feature_cols}, MODELS / f"{name}.joblib")

        full_model = clone(est)
        full_model.fit(X, y)
        joblib.dump({"model": full_model, "feature_names": feature_cols}, MODELS / f"{name}_full.joblib")

        if name == "random_forest":
            importances = full_model.feature_importances_
            order = np.argsort(importances)[::-1]
            results["random_forest_feature_importance"] = [
                {"feature": feature_cols[i], "importance": float(importances[i])}
                for i in order
            ]

    geojson = {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "geometry": {"type": "Point", "coordinates": [float(row.Lon), float(row.Lat)]},
                "properties": {
                    "name": row.Name,
                    "lon": float(row.Lon),
                    "lat": float(row.Lat),
                    "x": float(row.X),
                    "y": float(row.Y),
                    "target": int(row.target),
                    "label": "flood" if int(row.target) == 1 else "background",
                },
            }
            for row in df.itertuples()
        ],
    }
    (PUBLIC_DATA / "pins.geojson").write_text(json.dumps(geojson))
    (MODELS / "model_results.json").write_text(json.dumps(results, indent=2))
    return results


if __name__ == "__main__":
    train_and_export()
