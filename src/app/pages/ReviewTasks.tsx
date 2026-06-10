import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Coins,
  Search,
  SlidersHorizontal,
  Target,
  Users,
  ShieldCheck,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { CountUpAnimation } from "../components/CountUpAnimation";
import { TaskFilter, TaskFilters } from "../components/TaskFilter";

const statsValues = [
  { value: 89, unit: "个", decimals: 0, suffix: "", separator: false },
  { value: 312, unit: "K积分", decimals: 0, suffix: "", separator: false },
  { value: 456, unit: "位", decimals: 0, suffix: "", separator: true },
  { value: 2.8, unit: "K", decimals: 1, suffix: "", separator: false },
];

interface ReviewTask {
  id: string;
  title: string;
  description: string;
  type: string;
  modality: string;
  level: string;
  reward: string;
  deadline: string;
  progress: { current: number; total: number };
  status: '招募中' | '进行中' | '已结束';
}

// 仅审核任务
const allReviewTasks: ReviewTask[] = [
  { id: 'R001', title: '视网膜病变分级审核',       description: '对已完成标注的眼底OCT影像进行审核校验，确认视网膜病变分级是否符合标准，不一致处需附说明',   type: '分类标注',   modality: 'OCT',     level: 'Lv2', reward: '1,800',  deadline: '2026-07-10', progress: { current: 18, total: 25 }, status: '进行中' },
  { id: 'R002', title: '皮肤病变分类审核',         description: '审核皮肤镜影像分类标注结果，核实色素痣、脂溢性角化病等分类是否准确，标注不规范处重新判定',     type: '分类标注',   modality: '皮肤镜',  level: 'Lv1', reward: '1,200',  deadline: '2026-07-30', progress: { current: 0,  total: 30 }, status: '招募中' },
  { id: 'R003', title: '乳腺钼靶病变审核',         description: '对乳腺钼靶影像标注结果进行专家级审核，复核钙化灶、肿块检测框的准确性，输出最终审核意见',       type: '检测标注',   modality: 'X-Ray',   level: 'Lv5', reward: '4,500',  deadline: '2026-08-05', progress: { current: 2,  total: 8  }, status: '招募中' },
  { id: 'R004', title: '胸部X光肺炎分类审核',     description: '对批量肺炎分类标注结果进行复核，确认病毒性肺炎与细菌性肺炎的区分是否符合影像诊断标准',         type: '分类标注',   modality: 'X-Ray',   level: 'Lv2', reward: '1,500',  deadline: '2026-07-12', progress: { current: 20, total: 30 }, status: '进行中' },
  { id: 'R005', title: '肾脏超声结石检测审核',     description: '对肾脏超声结石检测标注批次进行审核，核验结石坐标及大小标注是否准确，审核通过后进入数据入库流程', type: '检测标注',   modality: 'US',      level: 'Lv2', reward: '1,400',  deadline: '2026-07-14', progress: { current: 22, total: 30 }, status: '进行中' },
  { id: 'R006', title: '皮肤黑色素瘤分类审核',     description: '对皮肤镜黑色素瘤良恶性标注批次进行专家复审，依据ABCDE标准判定各样本分类是否准确合规',         type: '分类标注',   modality: '皮肤镜',  level: 'Lv2', reward: '1,800',  deadline: '2026-07-01', progress: { current: 30, total: 30 }, status: '已结束' },
  { id: 'R007', title: '颈动脉超声斑块检测审核',   description: '复核颈动脉超声斑块检测框标注结果，评估斑块边界勾画精度，对存疑标注进行退回修改或直接修正',     type: '检测标注',   modality: 'US',      level: 'Lv3', reward: '2,400',  deadline: '2026-07-05', progress: { current: 15, total: 15 }, status: '已结束' },
  { id: 'R008', title: '放射科报告结构化审核',     description: '对放射科文字报告NLP标注结果进行审核，核实病变部位、性质等关键实体的抽取是否准确，修正错误标注', type: '文本标注',   modality: 'X-Ray',   level: 'Lv1', reward: '1,100',  deadline: '2026-07-16', progress: { current: 25, total: 40 }, status: '进行中' },
];

const PAGE_SIZE = 10;

