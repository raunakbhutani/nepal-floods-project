"use client";

import { useEffect, useState } from "react";
import AppShell from "../components/AppShell";
import StatusBanner from "../components/StatusBanner";
import { fetchJson, fetchModels } from "../lib/api";
import type { FloodStats, ModelResults } from "../lib/types";

export default function ResearchPage() {
  const [models, setModels] = useState<ModelResults | null>(null);
  const [flood, setFlood] = useState<FloodStats | null>(null);

  useEffect(() => {
    fetchModels().then(setModels).catch(() => setModels(null));
    fetchJson<FloodStats>("/flood/stats", "/data/flood_stats.json").then(setFlood).catch(() => setFlood(null));
  }, []);

  function downloadJson() {
    const blob = new Blob(
      [JSON.stringify({ models, flood, exported_at: new Date().toISOString() }, null, 2)],
      { type: "application/json" }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "nepal-flood-2026-research-export.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  const dash = models?.dashboard;
  const topModel = [...(dash?.models ?? [])].sort(
    (a, b) => (b.accuracy ?? -Infinity) - (a.accuracy ?? -Infinity),
  )[0];

  return (
    <AppShell crumb="RESEARCH REPORTS">
      <StatusBanner title="STATIC RESEARCH EXPORT">
        Figures below are copied from <code>model_results.json</code> and the pin
        CSVs. The backend does not retrain on startup.
      </StatusBanner>

      <div className="rounded-xl border border-white/[0.07] bg-[#101a29] p-6">
        <h3 className="text-sm font-semibold">Study</h3>
        <p className="mt-3 text-[12px] leading-7 text-slate-300">
          Multi-sensor flood mapping in the Timure / Rasuwa gorge using Sentinel-1
          SAR and Sentinel-2 optical observations. The model comparison shown here
          uses Sentinel-2 change features only; SAR products are a separate analysis.
          Event window 24–28 August 2026. Analytical zones: source, transport corridor,
          downstream impact.
        </p>
      </div>

      <div className="rounded-xl border border-white/[0.07] bg-[#101a29] p-6">
        <h3 className="text-sm font-semibold">Results that can currently be defended</h3>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-[12px] leading-7 text-slate-400">
          <li>
            {dash?.dataset.n_samples ?? 45} labelled samples ({dash?.dataset.n_background ?? 30} background, {dash?.dataset.n_flood ?? 15} flood) and {dash?.dataset.n_features ?? 0} evaluated features. {dash?.features}
          </li>
          <li>
            {dash?.validation} Highest reported mean accuracy: {topModel?.name ?? "—"} ({topModel?.accuracy?.toFixed(4) ?? "—"}); weighted F1: {topModel?.f1?.toFixed(4) ?? "—"}.
          </li>
          <li>
            Candidate SAR inundation area = {flood?.candidate_area_km2 != null ? `${flood.candidate_area_km2.toFixed(3)} km²` : "—"}.
          </li>
          <li>
            Sentinel-2 pin table status: {flood?.sentinel2.status ?? "—"}.
          </li>
        </ul>
      </div>

      <div className="rounded-xl border border-white/[0.07] bg-[#101a29] p-6">
        <h3 className="text-sm font-semibold">Method in brief</h3>
        <p className="mt-3 text-[12px] leading-7 text-slate-400">
          For the displayed model comparison, six Sentinel-2 band differences and
          the MNDWI difference between 24 and 27 August were evaluated with a
          decision tree, RBF SVM and MLP using repeated stratified 2-fold CV
          (10 repeats). This evaluation is not spatially held out. SAR log-ratio
          change detection is a separate candidate product, not a validated flood
          boundary.
        </p>
      </div>

      <button
        type="button"
        onClick={downloadJson}
        className="rounded-lg border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-xs text-cyan-300"
      >
        Download JSON evidence pack
      </button>
    </AppShell>
  );
}
