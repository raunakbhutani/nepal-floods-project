export type ModelCard = {
  name: string;
  accuracy: number | null;
  accuracy_std: number | null;
  f1: number | null;
  f1_std: number | null;
  cv_scores: number[];
  cv_mean: number | null;
  cv_std: number | null;
  avg_confidence: number | null;
  min_confidence: number | null;
};

export type DashboardView = {
  schema: string;
  project_title?: string | null;
  fusion_sources: string[];
  key_conclusion?: string | null;
  features?: string | null;
  validation?: string | null;
  dataset: {
    n_samples: number;
    n_background: number;
    n_flood: number;
    n_features: number;
    sentinel1_features?: number;
    sentinel2_features?: number;
  };
  models: ModelCard[];
  feature_importance: { feature: string; importance: number }[];
  majority_class_baseline_holdout?: Scores;
  limitations?: string[];
  raw_models?: Record<string, ModelBlock>;
};

export type ModelResults = {
  source_file: string;
  served_statically: boolean;
  raw: Record<string, unknown>;
  dashboard: DashboardView;
};

export type PredictionResponse = {
  name: string;
  lon: number;
  lat: number;
  class: number;
  label: string;
  method: string;
  model: string;
  published_confidence: number | null;
};

export type Scores = {
  accuracy: number;
  precision: number;
  recall: number;
  f1: number;
  roc_auc: number | null;
  confusion_matrix: number[][];
  n: number;
  n_flood: number;
  n_background: number;
};

export type ModelBlock = {
  holdout: Scores;
  cross_validation: {
    stratified_kfold: { folds: Scores[]; mean_f1: number | null; mean_accuracy: number | null; std_f1: number | null };
    spatial_group_kfold: { folds: Scores[]; mean_f1: number | null; mean_accuracy: number | null; std_f1: number | null };
  } | null;
};

export type S2IndexDate = {
  date_key: string;
  date: string;
  ndwi_flood_mean: number;
  ndwi_background_mean: number;
  mndwi_flood_mean: number | null;
  mndwi_background_mean: number | null;
};

export type FloodStats = {
  method?: string;
  downsample_factor?: number;
  threshold_log_ratio?: number;
  pin_f1_at_threshold?: number;
  candidate_flood_pixels?: number;
  candidate_area_km2?: number;
  bounds?: { west: number; south: number; east: number; north: number };
  band_pairing_note?: string;
  sentinel2: {
    status: string;
    reason: string;
    known_scenes: { date: string; cloud_full_scene_pct: number | null; note: string }[];
    pin_indices?: { status: string; n_samples: number; n_optical_bands: number; dates: S2IndexDate[] };
  };
  dem?: { status: string; intended_product: string };
  emsr927?: { status: string; note: string };
  pin_time_series_means?: {
    date: string;
    vv_flood_mean: number | null;
    vh_flood_mean: number | null;
    vv_background_mean: number | null;
    vh_background_mean: number | null;
  }[];
  dates?: { file: string; date: string; pol: string; role: string }[];
};

export type PinElevation = {
  name: string;
  target: number;
  lon: number;
  lat: number;
  elevation_m: number | null;
  dataset: string;
};
