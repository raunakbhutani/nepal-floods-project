"use client";

import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import AppShell from "../components/AppShell";
import StatusBanner from "../components/StatusBanner";
import { fetchModels } from "../lib/api";
import type { ModelResults } from "../lib/types";

export default function ModelEvaluationPage() {
  const [data, setData] = useState<ModelResults | null>(null);
  useEffect(() => {
    fetchModels().then(setData).catch(() => setData(null));
  }, []);

  const dash = data?.dashboard;
  const scoreChart = (dash?.models ?? []).map((model) => ({
    name: model.name,
    accuracy: model.accuracy ?? 0,
    f1: model.f1 ?? 0,
  }));

  return (
    <AppShell crumb="MODEL EVALUATION">
      <StatusBanner title="PUBLISHED MODEL EVALUATION">
        {dash?.validation ?? "Validation details are not available."} Scores are
        read from <code>model_results.json</code>; they are not recomputed when
        the server starts. Treat repeated random splits as exploratory, not as
        independent or spatially held-out validation.
      </StatusBanner>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {(dash?.models ?? []).map((m) => (
          <div key={m.name} className="rounded-xl border border-white/[0.07] bg-[#101a29] p-5">
            <h4 className="text-xs font-semibold text-cyan-300">{m.name}</h4>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div>
                <p className="text-[10px] text-slate-500">Mean accuracy</p>
                <p className="mt-1 text-xl font-semibold">{m.accuracy != null ? m.accuracy.toFixed(3) : "—"}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500">Accuracy SD</p>
                <p className="mt-1 text-xl font-semibold">{m.accuracy_std != null ? m.accuracy_std.toFixed(3) : "—"}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500">Mean weighted F1</p>
                <p className="mt-1 text-xl font-semibold">{m.f1 != null ? m.f1.toFixed(3) : "—"}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500">Weighted F1 SD</p>
                <p className="mt-1 text-xl font-semibold">{m.f1_std != null ? m.f1_std.toFixed(3) : "—"}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {scoreChart.length > 0 && (
        <div className="rounded-xl border border-white/[0.07] bg-[#101a29] p-6">
          <h3 className="text-sm font-semibold">Mean scores across repeated stratified splits</h3>
          <div className="mt-5 h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={scoreChart}>
                <CartesianGrid stroke="#263449" strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 10 }} />
                <YAxis domain={[0, 1]} tick={{ fill: "#94a3b8", fontSize: 10 }} />
                <Tooltip contentStyle={{ background: "#101a29", border: "1px solid #334155", color: "#fff" }} />
                <Legend />
                <Bar dataKey="accuracy" fill="#64748b" name="Accuracy" />
                <Bar dataKey="f1" fill="#22d3ee" name="Weighted F1" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </AppShell>
  );
}
