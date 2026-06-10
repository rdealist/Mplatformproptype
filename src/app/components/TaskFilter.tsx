import { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface TaskFilters {
  categories?: ('标注任务' | '审核任务')[];
  types: string[];
  modalities: string[];
  difficulties?: ('简单' | '中等' | '困难')[];
  levels: string[];
  statuses: ('招募中' | '进行中' | '已结束')[];
}

interface TaskFilterProps {
  filters: TaskFilters;
  onChange: (filters: TaskFilters) => void;
  isOpen: boolean;
  hiddenSections?: string[]; // 隐藏的筛选项
}

const filterSections = [
  {
    key: "categories" as const,
    label: "任务类别",
    options: [
      { value: '标注任务' as const, label: '标注任务' },
      { value: '审核任务' as const, label: '审核任务' },
    ],
  },
  {
    key: "types" as const,
    label: "任务类型",
    options: [
      { value: '分类标注', label: '分类标注' },
      { value: '分割标注', label: '分割标注' },
      { value: '检测标注', label: '检测标注' },
      { value: '视频标注', label: '视频标注' },
      { value: '关键点标注', label: '关键点标注' },
      { value: '文本标注', label: '文本标注' },
    ],
  },
  {
    key: "modalities" as const,
    label: "成像模态",
    options: [
      { value: 'CT', label: 'CT' },
      { value: 'MRI', label: 'MRI' },
      { value: 'X-Ray', label: 'X-Ray' },
      { value: 'US', label: '超声' },
      { value: 'OCT', label: 'OCT' },
      { value: 'ECG', label: 'ECG' },
      { value: 'EEG', label: 'EEG' },
      { value: '病理', label: '病理' },
      { value: '内窥镜', label: '内窥镜' },
      { value: '眼科影像', label: '眼科影像' },
      { value: '皮肤镜', label: '皮肤镜' },
    ],
  },
  {
    key: "difficulties" as const,
    label: "任务难度",
    options: [
      { value: '简单' as const, label: '简单' },
      { value: '中等' as const, label: '中等' },
      { value: '困难' as const, label: '困难' },
    ],
  },
  {
    key: "levels" as const,
    label: "要求等级",
    options: [
      { value: 'Lv1', label: 'Lv1' },
      { value: 'Lv2', label: 'Lv2' },
      { value: 'Lv3', label: 'Lv3' },
      { value: 'Lv4', label: 'Lv4' },
      { value: 'Lv5', label: 'Lv5' },
      { value: 'Lv6', label: 'Lv6+' },
    ],
  },
  {
    key: "statuses" as const,
    label: "任务状态",
    options: [
      { value: '招募中' as const, label: '招募中' },
      { value: '进行中' as const, label: '进行中' },
      { value: '已结束' as const, label: '已结束' },
    ],
  },
];

export function TaskFilter({ filters, onChange, isOpen, hiddenSections }: TaskFilterProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    categories: true,
    types: false,
    modalities: false,
    difficulties: false,
    levels: false,
    statuses: false,
  });

  const toggleSection = (key: string) => {
    setExpandedSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleFilter = <K extends keyof TaskFilters>(
    category: K,
    value: TaskFilters[K][number]
  ) => {
    const currentValues = filters[category];
    const newValues = currentValues.includes(value as never)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value as never];
    onChange({ ...filters, [category]: newValues });
  };

  const clearAllFilters = () => {
    onChange({ types: [], modalities: [], levels: [], statuses: [] });
  };

  const hasActiveFilters =
    (filters.categories?.length ?? 0) > 0 ||
    filters.types.length > 0 ||
    filters.modalities.length > 0 ||
    (filters.difficulties?.length ?? 0) > 0 ||
    filters.levels.length > 0 ||
    filters.statuses.length > 0;

  return (
    <div
      className="shrink-0 overflow-hidden transition-all duration-300 ease-in-out"
      style={{ width: isOpen ? "240px" : "0px", opacity: isOpen ? 1 : 0 }}
    >
      <div className="w-[240px]">
        <div className="sticky top-6">
          <div className="rounded-2xl border border-black/[0.08] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-between border-b border-black/[0.06] px-5 py-4">
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
                if (hiddenSections && hiddenSections.includes(section.key)) {
                  return null;
                }

                const activeCount = filters[section.key]?.length ?? 0;
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