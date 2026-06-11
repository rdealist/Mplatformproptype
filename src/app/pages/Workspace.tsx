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
  Sparkles,
  Globe,
  EyeOff,
  ExternalLink,
  Settings,
  X,
  Eye,
  ArrowDownCircle,
  PlayCircle
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

type MainStreamTab = "tasks" | "datasets" | "activity";
type DatasetFilter = "all" | "purchased" | "uploaded" | "commissioned";
type TaskFilter = "all" | "published" | "joined";
type TaskTypeFilter = "all" | "annotation" | "review";

interface DatasetItem {
  id: string;
  name: string;
  category: "purchased" | "uploaded" | "commissioned";
  status: string; // 公开, 私有, 已展示, 已下架, 等
  isPublic?: boolean;
  isPublished?: boolean; // 上架状态
  samples: string;
  downloads?: number;
  date: string;
  owner?: string;
  sourceType: "native" | "external";
  attributes?: {
    isDownloadable: boolean;
    isTaskable: boolean;
    isTrainable: boolean;
  };
}

interface TaskItem {
  id: string;
  title: string;
  category: "published" | "joined";
  type: "annotation" | "review";
  status: string;
  reward: string;
  progress: number;
  participants?: string;
  deadline?: string;
}

export default function Workspace() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<MainStreamTab>("tasks");
  const [datasetFilter, setDatasetFilter] = useState<DatasetFilter>("all");
  const [taskFilter, setTaskFilter] = useState<TaskFilter>("all");
  const [taskTypeFilter, setTaskTypeFilter] = useState<TaskTypeFilter>("all");
  const [selectedDataset, setSelectedDataset] = useState<DatasetItem | null>(null);

  const [datasets, setDatasets] = useState<DatasetItem[]>([
    {
      id: "D001",
      name: "肺结节CT训练数据集",
      category: "uploaded",
      status: "已上架",
      isPublic: true,
      isPublished: true,
      sourceType: "native",
      samples: "1,200",
      date: "2026-05-20",
      attributes: {
        isDownloadable: true,
        isTaskable: true,
        isTrainable: true
      }
    },
    {
      id: "D002",
      name: "胸部低剂量CT随访序列",
      category: "uploaded",
      status: "私有",
      isPublic: false,
      isPublished: false,
      sourceType: "native",
      samples: "850",
      date: "2026-06-10",
      attributes: {
        isDownloadable: false,
        isTaskable: true,
        isTrainable: false
      }
    },
    {
      id: "D003",
      name: "OASIS-3 脑成像外链数据集",
      category: "commissioned",
      status: "展示中",
      isPublic: true,
      isPublished: true,
      sourceType: "external",
      samples: "2,100",
      date: "2026-06-11",
    },
    {
      id: "PD001",
      name: "全球眼底硬性渗出数据集",
      category: "purchased",
      status: "已下载",
      sourceType: "native",
      samples: "2,500",
      owner: "北京协和医院",
      date: "2026-05-10",
    }
  ]);

  const toggleVisibility = (id: string) => {
    setDatasets(prev => prev.map(ds => {
      if (ds.id === id) {
        const nextPublic = !ds.isPublic;
        return {
          ...ds,
          isPublic: nextPublic,
          status: ds.isPublished ? (nextPublic ? "已上架" : "已上架(私有)") : (nextPublic ? "公开" : "私有")
        };
      }
      return ds;
    }));
  };

  const togglePublishStatus = (id: string) => {
    setDatasets(prev => prev.map(ds => {
      if (ds.id === id) {
        const nextPublished = !ds.isPublished;
        return {
          ...ds,
          isPublished: nextPublished,
          status: nextPublished 
            ? (ds.category === 'commissioned' ? "展示中" : (ds.isPublic ? "已上架" : "已上架(私有)")) 
            : "已下架"
        };
      }
      return ds;
    }));
  };

  const revenueData = [
    { month: "1月", labelPoints: 800, reviewPoints: 400 },
    { month: "2月", labelPoints: 1200, reviewPoints: 600 },
    { month: "3月", labelPoints: 2000, reviewPoints: 500 },
    { month: "4月", labelPoints: 1800, reviewPoints: 800 },
    { month: "5月", labelPoints: 2600, innerPoints: 1200 },
    { month: "6月", labelPoints: 3100, reviewPoints: 900 },
  ];

  const myTasks: TaskItem[] = [
    {
      id: "T001",
      title: "肺结节良恶性标注任务单",
      category: "published",
      type: "annotation",
      status: "进行中",
      reward: "5,000",
      progress: 60,
      participants: "12/20",
    },
    {
      id: "T101",
      title: "视网膜病变分级标注任务单",
      category: "joined",
      type: "annotation",
      status: "进行中",
      reward: "3,500",
      progress: 75,
      deadline: "2026-06-15",
    },
    {
      id: "T201",
      title: "冠脉钙化积分审核任务",
      category: "joined",
      type: "review",
      status: "待处理",
      reward: "2,400",
      progress: 0,
    }
  ];

  const statusStyles: Record<string, string> = {
    公开: "text-[#34c759] bg-[#34c759]/[0.08]",
    已上架: "text-[#34c759] bg-[#34c759]/[0.08]",
    私有: "text-[#ff9500] bg-[#ff9500]/[0.08]",
    已下架: "text-[#ff3b30] bg-[#ff3b30]/[0.08]",
    展示中: "text-[#0071e3] bg-[#0071e3]/[0.08]",
    进行中: "text-[#0071e3] bg-[#0071e3]/[0.08]",
    待处理: "text-[#ff9500] bg-[#ff9500]/[0.08]",
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
        <div className="flex flex-col gap-10 lg:flex-row items-start">
          
          {/* ── Left Sidebar (Column 1) ── */}
          <aside className="w-full lg:w-[320px] shrink-0 space-y-6 lg:sticky lg:top-4">
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
                <div className="flex justify-between items-center group cursor-pointer" key="available-points">
                  <span className="text-[11px] font-bold text-[#86868b] uppercase tracking-wider">可用积分</span>
                  <div className="flex items-center gap-1">
                    <span className="text-xl font-bold text-[#1d1d1f] tracking-tight">14,250</span>
                    <ChevronRight className="h-3 w-3 text-black/[0.1] group-hover:text-[#0071e3] transition-colors" />
                  </div>
                </div>
              </div>
            </section>

            {/* Quick Actions */}
            <section className="space-y-3">
              <button 
                onClick={() => navigate('/publish-data?mode=native')}
                className="group flex w-full items-center justify-between rounded-[24px] bg-[#0071e3] p-5 text-white shadow-[0_4px_16px_rgba(0,113,227,0.25)] transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center">
                    <Upload className="h-5 w-5" />
                  </div>
                  <span className="font-bold text-sm tracking-tight text-left">上传数据集<br/><span className="text-[10px] opacity-70 font-medium tracking-normal">Native Upload</span></span>
                </div>
                <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </button>

              <button 
                onClick={() => navigate('/publish-data?mode=external')}
                className="group flex w-full items-center justify-between rounded-[24px] border border-[#ff9500]/30 bg-[#ff9500]/[0.03] p-5 text-[#ff9500] shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-[#ff9500]/10 flex items-center justify-center">
                    <ExternalLink className="h-5 w-5" />
                  </div>
                  <span className="font-bold text-sm tracking-tight text-left">委托平台展示<br/><span className="text-[10px] opacity-70 font-medium tracking-normal">Commissioned Display</span></span>
                </div>
                <ChevronRight className="h-4 w-4 text-[#ff9500]/40 group-hover:text-[#ff9500] transition-all" />
              </button>
              
              {[
                { label: '发布任务单', icon: Target, path: '/publish-task', color: '#0071e3' },
                { label: '模型工作台', icon: Zap, path: '/model-service', color: '#5ac8fa' }
              ].map((btn) => (
                <button 
                  key={`quick-btn-${btn.label}`}
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

            {/* Level Progress */}
            <section className="rounded-[32px] border border-black/[0.06] bg-white/80 backdrop-blur-2xl p-7 shadow-sm">
              <div className="flex items-center justify-between mb-6 px-1">
                <h3 className="text-[12px] font-bold text-[#86868b] uppercase tracking-[0.2em]">等级进化</h3>
                <ShieldCheck className="h-5 w-5 text-[#0071e3]" />
              </div>
              <div className="relative h-2.5 w-full rounded-full bg-black/[0.04] overflow-hidden shadow-inner mb-4">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${expPercentage}%` }}
                  className="h-full bg-gradient-to-r from-[#0071e3] to-[#5ac8fa] rounded-full shadow-[0_0_12px_rgba(0,113,227,0.3)]"
                />
              </div>
              <p className="text-[12px] text-[#86868b] font-medium leading-[1.6] text-center">
                距离晋升还需 <span className="font-bold text-[#1d1d1f]">{nextLevelExp - currentExp}</span> 经验
              </p>
            </section>
          </aside>

          {/* ── Right Content Area (Column 2) ── */}
          <main className="flex-1 space-y-8 min-w-0">
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
              {[
                { id: "tasks", label: "我的任务" },
                { id: "datasets", label: "我的数据集" },
                { id: "activity", label: "我的收益" }
              ].map((tab) => (
                <button 
                  key={`tab-btn-${tab.id}`}
                  onClick={() => setActiveTab(tab.id as MainStreamTab)}
                  className={`relative pb-4 text-[16px] font-bold transition-all ${activeTab === tab.id ? "text-[#0071e3]" : "text-[#86868b] hover:text-[#1d1d1f]"}`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
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
              {activeTab === "tasks" && (
                <motion.section 
                  key="tasks"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="space-y-6"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div className="flex gap-1.5 p-1 bg-black/[0.04] rounded-full w-fit">
                      {[
                        { id: "all", label: "全部任务" },
                        { id: "published", label: "我发布的" },
                        { id: "joined", label: "我领取的" }
                      ].map(f => (
                        <button 
                          key={`task-f-${f.id}`}
                          onClick={() => setTaskFilter(f.id as TaskFilter)}
                          className={`px-5 py-2 text-[11px] font-bold rounded-full transition-all ${taskFilter === f.id ? "bg-white shadow-md text-[#1d1d1f]" : "text-[#86868b] hover:text-[#1d1d1f]"}`}
                        >
                          {f.label}
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-1.5 p-1 bg-black/[0.02] rounded-full w-fit border border-black/[0.04]">
                      {[
                        { id: "all", label: "全部类型" },
                        { id: "annotation", label: "标注任务" },
                        { id: "review", label: "审核任务" }
                      ].map(f => (
                        <button 
                          key={`task-type-f-${f.id}`}
                          onClick={() => setTaskTypeFilter(f.id as TaskTypeFilter)}
                          className={`px-4 py-1.5 text-[10px] font-bold rounded-full transition-all ${taskTypeFilter === f.id ? "bg-[#0071e3] text-white" : "text-[#86868b] hover:text-[#1d1d1f]"}`}
                        >
                          {f.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {myTasks
                      .filter(task => (taskFilter === "all" || task.category === taskFilter) && (taskTypeFilter === "all" || task.type === taskTypeFilter))
                      .map(task => (
                      <div key={`task-row-${task.id}`} className="group rounded-[32px] border border-black/[0.06] bg-white p-7 transition-all hover:border-[#0071e3]/30 hover:shadow-xl">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-3">
                              <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider ${task.type === 'annotation' ? 'bg-[#5ac8fa]/10 text-[#0071e3]' : 'bg-[#af52de]/10 text-[#af52de]'}`}>
                                {task.type === 'annotation' ? '标注任务' : '审核任务'}
                              </span>
                              <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider ${task.category === 'published' ? 'bg-black/[0.04] text-[#86868b]' : 'bg-[#34c759]/10 text-[#34c759]'}`}>
                                {task.category === 'published' ? '我发布的' : '我领取的'}
                              </span>
                            </div>
                            <h4 className="font-bold text-lg tracking-tight mb-4 group-hover:text-[#0071e3] transition-colors">{task.title}</h4>
                            <div className="flex items-center gap-6">
                              <div className="flex items-center gap-2">
                                <CreditCard className="h-4 w-4 text-[#0071e3]" />
                                <span className="text-[13px] font-bold text-[#0071e3]">{task.reward} 积分</span>
                              </div>
                              <div className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-tight ${statusStyles[task.status as keyof typeof statusStyles]}`}>
                                {task.status}
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
                  </div>
                </motion.section>
              )}

              {activeTab === "datasets" && (
                <motion.section 
                  key="datasets"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="space-y-6"
                >
                  <div className="flex gap-1.5 p-1 bg-black/[0.04] rounded-full w-fit mb-4">
                    {[
                      { id: "all", label: "全部" },
                      { id: "uploaded", label: "我上传的" },
                      { id: "purchased", label: "我购入的" },
                      { id: "commissioned", label: "委托展示" }
                    ].map(f => (
                      <button 
                        key={`ds-f-${f.id}`}
                        onClick={() => setDatasetFilter(f.id as DatasetFilter)}
                        className={`px-5 py-2 text-[11px] font-bold rounded-full transition-all ${datasetFilter === f.id ? "bg-white shadow-md text-[#1d1d1f]" : "text-[#86868b] hover:text-[#1d1d1f]"}`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {datasets
                      .filter(ds => datasetFilter === "all" || ds.category === datasetFilter)
                      .map(ds => (
                      <div key={`ds-row-${ds.id}`} className="group rounded-[32px] border border-black/[0.06] bg-white p-6 transition-all hover:border-[#0071e3]/30 hover:shadow-lg">
                        <div className="flex gap-5">
                          <div className={`h-16 w-16 shrink-0 rounded-[20px] flex items-center justify-center group-hover:scale-110 transition-transform ${
                            ds.category === 'commissioned' ? 'bg-[#ff9500]/[0.08]' : 'bg-[#0071e3]/[0.08]'
                          }`}>
                            {ds.category === 'commissioned' ? <ExternalLink className="h-8 w-8 text-[#ff9500]" /> : <Database className="h-8 w-8 text-[#0071e3]" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-bold text-lg tracking-tight truncate group-hover:text-[#0071e3] transition-colors">{ds.name}</h4>
                              <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${statusStyles[ds.status as keyof typeof statusStyles]}`}>
                                {ds.status}
                              </span>
                            </div>
                            <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-[12px] font-medium text-[#86868b]">
                              <span className="flex items-center gap-1.5"><Layers className="h-3.5 w-3.5" />{ds.samples}</span>
                              {ds.owner && <span className="flex items-center gap-1.5 truncate max-w-[120px]"><Users className="h-3.5 w-3.5" />{ds.owner}</span>}
                              <span>{ds.date}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-6 flex flex-wrap justify-end gap-2 pt-4 border-t border-black/[0.04]">
                          {ds.category === "uploaded" && (
                            <>
                              <button 
                                onClick={() => toggleVisibility(ds.id)}
                                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-[10px] font-bold transition-all ${
                                  ds.isPublic 
                                    ? "border-black/[0.08] text-[#1d1d1f] hover:bg-black/[0.02]" 
                                    : "border-[#0071e3]/20 bg-[#0071e3]/[0.04] text-[#0071e3] hover:bg-[#0071e3]/[0.08]"
                                }`}
                              >
                                {ds.isPublic ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                                {ds.isPublic ? "设为私有" : "设置公开"}
                              </button>
                              <button 
                                onClick={() => togglePublishStatus(ds.id)}
                                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-[10px] font-bold transition-all ${
                                  ds.isPublished 
                                    ? "border-[#ff3b30]/20 bg-[#ff3b30]/[0.04] text-[#ff3b30] hover:bg-[#ff3b30]/[0.08]" 
                                    : "border-[#34c759]/20 bg-[#34c759]/[0.04] text-[#34c759] hover:bg-[#34c759]/[0.08]"
                                }`}
                              >
                                {ds.isPublished ? <ArrowDownCircle className="h-3 w-3" /> : <PlayCircle className="h-3 w-3" />}
                                {ds.isPublished ? "下架" : "上架"}
                              </button>
                            </>
                          )}

                          {ds.category === "commissioned" && (
                            <button 
                              onClick={() => togglePublishStatus(ds.id)}
                              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-[10px] font-bold transition-all ${
                                ds.isPublished 
                                  ? "border-[#ff3b30]/20 bg-[#ff3b30]/[0.04] text-[#ff3b30] hover:bg-[#ff3b30]/[0.08]" 
                                  : "border-[#34c759]/20 bg-[#34c759]/[0.04] text-[#34c759] hover:bg-[#34c759]/[0.08]"
                              }`}
                            >
                              {ds.isPublished ? <ArrowDownCircle className="h-3 w-3" /> : <PlayCircle className="h-3 w-3" />}
                              {ds.isPublished ? "下架" : "上架展示"}
                            </button>
                          )}

                          <button 
                            onClick={() => setSelectedDataset(ds)}
                            className="px-4 py-2 rounded-xl border border-black/[0.08] text-[10px] font-bold text-[#1d1d1f] hover:bg-black/[0.04] transition-all"
                          >
                            查看明细
                          </button>

                          {ds.category !== "commissioned" && (
                            <button className="px-4 py-2 rounded-xl bg-[#0071e3] text-white text-[10px] font-bold shadow-[0_4px_12px_rgba(0,113,227,0.2)] hover:opacity-90 transition-all">
                              去标注
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.section>
              )}

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
                    </div>
                    <div className="h-[320px] w-full mt-2">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={revenueData} key="revenue-chart">
                          <defs key="chart-defs">
                            <linearGradient id="colorPointsWorkspace" x1="0" y1="0" x2="0" y2="1" key="gradient-points">
                              <stop offset="5%" stopColor="#0071e3" stopOpacity={0.12} key="stop-1"/>
                              <stop offset="95%" stopColor="#0071e3" stopOpacity={0} key="stop-2"/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid key="cartesian-grid" strokeDasharray="6 6" vertical={false} stroke="rgba(0,0,0,0.03)" />
                          <XAxis 
                            key="x-axis"
                            dataKey="month" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{fontSize: 11, fontWeight: 700, fill: '#86868b'}} 
                            dy={10}
                          />
                          <YAxis 
                            key="y-axis"
                            axisLine={false} 
                            tickLine={false} 
                            tick={{fontSize: 11, fontWeight: 700, fill: '#86868b'}} 
                          />
                          <Tooltip 
                            key="chart-tooltip"
                            contentStyle={{ 
                              borderRadius: '24px', 
                              border: '1px solid rgba(0,0,0,0.05)', 
                              boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                              padding: '12px 16px'
                            }}
                            itemStyle={{ fontSize: '12px', fontWeight: 700 }}
                          />
                          <Area 
                            key="area-points"
                            type="monotone" 
                            dataKey="labelPoints" 
                            name="积分" 
                            stroke="#0071e3" 
                            strokeWidth={3} 
                            fillOpacity={1} 
                            fill="url(#colorPointsWorkspace)" 
                            animationDuration={1500}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </motion.section>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>

      {/* Detail Modal Overlay */}
      <AnimatePresence>
        {selectedDataset && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDataset(null)}
              className="absolute inset-0 bg-black/40 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl overflow-hidden rounded-[40px] bg-white shadow-2xl"
            >
              <div className="p-10">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`h-12 w-12 rounded-2xl flex items-center justify-center ${selectedDataset.sourceType === 'external' ? 'bg-[#ff9500]/10' : 'bg-[#0071e3]/10'}`}>
                      {selectedDataset.sourceType === 'external' ? <ExternalLink className="h-6 w-6 text-[#ff9500]" /> : <Database className="h-6 w-6 text-[#0071e3]" />}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold tracking-tight">{selectedDataset.name}</h3>
                      <p className="text-[13px] font-bold text-[#86868b] uppercase tracking-wider mt-0.5">
                        {selectedDataset.sourceType === 'external' ? '委托展示数据集' : '机构内生数据集'}
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedDataset(null)}
                    className="h-10 w-10 rounded-full hover:bg-black/[0.04] flex items-center justify-center transition-colors"
                  >
                    <X className="h-6 w-6 text-[#86868b]" />
                  </button>
                </div>

                <div className="mt-10 space-y-8">
                  {/* Basic Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { label: "样本规模", value: selectedDataset.samples },
                      { label: "更新日期", value: selectedDataset.date },
                      { label: "当前状态", value: selectedDataset.status }
                    ].map(stat => (
                      <div key={stat.label} className="rounded-2xl bg-[#fbfbfd] p-4 border border-black/[0.02]">
                        <p className="text-[10px] font-bold text-[#86868b] uppercase tracking-widest">{stat.label}</p>
                        <p className="mt-1 text-sm font-bold text-[#1d1d1f]">{stat.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Trading Attributes */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Settings className="h-4 w-4 text-[#86868b]" />
                      <h4 className="text-[13px] font-bold text-[#86868b] uppercase tracking-[0.15em]">交易属性配置</h4>
                    </div>
                    
                    {selectedDataset.sourceType === 'external' ? (
                      <div className="rounded-3xl border border-[#ff9500]/20 bg-[#ff9500]/[0.03] p-6">
                        <div className="flex items-center gap-3 text-[#ff9500] mb-2">
                          <Globe className="h-5 w-5" />
                          <span className="font-bold text-[15px]">委托展示模式</span>
                        </div>
                        <p className="text-[13px] text-[#86868b] leading-relaxed">
                          该数据集已配置为第三方委托展示，点击“去购买”将跳转至外部链接：<br/>
                          <span className="text-[#ff9500] underline font-medium cursor-pointer">https://oasis-brain.org/buy/{selectedDataset.id}</span>
                        </p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 gap-3">
                        {[
                          { label: "支持购买下载", enabled: selectedDataset.attributes?.isDownloadable, icon: Upload },
                          { label: "支持发布任务", enabled: selectedDataset.attributes?.isTaskable, icon: Target },
                          { label: "支持模型训练", enabled: selectedDataset.attributes?.isTrainable, icon: Zap }
                        ].map(attr => (
                          <div key={attr.label} className="flex items-center justify-between rounded-2xl bg-[#fbfbfd] p-4 border border-black/[0.02]">
                            <div className="flex items-center gap-3">
                              <attr.icon className={`h-4 w-4 ${attr.enabled ? 'text-[#0071e3]' : 'text-[#86868b]/40'}`} />
                              <span className={`text-sm font-bold ${attr.enabled ? 'text-[#1d1d1f]' : 'text-[#86868b]/40'}`}>{attr.label}</span>
                            </div>
                            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold ${attr.enabled ? 'bg-[#34c759]/[0.08] text-[#34c759]' : 'bg-black/[0.04] text-[#86868b]'}`}>
                              {attr.enabled ? '已开启' : '未开启'}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-12 flex gap-4">
                  <button 
                    onClick={() => setSelectedDataset(null)}
                    className="flex-1 rounded-full border border-black/[0.08] py-4 text-sm font-bold hover:bg-black/[0.02] transition-colors"
                  >
                    取消
                  </button>
                  <button 
                    onClick={() => {
                      setSelectedDataset(null);
                      navigate(`/dataset/${selectedDataset.id}`);
                    }}
                    className={`flex-1 rounded-full py-4 text-sm font-bold text-white shadow-lg transition-all active:scale-[0.98] ${
                      selectedDataset.sourceType === 'external' ? 'bg-[#ff9500] shadow-[#ff9500]/20' : 'bg-[#0071e3] shadow-[#0071e3]/20'
                    }`}
                  >
                    管理商品详情
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
