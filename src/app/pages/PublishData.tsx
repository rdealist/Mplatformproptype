import { Upload, Database, Sparkles, CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";

type AnalysisState = "idle" | "analyzing" | "done";

export default function PublishData() {
  const [analysisState, setAnalysisState] = useState<AnalysisState>("idle");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    modality: "",
    anatomy: "",
    indication: "",
    sampleSize: "",
    dataSize: "",
    license: "",
    isPublic: true,
    sourceType: "platform",
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
        category: "胸部影像专科专题组",
        modality: "CT",
        anatomy: "胸部",
        indication: "肺结节、肺癌筛查",
        sampleSize: "12,500 张",
        dataSize: "128 GB",
      }));
      setAnalysisState("done");
    }, 2200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const autoFields = ["name", "description", "category", "modality", "anatomy", "sampleSize", "dataSize"];
  const isAutoFilled = analysisState === "done";

  return (
    <main className="min-h-screen bg-[#fbfbfd] text-[#1d1d1f] antialiased">
      <section className="px-20 py-28">
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-8">
            <h1 className="text-5xl font-semibold leading-[1.16] tracking-[-0.015em]">上传数据集</h1>
            <p className="mt-6 text-[21px] font-medium leading-[1.52] text-[#86868b]">
              上传文件后，AI 自动完成识别与填充，您只需确认即可
            </p>
          </div>

          {/* 上传区域：独立于表单，置于最顶部 */}
          <div
            onClick={analysisState === "idle" ? simulateAnalysis : undefined}
            className={`mb-6 rounded-3xl border-2 border-dashed p-16 text-center transition-all duration-300 ${
              analysisState === "idle"
                ? "cursor-pointer border-black/[0.08] bg-white hover:border-[#0071e3]/30 hover:bg-[#0071e3]/[0.02]"
                : analysisState === "analyzing"
                ? "border-[#0071e3]/30 bg-[#0071e3]/[0.02]"
                : "border-[#34c759]/30 bg-[#34c759]/[0.02]"
            }`}
          >
            {analysisState === "idle" && (
              <>
                <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#0071e3]/[0.08]">
                  <Upload className="h-10 w-10 text-[#0071e3]" strokeWidth={1.5} />
                </div>
                <p className="mb-2 text-[21px] font-semibold text-[#1d1d1f]">点击上传或拖拽文件至此</p>
                <p className="text-sm text-[#86868b]">支持 .zip、.tar.gz 等压缩格式，单个文件不超过 10 GB</p>
              </>
            )}
            {analysisState === "analyzing" && (
              <>
                <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#0071e3]/[0.08]">
                  <Loader2 className="h-10 w-10 animate-spin text-[#0071e3]" strokeWidth={1.5} />
                </div>
                <p className="mb-2 text-[21px] font-semibold text-[#1d1d1f]">AI 正在分析数据集…</p>
                <p className="text-sm text-[#86868b]">自动识别模态、部位、样本规模，请稍候</p>
              </>
            )}
            {analysisState === "done" && (
              <>
                <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#34c759]/[0.10]">
                  <CheckCircle2 className="h-10 w-10 text-[#34c759]" strokeWidth={1.5} />
                </div>
                <p className="mb-2 text-[21px] font-semibold text-[#1d1d1f]">分析完成，信息已自动填充</p>
                <p className="text-sm text-[#86868b]">请在下方确认或修改各字段内容</p>
              </>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* 基本信息 */}
            <div className="rounded-3xl border border-black/[0.08] bg-white p-8 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-[#0071e3]" strokeWidth={2} />
                  <h2 className="text-[21px] font-semibold leading-[1.52]">基本信息</h2>
                </div>
                {isAutoFilled && (
                  <div className="flex items-center gap-1.5 rounded-full bg-[#34c759]/[0.08] px-3 py-1">
                    <Sparkles className="h-3.5 w-3.5 text-[#34c759]" strokeWidth={2} />
                    <span className="text-xs font-medium text-[#34c759]">AI 已自动填充，可手动修改</span>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                {/* 数据集名称 */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#1d1d1f]">数据集名称</label>
                  {isAutoFilled ? (
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-full border border-[#34c759]/30 bg-[#34c759]/[0.02] px-4 py-2 text-sm text-[#1d1d1f] transition-all duration-200 focus:border-[#0071e3]/30 focus:outline-none focus:ring-2 focus:ring-[#0071e3]/10"
                    />
                  ) : (
                    <div className="flex h-9 items-center rounded-full border border-black/[0.06] bg-[#fbfbfd] px-4">
                      <span className="text-sm text-[#86868b]">上传文件后自动生成</span>
                    </div>
                  )}
                </div>

                {/* 描述 */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#1d1d1f]">数据集描述</label>
                  {isAutoFilled ? (
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={4}
                      className="w-full resize-none rounded-2xl border border-[#34c759]/30 bg-[#34c759]/[0.02] px-4 py-3 text-sm text-[#1d1d1f] transition-all duration-200 focus:border-[#0071e3]/30 focus:outline-none focus:ring-2 focus:ring-[#0071e3]/10"
                    />
                  ) : (
                    <div className="flex h-24 items-start rounded-2xl border border-black/[0.06] bg-[#fbfbfd] px-4 py-3">
                      <span className="text-sm text-[#86868b]">上传文件后由 AI 自动生成描述</span>
                    </div>
                  )}
                </div>

                {/* AI 自动判断：分类、模态、部位 */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { key: "category", label: "数据分类" },
                    { key: "modality", label: "成像模态" },
                    { key: "anatomy", label: "解剖部位" },
                  ].map(({ key, label }) => (
                    <div key={key}>
                      <label className="mb-2 block text-sm font-medium text-[#1d1d1f]">{label}</label>
                      {isAutoFilled ? (
                        <div className="flex h-9 items-center gap-2 rounded-full border border-[#34c759]/30 bg-[#34c759]/[0.02] px-4">
                          <Sparkles className="h-3.5 w-3.5 shrink-0 text-[#34c759]" strokeWidth={2} />
                          <span className="text-sm text-[#1d1d1f]">{formData[key as keyof typeof formData] as string}</span>
                        </div>
                      ) : (
                        <div className="flex h-9 items-center rounded-full border border-black/[0.06] bg-[#fbfbfd] px-4">
                          <span className="text-sm text-[#86868b]">AI 自动判断</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* 适应症（保留手动输入） */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#1d1d1f]">适应症 / 疾病标签</label>
                  <input
                    type="text"
                    value={formData.indication}
                    onChange={(e) => setFormData({ ...formData, indication: e.target.value })}
                    placeholder="例如：肺结节、肿瘤分割（可选）"
                    className="w-full rounded-full border border-black/[0.08] bg-white px-4 py-2 text-sm text-[#1d1d1f] placeholder:text-[#86868b] transition-all duration-200 focus:border-[#0071e3]/30 focus:outline-none focus:ring-2 focus:ring-[#0071e3]/10"
                  />
                </div>

                {/* 样本规模 & 数据集大小（读取，不可编辑） */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { key: "sampleSize", label: "样本规模" },
                    { key: "dataSize", label: "数据集大小" },
                  ].map(({ key, label }) => (
                    <div key={key}>
                      <label className="mb-2 block text-sm font-medium text-[#1d1d1f]">{label}</label>
                      <div className={`flex h-9 items-center gap-2 rounded-full border px-4 ${
                        isAutoFilled
                          ? "border-[#34c759]/30 bg-[#34c759]/[0.02]"
                          : "border-black/[0.06] bg-[#fbfbfd]"
                      }`}>
                        {isAutoFilled
                          ? <><Sparkles className="h-3.5 w-3.5 shrink-0 text-[#34c759]" strokeWidth={2} /><span className="text-sm text-[#1d1d1f]">{formData[key as keyof typeof formData] as string}</span></>
                          : <span className="text-sm text-[#86868b]">上传后自动读取</span>
                        }
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>


            {/* 数据集设置 */}
            <div className="rounded-3xl border border-black/[0.08] bg-white p-8 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              <div className="mb-6 flex items-center gap-2">
                <Database className="h-5 w-5 text-[#0071e3]" strokeWidth={2} />
                <h2 className="text-[21px] font-semibold leading-[1.52]">权限设置</h2>
              </div>
              
              <div>
                <label className="mb-3 block text-sm font-medium text-[#1d1d1f]">可见性</label>
                <div className="flex flex-wrap gap-4">
                  <label 
                    className={`flex cursor-pointer items-center gap-2 rounded-full border px-5 py-2.5 transition-all duration-200 ${
                      formData.isPublic 
                        ? "border-[#0071e3] bg-[#0071e3]/[0.04] text-[#0071e3]" 
                        : "border-black/[0.08] bg-white text-[#1d1d1f] hover:border-[#0071e3]/30"
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="visibility" 
                      className="hidden" 
                      checked={formData.isPublic}
                      onChange={() => setFormData({ ...formData, isPublic: true })}
                    />
                    <div className={`flex h-4 w-4 items-center justify-center rounded-full border ${formData.isPublic ? "border-[#0071e3]" : "border-black/[0.15]"}`}>
                      {formData.isPublic && <div className="h-2 w-2 rounded-full bg-[#0071e3]" />}
                    </div>
                    <span className="text-sm font-medium">公开数据集</span>
                  </label>

                  <label 
                    className={`flex cursor-pointer items-center gap-2 rounded-full border px-5 py-2.5 transition-all duration-200 ${
                      !formData.isPublic 
                        ? "border-[#0071e3] bg-[#0071e3]/[0.04] text-[#0071e3]" 
                        : "border-black/[0.08] bg-white text-[#1d1d1f] hover:border-[#0071e3]/30"
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="visibility" 
                      className="hidden" 
                      checked={!formData.isPublic}
                      onChange={() => setFormData({ ...formData, isPublic: false })}
                    />
                    <div className={`flex h-4 w-4 items-center justify-center rounded-full border ${!formData.isPublic ? "border-[#0071e3]" : "border-black/[0.15]"}`}>
                      {!formData.isPublic && <div className="h-2 w-2 rounded-full bg-[#0071e3]" />}
                    </div>
                    <span className="text-sm font-medium">私有数据集</span>
                  </label>
                </div>
                <p className="mt-3 text-xs text-[#86868b]">
                  {formData.isPublic ? "您的数据集将展示在数据广场中，所有用户均可查看详情并下载。" : "数据集仅您自己可见，但仍可基于此数据集发起标注任务。"}
                </p>
              </div>
            </div>

            {/* 提交 */}
            <div className="flex items-center justify-end gap-4 pb-4">
              <button
                type="button"
                className="rounded-full border border-black/[0.08] bg-transparent px-6 py-3 text-lg font-medium text-[#1d1d1f] transition-all duration-200 hover:border-[#0071e3]/30 hover:bg-[#0071e3]/[0.04] focus:outline-none"
              >
                保存草稿
              </button>
              <button
                type="submit"
                disabled={!isAutoFilled}
                className="rounded-full bg-[#0071e3] px-6 py-3 text-lg font-medium text-white transition-opacity duration-200 hover:opacity-90 focus:outline-none disabled:cursor-not-allowed disabled:opacity-40"
              >
                提交发布
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
