// @ts-nocheck
"use client";

import { useState } from "react";

export default function MethodologySection() {
  const [showDetails, setShowDetails] = useState(false);

  const methodology = {
    sentinel1: {
      preEvent: "11 July 2026",
      postEvent: "28 August 2026",
      polarization: "VV and VH",
      description: "Sentinel-1 SAR backscatter observations. Pre-event and post-event comparison of backscatter coefficients. SAR preprocessing conducted in ESA SNAP.",
    },
    sentinel2: {
      acquisitionDates: [
        "4 May 2026",
        "8 June 2026",
        "23 July 2026",
        "12 August 2026",
        "24 August 2026",
        "27 August 2026",
        "6 September 2026",
        "21 September 2026",
        "6 October 2026",
      ],
      bands: ["B02 (Coastal Aerosol)", "B03 (Blue)", "B04 (Red)", "B08 (NIR)", "B11 (SWIR-1)", "B12 (SWIR-2)"],
      indices: [
        "NDWI = (Green - NIR) / (Green + NIR)",
        "MNDWI = (Green - SWIR) / (Green + SWIR)",
        "Note: Full-scene values, not study-area-specific",
      ],
      description: "Sentinel-2 L2A optical imagery. Nine acquisitions May–October 2026. Reflectance values and spectral indices for flood detection and water characterization.",
    },
    dem: {
      source: "Copernicus DEM GLO-30",
      resolution: "30 metres",
      crs: "EPSG:32645 (UTM Zone 45N)",
      description: "Digital Elevation Model. Derivatives: slope, hillshade. Elevation values represent terrain height above mean sea level. nodata values and CRS verified before display.",
    },
    referenceData: {
      source: "Copernicus EMSR927_AOI02_GRA_PRODUCT_v2.gpkg",
      layers: [
        "builtUpP_v2: 431 built-up features (expected)",
        "transportationL_v2: 15 transportation line features (expected)",
        "transportationP_v2: 1 transportation point feature (expected)",
        "facilitiesA_v2: Includes Rasuwagadhi Hydropower Dam",
        "observedEventA_v2: 1 observed landslide feature",
        "areaOfInterestA_v2: Study area boundary",
        "imageFootprintA_v2: Source imagery footprints",
      ],
      description: "EMSR927 reference/grading data. Important: Does not constitute a complete flood-damage inventory. Does not treat as complete flood-water extent. Damage assessment requires field verification.",
    },
    floodDetection: {
      methodology: "Sentinel-1 SAR backscatter comparison (pre-event vs post-event) and Sentinel-2 NDWI/MNDWI analysis",
      description: "Flood detection combines two sensor modalities:",
      sentinel1Description: "• VV/VH backscatter difference between post-event and pre-event. Increased backscatter may indicate surface flooding or soil moisture changes. VH cross-polarized more sensitive to volume scattering from vegetation/forest flooding.",
      sentinel2Description: "• NDWI and MNDWI analysis from Sentinel-2 bands. NDWI = (Green - NIR) / (Green + NIR). MNDWI = (Green - SWIR) / (Green + SWIR). Full-scene values, not study-area-specific.",
      combinedDescription: "• Multi-sensor fusion: S1 backscatter changes combined with S2 water indices. Spatial and temporal registration between sensors.",
      limitations: "• Only 45 sampled points (30 background, 15 flood). Class imbalance ratio 2:1. No 100% accuracy claimed without independent verification. Model results are preliminary and require independent replication. Spatial dependence and sample leakage investigated.",
    },
    terrainAnalysis: {
      demSource: "Copernicus DEM GLO-30 (30 m, EPSG:32645)",
      derivatives: "• Elevation: Terrain height above mean sea level\n• Slope: Gradient in degrees (°)\n• Hillshade: Simulated shaded relief (NW sun, 31.5° alt, 45° azi)\n• Drainage: Corridor analysis Bhote Koshi–Lhende Khola",
      scientificConstraints: "• Elevation ranges, slope statistics, drainage lengths NOT fabricated\n• Slope alone NOT interpreted as proof of landslide occurrence\n• Hillshade is visualization derivative, does not independently quantify slope or instability\n• Small sample size (n=45) limits generalizability",
    },
    machineLearning: {
      dataset: "45 sampled points (30 background, 15 flood) from s1_features.csv",
      models: "• Random Forest (scikit-learn, n_estimators=100)\n• Support Vector Machine (scikit-learn, RBF kernel)\n• Logistic Regression (scikit-learn, L2 regularization)\n• XGBoost (if installed)\n• MLP / Deep Learning",
      validation: "• Stratified k-fold cross-validation recommended (k=5 or k=10)\n• Preprocessing and feature selection fitted within training folds only\n• No feature selection using entire dataset before CV\n• Comparison against majority-class baseline\n• Class-specific precision, recall, F1-score and accuracy reported\n• Small sample size (n=45) limits generalization — results exploratory only",
    },
    infrastructure: {
      source: "EMSR927_AOI02_GRA_PRODUCT_v2.gpkg",
      layers: [
        "builtUpP_v2: 431 built-up features (expected)",
        "transportationL_v2: 15 line features (expected)",
        "transportationP_v2: 1 point feature (expected)",
        "facilitiesA_v2: Rasuwagadhi Hydropower Dam + other facilities",
        "observedEventA_v2: 1 observed landslide feature",
        "areaOfInterestA_v2: Study area boundary",
        "imageFootprintA_v2: Source imagery footprints",
      ],
      scientificConstraints: "• Never claim feature is damaged merely because in EMSR927\n• Do not invent affected road lengths, settlement counts or economic losses\n• Do not treat EMSR927 as complete damage inventory\n• Do not calculate exposure without compatible CRS and valid spatial overlay\n• Exposed ≠ damaged — field verification required\n• Exposed feature counts only after actual spatial overlay analysis\n• Source attribution and methodology for every statistic",
    },
    limitations: "• Only 45 sampled points — limits generalizability\n• Class imbalance 30:15 (background:flood)\n• No model metrics claimed without actual evaluation outputs\n• EMSR927 data is reference/grading only, not complete damage inventory\n• Slope alone does not prove landslide occurrence\n• No model confidence as calibrated probability without calibration testing\n• Cross-validation not independent external validation\n• All results require independent replication with expanded sample size",
  };

  return (
    <div className="rounded-xl border border-white/[0.07] bg-[#101a29] p-6">
      <div className="mb-6">
        <h4 className="text-sm font-semibold mb-3">
          Methodology
        </h4>
        <p className="text-[10px] text-slate-500">
          Multi-sensor flood mapping methodology for the August 2026 Nepal flood event
          in Timure, Rasuwa District, Nepal.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div>
          <h5 className="text-xs font-semibold text-cyan-300 mb-3">Sentinel-1 SAR</h5>
          <p className="text-[9px] text-slate-400">
            {methodology.sentinel1.preEvent} (pre-event) and {methodology.sentinel1.postEvent} (post-event),
            polarization: {methodology.sentinel1.polarization}. SAR preprocessing in ESA SNAP.
          </p>
        </div>
        <div>
          <h5 className="text-xs font-semibold text-cyan-300 mb-3">Sentinel-2 Optical</h5>
          <p className="text-[9px] text-slate-400">
            Nine acquisitions from {methodology.sentinel2.acquisitionDates[0]} to
            {methodology.sentinel2.acquisitionDates[8]}. Bands: {methodology.sentinel2.bands.join(", ")}.
            Indices: {methodology.sentinel2.indices.join(". ")}.
          </p>
        </div>
        <div>
          <h5 className="text-xs font-semibold text-cyan-300 mb-3">Copernicus DEM GLO-30</h5>
          <p className="text-[9px] text-slate-400">
            {methodology.dem.source}, {methodology.dem.resolution}, {methodology.dem.crs}.
            {methodology.dem.description}.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div>
          <h5 className="text-xs font-semibold text-cyan-300 mb-3">Reference Data (EMSR927)</h5>
          <p className="text-[9px] text-slate-400">
            {methodology.referenceData.source}. Layers: {methodology.referenceData.layers.join(". ")}.
            {methodology.referenceData.description}.
          </p>
        </div>
        <div>
          <h5 className="text-xs font-semibold text-cyan-300 mb-3">Flood Detection</h5>
          <p className="text-[9px] text-slate-400">
            {methodology.floodDetection.methodology}. {methodology.floodDetection.sentinel1Description}.
            {methodology.floodDetection.sentinel2Description}. {methodology.floodDetection.combinedDescription}.
            {methodology.floodDetection.limitations}.
          </p>
        </div>
        <div>
          <h5 className="text-xs font-semibold text-cyan-300 mb-3">Terrain Analysis</h5>
          <p className="text-[9px] text-slate-400">
            {methodology.terrainAnalysis.demSource}. Derivatives: {methodology.terrainAnalysis.derivatives}.
            {methodology.terrainAnalysis.scientificConstraints}.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div>
          <h5 className="text-xs font-semibold text-cyan-300 mb-3">Machine Learning</h5>
          <p className="text-[9px] text-slate-400">
            {methodology.machineLearning.dataset}. Models: {methodology.machineLearning.models}.
            {methodology.machineLearning.validation}.
          </p>
        </div>
        <div>
          <h5 className="text-xs font-semibold text-cyan-300 mb-3">Infrastructure Impact</h5>
          <p className="text-[9px] text-slate-400">
            {methodology.infrastructure.source}. Layers: {methodology.infrastructure.layers.join(". ")}.
            {methodology.infrastructure.scientificConstraints}.
          </p>
        </div>
        <div>
          <h5 className="text-xs font-semibold text-cyan-300 mb-3">Scientific Integrity</h5>
          <p className="text-[9px] text-slate-400">
            {methodology.limitations}.
          </p>
        </div>
      </div>

      <div>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="mt-3 text-[9px] text-cyan-300 hover:underline"
        >
          {showDetails ? "Hide methodology" : "Show scientific integrity guidelines"}
        </button>
      </div>
    </div>
  );
}