import {
  ArrowRight,
  BarChart3,
  Database,
  FileText,
  Rocket,
  Search,
  Shield,
  SlidersHorizontal,
  TrendingUp,
  UserRound,
  Zap,
  CheckCircle2,
  Building2,
  FlaskConical,
  Stethoscope,
  BarChart2,
  Lock,
  Layers,
  ChevronRight,
  Trophy,
  Award,
  Cpu,
  Layout,
  MessageSquare,
} from "lucide-react";
import { useState } from "react";
import { useT } from "../i18n/useT";
import { CountUpAnimation } from "../components/CountUpAnimation";
import { ScrollReveal } from "../components/ScrollReveal";
import { Card3D } from "../components/Card3D";
import { MagneticButton } from "../components/MagneticButton";
import { motion, AnimatePresence } from "motion/react";

import heroBg from "../../imports/首页/05ad9eeb81757c1fdde06315059981c587ad083f.png";
import mockupImg from "../../imports/image.png"; // Assuming this is the annotation platform mockup
import factoryImg from "../../imports/image-1.png"; // Assuming this is for factory

// ——— 静态数据 ———

const caseStudies = [
  {
    org: "华北某三甲医院影像科",
    tag: "三甲医院",
    tagColor: "#0071e3",
    result: "肺结节筛查漏诊率下降 38%",
    story: "利用 M平台标注的 12,500 例胸部 CT 数据集，该院影像科在 4 周内完成了专属肺结节检测模型的训练与部署，并在门诊筛查中辅助发现了过去容易遗漏的早期微小结节。",
    metrics: [
      { label: "标注耗时", before: "6 个月", after: "3 周" },
      { label: "模型上线", before: "需 10 人团队", after: "2 人完成" },
    ],
  },
  {
    org: "西南某医学院影像研究院",
    tag: "科研机构",
    tagColor: "#1d1d1f",
    result: "数据资产累计授权收益 142 万积分",
    story: "将沉积 3 年的 8,200 例脑部 MRI 脱敏数据上传至数据广场后，该研究院持续获得来自 7 家企业的数据调用授权，模型每商用一次，研究院自动结算收益。",
    metrics: [
      { label: "合规上线", before: "从未实现", after: "72 小时完成" },
      { label: "持续收益", before: "一次性出售", after: "按调用持续分账" },
    ],
  },
  {
    org: "某眼科专科医院 · 黄医生",
    tag: "认证专家",
    tagColor: "#0071e3",
    result: "每月额外积分收益相当于 2 次诊费",
    story: "Lv6 认证眼科专家黄医生每天利用午休 30 分钟完成 5-8 个视网膜病变分级任务。凭借高质量标注记录，他在 8 个月内晋升至 Lv6，收益系数达到 3.5 倍。",
    metrics: [
      { label: "每日投入", before: "无", after: "午休 30 分钟" },
      { label: "累计等级", before: "—", after: "Lv6 · 3.5x 系数" },
    ],
  },
];

const capabilityIcons = [Lock, Layers, TrendingUp, Zap];
const capabilityColors = ["#0071e3", "#0071e3", "#0071e3", "#0071e3"];
const journeyColors = [
  { color: "from-[#0071e3]/[0.07] to-transparent", accent: "#0071e3" },
  { color: "from-black/[0.03] to-transparent", accent: "#0071e3" },
  { color: "from-black/[0.03] to-transparent", accent: "#0071e3" },
];
const personaIcons = [Stethoscope, FlaskConical, Building2, BarChart2];
const annotationFeatureIcons = [Layers, Shield, Database, Zap];
const annotationFeatureColors = ["#0071e3", "#0071e3", "#0071e3", "#0071e3"];

