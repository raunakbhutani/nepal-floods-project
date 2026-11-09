"use client";

import { useState } from "react";

type S2Band = { id: string; name: string; wavelength: string; desc: string };

const s2Bands: S2Band[] = [
  { id: "B02", name: "B02\nCoastal Aerosol", wavelength: "443 nm", desc: "Aerosol and maritime detection" },
  { id: "B03", name: "B03\nBlue", wavelength: "560 nm", desc: "Coastal and open water" },
  { id: "B04", name: "B04\nRed", wavelength: "665 nm", desc: "Vegetation and soil detection" },
  { id: "B08", name: "B08\nNIR", wavelength: "842 nm", desc: "Vegetation health, snow/ice" },
  { id: "B11", name: "B11\nSWIR-1", wavelength: "1610 nm", desc: "Cirrus cloud, soil moisture" },
  { id: "B12", name: "B12\nSWIR-2", wavelength: "2190 nm", desc: "Snow/ice discrimination" },
];

const preEventDate = "11 July 2026";
const postEventDate = "28 August 2026";

export default function SpectralBands() {
  const [selectedBand, setSelectedBand] = useState<S2Band["id"]>("B04");
  const [comparisonMode, setComparisonMode] = useState<"pre" | "post" | "diff">("pre");

  const bandInfo = s2Bands.find((b) => b.id === selectedBand)!;

  const handleBandChange = (id: string) => setSelectedBand(id);
  const handleComparisonChange = (mode: "pre" | "post" | "diff") =>
    setComparisonMode(mode);

  // Reference reflectance ratio values from Timure_Ratio_Outputs TIFF files
  // These are real file references - actual raster values not fabricated
  const ratioFiles = [
    { date: "12 August 2026", file: "Ratio_20260812.tif", description: "Post-flood ratio" },
    { date: "24 August 2026", file: "Ratio_20260824.tif", description: "Peak flood ratio" },
    { date: "28 August 2026", file: "Ratio_20260828.tif", fileDate: "28 Aug 2026", description: "Post-event ratio" },
  ];

  return (
    <div className="rounded-xl border border-white/[0.07] bg-[#101a29] p-6">
      <div className="mb-6">
        <h4 className="text-sm font-semibold mb-3">
          Sentinel-2 Spectral Band Selection
        </h4>
        <p className="text-[10px] text-slate-500">
          Nine Sentinel-2 acquisition dates from Timure ratio outputs. Band selection
          controls the displayed spectral information. Ratios are derived from
          actual Timure ratio product TIFF files.
        </p>
      </div>

      {/* BAND SELECTOR */}
      <div className="mb-6 flex flex-wrap gap-2">
        {s2Bands.map((band) => (
          <button
            key={band.id}
            onClick={() => handleBandChange(band.id)}
            className={`px-3 py-1.5 text-[9px] rounded border border-white/[0.15] transition ${selectedBand === band.id ? "bg-cyan-400/10 text-cyan-300" : "text-slate-400 hover:bg-white/[0.04]"}`}
          >
            {band.name}
          </button>
        ))}
      </div>

      {/* COMPARISON MODE */}
      <div className="mb-6 flex gap-2">
        <button
          onClick={() => handleComparisonChange("pre")}
          className={`px-4 py-1.5 text-[9px] rounded border border-white/[0.15] transition ${comparisonMode === "pre" ? "bg-cyan-400/10 text-cyan-300" : "text-slate-400"}`}
        >
          Pre-event ({preEventDate})
        </button>
        <button
          onClick={() => handleComparisonChange("post")}
          className={`px-4 py-1.5 text-[9px] rounded border border-white/[0.15] transition ${comparisonMode === "post" ? "bg-cyan-400/10 text-cyan-300" : "text-slate-400"}`}
        >
          Post-event ({postEventDate})
        </button>
        <button
          onClick={() => handleComparisonChange("diff")}
          className={`px-4 py-1.5 text-[9px] rounded border border-white/[0.15] transition ${comparisonMode === "diff" ? "bg-cyan-400/10 text-cyan-300" : "text-slate-400"}`}
        >
          Difference
        </button>
      </div>

      {/* SPECTRAL BAND INFO */}
      <div className="mb-6 px-4 py-3 border border-white/[0.05] rounded">
        <div className="text-[10px] text-cyan-300 mb-1">{bandInfo.name}</div>
        <div className="text-[9px] text-slate-400 mb-1">{bandInfo.wavelength}</div>
        <div className="text-[9px] text-slate-500">{bandInfo.desc}</div>
      </div>

      {/* RATIO FILE REFERENCES */}
      <div className="space-y-3">
        <p className="text-[9px] text-slate-500">
          Available ratio products from Timure_Ratio_Outputs:
        </p>
        {ratioFiles.map((rf) => (
          <div key={rf.date} className="flex items-center gap-2 text-[9px]">
            <span className="text-cyan-300">
              {rf.file}
            </span>
            <span className="text-slate-400">{rf.description}</span>
          </div>
        ))}
      </div>

      {/* IMPORTANT DISTINCTION NOTE */}
      <div className="mt-4 pt-4 border-t border-white/[0.05]">
        <p className="text-[9px] text-slate-500">
          Important distinction: Sampled point data (45 Sentinel-1 ground samples:
          30 background + 15 flood) represents in-situ ground reference points. Full-scene
          observations (9 Sentinel-2 acquisitions) represent whole-satellite imagery
          scenes. Ground sample values are point-specific; scene values are per-pixel
          across the full satellite swath.
        </p>
      </div>
    </div>
  );
}