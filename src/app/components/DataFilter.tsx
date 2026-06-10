import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { DataFilters } from "./DataListView";

interface DataFilterProps {
  filters: DataFilters;
  onChange: (filters: DataFilters) => void;
  isOpen: boolean;
}

const filterSections = [
  {
    key: "modalities" as const,
    label: "成像模态",
    options: [
      { value: 'MRI', label: 'MRI 磁共振' },
      { value: 'CT', label: 'CT 计算机断层' },
      { value: 'X-Ray', label: 'X-Ray X射线' },
      { value: 'US', label: 'US 超声' },
      { value: 'ECG', label: 'ECG 心电图' },
      { value: 'EEG', label: 'EEG 脑电图' },
      { value: '眼科影像', label: '眼科影像' },
      { value: '内窥镜', label: '内窥镜' },
      { value: '病理', label: '病理切片' },
      { value: '皮肤镜', label: '皮肤镜' },
    ],
  },
  {
    key: "anatomies" as const,
    label: "解剖部位",
    options: [
      { value: '脑部', label: '脑部' },
      { value: '胸部', label: '胸部' },
      { value: '肺部', label: '肺部' },
      { value: '心脏', label: '心脏' },
      { value: '腹部', label: '腹部' },
      { value: '眼部', label: '眼部' },
      { value: '骨骼', label: '骨骼' },
      { value: '脊柱', label: '脊柱' },
      { value: '皮肤', label: '皮肤' },
      { value: '消化道', label: '消化道' },
      { value: '泌尿', label: '泌尿系统' },
      { value: '颈部', label: '颈部' },
      { value: '盆腔', label: '盆腔' },
      { value: '全身', label: '全身' },
    ],
  },
  {
    key: "indications" as const,
    label: "适应症",
    options: [
      { value: '肿瘤', label: '肿瘤' },
      { value: '结节', label: '结节' },
      { value: '分割', label: '分割' },
      { value: '检测', label: '检测' },
      { value: '分类', label: '分类' },
      { value: '分级', label: '分级' },
      { value: '血管', label: '血管' },
      { value: '息肉', label: '息肉' },
      { value: '炎症', label: '炎症' },
      { value: '糖尿病', label: '糖尿病' },
      { value: '急诊', label: '急诊' },
      { value: '手术', label: '手术' },
      { value: '细胞', label: '细胞' },
      { value: '通用', label: '通用数据' },
    ],
  },
  {
    key: "sources" as const,
    label: "数据来源",
    options: [
      { value: 'platform' as const, label: '平台数据' },
      { value: 'institution' as const, label: '机构上传' },
      { value: 'external' as const, label: '委托展示' },
    ],
  },
  {
    key: "scales" as const,
    label: "数据规模",
    options: [
      { value: 'small' as const, label: '小型 (<10GB)' },
      { value: 'medium' as const, label: '中型 (10-50GB)' },
      { value: 'large' as const, label: '大型 (50-150GB)' },
      { value: 'xlarge' as const, label: '超大型 (>150GB)' },
    ],
  },
];

export function DataFilter({ filters, onChange, isOpen }: DataFilterProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    modalities: true,
    anatomies: false,
    indications: false,
    sources: false,
    scales: false,
  });

  const toggleSection = (key: string) => {
    setExpandedSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleFilter = <K extends keyof DataFilters>(
    category: K,
    value: DataFilters[K][number]
  ) => {
    const currentValues = filters[category];
    const newValues = currentValues.includes(value as never)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value as never];
    onChange({ ...filters, [category]: newValues });
  };

  const clearAllFilters = () => {
    onChange({ modalities: [], anatomies: [], indications: [], sources: [], scales: [] });
  };

  const hasActiveFilters =
    filters.modalities.length > 0 ||
    filters.anatomies.length > 0 ||
    filters.indications.length > 0 ||
    filters.sources.length > 0 ||
    filters.scales.length > 0;

  return (
    <div
      className="shrink-0 overflow-hidden transition-all duration-300 ease-in-out"
      style={{ width: isOpen ? "240px" : "0px", opacity: isOpen ? 1 : 0 }}
    >
      <div className="w-[240px]">
        <div className="sticky top-6">
          <div className="rounded-2xl border border-black/[0.08] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-between px-5 py-4 border-b border-black/[0.06]">
              <h3 className="text-sm font-semibold text-[#1d1d1f]">筛选条件</h3>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="text-xs font-medium text-[#0071e3] transition-colors duration-200 hover:text-[#005ec4]"
                >
                  清空
                </button>
              )}
            </div>

            <div className="divide-y divide-black/[0.06]">
              {filterSections.map((section) => {
                const activeCount = filters[section.key].length;
                const isExpanded = expandedSections[section.key];

                return (
                  <div key={section.key}>
                    <button
                      onClick={() => toggleSection(section.key)}
                      className="flex w-full items-center justify-between px-5 py-3 text-left transition-colors duration-150 hover:bg-[#f5f5f7]"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-[#1d1d1f]">{section.label}</span>
                        {activeCount > 0 && (
                          <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-[#0071e3] px-1 text-[10px] font-semibold text-white">
                            {activeCount}
                          </span>
                        )}
                      </div>
                      <ChevronDown
                        className={`h-4 w-4 text-[#86868b] transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                        strokeWidth={2}
                      />
                    </button>

                    <div
                      className="overflow-hidden transition-all duration-200 ease-in-out"
                      style={{ maxHeight: isExpanded ? `${section.options.length * 36}px` : "0px" }}
                    >
                      <div className="px-5 pb-3 pt-1">
                        <div className="flex flex-wrap gap-2">
                          {section.options.map((option) => {
                            const isSelected = (filters[section.key] as string[]).includes(option.value);
                            return (
                              <button
                                key={option.value}
                                onClick={() => toggleFilter(section.key, option.value as never)}
                                className={`rounded-full px-3 py-1 text-xs font-medium transition-all duration-150 ${
                                  isSelected
                                    ? "bg-[#0071e3] text-white"
                                    : "bg-[#f5f5f7] text-[#1d1d1f] hover:bg-[#e8e8ed]"
                                }`}
                              >
                                {option.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
