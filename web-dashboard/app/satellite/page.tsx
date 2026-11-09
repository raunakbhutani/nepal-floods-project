"use client";

import { useEffect, useState } from "react";
import {
  Line,
  LineChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import AppShell from "../components/AppShell";
import StatusBanner from "../components/StatusBanner";
import { fetchJson } from "../lib/api";
import type { FloodStats } from "../lib/types";

export default function SatellitePage() {
  const [flood, setFlood] = useState<FloodStats | null>(null);
  useEffect(() => {
    fetchJson<FloodStats>("/flood/stats", "/data/flood_stats.json").then(setFlood).catch(() => setFlood(null));
  }, []);

  const series = flood?.pin_time_series_means ?? [];
  const optical = flood?.sentinel2.pin_indices?.dates ?? [];

  return (
    <AppShell crumb="SATELLITE INTELLIGENCE">
      <StatusBanner title="MULTI-SENSOR PINS">
        Sentinel-1 means come from <code>s1_features.csv</code>. Sentinel-2 NDWI/MNDWI
        are calculated at the 45 labelled pins in <code>s2_features.csv</code>{" "}
        (Green/NIR/SWIR). Full-scene optical rasters are still not served as map tiles.
      </StatusBanner>

      <div className="rounded-xl border border-white/[0.07] bg-[#101a29] p-6">
        <h3 className="text-sm font-semibold">Sentinel-1 pin-mean backscatter</h3>
        <div className="mt-5 h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={series}>
              <CartesianGrid stroke="#263449" strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fill: "#94a3b8", fontSize: 10 }} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 10 }} />
              <Tooltip contentStyle={{ background: "#101a29", border: "1px solid #334155", color: "#fff" }} />
              <Legend />
              <Line type="monotone" dataKey="vv_flood_mean" name="VV flood pins" stroke="#22d3ee" dot={false} />
              <Line type="monotone" dataKey="vh_flood_mean" name="VH flood pins" stroke="#38bdf8" dot={false} />
              <Line type="monotone" dataKey="vv_background_mean" name="VV background" stroke="#fbbf24" dot={false} />
              <Line type="monotone" dataKey="vh_background_mean" name="VH background" stroke="#fb7185" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.07] bg-[#101a29] p-6">
        <h3 className="text-sm font-semibold">Sentinel-2 pin-mean NDWI / MNDWI</h3>
        <p className="mt-1 text-[10px] text-slate-500">
          {flood?.sentinel2.reason}
        </p>
        <div className="mt-5 h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={optical}>
              <CartesianGrid stroke="#263449" strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fill: "#94a3b8", fontSize: 10 }} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 10 }} />
              <Tooltip contentStyle={{ background: "#101a29", border: "1px solid #334155", color: "#fff" }} />
              <Legend />
              <Line type="monotone" dataKey="ndwi_flood_mean" name="NDWI flood" stroke="#22d3ee" dot={false} />
              <Line type="monotone" dataKey="ndwi_background_mean" name="NDWI background" stroke="#64748b" dot={false} />
              <Line type="monotone" dataKey="mndwi_flood_mean" name="MNDWI flood" stroke="#38bdf8" dot={false} />
              <Line type="monotone" dataKey="mndwi_background_mean" name="MNDWI background" stroke="#fbbf24" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </AppShell>
  );
}
