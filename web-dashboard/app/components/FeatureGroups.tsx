"use client";

import { useState } from "react";

export default function FeatureGroups() {
  const [selectedGroup, setSelectedGroup] = useState("s1");

  const featureGroups = [
    {
      key: "s1",
      label: "Sentinel-1 SAR",
      description: "VV and VH polarization backscatter from pre-event (11 July 2026) and post-event (28 August 2026)",
      features: [
        { name: "VV Pre-event", band: "SAR backscatter, co-polarized", exploratory: true },
        { name: "VH Pre-event", band: "SAR backscross, cross-polarized", exploratory: true },
        { name: "VV Post-event", band: "SAR backscatter, co-polarized", exploratory: true },
        { name: "VH Post-event", band: "SAR backscatter, cross-polarized", exploratory: true },
      ],
    },
    {
      key: "s2",
      label: "Sentinel-2 Spectral",
      description: "Reflectance values from 9 Sentinel-2 acquisitions (May – October 2026)",
      features: [
        { name: "B02 Coastal Aerosol", band: "Blue, 0.0443–0.0483 μm", exploratory: true },
        { name: "B03 Blue", band: "Blue, 0.0450–0.0515 μm", exploratory: true },
        { name: "B04 Red", band: "Red, 0.650–0.680 μm", exploratory: true },
        { name: "B08 NIR", band: "Near-infrared, 0.833–0.869 μm", exploratory: true },
        { name: "B11 SWIR-1", band: "Short-wave infra-red, 1.560–1.660 μm", exploratory: true },
        { name: "B12 SWIR-2", band: "Short-wave infra-red, 1.630–2.190 μm", exploratory: true },
      ],
    },
    {
      key: "indices",
      label: "Water Indices (Engineered)",
      description: "NDWI, MNDWI calculated from Sentinel-2 bands. Feature engineering only.",
      features: [
        { name: "NDWI", formula: "(Green − NIR) / (Green + NIR)", exploratory: true, note: "Water detection. Full-scene values, not study-area-specific." },
        { name: "MNDWI", formula: "(Green − SWIR) / (Green + SWIR)", exploratory: true, note: "Modified NDWI for water. Full-scene values." },
      ],
    },
  ];

  const handleGroupChange = (key: string) => setSelectedGroup(key);

  return (
    <div className="rounded-xl border border-white/[0.07] bg-[#101a29] p-6">
      <div className="mb-6">
        <h4 className="text-sm font-semibold mb-3">
          Feature Groups & Spectral Bands
        </h4>
        <p className="text-[10px] text-slate-500">
          Spectral features from Sentinel-2 (B02–B12) and Sentinel-1 (VV/VH) acquisitions.
          All features are exploratory. No model has been trained on this data. Feature
          engineering (NDWI, MNDWI) is described for reference only.
        </p>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {["Sentinel-1 SAR", "Sentinel-2 Spectral", "Water Indices"].map((group) => (
          <button
            key={group}
            onClick={() => handleGroupChange(group)}
            className={`px-3 py-1.5 text-[10px] rounded border border-white/[0.15] transition ${selectedGroup === group ? "bg-cyan-400/10 text-cyan-300" : "text-slate-400 hover:bg-white/[0.04]"}`}
          >
            {group}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {featureGroups.map((group) => (
          <div key={group.key} className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-4">
            <h5 className="text-xs font-semibold text-cyan-300 mb-3">
              {group.label}
            </h5>
            <p className="text-[9px] text-slate-400 mb-3">
              {group.description}
            </p>
            <div>
              {group.features.map((feat) => {
                const hasBand = "band" in feat;
                return (
                  <div key={feat.name} className="mb-2 text-[9px]">
                    <span className="font-medium text-slate-100">{feat.name}:</span>
                    {hasBand && (
                      <span className="ml-2 text-[9px] text-cyan-300">{feat.band}</span>
                    )}
                    {feat.exploratory && (
                      <span className="ml-2 text-[8px] text-amber-300"> exploratory</span>
                    )}
                    {!hasBand && feat.note && (
                      <span className="ml-2 text-[8px] text-amber-300"> {feat.note}</span>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <div>
        <p className="text-[9px] text-slate-500">
          Important: The master dataset (Sentinel2_AllDates_Sampled_Features.csv) is not
          currently present in the repository. Spectral band values and index calculations
          would require loading the actual CSV and verifying reflectance scaling. NDWI and
          MNDWI formulas are provided for reference. Actual feature values should be
          calculated from calibrated Sentinel-2 Level-2A reflectance data.
        </p>
        <p className="mt-3 text-[9px] text-slate-500">
          Feature engineering (NDWI, MNDWI) must be fit within cross-validation training
          folds only. Do not select features using the entire dataset before validation.
        </p>
      </div>
    </div>
  );
}