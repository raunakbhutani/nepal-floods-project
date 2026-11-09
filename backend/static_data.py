from __future__ import annotations

import json
import re
from pathlib import Path

import pandas as pd

ROOT = Path(__file__).resolve().parents[1]
PUBLIC_DATA = ROOT / "web-dashboard" / "public" / "data"
WEB = ROOT / "web-dashboard"

META_S1 = {"Name", "X", "Y", "Lon", "Lat", "target"}
META_S2 = {"point_id", "class", "longitude", "latitude"}

S2_DATE_LABELS = {
    "MAY04": "2026-05-04",
    "JUN08": "2026-06-08",
    "JUL23": "2026-07-23",
    "AUG12": "2026-08-12",
    "AUG24": "2026-08-24",
    "AUG27": "2026-08-27",
    "SEP06": "2026-09-06",
    "SEP21": "2026-09-21",
    "OCT06": "2026-10-06",
}


def first_existing(*candidates: Path) -> Path | None:
    for path in candidates:
        if path.exists():
            return path
    return None


def model_results_path() -> Path:
    path = ROOT / "model_results.json"
    if not path.is_file():
        raise FileNotFoundError(f"{path} not found")
    return path


def s1_path() -> Path:
    path = first_existing(ROOT / "s1_features.csv", WEB / "s1_features.csv")
    if path is None:
        raise FileNotFoundError("s1_features.csv not found")
    return path


def s2_path() -> Path | None:
    path = ROOT / "s2_features.csv"
    return path if path.is_file() else None


def load_model_results() -> dict:
    path = model_results_path()
    raw = json.loads(path.read_text())
    return {
        "source_file": str(path.relative_to(ROOT)),
        "served_statically": True,
        "raw": raw,
        "dashboard": _dashboard_view(raw),
    }


def _dashboard_view(raw: dict) -> dict:
    if "dataset_stats" in raw and isinstance(raw.get("models"), dict):
        stats = raw["dataset_stats"]
        cards = []
        for name, block in raw["models"].items():
            if not isinstance(block, dict):
                continue
            cards.append(
                {
                    "name": name,
                    "accuracy": _num(block.get("accuracy")),
                    "accuracy_std": _num(block.get("accuracy_std")),
                    "f1": _num(block.get("f1_score", block.get("f1"))),
                    "f1_std": _num(block.get("f1_std")),
                    "cv_scores": block.get("cv_scores") or [],
                    "cv_mean": _num(block.get("cv_mean")),
                    "cv_std": _num(block.get("cv_std")),
                    "avg_confidence": _num(block.get("avg_confidence")),
                    "min_confidence": _num(block.get("min_confidence")),
                }
            )
        return {
            "schema": "notebook",
            "project_title": raw.get("project_title"),
            "fusion_sources": raw.get("fusion_sources") or [],
            "key_conclusion": raw.get("key_conclusion"),
            "features": raw.get("features"),
            "validation": raw.get("validation"),
            "dataset": {
                "n_samples": stats.get("total_samples"),
                "n_background": stats.get("background_pins"),
                "n_flood": stats.get("flood_pins"),
                "n_features": stats.get("total_features"),
                "sentinel1_features": stats.get("sentinel1_features", 0),
                "sentinel2_features": stats.get("sentinel2_features", 0),
            },
            "models": cards,
            "feature_importance": raw.get("random_forest_feature_importance")
            or raw.get("feature_importance")
            or [],
        }

    # Pipeline-style nested holdout schema
    models = raw.get("models") or {}
    cards = []
    for name, block in models.items():
        hold = (block or {}).get("holdout") or {}
        cv = ((block or {}).get("cross_validation") or {}).get("stratified_kfold") or {}
        cards.append(
            {
                "name": name,
                "accuracy": _num(hold.get("accuracy")),
                "f1": _num(hold.get("f1")),
                "cv_scores": [f.get("f1") for f in cv.get("folds") or []],
                "cv_mean": _num(cv.get("mean_f1")),
                "cv_std": _num(cv.get("std_f1")),
                "avg_confidence": None,
                "min_confidence": None,
            }
        )
    ds = raw.get("dataset") or {}
    return {
        "schema": "pipeline",
        "project_title": raw.get("project_title"),
        "fusion_sources": raw.get("fusion_sources") or [],
        "key_conclusion": raw.get("disclaimer") or raw.get("key_conclusion"),
        "dataset": {
            "n_samples": ds.get("n_samples"),
            "n_background": ds.get("n_background"),
            "n_flood": ds.get("n_flood"),
            "n_features": ds.get("n_features"),
        },
        "models": cards,
        "feature_importance": raw.get("random_forest_feature_importance") or [],
        "majority_class_baseline_holdout": raw.get("majority_class_baseline_holdout"),
        "limitations": raw.get("limitations") or [],
        "raw_models": models,
    }


