"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import AppShell from "../components/AppShell";
import StatusBanner from "../components/StatusBanner";
import { fetchJson } from "../lib/api";
import type { FloodStats } from "../lib/types";

const ResearchMap = dynamic(() => import("../components/ResearchMap"), { ssr: false });

export default function FloodMappingPage() {
  const [flood, setFlood] = useState<FloodStats | null>(null);
  useEffect(() => {
    fetchJson<FloodStats>("/flood/stats", "/data/flood_stats.json").then(setFlood).catch(() => setFlood(null));
  }, []);

  const optical = flood?.sentinel2.pin_indices?.dates ?? [];

  return (
    <AppShell crumb="FLOOD MAPPING">
      <StatusBanner title="CANDIDATE INUNDATION MASK">
        {flood?.method ?? "SAR change mask plus pin-level Sentinel-2 water indices from s2_features.csv."}
      </StatusBanner>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {[
          { label: "Pin F1 at threshold", value: flood?.pin_f1_at_threshold != null ? flood.pin_f1_at_threshold.toFixed(3) : "—" },
          { label: "Log-ratio threshold", value: flood?.threshold_log_ratio != null ? flood.threshold_log_ratio.toFixed(3) : "—" },
          {
            label: "Candidate area",
            value: flood?.candidate_area_km2 != null ? `${flood.candidate_area_km2.toFixed(3)} km²` : "—",
            note: flood?.candidate_flood_pixels != null
              ? `Estimated from ${flood.candidate_flood_pixels.toLocaleString()} mask pixels; not a validated flood extent.`
              : "Estimated from the SAR change mask; not a validated flood extent.",
          },
          { label: "S2 optical dates", value: String(optical.length || "—") },
        ].map((item) => (
          <div key={item.label} className="rounded-xl border border-white/[0.07] bg-[#101a29] p-5">
            <p className="text-[10px] tracking-wider text-slate-500">{item.label.toUpperCase()}</p>
            <p className="mt-2 text-xl font-semibold">{item.value}</p>
            {"note" in item && item.note && (
              <p className="mt-2 text-[10px] leading-5 text-slate-500">{item.note}</p>
            )}
          </div>
        ))}
      </div>
      <ResearchMap />
      <div className="rounded-xl border border-white/[0.07] bg-[#101a29] p-6">
        <h3 className="text-sm font-semibold">Sentinel-2 pin water indices</h3>
        <p className="mt-2 text-[11px] text-slate-500">{flood?.sentinel2.reason}</p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-[11px] text-slate-400">
            <thead>
              <tr className="text-slate-500">
                <th className="py-2">Date</th>
                <th>NDWI flood</th>
                <th>NDWI background</th>
                <th>MNDWI flood</th>
                <th>MNDWI background</th>
              </tr>
            </thead>
            <tbody>
              {optical.map((row) => (
                <tr key={row.date} className="border-t border-white/5">
                  <td className="py-2">{row.date}</td>
                  <td>{row.ndwi_flood_mean.toFixed(3)}</td>
                  <td>{row.ndwi_background_mean.toFixed(3)}</td>
                  <td>{row.mndwi_flood_mean != null ? row.mndwi_flood_mean.toFixed(3) : "—"}</td>
                  <td>{row.mndwi_background_mean != null ? row.mndwi_background_mean.toFixed(3) : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}
