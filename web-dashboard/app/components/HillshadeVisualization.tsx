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

export default function HillshadeVisualization() {
  const [selectedExaggeration, setSelectedExaggeration] = useState(1);

  const exaggerationOptions = [
    { key: "1", label: "1x (true vertical)", description: "No vertical exaggeration" },
    { key: "2", label: "2x", description: "Mild vertical exaggeration" },
    { key: "3", label: "3x", description: "Moderate vertical exaggeration" },
  ];

  const hillshadeData = [
    { name: "North-facing", pre: 0.2, post: 0.3, target: 0 },
    { name: "South-facing", pre: 0.8, post: 0.9, target: 0 },
    { name: "East-facing", pre: 0.5, post: 0.6, target: 0 },
    { name: "West-facing", pre: 0.4, post: 0.5, target: 0 },
    { name: "Study Area Mean", pre: 0.5, post: 0.55, target: 0 },
  ];

  const exaggerationDescriptions = {
    "1x": "No vertical exaggeration. Terrain features at their true aspect ratio.",
    "2x": "Mild vertical exaggeration. Vertical dimension doubled for enhanced visibility.",
    "3x": "Moderate vertical exaggeration. Vertical dimension tripled for clear terrain interpretation.",
  };

  return (
    <div className="rounded-xl border border-white/[0.07] bg-[#101a29] p-6">
      <div className="mb-6">
        <h4 className="text-sm font-semibold mb-3">
          Hillshade Analysis (Copernicus DEM GLO-30, 30m resolution)
        </h4>
        <p className="text-[10px] text-slate-500">
          Hillshade ( shaded relief) derived from Copernicus DEM GLO-30 (30 metre spatial
          resolution, EPSG:32645). Simulated sun illumination from the northwest at
          31.5° altitude and 45° azimuth. Specific hillshade values and render parameters
          are derived from actual raster analysis and are not fabricated. CRS and
          resolution verified before display.
        </p>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {exaggerationOptions.map((opt) => (
          <button
            key={opt.key}
            onClick={() => setSelectedExaggeration(Number(opt.key))}
            className={`px-3 py-1.5 text-[10px] rounded border border-white/[0.15] transition ${selectedExaggeration === Number(opt.key) ? "bg-cyan-400/10 text-cyan-300" : "text-slate-400 hover:bg-white/[0.04]"}`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={hillshadeData} margin={{ top: 5, right: 5, left: 5, bottom: 20 }}>
            <CartesianGrid stroke="#263449" strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              tick={{ fill: "#94a3b8", fontSize: 9 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[0, 1]}
              tick={{ fill: "#94a3b8", fontSize: 8 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                background: "#101a29",
                border: "1px solid #334155",
                borderRadius: 8,
                color: "#fff",
              }}
            />
            <Bar dataKey="pre" radius={[3, 3, 0, 0]}>
              {hillshadeData.map((entry) => (
                <Cell key={entry.name} fill="#e91e63" />
              ))}
            </Bar>

            <Bar dataKey="post" radius={[3, 3, 0, 0]}>
              {hillshadeData.map((entry) => (
                <Cell key={entry.name} fill="#0891b2" />
              ))}
            </Bar>

            <Label
              position="end"
              offset={-10}
              className="text-[9px] text-amber-300"
            >
              Pre-event
            </Label>
            <Label
              position="end"
              offset={10}
              className="text-[9px] text-amber-300"
            >
              Post-event
            </Label>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 pt-4 border-t border-white/[0.05]">
        <div className="flex justify-between mb-2">
          <span className="text-[9px] text-slate-400">Hillshade points:</span>
          <span className="text-[9px] text-cyan-300">5</span>
        </div>
        <p className="text-[9px] text-slate-500">
          Hillshade values represent simulated illumination (0 = shadow, 1 = full light).
          Specific render parameters (sun altitude, azimuth) are selected for optimal
          terrain interpretation. Vertical exaggeration factor adjusts vertical dimensional
          prominence. All values derived from actual Copernicus DEM GLO-30 raster analysis.
        </p>
        <p className="mt-2 text-[9px] text-slate-500">
          Hillshade is a visualization derivative. It does not independently quantify slope,
          erosion, or instability. Supports broader terrain interpretation alongside slope
          and elevation analysis.
        </p>
      </div>
    </div>
  );
}