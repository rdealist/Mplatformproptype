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
import { motion, AnimatePresence } from "motion/react";

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
    sources: [],
    scales: [],
  });

  const filteredItems = dataItems.filter(item => {
    if (searchText && !item.title.toLowerCase().includes(searchText.toLowerCase()) && !item.subtitle.toLowerCase().includes(searchText.toLowerCase())) {
      return false;
    }
    if (filters.modalities.length > 0 && !filters.modalities.includes(item.modality)) {
      return false;
    }
    if (filters.anatomies.length > 0 && !item.anatomy.some(a => filters.anatomies.includes(a))) {
      return false;
    }
    if (filters.sources.length > 0 && !filters.sources.includes(item.source.type)) {
      return false;
    }
    if (filters.scales.length > 0 && !filters.scales.includes(item.scale)) {
      return false;
    }
    return true;
  });

  const filteredCount = filteredItems.length;

  return (
    <main className="min-h-screen bg-[#fbfbfd] text-[#1d1d1f] antialiased">
      <section className="px-[80px] pt-[100px] pb-[60px]">
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-16 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-5xl font-semibold tracking-tight text-[#1d1d1f] leading-[1.2]"
            >
              {t.dataMarket.title}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 mx-auto max-w-2xl text-lg md:text-xl font-medium text-[#86868b] leading-[1.5]"
            >
              {t.dataMarket.sub}
            </motion.p>
          </div>

          <div className="grid grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + idx * 0.1, duration: 0.8 }}
                className="rounded-[24px] border border-black/[0.05] bg-white p-5 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-8 w-8 rounded-[10px] flex items-center justify-center bg-[#0071e3]/[0.06]">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#0071e3]" />
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#86868b]">{stat.label}</p>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-[#1d1d1f] tracking-tight">
                    <CountUpAnimation
                      end={stat.value}
                      decimals={stat.decimals}
                      suffix={stat.suffix}
                      separator={stat.separator}
                      duration={2000}
                    />
                  </span>
                  <span className="text-[10px] font-bold text-[#86868b]">
                    {stat.unit}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 筛选与列表区 */}
      <section className="px-[80px] pt-[20px] pb-[160px]">
        <div className="mx-auto max-w-[1280px]">
          <div className="flex gap-5">
            {/* 筛选侧边栏 */}
            <AnimatePresence mode="wait">
              {viewMode === "list" && filterOpen && (
                <motion.div
                  initial={{ opacity: 0, x: -20, width: 0 }}
                  animate={{ opacity: 1, x: 0, width: 280 }}
                  exit={{ opacity: 0, x: -20, width: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="shrink-0"
                >
                  <DataFilter filters={filters} onChange={setFilters} isOpen={true} />
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="flex-1 min-w-0">
              {/* 工具栏 - 采用 TaskMarket 样式 */}
              <div className="mb-6 flex items-center gap-3">
                <p className="shrink-0 text-sm text-[#86868b]">
                  {t.dataMarket.count(viewMode === "list" ? filteredCount : dataItems.length)}
                </p>

                <div className="flex-1" />

                {/* 搜索框 */}
                <div className="relative w-64">
                  <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#86868b]" strokeWidth={2} />
                  <input
                    type="text"
                    placeholder="搜索数据集..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="w-full rounded-full border border-black/[0.08] bg-white py-2 pl-10 pr-4 text-sm text-[#1d1d1f] placeholder:text-[#86868b] transition-all duration-200 focus:border-[#0071e3]/30 focus:outline-none focus:ring-2 focus:ring-[#0071e3]/10"
                  />
                </div>

                {/* 筛选按钮 */}
                <button
                  onClick={() => {
                    if (viewMode !== "list") setViewMode("list");
                    setFilterOpen(v => !v);
                  }}
                  className={`flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    filterOpen && viewMode === "list"
                      ? 'border-[#0071e3]/30 bg-[#0071e3]/[0.06] text-[#0071e3]'
                      : 'border-black/[0.08] bg-white text-[#1d1d1f] hover:border-[#0071e3]/20 hover:bg-[#0071e3]/[0.04]'
                  }`}
                >
                  <SlidersHorizontal className="h-4 w-4" strokeWidth={2} />
                  筛选
                  {(filters.modalities.length + filters.anatomies.length + filters.sources.length + filters.scales.length) > 0 && (
                    <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-[#0071e3] px-1 text-[10px] font-semibold text-white leading-none">
                      {filters.modalities.length + filters.anatomies.length + filters.sources.length + filters.scales.length}
                    </span>
                  )}
                </button>

                {/* 排序 */}
                <button className="flex items-center gap-1.5 rounded-full border border-black/[0.08] bg-white px-4 py-2 text-sm font-medium text-[#1d1d1f] transition-all duration-200 hover:border-[#0071e3]/20 hover:bg-[#0071e3]/[0.04]">
                  排序
                  <ChevronDown className="h-4 w-4 text-[#86868b]" strokeWidth={2} />
                </button>

                <div className="h-4 w-[1px] bg-black/[0.08] mx-1" />

                {/* 模式切换 */}
                <div className="flex items-center gap-1 rounded-full bg-black/[0.04] p-1">
                  <button
                    onClick={() => setViewMode("heatmap")}
                    className={`flex h-8 items-center gap-1.5 rounded-full px-4 text-xs font-bold transition-all duration-300 ${
                      viewMode === "heatmap"
                        ? "bg-white text-[#1d1d1f] shadow-sm"
                        : "text-[#86868b] hover:text-[#1d1d1f]"
                    }`}
                  >
                    <LayoutGrid className="h-3.5 w-3.5" strokeWidth={2} />
                    热力图
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`flex h-8 items-center gap-1.5 rounded-full px-4 text-xs font-bold transition-all duration-300 ${
                      viewMode === "list"
                        ? "bg-white text-[#1d1d1f] shadow-sm"
                        : "text-[#86868b] hover:text-[#1d1d1f]"
                    }`}
                  >
                    <List className="h-3.5 w-3.5" strokeWidth={2} />
                    列表
                  </button>
                </div>
              </div>

              <motion.div
                layout
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                {viewMode === "heatmap" ? <DataHeatmap /> : <DataListView filters={filters} />}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