def _num(value):
    if value is None:
        return None
    return float(value)


def load_s1() -> pd.DataFrame:
    return pd.read_csv(s1_path())


def load_s2() -> pd.DataFrame | None:
    path = s2_path()
    if path is None:
        return None
    return pd.read_csv(path)


def pins_geojson() -> dict:
    s1 = load_s1()
    s2 = load_s2()
    s2_by_id = {}
    if s2 is not None:
        for row in s2.itertuples(index=False):
            s2_by_id[str(row.point_id)] = row

    features = []
    for row in s1.itertuples(index=False):
        name = str(row.Name)
        target = int(row.target)
        lon, lat = float(row.Lon), float(row.Lat)
        optical = s2_by_id.get(name)
        features.append(
            {
                "type": "Feature",
                "geometry": {"type": "Point", "coordinates": [lon, lat]},
                "properties": {
                    "name": name,
                    "lon": lon,
                    "lat": lat,
                    "x": float(row.X),
                    "y": float(row.Y),
                    "target": target,
                    "label": "flood" if target == 1 else "background",
                    "has_sentinel2": optical is not None,
                },
            }
        )
    return {"type": "FeatureCollection", "features": features}


def s2_index_series() -> dict:
    s2 = load_s2()
    if s2 is None:
        return {"status": "missing", "dates": []}

    prefixes = []
    for col in s2.columns:
        match = re.match(r"^([A-Z]{3}\d{2})_B03$", col)
        if match:
            prefixes.append(match.group(1))

    dates = []
    for prefix in prefixes:
        green, nir, swir = f"{prefix}_B03", f"{prefix}_B08", f"{prefix}_B11"
        if green not in s2.columns or nir not in s2.columns:
            continue
        ndwi = (s2[green] - s2[nir]) / (s2[green] + s2[nir] + 1e-6)
        mndwi = None
        if swir in s2.columns:
            mndwi = (s2[green] - s2[swir]) / (s2[green] + s2[swir] + 1e-6)
        flood = s2["class"].str.lower() == "flood"
        bg = ~flood
        dates.append(
            {
                "date_key": prefix,
                "date": S2_DATE_LABELS.get(prefix, prefix),
                "ndwi_flood_mean": float(ndwi[flood].mean()),
                "ndwi_background_mean": float(ndwi[bg].mean()),
                "mndwi_flood_mean": float(mndwi[flood].mean()) if mndwi is not None else None,
                "mndwi_background_mean": float(mndwi[bg].mean()) if mndwi is not None else None,
            }
        )
    return {
        "status": "ok",
        "source": str(s2_path().relative_to(ROOT)) if s2_path() else None,
        "n_samples": int(len(s2)),
        "n_optical_bands": int(len([c for c in s2.columns if c not in META_S2])),
        "dates": dates,
    }


def flood_stats() -> dict:
    static = {}
    path = PUBLIC_DATA / "flood_stats.json"
    if path.exists():
        static = json.loads(path.read_text())
    s2 = s2_index_series()
    static["sentinel2"] = {
        "status": "integrated_from_s2_features.csv" if s2.get("status") == "ok" else "not_integrated",
        "reason": "Pin-level Sentinel-2 reflectance from s2_features.csv. Scene-wide rasters are still not served.",
        "known_scenes": [
            {"date": d["date"], "cloud_full_scene_pct": None, "note": "Pin-sampled L2A reflectance"}
            for d in s2.get("dates") or []
        ],
        "pin_indices": s2,
    }
    return static


def nearest_pin_prediction(
    lon: float | None,
    lat: float | None,
    name: str | None,
    model: str,
) -> dict:
    s1 = load_s1()
    results = json.loads(model_results_path().read_text())
    model_results = results.get("models") or {}
    model_result = model_results.get(model)
    if not isinstance(model_result, dict):
        raise ValueError(f"Unknown model: {model}")
    published = model_result.get("avg_confidence")

    if name:
        match = s1[s1["Name"].astype(str) == str(name)]
        if match.empty:
            raise KeyError(name)
        row = match.iloc[0]
    else:
        if lon is None or lat is None:
            raise ValueError("lon/lat or name is required")
        dist = (s1["Lon"] - lon) ** 2 + (s1["Lat"] - lat) ** 2
        row = s1.iloc[int(dist.idxmin())]

    target = int(row["target"])
    return {
        "name": str(row["Name"]),
        "lon": float(row["Lon"]),
        "lat": float(row["Lat"]),
        "class": target,
        "label": "flood" if target == 1 else "background",
        "method": "nearest_labelled_pin",
        "model": model,
        "published_confidence": published,
        "note": "Lookup against labelled pins plus published notebook confidence when available. No model is trained at request time.",
    }
