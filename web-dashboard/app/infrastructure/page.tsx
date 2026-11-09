"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import AppShell from "../components/AppShell";
import StatusBanner from "../components/StatusBanner";
import type { PinElevation } from "../lib/types";

const ResearchMap = dynamic(() => import("../components/ResearchMap"), { ssr: false });

export default function InfrastructurePage() {
  const [elev, setElev] = useState<PinElevation[]>([]);
  const [osmStatus, setOsmStatus] = useState<string>("checking");

  useEffect(() => {
    fetch("/data/pin_elevations.json")
      .then((r) => (r.ok ? r.json() : []))
      .then(setElev)
      .catch(() => setElev([]));
    fetch("/data/context_status.json")
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => setOsmStatus(j ? `${j.status}${j.error ? `: ${j.error}` : ""}` : "missing"))
      .catch(() => setOsmStatus("missing"));
  }, []);

  const floodPins = elev.filter((e) => e.target === 1);

  return (
    <AppShell crumb="INFRASTRUCTURE">
      <StatusBanner title="EMSR927 NOT IN THE REPOSITORY">
        The Copernicus EMS Rapid Mapping package EMSR927_AOI02_GRA_PRODUCT_v2.gpkg
        was not present locally, so built-up, transport and facility layers from
        that product cannot be drawn. Grading layers must not be treated as a
        flood-water boundary even when they are available. OpenStreetMap context
        status: {osmStatus}.
      </StatusBanner>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-white/[0.07] bg-[#101a29] p-5">
          <p className="text-[10px] text-slate-500">EXPECTED EMSR LAYERS</p>
          <ul className="mt-3 space-y-1 text-[11px] text-slate-400">
            <li>builtUpP_v2 · 431 features (when file is restored)</li>
            <li>transportationL_v2 · 15 features</li>
            <li>facilitiesA_v2 · Rasuwagadhi Hydropower Dam</li>
            <li>observedEventA_v2 · 1 landslide reference</li>
          </ul>
        </div>
        <div className="rounded-xl border border-white/[0.07] bg-[#101a29] p-5">
          <p className="text-[10px] text-slate-500">FLOOD-PIN ELEVATIONS</p>
          <p className="mt-3 text-2xl font-semibold">{floodPins.length}</p>
          <p className="mt-2 text-[11px] text-slate-500">
            Labelled flood samples along the river corridor. These are training
            locations, not an asset inventory.
          </p>
        </div>
        <div className="rounded-xl border border-white/[0.07] bg-[#101a29] p-5">
          <p className="text-[10px] text-slate-500">NAMED FACILITY</p>
          <p className="mt-3 text-sm font-semibold">Rasuwagadhi Hydropower Dam</p>
          <p className="mt-2 text-[11px] text-slate-500">
            Recorded in EMSR927 metadata as a facility reference. Geometry is
            withheld here because the GeoPackage is missing.
          </p>
        </div>
      </div>

      <ResearchMap />
    </AppShell>
  );
}
