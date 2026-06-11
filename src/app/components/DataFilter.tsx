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
    label: "解剖系统",
    options: [
      { value: '皮肤与体表系统', label: '皮肤与体表系统' },
      { value: '骨骼系统', label: '骨骼系统' },
      { value: '肌肉系统', label: '肌肉系统' },
      { value: '神经系统', label: '神经系统' },
      { value: '内分泌系统', label: '内分泌系统' },
      { value: '心血管系统', label: '心血管系统' },
      { value: '淋巴和免疫系统', label: '淋巴和免疫系统' },
      { value: '呼吸系统', label: '呼吸系统' },
      { value: '消化系统', label: '消化系统' },
      { value: '泌尿系统', label: '泌尿系统' },
      { value: '生殖系统', label: '生殖系统' },
      { value: '其他', label: '其他' },
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
    onChange({ modalities: [], anatomies: [], sources: [], scales: [] });
  };

  const hasActiveFilters =
    filters.modalities.length > 0 ||
    filters.anatomies.length > 0 ||
    filters.sources.length > 0 ||
    filters.scales.length > 0;

  return (
    <div
      className="shrink-0 overflow-hidden transition-all duration-500 ease-in-out"
      style={{ width: isOpen ? "240px" : "0px", opacity: isOpen ? 1 : 0 }}
    >
      <div className="w-[240px] pr-6">
        <div className="sticky top-28">
          <div className="flex items-center justify-between py-2">
            <h3 className="text-[13px] font-bold tracking-widest text-[#1d1d1f] uppercase">筛选条件</h3>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-[11px] font-bold text-[#0071e3] uppercase tracking-wider hover:opacity-70 transition-opacity"
              >
                清空
              </button>
            )}
          </div>

          <div className="mt-4 space-y-4">
            {filterSections.map((section) => {
              const activeCount = filters[section.key].length;
              const isExpanded = expandedSections[section.key];

              return (
                <div key={section.key} className="border-t border-black/[0.05] pt-4 first:border-0 first:pt-0">
                  <button
                    onClick={() => toggleSection(section.key)}
                    className="flex w-full items-center justify-between text-left group"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-[#1d1d1f]">{section.label}</span>
                      {activeCount > 0 && (
                        <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-[#0071e3] px-1 text-[10px] font-bold text-white">
                          {activeCount}
                        </span>
                      )}
                    </div>
                    <ChevronDown
                      className={`h-4 w-4 text-[#86868b] transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                      strokeWidth={2.5}
                    />
                  </button>

                  <div
                    className="overflow-hidden transition-all duration-300 ease-in-out"
                    style={{ maxHeight: isExpanded ? `${section.options.length * 40}px` : "0px", opacity: isExpanded ? 1 : 0 }}
                  >
                    <div className="pt-3 pb-2">
                      <div className="flex flex-wrap gap-2">
                        {section.options.map((option) => {
                          const isSelected = (filters[section.key] as string[]).includes(option.value);
                          return (
                            <button
                              key={option.value}
                              onClick={() => toggleFilter(section.key, option.value as never)}
                              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
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
  );
}
