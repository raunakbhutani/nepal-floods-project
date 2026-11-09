"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Activity, LoaderCircle, Play, Wifi, WifiOff } from "lucide-react";
import { API_BASE, fetchJson } from "../lib/api";
import type { ModelResults, PredictionResponse } from "../lib/types";

type PinCollection = {
  features: Array<{
    properties: {
      name: string;
      label: string;
      target: number;
      lon: number;
      lat: number;
    };
  }>;
};

function pinKey(pin: PinCollection["features"][number]) {
  const { name, target, lon, lat } = pin.properties;
  return `${name}-${target}-${lon}-${lat}`;
}

export default function PredictionWorkbench({ models }: { models: ModelResults | null }) {
  const [pins, setPins] = useState<PinCollection["features"]>([]);
  const [selectedPin, setSelectedPin] = useState("");
  const [requestedModel, setRequestedModel] = useState("");
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [loadingPins, setLoadingPins] = useState(true);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiOnline, setApiOnline] = useState(false);

  useEffect(() => {
    let active = true;
    fetch(`${API_BASE}/pins`, { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) throw new Error(`API returned ${response.status}`);
        return (await response.json()) as PinCollection;
      })
      .then((collection) => {
        if (!active) return;
        setPins(collection.features);
        setSelectedPin(collection.features[0] ? pinKey(collection.features[0]) : "");
        setApiOnline(true);
      })
      .catch(async () => {
        if (!active) return;
        setApiOnline(false);
        try {
          const collection = await fetchJson<PinCollection>("/pins", "/data/pins.geojson");
          if (!active) return;
          setPins(collection.features);
          setSelectedPin(collection.features[0] ? pinKey(collection.features[0]) : "");
        } catch (cause) {
          if (!active) return;
          setError(cause instanceof Error ? cause.message : "Could not load labelled pins.");
        }
      })
      .finally(() => {
        if (active) setLoadingPins(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const modelOptions = models?.dashboard.models ?? [];
  const selectedModel = modelOptions.some((model) => model.name === requestedModel)
    ? requestedModel
    : modelOptions[0]?.name ?? "";

  async function runPrediction(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setRunning(true);
    setError(null);
    setResult(null);

    try {
      const pin = pins.find((candidate) => pinKey(candidate) === selectedPin);
      if (!pin) throw new Error("Select a valid labelled pin before running the test.");
      const response = await fetch(`${API_BASE}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lon: pin.properties.lon,
          lat: pin.properties.lat,
          model: selectedModel,
        }),
      });
      const payload = (await response.json()) as PredictionResponse | { detail?: string };
      if (!response.ok) {
        throw new Error("detail" in payload ? payload.detail ?? "Prediction request failed." : "Prediction request failed.");
      }
      setResult(payload as PredictionResponse);
      setApiOnline(true);
    } catch (cause) {
      setApiOnline(false);
      setError(cause instanceof Error ? cause.message : "Prediction request failed.");
    } finally {
      setRunning(false);
    }
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-cyan-300/15 bg-gradient-to-br from-[#10263a] via-[#101a29] to-[#101a29] shadow-[0_24px_70px_rgba(2,8,23,0.28)]">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/[0.07] px-5 py-5 sm:px-7">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-300/15 bg-cyan-300/10 text-cyan-200">
            <Activity size={19} />
          </div>
          <div>
            <p className="text-[10px] font-semibold tracking-[0.18em] text-cyan-200/80">LIVE API TEST</p>
            <h2 className="mt-1 text-base font-semibold text-white">Try a labelled-pin lookup</h2>
            <p className="mt-1 max-w-xl text-xs leading-5 text-slate-400">
              Send a real request to <code className="text-cyan-100">POST /predict</code>. This is a nearest-pin lookup, not model inference.
            </p>
          </div>
        </div>
        <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-medium ${apiOnline ? "border-emerald-300/20 bg-emerald-300/[0.07] text-emerald-200" : "border-amber-300/20 bg-amber-300/[0.07] text-amber-100"}`}>
          {apiOnline ? <Wifi size={13} /> : <WifiOff size={13} />}
          {apiOnline ? "API CONNECTED" : "API OFFLINE"}
        </span>
      </div>

      <div className="grid gap-5 p-5 sm:p-7 lg:grid-cols-[minmax(0,1fr)_minmax(260px,0.8fr)]">
        <form className="space-y-4" onSubmit={runPrediction}>
          <label className="block">
            <span className="mb-2 block text-[11px] font-medium text-slate-300">Labelled sample</span>
            <select
              className="w-full rounded-xl border border-white/10 bg-[#0b1321] px-3 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-300/50 focus:ring-2 focus:ring-cyan-300/10 disabled:opacity-50"
              value={selectedPin}
              onChange={(event) => setSelectedPin(event.target.value)}
              disabled={loadingPins || pins.length === 0}
              required
            >
              {pins.map((pin) => (
                <option key={pinKey(pin)} value={pinKey(pin)}>
                  {pin.properties.label} · {pin.properties.name} · {pin.properties.lat.toFixed(4)}°N, {pin.properties.lon.toFixed(4)}°E
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-2 block text-[11px] font-medium text-slate-300">Published model result</span>
            <select
              className="w-full rounded-xl border border-white/10 bg-[#0b1321] px-3 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-300/50 focus:ring-2 focus:ring-cyan-300/10"
              value={selectedModel}
              onChange={(event) => setRequestedModel(event.target.value)}
            >
              {modelOptions.map((model) => (
                <option key={model.name} value={model.name}>{model.name}</option>
              ))}
            </select>
          </label>

          <button
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-300 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-100/70 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            type="submit"
            disabled={running || loadingPins || pins.length === 0 || !selectedPin}
          >
            {running ? <LoaderCircle className="animate-spin" size={16} /> : <Play size={15} />}
            {running ? "Sending request…" : "Run API test"}
          </button>
        </form>

        <div aria-live="polite" className="min-h-36 rounded-xl border border-white/[0.07] bg-[#0b1321]/75 p-4">
          {error ? (
            <div className="text-sm text-rose-200">
              <p className="font-semibold">Request not completed</p>
              <p className="mt-2 break-words text-xs leading-5 text-rose-100/75">{error}</p>
              <p className="mt-2 text-[10px] text-slate-500">Check that the API is running at {API_BASE}.</p>
            </div>
          ) : result ? (
            <div>
              <p className="text-[10px] font-semibold tracking-[0.16em] text-emerald-200">RESPONSE RECEIVED</p>
              <div className="mt-3 flex items-center justify-between gap-3">
                <span className="text-sm font-semibold text-white">{result.name}</span>
                <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase ${result.label === "flood" ? "bg-cyan-300/10 text-cyan-200" : "bg-slate-300/10 text-slate-200"}`}>
                  {result.label}
                </span>
              </div>
              <p className="mt-3 text-xs text-slate-400">{result.model} · {result.method.replaceAll("_", " ")}</p>
              <p className="mt-3 text-xs text-slate-300">
                Published confidence:{" "}
                <span className="font-semibold text-cyan-200">
                  {result.published_confidence == null ? "not provided for this model" : `${(result.published_confidence * 100).toFixed(2)}%`}
                </span>
              </p>
            </div>
          ) : (
            <div className="flex h-full min-h-28 flex-col justify-center">
              <p className="text-xs font-medium text-slate-300">{loadingPins ? "Loading labelled pins…" : "Ready when you are"}</p>
              <p className="mt-1 text-[11px] leading-5 text-slate-500">
                Choose a pin and model to inspect the response and published confidence.
                {!apiOnline && pins.length > 0 ? " Pins are loaded from the offline copy." : ""}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
