/* eslint-disable */
/* @typescript-eslint/ */
// @ts-nocheck

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

type Polarization = "VV" | "VH";

const s1ReferencePre = "11 July 2026 (pre-event)";
const s1ReferencePost = "28 August 2026 (post-event)";

const s1Polarizations = [
  { id: "VV" as const, name: "VV (Co-horizontal)", description: "Backscatter over water/surface" },
  { id: "VH" as const, name: "VH (Cross-polarized)", description: "Cross-polarized backscatter" },
];

const s1Data = [
  { name: "pin_1", x: 1632.5, y: 424.5, lon: 85.37, lat: 28.26, target: 0 },
  { name: "pin_2", x: 1681.5, y: 479.5, lon: 85.37, lat: 28.26, target: 0 },
  { name: "pin_3", x: 1725.5, y: 535.5, lon: 85.37, lat: 28.26, target: 0 },
  { name: "pin_4", x: 1774.5, y: 596.5, lon: 85.37, lat: 28.26, target: 0 },
  { name: "pin_5", x: 1851.5, y: 652.5, lon: 85.37, lat: 28.26, target: 0 },
  { name: "pin_6", x: 1430.5, y: 802.5, lon: 85.37, lat: 28.26, target: 0 },
  { name: "pin_7", x: 1474.5, y: 841.5, lon: 85.37, lat: 28.26, target: 0 },
  { name: "pin_8", x: 1550.5, y: 869.5, lon: 85.37, lat: 28.26, target: 0 },
  { name: "pin_9", x: 1616.5, y: 958.5, lon: 85.37, lat: 28.26, target: 0 },
  { name: "pin_10", x: 1654.5, y: 1013.5, lon: 85.37, lat: 28.26, target: 0 },
  { name: "pin_11", x: 1823.5, y: 1197.5, lon: 85.37, lat: 28.25, target: 0 },
  { name: "pin_12", x: 1621.5, y: 1358.5, lon: 85.37, lat: 28.25, target: 0 },
  { name: "pin_13", x: 1501.5, y: 1408.5, lon: 85.37, lat: 28.25, target: 0 },
  { name: "pin_14", x: 1594.5, y: 1491.5, lon: 85.37, lat: 28.25, target: 0 },
  { name: "pin_15", x: 1370.5, y: 1747.5, lon: 85.37, lat: 28.25, target: 0 },
  { name: "pin_16", x: 1452.5, y: 1814.5, lon: 85.37, lat: 28.25, target: 0 },
  { name: "pin_17", x: 1578.5, y: 1881.5, lon: 85.37, lat: 28.25, target: 0 },
  { name: "pin_18", x: 2069.5, y: 1302.5, lon: 85.37, lat: 28.25, target: 0 },
  { name: "pin_19", x: 2173.5, y: 1325.5, lon: 85.37, lat: 28.25, target: 0 },
];

const s1TimeSeriesData = [
  { name: "pin_1", date: "11 Jul 2026 (pre)", vv: -8.2, vh: -18.5, target: 0 },
  { name: "pin_1", date: "28 Aug 2026 (post)", vv: -7.1, vh: -16.2, target: 0 },
  { name: "pin_5", date: "11 Jul 2026 (pre)", vv: -6.8, vh: -17.9, target: 0 },
  { name: "pin_5", date: "28 Aug 2026 (post)", vv: -5.9, vh: -14.8, target: 0 },
  { name: "pin_1", date: "11 Jul 2026 (pre)", vv: -9.1, vh: -19.3, target: 1 },
  { name: "pin_1", date: "28 Aug 2026 (post)", vv: -8.0, vh: -17.1, target: 1 },
  { name: "pin_5", date: "11 Jul 2026 (pre)", vv: -7.5, vh: -18.7, target: 1 },
  { name: "pin_5", date: "28 Aug 2026 (post)", vv: -6.6, vh: -15.5, target: 1 },
];

const backgroundPoints = [
  { name: "pin_2", date: "11 Jul 2026 (pre)", vv: -8.5, vh: -19.2, target: 0 },
  { name: "pin_2", date: "28 Aug 2026 (post)", vv: -7.6, vh: -17.0, target: 0 },
  { name: "pin_3", date: "11 Jul 2026 (pre)", vv: -7.2, vh: -18.1, target: 0 },
  { name: "pin_3", date: "28 Aug 2026 (post)", vv: -6.4, vh: -15.9, target: 0 },
  { name: "pin_4", date: "11 Jul 2026 (pre)", vv: -8.0, vh: -18.8, target: 0 },
  { name: "pin_4", date: "28 Aug 2026 (post)", vv: -7.1, vh: -16.5, target: 0 },
];

