# Nepal Flood 2026 — Timure / Rasuwa

Multi-sensor flood research for the Timure gorge in Rasuwa District, Nepal. The
dashboard and FastAPI service serve published research results and pin data;
starting the API does not retrain models.

## Data sources

- `model_results.json` at the repository root is the authoritative static
  source for published model metrics, cross-validation scores, and confidence
  values.
- `s1_features.csv` and `s2_features.csv` provide the labelled pin data. The
  API serves those pins and computes pin-level Sentinel-2 NDWI/MNDWI from the
  CSV; it does not fit a model.
- `web-dashboard/public/data/model_results.json` is the dashboard's offline
  fallback copy of the root results file.
- The current comparison uses seven Sentinel-2 optical change features on 45
  labeled samples and reports mean accuracy / weighted F1 over 10 repeats of
  stratified 2-fold CV. It is exploratory: no spatial grouping or independent
  external holdout was used, and it does not evaluate Sentinel-1/Sentinel-2
  feature fusion. `model_comparison.csv` contains the same summary scores.
- The separate Sentinel-1-only offline pipeline stores its evaluation under
  `backend/artifacts/models/`; it does not overwrite the dashboard's published
  results or offline fallback.
- The root `s2_features.csv` is the canonical optical pin-feature table; the
  redundant copy in `web-dashboard/` was removed.
- No feature-importance values are present in the published
  `model_results.json`. The dashboard reports their absence rather than
  substituting results from another model run.

`/predict` is a nearest-labelled-pin lookup, not a live classifier. Its
confidence field is populated only when the requested model has a published
confidence value in `model_results.json`.

## Run the application

Terminal 1 — FastAPI:

```bash
cd backend
python3 -m venv .venv
.venv/bin/pip install -r requirements.txt
.venv/bin/uvicorn main:app --reload --port 8000
```

Terminal 2 — Next.js:

```bash
cd web-dashboard
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Model pages use the API's
`/models` response and fall back to the static dashboard copy when the API is
unavailable. The map uses `/pins`, and flood/satellite views use
`/flood/stats`.

## API endpoints

- `GET /health` — static mode and source file paths
- `GET /models` — normalized dashboard data and the complete published JSON
- `GET /pins` — GeoJSON generated from the Sentinel-1 and Sentinel-2 pin CSVs
- `GET /flood/stats` — published flood statistics plus pin-level optical indices
- `POST /predict` — nearest labelled pin and any available published confidence

The nine dashboard routes are `/`, `/map`, `/satellite`, `/flood-mapping`,
`/terrain`, `/machine-learning`, `/model-evaluation`, `/infrastructure`, and
`/research`.

## Offline pipeline

The existing model-training and raster-product scripts are optional offline
tools, not application startup steps. Their additional dependencies are listed
in `backend/requirements-pipeline.txt`. Running those scripts does not change
the root `model_results.json` used by the API.

The flood overlay is a candidate SAR change product, not an independently
validated flood extent.
