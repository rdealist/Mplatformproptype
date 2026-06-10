import {
  ChevronDown,
  LayoutGrid,
  List,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { useState } from "react";
import { useT } from "../i18n/useT";
import { CountUpAnimation } from "../components/CountUpAnimation";
import { DataHeatmap } from "../components/DataHeatmap";
import { DataListView, DataFilters, dataItems } from "../components/DataListView";
import { DataFilter } from "../components/DataFilter";

const statsValues = [
  { value: 15200, unit: "个", decimals: 0, suffix: "", separator: true },
  { value: 32.8, unit: "M", decimals: 1, suffix: "", separator: false },
  { value: 312, unit: "TB", decimals: 0, suffix: "", separator: false },
  { value: 680, unit: "家", decimals: 0, suffix: "", separator: false },
];


export default function DataMarket() {
  const t = useT();
  const stats = statsValues.map((s, i) => ({ ...s, label: t.dataMarket.stats[i].label }));
  const [searchText, setSearchText] = useState("");
  const [viewMode, setViewMode] = useState<"heatmap" | "list">("heatmap");
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<DataFilters>({
    modalities: [],
    anatomies: [],
    indications: [],
    sources: [],
    scales: [],
  });

  const filteredCount = dataItems.filter(item => {
    if (filters.modalities.length > 0 && !filters.modalities.includes(item.modality)) {
      return false;
    }
    if (filters.anatomies.length > 0 && !item.anatomy.some(a => filters.anatomies.includes(a))) {
      return false;
    }
    if (filters.indications.length > 0 && !item.indication.some(i => filters.indications.includes(i))) {
      return false;
    }
    if (filters.sources.length > 0 && !filters.sources.includes(item.source.type)) {
      return false;
    }
    if (filters.scales.length > 0 && !filters.scales.includes(item.scale)) {
      return false;
    }
    return true;
  }).length;

  return (
    <main className="min-h-screen bg-[#fbfbfd] text-[#1d1d1f] antialiased">
      <section className="px-[80px] pt-[64px] pb-[20px]">
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-8">
            <h1 className="text-5xl font-semibold leading-[1.16] tracking-[-0.015em] text-[#1d1d1f]">{t.dataMarket.title}</h1>
            <p className="mt-4 text-[21px] font-medium leading-[1.52] text-[#86868b]">
              {t.dataMarket.sub}
            </p>
          </div>

          <div className="grid grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="group relative overflow-hidden rounded-3xl border border-black/[0.08] bg-white p-8 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#0071e3]/30 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#0071e3]/[0.02] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-[#0071e3]/[0.06] blur-3xl transition-all duration-500 group-hover:bg-[#0071e3]/[0.12]" />

                <div className="relative">
                  <div className="mb-2 inline-flex rounded-lg bg-[#0071e3]/[0.08] px-3 py-1">
                    <span className="text-xs font-medium text-[#0071e3]">{stat.label}</span>
                  </div>

                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-5xl font-semibold leading-[1.1] tracking-tight text-[#1d1d1f] transition-colors duration-300 group-hover:text-[#0071e3]">
                      <CountUpAnimation
                        end={stat.value}
                        decimals={stat.decimals}
                        suffix={stat.suffix}
                        separator={stat.separator}
                        duration={1500}
                      />
                    </span>
                    <span className="text-lg font-medium text-[#86868b]">
                      {stat.unit}
                    </span>
                  </div>

                  <div className="mt-4 h-1 w-12 rounded-full bg-[#0071e3]/[0.2] transition-all duration-300 group-hover:w-24 group-hover:bg-[#0071e3]/[0.4]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-[80px] pt-[20px] pb-[48px]">
        <div className="mx-auto max-w-[1280px]">
          <div className="flex gap-5">
            {viewMode === "list" && (
              <DataFilter filters={filters} onChange={setFilters} isOpen={filterOpen} />
            )}
            <div className="flex-1 min-w-0">
              <div className="mb-6 flex items-center gap-3">
                <p className="shrink-0 text-sm text-[#86868b]">
                  {t.dataMarket.count(viewMode === "list" ? filteredCount : dataItems.length)}
                </p>

                {/* 显示模式切换 - 移到左侧 */}
                <div className="flex items-center rounded-full border border-black/[0.08] bg-white p-1">
                  <button
                    onClick={() => setViewMode("heatmap")}
                    className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-200 ${
                      viewMode === "heatmap"
                        ? "bg-[#0071e3] text-white"
                        : "text-[#86868b] hover:text-[#1d1d1f]"
                    }`}
                  >
                    <LayoutGrid className="h-4 w-4" strokeWidth={2} />
                    {t.dataMarket.heatmap}
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-200 ${
                      viewMode === "list"
                        ? "bg-[#0071e3] text-white"
                        : "text-[#86868b] hover:text-[#1d1d1f]"
                    }`}
                  >
                    <List className="h-4 w-4" strokeWidth={2} />
                    {t.dataMarket.list}
                  </button>
                </div>

                <div className="flex-1" />

                {/* 搜索框 */}
                <div className="relative w-60">
                  <Search
                    className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#86868b]"
                    strokeWidth={2}
                  />
                  <input
                    type="text"
                    placeholder={t.dataMarket.search}
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="w-full rounded-full border border-black/[0.08] bg-white py-2 pl-10 pr-4 text-sm text-[#1d1d1f] placeholder:text-[#86868b] transition-all duration-200 focus:border-[#0071e3]/30 focus:outline-none focus:ring-2 focus:ring-[#0071e3]/10"
                  />
                </div>

                {/* 分隔线 */}
                <div className="h-5 w-px bg-black/[0.08]" />

                {/* 筛选按钮 */}
                <button
                  onClick={() => {
                    if (viewMode !== "list") setViewMode("list");
                    setFilterOpen(v => !v);
                  }}
                  className={`flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    filterOpen && viewMode === "list"
                      ? "border-[#0071e3]/30 bg-[#0071e3]/[0.06] text-[#0071e3]"
                      : "border-black/[0.08] bg-white text-[#1d1d1f] hover:border-[#0071e3]/20 hover:bg-[#0071e3]/[0.04]"
                  }`}
                >
                  <SlidersHorizontal className="h-4 w-4" strokeWidth={2} />
                  {t.dataMarket.filter}
                  {(filters.modalities.length + filters.anatomies.length + filters.indications.length + filters.sources.length + filters.scales.length) > 0 && (
                    <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-[#0071e3] px-1 text-[10px] font-semibold text-white leading-none">
                      {filters.modalities.length + filters.anatomies.length + filters.indications.length + filters.sources.length + filters.scales.length}
                    </span>
                  )}
                </button>

                {/* 排序 */}
                <button className="flex items-center gap-1.5 rounded-full border border-black/[0.08] bg-white px-4 py-2 text-sm font-medium text-[#1d1d1f] transition-all duration-200 hover:border-[#0071e3]/20 hover:bg-[#0071e3]/[0.04]">
                  {t.dataMarket.sort}
                  <ChevronDown className="h-4 w-4 text-[#86868b]" strokeWidth={2} />
                </button>
              </div>

              {viewMode === "heatmap" ? <DataHeatmap /> : <DataListView filters={filters} />}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
