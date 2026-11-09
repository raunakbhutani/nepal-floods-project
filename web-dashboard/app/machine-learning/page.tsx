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
import PredictionWorkbench from "../components/PredictionWorkbench";
import StatusBanner from "../components/StatusBanner";
import { fetchModels } from "../lib/api";
import type { ModelResults } from "../lib/types";

export default function MachineLearningPage() {
  const [data, setData] = useState<ModelResults | null>(null);
  useEffect(() => {
    fetchModels().then(setData).catch(() => setData(null));
  }, []);

  const dash = data?.dashboard;
  const topModel = [...(dash?.models ?? [])].sort(
    (a, b) => (b.accuracy ?? -Infinity) - (a.accuracy ?? -Infinity),
  )[0];
  const rows = (dash?.models ?? []).map((m) => ({
    name: m.name.replace("Support Vector Machine (SVM)", "SVM").replace("Deep Learning MLP", "MLP"),
    f1: m.f1 ?? 0,
    acc: m.accuracy ?? 0,
  }));
  const importance = dash?.feature_importance ?? [];

  return (
    <AppShell crumb="MACHINE LEARNING">
      <StatusBanner title="STATIC MODEL COMPARISON RESULTS">
        Metrics are read from <code>model_results.json</code>
        {data?.source_file ? ` (${data.source_file})` : ""}. The API does not retrain
        models on startup. Features: {dash?.features ?? dash?.fusion_sources.join(" · ") ?? "Not specified"}.
        {" "}{dash?.validation}
      </StatusBanner>

      <PredictionWorkbench models={data} />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="rounded-xl border border-white/[0.07] bg-[#101a29] p-5">
          <p className="text-[10px] text-slate-500">SAMPLES</p>
          <p className="mt-2 text-2xl font-semibold">{dash?.dataset.n_samples ?? "—"}</p>
        </div>
        <div className="rounded-xl border border-white/[0.07] bg-[#101a29] p-5">
          <p className="text-[10px] text-slate-500">EVALUATION FEATURES</p>
          <p className="mt-2 text-2xl font-semibold">{dash?.dataset.n_features ?? "—"}</p>
          <p className="mt-1 text-[10px] text-slate-500">
            {dash?.dataset.sentinel1_features
              ? `Sentinel-1 ${dash.dataset.sentinel1_features} · Sentinel-2 ${dash.dataset.sentinel2_features ?? 0}`
              : `${dash?.dataset.sentinel2_features ?? 0} Sentinel-2 optical features`}
          </p>
        </div>
        <div className="rounded-xl border border-white/[0.07] bg-[#101a29] p-5">
          <p className="text-[10px] text-slate-500">CLASS SPLIT</p>
          <p className="mt-2 text-2xl font-semibold">
            {dash ? `${dash.dataset.n_background}:${dash.dataset.n_flood}` : "—"}
          </p>
        </div>
        <div className="rounded-xl border border-white/[0.07] bg-[#101a29] p-5">
          <p className="text-[10px] text-slate-500">HIGHEST MEAN ACCURACY</p>
          <p className="mt-2 text-2xl font-semibold">
            {topModel?.accuracy != null ? `${(topModel.accuracy * 100).toFixed(2)}%` : "—"}
          </p>
          <p className="mt-1 text-[10px] text-slate-500">
            {topModel?.name ?? "No model results"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {(dash?.models ?? []).map((m) => (
          <div key={m.name} className="rounded-xl border border-white/[0.07] bg-[#101a29] p-5">
            <p className="text-xs font-semibold text-cyan-300">{m.name}</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div>
                <p className="text-[10px] text-slate-500">Mean accuracy</p>
                <p className="text-2xl font-semibold">{m.accuracy != null ? `${(m.accuracy * 100).toFixed(2)}%` : "—"}</p>
                <p className="text-[10px] text-slate-500">SD {m.accuracy_std != null ? m.accuracy_std.toFixed(4) : "—"}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500">Mean weighted F1</p>
                <p className="text-2xl font-semibold">{m.f1 != null ? `${(m.f1 * 100).toFixed(2)}%` : "—"}</p>
                <p className="text-[10px] text-slate-500">SD {m.f1_std != null ? m.f1_std.toFixed(4) : "—"}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-white/[0.07] bg-[#101a29] p-6">
        <h3 className="text-sm font-semibold">Mean accuracy / weighted F1</h3>
        <div className="mt-5 h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={rows}>
              <CartesianGrid stroke="#263449" strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 10 }} />
              <YAxis domain={[0, 1]} tick={{ fill: "#94a3b8", fontSize: 10 }} />
              <Tooltip contentStyle={{ background: "#101a29", border: "1px solid #334155", color: "#fff" }} />
              <Bar dataKey="f1" fill="#22d3ee" name="F1" />
              <Bar dataKey="acc" fill="#64748b" name="Accuracy" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {importance.length > 0 ? (
        <div className="rounded-xl border border-white/[0.07] bg-[#101a29] p-6">
          <h3 className="text-sm font-semibold">Random Forest feature importance</h3>
          <div className="mt-4 space-y-2">
            {importance.slice(0, 12).map((f) => (
              <div key={f.feature} className="flex items-center gap-3 text-[11px]">
                <div className="w-48 truncate text-slate-400">{f.feature}</div>
                <div className="h-2 flex-1 rounded bg-white/5">
                  <div className="h-2 rounded bg-cyan-400" style={{ width: `${Math.min(100, f.importance * 400)}%` }} />
                </div>
                <div className="w-16 text-right text-cyan-300">{f.importance.toFixed(3)}</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-white/[0.07] bg-[#101a29] p-6">
          <h3 className="text-sm font-semibold">Feature importance unavailable</h3>
          <p className="mt-2 text-[11px] text-slate-400">
            No feature-importance values are included in this model comparison;
            none are inferred from another model run.
          </p>
        </div>
      )}

      {dash?.key_conclusion && (
        <div className="rounded-xl border border-white/[0.07] bg-[#101a29] p-6 text-[12px] leading-7 text-slate-400">
          {dash.key_conclusion}
        </div>
      )}
    </AppShell>
  );
}
