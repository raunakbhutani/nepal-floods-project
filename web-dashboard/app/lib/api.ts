import type { DashboardView, ModelCard, ModelResults } from "./types";

export const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";

export async function fetchJson<T>(path: string, fallback: string): Promise<T> {
  try {
    const live = await fetch(`${API_BASE}${path}`, { cache: "no-store" });
    if (live.ok) return (await live.json()) as T;
  } catch {
    // Backend may not be running; use static pipeline outputs.
  }
  const local = await fetch(fallback, { cache: "no-store" });
  if (!local.ok) {
    throw new Error(`Failed to load ${path} and ${fallback}`);
  }
  return (await local.json()) as T;
}

function cardFromNotebook(name: string, block: Record<string, unknown>): ModelCard {
  return {
    name,
    accuracy: num(block.accuracy),
    accuracy_std: num(block.accuracy_std),
    f1: num(block.f1_score ?? block.f1),
    f1_std: num(block.f1_std),
    cv_scores: Array.isArray(block.cv_scores) ? (block.cv_scores as number[]) : [],
    cv_mean: num(block.cv_mean),
    cv_std: num(block.cv_std),
    avg_confidence: num(block.avg_confidence),
    min_confidence: num(block.min_confidence),
  };
}

function num(value: unknown): number | null {
  return typeof value === "number" ? value : null;
}

export function normalizeModelResults(payload: unknown): ModelResults {
  const data = payload as Record<string, unknown>;
  if (data && data.dashboard && data.raw) {
    return data as unknown as ModelResults;
  }

  const stats = (data.dataset_stats as Record<string, number> | undefined) ?? {};
  const models = (data.models as Record<string, Record<string, unknown>> | undefined) ?? {};
  const dashboard: DashboardView = {
    schema: "notebook",
    project_title: (data.project_title as string) ?? null,
    fusion_sources: (data.fusion_sources as string[]) ?? [],
    key_conclusion: (data.key_conclusion as string) ?? null,
    features: (data.features as string) ?? null,
    validation: (data.validation as string) ?? null,
    dataset: {
      n_samples: stats.total_samples ?? 45,
      n_background: stats.background_pins ?? 30,
      n_flood: stats.flood_pins ?? 15,
      n_features: stats.total_features ?? 0,
      sentinel1_features: stats.sentinel1_features ?? 0,
      sentinel2_features: stats.sentinel2_features ?? 0,
    },
    models: Object.entries(models).map(([name, block]) => cardFromNotebook(name, block)),
    feature_importance:
      (data.random_forest_feature_importance as DashboardView["feature_importance"]) ??
      (data.feature_importance as DashboardView["feature_importance"]) ??
      [],
  };

  return {
    source_file: "model_results.json",
    served_statically: true,
    raw: data,
    dashboard,
  };
}

export async function fetchModels(): Promise<ModelResults> {
  const payload = await fetchJson<unknown>("/models", "/data/model_results.json");
  return normalizeModelResults(payload);
}
