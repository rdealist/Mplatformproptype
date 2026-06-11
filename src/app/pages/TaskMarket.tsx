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
} from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useT } from "../i18n/useT";
import { CountUpAnimation } from "../components/CountUpAnimation";
import { TaskFilter, TaskFilters } from "../components/TaskFilter";

const statsValues = [
  { value: 312, unit: "个", decimals: 0, suffix: "", separator: false },
  { value: 18.6, unit: "K", decimals: 1, suffix: "", separator: false },
  { value: 1284, unit: "位", decimals: 0, suffix: "", separator: true },
  { value: 4.2, unit: "M", decimals: 1, suffix: "", separator: false },
];

interface Task {
  id: string;
  title: string;
  description: string;
  category: '标注任务' | '审核任务';
  type: string;
  modality: string;
  level: string;
  reward: string;
  deadline: string;
  progress: { current: number; total: number };
  status: '招募中' | '进行中' | '已结束';
}

const allTasks: Task[] = [
  { id: 'T001', category: '标注任务', title: '肺结节良恶性标注任务',     description: '对胸部CT影像中的肺结节进行良恶性分类标注，需标注结节位置、大小、边缘特征等关键信息',         type: '分类标注',   modality: '计算机断层扫描',      level: 'Lv3', reward: '5,000',  deadline: '2026-07-15', progress: { current: 12, total: 20 }, status: '进行中', difficulty: '中等' },
  { id: 'T002', category: '标注任务', title: '脑部肿瘤边界分割任务',     description: '对脑部MRI影像进行肿瘤区域的精确分割，标注肿瘤边界、类型及周围组织关系，需要丰富的神经影像经验', type: '分割标注',   modality: '磁共振',     level: 'Lv4', reward: '8,000',  deadline: '2026-07-20', progress: { current: 5,  total: 10 }, status: '进行中', difficulty: '困难' },
  { id: 'T003', category: '审核任务', title: '视网膜病变分级审核',       description: '对已完成标注的眼底OCT影像进行审核校验，确认视网膜病变分级是否符合标准，不一致处需附说明',   type: '分类标注',   modality: '可见光影像',     level: 'Lv2', reward: '1,800',  deadline: '2026-07-10', progress: { current: 18, total: 25 }, status: '进行中', difficulty: '简单' },
  { id: 'T004', category: '标注任务', title: '骨折检测与定位任务',       description: '在X光影像中检测并定位骨折位置，标注骨折类型、严重程度及具体解剖部位，支持临床诊断辅助系统',   type: '检测标注',   modality: 'X射线',   level: 'Lv3', reward: '4,200',  deadline: '2026-07-18', progress: { current: 8,  total: 15 }, status: '进行中', difficulty: '中等' },
  { id: 'T005', category: '标注任务', title: '心脏超声关键帧标注',       description: '对心脏超声视频进行关键帧提取与标注，标记心室收缩期和舒张期的关键时刻，构建心功能评估数据集',   type: '视频标注',   modality: '超声',      level: 'Lv4', reward: '6,500',  deadline: '2026-07-25', progress: { current: 3,  total: 12 }, status: '招募中', difficulty: '困难' },
  { id: 'T006', category: '标注任务', title: '肝脏病灶检测任务',         description: '在腹部CT影像中检测并标注肝脏病灶，包括囊肿、血管瘤、肝癌等不同类型病变，要求病灶定位精确',     type: '检测标注',   modality: '计算机断层扫描',      level: 'Lv3', reward: '5,800',  deadline: '2026-07-22', progress: { current: 15, total: 20 }, status: '进行中', difficulty: '中等' },
  { id: 'T007', category: '审核任务', title: '皮肤病变分类审核',         description: '审核皮肤镜影像分类标注结果，核实色素痣、脂溢性角化病等分类是否准确，标注不规范处重新判定',     type: '分类标注',   modality: '可见光影像',  level: 'Lv1', reward: '1,200',  deadline: '2026-07-30', progress: { current: 0,  total: 30 }, status: '招募中', difficulty: '简单' },
  { id: 'T008', category: '标注任务', title: '息肉检测与分割任务',       description: '对内窥镜肠镜影像中的息肉进行检测与精确分割，标注息肉类型、大小及表面特征，支持肠癌早筛系统',   type: '分割标注',   modality: '可见光影像',  level: 'Lv3', reward: '5,200',  deadline: '2026-07-19', progress: { current: 10, total: 18 }, status: '进行中', difficulty: '中等' },
  { id: 'T009', category: '审核任务', title: '乳腺钼靶病变审核',         description: '对乳腺钼靶影像标注结果进行专家级审核，复核钙化灶、肿块检测框的准确性，输出最终审核意见',       type: '检测标注',   modality: 'X射线',   level: 'Lv5', reward: '4,500',  deadline: '2026-08-05', progress: { current: 2,  total: 8  }, status: '招募中', difficulty: '困难' },
  { id: 'T010', category: '标注任务', title: '颅内出血CT分割任务',       description: '对颅脑CT影像中的颅内出血区域进行精确分割，区分硬膜下、蛛网膜下腔等不同类型出血，急诊应用场景', type: '分割标注',   modality: '计算机断层扫描',      level: 'Lv5', reward: '10,000', deadline: '2026-07-28', progress: { current: 4,  total: 8  }, status: '进行中', difficulty: '困难' },
  { id: 'T011', category: '标注任务', title: '脊柱侧弯角度测量标注',     description: '在脊柱正位X光影像上标注椎体关键点，计算Cobb角以评估脊柱侧弯严重程度，辅助矫形治疗方案制定',   type: '关键点标注', modality: 'X射线',   level: 'Lv3', reward: '4,800',  deadline: '2026-08-01', progress: { current: 1,  total: 15 }, status: '招募中', difficulty: '中等' },
  { id: 'T012', category: '审核任务', title: '胸部X光肺炎分类审核',     description: '对批量肺炎分类标注结果进行复核，确认病毒性肺炎与细菌性肺炎的区分是否符合影像诊断标准',         type: '分类标注',   modality: 'X射线',   level: 'Lv2', reward: '1,500',  deadline: '2026-07-12', progress: { current: 20, total: 30 }, status: '进行中', difficulty: '简单' },
  { id: 'T013', category: '标注任务', title: '前列腺MRI分割任务',       description: '对前列腺多参数MRI影像进行腺体区域分割，标注移行带、外周带及异常信号区域，辅助前列腺癌诊断',     type: '分割标注',   modality: '磁共振',     level: 'Lv5', reward: '8,500',  deadline: '2026-08-10', progress: { current: 0,  total: 10 }, status: '招募中', difficulty: '困难' },
  { id: 'T014', category: '标注任务', title: '心电图节律分类标注',       description: '对12导联心电图信号进行心律失常分类标注，识别房颤、室速等多种节律异常，构建心律识别训练集',     type: '分类标注',   modality: '其他',     level: 'Lv3', reward: '4,500',  deadline: '2026-07-17', progress: { current: 14, total: 20 }, status: '进行中', difficulty: '中等' },
  { id: 'T015', category: '标注任务', title: '腹腔镜手术操作标注',       description: '对腹腔镜手术视频中的操作步骤进行时序标注，识别切割、缝合、止血等关键动作，支持手术AI训练',     type: '视频标注',   modality: '时序动态视频',  level: 'Lv6', reward: '12,000', deadline: '2026-08-15', progress: { current: 0,  total: 5  }, status: '招募中', difficulty: '困难' },
  { id: 'T016', category: '标注任务', title: '视盘检测与分割任务',       description: '在眼底影像中检测并精确分割视盘区域，标注视盘边界、杯盘比，辅助青光眼筛查与随访管理',           type: '分割标注',   modality: '可见光影像', level: 'Lv3', reward: '5,000', deadline: '2026-07-23', progress: { current: 9,  total: 15 }, status: '进行中', difficulty: '中等' },
  { id: 'T017', category: '审核任务', title: '肾脏超声结石检测审核',     description: '对肾脏超声结石检测标注批次进行审核，核验结石坐标及大小标注是否准确，审核通过后进入数据入库流程', type: '检测标注',   modality: '超声',      level: 'Lv2', reward: '1,400',  deadline: '2026-07-14', progress: { current: 22, total: 30 }, status: '进行中', difficulty: '简单' },
  { id: 'T018', category: '标注任务', title: '脑白质病变MRI分割',       description: '对脑部FLAIR MRI序列中的白质高信号区域进行精确分割，标注病变负荷，辅助多发性硬化症随访评估',   type: '分割标注',   modality: '磁共振',     level: 'Lv4', reward: '7,200',  deadline: '2026-07-26', progress: { current: 6,  total: 12 }, status: '进行中', difficulty: '困难' },
  { id: 'T019', category: '标注任务', title: '甲状腺结节超声分类',       description: '对甲状腺超声影像中的结节按TI-RADS标准进行分类标注，评估结节良恶性风险，支持穿刺决策辅助',     type: '分类标注',   modality: '超声',      level: 'Lv3', reward: '4,600',  deadline: '2026-08-03', progress: { current: 2,  total: 18 }, status: '招募中', difficulty: '中等' },
  { id: 'T020', category: '标注任务', title: '骨龄X光关键点标注',       description: '在手部正位X光影像上标注骨骺板关键点，用于基于人工智能的骨龄自动评估系统，服务儿科内分泌科',     type: '关键点标注', modality: 'X射线',   level: 'Lv3', reward: '4,200',  deadline: '2026-07-20', progress: { current: 11, total: 20 }, status: '进行中', difficulty: '中等' },
  { id: 'T021', category: '标注任务', title: '病理切片细胞分割任务',     description: '对H&E染色病理切片进行单细胞实例分割，区分肿瘤细胞、免疫细胞、间质细胞，支持数字病理分析',     type: '分割标注',   modality: '全幅数字病理',    level: 'Lv6', reward: '13,000', deadline: '2026-08-20', progress: { current: 0,  total: 6  }, status: '招募中', difficulty: '困难' },
  { id: 'T022', category: '标注任务', title: '肺部CT三维分割任务',       description: '对肺部薄层CT影像进行肺实质、血管、气道的三维精确分割，为肺功能评估和手术规划提供解剖图谱',   type: '分割标注',   modality: '计算机断层扫描',      level: 'Lv5', reward: '9,800',  deadline: '2026-08-12', progress: { current: 1,  total: 8  }, status: '招募中', difficulty: '困难' },
  { id: 'T027', category: '标注任务', title: '踝关节MRI损伤分级',       description: '对踝关节MRI影像进行韧带损伤分级标注，区分Ⅰ级拉伤至Ⅲ级断裂，辅助运动医学损伤评估',           type: '分类标注',   modality: '磁共振',     level: 'Lv3', reward: '4,400',  deadline: '2026-08-05', progress: { current: 3,  total: 20 }, status: '招募中', difficulty: '中等' },
  { id: 'T028', category: '标注任务', title: '乳腺超声肿块分割',         description: '对乳腺超声影像中的肿块进行精确分割标注，记录肿块形态、边缘特征及内部回声，辅助BI-RADS分级',   type: '分割标注',   modality: '超声',      level: 'Lv3', reward: '5,600',  deadline: '2026-07-25', progress: { current: 8,  total: 15 }, status: '进行中', difficulty: '中等' },
  { id: 'T029', category: '审核任务', title: '放射科报告结构化审核',     description: '对放射科文字报告NLP标注结果进行审核，核实病变部位、性质等关键实体的抽取是否准确，修正错误标注', type: '文本标注',   modality: '其他',   level: 'Lv1', reward: '1,100',  deadline: '2026-07-16', progress: { current: 25, total: 40 }, status: '进行中', difficulty: '简单' },
  { id: 'T030', category: '标注任务', title: '视网膜血管分割任务',       description: '对眼底彩照进行视网膜血管的精细分割标注，区分动静脉，提取血管树结构，用于糖尿病视网膜病变评估', type: '分割标注',   modality: '可见光影像', level: 'Lv3', reward: '5,100', deadline: '2026-08-01', progress: { current: 2,  total: 15 }, status: '招募中', difficulty: '中等' },
];