export default function ReviewTasks() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<TaskFilters>({
    types: [],
    modalities: [],
    levels: [],
    statuses: [],
  });

  const filteredTasks = allReviewTasks.filter(task => {
    if (searchText && !task.title.includes(searchText) && !task.description.includes(searchText)) return false;
    if (filters.types.length > 0 && !filters.types.includes(task.type)) return false;
    if (filters.modalities.length > 0 && !filters.modalities.includes(task.modality)) return false;
    if (filters.levels.length > 0 && !filters.levels.includes(task.level)) return false;
    if (filters.statuses.length > 0 && !filters.statuses.includes(task.status)) return false;
    return true;
  });

  const totalPages = Math.ceil(filteredTasks.length / PAGE_SIZE);
  const pageTasks = filteredTasks.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const activeFilterCount =
    filters.types.length + filters.modalities.length + filters.levels.length + filters.statuses.length;

  useEffect(() => { setCurrentPage(1); }, [filters, searchText]);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPageNumbers = () => {
    const pages: (number | '...')[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  const statusColors = {
    '招募中': 'bg-[#34c759]/[0.08] text-[#34c759]',
    '进行中': 'bg-[#0071e3]/[0.08] text-[#0071e3]',
    '已结束': 'bg-black/[0.04] text-[#86868b]',
  };

  return (
    <main className="min-h-screen bg-[#fbfbfd] text-[#1d1d1f] antialiased">
      {/* 顶部标题区 */}
      <section className="px-[80px] pt-[64px] pb-[20px]">
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-8">
            <h1 className="text-5xl font-semibold leading-[1.16] tracking-[-0.015em] text-[#1d1d1f]">参与专家复审</h1>
            <p className="mt-4 text-[21px] font-medium leading-[1.52] text-[#86868b]">
              专家对已完成标注结果进行专业审核，确保数据质量符合临床标准，获得更高收益
            </p>
          </div>

          {/* 统计卡片 */}
          <div className="grid grid-cols-4 gap-6">
            {[
              { label: "待审核任务单", icon: Target },
              { label: "审核总积分", icon: Coins },
              { label: "认证审核专家", icon: Users },
              { label: "累计审核样本", icon: ShieldCheck },
            ].map((stat, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-3xl border border-black/[0.08] bg-white p-8 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#0071e3]/30 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#0071e3]/[0.02] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-[#0071e3]/[0.06] blur-3xl transition-all duration-500 group-hover:bg-[#0071e3]/[0.12]" />

                <div className="relative">
                  <div className="mb-2 inline-flex rounded-lg bg-[#0071e3]/[0.08] px-3 py-1">
                    <span className="text-xs font-medium text-[#0071e3]">{stat.label}</span>
                  </div>

                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-5xl font-semibold leading-[1.1] tracking-tight text-[#1d1d1f] transition-colors duration-300 group-hover:text-[#0071e3]">
                      <CountUpAnimation
                        end={statsValues[i].value}
                        decimals={statsValues[i].decimals}
                        suffix={statsValues[i].suffix}
                        separator={statsValues[i].separator}
                        duration={1500}
                      />
                    </span>
                    <span className="text-lg font-medium text-[#86868b]">{statsValues[i].unit}</span>
                  </div>

                  <div className="mt-4 h-1 w-12 rounded-full bg-[#0071e3]/[0.2] transition-all duration-300 group-hover:w-24 group-hover:bg-[#0071e3]/[0.4]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 任务列表区 */}
      <section className="px-[80px] pt-[20px] pb-[48px]">
        <div className="mx-auto max-w-[1280px]">
          <div className="flex gap-5">
            {/* 筛选侧边栏 */}
            <TaskFilter 
              filters={filters} 
              onChange={setFilters} 
              isOpen={filterOpen} 
              hiddenSections={['categories', 'difficulties']}
            />

            <div className="flex-1 min-w-0">
              {/* 工具栏 */}
              <div className="mb-6 flex items-center gap-3">
                <p className="shrink-0 text-sm text-[#86868b]">
                  共 {filteredTasks.length} 个审核任务单
                </p>

                <div className="flex-1" />

                {/* 搜索框 */}
                <div className="relative w-64">
                  <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#86868b]" strokeWidth={2} />
                  <input
                    type="text"
                    placeholder="搜索审核任务单"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="w-full rounded-full border border-black/[0.08] bg-white py-2 pl-10 pr-4 text-sm text-[#1d1d1f] placeholder:text-[#86868b] transition-all duration-200 focus:border-[#0071e3]/30 focus:outline-none focus:ring-2 focus:ring-[#0071e3]/10"
                  />
                </div>

                {/* 筛选按钮 */}
                <button
                  onClick={() => setFilterOpen(v => !v)}
                  className={`flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    filterOpen
                      ? 'border-[#0071e3]/30 bg-[#0071e3]/[0.06] text-[#0071e3]'
                      : 'border-black/[0.08] bg-white text-[#1d1d1f] hover:border-[#0071e3]/20 hover:bg-[#0071e3]/[0.04]'
                  }`}
                >
                  <SlidersHorizontal className="h-4 w-4" strokeWidth={2} />
                  筛选
                  {activeFilterCount > 0 && (
                    <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-[#0071e3] px-1 text-[10px] font-semibold text-white leading-none">
                      {activeFilterCount}
                    </span>
                  )}
                </button>

                {/* 排序 */}
                <button className="flex items-center gap-1.5 rounded-full border border-black/[0.08] bg-white px-4 py-2 text-sm font-medium text-[#1d1d1f] transition-all duration-200 hover:border-[#0071e3]/20 hover:bg-[#0071e3]/[0.04]">
                  排序
                  <ChevronDown className="h-4 w-4 text-[#86868b]" strokeWidth={2} />
                </button>
              </div>

              {/* 任务卡片列表 */}
              {pageTasks.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-3xl border border-black/[0.08] bg-white py-24 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                  <Target className="h-12 w-12 text-[#d1d1d6]" strokeWidth={1.5} />
                  <p className="mt-4 text-[21px] font-semibold text-[#1d1d1f]">暂无符合条件的审核任务单</p>
                  <p className="mt-2 text-sm text-[#86868b]">试试调整筛选条件或搜索关键词</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pageTasks.map((task) => (
                    <div
                      key={task.id}
                      onClick={() => navigate(`/task/${task.id}`)}
                      className="group relative overflow-hidden rounded-3xl border border-black/[0.08] bg-white p-8 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#0071e3]/30 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] cursor-pointer"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-[#0071e3]/[0.01] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <div className="relative flex items-start justify-between gap-6">
                        {/* 左侧内容 */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 flex-wrap">
                            <h3 className="text-[21px] font-semibold leading-[1.52] text-[#1d1d1f] transition-colors duration-300 group-hover:text-[#0071e3]">
                              {task.title}
                            </h3>
                            {/* 状态标签 */}
                            <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${statusColors[task.status]}`}>
                              {task.status}
                            </span>
                          </div>

                          <p className="mt-3 text-sm leading-[1.57] text-[#86868b] line-clamp-2">
                            {task.description}
                          </p>

                          <div className="mt-5 flex flex-wrap items-center gap-2">
                            <span className="inline-flex items-center gap-1 rounded-full bg-black/[0.04] px-3 py-1 text-xs font-medium text-[#1d1d1f]">
                              <Target className="h-3.5 w-3.5" strokeWidth={2} />
                              {task.type}
                            </span>
                            <span className="inline-flex items-center rounded-full bg-black/[0.04] px-3 py-1 text-xs font-medium text-[#1d1d1f]">
                              {task.modality}
                            </span>
                            <span className="rounded-full bg-[#0071e3]/[0.08] px-3 py-1 text-xs font-medium text-[#0071e3]">
                              {task.level}+
                            </span>
                          </div>

                          <div className="mt-5 flex items-center gap-6 text-sm text-[#86868b]">
                            <span className="flex items-center gap-1.5">
                              <Clock className="h-4 w-4" strokeWidth={2} />
                              截止 {task.deadline}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Users className="h-4 w-4" strokeWidth={2} />
                              {task.progress.current}/{task.progress.total} 已审核
                            </span>
                          </div>

                          {/* 进度条 */}
                          <div className="mt-4">
                            <div className="h-1.5 w-full overflow-hidden rounded-full bg-black/[0.04]">
                              <div
                                className="h-full rounded-full bg-[#0071e3] transition-all duration-500"
                                style={{ width: `${Math.round((task.progress.current / task.progress.total) * 100)}%` }}
                              />
                            </div>
                          </div>
                        </div>

                        {/* 右侧积分和按钮 */}
                        <div className="flex shrink-0 flex-col items-end gap-4">
                          <div className="text-right">
                            <div className="flex items-baseline gap-1">
                              <Coins className="h-5 w-5 text-[#0071e3]" strokeWidth={2} />
                              <span className="text-[21px] font-semibold text-[#0071e3]">{task.reward}</span>
                            </div>
                            <span className="text-sm text-[#86868b]">积分/任务</span>
                          </div>

                          {task.status === '已结束' ? (
                            <button
                              disabled
                              className="rounded-full border border-black/[0.08] bg-transparent px-6 py-3 text-sm font-medium text-[#86868b] cursor-not-allowed opacity-50"
                            >
                              已结束
                            </button>
                          ) : task.status === '招募中' ? (
                            <button className="rounded-full bg-[#34c759] px-6 py-3 text-sm font-medium text-white transition-opacity duration-200 hover:opacity-90">
                              申请审核
                            </button>
                          ) : (
                            <button className="rounded-full bg-[#0071e3] px-6 py-3 text-sm font-medium text-white transition-opacity duration-200 hover:opacity-90">
                              继续审核
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* 分页 */}
              {totalPages > 1 && (
                <div className="mt-10 flex items-center justify-center gap-2">
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-black/[0.08] bg-white text-[#1d1d1f] transition-all duration-200 hover:border-[#0071e3]/30 hover:bg-[#0071e3]/[0.04] disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <ChevronLeft className="h-4 w-4" strokeWidth={2} />
                  </button>

                  {getPageNumbers().map((page, idx) =>
                    page === '...' ? (
                      <span key={`e-${idx}`} className="flex h-9 w-9 items-center justify-center text-sm text-[#86868b]">···</span>
                    ) : (
                      <button
                        key={page}
                        onClick={() => goToPage(page as number)}
                        className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition-all duration-200 ${
                          currentPage === page
                            ? 'bg-[#0071e3] text-white shadow-[0_2px_8px_rgba(0,113,227,0.3)]'
                            : 'border border-black/[0.08] bg-white text-[#1d1d1f] hover:border-[#0071e3]/30 hover:bg-[#0071e3]/[0.04]'
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}

                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-black/[0.08] bg-white text-[#1d1d1f] transition-all duration-200 hover:border-[#0071e3]/30 hover:bg-[#0071e3]/[0.04] disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <ChevronRight className="h-4 w-4" strokeWidth={2} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
