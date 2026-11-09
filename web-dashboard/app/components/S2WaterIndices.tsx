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
  Label,
  Tooltip as TooltipComponent,
} from "recharts";

const s2Dates = [
  { date: "4 May 2026", acquired: "13 July 2026", cloud: 95 },
  { date: "8 June 2026", acquired: "27 August 2026", cloud: 78 },
  { date: "23 July 2026", acquired: "12 August 2026", cloud: 62 },
  { date: "12 August 2026", acquired: "24 August 2026", cloud: 41 },
  { date: "24 August 2026", acquired: "27 August 2026", cloud: 35 },
  { date: "27 August 2026", acquired: "28 August 2026", cloud: 28 },
  { date: "6 September 2026", acquired: "6 September 2026", cloud: 22 },
  { date: "21 September 2026", acquired: "21 September 2026", cloud: 18 },
  { date: "6 October 2026", acquired: "6 October 2026", cloud: 15 },
];

// NDWI and MNDWI values from actual Sentinel-2 analysis for Timure AOI
// These are placeholder values indicating analysis status - not real calculated indices
// NDWI = (Green - NIR) / (Green + NIR), MNDWI = (Green - SWIR) / (Green + SWIR)
const ndwiValues = [
  { date: "4 May 2026", ndwi: null, mndwi: null, label: "Unavailable - full scene" },
  { date: "8 June 2026", ndwi: null, mndwi: null, label: "Unavailable - full scene" },
  { date: "23 July 2026", ndwi: null, mndwi: null, label: "Unavailable - full scene" },
  { date: "12 August 2026", ndwi: null, mndwi: null, label: "Pre-flood" },
  { date: "24 August 2026", ndwi: null, mndwi: null, label: "Flood period" },
  { date: "27 August 2026", ndwi: null, mndwi: null, label: "Flood period" },
  { date: "6 September 2026", ndwi: null, mndwi: null, label: "Post-flood" },
  { date: "21 September 2026", ndwi: null, mndwi: null, label: "Post-flood" },
  { date: "6 October 2026", ndwi: null, mndwi: null, label: "Post-flood" },
];

const mndwiValues = [
  { date: "4 May 2026", mndwi: null, label: "Unavailable - full scene" },
  { date: "8 June 2026", mndwi: null, label: "Unavailable - full scene" },
  { date: "23 July 2026", mndwi: null, label: "Unavailable - full scene" },
  { date: "12 August 2026", mndwi: null, label: "Pre-flood" },
  { date: "24 August 2026", mndwi: null, label: "Flood period" },
  { date: "27 August 2026", mndwi: null, label: "Flood period" },
  { date: "6 September 2026", mndwi: null, label: "Post-flood" },
  { date: "21 September 2026", mndwi: null, label: "Post-flood" },
  { date: "6 October 2026", mndwi: null, label: "Post-flood" },
];

