import { useParams, useNavigate } from "react-router";
import {
  ArrowLeft, CheckCircle2, Clock, Coins, FileText,
  Target, Users, AlertCircle, ChevronRight, Zap,
  BookOpen, Layers, PlayCircle,
} from "lucide-react";
import { useState, useEffect } from "react";

// ─── Inline task data (mirrors TaskMarket) ───────────────────────────────────
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
  difficulty: '简单' | '中等' | '困难';
}

const allTasks: Task[] = [
  { id: 'T001', category: '标注任务', title: '肺结节良恶性标注任务',     description: '对胸部CT影像中的肺结节进行良恶性分类标注，需标注结节位置、大小、边缘特征等关键信息',         type: '分类标注',   modality: 'CT',      level: 'Lv3', reward: '5,000',  deadline: '2026-07-15', progress: { current: 12, total: 20 }, status: '进行中', difficulty: '中等' },
  { id: 'T002', category: '标注任务', title: '脑部肿瘤边界分割任务',     description: '对脑部MRI影像进行肿瘤区域的精确分割，标注肿瘤边界、类型及周围组织关系，需要丰富的神经影像经验', type: '分割标注',   modality: 'MRI',     level: 'Lv4', reward: '8,000',  deadline: '2026-07-20', progress: { current: 5,  total: 10 }, status: '进行中', difficulty: '困难' },
  { id: 'T003', category: '审核任务', title: '视网膜病变分级审核',       description: '对已完成标注的眼底OCT影像进行审核校验，确认视网膜病变分级是否符合标准，不一致处需附说明',   type: '分类标注',   modality: 'OCT',     level: 'Lv2', reward: '1,800',  deadline: '2026-07-10', progress: { current: 18, total: 25 }, status: '进行中', difficulty: '简单' },
  { id: 'T004', category: '标注任务', title: '骨折检测与定位任务',       description: '在X光影像中检测并定位骨折位置，标注骨折类型、严重程度及具体解剖部位，支持临床诊断辅助系统',   type: '检测标注',   modality: 'X-Ray',   level: 'Lv3', reward: '4,200',  deadline: '2026-07-18', progress: { current: 8,  total: 15 }, status: '进行中', difficulty: '中等' },
  { id: 'T005', category: '标注任务', title: '心脏超声关键帧标注',       description: '对心脏超声视频进行关键帧提取与标注，标记心室收缩期和舒张期的关键时刻，构建心功能评估数据集',   type: '视频标注',   modality: 'US',      level: 'Lv4', reward: '6,500',  deadline: '2026-07-25', progress: { current: 3,  total: 12 }, status: '招募中', difficulty: '困难' },
  { id: 'T006', category: '标注任务', title: '肝脏病灶检测任务',         description: '在腹部CT影像中检测并标注肝脏病灶，包括囊肿、血管瘤、肝癌等不同类型病变，要求病灶定位精确',     type: '检测标注',   modality: 'CT',      level: 'Lv3', reward: '5,800',  deadline: '2026-07-22', progress: { current: 15, total: 20 }, status: '进行中', difficulty: '中等' },
  { id: 'T007', category: '审核任务', title: '皮肤病变分类审核',         description: '审核皮肤镜影像分类标注结果，核实色素痣、脂溢性角化病等分类是否准确，标注不规范处重新判定',     type: '分类标注',   modality: '皮肤镜',  level: 'Lv1', reward: '1,200',  deadline: '2026-07-30', progress: { current: 0,  total: 30 }, status: '招募中', difficulty: '简单' },
  { id: 'T008', category: '标注任务', title: '息肉检测与分割任务',       description: '对内窥镜肠镜影像中的息肉进行检测与精确分割，标注息肉类型、大小及表面特征，支持肠癌早筛系统',   type: '分割标注',   modality: '内窥镜',  level: 'Lv3', reward: '5,200',  deadline: '2026-07-19', progress: { current: 10, total: 18 }, status: '进行中', difficulty: '中等' },
  { id: 'T009', category: '审核任务', title: '乳腺钼靶病变审核',         description: '对乳腺钼靶影像标注结果进行专家级审核，复核钙化灶、肿块检测框的准确性，输出最终审核意见',       type: '检测标注',   modality: 'X-Ray',   level: 'Lv5', reward: '4,500',  deadline: '2026-08-05', progress: { current: 2,  total: 8  }, status: '招募中', difficulty: '困难' },
  { id: 'T010', category: '标注任务', title: '颅内出血CT分割任务',       description: '对颅脑CT影像中的颅内出血区域进行精确分割，区分硬膜下、蛛网膜下腔等不同类型出血，急诊应用场景', type: '分割标注',   modality: 'CT',      level: 'Lv5', reward: '10,000', deadline: '2026-07-28', progress: { current: 4,  total: 8  }, status: '进行中', difficulty: '困难' },
  { id: 'T011', category: '标注任务', title: '脊柱侧弯角度测量标注',     description: '在脊柱正位X光影像上标注椎体关键点，计算Cobb角以评估脊柱侧弯严重程度，辅助矫形治疗方案制定',   type: '关键点标注', modality: 'X-Ray',   level: 'Lv3', reward: '4,800',  deadline: '2026-08-01', progress: { current: 1,  total: 15 }, status: '招募中', difficulty: '中等' },
  { id: 'T012', category: '审核任务', title: '胸部X光肺炎分类审核',     description: '对批量肺炎分类标注结果进行复核，确认病毒性肺炎与细菌性肺炎的区分是否符合影像诊断标准',         type: '分类标注',   modality: 'X-Ray',   level: 'Lv2', reward: '1,500',  deadline: '2026-07-12', progress: { current: 20, total: 30 }, status: '进行中', difficulty: '简单' },
  { id: 'T013', category: '标注任务', title: '前列腺MRI分割任务',       description: '对前列腺多参数MRI影像进行腺体区域分割，标注移行带、外周带及异常信号区域，辅助前列腺癌诊断',     type: '分割标注',   modality: 'MRI',     level: 'Lv5', reward: '8,500',  deadline: '2026-08-10', progress: { current: 0,  total: 10 }, status: '招募中', difficulty: '困难' },
  { id: 'T014', category: '标注任务', title: '心电图节律分类标注',       description: '对12导联心电图信号进行心律失常分类标注，识别房颤、室速等多种节律异常，构建心律识别训练集',     type: '分类标注',   modality: 'ECG',     level: 'Lv3', reward: '4,500',  deadline: '2026-07-17', progress: { current: 14, total: 20 }, status: '进行中', difficulty: '中等' },
  { id: 'T015', category: '标注任务', title: '腹腔镜手术操作标注',       description: '对腹腔镜手术视频中的操作步骤进行时序标注，识别切割、缝合、止血等关键动作，支持手术AI训练',     type: '视频标注',   modality: '内窥镜',  level: 'Lv6', reward: '12,000', deadline: '2026-08-15', progress: { current: 0,  total: 5  }, status: '招募中', difficulty: '困难' },
  { id: 'T016', category: '标注任务', title: '视盘检测与分割任务',       description: '在眼底影像中检测并精确分割视盘区域，标注视盘边界、杯盘比，辅助青光眼筛查与随访管理',           type: '分割标注',   modality: '眼科影像', level: 'Lv3', reward: '5,000', deadline: '2026-07-23', progress: { current: 9,  total: 15 }, status: '进行中', difficulty: '中等' },
  { id: 'T017', category: '审核任务', title: '肾脏超声结石检测审核',     description: '对肾脏超声结石检测标注批次进行审核，核验结石坐标及大小标注是否准确，审核通过后进入数据入库流程', type: '检测标注',   modality: 'US',      level: 'Lv2', reward: '1,400',  deadline: '2026-07-14', progress: { current: 22, total: 30 }, status: '进行中', difficulty: '简单' },
  { id: 'T018', category: '标注任务', title: '脑白质病变MRI分割',       description: '对脑部FLAIR MRI序列中的白质高信号区域进行精确分割，标注病变负荷，辅助多发性硬化症随访评估',   type: '分割标注',   modality: 'MRI',     level: 'Lv4', reward: '7,200',  deadline: '2026-07-26', progress: { current: 6,  total: 12 }, status: '进行中', difficulty: '困难' },
  { id: 'T019', category: '标注任务', title: '甲状腺结节超声分类',       description: '对甲状腺超声影像中的结节按TI-RADS标准进行分类标注，评估结节良恶性风险，支持穿刺决策辅助',     type: '分类标注',   modality: 'US',      level: 'Lv3', reward: '4,600',  deadline: '2026-08-03', progress: { current: 2,  total: 18 }, status: '招募中', difficulty: '中等' },
  { id: 'T020', category: '标注任务', title: '骨龄X光关键点标注',       description: '在手部正位X光影像上标注骨骺板关键点，用于基于人工智能的骨龄自动评估系统，服务儿科内分泌科',     type: '关键点标注', modality: 'X-Ray',   level: 'Lv3', reward: '4,200',  deadline: '2026-07-20', progress: { current: 11, total: 20 }, status: '进行中', difficulty: '中等' },
  { id: 'T021', category: '标注任务', title: '病理切片细胞分割任务',     description: '对H&E染色病理切片进行单细胞实例分割，区分肿瘤细胞、免疫细胞、间质细胞，支持数字病理分析',     type: '分割标注',   modality: '病理',    level: 'Lv6', reward: '13,000', deadline: '2026-08-20', progress: { current: 0,  total: 6  }, status: '招募中', difficulty: '困难' },
  { id: 'T022', category: '标注任务', title: '肺部CT三维分割任务',       description: '对肺部薄层CT影像进行肺实质、血管、气道的三维精确分割，为肺功能评估和手术规划提供解剖图谱',   type: '分割标注',   modality: 'CT',      level: 'Lv5', reward: '9,800',  deadline: '2026-08-12', progress: { current: 1,  total: 8  }, status: '招募中', difficulty: '困难' },
  { id: 'T025', category: '标注任务', title: '胃镜癌变区域检测',         description: '对胃镜影像进行早期胃癌及癌前病变的检测标注，标记病变边界和腺管开口类型，辅助内镜医生诊断决策', type: '检测标注',   modality: '内窥镜',  level: 'Lv5', reward: '9,000',  deadline: '2026-08-08', progress: { current: 0,  total: 10 }, status: '招募中', difficulty: '困难' },
  { id: 'T026', category: '标注任务', title: '脑电图癫痫标注任务',       description: '对长程脑电图信号进行癫痫发作检测与分类标注，标记发作起止时间及发作类型，构建癫痫监测训练集',   type: '分类标注',   modality: 'EEG',     level: 'Lv4', reward: '7,500',  deadline: '2026-07-30', progress: { current: 5,  total: 10 }, status: '进行中', difficulty: '困难' },
  { id: 'T027', category: '标注任务', title: '踝关节MRI损伤分级',       description: '对踝关节MRI影像进行韧带损伤分级标注，区分Ⅰ级拉伤至Ⅲ级断裂，辅助运动医学损伤评估',           type: '分类标注',   modality: 'MRI',     level: 'Lv3', reward: '4,400',  deadline: '2026-08-05', progress: { current: 3,  total: 20 }, status: '招募中', difficulty: '中等' },
  { id: 'T028', category: '标注任务', title: '乳腺超声肿块分割',         description: '对乳腺超声影像中的肿块进行精确分割标注，记录肿块形态、边缘特征及内部回声，辅助BI-RADS分级',   type: '分割标注',   modality: 'US',      level: 'Lv3', reward: '5,600',  deadline: '2026-07-25', progress: { current: 8,  total: 15 }, status: '进行中', difficulty: '中等' },
  { id: 'T029', category: '审核任务', title: '放射科报告结构化审核',     description: '对放射科文字报告NLP标注结果进行审核，核实病变部位、性质等关键实体的抽取是否准确，修正错误标注', type: '文本标注',   modality: 'X-Ray',   level: 'Lv1', reward: '1,100',  deadline: '2026-07-16', progress: { current: 25, total: 40 }, status: '进行中', difficulty: '简单' },
  { id: 'T030', category: '标注任务', title: '视网膜血管分割任务',       description: '对眼底彩照进行视网膜血管的精细分割标注，区分动静脉，提取血管树结构，用于糖尿病视网膜病变评估', type: '分割标注',   modality: '眼科影像', level: 'Lv3', reward: '5,100', deadline: '2026-08-01', progress: { current: 2,  total: 15 }, status: '招募中', difficulty: '中等' },
];

