# Nepal Flood Intelligence dashboard

## Run locally

Use two terminals from the repository root.

Terminal 1 — FastAPI:

```bash
cd backend
.venv/bin/uvicorn main:app --reload --port 8000
```

Terminal 2 — Next.js:

```bash
cd web-dashboard
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). If dependencies are not
installed, run `npm install` in `web-dashboard`; if the backend environment is
not set up, create `backend/.venv` and install `backend/requirements.txt`.

## Try the portal features

- **Overview (`/`)** — check the sample totals, model summary, optical index
  chart, and links to the research modules.
- **GIS Map (`/map`)** — use the layer button to switch base maps and toggle the
  SAR change mask, darkening intensity, and legacy Sentinel-1-only RF score
  overlay. That overlay is separate from the current Sentinel-2 model
  comparison and is not a calibrated probability or validated flood extent.
  Click a pin to inspect its label and coordinates.
- **Satellite (`/satellite`)** — inspect the Sentinel-1 time series and
  Sentinel-2 NDWI/MNDWI charts for the nine available dates.
- **Flood Mapping (`/flood-mapping`)** — inspect SAR mask metrics and the
  pin-level optical-index table.
- **Machine Learning (`/machine-learning`)** — compare the published model
  cards, then choose a labelled sample and model under **LIVE API TEST** and
  click **Run API test**. This sends a real request to `POST /predict`; it is a
  nearest-labelled-pin lookup, not a newly trained prediction model.
- **Model Evaluation (`/model-evaluation`)** — inspect mean accuracy and
  weighted F1 with their split-level standard deviations for the repeated
  stratified 2-fold comparison.
- **Terrain (`/terrain`)** and **Infrastructure (`/infrastructure`)** — review
  the available pin elevation and infrastructure/context data and their
  availability notes.
- **Research (`/research`)** — review the evidence summary and download its
  JSON export.
- Use the **Light mode / Dark mode** button in the header to change themes. The
  selection persists after a page refresh.

The API status is visible in the Machine Learning test panel. For API
documentation, open [http://localhost:8000/docs](http://localhost:8000/docs).

## What “candidate area” means

The displayed `0.69 km²` is the estimated area of pixels selected by a
Sentinel-1 SAR change-detection mask between 24 and 28 August 2026. The mask
combines VV/VH change with dark post-event backscatter, uses a threshold chosen
against the labelled pins, and is generated at an 8× downsampled resolution.
It is a **candidate inundation area**, not a verified measurement of the actual
flood extent. It needs independent map or field validation.

## Static research data

The API serves static model metrics from the repository-root
`model_results.json`; it does not retrain models at startup. `/predict` reports
the nearest labelled pin and does not run model inference. Pin data comes from
`s1_features.csv` and
`s2_features.csv`.

The current results compare three models on seven Sentinel-2 optical change
features. They are exploratory and do not represent Sentinel-1/Sentinel-2
fusion or spatially independent validation. The offline Sentinel-1 pipeline
writes its distinct results under `backend/artifacts/models/`; it does not
replace the dashboard's published-results fallback.
