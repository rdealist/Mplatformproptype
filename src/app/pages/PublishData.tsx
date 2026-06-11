import { Upload, Database, Sparkles, CheckCircle2, Loader2, ExternalLink, Globe, Lock, Settings } from "lucide-react";
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router";

type AnalysisState = "idle" | "analyzing" | "done";
type PublishMode = "native" | "external";

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
    anatomy: "",
    sampleSize: "",
    dataSize: "",
    license: "CC BY 4.0",
    externalUrl: "",
    isDownloadable: true,
    isTaskable: true,
    isTrainable: true,
  });

  const licenses = ["CC BY 4.0", "CC BY-NC 4.0", "CC BY-SA 4.0", "MIT", "自定义协议"];

  // 模拟上传后 AI 自动分析填充
  const simulateAnalysis = () => {
    setAnalysisState("analyzing");
    setTimeout(() => {
      setFormData(prev => ({
        ...prev,
        name: "胸部 CT 肺结节随访队列",
        description: "本数据集包含来自同一机构的胸部低剂量 CT 扫描序列，涵盖肺结节随访病例，DICOM 格式，已完成院内脱敏处理。适用于肺结节良恶性分类、生长速率预测及 CAD 模型训练任务。",
        modality: "CT",
        anatomy: "胸部",
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

  return (
    <main className="min-h-screen bg-[#fbfbfd] text-[#1d1d1f] antialiased">
      <section className="px-20 py-28">
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h1 className="text-5xl font-semibold leading-[1.16] tracking-[-0.015em]">
                {mode === "native" ? "上传数据集" : "上架第三方数据集"}
              </h1>
              <p className="mt-6 text-[21px] font-medium leading-[1.52] text-[#86868b]">
                {mode === "native" 
                  ? "上传文件后，AI 自动完成识别与填充，您只需确认即可" 
                  : "配置第三方平台数据集的展示信息，实机交易将跳转至外部链接"}
              </p>
            </div>
            
            <div className="flex items-center gap-1 rounded-full bg-black/[0.04] p-1 h-12">
              <button
                onClick={() => setMode("native")}
                className={`flex items-center gap-2 rounded-full px-6 h-full text-sm font-bold transition-all ${
                  mode === "native" ? "bg-white text-[#0071e3] shadow-sm" : "text-[#86868b] hover:text-[#1d1d1f]"
                }`}
              >
                <Database className="h-4 w-4" />
                机构上传
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

          {mode === "native" && (
            <div
              onClick={analysisState === "idle" ? simulateAnalysis : undefined}
              className={`mb-10 rounded-[32px] border-2 border-dashed p-20 text-center transition-all duration-500 ${
                analysisState === "idle"
                  ? "cursor-pointer border-black/[0.06] bg-white hover:border-[#0071e3]/40 hover:bg-[#0071e3]/[0.01] hover:scale-[1.005]"
                  : analysisState === "analyzing"
                  ? "border-[#0071e3]/20 bg-[#0071e3]/[0.02]"
                  : "border-[#34c759]/20 bg-[#34c759]/[0.02]"
              }`}
            >
              {analysisState === "idle" && (
                <>
                  <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#0071e3]/[0.08]">
                    <Upload className="h-10 w-10 text-[#0071e3]" strokeWidth={1.5} />
                  </div>
                  <p className="mb-2 text-[24px] font-semibold text-[#1d1d1f]">点击上传或拖拽文件至此</p>
                  <p className="text-[15px] text-[#86868b]">支持 .zip、.tar.gz 等压缩格式，单个文件不超过 10 GB</p>
                </>
              )}
              {analysisState === "analyzing" && (
                <>
                  <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#0071e3]/[0.08]">
                    <Loader2 className="h-10 w-10 animate-spin text-[#0071e3]" strokeWidth={1.5} />
                  </div>
                  <p className="mb-2 text-[24px] font-semibold text-[#1d1d1f]">AI 正在分析数据集…</p>
                  <p className="text-[15px] text-[#86868b]">自动识别模态、部位、样本规模，请稍候</p>
                </>
              )}
              {analysisState === "done" && (
                <>
                  <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#34c759]/[0.10]">
                    <CheckCircle2 className="h-10 w-10 text-[#34c759]" strokeWidth={1.5} />
                  </div>
                  <p className="mb-2 text-[24px] font-semibold text-[#1d1d1f]">分析完成，信息已自动填充</p>
                  <p className="text-[15px] text-[#86868b]">请在下方确认或修改各字段内容</p>
                </>
              )}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-10">
            {/* 基本信息 */}
            <div className="rounded-[32px] border border-black/[0.06] bg-white p-10 shadow-sm">
              <div className="mb-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Database className="h-6 w-6 text-[#0071e3]" strokeWidth={2} />
                  <h2 className="text-[24px] font-semibold">基本信息</h2>
                </div>
                {mode === "native" && isAutoFilled && (
                  <div className="flex items-center gap-1.5 rounded-full bg-[#34c759]/[0.08] px-4 py-1.5">
                    <Sparkles className="h-4 w-4 text-[#34c759]" strokeWidth={2} />
                    <span className="text-[13px] font-bold text-[#34c759]">AI 已自动填充，可手动修改</span>
                  </div>
                )}
              </div>

              <div className="space-y-8">
                <div>
                  <label className="mb-3 block text-[13px] font-bold uppercase tracking-wider text-[#86868b]">数据集名称</label>
                  <input
                    type="text"
                    placeholder={mode === "native" ? "上传文件后自动生成" : "请输入第三方数据集标题"}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-2xl border border-black/[0.08] bg-white px-5 py-4 text-[16px] font-medium text-[#1d1d1f] transition-all duration-200 focus:border-[#0071e3] focus:outline-none focus:ring-4 focus:ring-[#0071e3]/5"
                  />
                </div>

                <div>
                  <label className="mb-3 block text-[13px] font-bold uppercase tracking-wider text-[#86868b]">数据集描述</label>
                  <textarea
                    placeholder={mode === "native" ? "上传文件后由 AI 自动生成描述" : "请输入数据集商品简介信息"}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className="w-full resize-none rounded-2xl border border-black/[0.08] bg-white px-5 py-4 text-[15px] font-medium leading-relaxed text-[#1d1d1f] transition-all duration-200 focus:border-[#0071e3] focus:outline-none focus:ring-4 focus:ring-[#0071e3]/5"
                  />
                </div>

                {mode === "external" && (
                  <div>
                    <label className="mb-3 block text-[13px] font-bold uppercase tracking-wider text-[#86868b]">站外购买链接</label>
                    <div className="relative">
                      <Globe className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#86868b]" />
                      <input
                        type="url"
                        placeholder="https://example.com/dataset-buy"
                        value={formData.externalUrl}
                        onChange={(e) => setFormData({ ...formData, externalUrl: e.target.value })}
                        className="w-full rounded-2xl border border-black/[0.08] bg-white py-4 pl-14 pr-5 text-[16px] font-medium text-[#1d1d1f] transition-all focus:border-[#ff9500] focus:outline-none focus:ring-4 focus:ring-[#ff9500]/5"
                      />
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-6">
                  {[
                    { key: "modality", label: "成像模态" },
                    { key: "anatomy", label: "解剖部位" },
                  ].map(({ key, label }) => (
                    <div key={key}>
                      <label className="mb-3 block text-[13px] font-bold uppercase tracking-wider text-[#86868b]">{label}</label>
                      <input
                        type="text"
                        placeholder={mode === "native" ? "AI 自动判断" : "手动输入"}
                        value={formData[key as keyof typeof formData] as string}
                        onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                        className="w-full rounded-2xl border border-black/[0.08] bg-white px-5 py-4 text-[16px] font-medium text-[#1d1d1f] transition-all duration-200 focus:border-[#0071e3] focus:outline-none focus:ring-4 focus:ring-[#0071e3]/5"
                      />
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {[
                    { key: "sampleSize", label: "样本规模" },
                    { key: "dataSize", label: "数据集大小" },
                  ].map(({ key, label }) => (
                    <div key={key}>
                      <label className="mb-3 block text-[13px] font-bold uppercase tracking-wider text-[#86868b]">{label}</label>
                      <input
                        type="text"
                        placeholder={mode === "native" ? "自动读取" : "手动输入"}
                        value={formData[key as keyof typeof formData] as string}
                        onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                        className="w-full rounded-2xl border border-black/[0.08] bg-white px-5 py-4 text-[16px] font-medium text-[#1d1d1f] transition-all duration-200 focus:border-[#0071e3] focus:outline-none focus:ring-4 focus:ring-[#0071e3]/5"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 交易属性设置 - 仅针对 native 模式 */}
            {mode === "native" && (
              <div className="rounded-[32px] border border-black/[0.06] bg-white p-10 shadow-sm">
                <div className="mb-8 flex items-center gap-3">
                  <Settings className="h-6 w-6 text-[#0071e3]" strokeWidth={2} />
                  <h2 className="text-[24px] font-semibold">交易属性设置</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { key: "isDownloadable", label: "支持购买下载", desc: "原始影像包完整交付" },
                    { key: "isTaskable", label: "支持发布任务", desc: "仅可在工作台发布标注任务" },
                    { key: "isTrainable", label: "支持模型训练", desc: "仅可作为 MAAS 训练底座" },
                  ].map(({ key, label, desc }) => (
                    <label 
                      key={key}
                      className={`flex cursor-pointer flex-col gap-3 rounded-[24px] border p-6 transition-all duration-300 ${
                        formData[key as keyof typeof formData] 
                          ? "border-[#0071e3] bg-[#0071e3]/[0.02] shadow-sm" 
                          : "border-black/[0.06] bg-white hover:border-black/[0.12]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[16px] font-bold text-[#1d1d1f]">{label}</span>
                        <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center transition-all ${
                          formData[key as keyof typeof formData] ? "border-[#0071e3] bg-[#0071e3]" : "border-black/[0.15]"
                        }`}>
                          {formData[key as keyof typeof formData] && <CheckCircle2 className="h-3 w-3 text-white" />}
                        </div>
                      </div>
                      <p className="text-[12px] text-[#86868b] leading-relaxed">{desc}</p>
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
            <div className="flex items-center justify-end gap-6 pt-4 pb-20">
              <button
                type="submit"
                disabled={!isAutoFilled}
                className={`group relative overflow-hidden rounded-full px-12 py-5 text-[18px] font-bold text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100 disabled:shadow-none ${
                  mode === "native" 
                    ? "bg-[#0071e3] shadow-[0_12px_32px_-8px_rgba(0,113,227,0.5)] hover:shadow-[0_16px_40px_-8px_rgba(0,113,227,0.6)]" 
                    : "bg-[#ff9500] shadow-[0_12px_32px_-8px_rgba(255,149,0,0.5)] hover:shadow-[0_16px_40px_-8px_rgba(255,149,0,0.6)]"
                }`}
              >
                <span className="relative z-10">提交</span>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
