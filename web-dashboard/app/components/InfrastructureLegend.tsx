// @ts-nocheck
"use client";

export default function InfrastructureLegend() {
  const infrastructureLayers = [
    { key: "built-up", label: "Built-Up Features (EMSR927 builtUpP_v2)", count: "431 (expected)", status: "unavailable", description: "Settlement inventory. No 'damaged' status claimed without field verification." },
    { key: "transportation", label: "Transportation Networks (EMSR927 transportationL_v2 + transportationP_v2)", count: "15 lines + 1 point (expected)", status: "unavailable", description: "Roads and corridors. 15 line features + 1 point feature. CRS EPSG:32645." },
    { key: "facilities", label: "Facilities (EMSR927 facilitiesA_v2)", count: "Includes Rasuwagadhi Hydropower Dam", status: "unavailable", description: "Hydropower dam and other facilities. No damage status claimed without field verification." },
    { key: "landslides", label: "Observed Landslides (EMSR927 observedEventA_v2)", count: "1 feature (expected)", status: "unavailable", description: "Landslide reference. 1 feature. Landslide ≠ flood damage without complementary analysis. CRS EPSG:32645." },
  ];

  return (
    <div className="rounded-xl border border-white/[0.07] bg-[#101a29] p-6">
      <h3 className="text-sm font-semibold text-cyan-300 mb-4">
        Infrastructure Legend
      </h3>
      <div className="space-y-4">
        {infrastructureLayers.map((layer) => (
          <div key={layer.key} className="flex items-center gap-3">
            <span
              style={{ color: layer.status === "available" ? "cyan-300" : "amber-300" }}
              className="h-2 w-2 rounded flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <span className="font-semibold text-slate-100">{layer.label}</span>
              <p className="mt-1 text-[8px] text-amber-300">{layer.description}</p>
            </div>
            <span className="text-[8px] text-amber-400">{layer.count}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-white/[0.05]">
        <p className="text-[9px] text-slate-500">
          Critical Notes:
        </p>
        <ul className="list-disc list-inside text-[9px] text-slate-400 space-y-1">
          <li>
            No EMSR927 GeoPackage data currently available in repository. All feature
            counts and exposure assessments are pending actual data availability.
          </li>
          <li>
            Never claim a feature is damaged merely because it appears in the EMSR927
            dataset. Damage assessment requires field verification or complementary data.
          </li>
          <li>
            Do not invent affected road lengths, settlement counts or economic losses.
          </li>
          <li>
            Do not treat EMSR927 reference data as a complete damage inventory. It is
            reference/grading data only.
          </li>
          <li>
            Do not calculate exposure without compatible CRS and valid spatial overlay.
            CRS verification and valid overlay analysis required.
          </li>
          <li>
            Exposed feature counts only after actual spatial overlay analysis. No
            counts claimed without valid overlay results.
          </li>
          <li>
            Distinguish potentially exposed features from confirmed damaged features.
            Exposure ≠ damage. Field verification required.
          </li>
          <li>
            Source attribution and methodology shown for every displayed statistic
            when data becomes available.
          </li>
        </ul>
      </div>
    </div>
  );
}