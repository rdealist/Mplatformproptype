import { Target, Coins, Calendar, Info, FileText, Sparkles, CheckCircle2, Loader2, ShieldCheck, Zap, Database, ArrowRight, ChevronLeft, Search, Plus } from "lucide-react";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";

type AnalysisState = "idle" | "analyzing" | "done";
type Step = 1 | 2 | 3;

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
  { id: "DS001", name: "胸部 CT 肺结节影像集", type: "分类标注", modality: "计算机断层扫描", anatomy: "胸部", count: 1000, size: "42 GB", uploadDate: "2026-05-15" },
  { id: "DS002", name: "脑部 MRI 肿瘤分割数据", type: "分割标注", modality: "磁共振", anatomy: "头颅", count: 500, size: "28 GB", uploadDate: "2026-04-22" },
  { id: "DS003", name: "骨折 X 光检测影像", type: "检测标注", modality: "X射线", anatomy: "四肢", count: 2000, size: "18 GB", uploadDate: "2026-03-10" },
  { id: "DS004", name: "视网膜病变眼底影像", type: "分类标注", modality: "可见光影像", anatomy: "头颅", count: 1500, size: "12 GB", uploadDate: "2026-02-28" },
];

export default function PublishTask() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [selectedDataset, setSelectedDataset] = useState<ExistingDataset | null>(null);
  const [analysisState, setAnalysisState] = useState<AnalysisState>("idle");
  const [annotationRatio, setAnnotationRatio] = useState(80);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 默认截止日期为1个自然月后
  const getDefaultDeadline = () => {
    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    return date.toISOString().split('T')[0];
  };

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    types: [] as string[],
    modality: "",
    anatomy: "",
    level: "",
    pricePerImage: "",
    deadline: getDefaultDeadline(),
    totalImages: "",
  });

  const annotationTypes = ["分类标注", "分割标注", "检测标注", "关键点标注"];

  const budgetBreakdown = useMemo(() => {
    const price = parseFloat(formData.pricePerImage) || 0;
    const total = parseInt(formData.totalImages) || 0;
    const annotationPrice = price * (annotationRatio / 100);
    const reviewPrice = price * ((100 - annotationRatio) / 100);
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

  const handleSelectDataset = (dataset: ExistingDataset) => {
    setSelectedDataset(dataset);
    setAnalysisState("analyzing");
    
    // 模拟分析过程
    setTimeout(() => {
      setFormData(prev => ({
        ...prev,
        title: dataset.name + "标注任务",
        description: `基于数据集「${dataset.name}」的标注需求。包含 ${dataset.count} 张影像，需按规范进行${dataset.type}。`,
        types: [dataset.type],
        modality: dataset.modality,
        anatomy: dataset.anatomy,
        level: "Lv3",
        totalImages: dataset.count.toString(),
      }));
      setAnalysisState("done");
      setCurrentStep(2);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setCurrentStep(3);
      setIsSubmitting(false);
    }, 2000);
  };

  const StepIndicator = () => (
    <div className="mx-auto mb-12 max-w-[600px]">
      <div className="relative flex justify-between">
        {/* Line */}
        <div className="absolute top-5 left-0 h-[2px] w-full bg-black/[0.04]" />
        <div 
          className="absolute top-5 left-0 h-[2px] bg-[#0071e3] transition-all duration-500" 
          style={{ width: currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '100%' }}
        />
        
        {[1, 2, 3].map((s) => (
          <div key={s} className="relative z-10 flex flex-col items-center">
            <div 
              className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                currentStep >= s 
                  ? "border-[#0071e3] bg-[#0071e3] text-white" 
                  : "border-black/[0.08] bg-white text-[#86868b]"
              }`}
            >
              {currentStep > s ? <CheckCircle2 className="h-5 w-5" /> : <span className="text-sm font-bold">{s}</span>}
            </div>
            <span className={`mt-3 text-[13px] font-bold ${currentStep >= s ? "text-[#1d1d1f]" : "text-[#86868b]"}`}>
              {s === 1 ? "选择数据集" : s === 2 ? "发布任务信息" : "发布成功"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#fbfbfd] text-[#1d1d1f] antialiased">
      <section className="px-6 lg:px-20 py-12">
        <div className="mx-auto max-w-[1000px]">
          {/* Back Button */}
          <button 
            onClick={() => currentStep === 3 ? navigate('/workspace') : navigate(-1)}
            className="group mb-12 flex items-center gap-2 text-[#86868b] hover:text-[#1d1d1f] transition-colors"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white border border-black/[0.04] shadow-sm group-hover:bg-black/[0.02] transition-all">
              <ChevronLeft className="h-5 w-5" />
            </div>
            <span className="text-sm font-bold tracking-tight">返回工作台</span>
          </button>

          <div className="mb-16 text-center">
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#1d1d1f] leading-[1.2]">发布标注需求</h1>
            <p className="mt-5 mx-auto max-w-2xl text-lg md:text-xl font-medium text-[#86868b] leading-[1.5]">
              简单三步，快速开启您的医疗数据标注任务
            </p>
          </div>

          <StepIndicator />

          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center justify-between px-2">
                    <h2 className="text-xl font-bold">选择可用数据集</h2>
                    <div className="flex items-center gap-4">
                       <div className="relative">
                         <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#86868b]" />
                         <input type="text" placeholder="搜索数据集..." className="rounded-full border border-black/[0.08] bg-white py-1.5 pl-9 pr-4 text-xs focus:outline-none focus:ring-2 focus:ring-[#0071e3]/10" />
                       </div>
                    </div>
                  </div>

                  {analysisState === "analyzing" ? (
                    <div className="flex flex-col items-center justify-center rounded-[32px] border border-black/[0.06] bg-white p-20 text-center">
                      <Loader2 className="h-12 w-12 animate-spin text-[#0071e3] mb-4" />
                      <h3 className="text-lg font-bold">正在分析数据集结构...</h3>
                      <p className="text-sm text-[#86868b] mt-2">AI 正在为您自动提取模态、解剖部位等核心特征</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {/* 上传数据集入口 */}
                      <button
                        onClick={() => navigate('/publish-data?mode=native')}
                        className="group relative flex flex-col items-center justify-center rounded-[32px] border-2 border-dashed border-black/[0.08] bg-white p-6 text-center transition-all hover:border-[#0071e3]/30 hover:bg-[#0071e3]/[0.02] active:scale-[0.98] min-h-[220px]"
                      >
                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#0071e3]/[0.08] text-[#0071e3] transition-all group-hover:bg-[#0071e3] group-hover:text-white">
                          <Plus className="h-8 w-8" strokeWidth={2.5} />
                        </div>
                        <h3 className="text-lg font-bold text-[#1d1d1f]">去上传数据集</h3>
                        <p className="mt-2 px-6 text-[13px] font-medium text-[#86868b]">
                          还没有处理好的数据集？点击此处前往上传新数据
                        </p>
                        <ArrowRight className="mt-4 h-4 w-4 text-[#0071e3] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </button>

                      {mockExistingDatasets.map((dataset) => (
                        <button
                          key={dataset.id}
                          onClick={() => handleSelectDataset(dataset)}
                          className="group relative flex flex-col items-start rounded-[32px] border border-black/[0.06] bg-white p-6 text-left transition-all hover:border-[#0071e3]/30 hover:shadow-xl active:scale-[0.98]"
                        >
                          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0071e3]/[0.08] text-[#0071e3] transition-colors group-hover:bg-[#0071e3] group-hover:text-white">
                            <Database className="h-6 w-6" />
                          </div>
                          <h3 className="text-lg font-bold truncate w-full">{dataset.name}</h3>
                          <div className="mt-2 flex flex-wrap gap-2">
                            <span className="rounded-full bg-black/[0.04] px-2 py-0.5 text-[10px] font-bold text-[#86868b] uppercase tracking-wider">{dataset.modality}</span>
                            <span className="rounded-full bg-black/[0.04] px-2 py-0.5 text-[10px] font-bold text-[#86868b] uppercase tracking-wider">{dataset.anatomy}</span>
                          </div>
                          <div className="mt-6 flex w-full items-center justify-between border-t border-black/[0.04] pt-4 text-[11px] font-bold text-[#86868b]">
                            <span>{dataset.count} 张影像</span>
                            <span>{dataset.uploadDate}</span>
                          </div>
                          <div className="absolute right-6 top-6 h-6 w-6 rounded-full border border-black/[0.08] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Plus className="h-3 w-3 text-[#0071e3]" />
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left Column: Form */}
                  <div className="lg:col-span-2 space-y-6">
                    <div className="rounded-[32px] border border-black/[0.06] bg-white p-8 shadow-sm">
                      <div className="mb-8 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0071e3]/[0.08] text-[#0071e3]">
                          <Target className="h-5 w-5" />
                        </div>
                        <h2 className="text-xl font-bold">任务配置信息</h2>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <label className="mb-2 block text-[13px] font-bold text-[#1d1d1f] uppercase tracking-wider">需求标题</label>
                          <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full rounded-2xl border border-black/[0.08] bg-[#fbfbfd] px-4 py-3 text-sm focus:border-[#0071e3] focus:outline-none focus:ring-4 focus:ring-[#0071e3]/5 transition-all"
                            required
                          />
                        </div>

                        <div>
                          <label className="mb-2 block text-[13px] font-bold text-[#1d1d1f] uppercase tracking-wider">标注规范说明</label>
                          <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            rows={4}
                            className="w-full rounded-2xl border border-black/[0.08] bg-[#fbfbfd] px-4 py-3 text-sm focus:border-[#0071e3] focus:outline-none focus:ring-4 focus:ring-[#0071e3]/5 transition-all resize-none"
                            required
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="mb-2 block text-[13px] font-bold text-[#1d1d1f] uppercase tracking-wider">成像模态</label>
                            <div className="flex h-11 items-center rounded-2xl bg-black/[0.04] px-4 text-sm font-medium text-[#86868b]">
                              {formData.modality}
                            </div>
                          </div>
                          <div>
                            <label className="mb-2 block text-[13px] font-bold text-[#1d1d1f] uppercase tracking-wider">要求等级</label>
                            <select 
                              value={formData.level}
                              onChange={(e) => setFormData({...formData, level: e.target.value})}
                              className="w-full h-11 rounded-2xl border border-black/[0.08] bg-[#fbfbfd] px-4 text-sm focus:outline-none focus:ring-4 focus:ring-[#0071e3]/5"
                            >
                              <option value="Lv1">Lv.1 初级</option>
                              <option value="Lv2">Lv.2 进阶</option>
                              <option value="Lv3">Lv.3 专业</option>
                              <option value="Lv4">Lv.4 资深</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="mb-3 block text-[13px] font-bold text-[#1d1d1f] uppercase tracking-wider">标注类型</label>
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
                                      types: isSelected ? prev.types.filter(t => t !== type) : [...prev.types, type]
                                    }));
                                  }}
                                  className={`rounded-full px-5 py-2 text-[12px] font-bold transition-all ${
                                    isSelected
                                      ? "bg-[#0071e3] text-white shadow-lg shadow-[#0071e3]/20"
                                      : "bg-black/[0.04] text-[#86868b] hover:bg-black/[0.08]"
                                  }`}
                                >
                                  {type}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-[32px] border border-black/[0.06] bg-white p-8 shadow-sm">
                      <div className="mb-8 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ff9500]/[0.08] text-[#ff9500]">
                          <Coins className="h-5 w-5" />
                        </div>
                        <h2 className="text-xl font-bold">预算与计划</h2>
                      </div>

                      <div className="space-y-8">
                        <div>
                          <label className="mb-2 block text-[13px] font-bold text-[#1d1d1f] uppercase tracking-wider">单张影像预算 (积分/张)</label>
                          <div className="relative">
                            <input
                              type="number"
                              step="0.1"
                              value={formData.pricePerImage}
                              onChange={(e) => setFormData({ ...formData, pricePerImage: e.target.value })}
                              className="w-full rounded-2xl border border-black/[0.08] bg-[#fbfbfd] px-4 py-3 text-sm focus:border-[#0071e3] focus:outline-none transition-all"
                              placeholder="0.0"
                              required
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-[#86868b] uppercase">积分</div>
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-4">
                             <label className="text-[13px] font-bold text-[#1d1d1f] uppercase tracking-wider">标注/复审预算分配</label>
                             <span className="text-xs font-bold text-[#0071e3] bg-[#0071e3]/[0.08] px-2 py-0.5 rounded-full">{annotationRatio}% : {100 - annotationRatio}%</span>
                          </div>
                          <input
                            type="range"
                            min="60"
                            max="95"
                            step="5"
                            value={annotationRatio}
                            onChange={(e) => setAnnotationRatio(parseInt(e.target.value))}
                            className="w-full h-1.5 bg-black/[0.04] rounded-full appearance-none cursor-pointer accent-[#0071e3]"
                          />
                          <div className="mt-2 flex justify-between text-[10px] font-bold text-[#86868b] uppercase tracking-widest">
                            <span>标注侧重</span>
                            <span>专家侧重</span>
                          </div>
                        </div>

                        <div>
                          <label className="mb-2 block text-[13px] font-bold text-[#1d1d1f] uppercase tracking-wider">任务截止日期</label>
                          <div className="relative">
                            <Calendar className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#86868b]" />
                            <input
                              type="date"
                              value={formData.deadline}
                              onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                              className="w-full rounded-2xl border border-black/[0.08] bg-[#fbfbfd] py-3 pl-12 pr-4 text-sm focus:outline-none"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Summary */}
                  <div className="space-y-6">
                    <div className="sticky top-6 rounded-[32px] border border-black/[0.06] bg-white p-8 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.04)]">
                       <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-[#1d1d1f]">
                         <Sparkles className="h-5 w-5 text-[#0071e3]" />
                         自动生成方案预览
                       </h3>

                       <div className="space-y-6">
                          <div className="space-y-2">
                            <p className="text-[10px] font-bold text-[#86868b] uppercase tracking-[0.2em]">预估总预算</p>
                            <p className="text-4xl font-bold tracking-tight text-[#0071e3]">{budgetBreakdown.totalBudget}<span className="ml-1 text-sm font-medium text-[#86868b]">积分</span></p>
                          </div>

                          <div className="space-y-4 pt-6 border-t border-black/[0.04]">
                            <div className="flex justify-between items-center">
                              <span className="text-[11px] font-medium text-[#86868b]">初审任务单 ({annotationRatio}%)</span>
                              <span className="text-sm font-bold text-[#1d1d1f]">{budgetBreakdown.annotationPrice} 积分/张</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-[11px] font-medium text-[#86868b]">专家复审单 ({100-annotationRatio}%)</span>
                              <span className="text-sm font-bold text-[#1d1d1f]">{budgetBreakdown.reviewPrice} 积分/张</span>
                            </div>
                          </div>

                          <div className="pt-8">
                            <button 
                              type="submit"
                              disabled={isSubmitting || !budgetBreakdown.hasData}
                              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0071e3] py-4 text-sm font-bold text-white shadow-lg shadow-[#0071e3]/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:scale-100"
                            >
                              {isSubmitting ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                              ) : (
                                <>
                                  发布任务
                                  <ArrowRight className="h-4 w-4" />
                                </>
                              )}
                            </button>
                            <p className="mt-4 text-center text-[10px] text-[#86868b]">发布后将自动扣除相应积分并进入冻结状态</p>
                          </div>
                       </div>
                    </div>

                    <div className="rounded-[32px] border border-black/[0.06] bg-white p-6 shadow-sm">
                       <h4 className="text-[11px] font-bold text-[#86868b] uppercase tracking-widest mb-4">当前数据集</h4>
                       <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-xl bg-[#0071e3]/[0.08] flex items-center justify-center">
                             <Database className="h-5 w-5 text-[#0071e3]" />
                          </div>
                          <div className="min-w-0">
                             <p className="text-sm font-bold truncate">{selectedDataset?.name}</p>
                             <p className="text-[11px] font-medium text-[#86868b]">{selectedDataset?.count} 张样本</p>
                          </div>
                       </div>
                       <button 
                         type="button"
                         onClick={() => {
                           setCurrentStep(1);
                           setSelectedDataset(null);
                           setAnalysisState("idle");
                         }}
                         className="mt-4 w-full py-2 text-[11px] font-bold text-[#0071e3] hover:underline"
                       >
                         更换数据集
                       </button>
                    </div>
                  </div>
                </form>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mx-auto max-w-[600px] text-center"
              >
                <div className="rounded-[40px] border border-black/[0.06] bg-white p-12 shadow-2xl">
                   <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-[#34c759]/[0.08] text-[#34c759]">
                      <CheckCircle2 className="h-12 w-12" strokeWidth={2.5} />
                   </div>
                   <h2 className="text-3xl font-bold tracking-tight">发布成功</h2>
                   <p className="mt-4 text-[17px] font-medium text-[#86868b]">
                     您的标注任务「{formData.title}」已正式发布。初审任务单已同步至任务市场，复审单进入待命状态。
                   </p>

                   <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="rounded-2xl border border-black/[0.06] bg-[#fbfbfd] p-5 text-left">
                        <p className="text-[10px] font-bold text-[#86868b] uppercase tracking-wider mb-2">已扣除预算</p>
                        <p className="text-xl font-bold text-[#1d1d1f]">{budgetBreakdown.totalBudget} <span className="text-xs font-medium text-[#86868b]">积分</span></p>
                      </div>
                      <div className="rounded-2xl border border-black/[0.06] bg-[#fbfbfd] p-5 text-left">
                        <p className="text-[10px] font-bold text-[#86868b] uppercase tracking-wider mb-2">预计处理周期</p>
                        <p className="text-xl font-bold text-[#1d1d1f]">约 14 <span className="text-xs font-medium text-[#86868b]">个工作日</span></p>
                      </div>
                   </div>

                   <div className="mt-10 flex flex-col gap-3">
                      <button 
                        onClick={() => navigate('/workspace')}
                        className="rounded-2xl bg-[#0071e3] py-4 text-sm font-bold text-white shadow-lg shadow-[#0071e3]/20 transition-all hover:opacity-90 active:scale-[0.98]"
                      >
                        进入我的工作台查看进度
                      </button>
                      <button 
                        onClick={() => {
                          setCurrentStep(1);
                          setSelectedDataset(null);
                          setAnalysisState("idle");
                        }}
                        className="rounded-2xl border border-black/[0.08] bg-white py-4 text-sm font-bold text-[#1d1d1f] transition-all hover:bg-black/[0.02]"
                      >
                        继续发布新任务
                      </button>
                   </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}
