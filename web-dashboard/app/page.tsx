
"use client";

import {
  Activity,
  ArrowUpRight,
  BarChart3,
  BrainCircuit,
  CalendarDays,
  ChevronRight,
  Cloud,
  Database,
  Download,
  Globe2,
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
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const observations = [
  { date: "13 Jul", cloud: 95.20 },
  { date: "27 Aug", cloud: 78.47 },
];

const navigation = [
  { name: "Overview", icon: Globe2, active: true },
  { name: "Study Area", icon: Map },
  { name: "Satellite Intelligence", icon: Satellite },
  { name: "Flood Mapping", icon: Waves },
  { name: "Terrain Analysis", icon: Mountain },
  { name: "Machine Learning", icon: BrainCircuit },
  { name: "Model Evaluation", icon: BarChart3 },
  { name: "Research & Export", icon: Download },
];

const stats = [
  {
    label: "GROUND SAMPLES",
    value: "45",
    detail: "30 background · 15 flood",
    icon: Database,
  },
  {
    label: "OPTICAL OBSERVATIONS",
    value: "09",
    detail: "May – October 2026",
    icon: Satellite,
  },
  {
    label: "SPECTRAL FEATURES",
    value: "54",
    detail: "6 bands × 9 dates",
    icon: Layers3,
  },
  {
    label: "ANALYTICAL ZONES",
    value: "03",
    detail: "Source · Transport · Impact",
    icon: Activity,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#080e19] text-slate-100">
      <div className="flex min-h-screen">

        {/* SIDEBAR */}
        <aside className="hidden w-[250px] shrink-0 border-r border-white/[0.07] bg-[#0b1321] px-5 py-7 lg:flex lg:flex-col">
          <div className="mb-10 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
              <Waves size={23} />
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-wide">NEPAL FLOOD</h1>
              <p className="text-[10px] tracking-[3px] text-cyan-400">INTELLIGENCE</p>
            </div>
          </div>

          <p className="mb-3 text-[10px] font-semibold tracking-[2px] text-slate-500">
            RESEARCH PLATFORM
          </p>

          <nav className="space-y-1">
            {navigation.map((item) => (
              <a
                key={item.name}
                href="#"
                className={`flex items-center gap-3 rounded-lg px-3 py-3 text-xs transition ${
                  item.active
                    ? "border border-cyan-400/20 bg-cyan-400/10 text-cyan-300"
                    : "text-slate-400 hover:bg-white/[0.04] hover:text-white"
                }`}
              >
                <item.icon size={16} />
                {item.name}
                {item.active && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-cyan-400" />
                )}
              </a>
            ))}
          </nav>

          <div className="mt-auto rounded-xl border border-white/[0.07] bg-white/[0.025] p-4">
            <div className="mb-2 flex items-center gap-2 text-cyan-300">
              <ShieldCheck size={15} />
              <span className="text-xs font-semibold">Research workspace</span>
            </div>
            <p className="text-[11px] leading-5 text-slate-500">
              Timure, Rasuwa District, Nepal
            </p>
            <p className="mt-3 text-[10px] text-slate-600">
              MULTI-SENSOR FLOOD STUDY · 2026
            </p>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <section className="min-w-0 flex-1">

          {/* TOP BAR */}
          <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.07] px-6 py-5 lg:px-9">
            <div>
              <div className="mb-1 flex items-center gap-2 text-[10px] text-slate-500">
                RESEARCH / NEPAL / TIMURE
                <ChevronRight size={12} />
                OVERVIEW
              </div>
              <h2 className="text-lg font-semibold tracking-wide">
                Geospatial Intelligence Dashboard
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.07] px-3 py-2 text-[10px] text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                LOCAL WORKSPACE
              </span>
              <span className="hidden text-xs text-slate-500 sm:block">
                NOVEMBER 2026
              </span>
            </div>
          </header>

          <div className="space-y-7 px-5 py-7 lg:px-9">

            {/* HERO */}
            <div className="relative overflow-hidden rounded-2xl border border-cyan-400/15 bg-gradient-to-br from-[#102b40] via-[#102033] to-[#111827] p-7 lg:p-10">
              <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full border border-cyan-300/10" />
              <div className="pointer-events-none absolute -right-4 -top-12 h-52 w-52 rounded-full border border-cyan-300/10" />

              <div className="relative max-w-2xl">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1.5 text-[10px] tracking-wider text-cyan-300">
                  <Satellite size={13} />
                  EARTH OBSERVATION · FLOOD RESEARCH
                </div>

                <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                  Nepal Flood
                  <span className="block text-cyan-300">
                    Intelligence 2026
                  </span>
                </h1>

                <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300">
                  Multi-sensor assessment of the August 2026 flood event
                  in the Timure region, Rasuwa District, Nepal, using
                  satellite remote sensing, terrain analysis and machine learning.
                </p>

                <div className="mt-7 flex flex-wrap gap-5 text-xs text-slate-400">
                  <span className="flex items-center gap-2">
                    <Map size={15} className="text-cyan-300" />
                    Timure, Rasuwa, Nepal
                  </span>
                  <span className="flex items-center gap-2">
                    <CalendarDays size={15} className="text-cyan-300" />
                    Event: 26 August 2026
                  </span>
                </div>
              </div>
            </div>

            {/* STATISTICS */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-semibold">Research at a glance</h3>
                <span className="text-[10px] tracking-wider text-slate-500">
                  PROJECT DATA
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-white/[0.07] bg-[#101a29] p-5 transition hover:border-cyan-400/25"
                  >
                    <div className="mb-5 flex items-center justify-between">
                      <span className="text-[9px] font-semibold tracking-[1.5px] text-slate-500">
                        {stat.label}
                      </span>
                      <stat.icon size={17} className="text-cyan-400" />
                    </div>
                    <div className="text-3xl font-semibold tracking-tight">
                      {stat.value}
                    </div>
                    <p className="mt-2 text-[11px] text-slate-500">
                      {stat.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* ANALYSIS GRID */}
            <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">

              {/* OBSERVATIONS CHART */}
              <div className="rounded-xl border border-white/[0.07] bg-[#101a29] p-5">
                <div className="mb-2 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold">
                      Sentinel-2 scene observations
                    </h3>
                    <p className="mt-1 text-[10px] text-slate-500">
                      Full-scene cloud cover · Selected dates
                    </p>
                  </div>
                  <Satellite size={18} className="text-cyan-400" />
                </div>

                <div className="mt-5 h-[220px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={observations}>
                      <CartesianGrid
                        stroke="#263449"
                        strokeDasharray="3 3"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="date"
                        tick={{ fill: "#94a3b8", fontSize: 11 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        domain={[0, 100]}
                        tick={{ fill: "#94a3b8", fontSize: 10 }}
                        axisLine={false}
                        tickLine={false}
                        unit="%"
                      />
                      <Tooltip
                        contentStyle={{
                          background: "#101a29",
                          border: "1px solid #334155",
                          borderRadius: 8,
                          color: "#fff",
                        }}
                        formatter={(value) => [
                          `${Number(value).toFixed(2)}%`,
                          "Cloud cover",
                        ]}
                      />
                      <Bar dataKey="cloud" radius={[5, 5, 0, 0]}>
                        {observations.map((entry) => (
                          <Cell
                            key={entry.date}
                            fill="#22d3ee"
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <p className="mt-3 text-[10px] leading-5 text-slate-500">
                  These percentages represent whole Sentinel-2 scenes,
                  not cloud cover calculated specifically over the study area.
                </p>
              </div>

              {/* SENSOR OVERVIEW */}
              <div className="rounded-xl border border-white/[0.07] bg-[#101a29] p-5">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold">
                      Multi-sensor framework
                    </h3>
                    <p className="mt-1 text-[10px] text-slate-500">
                      Research data sources
                    </p>
                  </div>
                  <Layers3 size={18} className="text-cyan-400" />
                </div>

                <div className="space-y-3">
                  {[
                    {
                      name: "Sentinel-1 SAR",
                      description: "VV / VH · Radar backscatter",
                      icon: Waves,
                      tag: "RADAR",
                    },
                    {
                      name: "Sentinel-2 Optical",
                      description: "Multispectral surface reflectance",
                      icon: Satellite,
                      tag: "OPTICAL",
                    },
                    {
                      name: "Copernicus DEM",
                      description: "Elevation · Slope · Terrain",
                      icon: Mountain,
                      tag: "TERRAIN",
                    },
                    {
                      name: "EMSR927",
                      description: "Reference damage assessment",
                      icon: ShieldCheck,
                      tag: "REFERENCE",
                    },
                  ].map((sensor) => (
                    <div
                      key={sensor.name}
                      className="flex items-center gap-4 rounded-lg border border-white/[0.06] bg-white/[0.02] p-4"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-300">
                        <sensor.icon size={19} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold">
                          {sensor.name}
                        </p>
                        <p className="mt-1 text-[10px] text-slate-500">
                          {sensor.description}
                        </p>
                      </div>
                      <span className="text-[9px] tracking-wider text-cyan-400">
                        {sensor.tag}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ANALYTICAL ZONES */}
            <div>
              <h3 className="mb-4 text-sm font-semibold">
                Spatial assessment framework
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {[
                  {
                    number: "01",
                    name: "Source Zone",
                    description:
                      "Glacier, steep slopes, landslide and potential source processes.",
                    color: "text-amber-300",
                  },
                  {
                    number: "02",
                    name: "Transport Corridor",
                    description:
                      "Lhende Khola and Bhote Koshi river corridor and sediment transport.",
                    color: "text-cyan-300",
                  },
                  {
                    number: "03",
                    name: "Downstream Impact",
                    description:
                      "Water expansion, erosion, settlements, roads and infrastructure.",
                    color: "text-emerald-300",
                  },
                ].map((zone) => (
                  <div
                    key={zone.number}
                    className="rounded-xl border border-white/[0.07] bg-[#101a29] p-5"
                  >
                    <span className={`text-xs font-bold ${zone.color}`}>
                      ZONE {zone.number}
                    </span>
                    <h4 className="mt-3 text-sm font-semibold">
                      {zone.name}
                    </h4>
                    <p className="mt-2 text-xs leading-6 text-slate-500">
                      {zone.description}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-[10px] text-slate-400">
                      Explore assessment
                      <ArrowUpRight size={13} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FOOTER */}
            <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.07] pt-5 text-[10px] text-slate-600">
              <span>NEPAL FLOOD INTELLIGENCE · RESEARCH WORKSPACE</span>
              <span>Timure, Rasuwa District, Nepal</span>
            </footer>
          </div>
        </section>
      </div>
    </main>
  );
}
