// @ts-nocheck
"use client";

import { useState } from "react";

export default function ReferencesSection() {
  const [showReferences, setShowReferences] = useState(false);

  const references = {
    projectTitle: "Multi-Sensor Flood Mapping in the Timure/Rasuwa Gorge using Sentinel-1 and Sentinel-2 Data Fusion: An Assessment of the August 2026 Nepal Flood Event",
    studyArea: "Timure, Rasuwa District, Nepal. Bhote Koshi–Lhende Khola corridor.",
    event: "August 2026 Nepal flood event",
    datasets: [
      { name: "Sentinel-1 SAR VV/VH pre-event and post-event observations", source: "ESA Sentinel-1 satellite", description: "Pre-event: 11 July 2026. Post-event: 28 August 2026. VV and VH polarization." },
      { name: "Sentinel-2 L2A optical imagery and sampled spectral features", source: "ESA Sentinel-2 satellite", description: "Nine acquisitions: 4 May, 8 June, 23 July, 12 August, 24 August, 27 August, 6 September, 21 September, 6 October 2026. Six spectral bands (B02-B03-B04-B08-B11-B12) and NDWI/MNDWI indices." },
      { name: "Copernicus DEM GLO-30", source: "Copernicus Programme", description: "30-metre resolution, EPSG:32645 (UTM Zone 45N). Elevation derivatives: slope, hillshade." },
      { name: "Copernicus EMSR927 reference GeoPackage", source: "Copernicus Emergency Management Service (EMSR927)", description: "EMSR927_AOI02_GRA_PRODUCT_v2.gpkg. Layers: builtUpP_v2, transportationL_v2, transportationP_v2, facilitiesA_v2, observedEventA_v2, areaOfInterestA_v2, imageFootprintA_v2. Reference/grading data only — not a complete flood-damage inventory or flood-water extent." },
      { name: "Machine-learning model training and evaluation outputs", source: "Project Python workflows (extract_s1_features.py, calculate_ratios.py, process_stack.py)", description: "Model configurations in /module-6. Evaluation outputs require actual training and validation. No metrics claimed without actual outputs." },
    ],
    methodologies: [
      "Sentinel-1 SAR backscatter comparison (pre-event vs post-event)",
      "Sentinel-2 NDWI/MNDWI analysis",
      "Copernicus DEM GLO-30 derivatives (elevation, slope, hillshade)",
      "EMSR927 reference data assessment",
      "Machine learning model training with stratified cross-validation",
      "Infrastructure exposure analysis from EMSR927 reference data",
    ],
    scientificIntegrity: [
      "Never invent research findings, flood areas, accuracy scores, statistical results or references",
      "Preserve the distinction between reference damage data and verified flood extent",
      "Distinguish observed results from interpretation and hypotheses",
      "Include data limitations and uncertainty",
      "Do not describe preliminary model results as independently validated",
      "Use actual project files and verified evaluation outputs",
      "Clearly identify missing information instead of filling gaps with fabricated content",
    ],
    modules: [
      "Module 1: Overview (/)",
      "Module 2: Map (/map)",
      "Module 3: Satellite (/satellite)",
      "Module 4: Flood Mapping (/flood-mapping)",
      "Module 5: Terrain (/terrain)",
      "Module 6: Machine Learning (/machine-learning)",
      "Module 7: Model Evaluation (/model-evaluation)",
      "Module 8: Infrastructure Impact (/infrastructure)",
    ],
  };

  return (
    <div className="rounded-xl border border-white/[0.07] bg-[#101a29] p-6">
      <div className="mb-6">
        <h4 className="text-sm font-semibold mb-3">
          References & Data Sources
        </h4>
        <p className="text-[10px] text-slate-500">
          Source attribution and methodology for all project data. Clear distinction
          between verified data and preliminary results.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div>
          <h5 className="text-xs font-semibold text-cyan-300 mb-3">Research Project</h5>
          <p className="text-[9px] text-slate-400">{references.projectTitle}</p>
          <p className="text-[9px] text-slate-400 small">{references.studyArea}</p>
          <p className="text-[9px] text-slate-400 small">{references.event}</p>
        </div>
        <div>
          <h5 className="text-xs font-semibold text-cyan-300 mb-3">Datasets</h5>
          {references.datasets.map((ds) => (
            <div key={ds.name} className="mb-2 text-[9px]">
              <p className="font-medium text-slate-100">{ds.name}</p>
              <p className="text-[8px] text-amber-300 small">{ds.source}</p>
              <p className="text-[8px] text-slate-400 xs-block">{ds.description}</p>
            </div>
          ))}
        </div>
        <div>
          <h5 className="text-xs font-semibold text-cyan-300 mb-3">Methodologies</h5>
          {references.methodologies.map((m) => (
            <div key={m} className="mb-2 text-[9px]">
              <p className="font-medium text-slate-100">{m}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h5 className="text-xs font-semibold text-cyan-300 mb-3">Scientific Integrity</h5>
        <ul className="list-disc list-inside text-[9px] text-slate-400 space-y-1">
          {references.scientificIntegrity.map((s) => (
            <li key={s} className="mb-1 text-[9px]">
              {s}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h5 className="text-xs font-semibold text-cyan-300 mb-3">Research Modules</h5>
        {references.modules.map((m) => (
          <div key={m} className="mb-2 text-[9px]">
            <p className="font-medium text-slate-100">{m}</p>
          </div>
        ))}
      </div>

      {showReferences ? (
        <div>
          <h5 className="text-xs font-semibold text-cyan-300 mb-3">Full Reference Details</h5>
          <p className="text-[9px] text-amber-300 mb-3">
            Complete reference information for the multi-sensor flood mapping research project.
            All datasets, methodologies, and scientific integrity guidelines are documented
            above. See individual module pages for module-specific data sources and
            evaluation outputs.
          </p>
          <ul className="list-disc list-inside text-[9px] text-slate-400 space-y-1">
            <li>Sentinel-1 data: ESA satellite, VV/VH polarization, pre/post 11/28 July 2026</li>
            <li>Sentinel-2 data: ESA satellite, 9 acquisitions May–October 2026, 6 bands</li>
            <li>Copernicus DEM GLO-30: 30m resolution, EPSG:32645, elevation derivatives</li>
            <li>EMSR927 GeoPackage: reference/grading data only, not complete damage inventory</li>
            <li>Machine learning: Python workflows, stratified CV, actual evaluation outputs required</li>
            <li>All project data traced to actual files in the repository</li>
          </ul>
        </div>
      ) : (
        <button
          onClick={() => setShowReferences(!showReferences)}
          className="flex items-center gap-2 text-[9px] text-cyan-300 hover:underline"
        >
          <span className="h-2 w-2 rounded-full bg-cyan-300" />
          Show references
        </button>
      )}</div>
  );
}