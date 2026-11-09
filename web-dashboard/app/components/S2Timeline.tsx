"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const s2Dates = [
  { date: "4 May 2026", acquired: "13 July 2026", cloud: 95, ratioFile: "Ratio_20260505.tif" },
  { date: "8 June 2026", acquired: "27 August 2026", cloud: 78, ratioFile: "Ratio_20260610.tif" },
  { date: "23 July 2026", acquired: "12 August 2026", cloud: 62, ratioFile: "Ratio_20260723.tif" },
  { date: "12 August 2026", acquired: "24 August 2026", cloud: 41, ratioFile: "Ratio_20260812.tif" },
  { date: "24 August 2026", acquired: "27 August 2026", cloud: 35, ratioFile: "Ratio_20260824.tif" },
  { date: "27 August 2026", acquired: "28 August 2026", cloud: 28, ratioFile: "Ratio_20260828.tif" },
  { date: "6 September 2026", acquired: "6 September 2026", cloud: 22, ratioFile: "Ratio_20260905.tif" },
  { date: "21 September 2026", acquired: "21 September 2026", cloud: 18, ratioFile: "Ratio_20260921.tif" },
  { date: "6 October 2026", acquired: "6 October 2026", cloud: 15, ratioFile: "Ratio_20261006.tif" },
];

const spectralBands = [
  { id: "B02", name: "B02", desc: "Coastal Aerosol" },
  { id: "B03", name: "B03", desc: "Blue" },
  { id: "B04", name: "B04", desc: "Red" },
  { id: "B08", name: "B08", desc: "NIR" },
  { id: "B11", name: "B11", desc: "SWIR-1" },
  { id: "B12", name: "B12", desc: "SWIR-2" },
];

export default function S2Timeline() {
  const [selectedBand, setSelectedBand] = useState<"B02" | "B03" | "B04" | "B08" | "B11" | "B12">("B04");

  const handleBandChange = (band: "B02" | "B03" | "B04" | "B08" | "B11" | "B12") => {
    setSelectedBand(band);
  };

  return (
    <div className="rounded-xl border border-white/[0.07] bg-[#101a29] p-6">
      <div className="mb-6">
        <h4 className="text-sm font-semibold mb-3">Sentinel-2 Acquisition Timeline</h4>
        <p className="text-[10px] text-slate-500">
          Nine Sentinel-2 acquisitions covering the August 2026 flood event in
          Timure, Rasuwa District, Nepal. Cloud cover percentages represent full-scene
          observations, not area-specific calculations.
        </p>
      </div>

      {/* BAND SELECTOR */}
      <div className="mb-6">
        <h5 className="text-xs font-semibold text-slate-400 mb-2">Spectral Band</h5>
        <div className="flex gap-2">
          {spectralBands.map((band) => (
            <button
              key={band.id}
              onClick={() => handleBandChange(band.id as "B02" | "B03" | "B04" | "B08" | "B11" | "B12")}
              className={`px-3 py-1.5 text-[10px] rounded border border-white/[0.15] transition ${selectedBand === band.id ? "bg-cyan-400/10 text-cyan-300" : "text-slate-400 hover:bg-white/[0.04]"}`}
            >
              {band.name}
            </button>
          ))}
        </div>
      </div>

      {/* ACQUISITION TIMELINE CHART */}
      <div className="h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={s2Dates} margin={{ top: 20, right: 5, left: 5, bottom: 20 }}>
            <CartesianGrid stroke="#263449" strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tick={{ fill: "#94a3b8", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fill: "#94a3b8", fontSize: 9 }}
              axisLine={false}
              tickLine={false}
              unit="%"
            />
            <Tooltip
              contentStyle={{
                background: "#101a29",
                border: "1px solid #334155",
                borderRadius: 8,
                color: "#fff",
              }}
              formatter={(value) => [`${Number(value).toFixed(0)}%`, "Cloud cover"]}
            />
            <Bar dataKey="cloud" radius={[5, 5, 0, 0]} fill="#22d3ee">
              {s2Dates.map((entry) => (
                <Cell key={entry.date} fill="#22d3ee" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* CLOUD COVER LEGEND & DATA NOTES */}
      <div className="mt-4 pt-4 border-t border-white/[0.05]">
        <p className="text-[10px] text-slate-500">
          Cloud cover percentages represent whole Sentinel-2 scenes, not cloud cover
          calculated specifically over the study area.
        </p>
        <p className="mt-1 text-[9px] text-slate-400">
          Ratio products (Ratio_YYYYMMDD.tif) available from Timure ratio outputs.
        </p>
      </div>
    </div>
  );
}