const PAGE_SIZE = 10;

export default function TaskMarket() {
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

  const filteredTasks = allTasks
    .filter(task => task.category === '标注任务') // 只显示标注任务
    .filter(task => {
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

  const t = useT();
  const stats = statsValues.map((s, i) => ({ ...s, label: t.taskMarket.stats[i].label }));

  return (
    <main className="min-h-screen bg-[#fbfbfd] text-[#1d1d1f] antialiased">
      {/* 顶部标题区 */}
      <section className="px-[80px] pt-[64px] pb-[20px]">
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-8">
            <h1 className="text-5xl font-semibold leading-[1.16] tracking-[-0.015em] text-[#1d1d1f]">{t.taskMarket.title}</h1>
            <p className="mt-4 text-[21px] font-medium leading-[1.52] text-[#86868b]">
              {t.taskMarket.sub}
            </p>
          </div>

          {/* 统计卡片 */}
          <div className="grid grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
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
                        end={stat.value}
                        decimals={stat.decimals}
                        suffix={stat.suffix}
                        separator={stat.separator}
                        duration={1500}
                      />
                    </span>
                    <span className="text-lg font-medium text-[#86868b]">{stat.unit}</span>
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
                  {t.taskMarket.count(filteredTasks.length)}
                </p>

                <div className="flex-1" />

                {/* 搜索框 */}
                <div className="relative w-64">
                  <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#86868b]" strokeWidth={2} />
                  <input
                    type="text"
                    placeholder={t.taskMarket.search}
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
                  {t.taskMarket.filter}
                  {activeFilterCount > 0 && (
                    <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-[#0071e3] px-1 text-[10px] font-semibold text-white leading-none">
                      {activeFilterCount}
                    </span>
                  )}
                </button>

                {/* 排序 */}
                <button className="flex items-center gap-1.5 rounded-full border border-black/[0.08] bg-white px-4 py-2 text-sm font-medium text-[#1d1d1f] transition-all duration-200 hover:border-[#0071e3]/20 hover:bg-[#0071e3]/[0.04]">
                  {t.taskMarket.sort}
                  <ChevronDown className="h-4 w-4 text-[#86868b]" strokeWidth={2} />
                </button>
              </div>

              {/* 任务卡片列表 */}
              {pageTasks.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-3xl border border-black/[0.08] bg-white py-24 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                  <Target className="h-12 w-12 text-[#d1d1d6]" strokeWidth={1.5} />
                  <p className="mt-4 text-[21px] font-semibold text-[#1d1d1f]">暂无符合条件的任务</p>
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
                            {/* 任务类别标签 */}
                            <span
                              className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                                task.category === '审核任务'
                                  ? 'bg-[#af52de]/[0.08] text-[#af52de]'
                                  : 'bg-[#0071e3]/[0.08] text-[#0071e3]'
                              }`}
                            >
                              {task.category}
                            </span>
                            <h3 className="text-[21px] font-semibold leading-[1.52] text-[#1d1d1f] transition-colors duration-300 group-hover:text-[#0071e3]">
                              {task.title}
                            </h3>
                            {/* 状态标签 */}
                            <span
                              className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                                task.status === '进行中'
                                  ? 'bg-[#0071e3]/[0.08] text-[#0071e3]'
                                  : task.status === '招募中'
                                  ? 'bg-[#34c759]/[0.08] text-[#34c759]'
                                  : 'bg-black/[0.04] text-[#86868b]'
                              }`}
                            >
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
                              {task.progress.current}/{task.progress.total} 已领取
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
                              {t.taskMarket.endedBtn}
                            </button>
                          ) : task.status === '招募中' ? (
                            <button className="rounded-full bg-[#34c759] px-6 py-3 text-sm font-medium text-white transition-opacity duration-200 hover:opacity-90">
                              {t.taskMarket.applyBtn}
                            </button>
                          ) : (
                            <button className="rounded-full bg-[#0071e3] px-6 py-3 text-sm font-medium text-white transition-opacity duration-200 hover:opacity-90">
                              {t.taskMarket.claimBtn}
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