// ─── Requirements per annotation type ────────────────────────────────────────
const requirements: Record<string, string[]> = {
  '分割标注': [
    '使用多边形或画笔工具勾画目标区域边界，精度误差不超过 2 像素',
    '对模糊边界区域需结合多个切面综合判断，不得随意猜测',
    '每例标注需附诊断置信度（1-5 分）',
    '完成后使用系统内置校验工具自检，不合格自动退回',
  ],
  '分类标注': [
    '依据随附的标注规范文档选取正确类别，不得主观臆断',
    '对不确定病例标记「待审」，由 Lv5+ 专家二次裁定',
    '每批提交不超过 50 例，超出自动分批处理',
    '准确率低于 90% 的批次将触发整批退回机制',
  ],
  '检测标注': [
    '使用矩形框标注目标区域，框体应紧贴目标边界，不得过大或过小',
    '同一影像内多个目标需分别标注，不得合并',
    '框体置信度填写范围 0.0–1.0，精确到小数点后两位',
    '漏检率超过 5% 将触发质控降级处理',
  ],
  '关键点标注': [
    '按照标注手册中的关键点编号顺序依次点击标记',
    '每个关键点偏差不超过 1 像素，骨性标志点需精确至骨面',
    '对遮挡关键点使用「不可见」标记，不得强行估计',
    '提交前检查关键点连接线是否符合解剖形态',
  ],
  '视频标注': [
    '逐帧浏览视频，对关键事件精确到帧进行标注',
    '事件起止帧时间戳需同时标注，误差不超过 ±2 帧',
    '每段视频提交前需完整回放一次进行自检',
    '不连续事件段用「空白段」标记，不得省略',
  ],
  '文本标注': [
    '按照实体标注规范对文本中的病变部位、性质等进行标记',
    '同一实体出现多次均需标注，不得遗漏',
    '关系标注需准确描述实体间的属性关联',
    '存疑文本段标记「不确定」，由审核专家裁定',
  ],
};

