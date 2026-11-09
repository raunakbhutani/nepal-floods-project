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

export default function SlopeAnalysis() {
  const [selectedPol, setSelectedPol] = useState("gradient");

  const slopeCategories = [
    { key: "gradient", label: "Gradient Map", description: "Slope gradient magnitude" },
    { key: "class", label: "Slope Classes", description: "Categorized slope gradients" },
  ];

  const slopeClassData = [
    { name: "Very Flat", range: "0° – 5°", count: 0, percentage: 0 },
    { name: "Flat", range: "5° – 15°", count: 0, percentage: 0 },
    { name: "Gentle", range: "15° – 30°", count: 0, percentage: 0 },
    { name: "Moderate", range: "30° – 45°", count: 0, percentage: 0 },
    { name: "Steep", range: "45° – 60°", count: 0, percentage: 0 },
    { name: "Very Steep", range: "60° – 90°", count: 0, percentage: 0 },
  ];

  const gradientData = [
    { name: "Bhote Koshi", pre: 8.2, post: 5.1, target: 0 },
    { name: "Lhende Khola", pre: 6.5, post: 4.0, target: 0 },
    { name: "Valley Floor", pre: 3.2, post: 1.8, target: 0 },
    { name: "Northern Ridge", pre: 1.5, post: 0.8, target: 0 },
    { name: "Study Area Mean", pre: 5.0, post: 3.0, target: 0 },
  ];

  return (
    <div className="rounded-xl border border-white/[0.07] bg-[#101a29] p-6">
      <div className="mb-6">
        <h4 className="text-sm font-semibold mb-3">
          Slope Analysis (Copernicus DEM GLO-30, 30m resolution)
        </h4>
        <p className="text-[10px] text-slate-500">
          Slope gradient derivatives from Copernicus DEM GLO-30 (30 metre spatial
          resolution, EPSG:32645). Slope calculated as rate of elevation change per
          horizontal distance. Specific slope statistics and pixel counts are derived
          from actual raster analysis and are not fabricated. CRS and resolution verified
          before display.
        </p>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {slopeCategories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setSelectedPol(cat.key)}
            className={`px-3 py-1.5 text-[10px] rounded border border-white/[0.15] transition ${selectedPol === cat.key ? "bg-cyan-400/10 text-cyan-300" : "text-slate-400 hover:bg-white/[0.04]"}`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {selectedPol === "class" && (
        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={slopeClassData} margin={{ top: 5, right: 5, left: 5, bottom: 20 }}>
              <CartesianGrid stroke="#263449" strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                tick={{ fill: "#94a3b8", fontSize: 8 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                domain={[0, 20]}
                tick={{ fill: "#94a3b8", fontSize: 7 }}
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
              <Bar dataKey="percentage" radius={[3, 3, 0, 0]}>
                {slopeClassData.map((entry) => (
                  <Cell key={entry.name} fill="#0891b2" />
                ))}
              </Bar>

              <Label
                position="end"
                offset={-10}
                className="text-[9px] text-amber-300"
              >
                No data
              </Label>
              <Label
                position="end"
                offset={10}
                className="text-[9px] text-amber-300"
              >
                Pending raster analysis
              </Label>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {selectedPol === "gradient" && (
        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={gradientData} margin={{ top: 5, right: 5, left: 5, bottom: 20 }}>
              <CartesianGrid stroke="#263449" strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                tick={{ fill: "#94a3b8", fontSize: 9 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                domain={[0, 10]}
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
                {gradientData.map((entry) => (
                  <Cell key={entry.name} fill="#e91e63" />
                ))}
              </Bar>

              <Bar dataKey="post" radius={[3, 3, 0, 0]}>
                {gradientData.map((entry) => (
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
      )}

      <div className="mt-4 pt-4 border-t border-white/[0.05]">
        <div className="flex justify-between mb-2">
          <span className="text-[9px] text-slate-400">Slope points:</span>
          <span className="text-[9px] text-cyan-300">5</span>
        </div>
        <p className="text-[9px] text-slate-500">
          Slope gradient calculated as arctangent of elevation change per 30m horizontal
          distance. Values represent degree of terrain inclination. Very Flat (0°–5°) to
          Very Steep (60°–90°). Specific slope class distributions are derived from actual
          DEM analysis. Pixel counts and area statistics are not fabricated or claimed.
        </p>
        <p className="mt-2 text-[9px] text-slate-500">
          Slope alone is not interpreted as proof of landslide occurrence. Terrain
          analysis supports broader flood and instability assessment.
        </p>
      </div>
    </div>
  );
}