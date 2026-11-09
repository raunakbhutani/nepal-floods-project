"use client";

import dynamic from "next/dynamic";
import AppShell from "../components/AppShell";
import StatusBanner from "../components/StatusBanner";

const ResearchMap = dynamic(() => import("../components/ResearchMap"), { ssr: false });

export default function MapPage() {
  return (
    <AppShell crumb="GIS MAP">
      <StatusBanner title="MAP LAYERS">
        Training pins come from SNAP exports. The cyan overlay is a downsampled
        Sentinel-1 log-ratio change mask (24 Aug vs 28 Aug 2026). Toggle Esri
        imagery and change intensity. The separate legacy Sentinel-1-only RF
        score overlay is not part of the current Sentinel-2 model comparison
        and is not a calibrated probability or validated flood-water polygon.
      </StatusBanner>
      <ResearchMap />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-white/[0.07] bg-[#101a29] p-5">
          <p className="text-[10px] tracking-wider text-slate-500">STUDY CENTRE</p>
          <p className="mt-2 text-sm font-semibold">28.254° N, 85.367° E</p>
          <p className="mt-2 text-[11px] text-slate-500">Timure, Rasuwa District, Nepal</p>
        </div>
        <div className="rounded-xl border border-white/[0.07] bg-[#101a29] p-5">
          <p className="text-[10px] tracking-wider text-slate-500">CYAN MARKERS</p>
          <p className="mt-2 text-sm font-semibold">Flood training pins</p>
          <p className="mt-2 text-[11px] text-slate-500">15 labelled river-corridor samples</p>
        </div>
        <div className="rounded-xl border border-white/[0.07] bg-[#101a29] p-5">
          <p className="text-[10px] tracking-wider text-slate-500">GREY MARKERS</p>
          <p className="mt-2 text-sm font-semibold">Background pins</p>
          <p className="mt-2 text-[11px] text-slate-500">30 labelled slope / land samples</p>
        </div>
      </div>
    </AppShell>
  );
}