// ─── CSS Annotation Illustration ─────────────────────────────────────────────
function AnnotationIllustration({ type, modality }: { type: string; modality: string }) {
  const isDark = ['CT','MRI','X-Ray','US','ECG','EEG','OCT'].includes(modality);
  const bg = isDark ? '#06070f' : '#f5f0eb';

  if (type === '分割标注') {
    return (
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl" style={{ background: bg }}>
        {/* Base image hint */}
        <div className="absolute" style={{ width: 220, height: 200, borderRadius: '50%', background: isDark ? 'radial-gradient(circle, #1e2030 0%, #0a0a14 100%)' : 'radial-gradient(circle, #e8d5c0 0%, #d4b89a 100%)' }} />
        {/* Segmentation mask */}
        <svg className="absolute" viewBox="0 0 280 260" width="280" height="260">
          <path d="M 140 80 Q 180 70 210 110 Q 230 140 210 175 Q 185 210 150 215 Q 115 218 90 195 Q 65 168 72 135 Q 80 100 110 82 Z"
            fill="rgba(0,113,227,0.18)" stroke="#0071e3" strokeWidth="2.5" strokeDasharray="6 3" />
          <path d="M 140 80 Q 180 70 210 110 Q 230 140 210 175 Q 185 210 150 215 Q 115 218 90 195 Q 65 168 72 135 Q 80 100 110 82 Z"
            fill="none" stroke="rgba(0,113,227,0.4)" strokeWidth="1" />
        </svg>
        {/* Label chip */}
        <div className="absolute top-6 right-6 rounded-lg bg-[#0071e3] px-3 py-1.5 text-[11px] font-semibold text-white shadow-lg">
          病变区域 #1
        </div>
        {/* Crosshair points */}
        {[[140,80],[210,110],[210,175],[150,215],[90,195],[72,135],[110,82]].map(([x,y],i) => (
          <div key={i} className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-[#0071e3] shadow-md"
            style={{ left: `${x/280*100}%`, top: `${y/260*100}%` }} />
        ))}
        <div className="absolute bottom-4 left-4 text-[10px] font-mono text-white/40">多边形工具  ·  {isDark ? modality : '病理'}</div>
      </div>
    );
  }

  if (type === '检测标注') {
    return (
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl" style={{ background: bg }}>
        <div className="absolute" style={{ width: 240, height: 220, borderRadius: '50%', background: isDark ? 'radial-gradient(circle, #1a1a28 0%, #080810 100%)' : 'radial-gradient(circle, #e8d5c0 0%, #caa880 100%)' }} />
        {/* Detection boxes */}
        <div className="absolute border-2 border-[#ff9500] bg-[#ff9500]/10" style={{ left: '22%', top: '20%', width: '28%', height: '32%' }}>
          <div className="absolute -top-5 left-0 rounded bg-[#ff9500] px-1.5 py-0.5 text-[9px] font-bold text-white whitespace-nowrap">结节 0.94</div>
        </div>
        <div className="absolute border-2 border-[#34c759] bg-[#34c759]/10" style={{ left: '54%', top: '38%', width: '22%', height: '26%' }}>
          <div className="absolute -top-5 left-0 rounded bg-[#34c759] px-1.5 py-0.5 text-[9px] font-bold text-white whitespace-nowrap">结节 0.87</div>
        </div>
        <div className="absolute border-2 border-[#ff3b30] bg-[#ff3b30]/10" style={{ left: '35%', top: '58%', width: '18%', height: '22%' }}>
          <div className="absolute -top-5 left-0 rounded bg-[#ff3b30] px-1.5 py-0.5 text-[9px] font-bold text-white whitespace-nowrap">可疑 0.62</div>
        </div>
        <div className="absolute bottom-4 left-4 text-[10px] font-mono text-white/40">矩形框工具  ·  {modality}</div>
      </div>
    );
  }

  if (type === '关键点标注') {
    const pts = [[90,100],[120,75],[155,68],[185,80],[200,110],[195,145],[170,165],[140,170],[108,160],[85,138],[82,115]];
    return (
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl" style={{ background: bg }}>
        <div className="absolute" style={{ width: 220, height: 220, borderRadius: '50%', background: isDark ? 'radial-gradient(circle, #1a1a28 0%, #080810 100%)' : 'radial-gradient(circle, #e0d0b8 0%, #c8b090 100%)' }} />
        <svg className="absolute" viewBox="0 0 280 260" width="280" height="260">
          <polyline points={pts.map(([x,y]) => `${x},${y}`).join(' ')} fill="none" stroke="#0071e3" strokeWidth="1.5" strokeDasharray="4 2" opacity="0.6" />
          {pts.map(([x,y],i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="6" fill="#0071e3" stroke="white" strokeWidth="2" />
              <text x={x+9} y={y+4} fontSize="9" fill="#0071e3" fontWeight="600">{i+1}</text>
            </g>
          ))}
        </svg>
        <div className="absolute bottom-4 left-4 text-[10px] font-mono" style={{ color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)' }}>关键点工具  ·  {modality}</div>
      </div>
    );
  }

  if (type === '视频标注') {
    return (
      <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-2xl bg-[#06070f] px-8">
        {/* Film strip */}
        <div className="mb-4 flex w-full gap-2">
          {[0,1,2,3,4,5,6].map(i => (
            <div key={i} className={`flex-1 rounded overflow-hidden border ${i===2 || i===5 ? 'border-[#ff9500] bg-[#ff9500]/20' : 'border-white/10 bg-white/[0.04]'}`} style={{ aspectRatio: '4/3' }}>
              {(i===2||i===5) && <div className="h-full w-full flex items-center justify-center"><div className="h-2 w-2 rounded-full bg-[#ff9500]" /></div>}
            </div>
          ))}
        </div>
        {/* Timeline */}
        <div className="w-full">
          <div className="relative h-8 w-full rounded-lg bg-white/[0.04] border border-white/[0.08]">
            {/* Playhead */}
            <div className="absolute top-0 bottom-0 w-0.5 bg-white/60" style={{ left: '32%' }}>
              <div className="absolute -top-1.5 -left-1 h-3 w-2 bg-white rounded-sm" />
            </div>
            {/* Event segments */}
            <div className="absolute top-1.5 bottom-1.5 rounded bg-[#ff9500]/50 border border-[#ff9500]/60" style={{ left: '28%', width: '8%' }} />
            <div className="absolute top-1.5 bottom-1.5 rounded bg-[#0071e3]/50 border border-[#0071e3]/60" style={{ left: '55%', width: '12%' }} />
            <div className="absolute top-1.5 bottom-1.5 rounded bg-[#34c759]/50 border border-[#34c759]/60" style={{ left: '75%', width: '6%' }} />
          </div>
          <div className="mt-2 flex justify-between text-[9px] font-mono text-white/30">
            <span>00:00</span><span>00:15</span><span>00:30</span><span>00:45</span><span>01:00</span>
          </div>
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
          {['切割','缝合','止血'].map((l,i) => (
            <div key={l} className="rounded px-1.5 py-0.5 text-[9px] font-medium text-white" style={{ background: ['#ff9500','#0071e3','#34c759'][i] + '99' }}>{l}</div>
          ))}
        </div>
      </div>
    );
  }

  if (type === '分类标注') {
    return (
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl" style={{ background: bg }}>
        <div className="absolute" style={{ width: 220, height: 200, borderRadius: '50%', background: isDark ? 'radial-gradient(circle, #1a1a28 0%, #080810 100%)' : 'radial-gradient(circle, #e8d5c0 0%, #d4b89a 100%)' }} />
        {/* Classification panel */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 w-36 space-y-2">
          {[
            { label: '良性', selected: false, color: '#34c759' },
            { label: '恶性', selected: true,  color: '#ff3b30' },
            { label: '不确定', selected: false, color: '#ff9500' },
          ].map(opt => (
            <div key={opt.label} className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-xs font-medium transition-all ${opt.selected ? 'border-[#0071e3]/40 bg-[#0071e3]/[0.12] text-[#0071e3]' : 'border-white/10 bg-white/[0.04] text-white/50'}`}>
              <div className={`h-3.5 w-3.5 rounded-full border-2 ${opt.selected ? 'border-[#0071e3] bg-[#0071e3]' : 'border-white/30'}`} />
              {opt.label}
              {opt.selected && <CheckCircle2 className="ml-auto h-3 w-3 text-[#0071e3]" />}
            </div>
          ))}
        </div>
        <div className="absolute bottom-4 left-4 text-[10px] font-mono text-white/40">分类工具  ·  {modality}</div>
      </div>
    );
  }

  // 文本标注 fallback
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl bg-white p-6">
      <div className="w-full space-y-3">
        {[
          { text: '右肺下叶见一枚', highlight: '结节状高密度影', tag: '病变', color: '#0071e3' },
          { text: '大小约', highlight: '8×6mm', tag: '测量', color: '#ff9500' },
          { text: '边缘', highlight: '毛糙，可见分叶', tag: '形态', color: '#34c759' },
        ].map((row, i) => (
          <div key={i} className="flex flex-wrap items-baseline gap-1 text-sm leading-relaxed text-[#1d1d1f]">
            <span>{row.text}</span>
            <span className="relative rounded px-1 py-0.5 font-medium" style={{ background: row.color + '18', color: row.color }}>
              {row.highlight}
              <span className="absolute -top-4 left-0 rounded-sm px-1 py-0.5 text-[9px] font-bold text-white" style={{ background: row.color }}>{row.tag}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Countdown to deadline ───────────────────────────────────────────────────
function useCountdown(deadline: string) {
  const [days, setDays] = useState(0);
  useEffect(() => {
    const update = () => {
      const diff = new Date(deadline).getTime() - Date.now();
      setDays(Math.max(0, Math.ceil(diff / 86400000)));
    };
    update();
    const t = setInterval(update, 60000);
    return () => clearInterval(t);
  }, [deadline]);
  return days;
}

// ─── Claim flow states ───────────────────────────────────────────────────────
type ClaimState = 'idle' | 'confirming' | 'claiming' | 'claimed';

// ─── Page ────────────────────────────────────────────────────────────────────
export default function TaskDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [claimState, setClaimState] = useState<ClaimState>('idle');

  const task = allTasks.find(t => t.id === id);
  const daysLeft = useCountdown(task?.deadline ?? '2026-12-31');

  if (!task) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fbfbfd]">
        <div className="text-center">
          <p className="text-[21px] font-semibold text-[#1d1d1f]">任务不存在</p>
          <button onClick={() => navigate('/task-market')} className="mt-4 text-sm text-[#0071e3]">返回任务广场</button>
        </div>
      </main>
    );
  }

  const reqs = requirements[task.type] ?? requirements['分类标注'];
  const progressPct = Math.round((task.progress.current / task.progress.total) * 100);
  const slotsLeft = task.progress.total - task.progress.current;

  const difficultyColor = { '简单': '#34c759', '中等': '#ff9500', '困难': '#ff3b30' }[task.difficulty];
  const statusColor =
    task.status === '招募中' ? '#34c759' :
    task.status === '进行中' ? '#0071e3' : '#86868b';

  const handleClaim = () => {
    if (task.status === '已结束') return;
    if (claimState === 'idle') { setClaimState('confirming'); return; }
    if (claimState === 'confirming') {
      setClaimState('claiming');
      setTimeout(() => setClaimState('claimed'), 1400);
    }
  };

  return (
    <main className="min-h-screen bg-[#fbfbfd] text-[#1d1d1f] antialiased">
      <section className="px-20 py-12">
        <div className="mx-auto max-w-[1280px]">

          {/* Breadcrumb */}
          <button
            onClick={() => navigate('/task-market')}
            className="mb-8 flex items-center gap-2 text-sm text-[#86868b] transition-colors duration-150 hover:text-[#0071e3]"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2} />
            返回任务广场
          </button>

          {/* Title block */}
          <div className="mb-10">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className={`rounded-full px-3 py-1 text-xs font-medium ${task.category === '审核任务' ? 'bg-[#af52de]/[0.08] text-[#af52de]' : 'bg-[#0071e3]/[0.08] text-[#0071e3]'}`}>
                {task.category}
              </span>
              <span className="rounded-full px-3 py-1 text-xs font-medium" style={{ background: statusColor + '14', color: statusColor }}>
                {task.status}
              </span>
              <span className="rounded-full bg-black/[0.04] px-3 py-1 text-xs font-medium text-[#1d1d1f]">{task.type}</span>
              <span className="rounded-full bg-[#0071e3]/[0.08] px-3 py-1 text-xs font-medium text-[#0071e3]">{task.level}+</span>
              <span className="rounded-full px-3 py-1 text-xs font-medium" style={{ background: difficultyColor + '14', color: difficultyColor }}>{task.difficulty}</span>
            </div>
            <h1 className="text-5xl font-semibold leading-[1.16] tracking-[-0.015em] text-[#1d1d1f]">
              {task.title}
            </h1>
            <p className="mt-3 text-[21px] font-medium leading-[1.52] text-[#86868b]">
              {task.modality} · {task.type}
            </p>
          </div>

          {/* Two-column layout */}
          <div className="grid grid-cols-[1fr_340px] gap-10 items-start">

            {/* Left: info */}
            <div className="space-y-8">

              {/* Task description */}
              <div className="rounded-3xl border border-black/[0.08] bg-white p-8 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                <div className="mb-4 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-[#0071e3]" strokeWidth={2} />
                  <h2 className="text-[21px] font-semibold">任务说明</h2>
                </div>
                <p className="text-sm leading-[1.8] text-[#86868b]">{task.description}</p>

                <div className="mt-6 grid grid-cols-3 gap-4">
                  <div className="rounded-2xl bg-[#fbfbfd] p-4 text-center">
                    <div className="text-2xl font-semibold text-[#0071e3]">{task.reward}</div>
                    <div className="mt-1 text-xs text-[#86868b]">积分/例</div>
                  </div>
                  <div className="rounded-2xl bg-[#fbfbfd] p-4 text-center">
                    <div className="text-2xl font-semibold" style={{ color: difficultyColor }}>{task.difficulty}</div>
                    <div className="mt-1 text-xs text-[#86868b]">难度等级</div>
                  </div>
                  <div className="rounded-2xl bg-[#fbfbfd] p-4 text-center">
                    <div className="text-2xl font-semibold text-[#1d1d1f]">{daysLeft}</div>
                    <div className="mt-1 text-xs text-[#86868b]">剩余天数</div>
                  </div>
                </div>
              </div>

              {/* Annotation illustration */}
              <div className="rounded-3xl border border-black/[0.08] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                <div className="flex items-center gap-2 border-b border-black/[0.06] px-8 py-5">
                  <Layers className="h-5 w-5 text-[#0071e3]" strokeWidth={2} />
                  <h2 className="text-[21px] font-semibold">标注示例</h2>
                  <span className="ml-auto rounded-full bg-[#0071e3]/[0.08] px-3 py-1 text-xs font-medium text-[#0071e3]">{task.type}</span>
                </div>
                <div className="h-[300px] p-4">
                  <AnnotationIllustration type={task.type} modality={task.modality} />
                </div>
                <div className="border-t border-black/[0.06] px-8 py-4">
                  <p className="text-xs text-[#86868b]">以上为系统生成的示例图，实际标注界面在工作台内打开，支持快捷键操作与自动保存。</p>
                </div>
              </div>

              {/* Requirements */}
              <div className="rounded-3xl border border-black/[0.08] bg-white p-8 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                <div className="mb-6 flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-[#0071e3]" strokeWidth={2} />
                  <h2 className="text-[21px] font-semibold">标注要求</h2>
                </div>
                <div className="space-y-4">
                  {reqs.map((req, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0071e3]/[0.08] text-xs font-semibold text-[#0071e3]">{i + 1}</div>
                      <p className="text-sm leading-[1.7] text-[#86868b]">{req}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div className="rounded-3xl border border-black/[0.08] bg-white p-8 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                <div className="mb-6 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-[#0071e3]" strokeWidth={2} />
                  <h2 className="text-[21px] font-semibold">任务时间节点</h2>
                </div>
                <div className="relative pl-8">
                  <div className="absolute left-3 top-2 bottom-2 w-px bg-black/[0.06]" />
                  {[
                    { label: '任务发布', date: '2026-06-01', done: true },
                    { label: '招募截止', date: '2026-06-20', done: true },
                    { label: '标注截止', date: task.deadline, done: false },
                    { label: '质控审核', date: '结束后 7 天内', done: false },
                    { label: '积分到账', date: '审核通过后 48h', done: false },
                  ].map((node, i) => (
                    <div key={i} className="relative mb-6 last:mb-0">
                      <div className={`absolute -left-8 top-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 ${node.done ? 'border-[#34c759] bg-[#34c759]' : 'border-[#0071e3]/30 bg-white'}`}>
                        {node.done && <CheckCircle2 className="h-3 w-3 text-white" strokeWidth={3} />}
                      </div>
                      <div className="flex items-baseline justify-between">
                        <span className={`text-sm font-medium ${node.done ? 'text-[#34c759]' : 'text-[#1d1d1f]'}`}>{node.label}</span>
                        <span className="text-xs text-[#86868b]">{node.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: claim card (sticky) */}
            <div className="sticky top-24 space-y-4">

              {/* Reward + Claim */}
              <div className="overflow-hidden rounded-3xl border border-black/[0.08] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)]">

                {/* Claimed success banner */}
                {claimState === 'claimed' && (
                  <div className="flex items-center gap-3 bg-[#34c759]/[0.08] px-6 py-4 border-b border-[#34c759]/20">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-[#34c759]" strokeWidth={2} />
                    <div>
                      <p className="text-sm font-semibold text-[#34c759]">任务已领取成功</p>
                      <p className="text-xs text-[#34c759]/70">已加入你的工作台，随时可开始</p>
                    </div>
                  </div>
                )}

                <div className="p-6">
                  {/* Reward */}
                  <div className="mb-6">
                    <p className="mb-1 text-xs text-[#86868b]">完成每例可获得</p>
                    <div className="flex items-baseline gap-2">
                      <Coins className="h-6 w-6 text-[#0071e3]" strokeWidth={2} />
                      <span className="text-4xl font-semibold text-[#1d1d1f]">{task.reward}</span>
                      <span className="text-sm text-[#86868b]">积分</span>
                    </div>
                    <p className="mt-1 text-xs text-[#86868b]">
                      难度系数 {task.difficulty === '简单' ? '×1.0' : task.difficulty === '中等' ? '×1.5' : '×2.0'}  ·  {task.level} 及以上可参与
                    </p>
                  </div>

                  {/* Progress */}
                  <div className="mb-5">
                    <div className="mb-2 flex items-center justify-between text-xs text-[#86868b]">
                      <span>名额进度</span>
                      <span className="font-medium text-[#1d1d1f]">{task.progress.current}/{task.progress.total}</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-black/[0.04]">
                      <div className="h-full rounded-full bg-[#0071e3] transition-all duration-700" style={{ width: `${progressPct}%` }} />
                    </div>
                    {slotsLeft > 0 && (
                      <p className="mt-1.5 text-xs text-[#86868b]">还剩 <span className="font-medium text-[#1d1d1f]">{slotsLeft}</span> 个名额</p>
                    )}
                  </div>

                  {/* Deadline */}
                  <div className="mb-6 flex items-center gap-2 rounded-2xl bg-[#fbfbfd] px-4 py-3">
                    <Clock className="h-4 w-4 shrink-0 text-[#86868b]" strokeWidth={2} />
                    <div>
                      <p className="text-xs text-[#86868b]">截止日期</p>
                      <p className="text-sm font-medium text-[#1d1d1f]">{task.deadline} · 还剩 {daysLeft} 天</p>
                    </div>
                  </div>

                  {/* CTA */}
                  {task.status === '已结束' ? (
                    <div className="rounded-full border border-black/[0.08] py-4 text-center text-sm font-medium text-[#86868b] opacity-50">
                      任务已结束
                    </div>
                  ) : claimState === 'claimed' ? (
                    <button
                      onClick={() => navigate('/workspace')}
                      className="group flex w-full items-center justify-center gap-2 rounded-full bg-[#34c759] py-4 text-sm font-medium text-white shadow-[0_4px_12px_rgba(52,199,89,0.3)] transition-all duration-200 hover:bg-[#2db44f] hover:shadow-[0_6px_16px_rgba(52,199,89,0.4)] active:scale-[0.98]"
                    >
                      <PlayCircle className="h-4 w-4" strokeWidth={2} />
                      进入标注工作台
                      <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2} />
                    </button>
                  ) : claimState === 'confirming' ? (
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 rounded-2xl bg-[#ff9500]/[0.06] border border-[#ff9500]/20 px-4 py-3">
                        <AlertCircle className="h-4 w-4 shrink-0 text-[#ff9500] mt-0.5" strokeWidth={2} />
                        <p className="text-xs leading-[1.6] text-[#86868b]">
                          领取后需在 <span className="font-medium text-[#1d1d1f]">{task.deadline}</span> 前完成提交，逾期未提交将释放名额并影响信用分。
                        </p>
                      </div>
                      <button
                        onClick={handleClaim}
                        className="w-full rounded-full bg-[#0071e3] py-4 text-sm font-medium text-white shadow-[0_4px_12px_rgba(0,113,227,0.3)] transition-all duration-200 hover:bg-[#005ec4] active:scale-[0.98]"
                      >
                        确认领取
                      </button>
                      <button
                        onClick={() => setClaimState('idle')}
                        className="w-full rounded-full border border-black/[0.08] py-3 text-sm font-medium text-[#86868b] transition-all duration-200 hover:border-[#0071e3]/20 hover:text-[#1d1d1f]"
                      >
                        取消
                      </button>
                    </div>
                  ) : claimState === 'claiming' ? (
                    <div className="flex w-full items-center justify-center gap-2 rounded-full bg-[#0071e3]/80 py-4 text-sm font-medium text-white cursor-wait">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      正在领取…
                    </div>
                  ) : (
                    <button
                      onClick={handleClaim}
                      className="w-full rounded-full bg-[#0071e3] py-4 text-sm font-medium text-white shadow-[0_4px_12px_rgba(0,113,227,0.3)] transition-all duration-200 hover:bg-[#005ec4] hover:shadow-[0_6px_16px_rgba(0,113,227,0.4)] active:scale-[0.98]"
                    >
                      {task.status === '招募中' ? '立即报名' : '领取任务'}
                    </button>
                  )}
                </div>
              </div>

              {/* Task meta */}
              <div className="rounded-3xl border border-black/[0.08] bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                <div className="space-y-3">
                  {[
                    { icon: Target, label: '任务类型', value: task.type },
                    { icon: Zap, label: '成像模态', value: task.modality },
                    { icon: Users, label: '已领取', value: `${task.progress.current} / ${task.progress.total} 人` },
                    { icon: Coins, label: '任务编号', value: task.id },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-[#86868b]">
                        <Icon className="h-3.5 w-3.5" strokeWidth={2} />
                        {label}
                      </div>
                      <span className="text-xs font-medium text-[#1d1d1f]">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <p className="px-2 text-center text-[11px] leading-[1.6] text-[#86868b]">
                领取即代表您同意 M平台标注任务服务条款。<br />如有疑问请联系 <span className="text-[#0071e3]">team@m-platform.cn</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
