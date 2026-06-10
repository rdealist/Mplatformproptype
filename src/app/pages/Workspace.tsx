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
  Zap
} from "lucide-react";
import { useState } from "react";
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
    { level: "Lv.7 权威专家", range: "17,001 - 23,000", reward: "收益系数 4.5x" },
    { level: "Lv.8 权威专家", range: "23,001 - 30,000", reward: "收益系数 6.0x" },
    { level: "Lv.9 首席专家", range: "30,001+", reward: "8.0x + 治理权" },
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
    <main className="min-h-screen bg-[#fbfbfd] text-[#1d1d1f] antialiased">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-20 py-12">
        {/* 三栏布局容器 */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          
          {/* 左侧栏：个人资料与快捷入口 */}
          <aside className="lg:col-span-3 space-y-6">
            {/* 个人资料卡片 */}
            <section className="rounded-3xl border border-black/[0.08] bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              <div className="flex flex-col items-center text-center">
                <div className="relative group">
                  <div className="h-24 w-24 overflow-hidden rounded-full border-2 border-[#0071e3]/20 bg-black/[0.04] transition-transform duration-300 group-hover:scale-105">
                    <ImageWithFallback 
                      src="https://images.unsplash.com/photo-1659353888906-adb3e0041693?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBhc2lhbiUyMGRvY3RvciUyMHBvcnRyYWl0fGVufDF8fHx8MTc4MTAwMjcyMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
                      alt="Dr. Chen" 
                      className="h-full w-full object-cover" 
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md">
                    <Award className="h-4 w-4 text-[#0071e3]" />
                  </div>
                </div>
                <h2 className="mt-4 text-[21px] font-semibold">Dr. Lin Chen</h2>
                <p className="text-sm text-[#86868b]">三甲医院 · 影像学专家</p>
                <div className="mt-4 inline-flex items-center gap-1 rounded-full bg-[#0071e3]/[0.08] px-3 py-1 text-xs font-semibold text-[#0071e3]">
                  Lv.4 中级标注员
                </div>
              </div>

              <div className="mt-8 space-y-4 border-t border-black/[0.04] pt-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#86868b]">可用积分</span>
                  <span className="text-lg font-bold text-[#1d1d1f]">14,250</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#86868b]">待入账</span>
                  <span className="text-sm font-medium text-[#34c759]">+1,200</span>
                </div>
              </div>
            </section>

            {/* 快捷操作 */}
            <section className="space-y-3">
              <button 
                onClick={() => navigate('/publish-data')}
                className="flex w-full items-center justify-between rounded-2xl bg-[#0071e3] p-4 text-white transition-all hover:opacity-90 active:scale-[0.98]"
              >
                <div className="flex items-center gap-3">
                  <Upload className="h-5 w-5" />
                  <span className="font-medium">上传数据集</span>
                </div>
                <ChevronRight className="h-4 w-4 opacity-60" />
              </button>
              <button 
                onClick={() => navigate('/publish-task')}
                className="flex w-full items-center justify-between rounded-2xl border border-black/[0.08] bg-white p-4 transition-all hover:bg-black/[0.02] active:scale-[0.98]"
              >
                <div className="flex items-center gap-3">
                  <Target className="h-5 w-5 text-[#0071e3]" />
                  <span className="font-medium">发布任务单</span>
                </div>
                <ChevronRight className="h-4 w-4 text-[#86868b]" />
              </button>
              <button 
                onClick={() => navigate('/model-service')}
                className="flex w-full items-center justify-between rounded-2xl border border-black/[0.08] bg-white p-4 transition-all hover:bg-black/[0.02] active:scale-[0.98]"
              >
                <div className="flex items-center gap-3">
                  <Zap className="h-5 w-5 text-[#ff9500]" />
                  <span className="font-medium">接入模型服务</span>
                </div>
                <ChevronRight className="h-4 w-4 text-[#86868b]" />
              </button>
            </section>

            {/* 简单统计 */}
            <section className="rounded-3xl border border-black/[0.08] bg-white p-5">
              <h3 className="text-sm font-semibold text-[#86868b] mb-4">本周统计</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[#86868b]">标注任务进度</span>
                    <span className="font-medium">78%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-black/[0.04]">
                    <div className="h-full w-[78%] rounded-full bg-[#0071e3]" />
                  </div>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#86868b]">活跃时长</span>
                  <span className="font-medium text-[#1d1d1f]">12.5 小时</span>
                </div>
              </div>
            </section>
          </aside>

          {/* 中间主内容：动态流 */}
          <main className="lg:col-span-6 space-y-6">
            {/* 欢迎语 */}
            <div className="mb-8">
              <h1 className="text-[32px] font-semibold tracking-tight">下午好, Lin</h1>
              <p className="text-[#86868b]">您有 3 个任务单待审核，2 个数据集有新反馈。</p>
            </div>

            {/* 主切换导航 */}
            <div className="flex items-center gap-8 border-b border-black/[0.04]">
              <button 
                onClick={() => setActiveTab("activity")}
                className={`relative pb-4 text-[18px] font-medium transition-all ${activeTab === "activity" ? "text-[#0071e3]" : "text-[#86868b] hover:text-[#1d1d1f]"}`}
              >
                收益概览
                {activeTab === "activity" && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 h-0.5 w-full bg-[#0071e3]" />}
              </button>
              <button 
                onClick={() => setActiveTab("tasks")}
                className={`relative pb-4 text-[18px] font-medium transition-all ${activeTab === "tasks" ? "text-[#0071e3]" : "text-[#86868b] hover:text-[#1d1d1f]"}`}
              >
                任务单
                {activeTab === "tasks" && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 h-0.5 w-full bg-[#0071e3]" />}
              </button>
              <button 
                onClick={() => setActiveTab("datasets")}
                className={`relative pb-4 text-[18px] font-medium transition-all ${activeTab === "datasets" ? "text-[#0071e3]" : "text-[#86868b] hover:text-[#1d1d1f]"}`}
              >
                数据集
                {activeTab === "datasets" && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 h-0.5 w-full bg-[#0071e3]" />}
              </button>
            </div>

            {/* 内容区域 */}
            <AnimatePresence mode="wait">
              {activeTab === "activity" && (
                <motion.section 
                  key="activity"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  {/* 图表卡片 */}
                  <div className="rounded-3xl border border-black/[0.08] bg-white p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-semibold">积分收益趋势</h3>
                      <div className="flex items-center gap-2 rounded-full bg-black/[0.04] p-1">
                        <button className="rounded-full bg-white px-3 py-1 text-xs font-medium shadow-sm">近半年</button>
                        <button className="px-3 py-1 text-xs font-medium text-[#86868b]">近一年</button>
                      </div>
                    </div>
                    <div className="h-[240px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={revenueData}>
                          <defs>
                            <linearGradient id="colorPoints" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#0071e3" stopOpacity={0.1}/>
                              <stop offset="95%" stopColor="#0071e3" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.04)" />
                          <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#86868b'}} />
                          <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#86868b'}} />
                          <Tooltip 
                            contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                          />
                          <Area type="monotone" dataKey="labelPoints" name="积分" stroke="#0071e3" strokeWidth={2} fillOpacity={1} fill="url(#colorPoints)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* 核心指标 */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-3xl border border-black/[0.08] bg-white p-5">
                      <div className="flex items-center gap-3 text-[#86868b] mb-3">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-sm">累计标注量</span>
                      </div>
                      <p className="text-2xl font-bold">12,450 <span className="text-xs font-normal text-[#86868b]">帧</span></p>
                      <div className="mt-2 flex items-center gap-1 text-[10px] text-[#34c759]">
                        <TrendingUp className="h-3 w-3" />
                        <span>比上周 +12%</span>
                      </div>
                    </div>
                    <div className="rounded-3xl border border-black/[0.08] bg-white p-5">
                      <div className="flex items-center gap-3 text-[#86868b] mb-3">
                        <Users className="h-4 w-4" />
                        <span className="text-sm">被采纳率</span>
                      </div>
                      <p className="text-2xl font-bold">98.4%</p>
                      <div className="mt-2 flex items-center gap-1 text-[10px] text-[#34c759]">
                        <TrendingUp className="h-3 w-3" />
                        <span>高出行业均值 5%</span>
                      </div>
                    </div>
                  </div>
                </motion.section>
              )}

              {activeTab === "tasks" && (
                <motion.section 
                  key="tasks"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex gap-2 p-1 bg-black/[0.04] rounded-full">
                      <button 
                        onClick={() => setTaskFilter("all")}
                        className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all ${taskFilter === "all" ? "bg-white shadow-sm text-[#1d1d1f]" : "text-[#86868b]"}`}
                      >
                        全部
                      </button>
                      <button 
                        onClick={() => setTaskFilter("published")}
                        className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all ${taskFilter === "published" ? "bg-white shadow-sm text-[#1d1d1f]" : "text-[#86868b]"}`}
                      >
                        我发布的
                      </button>
                      <button 
                        onClick={() => setTaskFilter("joined")}
                        className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all ${taskFilter === "joined" ? "bg-white shadow-sm text-[#1d1d1f]" : "text-[#86868b]"}`}
                      >
                        我参与的
                      </button>
                    </div>
                    <Filter className="h-4 w-4 text-[#86868b] cursor-pointer" />
                  </div>

                  {myTasks
                    .filter(task => taskFilter === "all" || task.category === taskFilter)
                    .map(task => (
                    <div key={task.id} className="group rounded-3xl border border-black/[0.08] bg-white p-6 transition-all hover:border-[#0071e3]/30 hover:shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-3">
                            <h4 className="font-semibold text-lg">{task.title}</h4>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${statusStyles[task.status as keyof typeof statusStyles]}`}>
                              {task.status}
                            </span>
                          </div>
                          <div className="mt-4 flex gap-6 text-xs text-[#86868b]">
                            <span className="flex items-center gap-1.5">
                              <Star className="h-3.5 w-3.5 text-[#ff9500]" fill="currentColor" />
                              {task.reward} 积分奖励
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Clock className="h-3.5 w-3.5" />
                              截止: {task.deadline || "进行中"}
                            </span>
                          </div>
                        </div>
                        <button className="rounded-full bg-black/[0.04] p-2 transition-colors hover:bg-[#0071e3]/[0.08] hover:text-[#0071e3]">
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="mt-6">
                        <div className="flex justify-between text-xs mb-2">
                          <span className="text-[#86868b]">进度</span>
                          <span className="font-semibold">{task.progress}%</span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-black/[0.04]">
                          <div className="h-full rounded-full bg-[#0071e3] transition-all duration-500" style={{ width: `${task.progress}%` }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.section>
              )}

              {activeTab === "datasets" && (
                <motion.section 
                  key="datasets"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex gap-2 p-1 bg-black/[0.04] rounded-full">
                      <button 
                        onClick={() => setDatasetFilter("all")}
                        className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all ${datasetFilter === "all" ? "bg-white shadow-sm text-[#1d1d1f]" : "text-[#86868b]"}`}
                      >
                        全部
                      </button>
                      <button 
                        onClick={() => setDatasetFilter("published")}
                        className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all ${datasetFilter === "published" ? "bg-white shadow-sm text-[#1d1d1f]" : "text-[#86868b]"}`}
                      >
                        已上传
                      </button>
                      <button 
                        onClick={() => setDatasetFilter("purchased")}
                        className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all ${datasetFilter === "purchased" ? "bg-white shadow-sm text-[#1d1d1f]" : "text-[#86868b]"}`}
                      >
                        已购入
                      </button>
                    </div>
                  </div>

                  {myDatasets
                    .filter(ds => datasetFilter === "all" || ds.type === datasetFilter)
                    .map(ds => (
                    <div key={ds.id} className="group rounded-3xl border border-black/[0.08] bg-white p-5 transition-all hover:border-[#0071e3]/30">
                      <div className="flex gap-4">
                        <div className="h-16 w-16 shrink-0 rounded-2xl bg-[#0071e3]/[0.08] flex items-center justify-center">
                          <Database className="h-8 w-8 text-[#0071e3]" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold">{ds.name}</h4>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${statusStyles[ds.status as keyof typeof statusStyles]}`}>
                              {ds.status}
                            </span>
                          </div>
                          <div className="mt-2 flex gap-4 text-xs text-[#86868b]">
                            <span>样本: {ds.samples}</span>
                            {ds.owner && <span>所有者: {ds.owner}</span>}
                            <span>{ds.date}</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end gap-2">
                        <button className="px-4 py-1.5 rounded-full border border-black/[0.08] text-xs font-medium hover:bg-black/[0.02]">
                          详情
                        </button>
                        <button className="px-4 py-1.5 rounded-full bg-[#0071e3] text-white text-xs font-medium">
                          进入标注
                        </button>
                      </div>
                    </div>
                  ))}
                </motion.section>
              )}
            </AnimatePresence>
          </main>

          {/* 右侧栏：等级、通知与历史 */}
          <aside className="lg:col-span-3 space-y-6">
            {/* 等级进度卡片 */}
            <section className="rounded-3xl border border-black/[0.08] bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">等级进化</h3>
                <ShieldCheck className="h-5 w-5 text-[#0071e3]" />
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-2xl font-bold text-[#1d1d1f]">Lv.4</p>
                    <p className="text-[10px] text-[#86868b] uppercase tracking-wider">当前等级</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-[#86868b]">Lv.5</p>
                    <p className="text-[10px] text-[#86868b] uppercase tracking-wider">下一阶段</p>
                  </div>
                </div>

                <div className="relative h-2 w-full rounded-full bg-black/[0.04] overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${expPercentage}%` }}
                    className="h-full bg-gradient-to-r from-[#0071e3] to-[#5ac8fa] rounded-full"
                  />
                </div>

                <p className="text-xs text-[#86868b] leading-relaxed text-center">
                  还需 <span className="font-semibold text-[#1d1d1f]">{nextLevelExp - currentExp}</span> 经验即可晋升
                  <br />
                  解锁 <span className="text-[#0071e3] font-medium">专家审核权限</span> 与 <span className="text-[#0071e3] font-medium">2.5x 收益</span>
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-black/[0.04] space-y-4">
                <h4 className="text-[11px] font-bold text-[#86868b] uppercase tracking-widest px-1">等级特权全览</h4>
                <div className="space-y-1.5">
                  {levelRules.map((rule, idx) => (
                    <div 
                      key={idx} 
                      className={`group flex items-center justify-between p-2 rounded-xl transition-all duration-200 ${idx === 3 ? 'bg-[#0071e3]/[0.06] border border-[#0071e3]/10 ring-1 ring-[#0071e3]/5' : 'hover:bg-black/[0.02]'}`}
                    >
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5">
                          <span className={`text-[12px] font-bold ${idx === 3 ? 'text-[#0071e3]' : 'text-[#1d1d1f]'}`}>
                            {rule.level.split(' ')[0]}
                          </span>
                          <span className={`text-[11px] font-medium ${idx === 3 ? 'text-[#0071e3]/80' : 'text-[#86868b]'}`}>
                            {rule.level.split(' ')[1]}
                          </span>
                          {idx === 3 && (
                            <span className="flex h-1.5 w-1.5 rounded-full bg-[#0071e3] animate-pulse" />
                          )}
                        </div>
                        <span className="text-[10px] text-[#86868b] font-medium">{rule.range} 经验</span>
                      </div>
                      <div className="text-right">
                        <span className={`text-[11px] font-bold ${idx === 3 ? 'text-[#0071e3]' : 'text-[#34c759]'}`}>
                          {rule.reward.includes('x') ? rule.reward.split(' ').find(s => s.includes('x')) : rule.reward.split(' + ')[0]}
                        </span>
                        {rule.reward.includes('+') && (
                          <div className="text-[9px] text-[#0071e3] font-medium leading-none mt-0.5">
                            {rule.reward.split(' + ')[1]}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 积分历史 */}
            <section className="rounded-3xl border border-black/[0.08] bg-white p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold">积分动态</h3>
                <History className="h-5 w-5 text-[#86868b]" />
              </div>
              
              <div className="space-y-5">
                {pointHistory.map(item => (
                  <div key={item.id} className="group relative flex gap-3">
                    <div className="h-2 w-2 mt-1.5 rounded-full bg-[#0071e3]/40 shrink-0" />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <p className="text-sm font-medium line-clamp-1">{item.description}</p>
                        <span className="text-xs font-bold text-[#34c759]">{item.points}</span>
                      </div>
                      <p className="text-[11px] text-[#86868b] mt-0.5">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button className="mt-6 flex w-full items-center justify-center gap-2 text-xs font-medium text-[#0071e3] hover:underline">
                查看完整对账单 <ArrowRight className="h-3 w-3" />
              </button>
            </section>

            {/* 平台公告/提示 */}
            <section className="rounded-3xl bg-[#0071e3]/[0.04] border border-[#0071e3]/10 p-5">
              <div className="flex items-center gap-2 mb-3 text-[#0071e3]">
                <Bell className="h-4 w-4" />
                <h3 className="text-xs font-bold uppercase tracking-wider">系统播报</h3>
              </div>
              <p className="text-xs text-[#1d1d1f] leading-relaxed">
                平台将于 6 月 15 日进行「专家共识」算法升级，期间标注奖励将限时上调 15%。
              </p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-[10px] text-[#86868b]">10 分钟前</span>
                <button className="text-[10px] font-bold text-[#0071e3] hover:underline">查看详情</button>
              </div>
            </section>
          </aside>

        </div>
      </div>
    </main>
  );
}
