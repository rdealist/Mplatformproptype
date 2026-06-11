import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";

export interface DataItem {
  id: number;
  title: string;
  subtitle: string;
  tags: string[];
  samples?: string;
  size?: string;
  colorLevel: 1 | 2 | 3 | 4 | 5 | 6;
  source: { type: 'platform' | 'institution' | 'external'; name: string };
  modality: string;
  anatomy: string[];
  scale: 'small' | 'medium' | 'large' | 'xlarge';
  points?: number;
}

export const dataItems: DataItem[] = [
  { id: 1,  title: "脑部MRI肿瘤分割数据集",      subtitle: "磁共振 (MR)",             tags: ["脑部","分割"],      colorLevel: 5, samples: "12.4K", size: "186 GB",  source: { type: 'platform',     name: 'iMedLoop' },              modality: 'MR',     anatomy: ['头颅'],           scale: 'xlarge', points: 1200 },
  { id: 2,  title: "颅脑影像库",                  subtitle: "磁共振 (MR)",             tags: ["神经","分类"],      colorLevel: 6, samples: "9.1K",  size: "203 GB",  source: { type: 'external',     name: 'OASIS脑影像数据库' },  modality: 'MR',     anatomy: ['头颅'],           scale: 'xlarge', points: 850 },
  { id: 3,  title: "内窥镜息肉检测",              subtitle: "可见光影像 (VL)",         tags: ["消化","检测"],      colorLevel: 6, samples: "14.6K", size: "156 GB",  source: { type: 'institution',  name: '消化病医院' },          modality: 'VL',     anatomy: ['腹部'],           scale: 'large', points: 2100 },
  { id: 4,  title: "病理切片数字化数据集",        subtitle: "全幅数字病理 (WSI)",      tags: ["病理","细胞"],      colorLevel: 6, samples: "11.2K", size: "342 GB",  source: { type: 'institution',  name: '中山大学病理中心' },   modality: 'WSI',    anatomy: ['全身'],           scale: 'xlarge', points: 3500 },
  { id: 5,  title: "肺结节CT专题数据集",          subtitle: "计算机断层扫描 (CT)",     tags: ["肺部","结节"],      colorLevel: 4, samples: "5.7K",  size: "128 GB",  source: { type: 'platform',     name: 'iMedLoop' },              modality: 'CT',     anatomy: ['胸部'],           scale: 'large', points: 1500 },
  { id: 6,  title: "X射线胸部影像集",             subtitle: "X射线 (X-ray)",           tags: ["胸部"],             colorLevel: 3, samples: "8.2K",  size: "45 GB",   source: { type: 'institution',  name: '协和医院影像中心' },   modality: 'X-ray',  anatomy: ['胸部'],           scale: 'medium', points: 600 },
  { id: 7,  title: "乳腺钼靶筛查数据集",          subtitle: "X射线 (X-ray)",           tags: ["乳腺","检测"],      colorLevel: 5, samples: "8.9K",  size: "52 GB",   source: { type: 'platform',     name: 'iMedLoop' },              modality: 'X-ray',  anatomy: ['胸部'],           scale: 'large', points: 1800 },
  { id: 8,  title: "脊柱MRI数据集",               subtitle: "磁共振 (MR)",             tags: ["脊柱","分割"],      colorLevel: 4, samples: "3.8K",  size: "94 GB",   source: { type: 'institution',  name: '北医三院骨科' },       modality: 'MR',     anatomy: ['脊柱'],           scale: 'large', points: 2200 },
  { id: 9,  title: "眼底图像数据集",              subtitle: "可见光影像 (VL)",         tags: ["眼底","分类"],      colorLevel: 1, samples: "2.4K",  size: "8.6 GB",  source: { type: 'external',     name: 'EyePACS数据联盟' },   modality: 'VL',     anatomy: ['头颅'],           scale: 'small', points: 450 },
  { id: 10, title: "心电图信号数据",              subtitle: "其他 (OTH)",              tags: ["心脏","ECG"],       colorLevel: 3, samples: "15K",   size: "3.2 GB",  source: { type: 'platform',     name: 'iMedLoop' },              modality: 'OTH',    anatomy: ['心脏'],           scale: 'small', points: 300 },
  { id: 11, title: "皮肤病变分类",                subtitle: "可见光影像 (VL)",         tags: ["皮肤科"],           colorLevel: 2, samples: "6.3K",  size: "24 GB",   source: { type: 'external',     name: 'DermNet数据库' },      modality: 'VL',     anatomy: ['四肢'],           scale: 'medium' },
  { id: 12, title: "冠状动脉CTA",                 subtitle: "计算机断层扫描 (CT)",     tags: ["心脏","血管"],      colorLevel: 5, samples: "4.2K",  size: "76 GB",   source: { type: 'platform',     name: 'iMedLoop' },              modality: 'CT',     anatomy: ['心脏', '血管'],    scale: 'large'  },
  { id: 13, title: "骨骼X光影像库",               subtitle: "X射线 (X-ray)",           tags: ["骨科"],             colorLevel: 3, samples: "4.6K",  size: "28 GB",   source: { type: 'institution',  name: '上海交大附属医院' },   modality: 'X-ray',  anatomy: ['四肢'],           scale: 'medium' },
  { id: 14, title: "前列腺MRI分割",               subtitle: "磁共振 (MR)",             tags: ["泌尿","分割"],      colorLevel: 5, samples: "2.9K",  size: "67 GB",   source: { type: 'platform',     name: 'iMedLoop' },              modality: 'MR',     anatomy: ['盆腔'],           scale: 'large'  },
  { id: 15, title: "糖尿病视网膜病变数据集",      subtitle: "可见光影像 (VL)",         tags: ["眼底","分级"],      colorLevel: 6, samples: "1.8K",  size: "6.4 GB",  source: { type: 'institution',  name: '中山眼科中心' },       modality: 'VL',     anatomy: ['头颅'],           scale: 'small'  },
  { id: 16, title: "甲状腺超声数据",              subtitle: "超声 (US)",               tags: ["甲状腺"],           colorLevel: 2, samples: "6.7K",  size: "32 GB",   source: { type: 'external',     name: 'Thyroid Dataset Hub' },modality: 'US',     anatomy: ['颈部'],           scale: 'medium' },
  { id: 17, title: "儿科胸部X光集",               subtitle: "X射线 (X-ray)",           tags: ["儿科","胸部"],      colorLevel: 4, samples: "9.3K",  size: "54 GB",   source: { type: 'platform',     name: 'iMedLoop' },              modality: 'X-ray',  anatomy: ['胸部'],           scale: 'large'  },
  { id: 18, title: "肾脏超声分割",                subtitle: "超声 (US)",               tags: ["肾脏"],             colorLevel: 1, samples: "3.4K",  size: "15 GB",   source: { type: 'institution',  name: '浙大附属医院' },       modality: 'US',     anatomy: ['腹部'],           scale: 'medium' },
  { id: 19, title: "肝脏超声影像",                subtitle: "超声 (US)",               tags: ["肝脏"],             colorLevel: 4, samples: "7.1K",  size: "38 GB",   source: { type: 'platform',     name: 'iMedLoop' },              modality: 'US',     anatomy: ['腹部'],           scale: 'medium' },
  { id: 20, title: "脑电波信号数据集",            subtitle: "其他 (OTH)",              tags: ["神经","EEG"],       colorLevel: 3, samples: "5.5K",  size: "4.8 GB",  source: { type: 'external',     name: 'NeuroData联盟' },      modality: 'OTH',    anatomy: ['头颅'],           scale: 'small'  },
  { id: 21, title: "白内障手术显微影像数据库",    subtitle: "可见光影像 (VL)",         tags: ["眼科"],             colorLevel: 5, samples: "2.1K",  size: "48 GB",   source: { type: 'institution',  name: '天津眼科医院' },       modality: 'VL',     anatomy: ['头颅'],           scale: 'medium' },
  { id: 22, title: "肺炎X射线分类数据集",         subtitle: "X射线 (X-ray)",           tags: ["胸部","分类"],      colorLevel: 2, samples: "5.2K",  size: "31 GB",   source: { type: 'platform',     name: 'iMedLoop' },              modality: 'X-ray',  anatomy: ['胸部'],           scale: 'medium' },
  { id: 23, title: "颅脑CT急诊影像库",            subtitle: "计算机断层扫描 (CT)",     tags: ["神经","急诊"],      colorLevel: 6, samples: "7.8K",  size: "168 GB",  source: { type: 'institution',  name: '北京急救中心' },       modality: 'CT',     anatomy: ['头颅'],           scale: 'xlarge' },
  { id: 24, title: "超声心动图分析数据集",        subtitle: "超声 (US)",               tags: ["心脏"],             colorLevel: 4, samples: "4.9K",  size: "26 GB",   source: { type: 'platform',     name: 'iMedLoop' },              modality: 'US',     anatomy: ['心脏'],           scale: 'medium' },
  { id: 25, title: "膝关节MRI软骨分割",           subtitle: "磁共振 (MR)",             tags: ["骨科","分割"],      colorLevel: 3, samples: "4.2K",  size: "88 GB",   source: { type: 'institution',  name: '解放军总医院' },       modality: 'MR',     anatomy: ['四肢'],           scale: 'large'  },
  { id: 26, title: "肺癌病理WSI库",               subtitle: "全幅数字病理 (WSI)",      tags: ["肺部","病理"],      colorLevel: 6, samples: "8.4K",  size: "520 GB",  source: { type: 'external',     name: 'TCGA病理图像库' },     modality: 'WSI',    anatomy: ['胸部'],           scale: 'xlarge' },
  { id: 27, title: "颈动脉超声斑块检测",          subtitle: "超声 (US)",               tags: ["颈部","血管"],      colorLevel: 3, samples: "3.6K",  size: "22 GB",   source: { type: 'institution',  name: '南京鼓楼医院' },       modality: 'US',     anatomy: ['颈部', '血管'],    scale: 'medium' },
  { id: 28, title: "心脏电影MRI分割",             subtitle: "磁共振 (MR)",             tags: ["心脏","分割"],      colorLevel: 6, samples: "5.1K",  size: "143 GB",  source: { type: 'platform',     name: 'iMedLoop' },              modality: 'MR',     anatomy: ['心脏'],           scale: 'large'  },
  { id: 29, title: "结直肠癌病理数据集",          subtitle: "全幅数字病理 (WSI)",      tags: ["消化","病理"],      colorLevel: 5, samples: "6.8K",  size: "280 GB",  source: { type: 'institution',  name: '复旦大学附属肿瘤医院'},modality: 'WSI',    anatomy: ['腹部'],           scale: 'xlarge' },
  { id: 30, title: "视网膜OCT分层分析",           subtitle: "其他 (OTH)",              tags: ["眼部","分割"],      colorLevel: 5, samples: "3.9K",  size: "18 GB",   source: { type: 'platform',     name: 'iMedLoop' },              modality: 'OTH',    anatomy: ['头颅'],           scale: 'medium' },
  { id: 31, title: "脑卒中MRI急诊影像库",         subtitle: "磁共振 (MR)",             tags: ["神经","急诊"],      colorLevel: 6, samples: "6.2K",  size: "175 GB",  source: { type: 'institution',  name: '武汉同济医院' },       modality: 'MR',     anatomy: ['头颅'],           scale: 'xlarge' },
  { id: 32, title: "骨骼CT三维重建数据集",        subtitle: "计算机断层扫描 (CT)",     tags: ["骨科","重建"],      colorLevel: 4, samples: "2.8K",  size: "95 GB",   source: { type: 'platform',     name: 'iMedLoop' },              modality: 'CT',     anatomy: ['四肢'],           scale: 'large'  },
  { id: 33, title: "乳腺超声结节检测",            subtitle: "超声 (US)",               tags: ["乳腺","检测"],      colorLevel: 5, samples: "7.3K",  size: "44 GB",   source: { type: 'institution',  name: '中南大学湘雅医院' },   modality: 'US',     anatomy: ['胸部'],           scale: 'medium' },
  { id: 34, title: "心律失常信号库",              subtitle: "其他 (OTH)",              tags: ["心脏","分类"],      colorLevel: 4, samples: "22.5K", size: "8.6 GB",  source: { type: 'external',     name: 'PhysioNet心电数据库'}, modality: 'OTH',    anatomy: ['心脏'],           scale: 'small'  },
  { id: 35, title: "胰腺CT分割数据集",            subtitle: "计算机断层扫描 (CT)",     tags: ["腹部","分割"],      colorLevel: 6, samples: "1.6K",  size: "112 GB",  source: { type: 'institution',  name: '北京协和医学院' },     modality: 'CT',     anatomy: ['腹部'],           scale: 'large'  },
  { id: 36, title: "黄斑变性专题数据集",          subtitle: "其他 (OTH)",              tags: ["眼部","分级"],      colorLevel: 4, samples: "3.2K",  size: "14 GB",   source: { type: 'platform',     name: 'iMedLoop' },              modality: 'OTH',    anatomy: ['头颅'],           scale: 'medium' },
  { id: 37, title: "胃镜病变检测数据库",          subtitle: "可见光影像 (VL)",         tags: ["消化","检测"],      colorLevel: 5, samples: "9.6K",  size: "82 GB",   source: { type: 'institution',  name: '上海市第一人民医院' }, modality: 'VL',     anatomy: ['腹部'],           scale: 'large'  },
  { id: 38, title: "脊柱侧弯X光数据集",           subtitle: "X射线 (X-ray)",           tags: ["脊柱","分类"],      colorLevel: 3, samples: "2.1K",  size: "16 GB",   source: { type: 'institution',  name: '北医三院骨科' },       modality: 'X-ray',  anatomy: ['脊柱'],           scale: 'medium' },
  { id: 39, title: "乳腺癌病理切片库",            subtitle: "全幅数字病理 (WSI)",      tags: ["乳腺","病理"],      colorLevel: 5, samples: "9.2K",  size: "410 GB",  source: { type: 'external',     name: 'TCGA病理图像库' },     modality: 'WSI',    anatomy: ['胸部'],           scale: 'xlarge' },
  { id: 40, title: "腰椎间盘MRI数据集",           subtitle: "磁共振 (MR)",             tags: ["脊柱","分割"],      colorLevel: 4, samples: "3.5K",  size: "78 GB",   source: { type: 'platform',     name: 'iMedLoop' },              modality: 'MR',     anatomy: ['脊柱'],           scale: 'large'  },
  { id: 41, title: "结肠镜腺瘤识别数据集",        subtitle: "可见光影像 (VL)",         tags: ["消化","检测"],      colorLevel: 5, samples: "8.1K",  size: "68 GB",   source: { type: 'institution',  name: '广州医科大学附属医院' }, modality: 'VL',     anatomy: ['腹部'],           scale: 'large'  },
  { id: 42, title: "肝脏MRI增强扫描",             subtitle: "磁共振 (MR)",             tags: ["腹部","分割"],      colorLevel: 4, samples: "3.1K",  size: "124 GB",  source: { type: 'platform',     name: 'iMedLoop' },              modality: 'MR',     anatomy: ['腹部'],           scale: 'large'  },
  { id: 43, title: "宫颈癌TCT细胞学数据集",       subtitle: "全幅数字病理 (WSI)",      tags: ["妇科","分类"],      colorLevel: 4, samples: "5.4K",  size: "36 GB",   source: { type: 'institution',  name: '复旦大学附属肿瘤医院' }, modality: 'WSI',    anatomy: ['盆腔'],           scale: 'medium' },
  { id: 44, title: "PET-CT融合影像库",            subtitle: "核医学与分子代谢 (NM)",   tags: ["全身","融合"],      colorLevel: 5, samples: "2.3K",  size: "198 GB",  source: { type: 'institution',  name: '解放军总医院' },       modality: 'NM',     anatomy: ['全身'],           scale: 'xlarge' },
  { id: 45, title: "前列腺癌Gleason分级",         subtitle: "全幅数字病理 (WSI)",      tags: ["泌尿","分级"],      colorLevel: 5, samples: "4.7K",  size: "230 GB",  source: { type: 'external',     name: 'TCGA病理图像库' },     modality: 'WSI',    anatomy: ['盆腔'],           scale: 'xlarge' },
  { id: 46, title: "头颈部CTA数据集",             subtitle: "计算机断层扫描 (CT)",     tags: ["颈部","血管"],      colorLevel: 5, samples: "3.8K",  size: "156 GB",  source: { type: 'platform',     name: 'iMedLoop' },              modality: 'CT',     anatomy: ['颈部', '血管'],    scale: 'large'  },
  { id: 47, title: "睡眠信号分期数据集",          subtitle: "其他 (OTH)",              tags: ["神经","分类"],      colorLevel: 3, samples: "4.1K",  size: "12 GB",   source: { type: 'external',     name: 'PhysioNet心电数据库'}, modality: 'OTH',    anatomy: ['头颅'],           scale: 'medium' },
  { id: 48, title: "黑色素瘤皮肤镜库",            subtitle: "可见光影像 (VL)",         tags: ["皮肤","分类"],      colorLevel: 5, samples: "5.8K",  size: "42 GB",   source: { type: 'external',     name: 'DermNet数据库' },      modality: 'VL',     anatomy: ['四肢'],           scale: 'medium' },
  { id: 49, title: "多模态脑部数据集",            subtitle: "磁共振 (MR)",             tags: ["神经","多模态"],    colorLevel: 6, samples: "1.9K",  size: "386 GB",  source: { type: 'external',     name: 'UK Biobank影像库' },   modality: 'MR',     anatomy: ['头颅'],           scale: 'xlarge' },
  { id: 50, title: "牙科全景X光数据集",           subtitle: "X射线 (X-ray)",           tags: ["口腔","检测"],      colorLevel: 2, samples: "3.8K",  size: "19 GB",   source: { type: 'institution',  name: '四川大学华西口腔医院' }, modality: 'X-ray',  anatomy: ['四肢'],           scale: 'medium' },
];

