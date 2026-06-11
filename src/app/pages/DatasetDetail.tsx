import { useParams, useNavigate } from "react-router";
import { ArrowLeft, CheckCircle2, Download, ExternalLink, FileText, Lock, ShieldCheck, Sparkles, Tag, Clock, Database } from "lucide-react";
import { dataItems } from "../components/DataListView";
import { useState } from "react";

// Deterministic mock extras based on dataset properties
function getExtras(id: number, modality: string, scale: string, source: { type: string }) {
  const formats: Record<string, string> = {
    'CT': 'DICOM (.dcm)', 'MRI': 'DICOM (.dcm) / NIfTI (.nii.gz)',
    'X-Ray': 'DICOM (.dcm) / PNG', '病理': 'SVS / TIFF (全切片)',
    'US': 'DICOM (.dcm) / AVI', 'ECG': 'WFDB / CSV', 'EEG': 'EDF / CSV',
    '内窥镜': 'MP4 / JPEG', '眼科影像': 'JPEG / PNG', '皮肤镜': 'JPEG',
  };
  const prices: Record<string, { research: number; commercial: number }> = {
    small: { research: 800, commercial: 5800 },
    medium: { research: 1800, commercial: 12000 },
    large: { research: 3200, commercial: 22000 },
    xlarge: { research: 6800, commercial: 48000 },
  };
  const versions = ['v1.0', 'v1.2', 'v1.5', 'v2.0', 'v2.3'];
  const dates = ['2024-11-08', '2025-01-15', '2025-03-22', '2025-06-01', '2024-09-30', '2025-04-17'];
  const accuracies = [94, 95, 96, 97, 97, 98, 99];

  const i = id % 7;
  return {
    format: formats[modality] ?? 'DICOM (.dcm)',
    price: prices[scale] ?? prices.medium,
    version: versions[id % versions.length],
    updatedAt: dates[id % dates.length],
    annotationAccuracy: accuracies[id % accuracies.length],
    license: source.type === 'platform' ? 'CC BY 4.0' : source.type === 'external' ? 'CC BY-NC 4.0' : '机构定制协议',
    ethics: source.type === 'platform' ? '已通过伦理审查' : '机构伦理备案',
    anonymized: true,
  };
}