export default function About() {
  const [activePersona, setActivePersona] = useState(0);
  const t = useT();

  const statsData = [
    { icon: Database, value: 124.6, decimals: 1, separator: false, suffix: "万", label: t.hero.stats[0].label },
    { icon: Zap, value: 486.3, decimals: 1, separator: false, suffix: "TB", label: t.hero.stats[1].label },
    { icon: BarChart3, value: 128, decimals: 0, separator: false, suffix: "个", label: t.hero.stats[2].label },
    { icon: UserRound, value: 3892, decimals: 0, separator: true, suffix: "位", label: t.hero.stats[3].label },
  ];

  return (
    <main className="bg-white">
      {/* ① Hero */}
      <section className="relative overflow-hidden px-20 py-28">
        <img src={heroBg} alt="科技感背景" className="absolute inset-0 h-full w-full object-cover opacity-[0.85] dark:hidden" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/60 to-white dark:from-black/40 dark:via-black/70 dark:to-[#000000]" />

        <div className="relative mx-auto max-w-[1280px]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="inline-flex items-center rounded-full border border-black/[0.08] bg-white/80 p-1 backdrop-blur-sm">
              {t.hero.personas.map((p, i) => {
                const Icon = personaIcons[i];
                return (
                  <button
                    key={p.role}
                    onClick={() => setActivePersona(i)}
                    className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                      activePersona === i
                        ? "bg-[#0071e3] text-white shadow-[0_2px_8px_rgba(0,113,227,0.3)]"
                        : "text-[#86868b] hover:text-[#1d1d1f]"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" strokeWidth={2} />
                    {p.role}
                  </button>
                );
              })}
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activePersona}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: [0.25, 0.4, 0.25, 1] }}
              className="mt-10 text-center"
            >
              <p className="mb-4 text-sm font-medium text-[#0071e3]">{t.hero.personas[activePersona].tag}</p>
              <h1 className="whitespace-pre-line text-5xl font-semibold leading-[1.16] tracking-[-0.015em] text-[#1d1d1f]">
                {t.hero.personas[activePersona].headline}
              </h1>
              <p className="mx-auto mt-6 max-w-[680px] text-[21px] font-medium leading-[1.52] text-[#86868b]">
                {t.hero.personas[activePersona].sub}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="mx-auto mt-16 grid max-w-[1280px] grid-cols-4 gap-6">
            {statsData.map((s, index) => (
              <ScrollReveal key={s.label} delay={0.1 * index}>
                <Card3D className="group relative h-full overflow-hidden rounded-3xl border border-black/[0.08] bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-300 hover:border-[#0071e3]/30 hover:shadow-[0_8px_30px_rgba(0,113,227,0.12)]">
                  <div className="absolute right-4 top-4 opacity-[0.06] transition-opacity duration-300 group-hover:opacity-[0.15]">
                    <s.icon className="h-16 w-16 text-[#0071e3]" strokeWidth={1.5} />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0071e3]/[0.02] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative">
                    <s.icon className="h-5 w-5 text-[#0071e3]" strokeWidth={2} />
                    <div className="mt-6 flex items-baseline gap-1 text-5xl font-semibold leading-[1.16] tracking-tight text-[#1d1d1f]">
                      <CountUpAnimation end={s.value} decimals={s.decimals} separator={s.separator} duration={1200} />
                      {s.suffix && <span className="text-lg font-medium text-[#86868b]">{s.suffix}</span>}
                    </div>
                    <div className="mt-2 text-sm leading-[1.57] text-[#86868b]">{s.label}</div>
                  </div>
                </Card3D>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ② 痛点共鸣 */}
      <section className="bg-[#fbfbfd] px-20 py-28">
        <div className="mx-auto max-w-[1280px]">
          <ScrollReveal>
            <div className="mb-4 inline-flex rounded-full bg-[#ff3b30]/[0.08] px-3 py-1">
              <span className="text-sm font-medium text-[#ff3b30]">{t.pain.badge}</span>
            </div>
            <h2 className="text-5xl font-semibold leading-[1.16] tracking-[-0.015em]">
              {t.pain.title}
            </h2>
            <p className="mt-6 max-w-[640px] text-[21px] font-medium leading-[1.52] text-[#86868b] whitespace-nowrap">
              {t.pain.sub}
            </p>
          </ScrollReveal>

          <div className="mt-16 grid grid-cols-3 gap-6">
            {t.pain.items.map((p, i) => (
              <ScrollReveal key={p.audience} delay={0.1 * i}>
                <div className="group rounded-3xl border border-black/[0.08] bg-white p-8 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-300 hover:border-[#0071e3]/20 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
                  <span className="inline-flex rounded-full bg-[#0071e3]/[0.08] px-3 py-1 text-xs font-medium text-[#0071e3]">
                    {p.audience}
                  </span>
                  <h3 className="mt-6 text-[21px] font-semibold leading-[1.52] text-[#1d1d1f]">
                    {p.pain}
                  </h3>
                  <p className="mt-4 text-sm leading-[1.57] text-[#86868b]">{p.detail}</p>

                  <div className="mt-8 space-y-3">
                    <div className="flex items-center gap-3 rounded-2xl bg-[#ff3b30]/[0.04] px-4 py-3">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#ff3b30]/[0.12] text-[10px] font-bold text-[#ff3b30]">×</span>
                      <span className="text-sm text-[#ff3b30]">{p.before}</span>
                    </div>
                    <div className="flex items-center gap-3 rounded-2xl bg-[#34c759]/[0.06] px-4 py-3">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-[#34c759]" strokeWidth={2.5} />
                      <span className="text-sm font-medium text-[#34c759]">{p.after}</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ③ 解决方案 */}
      <section className="bg-white px-20 py-28">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid grid-cols-2 gap-20 items-center">
            <ScrollReveal>
              <div>
                <div className="mb-4 inline-flex rounded-full bg-[#0071e3]/[0.08] px-3 py-1">
                  <span className="text-sm font-medium text-[#0071e3]">{t.solution.badge}</span>
                </div>
                <h2 className="whitespace-pre-line text-5xl font-semibold leading-[1.16] tracking-[-0.015em]">
                  {t.solution.title}
                </h2>
                <p className="mt-6 text-[21px] font-medium leading-[1.52] text-[#86868b]">
                  {t.solution.sub}
                </p>
                <div className="mt-10 space-y-4">
                  {t.solution.points.map((item) => (
                    <div key={item.title} className="flex items-start gap-4 rounded-2xl border border-black/[0.06] bg-[#fbfbfd] px-5 py-4">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#0071e3]" strokeWidth={2.5} />
                      <div>
                        <p className="text-sm font-semibold text-[#1d1d1f]">{item.title}</p>
                        <p className="mt-0.5 text-sm text-[#86868b]">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <div className="space-y-4">
                {t.solution.journey.map((j, i) => (
                  <motion.div
                    key={j.step}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                    className={`rounded-3xl border border-black/[0.08] bg-gradient-to-br ${journeyColors[i].color} p-8`}
                  >
                    <div className="flex items-start gap-5">
                      <span className="shrink-0 text-[21px] font-semibold leading-none tracking-tight" style={{ color: journeyColors[i].accent }}>{j.step}</span>
                      <div>
                        <h3 className="text-[21px] font-semibold leading-[1.52] text-[#1d1d1f]">{j.title}</h3>
                        <p className="mt-2 text-sm leading-[1.57] text-[#86868b]">{j.desc}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {j.tags.map(tag => (
                            <span key={tag} className="rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-[#1d1d1f] shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ④ 核心能力 */}
      <section className="bg-[#fbfbfd] px-20 py-28">
        <div className="mx-auto max-w-[1280px]">
          <ScrollReveal>
            <div className="mb-4 inline-flex rounded-full bg-[#0071e3]/[0.08] px-3 py-1">
              <span className="text-sm font-medium text-[#0071e3]">{t.capabilities.badge}</span>
            </div>
            <h2 className="whitespace-pre-line text-5xl font-semibold leading-[1.16] tracking-[-0.015em]">
              {t.capabilities.title}
            </h2>
            <p className="mt-6 max-w-[640px] text-[21px] font-medium leading-[1.52] text-[#86868b]">
              {t.capabilities.sub}
            </p>
          </ScrollReveal>
          <div className="mt-16 grid grid-cols-4 gap-6">
            {t.capabilities.items.map((cap, i) => {
              const Icon = capabilityIcons[i];
              const color = capabilityColors[i];
              return (
                <ScrollReveal key={cap.title} delay={0.1 * i}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.3 }}
                    className="group rounded-3xl border border-black/[0.08] bg-white p-8 text-left shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-300 hover:border-[#0071e3]/20 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ backgroundColor: color + '18' }}>
                      <Icon className="h-6 w-6" strokeWidth={2} style={{ color }} />
                    </div>
                    <div className="mt-4 inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold" style={{ backgroundColor: color + '14', color }}>
                      {cap.label}
                    </div>
                    <h3 className="mt-4 text-[21px] font-semibold leading-[1.52] text-[#1d1d1f]">{cap.title}</h3>
                    <p className="mt-3 text-sm leading-[1.57] text-[#86868b]">{cap.desc}</p>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ⑤ M标注平台展示 */}
      <section className="bg-white px-20 py-28">
        <div className="mx-auto max-w-[1280px]">
          <ScrollReveal>
            <div className="mb-4 inline-flex rounded-full bg-[#0071e3]/[0.08] px-3 py-1">
              <span className="text-sm font-medium text-[#0071e3]">{t.annotationPlatform.badge}</span>
            </div>
            <div className="flex items-end justify-between gap-8">
              <div>
                <h2 className="whitespace-pre-line text-5xl font-semibold leading-[1.16] tracking-[-0.015em]">
                  {t.annotationPlatform.title}
                </h2>
                <p className="mt-6 max-w-[560px] text-[21px] font-medium leading-[1.52] text-[#86868b]">
                  {t.annotationPlatform.sub}
                </p>
              </div>
            </div>
          </ScrollReveal>

          <div className="mt-12 grid grid-cols-4 gap-4">
            {t.annotationPlatform.features.map((feat, i) => {
              const Icon = annotationFeatureIcons[i];
              const color = annotationFeatureColors[i];
              return (
                <ScrollReveal key={feat.label} delay={0.08 * i}>
                  <div className="group flex flex-col gap-4 rounded-2xl border border-black/[0.08] bg-[#fbfbfd] p-6 transition-all duration-300 hover:border-[#0071e3]/20 hover:bg-white hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: color + '18' }}>
                      <Icon className="h-5 w-5" strokeWidth={2} style={{ color }} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#1d1d1f]">{feat.label}</p>
                      <p className="mt-1.5 text-xs leading-[1.6] text-[#86868b]">{feat.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Annotation Mockup Visual */}
          <ScrollReveal delay={0.2}>
            <div className="mt-16 relative rounded-[32px] border border-black/[0.1] bg-[#fbfbfd] p-4 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)]">
              <div className="overflow-hidden rounded-[24px] bg-white shadow-inner">
                <div className="flex h-10 items-center gap-2 border-b border-black/[0.04] bg-white px-4">
                  <div className="flex gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                    <div className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                    <div className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                  </div>
                  <div className="ml-4 flex h-6 flex-1 items-center rounded-md bg-black/[0.04] px-3 text-[10px] text-[#86868b]">
                    iMedLoop Annotation Studio - v4.2.0
                  </div>
                </div>
                <div className="flex aspect-[16/9] items-stretch overflow-hidden">
                  <div className="w-48 border-r border-black/[0.04] bg-[#fbfbfd] p-4">
                    <div className="space-y-3">
                      {t.annotationPlatform.mockup.nav.map((item: string, i: number) => (
                        <div key={item} className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-[11px] font-medium ${i === 1 ? 'bg-[#0071e3] text-white' : 'text-[#86868b]'}`}>
                          {i === 0 ? <Layout className="h-3 w-3" /> : i === 1 ? <FileText className="h-3 w-3" /> : <Database className="h-3 w-3" />}
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex-1 relative bg-black/[0.02]">
                    <img src={mockupImg} alt="Annotation Mockup" className="absolute inset-0 h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-black/5" />
                    
                    {/* Tool Floating Bar */}
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col gap-2 rounded-2xl bg-white/90 backdrop-blur-md p-2 shadow-xl border border-white/20">
                      {t.annotationPlatform.mockup.tools.map((tool: string, i: number) => (
                        <button key={tool} className={`h-10 w-10 flex items-center justify-center rounded-xl transition-colors ${i === 2 ? 'bg-[#0071e3] text-white' : 'text-[#1d1d1f] hover:bg-black/5'}`}>
                           {i === 0 ? <Rocket className="h-5 w-5" /> : i === 1 ? <Search className="h-5 w-5" /> : i === 2 ? <Layers className="h-5 w-5" /> : <Zap className="h-5 w-5" />}
                        </button>
                      ))}
                    </div>

                    {/* AI Label */}
                    <div className="absolute right-6 top-6 flex items-center gap-2 rounded-full bg-[#0071e3] px-3 py-1.5 text-[11px] font-bold text-white shadow-lg">
                      <div className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                      {t.annotationPlatform.mockup.ai}
                    </div>

                    {/* Bottom Actions */}
                    <div className="absolute bottom-6 right-6 flex gap-3">
                      <button className="rounded-full bg-white px-5 py-2 text-[11px] font-bold text-[#1d1d1f] shadow-lg border border-black/[0.05]">
                        {t.annotationPlatform.mockup.skipBtn}
                      </button>
                      <button className="rounded-full bg-[#34c759] px-6 py-2 text-[11px] font-bold text-white shadow-lg shadow-[#34c759]/20">
                        {t.annotationPlatform.mockup.submitBtn}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ⑥ iMedImage® 模型工厂 (MaaS) */}
      <section className="bg-[#fbfbfd] px-20 py-28">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid grid-cols-2 gap-20 items-center">
            <ScrollReveal>
              <div className="relative rounded-[40px] overflow-hidden border border-black/[0.08] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] aspect-square group">
                <img src={factoryImg} alt="MaaS Factory" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-10 left-10 right-10">
                   <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md px-4 py-2 border border-white/20 text-white text-xs font-medium mb-4">
                     <Cpu className="h-4 w-4" />
                     分布式计算集群已就绪
                   </div>
                   <h3 className="text-2xl font-bold text-white leading-tight">M平台一键式模型训练引擎</h3>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <div>
                <div className="mb-4 inline-flex rounded-full bg-[#0071e3]/[0.08] px-3 py-1">
                  <span className="text-sm font-medium text-[#0071e3]">{t.factory.badge}</span>
                </div>
                <h2 className="whitespace-pre-line text-5xl font-semibold leading-[1.16] tracking-[-0.015em]">
                  {t.factory.title}
                </h2>
                <p className="mt-6 text-[21px] font-medium leading-[1.52] text-[#86868b]">
                  {t.factory.sub}
                </p>
                <div className="mt-12 space-y-8">
                  {t.factory.steps.map((step: any, i: number) => (
                    <div key={step.title} className="flex gap-6 group">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white border border-black/[0.06] shadow-sm text-sm font-bold text-[#0071e3] transition-all group-hover:bg-[#0071e3] group-hover:text-white group-hover:shadow-md">
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-[#1d1d1f]">{step.title}</h4>
                        <p className="mt-1 text-sm leading-[1.6] text-[#86868b]">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-12">
                  <MagneticButton className="flex items-center gap-2 rounded-full bg-[#0071e3] px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-[#0071e3]/20 transition-all hover:opacity-90 active:scale-[0.98]" onClick={() => window.open('/model-service', '_blank')}>
                    {t.factory.cta}
                    <ArrowRight className="h-5 w-5" />
                  </MagneticButton>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ⑦ 专家成长路径 (Levels) */}
      <section className="bg-white px-20 py-28">
        <div className="mx-auto max-w-[1280px]">
          <div className="text-center mb-16">
            <ScrollReveal>
              <div className="mb-4 inline-flex rounded-full bg-[#0071e3]/[0.08] px-3 py-1">
                <span className="text-sm font-medium text-[#0071e3]">{t.levels.badge}</span>
              </div>
              <h2 className="text-5xl font-semibold leading-[1.16] tracking-[-0.015em]">
                {t.levels.title}
              </h2>
              <p className="mx-auto mt-6 max-w-[640px] text-[21px] font-medium leading-[1.52] text-[#86868b]">
                {t.levels.sub}
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-5 gap-4">
            {t.levels.items.map((level: any, i: number) => {
              const isActive = i === 2; // Highlight Certified Expert
              return (
                <ScrollReveal key={level.title} delay={0.08 * i}>
                  <div className={`relative h-full rounded-3xl p-8 border transition-all duration-300 ${
                    isActive 
                      ? 'bg-[#0071e3] border-transparent shadow-[0_24px_48px_-12px_rgba(0,113,227,0.3)]' 
                      : 'bg-[#fbfbfd] border-black/[0.06] hover:bg-white hover:shadow-xl'
                  }`}>
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl mb-6 ${
                      isActive ? 'bg-white/20 text-white' : 'bg-[#0071e3]/[0.08] text-[#0071e3]'
                    }`}>
                      {i < 2 ? <Award className="h-5 w-5" /> : i < 4 ? <Trophy className="h-5 w-5" /> : <Rocket className="h-5 w-5" />}
                    </div>
                    <div className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${isActive ? 'text-white/60' : 'text-[#86868b]'}`}>
                      Lv.{i*2 + 1}-{i*2 + 2}
                    </div>
                    <h3 className={`text-lg font-bold mb-4 ${isActive ? 'text-white' : 'text-[#1d1d1f]'}`}>{level.title}</h3>
                    <div className="space-y-4">
                      <div>
                        <p className={`text-[10px] uppercase font-bold tracking-wider mb-1 ${isActive ? 'text-white/40' : 'text-[#86868b]'}`}>{t.levels.expUnit}范围</p>
                        <p className={`text-sm font-semibold ${isActive ? 'text-white' : 'text-[#1d1d1f]'}`}>{level.expRange}</p>
                      </div>
                      <div>
                        <p className={`text-[10px] uppercase font-bold tracking-wider mb-1 ${isActive ? 'text-white/40' : 'text-[#86868b]'}`}>报酬系数</p>
                        <p className={`text-lg font-bold ${isActive ? 'text-[#34c759]' : 'text-[#0071e3]'}`}>{level.reward}</p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          <ScrollReveal delay={0.4}>
            <div className="mt-12 rounded-3xl bg-[#fbfbfd] border border-black/[0.04] p-8 flex items-center justify-between gap-8">
               <div className="flex items-start gap-4">
                 <div className="h-10 w-10 flex items-center justify-center rounded-full bg-[#0071e3]/[0.08] text-[#0071e3] shrink-0">
                   <ChevronRight className="h-5 w-5" />
                 </div>
                 <p className="text-sm leading-[1.6] text-[#86868b]">{t.levels.tip}</p>
               </div>
               <div className="flex gap-4 shrink-0">
                 <button className="flex items-center gap-2 rounded-full border border-black/[0.08] px-6 py-2.5 text-sm font-semibold text-[#1d1d1f] hover:bg-black/[0.02]">
                   {t.levels.certLabel}
                 </button>
                 <button className="flex items-center gap-2 rounded-full bg-[#0071e3] px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#0071e3]/20">
                   {t.levels.certBtn}
                 </button>
               </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ⑧ 真实案例 (Case Studies) */}
      <section className="bg-[#fbfbfd] px-20 py-28">
        <div className="mx-auto max-w-[1280px]">
          <div className="text-center mb-16">
            <ScrollReveal>
              <div className="mb-4 inline-flex rounded-full bg-[#0071e3]/[0.08] px-3 py-1">
                <span className="text-sm font-medium text-[#0071e3]">{t.cases.badge}</span>
              </div>
              <h2 className="text-5xl font-semibold leading-[1.16] tracking-[-0.015em]">
                {t.cases.title}
              </h2>
              <p className="mx-auto mt-6 max-w-[640px] text-[21px] font-medium leading-[1.52] text-[#86868b]">
                {t.cases.sub}
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-3 gap-8">
            {caseStudies.map((cs, i) => (
              <ScrollReveal key={cs.org} delay={0.1 * i}>
                <div className="group flex flex-col h-full rounded-3xl border border-black/[0.08] bg-white p-10 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-300 hover:shadow-2xl">
                  <div className="flex items-center justify-between mb-8">
                    <span className="inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider" style={{ backgroundColor: cs.tagColor + '14', color: cs.tagColor }}>
                      {cs.tag}
                    </span>
                    <MessageSquare className="h-5 w-5 text-[#86868b] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#1d1d1f] mb-4">{cs.result}</h3>
                  <p className="text-sm leading-[1.6] text-[#86868b] mb-10 flex-1">{cs.story}</p>
                  
                  <div className="space-y-4 pt-8 border-t border-black/[0.04]">
                    {cs.metrics.map(m => (
                      <div key={m.label} className="flex items-center justify-between text-xs">
                        <span className="text-[#86868b]">{m.label}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[#ff3b30] line-through opacity-50">{m.before}</span>
                          <ArrowRight className="h-3 w-3 text-[#86868b]" />
                          <span className="font-bold text-[#34c759]">{m.after}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 text-xs font-bold text-[#1d1d1f] flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#0071e3]" />
                    {cs.org}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ⑨ CTA Section */}
      <section className="bg-white px-20 py-28 overflow-hidden relative">
        <div className="mx-auto max-w-[1280px]">
          <div className="relative rounded-[48px] bg-[#1d1d1f] p-20 text-center overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#0071e3] opacity-20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#0071e3] opacity-10 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10">
              <ScrollReveal>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#0071e3] mb-6">{t.cta.eyebrow}</p>
                <h2 className="text-5xl md:text-6xl font-semibold leading-tight text-white mb-8">
                  {t.cta.title}
                </h2>
                <p className="mx-auto mb-12 max-w-[640px] text-xl text-[#86868b]">
                  {t.cta.sub}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <MagneticButton className="rounded-full bg-[#0071e3] px-10 py-5 text-xl font-bold text-white shadow-2xl shadow-[#0071e3]/40 transition-all hover:opacity-90 active:scale-[0.98]">
                    {t.cta.btn1}
                  </MagneticButton>
                  <button className="text-xl font-bold text-white hover:text-[#0071e3] transition-colors">
                    {t.cta.btn2}
                  </button>
                </div>
                <p className="mt-12 text-sm text-[#86868b]">{t.cta.footnote}</p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