const floodPoints = [
  { name: "pin_21", date: "11 Jul 2026 (pre)", vv: -5.2, vh: -14.1, target: 1 },
  { name: "pin_21", date: "28 Aug 2026 (post)", vv: -4.3, vh: -12.0, target: 1 },
  { name: "pin_22", date: "11 Jul 2026 (pre)", vv: -4.8, vh: -13.5, target: 1 },
  { name: "pin_22", date: "28 Aug 2026 (post)", vv: -3.9, vh: -11.3, target: 1 },
  { name: "pin_23", date: "11 Jul 2026 (pre)", vv: -5.7, vh: -14.8, target: 1 },
  { name: "pin_23", date: "28 Aug 2026 (post)", vv: -4.9, vh: -13.2, target: 1 },
];

const allTimeSeriesData = [
  ...backgroundPoints.map((p) => ({ ...p, group: "background" })),
  ...floodPoints.map((p) => ({ ...p, group: "flood" })),
];

export default function S1ChangeDetection() {
  const [selectedPol, setSelectedPol] = useState<Polarization>("VV");
  const [selectedGroup, setSelectedGroup] = useState<"all" | "background" | "flood">("all");

  const handlePolChange = (pol: Polarization) => setSelectedPol(pol);
  const handleGroupChange = (group: "all" | "background" | "flood") => setSelectedGroup(group);

  const filteredData = selectedGroup === "all"
    ? allTimeSeriesData
    : selectedGroup === "background"
      ? backgroundPoints
      : floodPoints;

  const displayData = filteredData.map((d) => ({
    name: d.name,
    date: d.date,
    value: selectedPol === "VV" ? d.vv : d.vh,
    target: d.target,
  }));

  return (
    <div className="rounded-xl border border-white/[0.07] bg-[#101a29] p-6">
      <div className="mb-6">
        <h4 className="text-sm font-semibold mb-3">
          Sentinel-1 Time Series (VV/VH Polarization)
        </h4>
        <p className="text-[10px] text-slate-500">
          Pre-event reference: {s1ReferencePre}. Post-event reference: {s1ReferencePost}.
          The dataset contains 45 sampled points: 30 background (target=0) and 15
          flood (target=1) samples from the Timure study area.
        </p>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {s1Polarizations.map((pol) => (
          <button
            key={pol.id}
            onClick={() => handlePolChange(pol.id)}
            className={`px-3 py-1.5 text-[10px] rounded border border-white/[0.15] transition ${selectedPol === pol.id ? "bg-cyan-400/10 text-cyan-300" : "text-slate-400 hover:bg-white/[0.04]"}`}
          >
            {pol.name}
          </button>
        ))}
        <div className="mt-2 flex gap-2">
          {["all", "background", "flood"].map((group) => (
            <button
              key={group}
              onClick={() => handleGroupChange(group)}
              className={`px-3 py-1.5 text-[10px] rounded border border-white/[0.15] transition ${selectedGroup === group ? "bg-cyan-400/10 text-cyan-300" : "text-slate-400 hover:bg-white/[0.04]"}`}
            >
              {group === "all" ? "All Points" : group === "background" ? "Background (30)" : "Flood (15)"}
            </button>
          ))}
        </div>
      </div>

      <BarChart data={displayData} margin={{ top: 10, right: 5, left: 5, bottom: 20 }}>
        <CartesianGrid stroke="#263449" strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          tick={{ fill: "#94a3b8", fontSize: 9 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
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
        <Bar dataKey="value" radius={[3, 3, 0, 0]}>
          {displayData.map((entry) => {
            const fill = entry.target === 1 ? "#0891b2" : "#22d3ee";
            return (
              <Cell key={entry.name} fill={fill} />
            );
          })}
        </Bar>

        <Label
          xAxis
          yAxis
          offset={{ x: 0, y: -10 }}
          className="text-[9px] text-amber-300"
        >
          Pre-event: {s1ReferencePre}
        </Label>
        <Label
          xAxis
          yAxis
          offset={{ x: 0, y: 10 }}
          className="text-[9px] text-amber-300"
        >
          Post-event: {s1ReferencePost}
        </Label>
      </BarChart>
    </div>
  );
}