// CSS-rendered medical image based on modality
function SampleImage({ modality, title }: { modality: string; title: string }) {
  const isPathology = modality === '病理';
  const isUltrasound = modality === 'US';
  const isECG = modality === 'ECG' || modality === 'EEG';
  const isEndoscope = modality === '内窥镜';
  const isEye = modality === '眼科影像' || modality === '皮肤镜';
  const isMRI = modality === 'MRI';
  const isCT = modality === 'CT';
  const isXRay = modality === 'X-Ray';

  if (isECG) {
    return (
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl bg-[#0a0f1a] px-8">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'linear-gradient(rgba(0,113,227,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0,113,227,0.4) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }} />
        <svg viewBox="0 0 500 160" className="w-full">
          <polyline
            points="0,80 40,80 55,80 65,20 75,140 85,80 130,80 145,80 155,30 165,120 175,80 220,80 235,80 245,40 255,130 265,80 310,80 325,80 335,25 345,135 355,80 400,80 415,80 425,50 435,115 445,80 500,80"
            fill="none" stroke="#34c759" strokeWidth="2.5" strokeLinejoin="round"
          />
        </svg>
        <div className="absolute bottom-4 left-6 text-[10px] font-mono text-[#34c759]/60">25 mm/s  ·  10 mm/mV</div>
      </div>
    );
  }

  if (isPathology) {
    return (
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl bg-[#fdf6f0]">
        {/* Pathology slide: pink tissue with purple nuclei */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 40% 50%, #f8ddd0 0%, #f5c9b8 40%, #f0b8a0 100%)' }} />
        {/* Cells */}
        {Array.from({ length: 28 }).map((_, i) => {
          const cx = (i * 47 + 13) % 100;
          const cy = (i * 31 + 17) % 100;
          const r = 3 + (i % 3);
          return (
            <div key={i} className="absolute rounded-full border border-[#7b4f8a]/30 bg-[#9b6aaa]/20"
              style={{ left: `${cx}%`, top: `${cy}%`, width: r * 2 * 4, height: r * 2 * 4, transform: 'translate(-50%,-50%)' }}
            />
          );
        })}
        <div className="absolute bottom-4 right-4 rounded-md bg-white/70 px-2 py-1 text-[10px] font-mono text-[#86868b]">40× H&E</div>
      </div>
    );
  }

  if (isUltrasound) {
    return (
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl bg-[#070d15]">
        {/* Ultrasound fan */}
        <div className="absolute" style={{
          top: '8%', left: '50%', transform: 'translateX(-50%)',
          width: 0, height: 0,
          borderLeft: '160px solid transparent',
          borderRight: '160px solid transparent',
          borderTop: 0,
          borderBottom: '340px solid rgba(30,80,160,0.55)',
          filter: 'blur(2px)',
        }} />
        {/* Scan lines */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="absolute" style={{
            top: '8%', left: '50%',
            width: 2, height: `${25 + i * 8}%`,
            background: 'rgba(100,160,255,0.12)',
            transformOrigin: 'top center',
            transform: `translateX(-50%) rotate(${-35 + i * 10}deg)`,
          }} />
        ))}
        {/* Organ blob */}
        <div className="absolute" style={{
          top: '38%', left: '40%', width: 120, height: 90,
          borderRadius: '60% 40% 50% 60%',
          background: 'rgba(60,130,220,0.4)',
          filter: 'blur(6px)',
        }} />
        <div className="absolute bottom-4 left-4 text-[10px] font-mono text-[#4fa0ff]/70">US  3.5 MHz  Depth: 15 cm</div>
      </div>
    );
  }

  if (isEndoscope) {
    return (
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full" style={{ borderRadius: '12px' }}>
        <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 48% 52%, #c8503a 0%, #a03020 35%, #5a1008 70%, #200000 100%)' }} />
        {/* Tissue folds */}
        {[0,1,2].map(i => (
          <div key={i} className="absolute" style={{
            top: `${30 + i * 18}%`, left: `${10 + i * 12}%`,
            width: `${60 - i * 10}%`, height: 6,
            borderRadius: 4,
            background: 'rgba(255,120,80,0.25)',
            transform: `rotate(${-5 + i * 8}deg)`,
          }} />
        ))}
        {/* Highlight */}
        <div className="absolute" style={{ top: '20%', left: '30%', width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.12)', filter: 'blur(8px)' }} />
        <div className="absolute bottom-4 right-4 rounded-md bg-black/40 px-2 py-1 text-[10px] font-mono text-white/60">HD · WLI</div>
      </div>
    );
  }

  if (isEye) {
    return (
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl bg-[#100a04]">
        {/* Fundus */}
        <div className="absolute" style={{ width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle at 45% 50%, #8b3a12 0%, #6b2a0a 40%, #3d1204 80%, #1a0400 100%)' }} />
        {/* Blood vessels */}
        <svg className="absolute" viewBox="0 0 280 280" width="280" height="280">
          <path d="M 140 140 Q 100 100 60 90" stroke="#c0402a" strokeWidth="3" fill="none" opacity="0.8" />
          <path d="M 140 140 Q 170 90 200 75" stroke="#c0402a" strokeWidth="2.5" fill="none" opacity="0.7" />
          <path d="M 140 140 Q 110 170 80 185" stroke="#c0402a" strokeWidth="2" fill="none" opacity="0.6" />
          <path d="M 140 140 Q 175 165 195 190" stroke="#c0402a" strokeWidth="2" fill="none" opacity="0.6" />
          <circle cx="180" cy="130" r="18" fill="#f0c080" opacity="0.7" />
          <circle cx="140" cy="140" r="8" fill="#150500" />
        </svg>
        <div className="absolute bottom-4 right-4 rounded-md bg-black/50 px-2 py-1 text-[10px] font-mono text-white/60">CFP · 45°</div>
      </div>
    );
  }

  if (isMRI) {
    return (
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl bg-[#060608]">
        {/* Brain cross-section */}
        <div className="absolute" style={{ width: 260, height: 240, borderRadius: '52% 48% 50% 50%', background: 'radial-gradient(ellipse at center, #3a3a4a 0%, #22222e 50%, #101018 100%)', border: '2px solid #3a3a50' }} />
        {/* Gray matter rim */}
        <div className="absolute" style={{ width: 242, height: 222, borderRadius: '52% 48% 50% 50%', border: '6px solid #505068', background: 'transparent' }} />
        {/* Ventricles */}
        <div className="absolute" style={{ width: 36, height: 50, top: '36%', left: '44%', borderRadius: '40% 60% 50% 50%', background: '#181825' }} />
        <div className="absolute" style={{ width: 36, height: 50, top: '36%', left: '52%', borderRadius: '60% 40% 50% 50%', background: '#181825' }} />
        <div className="absolute bottom-4 left-4 text-[10px] font-mono text-white/40">T1w · Axial · 3T</div>
        <div className="absolute top-4 right-4 text-[10px] font-mono text-white/40">R</div>
        <div className="absolute top-4 left-4 text-[10px] font-mono text-white/40">L</div>
      </div>
    );
  }

  // CT / X-Ray fallback
  if (isXRay) {
    return (
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl bg-[#030305]">
        {/* Chest X-ray style */}
        <div className="absolute" style={{ width: 260, height: 300, borderRadius: '50% 50% 40% 40%', background: 'radial-gradient(ellipse at 50% 30%, #2a2a38 0%, #141420 60%, #050508 100%)' }} />
        {/* Ribs */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="absolute" style={{
            top: `${28 + i * 9}%`, left: '20%',
            width: '60%', height: 5,
            borderRadius: '50%',
            border: '2px solid rgba(180,180,210,0.2)',
            background: 'transparent',
            transform: `scaleY(${0.3 + i * 0.04})`,
          }} />
        ))}
        {/* Heart shadow */}
        <div className="absolute" style={{ top: '42%', left: '38%', width: 80, height: 90, borderRadius: '50% 50% 50% 50%', background: 'rgba(80,80,100,0.4)', filter: 'blur(4px)' }} />
        <div className="absolute bottom-4 left-4 text-[10px] font-mono text-white/40">PA · 120 kVp</div>
      </div>
    );
  }

  // CT default
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl bg-[#050507]">
      {/* CT axial slice */}
      <div className="absolute" style={{ width: 240, height: 240, borderRadius: '50%', background: 'radial-gradient(circle, #1e2030 0%, #10111a 50%, #060608 100%)', border: '1px solid #2a2a3a' }} />
      {/* Organs */}
      <div className="absolute" style={{ top: '34%', left: '43%', width: 55, height: 65, borderRadius: '40% 60% 50% 55%', background: 'rgba(60,70,100,0.7)' }} />
      <div className="absolute" style={{ top: '42%', left: '33%', width: 40, height: 55, borderRadius: '50%', background: 'rgba(50,60,90,0.65)' }} />
      <div className="absolute" style={{ top: '42%', left: '57%', width: 38, height: 48, borderRadius: '50%', background: 'rgba(50,60,90,0.65)' }} />
      {/* Bone ring */}
      <div className="absolute" style={{ width: 220, height: 220, borderRadius: '50%', border: '8px solid rgba(200,200,230,0.25)', background: 'transparent' }} />
      <div className="absolute bottom-4 left-4 text-[10px] font-mono text-white/40">CT · Axial · W:400 L:40</div>
    </div>
  );
}

const sourceConfig = {
  platform:    { label: '平台数据', color: '#0071e3', bg: 'rgba(0,113,227,0.08)' },
  institution: { label: '机构上传', color: '#34c759', bg: 'rgba(52,199,89,0.08)' },
  external:    { label: '委托展示', color: '#ff9500', bg: 'rgba(255,149,0,0.08)' },
};

export default function DatasetDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [purchaseMode, setPurchaseMode] = useState<'research' | 'commercial'>('research');
  const [purchased, setPurchased] = useState(false);

  const dataset = dataItems.find(d => d.id === Number(id));

  if (!dataset) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fbfbfd]">
        <div className="text-center">
          <p className="text-[21px] font-semibold text-[#1d1d1f]">数据集不存在</p>
          <button onClick={() => navigate('/data-market')} className="mt-4 text-sm text-[#0071e3]">返回数据市场</button>
        </div>
      </main>
    );
  }

  const extras = getExtras(dataset.id, dataset.modality, dataset.scale, dataset.source);
  const src = sourceConfig[dataset.source.type];
  const price = purchaseMode === 'research' ? extras.price.research : extras.price.commercial;

  const descriptions: Record<string, string> = {
    'MRI': `本数据集包含高质量磁共振成像序列，覆盖多种序列参数设置，经院内专业影像科医师严格质控与脱敏处理。所有样本均附有结构化标注文件，适用于深度学习模型训练、迁移学习及多中心研究协作。数据以 DICOM 标准格式存储，兼容主流医学影像处理框架。`,
    'CT': `本数据集涵盖不同扫描参数的 CT 影像，层厚均一化处理，配套标注由放射科医师双盲完成，并经第三方机构审核。数据集包含完整的元数据与标注文件，格式符合 DICOM 标准，支持直接导入 3D Slicer、ITK-SNAP 等主流工具。`,
    'X-Ray': `本数据集收集自多家医疗机构的 X 射线影像，覆盖不同设备型号与曝光参数，增强了模型泛化能力。所有影像经过自动化 PHI 清洗后由人工复核，确保脱敏合规。提供 JPEG 和 DICOM 双格式，附带分类标签与边界框标注。`,
    '病理': `本数据集包含高分辨率全切片影像（WSI），扫描倍率为 20× 至 40×，支持在线阅片与局部裁剪。标注由病理科主任医师完成，包含像素级分割掩码及 Gleason 等临床评分标签。适用于计算病理学模型开发与多标签分类研究。`,
    'US': `本数据集包含多探头、多深度设置的超声影像帧序列，涵盖 B 模式与彩色多普勒模式。标注文件包含目标区域的分割轮廓与临床诊断标签，由超声科副主任医师完成，质控准确率达 ${extras.annotationAccuracy}%。`,
    'ECG': `本数据集包含长程与短程心电图记录，采样率标准化为 500 Hz，覆盖多种心律类型。每条记录均附带临床诊断标签与波形标注（P/QRS/T），适用于心律失常检测、心脏健康分级及可穿戴设备算法验证。`,
    '内窥镜': `本数据集包含高清内窥镜视频帧及静态影像，标注内容包含病变区域的分割掩码与分类标签。所有数据来自真实内镜检查流程，场景多样，包含正常黏膜、息肉、溃疡等多种形态，适用于 CADe 与 CADx 模型开发。`,
    '眼科影像': `本数据集包含多中心采集的眼科影像，图像质量经自动化评分系统筛选，清晰度均达到临床可用标准。标注由眼科专科医师完成，包含疾病分级、病灶定位及视盘/黄斑区域标注，适用于眼底 AI 筛查模型开发。`,
    '皮肤镜': `本数据集包含标准化采集的皮肤镜影像，覆盖多种皮肤病变类型。每张图像附带 ISIC 标准分类标签及像素级分割掩码，由皮肤科主治医师审核。适用于���色素瘤筛查、良恶性分类及辅助诊断模型训练。`,
  };

  const desc = descriptions[dataset.modality] ?? descriptions['CT'];

  const metaRows = [
    { label: '成像模态', value: dataset.subtitle },
    { label: '解剖部位', value: dataset.anatomy.join('、') },
    { label: '样本规模', value: dataset.samples ?? '—' },
    { label: '数据集大小', value: dataset.size ?? '—' },
    { label: '文件格式', value: extras.format },
    { label: '标注准确率', value: `${extras.annotationAccuracy}%` },
    { label: '数据来源', value: dataset.source.name },
    { label: '版本', value: extras.version },
    { label: '最近更新', value: extras.updatedAt },
    { label: '开源协议', value: extras.license },
    { label: '伦理备案', value: extras.ethics },
  ];

  return (
    <main className="min-h-screen bg-[#fbfbfd] text-[#1d1d1f] antialiased">
      <section className="px-20 py-12">
        <div className="mx-auto max-w-[1280px]">

          {/* Breadcrumb */}
          <button
            onClick={() => navigate('/data-market')}
            className="mb-8 flex items-center gap-2 text-sm text-[#86868b] transition-colors duration-150 hover:text-[#0071e3]"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2} />
            返回数据市场
          </button>

          {/* Title block */}
          <div className="mb-10">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span
                className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium"
                style={{ background: src.bg, color: src.color }}
              >
                {src.label} · {dataset.source.name}
              </span>
              {dataset.source.type === 'external' && (
                <span className="inline-flex items-center gap-1 rounded-full bg-[#ff9500]/[0.08] px-3 py-1 text-xs font-medium text-[#ff9500]">
                  <ExternalLink className="h-3 w-3" strokeWidth={2} />
                  委托展示
                </span>
              )}
              {dataset.tags.map(tag => (
                <span key={tag} className="inline-flex items-center rounded-full bg-black/[0.04] px-3 py-1 text-xs font-medium text-[#1d1d1f]">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-5xl font-semibold leading-[1.16] tracking-[-0.015em] text-[#1d1d1f]">
              {dataset.title}
            </h1>
            <p className="mt-3 text-[21px] font-medium leading-[1.52] text-[#86868b]">{dataset.subtitle}</p>
          </div>

          {/* Main two-column layout */}
          <div className="grid grid-cols-[1fr_360px] gap-10 items-start">

            {/* Left: image + description + metadata */}
            <div className="space-y-8">

              {/* Sample image */}
              <div className="overflow-hidden rounded-3xl border border-black/[0.08] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                <div className="h-[380px] p-4">
                  <SampleImage modality={dataset.modality} title={dataset.title} />
                </div>
                <div className="flex items-center justify-between border-t border-black/[0.06] px-6 py-4">
                  <div className="flex items-center gap-2 text-sm text-[#86868b]">
                    <FileText className="h-4 w-4" strokeWidth={2} />
                    <span>示例影像 · 已脱敏处理</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-[#34c759]">
                    <ShieldCheck className="h-4 w-4" strokeWidth={2} />
                    <span className="font-medium">PHI 清洗已通过</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="rounded-3xl border border-black/[0.08] bg-white p-8 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                <h2 className="mb-4 text-[21px] font-semibold text-[#1d1d1f]">数据集简介</h2>
                <p className="text-sm leading-[1.8] text-[#86868b]">{desc}</p>

                <div className="mt-6 grid grid-cols-3 gap-4">
                  {[
                    { label: '样本规模', value: dataset.samples ?? '—', color: '#0071e3' },
                    { label: '数据总量', value: dataset.size ?? '—', color: '#34c759' },
                    { label: '标注准确率', value: `${extras.annotationAccuracy}%`, color: '#ff9500' },
                  ].map(s => (
                    <div key={s.label} className="rounded-2xl bg-[#fbfbfd] p-4 text-center">
                      <div className="text-2xl font-semibold" style={{ color: s.color }}>{s.value}</div>
                      <div className="mt-1 text-xs text-[#86868b]">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Metadata table */}
              <div className="rounded-3xl border border-black/[0.08] bg-white p-8 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                <div className="mb-6 flex items-center gap-2">
                  <Database className="h-5 w-5 text-[#0071e3]" strokeWidth={2} />
                  <h2 className="text-[21px] font-semibold text-[#1d1d1f]">数据集信息</h2>
                </div>
                <div className="divide-y divide-black/[0.04]">
                  {metaRows.map(row => (
                    <div key={row.label} className="flex items-center justify-between py-3.5">
                      <span className="text-sm text-[#86868b]">{row.label}</span>
                      <span className="text-sm font-medium text-[#1d1d1f]">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: purchase card (sticky) */}
            <div className="sticky top-24 space-y-4">

              {/* License toggle + price */}
              <div className="rounded-3xl border border-black/[0.08] bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                <p className="mb-4 text-sm font-medium text-[#1d1d1f]">选择授权类型</p>

                <div className="mb-6 flex gap-2">
                  {(['research', 'commercial'] as const).map(mode => (
                    <button
                      key={mode}
                      onClick={() => setPurchaseMode(mode)}
                      className={`flex-1 rounded-2xl border py-3 text-sm font-medium transition-all duration-200 ${
                        purchaseMode === mode
                          ? 'border-[#0071e3]/30 bg-[#0071e3]/[0.06] text-[#0071e3]'
                          : 'border-black/[0.08] text-[#86868b] hover:border-[#0071e3]/20 hover:text-[#1d1d1f]'
                      }`}
                    >
                      {mode === 'research' ? '科研授权' : '商业授权'}
                    </button>
                  ))}
                </div>

                <div className="mb-2 flex items-baseline gap-1.5">
                  <span className="text-sm text-[#86868b]">¥</span>
                  <span className="text-4xl font-semibold text-[#1d1d1f]">
                    {price.toLocaleString()}
                  </span>
                </div>
                <p className="mb-6 text-xs text-[#86868b]">
                  {purchaseMode === 'research' ? '适用于学术研究、非商业论文及学术竞赛' : '适用于商业产品研发、SaaS 服务及临床落地'}
                </p>

                {dataset.source.type === 'external' ? (
                  <a
                    href="https://www.oasis-brain.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center rounded-full bg-[#ff9500] py-4 text-sm font-medium text-white shadow-[0_4px_12px_rgba(255,149,0,0.3)] transition-all duration-200 hover:bg-[#e68600] hover:shadow-[0_6px_16px_rgba(255,149,0,0.4)] active:scale-[0.98]"
                  >
                    去购买
                  </a>
                ) : purchased ? (
                  <div className="flex items-center justify-center gap-2 rounded-full bg-[#34c759]/[0.08] py-4 text-sm font-medium text-[#34c759]">
                    <CheckCircle2 className="h-5 w-5" strokeWidth={2} />
                    购买成功，已加入工作台
                  </div>
                ) : (
                  <button
                    onClick={() => setPurchased(true)}
                    className="w-full rounded-full bg-[#0071e3] py-4 text-sm font-medium text-white shadow-[0_4px_12px_rgba(0,113,227,0.3)] transition-all duration-200 hover:bg-[#005ec4] hover:shadow-[0_6px_16px_rgba(0,113,227,0.4)] active:scale-[0.98]"
                  >
                    立即购买
                  </button>
                )}

                <button className="mt-3 w-full rounded-full border border-black/[0.08] py-3.5 text-sm font-medium text-[#1d1d1f] transition-all duration-200 hover:border-[#0071e3]/30 hover:bg-[#0071e3]/[0.04]">
                  申请试用样本
                </button>
              </div>

              {/* Trust badges */}
              <div className="rounded-3xl border border-black/[0.08] bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                <div className="space-y-3">
                  {[
                    { icon: ShieldCheck, text: 'PHI 三层拦截，合规脱敏', color: '#34c759' },
                    { icon: Lock, text: extras.license + ' 协议保护', color: '#0071e3' },
                    { icon: Download, text: '购买后 72 小时内完成交付', color: '#ff9500' },
                    { icon: Sparkles, text: extras.ethics, color: '#9b59b6' },
                  ].map(({ icon: Icon, text, color }) => (
                    <div key={text} className="flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full" style={{ background: `${color}14` }}>
                        <Icon className="h-4 w-4" strokeWidth={2} style={{ color }} />
                      </div>
                      <span className="text-xs text-[#86868b]">{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="rounded-3xl border border-black/[0.08] bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                <div className="mb-3 flex items-center gap-2">
                  <Tag className="h-4 w-4 text-[#86868b]" strokeWidth={2} />
                  <span className="text-sm font-medium text-[#1d1d1f]">适用任务</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {dataset.tags.filter((v, i, a) => a.indexOf(v) === i).map(tag => (
                    <span key={tag} className="rounded-full bg-black/[0.04] px-3 py-1 text-xs font-medium text-[#1d1d1f]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <p className="px-2 text-center text-[11px] leading-[1.6] text-[#86868b]">
                购买即代表您同意 M平台数据使用条款。<br />如有定制需求，请联系 <span className="text-[#0071e3]">team@m-platform.cn</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