const sourceConfig = {
  platform:    { label: '平台数据', color: '#0071e3', bgColor: 'rgba(0,113,227,0.08)' },
  institution: { label: '机构上传', color: '#34c759', bgColor: 'rgba(52,199,89,0.08)' },
  external:    { label: '委托展示', color: '#ff9500', bgColor: 'rgba(255,149,0,0.08)' },
};

export interface DataFilters {
  modalities: string[];
  anatomies: string[];
  sources: ('platform' | 'institution' | 'external')[];
  scales: ('small' | 'medium' | 'large' | 'xlarge')[];
}

interface DataListViewProps {
  filters?: DataFilters;
}

const PAGE_SIZE = 24;

export function DataListView({ filters }: DataListViewProps) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const filteredItems = dataItems.filter(item => {
    if (!filters) return true;
    if (filters.modalities.length > 0 && !filters.modalities.includes(item.modality)) return false;
    if (filters.anatomies.length > 0 && !item.anatomy.some(a => filters.anatomies.includes(a))) return false;
    if (filters.sources.length > 0 && !filters.sources.includes(item.source.type)) return false;
    if (filters.scales.length > 0 && !filters.scales.includes(item.scale)) return false;
    return true;
  });

  const totalPages = Math.ceil(filteredItems.length / PAGE_SIZE);
  const pageItems = filteredItems.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getPageNumbers = () => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-8">
        {pageItems.map((item, idx) => {
        const sourceStyle = sourceConfig[item.source.type];
        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => navigate(`/dataset/${item.id}`)}
            className="group relative flex flex-col overflow-hidden rounded-[32px] bg-white p-8 transition-all duration-500 hover:shadow-[0_40px_80px_-16px_rgba(0,0,0,0.08)] cursor-pointer border border-black/[0.03]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#0071e3]/[0.03] via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
            
            <div className="relative flex flex-col h-full z-10">
              <div className="flex items-start justify-between mb-4">
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center rounded-full bg-[#0071e3]/[0.06] px-3 py-1 text-[11px] font-bold tracking-wider text-[#0071e3] uppercase">
                      {item.subtitle}
                    </span>
                  </div>
                  <h3 className="text-[24px] font-semibold leading-tight tracking-tight text-[#1d1d1f] transition-all duration-400 group-hover:text-[#0071e3]">
                    {item.title}
                  </h3>
                </div>
                {item.points && (
                  <div className="text-right">
                    <div className="text-[32px] font-bold text-[#1d1d1f] group-hover:text-[#0071e3] transition-colors tracking-tighter leading-none">{item.points}</div>
                    <div className="text-[10px] font-bold text-[#86868b] uppercase tracking-[0.2em] mt-1">积分</div>
                  </div>
                )}
              </div>

              <div className="mt-4 flex flex-wrap gap-6 text-[14px] text-[#86868b]">
                <div className="flex items-center gap-2.5">
                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: sourceStyle.color }} />
                  <span className="font-semibold text-[#1d1d1f] opacity-80">{item.source.name}</span>
                </div>
                {item.samples && (
                  <div className="flex items-center gap-1.5">
                    <span className="opacity-40 font-medium">样本:</span>
                    <span className="font-bold text-[#1d1d1f]">{item.samples}</span>
                  </div>
                )}
                {item.size && (
                  <div className="flex items-center gap-1.5">
                    <span className="opacity-40 font-medium">大小:</span>
                    <span className="font-bold text-[#1d1d1f]">{item.size}</span>
                  </div>
                )}
              </div>

              <div className="mt-10 pt-6 flex items-center justify-between border-t border-black/[0.04]">
                <div className="flex flex-wrap gap-4">
                  {item.anatomy.slice(0, 2).map((a) => (
                    <span key={a} className="text-[14px] font-medium text-[#86868b] transition-colors duration-300 group-hover:text-[#1d1d1f]">
                      #{a}
                    </span>
                  ))}
                  {item.tags.slice(0, 1).map((tag) => (
                    <span key={tag} className="text-[14px] font-medium text-[#86868b] transition-colors duration-300 group-hover:text-[#1d1d1f]">
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/[0.03] text-[#1d1d1f] transition-all duration-500 group-hover:bg-[#0071e3] group-hover:text-white group-hover:scale-110 shadow-sm">
                  <ChevronRight className="h-6 w-6" strokeWidth={2.5} />
                </div>
              </div>
            </div>
          </motion.div>
          );
        })}
      </div>

      {totalPages > 1 && (
        <div className="mt-16 flex items-center justify-center gap-3">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-black/[0.06] bg-white text-[#1d1d1f] transition-all duration-300 hover:border-[#0071e3]/30 hover:bg-[#0071e3]/[0.02] disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={2.5} />
          </button>

          {getPageNumbers().map((page, idx) =>
            page === "..." ? (
              <span key={`ellipsis-${idx}`} className="flex h-11 w-11 items-center justify-center text-sm font-bold text-[#86868b]">
                ···
              </span>
            ) : (
              <button
                key={page}
                onClick={() => goToPage(page as number)}
                className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold transition-all duration-300 ${
                  currentPage === page
                    ? "bg-[#0071e3] text-white shadow-[0_8px_24px_-4px_rgba(0,113,227,0.3)] scale-110"
                    : "border border-black/[0.06] bg-white text-[#1d1d1f] hover:border-[#0071e3]/30 hover:bg-[#0071e3]/[0.02]"
                }`}
              >
                {page}
              </button>
            )
          )}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-black/[0.06] bg-white text-[#1d1d1f] transition-all duration-300 hover:border-[#0071e3]/30 hover:bg-[#0071e3]/[0.02] disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={2.5} />
          </button>
        </div>
      )}
    </div>
  );
}
