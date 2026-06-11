import { Upload, Database, Sparkles, CheckCircle2, Loader2, ExternalLink, Globe, Lock, Settings, ChevronRight, Check, ChevronLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";

type AnalysisState = "idle" | "analyzing" | "done";
type PublishMode = "native" | "external";

const MODALITY_OPTIONS = [
  { value: "X-ray", label: "X射线" },
  { value: "CT", label: "计算机断层扫描" },
  { value: "US", label: "超声" },
  { value: "LAB", label: "实验室与分子显色" },
  { value: "MR", label: "磁共振" },
  { value: "WSI", label: "全幅数字病理" },
  { value: "VL", label: "可见光影像" },
  { value: "NM", label: "核医学与分子代谢" },
  { value: "VIDEO", label: "时序动态视频" },
  { value: "OTH", label: "其他" }
];

const ANATOMY_OPTIONS = ["头颅", "颈部", "胸部", "腹部", "盆腔", "脊柱", "四肢", "心脏", "血管", "乳腺", "骨骼", "关节", "全身", "其他"];

export default function PublishData() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialMode = (searchParams.get("mode") as PublishMode) || "native";
  
  const [mode, setMode] = useState<PublishMode>(initialMode);
  const [analysisState, setAnalysisState] = useState<AnalysisState>("idle");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    modality: "",
    anatomy: [] as string[],
    sampleSize: "",
    dataSize: "",
    license: "CC BY 4.0",
    externalUrl: "",
    isDownloadable: true,
    isTaskable: true,
    isTrainable: true,
  });

  // 模拟上传后 AI 自动分析填充
  const simulateAnalysis = () => {
    setAnalysisState("analyzing");
    setTimeout(() => {
      setFormData(prev => ({
        ...prev,
        name: "胸部 CT 肺结节随访队列",
        description: "本数据集包含来自同一机构的胸部低剂量 CT 扫描序列，涵盖肺结节随访病例，DICOM 格式，已完成院内脱敏处理。适用于肺结节良恶性分类、生长速率预测及 CAD 模型训练任务。",
        modality: "CT",
        anatomy: ["胸部"],
        sampleSize: "12,500 张",
        dataSize: "128 GB",
      }));
      setAnalysisState("done");
    }, 2200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/workspace');
  };

  const isAutoFilled = mode === "native" ? analysisState === "done" : formData.name && formData.externalUrl;

  const toggleAnatomy = (val: string) => {
    setFormData(prev => ({
      ...prev,
      anatomy: prev.anatomy.includes(val) 
        ? prev.anatomy.filter(a => a !== val)
        : [...prev.anatomy, val]
    }));
  };

  return (
    <main className="min-h-screen bg-[#fbfbfd] text-[#1d1d1f] antialiased">
      <section className="px-6 lg:px-20 py-12 lg:py-20">
        <div className="mx-auto max-w-[1200px]">
          {/* Back Button */}
          <button 
            onClick={() => navigate(-1)}
            className="group mb-12 flex items-center gap-2 text-[#86868b] hover:text-[#1d1d1f] transition-colors"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white border border-black/[0.04] shadow-sm group-hover:bg-black/[0.02] transition-all">
              <ChevronLeft className="h-5 w-5" />
            </div>
            <span className="text-sm font-bold tracking-tight">返回工作台</span>
          </button>

          <div className="mb-16 text-center">
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#1d1d1f] leading-[1.2]">
              {mode === "native" ? "上传数据集" : "委托平台展示"}
            </h1>
            <p className="mt-5 mx-auto max-w-2xl text-lg md:text-xl font-medium text-[#86868b] leading-[1.5]">
              {mode === "native" 
                ? "支持 AI 自动识别与填充，沉浸式完成资产数字化" 
                : "配置第三方平台数据集展示，支持站外引流与购买跳转"}
            </p>
            
            <div className="mt-10 flex justify-center">
              <div className="flex items-center gap-1 rounded-full bg-black/[0.04] p-1 h-12">
                <button
                  onClick={() => setMode("native")}
                  className={`flex items-center gap-2 rounded-full px-6 h-full text-sm font-bold transition-all ${
                    mode === "native" ? "bg-white text-[#0071e3] shadow-sm" : "text-[#86868b] hover:text-[#1d1d1f]"
                  }`}
                >
                  <Database className="h-4 w-4" />
                  上传数据集
                </button>
                <button
                  onClick={() => setMode("external")}
                  className={`flex items-center gap-2 rounded-full px-6 h-full text-sm font-bold transition-all ${
                    mode === "external" ? "bg-white text-[#ff9500] shadow-sm" : "text-[#86868b] hover:text-[#1d1d1f]"
                  }`}
                >
                  <ExternalLink className="h-4 w-4" />
                  委托展示
                </button>
              </div>
            </div>
          </div>

          {mode === "native" && (
            <div
              onClick={analysisState === "idle" ? simulateAnalysis : undefined}
              className={`mb-10 rounded-[32px] border-2 border-dashed p-16 text-center transition-all duration-500 ${
                analysisState === "idle"
                  ? "cursor-pointer border-black/[0.06] bg-white hover:border-[#0071e3]/40 hover:bg-[#0071e3]/[0.01] hover:scale-[1.005]"
                  : analysisState === "analyzing"
                  ? "border-[#0071e3]/20 bg-[#0071e3]/[0.02]"
                  : "border-[#34c759]/20 bg-[#34c759]/[0.02]"
              }`}
            >
              {analysisState === "idle" && (
                <>
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#0071e3]/[0.08]">
                    <Upload className="h-8 w-8 text-[#0071e3]" strokeWidth={1.5} />
                  </div>
                  <p className="mb-1 text-[20px] font-bold text-[#1d1d1f]">点击上传或拖拽文件至此</p>
                  <p className="text-[14px] text-[#86868b]">支持 .zip、.tar.gz 等格式，单个文件不超过 10 GB</p>
                </>
              )}
              {analysisState === "analyzing" && (
                <>
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#0071e3]/[0.08]">
                    <Loader2 className="h-8 w-8 animate-spin text-[#0071e3]" strokeWidth={1.5} />
                  </div>
                  <p className="mb-1 text-[20px] font-bold text-[#1d1d1f]">AI 正在深度分析中…</p>
                  <p className="text-[14px] text-[#86868b]">自动识别解剖部位、成像模态及样本规模</p>
                </>
              )}
              {analysisState === "done" && (
                <>
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#34c759]/[0.10]">
                    <CheckCircle2 className="h-8 w-8 text-[#34c759]" strokeWidth={1.5} />
                  </div>
                  <p className="mb-1 text-[20px] font-bold text-[#1d1d1f]">分析完成，已就地填充</p>
                  <p className="text-[14px] text-[#86868b]">请在下方确认或调整自动生成的属性信息</p>
                </>
              )}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* 基本信息 */}
            <div className="rounded-[40px] border border-black/[0.06] bg-white p-10 shadow-sm">
              <div className="mb-10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-[#0071e3]/[0.06] flex items-center justify-center">
                    <Database className="h-5 w-5 text-[#0071e3]" />
                  </div>
                  <h2 className="text-[22px] font-bold tracking-tight">核心数据集属性</h2>
                </div>
                {mode === "native" && isAutoFilled && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-1.5 rounded-full bg-[#34c759]/[0.08] px-4 py-1.5"
                  >
                    <Sparkles className="h-3.5 w-3.5 text-[#34c759]" />
                    <span className="text-[11px] font-bold text-[#34c759] uppercase tracking-wider">AI 辅助填充开启</span>
                  </motion.div>
                )}
              </div>

              <div className="space-y-8">
                <div>
                  <label className="mb-3 block text-[11px] font-bold uppercase tracking-[0.15em] text-[#86868b]">数据集名称</label>
                  <input
                    type="text"
                    placeholder={mode === "native" ? "上传文件后自动填充" : "请输入数据集标题"}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-2xl border border-black/[0.08] bg-[#fbfbfd]/50 px-5 py-4 text-[16px] font-medium text-[#1d1d1f] transition-all focus:border-[#0071e3] focus:outline-none focus:ring-4 focus:ring-[#0071e3]/5"
                  />
                </div>

                <div>
                  <label className="mb-3 block text-[11px] font-bold uppercase tracking-[0.15em] text-[#86868b]">数据集详述</label>
                  <textarea
                    placeholder={mode === "native" ? "AI 自动生成的语义描述" : "描述该数据集的来源、标注标准及适用场景"}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className="w-full resize-none rounded-2xl border border-black/[0.08] bg-[#fbfbfd]/50 px-5 py-4 text-[15px] font-medium leading-relaxed text-[#1d1d1f] transition-all focus:border-[#0071e3] focus:outline-none focus:ring-4 focus:ring-[#0071e3]/5"
                  />
                </div>

                {mode === "external" && (
                  <div>
                    <label className="mb-3 block text-[11px] font-bold uppercase tracking-[0.15em] text-[#86868b]">外部购买跳转链接</label>
                    <div className="relative">
                      <Globe className="absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#86868b]" />
                      <input
                        type="url"
                        placeholder="https://external-store.com/data/..."
                        value={formData.externalUrl}
                        onChange={(e) => setFormData({ ...formData, externalUrl: e.target.value })}
                        className="w-full rounded-2xl border border-black/[0.08] bg-[#fbfbfd]/50 py-4 pl-14 pr-5 text-[16px] font-medium text-[#1d1d1f] transition-all focus:border-[#ff9500] focus:outline-none focus:ring-4 focus:ring-[#ff9500]/5"
                      />
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {/* Modality Selection */}
                  <div>
                    <label className="mb-4 block text-[11px] font-bold uppercase tracking-[0.15em] text-[#86868b]">成��模态 (Modality)</label>
                    <div className="flex flex-wrap gap-2.5">
                      {MODALITY_OPTIONS.map(opt => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setFormData({ ...formData, modality: opt.value })}
                          className={`px-5 py-2.5 rounded-xl text-[13px] font-bold transition-all border ${
                            formData.modality === opt.value 
                              ? "bg-[#0071e3] border-[#0071e3] text-white shadow-md shadow-[#0071e3]/20" 
                              : "bg-white border-black/[0.06] text-[#1d1d1f] hover:border-[#0071e3]/30"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Anatomy Selection */}
                  <div>
                    <label className="mb-4 block text-[11px] font-bold uppercase tracking-[0.15em] text-[#86868b]">解剖部位 (Anatomy)</label>
                    <div className="flex flex-wrap gap-2.5">
                      {ANATOMY_OPTIONS.map(opt => {
                        const isSelected = formData.anatomy.includes(opt);
                        return (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => toggleAnatomy(opt)}
                            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-[13px] font-bold transition-all border ${
                              isSelected 
                                ? "bg-[#34c759]/[0.08] border-[#34c759]/30 text-[#34c759]" 
                                : "bg-white border-black/[0.06] text-[#1d1d1f] hover:border-[#34c759]/30"
                            }`}
                          >
                            {isSelected && <Check className="h-3.5 w-3.5" />}
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="mb-3 block text-[11px] font-bold uppercase tracking-[0.15em] text-[#86868b]">样本规模</label>
                    <input
                      type="text"
                      placeholder="如: 1,500 序列"
                      value={formData.sampleSize}
                      onChange={(e) => setFormData({ ...formData, sampleSize: e.target.value })}
                      className="w-full rounded-2xl border border-black/[0.08] bg-[#fbfbfd]/50 px-5 py-4 text-[16px] font-medium text-[#1d1d1f] transition-all focus:border-[#0071e3] focus:outline-none focus:ring-4 focus:ring-[#0071e3]/5"
                    />
                  </div>
                  <div>
                    <label className="mb-3 block text-[11px] font-bold uppercase tracking-[0.15em] text-[#86868b]">存储占用</label>
                    <input
                      type="text"
                      placeholder="如: 45.2 GB"
                      value={formData.dataSize}
                      onChange={(e) => setFormData({ ...formData, dataSize: e.target.value })}
                      className="w-full rounded-2xl border border-black/[0.08] bg-[#fbfbfd]/50 px-5 py-4 text-[16px] font-medium text-[#1d1d1f] transition-all focus:border-[#0071e3] focus:outline-none focus:ring-4 focus:ring-[#0071e3]/5"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 交易属性设置 - 仅针对 native 模式 */}
            {mode === "native" && (
              <div className="rounded-[40px] border border-black/[0.06] bg-white p-10 shadow-sm">
                <div className="mb-10 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-[#5ac8fa]/[0.06] flex items-center justify-center">
                    <Settings className="h-5 w-5 text-[#5ac8fa]" />
                  </div>
                  <h2 className="text-[22px] font-bold tracking-tight">商业权益与用途配置</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { key: "isDownloadable", label: "数据购买下载", desc: "允许其他机构购买并离线下载原始影像数据" },
                    { key: "isTaskable", label: "支持标注任务", desc: "允许该数据集在平台发布各种标注、审核任务" },
                    { key: "isTrainable", label: "MAAS 训练底座", desc: "允许作为私有模型或通用大模型的微调训练样本" },
                  ].map(({ key, label, desc }) => (
                    <label 
                      key={key}
                      className={`flex cursor-pointer flex-col gap-4 rounded-[28px] border p-6 transition-all duration-300 ${
                        formData[key as keyof typeof formData] 
                          ? "border-[#0071e3] bg-[#0071e3]/[0.02] shadow-sm shadow-[#0071e3]/10" 
                          : "border-black/[0.06] bg-white hover:border-black/[0.12]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[15px] font-bold text-[#1d1d1f]">{label}</span>
                        <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all ${
                          formData[key as keyof typeof formData] ? "border-[#0071e3] bg-[#0071e3]" : "border-black/[0.15]"
                        }`}>
                          {formData[key as keyof typeof formData] && <Check className="h-3.5 w-3.5 text-white" />}
                        </div>
                      </div>
                      <p className="text-[12px] text-[#86868b] leading-[1.6] font-medium">{desc}</p>
                      <input 
                        type="checkbox"
                        className="hidden"
                        checked={!!formData[key as keyof typeof formData]}
                        onChange={() => setFormData({ ...formData, [key]: !formData[key as keyof typeof formData] })}
                      />
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* 提交 */}
            <div className="flex items-center justify-end gap-6 pt-10 pb-20">
              <button
                type="submit"
                disabled={!isAutoFilled}
                className={`group relative overflow-hidden rounded-full px-16 py-5 text-[17px] font-bold text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 ${
                  mode === "native" 
                    ? "bg-[#0071e3] shadow-[0_16px_40px_-12px_rgba(0,113,227,0.5)]" 
                    : "bg-[#ff9500] shadow-[0_16px_40px_-12px_rgba(255,149,0,0.5)]"
                }`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  完成并发布到市场
                  <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
