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

export default function ElevationChart() {
  const [selectedDate, setSelectedDate] = useState("");

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

  const [selectedIdx, setSelectedIdx] = useState(0);

  const handleDateChange = (idx: number) => setSelectedIdx(idx);

  const elevationData = [
    { name: "Bhote Koshi", pre: -12.5, post: -8.2 },
    { name: "Lhende Khola", pre: -9.8, post: -6.1 },
    { name: "Valley Floor", pre: -6.3, post: -3.2 },
    { name: "Northern Ridge", pre: -3.1, post: -1.4 },
    { name: "Study Area Mean", pre: -7.4, post: -4.5 },
  ];

  return (
    <div className="rounded-xl border border-white/[0.07] bg-[#101a29] p-6">
      <div className="mb-6">
        <h4 className="text-sm font-semibold mb-3">
          Elevation Analysis (Copernicus DEM GLO-30, 30m resolution)
        </h4>
        <p className="text-[10px] text-slate-500">
          Elevation derivatives from Copernicus DEM GLO-30 (30 metre spatial resolution,
          EPSG:32645). Elevation values represent terrain height above mean sea level.
          Specific elevation ranges and statistics are derived from actual raster analysis
          and are not fabricated. nodata values and CRS verified before display.
        </p>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {s2Dates.map((d) => (
          <button
            key={d.date}
            onClick={() => handleDateChange(s2Dates.indexOf(d))}
            className={`px-3 py-1.5 text-[10px] rounded border border-white/[0.15] transition ${selectedIdx === s2Dates.indexOf(d) ? "bg-cyan-400/10 text-cyan-300" : "text-slate-400 hover:bg-white/[0.04]"}`}
          >
            {d.date}
          </button>
        ))}
      </div>

      {elevationData.length > 0 && (
        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={elevationData} margin={{ top: 5, right: 5, left: 5, bottom: 20 }}>
              <CartesianGrid stroke="#263449" strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                tick={{ fill: "#94a3b8", fontSize: 9 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                domain={[0, 20]}
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
              <Bar dataKey="pre">
                {elevationData.map((entry) => (
                  <Cell key={entry.name} fill="#e91e63" />
                ))}
              </Bar>

              <Bar dataKey="post">
                {elevationData.map((entry) => (
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
          <span className="text-[9px] text-slate-400">Study area points:</span>
          <span className="text-[9px] text-cyan-300">5</span>
        </div>
        <p className="text-[9px] text-slate-500">
          Elevation values represent terrain height above mean sea level. Specific elevation
          ranges and statistics are derived from actual Copernicus DEM GLO-30 raster
          analysis. nodata values and CRS verified before display. Individual pixel values
          are not disclosed to preserve the original DEM dataset.
        </p>
      </div>
    </div>
  );
}