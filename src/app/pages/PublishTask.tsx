import { Target, Coins, Calendar, Info, FileText, Sparkles, CheckCircle2, Loader2, ShieldCheck, Zap, Database, ArrowRight } from "lucide-react";
import { useState, useMemo } from "react";

type AnalysisState = "idle" | "analyzing" | "done";

interface ExistingDataset {
  id: string;
  name: string;
  type: string;
  modality: string;
  anatomy: string;
  count: number;
  size: string;
  uploadDate: string;
}

// 模拟用户已有的数据集
const mockExistingDatasets: ExistingDataset[] = [
  { id: "DS001", name: "胸部 CT 肺结节影像集", type: "分类标注", modality: "CT", anatomy: "胸部", count: 1000, size: "42 GB", uploadDate: "2026-05-15" },
  { id: "DS002", name: "脑部 MRI 肿瘤分割数据", type: "分割标注", modality: "MRI", anatomy: "头部", count: 500, size: "28 GB", uploadDate: "2026-04-22" },
  { id: "DS003", name: "骨折 X 光检测影像", type: "检测标注", modality: "X-Ray", anatomy: "骨骼", count: 2000, size: "18 GB", uploadDate: "2026-03-10" },
  { id: "DS004", name: "视网膜病变眼底影像", type: "分类标注", modality: "眼底", anatomy: "眼部", count: 1500, size: "12 GB", uploadDate: "2026-02-28" },
];

