"use client";

import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import AppShell from "../components/AppShell";
import StatusBanner from "../components/StatusBanner";
import type { PinElevation } from "../lib/types";

export default function TerrainPage() {
  const [elev, setElev] = useState<PinElevation[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/data/pin_elevations.json")
      .then((r) => {
        if (!r.ok) throw new Error("pin_elevations.json missing");
        return r.json();
      })
      .then(setElev)
      .catch((e) => setError(String(e)));
  }, []);

  const flood = elev.filter((e) => e.target === 1);
  const background = elev.filter((e) => e.target === 0);
  const mean = (rows: PinElevation[]) => {
    const vals = rows.map((r) => r.elevation_m).filter((v): v is number => v != null);
    return vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : null;
  };
  const chart = elev.map((e, i) => ({
    name: `${e.target === 1 ? "F" : "B"}-${i + 1}`,
    elevation: e.elevation_m,
    fill: e.target === 1 ? "#22d3ee" : "#64748b",
  }));

  return (
    <AppShell crumb="TERRAIN & HYDROLOGY">
      <StatusBanner title="DEM STATUS">
        A Copernicus GLO-30 raster is not in the repository, so slope, hillshade
        and HAND were not generated. Pin elevations below were sampled from the
        Open-Meteo elevation API (Copernicus DEM based) at the 45 training
        coordinates. Values are metres above sea level.
      </StatusBanner>
      {error && <p className="text-xs text-rose-300">{error}</p>}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {[
          { label: "Samples", value: String(elev.length) },
          { label: "Min / max", value: elev.length ? `${Math.min(...elev.map((e) => e.elevation_m ?? 0))}–${Math.max(...elev.map((e) => e.elevation_m ?? 0))} m` : "—" },
          { label: "Flood pin mean", value: mean(flood) != null ? `${mean(flood)!.toFixed(0)} m` : "—" },
          { label: "Background mean", value: mean(background) != null ? `${mean(background)!.toFixed(0)} m` : "—" },
        ].map((item) => (
          <div key={item.label} className="rounded-xl border border-white/[0.07] bg-[#101a29] p-5">
            <p className="text-[10px] tracking-wider text-slate-500">{item.label.toUpperCase()}</p>
            <p className="mt-2 text-lg font-semibold">{item.value}</p>
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-white/[0.07] bg-[#101a29] p-6">
        <h3 className="text-sm font-semibold">Elevation at labelled pins</h3>
        <div className="mt-5 h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chart}>
              <CartesianGrid stroke="#263449" strokeDasharray="3 3" />
              <XAxis dataKey="name" hide />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 10 }} />
              <Tooltip contentStyle={{ background: "#101a29", border: "1px solid #334155", color: "#fff" }} />
              <Bar dataKey="elevation" fill="#22d3ee" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-3 text-[10px] text-slate-500">
          Cyan-oriented samples are flood pins; the series is ordered as in the CSV.
          Lower flood-pin elevations are consistent with a river-corridor sample set,
          not proof of inundation depth.
        </p>
      </div>
    </AppShell>
  );
}
