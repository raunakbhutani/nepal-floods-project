"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  BrainCircuit,
  Download,
  Globe2,
  Map,
  Mountain,
  Satellite,
  ShieldCheck,
  Waves,
  Building2,
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const NAV = [
  { href: "/", name: "Overview", icon: Globe2 },
  { href: "/map", name: "GIS Map", icon: Map },
  { href: "/satellite", name: "Satellite Intelligence", icon: Satellite },
  { href: "/flood-mapping", name: "Flood Mapping", icon: Waves },
  { href: "/terrain", name: "Terrain & Hydrology", icon: Mountain },
  { href: "/machine-learning", name: "Machine Learning", icon: BrainCircuit },
  { href: "/model-evaluation", name: "Model Evaluation", icon: BarChart3 },
  { href: "/infrastructure", name: "Infrastructure", icon: Building2 },
  { href: "/research", name: "Research Reports", icon: Download },
];

export default function AppShell({
  children,
  crumb,
}: {
  children: ReactNode;
  crumb: string;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#080e19] text-slate-100">
      <div className="flex min-h-screen">
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
            {NAV.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-3 text-xs transition ${
                    active
                      ? "border border-cyan-400/20 bg-cyan-400/10 text-cyan-300"
                      : "text-slate-400 hover:bg-white/[0.04] hover:text-white"
                  }`}
                >
                  <item.icon size={16} />
                  {item.name}
                </Link>
              );
            })}
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

        <section className="min-w-0 flex-1">
          <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.07] px-6 py-5 lg:px-9">
            <div>
              <div className="mb-1 text-[10px] text-slate-500">
                RESEARCH / NEPAL / TIMURE / {crumb}
              </div>
              <h2 className="text-lg font-semibold tracking-wide">
                Geospatial Intelligence Dashboard
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <ThemeToggle />
              <span className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.07] px-3 py-2 text-[10px] text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                LOCAL WORKSPACE
              </span>
            </div>
          </header>
          <nav aria-label="Main navigation" className="flex flex-wrap gap-2 border-b border-white/[0.07] px-4 py-3 lg:hidden">
            {NAV.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-xs transition ${
                    active
                      ? "border border-cyan-300/20 bg-cyan-300/10 text-cyan-100"
                      : "text-slate-400 hover:bg-white/[0.05] hover:text-white"
                  }`}
                >
                  <item.icon size={14} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
          <div className="space-y-7 px-5 py-7 lg:px-9">{children}</div>
        </section>
      </div>
    </div>
  );
}
