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
            <div className="mt-4">
              <div>
                <p className="text-[10px] text-slate-500">Mean accuracy</p>
                <p className="mt-1 text-xl font-semibold">{m.accuracy != null ? m.accuracy.toFixed(3) : "—"}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {scoreChart.length > 0 && (
        <div className="rounded-xl border border-white/[0.07] bg-[#101a29] p-6">
          <h3 className="text-sm font-semibold">Mean accuracy across repeated stratified splits</h3>
          <div className="mt-5 h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={scoreChart}>
                <CartesianGrid stroke="#263449" strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 10 }} />
                <YAxis domain={[0, 1]} tick={{ fill: "#94a3b8", fontSize: 10 }} />
                <Tooltip contentStyle={{ background: "#101a29", border: "1px solid #334155", color: "#fff" }} />
                <Bar dataKey="accuracy" fill="#64748b" name="Accuracy" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </AppShell>
  );
}