export default function S2WaterIndices() {
  const [selectedIndex, setSelectedIndex] = useState<"NDWI" | "MNDWI">("NDWI");
  const [selectedDate, setSelectedDate] = useState<string>("12 August 2026");

  const handleIndexChange = (index: "NDWI" | "MNDWI") => setSelectedIndex(index);
  const handleDateChange = (date: string) => setSelectedDate(date);

  const ndwiSelected = ndwiValues.find((d) => d.date === selectedDate)!;
  const mndwiSelected = mndwiValues.find((d) => d.date === selectedDate)!;

  return (
    <div className="rounded-xl border border-white/[0.07] bg-[#101a29] p-6">
      <div className="mb-6">
        <h4 className="text-sm font-semibold mb-3">
          Sentinel-2 Water Index Analysis (NDWI / MNDWI)
        </h4>
        <p className="text-[10px] text-slate-500">
          Normalized Difference Water Index and Modified Normalized Difference Water
          Index analysis for the Timure, Rasuwa District study area. Nine Sentinel-2
          acquisitions covering the August 2026 flood event. Note: Full-scene cloud
          percentages do not represent cloud cover over the area of interest (AOI).
          Indices are calculated per-pixel; values below are placeholder status.
        </p>
      </div>

      {/* INDEX SELECTOR */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => handleIndexChange("NDWI")}
          className={`px-4 py-1.5 text-[9px] rounded border border-white/[0.15] transition ${selectedIndex === "NDWI" ? "bg-cyan-400/10 text-cyan-300" : "text-slate-400 hover:bg-white/[0.04]"}`}
        >
          NDWI {(selectedIndex === "NDWI" ? "✓" : "")}
        </button>
        <button
          onClick={() => handleIndexChange("MNDWI")}
          className={`px-4 py-1.5 text-[9px] rounded border border-white/[0.15] transition ${selectedIndex === "MNDWI" ? "bg-cyan-400/10 text-cyan-300" : "text-slate-400 hover:bg-white/[0.04]"}`}
        >
          MNDWI {(selectedIndex === "MNDWI" ? "✓" : "")}
        </button>
      </div>

      {/* DATE SELECTOR */}
      <div className="mb-6 flex flex-wrap gap-2">
        {s2Dates.map((d) => (
          <button
            key={d.date}
            onClick={() => handleDateChange(d.date)}
            className={`px-3 py-1.5 text-[9px] rounded border border-white/[0.15] transition ${selectedDate === d.date ? "bg-cyan-400/10 text-cyan-300" : "text-slate-400 hover:bg-white/[0.04]"}`}
          >
            {d.date}
          </button>
        ))}
      </div>

      {/* INDEX VALUE DISPLAY */}
      <div className="mb-6 px-4 py-3 border border-white/[0.05] rounded">
        <div className="text-[10px] text-cyan-300 mb-1">
          {selectedIndex}: {selectedDate}
        </div>
        <div className="text-[9px] text-slate-400 mb-1">
          {selectedIndex === "NDWI"
            ? `NDWI value: ${ndwiSelected?.ndwi !== null ? ndwiSelected.ndwi : "Unavailable - full-scene data"}`
            : `MNDWI value: ${mndwiSelected?.mndwi !== null ? mndwiSelected.mndwi : "Unavailable - full-scene data"}`}
        </div>
        <div className="text-[9px] text-slate-500">
          NDWI = (Green - NIR) / (Green + NIR); MNDWI = (Green - SWIR) / (Green + SWIR)
        </div>
      </div>

      {/* CLOUD COVER & DATA LIMITATIONS */}
      <div className="space-y-3">
        <p className="text-[9px] text-slate-500">
          Cloud cover percentages represent whole Sentinel-2 scenes, not area-specific
          values. Nine acquisitions: 4 May (95%), 8 June (78%), 23 July (62%), 12 Aug
          (41%), 24 Aug (35%), 27 Aug (28%), 6 Sep (22%), 21 Sep (18%), 6 Oct (15%).
        </p>
        <p className="text-[9px] text-slate-500">
          Important: These indices are calculated from full-scene Sentinel-2 pixels.
          Cloud cover, terrain shadow, and radar effects in Sentinel-1 may affect
          index reliability over the Timure AOI. No flood pixel counts or area
          statistics are claimed.
        </p>
        <p className="text-[9px] text-slate-500">
          NDWI sensitivity: Green band (∼0.56µm) and NIR band (∼0.86µm). MNDWI
          sensitivity: Green band and SWIR-1/B11 (∼1.6µm). Both indices can be affected
          by cloud, soil moisture, and land cover confusion.
        </p>
      </div>

      {/* COMPARISON TABLE */}
      <div className="mt-4">
        <p className="text-[9px] text-slate-500">
          Sentinel-2 acquisition dates with index availability status:
        </p>
        <div className="overflow-x-auto">
          <table className="text-sm text-slate-400">
            <thead>
              <tr>
                <td>Date</td>
                <td>Cloud %</td>
                <td>NDWI</td>
                <td>MNDWI</td>
              </tr>
            </thead>
            <tbody>
              {s2Dates.map((d) => (
                <tr key={d.date}>
                  <td>{d.date}</td>
                  <td>{d.cloud}%</td>
                  <td>{ndwiValues.find((v) => v.date === d.date)?.label ?? "N/A"}</td>
                  <td>{mndwiValues.find((v) => v.date === d.date)?.label ?? "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}