from __future__ import annotations

from typing import Optional

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field

from static_data import (
    PUBLIC_DATA,
    flood_stats,
    load_model_results,
    load_s1,
    load_s2,
    model_results_path,
    nearest_pin_prediction,
    pins_geojson,
    s1_path,
    s2_path,
)

app = FastAPI(
    title="Nepal Flood 2026 API",
    version="1.1.0",
    description="Static research data provider. Does not train models on startup.",
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

if PUBLIC_DATA.exists():
    app.mount("/static", StaticFiles(directory=PUBLIC_DATA), name="static")


@app.get("/health")
def health():
    s2 = s2_path()
    return {
        "ok": True,
        "mode": "static",
        "trains_on_startup": False,
        "model_results": str(model_results_path()),
        "s1_features": str(s1_path()),
        "s2_features": str(s2) if s2 else None,
    }


@app.get("/models")
def models():
    try:
        return load_model_results()
    except FileNotFoundError as exc:
        raise HTTPException(404, str(exc)) from exc


@app.get("/pins")
def pins():
    try:
        return pins_geojson()
    except FileNotFoundError as exc:
        raise HTTPException(404, str(exc)) from exc


@app.get("/flood/stats")
def flood_stats_endpoint():
    return flood_stats()


@app.get("/flood/polygons")
def flood_polygons():
    path = PUBLIC_DATA / "flood_polygons.geojson"
    if not path.exists():
        raise HTTPException(404, "flood_polygons.geojson not found")
    import json

    return json.loads(path.read_text())


class PredictRequest(BaseModel):
    lon: Optional[float] = None
    lat: Optional[float] = None
    name: Optional[str] = None
    features: dict[str, float] = Field(default_factory=dict)
    model: str = "Random Forest"


@app.post("/predict")
def predict(req: PredictRequest):
    try:
        return nearest_pin_prediction(req.lon, req.lat, req.name, req.model)
    except KeyError as exc:
        raise HTTPException(404, f"pin {exc} not found") from exc
    except ValueError as exc:
        raise HTTPException(400, str(exc)) from exc


@app.get("/sample-features/{index}")
def sample_features(index: int):
    s1 = load_s1()
    if index < 0 or index >= len(s1):
        raise HTTPException(404, "index out of range")
    row = s1.iloc[index]
    s2 = load_s2()
    optical = None
    if s2 is not None:
        hit = s2[s2["point_id"].astype(str) == str(row["Name"])]
        if not hit.empty:
            optical = {
                c: float(hit.iloc[0][c])
                for c in hit.columns
                if c not in {"point_id", "class", "longitude", "latitude"}
            }
    return {
        "name": str(row["Name"]),
        "target": int(row["target"]),
        "lon": float(row["Lon"]),
        "lat": float(row["Lat"]),
        "sentinel1": {
            c: float(row[c])
            for c in s1.columns
            if c not in {"Name", "X", "Y", "Lon", "Lat", "target"}
        },
        "sentinel2": optical,
    }
