"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  Database,
  Layers3,
  Map,
  Mountain,
  Satellite,
  ShieldCheck,
  Waves,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import AppShell from "./components/AppShell";
import StatusBanner from "./components/StatusBanner";
import { fetchJson, fetchModels } from "./lib/api";
import type { FloodStats, ModelResults } from "./lib/types";

export default function Home() {
  const [models, setModels] = useState<ModelResults | null>(null);
  const [flood, setFlood] = useState<FloodStats | null>(null);

  useEffect(() => {
    fetchModels().then(setModels).catch(() => setModels(null));
    fetchJson<FloodStats>("/flood/stats", "/data/flood_stats.json").then(setFlood).catch(() => setFlood(null));
  }, []);

  const dash = models?.dashboard;
  const topModel = [...(dash?.models ?? [])].sort(
    (a, b) => (b.accuracy ?? -Infinity) - (a.accuracy ?? -Infinity),
  )[0];
  const scenes = flood?.sentinel2.pin_indices?.dates ?? [];

  return (
    <AppShell crumb="OVERVIEW">
      <div className="relative overflow-hidden rounded-2xl border border-cyan-400/15 bg-gradient-to-br from-[#102b40] via-[#102033] to-[#111827] p-7 lg:p-10">
        <div className="relative max-w-2xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1.5 text-[10px] tracking-wider text-cyan-300">
            <Satellite size={13} />
            EARTH OBSERVATION · FLOOD RESEARCH
          </div>
          <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            Nepal Flood
            <span className="block text-cyan-300">Intelligence 2026</span>
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300">
            Multi-sensor assessment of the August 2026 flood in Timure, Rasuwa
            District, using Sentinel-1 SAR, Sentinel-2 optical observations,
            terrain context and exploratory machine learning.
          </p>
          <div className="mt-7 flex flex-wrap gap-5 text-xs text-slate-400">
            <span className="flex items-center gap-2">
              <Map size={15} className="text-cyan-300" />
              Timure, Rasuwa, Nepal
            </span>
            <span>Event window: 24–28 August 2026</span>
          </div>
        </div>
      </div>

      <StatusBanner title="CURRENT SCIENTIFIC STATUS">
        Model metrics are served statically from <code>model_results.json</code>.
        Sentinel-1 and Sentinel-2 pin tables are loaded from CSV. The API does
        not retrain classifiers on startup. The SAR change overlay remains a
        candidate inundation product, not a certified flood boundary.
      </StatusBanner>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "GROUND SAMPLES",
            value: String(dash?.dataset.n_samples ?? 45),
            detail: `${dash?.dataset.n_background ?? 30} background · ${dash?.dataset.n_flood ?? 15} flood`,
            icon: Database,
          },
          {
            label: "EVALUATION FEATURES",
            value: String(dash?.dataset.n_features ?? 0),
            detail: dash?.dataset.sentinel1_features
              ? `${dash.dataset.sentinel1_features} Sentinel-1 · ${dash.dataset.sentinel2_features ?? 0} Sentinel-2`
              : `${dash?.dataset.sentinel2_features ?? 0} Sentinel-2 optical change features`,
            icon: Layers3,
          },
          {
            label: "HIGHEST MEAN ACCURACY",
            value: topModel?.accuracy != null ? topModel.accuracy.toFixed(4) : "—",
            detail: `${topModel?.name ?? "No model results"} · exploratory repeated CV`,
            icon: Activity,
          },
          {
            label: "CANDIDATE AREA",
            value: flood?.candidate_area_km2 != null ? `${flood.candidate_area_km2.toFixed(2)} km²` : "—",
            detail: "SAR change mask, not a certified flood boundary",
            icon: Waves,
          },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border border-white/[0.07] bg-[#101a29] p-5">
            <div className="mb-5 flex items-center justify-between">
              <span className="text-[9px] font-semibold tracking-[1.5px] text-slate-500">{stat.label}</span>
              <stat.icon size={17} className="text-cyan-400" />
            </div>
            <div className="text-3xl font-semibold tracking-tight">{stat.value}</div>
            <p className="mt-2 text-[11px] text-slate-500">{stat.detail}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <div className="rounded-xl border border-white/[0.07] bg-[#101a29] p-5">
          <h3 className="text-sm font-semibold">Sentinel-2 pin-mean NDWI</h3>
          <p className="mt-1 text-[10px] text-slate-500">From s2_features.csv at labelled pins</p>
          <div className="mt-5 h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={scenes}>
                <CartesianGrid stroke="#263449" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" tick={{ fill: "#94a3b8", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#94a3b8", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: "#101a29", border: "1px solid #334155", borderRadius: 8, color: "#fff" }}
                />
                <Bar dataKey="ndwi_flood_mean" fill="#22d3ee" name="NDWI flood" />
                <Bar dataKey="ndwi_background_mean" fill="#64748b" name="NDWI background" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border border-white/[0.07] bg-[#101a29] p-5">
          <h3 className="text-sm font-semibold">Data sources</h3>
          <div className="mt-5 space-y-3">
            {[
              { name: "Sentinel-1 SAR", description: "18-band SNAP stack + pin samples · integrated", tag: "READY", icon: Waves },
              { name: "Sentinel-2 Optical", description: flood?.sentinel2.status === "integrated_from_s2_features.csv" ? "45-pin L2A table · NDWI/MNDWI" : flood?.sentinel2.reason ?? "Pending", tag: flood?.sentinel2.status?.startsWith("integrated") ? "READY" : "PENDING", icon: Satellite },
              { name: "Copernicus DEM", description: "Pin elevations via Open-Meteo if fetch succeeded", tag: "PARTIAL", icon: Mountain },
              { name: "EMSR927", description: flood?.emsr927?.note ?? "Not in repository", tag: "PENDING", icon: ShieldCheck },
            ].map((sensor) => (
              <div key={sensor.name} className="flex items-center gap-4 rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-300">
                  <sensor.icon size={19} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold">{sensor.name}</p>
                  <p className="mt-1 text-[10px] text-slate-500">{sensor.description}</p>
                </div>
                <span className="text-[9px] tracking-wider text-cyan-400">{sensor.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-sm font-semibold">Spatial assessment framework</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            { number: "01", name: "Source Zone", description: "Glacier, steep slopes, landslide and potential source processes — hypotheses, not confirmed causes.", href: "/map" },
            { number: "02", name: "Transport Corridor", description: "Lhende Khola and Bhote Koshi corridor, SAR water-extent change and sediment-related backscatter.", href: "/flood-mapping" },
            { number: "03", name: "Downstream Impact", description: "Settlements, roads, bridges and infrastructure exposure once EMSR927 or OSM context is available.", href: "/infrastructure" },
          ].map((zone) => (
            <Link key={zone.number} href={zone.href} className="rounded-xl border border-white/[0.07] bg-[#101a29] p-5 hover:border-cyan-400/25">
              <span className="text-xs font-bold text-cyan-300">ZONE {zone.number}</span>
              <h4 className="mt-3 text-sm font-semibold">{zone.name}</h4>
              <p className="mt-2 text-xs leading-6 text-slate-500">{zone.description}</p>
              <div className="mt-4 flex items-center gap-2 text-[10px] text-slate-400">
                Open module <ArrowUpRight size={13} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