export default function PublishTask() {
  const [showDatasetList, setShowDatasetList] = useState(false);
  const [selectedDataset, setSelectedDataset] = useState<string | null>(null);
  const [analysisState, setAnalysisState] = useState<AnalysisState>("idle");
  const [annotationRatio, setAnnotationRatio] = useState(80); // 初审标注比例，默认80%

  // 默认截止日期为1个自然月后
  const getDefaultDeadline = () => {
    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    return date.toISOString().split('T')[0];
  };

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    types: [] as string[], // 标注类型，支持多选
    modality: "",
    anatomy: "",
    level: "",
    pricePerImage: "", // 单张影像总预算
    deadline: getDefaultDeadline(),
    totalImages: "", // 影像总数
  });

  // 可选的标注类型
  const annotationTypes = [
    "分类标注",
    "分割标注",
    "检测标注",
    "关键点标注",
  ];

  // 计算预算拆分
  const budgetBreakdown = useMemo(() => {
    const price = parseFloat(formData.pricePerImage) || 0;
    const total = parseInt(formData.totalImages) || 0;
    const annotationPrice = price * (annotationRatio / 100); // 按比例给初审标注
    const reviewPrice = price * ((100 - annotationRatio) / 100); // 剩余给专家复审
    const totalBudget = price * total;

    return {
      annotationPrice: annotationPrice.toFixed(1),
      reviewPrice: reviewPrice.toFixed(1),
      totalBudget: totalBudget.toLocaleString(),
      hasData: price > 0 && total > 0,
      annotationRatio,
      reviewRatio: 100 - annotationRatio,
    };
  }, [formData.pricePerImage, formData.totalImages, annotationRatio]);

  const handleSelectExistingDataset = (datasetId: string) => {
    setSelectedDataset(datasetId);
    const dataset = mockExistingDatasets.find(d => d.id === datasetId);
    if (dataset) {
      setAnalysisState("analyzing");
      setTimeout(() => {
        setFormData(prev => ({
          ...prev,
          title: dataset.name,
          description: `基于已上传数据集「${dataset.name}」标标注需求。该数据集包含 ${dataset.count} 张 ${dataset.modality} 影像，已完成数据清洗与格式标准化，可直接用于标注任务单发布。`,
          types: [dataset.type], // 默认选中数据集的类型
          modality: dataset.modality,
          anatomy: dataset.anatomy,
          level: "Lv3",
          totalImages: dataset.count.toString(),
          deadline: getDefaultDeadline(),
        }));
        setAnalysisState("done");
      }, 1500);
    }
  };

  const isAutoFilled = analysisState === "done";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <main className="min-h-screen bg-[#fbfbfd] text-[#1d1d1f] antialiased">
      <section className="px-20 py-28">
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-8">
            <h1 className="text-[48px] font-semibold leading-[1.08] tracking-tight">发布标注需求</h1>
            <p className="mt-6 text-[21px] leading-[1.52] text-[#86868b]">
              选择已处理完成的数据集，配置单张预算，自动生成初审+复审双任务单
            </p>
          </div>

          {/* 选择数据集入口 */}
          {!showDatasetList && analysisState === "idle" ? (
            <div className="mb-6">
              <button
                onClick={() => setShowDatasetList(true)}
                className="group w-full rounded-3xl border-2 border-dashed border-black/[0.08] bg-white p-16 text-center transition-all duration-300 hover:border-[#0071e3]/30 hover:bg-[#0071e3]/[0.02]"
              >
                <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#0071e3]/[0.08] transition-all duration-300 group-hover:bg-[#0071e3]/[0.12]">
                  <Database className="h-10 w-10 text-[#0071e3]" strokeWidth={1.5} />
                </div>
                <p className="mb-2 text-[21px] font-semibold text-[#1d1d1f]">选择数据集</p>
                <p className="text-sm text-[#86868b]">
                  查看并选择已处理完成的数据集 · 共 {mockExistingDatasets.length} 个可用
                </p>
              </button>
            </div>
          ) : null}

          {/* 数据集列表 */}
          {showDatasetList && mockExistingDatasets.length > 0 ? (
            <div className="mb-6">
              {analysisState === "idle" ? (
                <div className="grid gap-4">
                  <div className="mb-4 flex items-center justify-between rounded-2xl border border-[#0071e3]/20 bg-[#0071e3]/[0.04] px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Database className="h-5 w-5 text-[#0071e3]" strokeWidth={2} />
                      <span className="text-sm font-medium text-[#0071e3]">
                        从已处理完成的数据集中选择（点击卡片选择）
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-[#86868b]">
                        共 {mockExistingDatasets.length} 个可用数据集
                      </span>
                      <button
                        onClick={() => {
                          setShowDatasetList(false);
                          setSelectedDataset(null);
                        }}
                        className="text-sm text-[#86868b] hover:text-[#1d1d1f] transition-colors"
                      >
                        收起
                      </button>
                    </div>
                  </div>
                  {mockExistingDatasets.map((dataset) => (
                    <div
                      key={dataset.id}
                      onClick={() => handleSelectExistingDataset(dataset.id)}
                      className={`cursor-pointer rounded-2xl border p-6 transition-all duration-200 ${
                        selectedDataset === dataset.id
                          ? "border-[#0071e3]/30 bg-[#0071e3]/[0.04] shadow-[0_2px_8px_rgba(0,113,227,0.08)]"
                          : "border-black/[0.08] bg-white hover:border-[#0071e3]/20 hover:bg-[#0071e3]/[0.02]"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="mb-2 flex items-center gap-2">
                            <h3 className="text-sm font-semibold text-[#1d1d1f]">{dataset.name}</h3>
                            <span className="rounded-full bg-[#0071e3]/10 px-2 py-0.5 text-xs font-medium text-[#0071e3]">
                              {dataset.id}
                            </span>
                            <span className="rounded-full bg-[#34c759]/10 px-2 py-0.5 text-xs font-medium text-[#34c759]">
                              已处理完成
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-[#86868b]">
                            <span>{dataset.type}</span>
                            <span>•</span>
                            <span>{dataset.modality}</span>
                            <span>•</span>
                            <span>{dataset.anatomy}</span>
                            <span>•</span>
                            <span>{dataset.count.toLocaleString()} 张</span>
                            <span>•</span>
                            <span>{dataset.size}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-[#86868b]">上传于</div>
                          <div className="text-xs font-medium text-[#1d1d1f]">{dataset.uploadDate}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : analysisState === "analyzing" ? (
                <div className="rounded-3xl border-2 border-dashed border-[#0071e3]/30 bg-[#0071e3]/[0.02] p-16 text-center">
                  <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#0071e3]/[0.08]">
                    <Loader2 className="h-10 w-10 animate-spin text-[#0071e3]" strokeWidth={1.5} />
                  </div>
                  <p className="mb-2 text-[21px] font-semibold text-[#1d1d1f]">AI 正在加载数据集信息…</p>
                  <p className="text-sm text-[#86868b]">自动填充标注需求配置</p>
                </div>
              ) : (
                <div className="rounded-3xl border-2 border-dashed border-[#34c759]/30 bg-[#34c759]/[0.02] p-16 text-center">
                  <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#34c759]/[0.10]">
                    <CheckCircle2 className="h-10 w-10 text-[#34c759]" strokeWidth={1.5} />
                  </div>
                  <p className="mb-2 text-[21px] font-semibold text-[#1d1d1f]">数据集已选择，共 {formData.totalImages} 张影像</p>
                  <p className="text-sm text-[#86868b]">请在下方确认标注需求信息并配置预算</p>
                </div>
              )}
            </div>
          ) : showDatasetList && mockExistingDatasets.length === 0 ? (
            <div className="mb-6 rounded-3xl border-2 border-dashed border-black/[0.08] bg-[#fbfbfd] p-16 text-center">
              <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#ff9500]/[0.08]">
                <Database className="h-10 w-10 text-[#ff9500]" strokeWidth={1.5} />
              </div>
              <p className="mb-2 text-[21px] font-semibold text-[#1d1d1f]">暂无可用数据集</p>
              <p className="mb-6 text-sm text-[#86868b]">您还没有上传并处理完成的数据集，请先上传数据集</p>
              <button className="inline-flex items-center gap-2 rounded-full bg-[#0071e3] px-6 py-3 text-sm font-medium text-white transition-opacity duration-200 hover:opacity-90">
                <Database className="h-4 w-4" strokeWidth={2} />
                立即上传数据集
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </button>
            </div>
          ) : null}

          {/* 选择了数据集后才显示配置表单 */}
          {analysisState === "done" && (
            <div className="flex items-start gap-8">
              {/* 左侧主表单 */}
              <form onSubmit={handleSubmit} className="min-w-0 flex-1 space-y-6">

              {/* 标注需求信息 */}
              <div className="rounded-3xl border border-black/[0.08] bg-white p-8 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-[#0071e3]" strokeWidth={2} />
                    <h2 className="text-[21px] font-semibold leading-[1.52]">标注需求信息</h2>
                  </div>
                  {isAutoFilled && (
                    <div className="flex items-center gap-1.5 rounded-full bg-[#34c759]/[0.08] px-3 py-1">
                      <Sparkles className="h-3.5 w-3.5 text-[#34c759]" strokeWidth={2} />
                      <span className="text-xs font-medium text-[#34c759]">AI 已自动填充，可手动修改</span>
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  {/* 标题 */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#1d1d1f]">需求标题</label>
                    {isAutoFilled ? (
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full rounded-full border border-[#34c759]/30 bg-[#34c759]/[0.02] px-4 py-2 text-sm text-[#1d1d1f] transition-all duration-200 focus:border-[#0071e3]/30 focus:outline-none focus:ring-2 focus:ring-[#0071e3]/10"
                      />
                    ) : (
                      <div className="flex h-9 items-center rounded-full border border-black/[0.06] bg-[#fbfbfd] px-4">
                        <span className="text-sm text-[#86868b]">上传样本后自动生成</span>
                      </div>
                    )}
                  </div>

                  {/* 描述 */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#1d1d1f]">标注规范说明</label>
                    {isAutoFilled ? (
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={5}
                        className="w-full resize-none rounded-2xl border border-[#34c759]/30 bg-[#34c759]/[0.02] px-4 py-3 text-sm text-[#1d1d1f] transition-all duration-200 focus:border-[#0071e3]/30 focus:outline-none focus:ring-2 focus:ring-[#0071e3]/10"
                      />
                    ) : (
                      <div className="flex h-28 items-start rounded-2xl border border-black/[0.06] bg-[#fbfbfd] px-4 py-3">
                        <span className="text-sm text-[#86868b]">上传影像后由 AI 自动生成标注规范与质控要求</span>
                      </div>
                    )}
                  </div>

                  {/* 标注类型（多选） */}
                  <div>
                    <label className="mb-3 block text-sm font-medium text-[#1d1d1f]">标注类型（可多选）</label>
                    <div className="flex flex-wrap gap-2">
                      {annotationTypes.map((type) => {
                        const isSelected = formData.types.includes(type);
                        return (
                          <button
                            key={type}
                            type="button"
                            onClick={() => {
                              setFormData(prev => ({
                                ...prev,
                                types: isSelected
                                  ? prev.types.filter(t => t !== type)
                                  : [...prev.types, type]
                              }));
                            }}
                            className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                              isSelected
                                ? "border-[#0071e3]/30 bg-[#0071e3]/[0.08] text-[#0071e3]"
                                : "border-black/[0.08] bg-white text-[#86868b] hover:border-[#0071e3]/20 hover:bg-[#0071e3]/[0.02]"
                            }`}
                          >
                            {type}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* AI 自动判断：模态、部位 */}
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { key: "modality", label: "成像模态" },
                      { key: "anatomy", label: "解剖部位" },
                    ].map(({ key, label }) => (
                      <div key={key}>
                        <label className="mb-2 block text-sm font-medium text-[#1d1d1f]">{label}</label>
                        {isAutoFilled ? (
                          <div className="flex h-9 items-center gap-2 rounded-full border border-[#34c759]/30 bg-[#34c759]/[0.02] px-4">
                            <Sparkles className="h-3.5 w-3.5 shrink-0 text-[#34c759]" strokeWidth={2} />
                            <span className="text-sm text-[#1d1d1f]">{formData[key as keyof typeof formData]}</span>
                          </div>
                        ) : (
                          <div className="flex h-9 items-center rounded-full border border-black/[0.06] bg-[#fbfbfd] px-4">
                            <span className="text-sm text-[#86868b]">AI 自动判断</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* AI 自动判断：要求等级、影像数量 */}
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { key: "level", label: "要求等级" },
                      { key: "totalImages", label: "影像数量" },
                    ].map(({ key, label }) => (
                      <div key={key}>
                        <label className="mb-2 block text-sm font-medium text-[#1d1d1f]">{label}</label>
                        {isAutoFilled ? (
                          <div className="flex h-9 items-center gap-2 rounded-full border border-[#34c759]/30 bg-[#34c759]/[0.02] px-4">
                            <Sparkles className="h-3.5 w-3.5 shrink-0 text-[#34c759]" strokeWidth={2} />
                            <span className="text-sm text-[#1d1d1f]">{formData[key as keyof typeof formData]}</span>
                          </div>
                        ) : (
                          <div className="flex h-9 items-center rounded-full border border-black/[0.06] bg-[#fbfbfd] px-4">
                            <span className="text-sm text-[#86868b]">AI 自动判断</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 预算配置 */}
              <div className="rounded-3xl border border-black/[0.08] bg-white p-8 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                <div className="mb-6 flex items-center gap-2">
                  <Coins className="h-5 w-5 text-[#0071e3]" strokeWidth={2} />
                  <h2 className="text-[21px] font-semibold leading-[1.52]">预算配置</h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#1d1d1f]">单张影像总预算</label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.1"
                        value={formData.pricePerImage}
                        onChange={(e) => setFormData({ ...formData, pricePerImage: e.target.value })}
                        placeholder="例如：1.2"
                        className="w-full rounded-full border border-black/[0.08] bg-white px-4 py-2 pr-24 text-sm text-[#1d1d1f] placeholder:text-[#86868b] transition-all duration-200 focus:border-[#0071e3]/30 focus:outline-none focus:ring-2 focus:ring-[#0071e3]/10"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#86868b]">积分/张</span>
                    </div>
                  </div>

                  {/* 预算拆分比例选择 */}
                  <div>
                    <label className="mb-3 block text-sm font-medium text-[#1d1d1f]">标注-复审预算比例</label>

                    {/* 锚点快捷选择 */}
                    <div className="mb-4 flex gap-2">
                      {[
                        { value: 80, label: "推荐配置" },
                        { value: 70, label: "高质量" },
                        { value: 90, label: "快速模式" },
                      ].map((preset) => (
                        <button
                          key={preset.value}
                          type="button"
                          onClick={() => setAnnotationRatio(preset.value)}
                          className={`flex-1 rounded-xl border px-4 py-2.5 text-center transition-all duration-200 ${
                            annotationRatio === preset.value
                              ? "border-[#0071e3]/30 bg-[#0071e3]/[0.04] text-[#0071e3]"
                              : "border-black/[0.08] bg-white text-[#1d1d1f] hover:border-[#0071e3]/20 hover:bg-[#0071e3]/[0.02]"
                          }`}
                        >
                          <div className="text-sm font-medium">{preset.label}</div>
                        </button>
                      ))}
                    </div>

                    {/* 滑块 */}
                    <div className="rounded-2xl border border-black/[0.08] bg-[#fbfbfd] p-4">
                      <div className="mb-3 flex items-center justify-between text-xs">
                        <span className="font-medium text-[#1d1d1f]">初审标注</span>
                        <span className="font-semibold text-[#0071e3]">{annotationRatio}%</span>
                        <span className="font-semibold text-[#0071e3]">{100 - annotationRatio}%</span>
                        <span className="font-medium text-[#1d1d1f]">专家复审</span>
                      </div>
                      <input
                        type="range"
                        min="60"
                        max="95"
                        step="5"
                        value={annotationRatio}
                        onChange={(e) => setAnnotationRatio(parseInt(e.target.value))}
                        className="w-full"
                        style={{
                          background: `linear-gradient(to right, #0071e3 0%, #0071e3 ${annotationRatio}%, #e5e5e7 ${annotationRatio}%, #e5e5e7 100%)`
                        }}
                      />
                      <div className="mt-2 text-xs text-[#86868b]">
                        拖动调节比例（60%-95% 用于初审标注）
                      </div>
                    </div>
                  </div>

                  {/* 预算拆分展示 */}
                  {budgetBreakdown.hasData && (
                    <div className="rounded-2xl border border-[#0071e3]/20 bg-[#0071e3]/[0.02] p-6">
                      <div className="mb-4 flex items-center gap-2">
                        <ShieldCheck className="h-5 w-5 text-[#0071e3]" strokeWidth={2} />
                        <h3 className="text-sm font-semibold text-[#0071e3]">预算自动拆分方案</h3>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between rounded-xl bg-white p-4">
                          <div>
                            <div className="text-sm font-medium text-[#1d1d1f]">初审标注任务单</div>
                            <div className="mt-1 text-xs text-[#86868b]">立即推送至「申领标注任务」，供医生领取</div>
                          </div>
                          <div className="text-right">
                            <div className="text-[21px] font-semibold text-[#1d1d1f]">{budgetBreakdown.annotationPrice}</div>
                            <div className="text-xs text-[#86868b]">积分/张 ({budgetBreakdown.annotationRatio}%)</div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between rounded-xl bg-white p-4">
                          <div>
                            <div className="text-sm font-medium text-[#1d1d1f]">专家复审任务单</div>
                            <div className="mt-1 text-xs text-[#86868b]">锁定状态，初审完成后自动解锁给专家</div>
                          </div>
                          <div className="text-right">
                            <div className="text-[21px] font-semibold text-[#1d1d1f]">{budgetBreakdown.reviewPrice}</div>
                            <div className="text-xs text-[#86868b]">积分/张 ({budgetBreakdown.reviewRatio}%)</div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between border-t border-black/[0.08] pt-3">
                          <div className="text-sm font-semibold text-[#1d1d1f]">总预算锁定</div>
                          <div className="text-[21px] font-semibold text-[#0071e3]">{budgetBreakdown.totalBudget} 积分</div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#1d1d1f]">截止日期</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#86868b]" strokeWidth={2} />
                      <input
                        type="date"
                        value={formData.deadline}
                        onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                        className="w-full rounded-full border border-black/[0.08] bg-white py-2 pl-11 pr-4 text-sm text-[#1d1d1f] transition-all duration-200 focus:border-[#0071e3]/30 focus:outline-none focus:ring-2 focus:ring-[#0071e3]/10"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 提交 */}
              <div className="flex items-center justify-end gap-4 pb-4">
                <button
                  type="button"
                  className="rounded-full border border-black/[0.08] bg-transparent px-6 py-3 text-sm font-medium text-[#1d1d1f] transition-all duration-200 hover:border-[#0071e3]/30 hover:bg-[#0071e3]/[0.04] focus:outline-none"
                >
                  保存草稿
                </button>
                <button
                  type="submit"
                  disabled={!isAutoFilled || !budgetBreakdown.hasData}
                  className="rounded-full bg-[#0071e3] px-6 py-3 text-sm font-medium text-white transition-opacity duration-200 hover:opacity-90 focus:outline-none disabled:cursor-not-allowed disabled:opacity-40"
                >
                  发布标注需求
                </button>
              </div>
            </form>

            {/* 右侧辅助信息 */}
            <div className="w-72 shrink-0 space-y-6">
              <div className="rounded-3xl border border-black/[0.08] bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                <div className="mb-4 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-[#0071e3]" strokeWidth={2} />
                  <h3 className="text-sm font-semibold text-[#1d1d1f]">任务单生成流程</h3>
                </div>
                <div className="space-y-4">
                  {[
                    { step: "1", title: "选择数据集", desc: "从已处理完成的数据集中选择" },
                    { step: "2", title: "配置单张预算", desc: "系统自动拆分初审与复审" },
                    { step: "3", title: "初审任务单上线", desc: "推送至任务广场供医生领取" },
                    { step: "4", title: "复审任务单待命", desc: "初审完成后自动解锁给专家" },
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-3">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0071e3]/[0.08] text-xs font-semibold text-[#0071e3]">
                        {item.step}
                      </div>
                      <div>
                        <p className="text-xs font-medium text-[#1d1d1f]">{item.title}</p>
                        <p className="text-xs text-[#86868b]">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-[#0071e3]/20 bg-[#0071e3]/[0.04] p-6">
                <div className="mb-4 flex items-center gap-2">
                  <Info className="h-5 w-5 text-[#0071e3]" strokeWidth={2} />
                  <h3 className="text-sm font-semibold text-[#0071e3]">重要说明</h3>
                </div>
                <ul className="space-y-2 text-xs text-[#86868b]">
                  <li>• 只能选择已上传并处理完成的数据集</li>
                  <li>• 数据集处理包括格式化、质检、AI预分析</li>
                  <li>• 一次发布，自动生成二级质控流程</li>
                  <li>• 预算透明，系统自动按比例拆分</li>
                  <li>• 任务单联动，复审自动等待初审完成</li>
                </ul>
              </div>
            </div>
          </div>
          )}
        </div>
      </section>
    </main>
  );
}