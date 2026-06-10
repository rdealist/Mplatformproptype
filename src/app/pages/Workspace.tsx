import { 
  Database, 
  Target, 
  CheckCircle, 
  Clock, 
  Upload, 
  ArrowRight, 
  Award, 
  Plus, 
  Activity, 
  Lock, 
  ShoppingBag,
  Briefcase,
  FileSearch,
  ChevronRight,
  Filter,
  History,
  ShieldCheck,
  TrendingUp,
  MoreVertical,
  Bell,
  Star,
  Users,
  Zap,
  CreditCard,
  PieChart as PieChartIcon,
  Layers,
  Sparkles
} from "lucide-react";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion, AnimatePresence } from "motion/react";

type MainStreamTab = "activity" | "tasks" | "datasets";
type DatasetFilter = "all" | "published" | "purchased";
type TaskFilter = "all" | "published" | "joined";

export default function Workspace() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<MainStreamTab>("activity");
  const [datasetFilter, setDatasetFilter] = useState<DatasetFilter>("all");
  const [taskFilter, setTaskFilter] = useState<TaskFilter>("all");

  const revenueData = [
    { month: "1月", labelPoints: 800, reviewPoints: 400 },
    { month: "2月", labelPoints: 1200, reviewPoints: 600 },
    { month: "3月", labelPoints: 2000, reviewPoints: 500 },
    { month: "4月", labelPoints: 1800, reviewPoints: 800 },
    { month: "5月", labelPoints: 2600, reviewPoints: 1200 },
    { month: "6月", labelPoints: 3100, reviewPoints: 900 },
  ];

  const levelRules = [
    { level: "Lv.1 初级标注员", range: "0 - 1,000", reward: "基础收益系数 1.0x" },
    { level: "Lv.2 中级标注员", range: "1,001 - 2,500", reward: "收益系数 1.2x" },
    { level: "Lv.3 中级标注员", range: "2,501 - 5,000", reward: "收益系数 1.5x" },
    { level: "Lv.4 中级标注员", range: "5,001 - 8,000", reward: "收益系数 2.0x" },
    { level: "Lv.5 认证专家", range: "8,001 - 12,000", reward: "2.5x + 审核权限" },
    { level: "Lv.6 权威专家", range: "12,001 - 17,000", reward: "收益系数 3.5x" },
  ];

  const pointHistory = [
    { id: 1, type: "标注", description: "完成 [肺结节CT标注] 任务单", points: "+200", date: "今天 14:30" },
    { id: 2, type: "审核", description: "通过 [脑部MRI] 任务单审核", points: "+150", date: "昨天 11:20" },
    { id: 3, type: "上传", description: "上传 [眼底影像] 数据集获奖励", points: "+500", date: "06-08 16:45" },
    { id: 4, type: "奖励", description: "平台新用户注册礼包", points: "+1000", date: "05-20 09:00" },
  ];

  const myDatasets = [
    {
      id: "D001",
      name: "肺结节CT训练数据集",
      type: "published",
      status: "公开",
      samples: "1,200",
      downloads: 45,
      rating: 9.6,
      date: "2026-05-20",
    },
    {
      id: "PD001",
      name: "全球眼底硬性渗出金标准集",
      type: "purchased",
      status: "已下载",
      samples: "2,500",
      owner: "北京协和医院",
      date: "2026-05-10",
    }
  ];

  const myTasks = [
    {
      id: "T001",
      title: "肺结节良恶性标注任务单",
      category: "published",
      status: "进行中",
      reward: "5,000",
      progress: 60,
      participants: "12/20",
    },
    {
      id: "T101",
      title: "视网膜病变分级标注任务单",
      category: "joined",
      status: "进行中",
      reward: "3,500",
      progress: 75,
      deadline: "2026-06-15",
    }
  ];

  const statusStyles = {
    公开: "text-[#34c759] bg-[#34c759]/[0.08]",
    进行中: "text-[#0071e3] bg-[#0071e3]/[0.08]",
    已下载: "text-[#af52de] bg-[#af52de]/[0.08]",
    已完成: "text-[#86868b] bg-black/[0.04]",
  };

  const currentExp = 6250;
  const nextLevelExp = 8000;
  const expPercentage = (currentExp / nextLevelExp) * 100;

  return (
    <main className="min-h-[calc(100vh-44px)] bg-[#fbfbfd] text-[#1d1d1f] antialiased overflow-y-auto scrollbar-hide-default">
      <style dangerouslySetInnerHTML={{ __html: `
        .scrollbar-hide-default::-webkit-scrollbar { width: 4px; }
        .scrollbar-hide-default::-webkit-scrollbar-track { background: transparent; }
        .scrollbar-hide-default::-webkit-scrollbar-thumb { background: transparent; border-radius: 10px; }
        .scrollbar-hide-default:hover::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); }
      `}} />

      <div className="mx-auto max-w-[1400px] px-6 lg:px-12 py-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          
          {/* ── Left Sidebar: Profile & Quick Links ── */}
          <aside className="lg:col-span-3 space-y-6 lg:sticky lg:top-4">
            {/* Profile Card */}
            <section className="rounded-[32px] border border-black/[0.06] bg-white/80 backdrop-blur-2xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
              <div className="flex flex-col items-center text-center">
                <div className="relative group">
                  <div className="h-24 w-24 overflow-hidden rounded-full border-2 border-[#0071e3]/10 p-1 bg-white shadow-sm transition-transform duration-500 group-hover:scale-105">
                    <ImageWithFallback 
                      src="https://images.unsplash.com/photo-1659353888906-adb3e0041693?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBhc2lhbiUyMGRvY3RvciUyMHBvcnRyYWl0fGVufDF8fHx8MTc4MTAwMjcyMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
                      alt="Dr. Chen" 
                      className="h-full w-full object-cover rounded-full" 
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md border border-black/[0.05]">
                    <Award className="h-4 w-4 text-[#0071e3]" />
                  </div>
                </div>
                <h2 className="mt-4 text-xl font-bold tracking-tight">Dr. Lin Chen</h2>
                <p className="text-[12px] font-bold text-[#86868b] uppercase tracking-wider mt-1">三甲医院 · 影像学专家</p>
                <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#0071e3]/[0.08] px-4 py-1.5 text-[11px] font-bold text-[#0071e3]">
                  Lv.4 中级标注员
                </div>
              </div>

              <div className="mt-8 space-y-4 border-t border-black/[0.04] pt-6">
                <div className="flex justify-between items-center group cursor-pointer">
                  <span className="text-[11px] font-bold text-[#86868b] uppercase tracking-wider">可用积分</span>
                  <div className="flex items-center gap-1">
                    <span className="text-xl font-bold text-[#1d1d1f] tracking-tight">14,250</span>
                    <ChevronRight className="h-3 w-3 text-black/[0.1] group-hover:text-[#0071e3] transition-colors" />
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-bold text-[#86868b] uppercase tracking-wider">本周增长</span>
                  <span className="text-xs font-bold text-[#34c759] bg-[#34c759]/[0.08] px-2 py-0.5 rounded-lg">+1,200</span>
                </div>
              </div>
            </section>

            {/* Quick Actions */}
            <section className="space-y-3">
              <button 
                onClick={() => navigate('/publish-data')}
                className="group flex w-full items-center justify-between rounded-[24px] bg-[#0071e3] p-5 text-white shadow-[0_4px_16px_rgba(0,113,227,0.25)] transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center">
                    <Upload className="h-5 w-5" />
                  </div>
                  <span className="font-bold text-sm tracking-tight">上传数据集</span>
                </div>
                <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </button>
              
              {[
                { label: '发布任务单', icon: Target, path: '/publish-task', color: '#0071e3' },
                { label: '模型工作台', icon: Zap, path: '/model-service', color: '#ff9500' }
              ].map((btn) => (
                <button 
                  key={btn.label}
                  onClick={() => navigate(btn.path)}
                  className="group flex w-full items-center justify-between rounded-[24px] border border-black/[0.06] bg-white/80 backdrop-blur-xl p-4.5 transition-all hover:bg-black/[0.02] hover:scale-[1.01] active:scale-[0.98]"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-black/[0.04] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <btn.icon className="h-5 w-5" style={{ color: btn.color }} />
                    </div>
                    <span className="font-bold text-sm text-[#1d1d1f] tracking-tight">{btn.label}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-black/[0.1] group-hover:text-[#1d1d1f] transition-all" />
                </button>
              ))}
            </section>

            {/* Week Stats */}
            <section className="rounded-[32px] border border-black/[0.06] bg-white/80 backdrop-blur-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-5">
                <Activity className="h-4 w-4 text-[#0071e3]" />
                <h3 className="text-[11px] font-bold text-[#86868b] uppercase tracking-[0.15em]">本周统计</h3>
              </div>
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between text-[11px] font-bold mb-1.5 px-0.5">
                    <span className="text-[#86868b]">标注任务进度</span>
                    <span className="text-[#0071e3]">78%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-black/[0.04] overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "78%" }}
                      className="h-full bg-[#0071e3] rounded-full"
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center text-[11px] font-bold px-0.5">
                  <span className="text-[#86868b]">活跃时长</span>
                  <span className="text-[#1d1d1f]">12.5 小时</span>
                </div>
                <div className="flex justify-between items-center text-[11px] font-bold px-0.5">
                  <span className="text-[#86868b]">专家评分</span>
                  <span className="text-[#34c759]">9.8 / 10</span>
                </div>
              </div>
            </section>
          </aside>

          {/* ── Middle: Main Content Stream ── */}
          <main className="lg:col-span-6 space-y-8">
            {/* Greeting */}
            <div className="pt-2">
              <motion.h1 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-[36px] font-bold tracking-tight text-[#1d1d1f]"
              >
                下午好, Lin
              </motion.h1>
              <p className="text-[15px] font-medium text-[#86868b] mt-1">您有 <span className="text-[#0071e3]">3</span> 个任务待审核，<span className="text-[#0071e3]">2</span> 个数据集收到新评价。</p>
            </div>

            {/* Tab Navigation */}
            <div className="flex items-center gap-10 border-b border-black/[0.06]">
              {["activity", "tasks", "datasets"].map((tab) => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab as MainStreamTab)}
                  className={`relative pb-4 text-[16px] font-bold transition-all ${activeTab === tab ? "text-[#0071e3]" : "text-[#86868b] hover:text-[#1d1d1f]"}`}
                >
                  {tab === "activity" ? "收益概览" : tab === "tasks" ? "我的任务" : "数据集"}
                  {activeTab === tab && (
                    <motion.div 
                      layoutId="workspace-tab" 
                      className="absolute bottom-0 left-0 h-0.5 w-full bg-[#0071e3] rounded-full shadow-[0_-2px_8px_rgba(0,113,227,0.4)]" 
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Dynamic Content */}
            <AnimatePresence mode="wait">
              {activeTab === "activity" && (
                <motion.section 
                  key="activity"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="space-y-6"
                >
                  {/* Chart Card */}
                  <div className="rounded-[32px] border border-black/[0.06] bg-white p-8 shadow-sm group hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-[#0071e3]/[0.05] flex items-center justify-center">
                          <TrendingUp className="h-5 w-5 text-[#0071e3]" />
                        </div>
                        <h3 className="font-bold text-lg tracking-tight">积分收益趋势</h3>
                      </div>
                      <div className="flex items-center gap-1.5 rounded-full bg-black/[0.03] p-1">
                        <button className="rounded-full bg-white px-4 py-1.5 text-[11px] font-bold shadow-sm">近半年</button>
                        <button className="px-4 py-1.5 text-[11px] font-bold text-[#86868b] hover:text-[#1d1d1f]">近一年</button>
                      </div>
                    </div>
                    <div className="h-[280px] w-full mt-2">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={revenueData}>
                          <defs>
                            <linearGradient id="colorPoints" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#0071e3" stopOpacity={0.12}/>
                              <stop offset="95%" stopColor="#0071e3" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="6 6" vertical={false} stroke="rgba(0,0,0,0.03)" />
                          <XAxis 
                            dataKey="month" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{fontSize: 11, fontWeight: 700, fill: '#86868b'}} 
                            dy={10}
                          />
                          <YAxis 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{fontSize: 11, fontWeight: 700, fill: '#86868b'}} 
                          />
                          <Tooltip 
                            contentStyle={{ 
                              borderRadius: '24px', 
                              border: '1px solid rgba(0,0,0,0.05)', 
                              boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                              padding: '12px 16px'
                            }}
                            itemStyle={{ fontSize: '12px', fontWeight: 700 }}
                          />
                          <Area 
                            type="monotone" 
                            dataKey="labelPoints" 
                            name="积分" 
                            stroke="#0071e3" 
                            strokeWidth={3} 
                            fillOpacity={1} 
                            fill="url(#colorPoints)" 
                            animationDuration={1500}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { label: "累计标注量", value: "12,450", unit: "帧", icon: Layers, trend: "+12%", color: "#0071e3" },
                      { label: "质量评分", value: "98.4", unit: "%", icon: Star, trend: "+2.1%", color: "#34c759" }
                    ].map((metric, idx) => (
                      <div key={idx} className="rounded-[32px] border border-black/[0.06] bg-white p-6 shadow-sm hover:scale-[1.02] transition-transform cursor-pointer">
                        <div className="flex items-center gap-3 text-[#86868b] mb-4">
                          <metric.icon className="h-4 w-4" style={{ color: metric.color }} />
                          <span className="text-[11px] font-bold uppercase tracking-wider">{metric.label}</span>
                        </div>
                        <div className="flex items-baseline gap-1.5">
                          <p className="text-3xl font-bold tracking-tight">{metric.value}</p>
                          <span className="text-xs font-bold text-[#86868b]">{metric.unit}</span>
                        </div>
                        <div className="mt-3 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold" style={{ backgroundColor: `${metric.color}10`, color: metric.color }}>
                          <TrendingUp className="h-3 w-3" />
                          <span>{metric.trend}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.section>
              )}

              {activeTab === "tasks" && (
                <motion.section 
                  key="tasks"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="space-y-5"
                >
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex gap-1.5 p-1 bg-black/[0.04] rounded-full backdrop-blur-sm">
                      {[
                        { id: "all", label: "全部" },
                        { id: "published", label: "已发布" },
                        { id: "joined", label: "已参与" }
                      ].map(f => (
                        <button 
                          key={f.id}
                          onClick={() => setTaskFilter(f.id as TaskFilter)}
                          className={`px-5 py-2 text-[11px] font-bold rounded-full transition-all ${taskFilter === f.id ? "bg-white shadow-md text-[#1d1d1f]" : "text-[#86868b] hover:text-[#1d1d1f]"}`}
                        >
                          {f.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {myTasks
                    .filter(task => taskFilter === "all" || task.category === taskFilter)
                    .map(task => (
                    <div key={task.id} className="group rounded-[32px] border border-black/[0.06] bg-white p-7 transition-all hover:border-[#0071e3]/30 hover:shadow-xl hover:scale-[1.01]">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-4 mb-5">
                            <h4 className="font-bold text-xl tracking-tight truncate">{task.title}</h4>
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-tight ${statusStyles[task.status as keyof typeof statusStyles]}`}>
                              {task.status}
                            </span>
                          </div>
                          <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2">
                              <CreditCard className="h-4 w-4 text-[#0071e3]" />
                              <span className="text-[13px] font-bold text-[#0071e3]">{task.reward} 积分</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-[#86868b]" />
                              <span className="text-[12px] font-medium text-[#86868b]">截止: {task.deadline || "进行中"}</span>
                            </div>
                          </div>
                        </div>
                        <button className="h-10 w-10 rounded-full bg-black/[0.04] flex items-center justify-center transition-all group-hover:bg-[#0071e3] group-hover:text-white group-hover:scale-110">
                          <ArrowRight className="h-5 w-5" />
                        </button>
                      </div>
                      <div className="mt-8">
                        <div className="flex justify-between items-end text-[11px] font-bold mb-2 px-0.5">
                          <span className="text-[#86868b] uppercase tracking-wider">当前处理进度</span>
                          <span className="text-[#0071e3]">{task.progress}%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-black/[0.04] overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${task.progress}%` }}
                            className="h-full bg-gradient-to-r from-[#0071e3] to-[#5ac8fa] rounded-full" 
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.section>
              )}

              {activeTab === "datasets" && (
                <motion.section 
                  key="datasets"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="space-y-5"
                >
                  <div className="flex gap-1.5 p-1 bg-black/[0.04] rounded-full w-fit mb-4">
                    {[
                      { id: "all", label: "全部" },
                      { id: "published", label: "已上传" },
                      { id: "purchased", label: "已购入" }
                    ].map(f => (
                      <button 
                        key={f.id}
                        onClick={() => setDatasetFilter(f.id as DatasetFilter)}
                        className={`px-5 py-2 text-[11px] font-bold rounded-full transition-all ${datasetFilter === f.id ? "bg-white shadow-md text-[#1d1d1f]" : "text-[#86868b] hover:text-[#1d1d1f]"}`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>

                  {myDatasets
                    .filter(ds => datasetFilter === "all" || ds.type === datasetFilter)
                    .map(ds => (
                    <div key={ds.id} className="group rounded-[32px] border border-black/[0.06] bg-white p-6 transition-all hover:border-[#0071e3]/30 hover:shadow-lg">
                      <div className="flex gap-5">
                        <div className="h-16 w-16 shrink-0 rounded-[20px] bg-[#0071e3]/[0.08] flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Database className="h-8 w-8 text-[#0071e3]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-bold text-lg tracking-tight truncate">{ds.name}</h4>
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${statusStyles[ds.status as keyof typeof statusStyles]}`}>
                              {ds.status}
                            </span>
                          </div>
                          <div className="flex items-center gap-5 text-[12px] font-medium text-[#86868b]">
                            <span className="flex items-center gap-1.5"><Layers className="h-3.5 w-3.5" />样本: {ds.samples}</span>
                            {ds.owner && <span className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5" />{ds.owner}</span>}
                            <span>{ds.date}</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-black/[0.04]">
                        <button className="px-6 py-2 rounded-xl border border-black/[0.08] text-[12px] font-bold text-[#1d1d1f] hover:bg-black/[0.04] transition-all">
                          查看明细
                        </button>
                        <button className="px-6 py-2 rounded-xl bg-[#0071e3] text-white text-[12px] font-bold shadow-[0_4px_12px_rgba(0,113,227,0.2)] hover:opacity-90 transition-all">
                          进入工作台
                        </button>
                      </div>
                    </div>
                  ))}
                </motion.section>
              )}
            </AnimatePresence>
          </main>

          {/* ── Right Sidebar: Progress & History ── */}
          <aside className="lg:col-span-3 space-y-6 lg:sticky lg:top-4">
            {/* Level Progress */}
            <section className="rounded-[32px] border border-black/[0.06] bg-white/80 backdrop-blur-2xl p-7 shadow-sm">
              <div className="flex items-center justify-between mb-6 px-1">
                <h3 className="text-[12px] font-bold text-[#86868b] uppercase tracking-[0.2em]">等级进化</h3>
                <ShieldCheck className="h-5 w-5 text-[#0071e3]" />
              </div>
              
              <div className="space-y-6">
                <div className="flex justify-between items-end px-1">
                  <div>
                    <p className="text-3xl font-bold tracking-tight text-[#1d1d1f]">Lv.4</p>
                    <p className="text-[10px] font-bold text-[#86868b] uppercase tracking-widest mt-0.5">当前等级</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-[#86868b]">Lv.5</p>
                    <p className="text-[10px] font-bold text-[#86868b] uppercase tracking-widest mt-0.5">目标</p>
                  </div>
                </div>

                <div className="relative h-2.5 w-full rounded-full bg-black/[0.04] overflow-hidden shadow-inner">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${expPercentage}%` }}
                    className="h-full bg-gradient-to-r from-[#0071e3] to-[#5ac8fa] rounded-full shadow-[0_0_12px_rgba(0,113,227,0.3)]"
                  />
                </div>

                <div className="rounded-2xl bg-[#fbfbfd] p-4 border border-black/[0.03]">
                  <p className="text-[12px] text-[#86868b] font-medium leading-[1.6] text-center">
                    距离晋升还需 <span className="font-bold text-[#1d1d1f]">{nextLevelExp - currentExp}</span> 经验
                    <br />
                    解锁 <span className="text-[#0071e3] font-bold">审核权限</span> 与 <span className="text-[#0071e3] font-bold">2.5x 系数</span>
                  </p>
                </div>
              </div>

              {/* Mini Level Table */}
              <div className="mt-8 pt-8 border-t border-black/[0.04] space-y-4">
                <div className="flex items-center gap-2 px-1 mb-2">
                  <Sparkles className="h-3.5 w-3.5 text-[#ff9500]" />
                  <h4 className="text-[11px] font-bold text-[#86868b] uppercase tracking-widest">等级特权概览</h4>
                </div>
                <div className="space-y-2">
                  {levelRules.map((rule, idx) => (
                    <div 
                      key={idx} 
                      className={`group flex items-center justify-between p-3 rounded-2xl transition-all duration-300 ${idx === 3 ? 'bg-[#0071e3]/[0.08] border border-[#0071e3]/20 shadow-sm' : 'hover:bg-black/[0.02]'}`}
                    >
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`text-[12px] font-bold truncate ${idx === 3 ? 'text-[#0071e3]' : 'text-[#1d1d1f]'}`}>
                            {rule.level.split(' ')[0]}
                          </span>
                          {idx === 3 && (
                            <div className="h-2 w-2 rounded-full bg-[#0071e3] animate-pulse" />
                          )}
                        </div>
                        <span className="text-[10px] text-[#86868b] font-bold">{rule.range}</span>
                      </div>
                      <div className="text-right">
                        <span className={`text-[11px] font-bold whitespace-nowrap ${idx === 3 ? 'text-[#0071e3]' : 'text-[#34c759]'}`}>
                          {rule.reward.includes('x') ? rule.reward.split(' ').find(s => s.includes('x')) : "特殊权限"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Point History */}
            <section className="rounded-[32px] border border-black/[0.06] bg-white/80 backdrop-blur-2xl p-7">
              <div className="flex items-center justify-between mb-8 px-1">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-black/[0.04] flex items-center justify-center">
                    <History className="h-4.5 w-4.5 text-[#86868b]" />
                  </div>
                  <h3 className="text-[12px] font-bold text-[#86868b] uppercase tracking-[0.2em]">积分动态</h3>
                </div>
                <button className="text-[11px] font-bold text-[#0071e3] hover:underline">全部</button>
              </div>
              
              <div className="space-y-6">
                {pointHistory.map(item => (
                  <div key={item.id} className="group relative flex gap-4">
                    <div className="relative z-10 h-2.5 w-2.5 mt-1.5 rounded-full bg-[#0071e3]/30 shrink-0 group-hover:scale-125 transition-transform" />
                    {/* Timeline line */}
                    <div className="absolute left-[5px] top-6 w-[1px] h-10 bg-black/[0.04] last:hidden" />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <p className="text-[13px] font-bold text-[#1d1d1f] line-clamp-1 tracking-tight">{item.description}</p>
                        <span className="text-[12px] font-bold text-[#34c759] ml-2">{item.points}</span>
                      </div>
                      <p className="text-[11px] font-medium text-[#86868b]">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
