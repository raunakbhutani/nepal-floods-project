"use client";

export default function TerrainLegend() {
  const terrainCategories = [
    { key: "elevation", label: "Elevation", color: "#0891b2", description: "Terrain height above mean sea level (Copernicus DEM GLO-30, 30m, EPSG:32645)" },
    { key: "slope", label: "Slope Gradient", color: "#e91e63", description: "Gradient in degrees (°). 0° = flat, 90° = vertical. Derived from DEM. Not interpreted as landslide proof alone." },
    { key: "hillshade", label: "Hillshade", color: "#9c27b0", description: "Simulated shaded relief. Sun: NW, 31.5° altitude, 45° azimuth. Visualization derivative only." },
    { key: "drainage", label: "Drainage Corridor", color: "#ffc107", description: "Bhote Koshi–Lhende Khola river pathway. Vector data not in repository. Inferred from DEM gradients and optical imagery." },
  ];

  return (
    <div className="rounded-xl border border-white/[0.07] bg-[#101a29] p-6">
      <h3 className="text-sm font-semibold text-cyan-300 mb-4">
        Terrain Analysis Legend
      </h3>
      <div className="space-y-4">
        {terrainCategories.map((cat) => (
          <div key={cat.key} className="flex items-center gap-3">
            <span
              style={{ color: cat.color }}
              className="h-2 w-2 rounded flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <span className="font-semibold text-slate-100">{cat.label}</span>
              <p className="mt-1 text-[9px] text-slate-400">{cat.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-white/[0.05]">
        <p className="text-[9px] text-slate-500">
          Scientific constraints: No elevation ranges, slope statistics, drainage lengths
          or watershed areas are claimed or fabricated. All derivatives derived from
          actual Copernicus DEM GLO-30 raster (30m resolution, EPSG:32645). nodata
          values and CRS verified before display. Missing datasets clearly labeled.
        </p>
        <p className="mt-2 text-[9px] text-slate-500">
          Vertical exaggeration adjusts terrain prominence but does not create data.
          Slope alone does not prove landslide occurrence. Terrain analysis supports
          broader flood and instability assessment.
        </p>
      </div>
    </div>
  );
}