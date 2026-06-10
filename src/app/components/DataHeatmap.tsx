import { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router";

type ColorLevel = 1 | 2 | 3 | 4 | 5 | 6;
type HeightLevel = "sm" | "md" | "lg";

interface HeatmapItem {
  id: number;
  title: string;
  subtitle: string;
  tags: string[];
  colorLevel: ColorLevel;
  samples: string;
  size: string;
  heightLevel: HeightLevel;
}

const colorMap: Record<ColorLevel, { bg: string; hover: string; text: string }> = {
  1: { bg: "#dbeeff", hover: "#c4e0ff", text: "#0058b3" },
  2: { bg: "#b3d4ff", hover: "#99c9ff", text: "#0058b3" },
  3: { bg: "#6eb3ff", hover: "#5aa8ff", text: "#ffffff" },
  4: { bg: "#2d8eff", hover: "#1a84ff", text: "#ffffff" },
  5: { bg: "#0071e3", hover: "#005ec4", text: "#ffffff" },
  6: { bg: "#004aad", hover: "#003d8f", text: "#ffffff" },
};

const heightMap: Record<HeightLevel, number> = { sm: 108, md: 168, lg: 248 };

const INITIAL_COUNT = 36;
const LOAD_BATCH = 24;
const NUM_COLS = 6;

const allDatasets: HeatmapItem[] = [
  { id: 1,  title: "脑部MRI肿瘤分割数据集",     subtitle: "磁共振成像 (MRI)",          tags: ["脑部","分割"],    colorLevel: 5, samples: "12.4K", size: "186 GB",  heightLevel: "lg" },
  { id: 2,  title: "颅脑影像库",                 subtitle: "磁共振成像 (MRI)",          tags: ["神经","分类"],    colorLevel: 6, samples: "9.1K",  size: "203 GB",  heightLevel: "lg" },
  { id: 3,  title: "内窥镜息肉检测",             subtitle: "内窥镜影像",                tags: ["消化","检测"],    colorLevel: 6, samples: "14.6K", size: "156 GB",  heightLevel: "lg" },
  { id: 4,  title: "病理切片数字化数据集",       subtitle: "病理组织学 (LAB)",          tags: ["病理","细胞"],    colorLevel: 6, samples: "11.2K", size: "342 GB",  heightLevel: "lg" },
  { id: 5,  title: "肺结节CT专题数据集",         subtitle: "计算机断层扫描 (CT)",       tags: ["肺部","结节"],    colorLevel: 4, samples: "5.7K",  size: "128 GB",  heightLevel: "md" },
  { id: 6,  title: "X射线胸部影像集",            subtitle: "X射线影像 (XRAY)",          tags: ["胸部"],           colorLevel: 3, samples: "8.2K",  size: "45 GB",   heightLevel: "md" },
  { id: 7,  title: "乳腺钼靶筛查数据集",         subtitle: "X射线影像",                 tags: ["乳腺","检测"],    colorLevel: 5, samples: "8.9K",  size: "52 GB",   heightLevel: "md" },
  { id: 8,  title: "脊柱MRI数据集",              subtitle: "磁共振成像 (MRI)",          tags: ["脊柱","分割"],    colorLevel: 4, samples: "3.8K",  size: "94 GB",   heightLevel: "md" },
  { id: 9,  title: "眼底图像数据集",             subtitle: "眼科影像",                  tags: ["眼底","分类"],    colorLevel: 1, samples: "2.4K",  size: "8.6 GB",  heightLevel: "sm" },
  { id: 10, title: "心电图ECG数据",              subtitle: "心脏电生理",                tags: ["心脏","ECG"],     colorLevel: 3, samples: "15K",   size: "3.2 GB",  heightLevel: "md" },
  { id: 11, title: "皮肤病变分类",               subtitle: "皮肤镜影像",                tags: ["皮肤科"],         colorLevel: 2, samples: "6.3K",  size: "24 GB",   heightLevel: "sm" },
  { id: 12, title: "冠状动脉CTA",                subtitle: "计算机断层扫描 (CT)",       tags: ["心脏","血管"],    colorLevel: 5, samples: "4.2K",  size: "76 GB",   heightLevel: "md" },
  { id: 13, title: "骨骼X光影像库",              subtitle: "X射线影像",                 tags: ["骨科"],           colorLevel: 3, samples: "4.6K",  size: "28 GB",   heightLevel: "sm" },
  { id: 14, title: "前列腺MRI分割",              subtitle: "磁共振成像 (MRI)",          tags: ["泌尿","分割"],    colorLevel: 5, samples: "2.9K",  size: "67 GB",   heightLevel: "md" },
  { id: 15, title: "糖尿病视网膜病变数据集",     subtitle: "眼科影像",                  tags: ["眼底","分级"],    colorLevel: 6, samples: "1.8K",  size: "6.4 GB",  heightLevel: "sm" },
  { id: 16, title: "甲状腺超声数据",             subtitle: "声学超声影像 (US)",         tags: ["甲状腺"],         colorLevel: 2, samples: "6.7K",  size: "32 GB",   heightLevel: "sm" },
  { id: 17, title: "儿科胸部X光集",              subtitle: "X射线影像",                 tags: ["儿科","胸部"],    colorLevel: 4, samples: "9.3K",  size: "54 GB",   heightLevel: "md" },
  { id: 18, title: "肾脏超声分割",               subtitle: "声学超声影像 (US)",         tags: ["肾脏"],           colorLevel: 1, samples: "3.4K",  size: "15 GB",   heightLevel: "sm" },
  { id: 19, title: "肝脏超声影像",               subtitle: "声学超声影像 (US)",         tags: ["肝脏"],           colorLevel: 4, samples: "7.1K",  size: "38 GB",   heightLevel: "sm" },
  { id: 20, title: "脑电波EEG神经电生理数据集",  subtitle: "神经电生理",                tags: ["神经","EEG"],     colorLevel: 3, samples: "5.5K",  size: "4.8 GB",  heightLevel: "sm" },
  { id: 21, title: "白内障手术显微影像数据库",   subtitle: "眼科显微影像",              tags: ["眼科"],           colorLevel: 5, samples: "2.1K",  size: "48 GB",   heightLevel: "sm" },
  { id: 22, title: "肺炎X射线分类数据集",        subtitle: "X射线影像",                 tags: ["胸部","分类"],    colorLevel: 2, samples: "5.2K",  size: "31 GB",   heightLevel: "sm" },
  { id: 23, title: "颅脑CT急诊影像库",           subtitle: "计算机断层扫描 (CT)",       tags: ["神经","急诊"],    colorLevel: 6, samples: "7.8K",  size: "168 GB",  heightLevel: "lg" },
  { id: 24, title: "超声心动图分析数据集",       subtitle: "声学超声影像 (US)",         tags: ["心脏"],           colorLevel: 4, samples: "4.9K",  size: "26 GB",   heightLevel: "sm" },
  { id: 25, title: "膝关节MRI软骨分割",          subtitle: "磁共振成像 (MRI)",          tags: ["骨科","分割"],    colorLevel: 3, samples: "4.2K",  size: "88 GB",   heightLevel: "md" },
  { id: 26, title: "肺癌病理WSI库",              subtitle: "病理组织学 (LAB)",          tags: ["肺部","病理"],    colorLevel: 6, samples: "8.4K",  size: "520 GB",  heightLevel: "lg" },
  { id: 27, title: "颈动脉超声斑块检测",         subtitle: "声学超声影像 (US)",         tags: ["颈部","血管"],    colorLevel: 3, samples: "3.6K",  size: "22 GB",   heightLevel: "sm" },
  { id: 28, title: "心脏电影MRI分割",            subtitle: "磁共振成像 (MRI)",          tags: ["心脏","分割"],    colorLevel: 6, samples: "5.1K",  size: "143 GB",  heightLevel: "md" },
  { id: 29, title: "结直肠癌病理数据集",         subtitle: "病理组织学 (LAB)",          tags: ["消化","病理"],    colorLevel: 5, samples: "6.8K",  size: "280 GB",  heightLevel: "md" },
  { id: 30, title: "视网膜OCT分层分析",          subtitle: "眼科影像 (OCT)",            tags: ["眼部","分割"],    colorLevel: 5, samples: "3.9K",  size: "18 GB",   heightLevel: "md" },
  { id: 31, title: "脑卒中MRI急诊影像库",        subtitle: "磁共振成像 (MRI)",          tags: ["神经","急诊"],    colorLevel: 6, samples: "6.2K",  size: "175 GB",  heightLevel: "lg" },
  { id: 32, title: "骨骼CT三维重建数据集",       subtitle: "计算机断层扫描 (CT)",       tags: ["骨科","重建"],    colorLevel: 4, samples: "2.8K",  size: "95 GB",   heightLevel: "sm" },
  { id: 33, title: "乳腺超声结节检测",           subtitle: "声学超声影像 (US)",         tags: ["乳腺","检测"],    colorLevel: 5, samples: "7.3K",  size: "44 GB",   heightLevel: "md" },
  { id: 34, title: "心律失常ECG分类库",          subtitle: "心脏电生理",                tags: ["心脏","分类"],    colorLevel: 4, samples: "22.5K", size: "8.6 GB",  heightLevel: "lg" },
  { id: 35, title: "胰腺CT分割数据集",           subtitle: "计算机断层扫描 (CT)",       tags: ["腹部","分割"],    colorLevel: 6, samples: "1.6K",  size: "112 GB",  heightLevel: "md" },
  { id: 36, title: "黄斑变性OCT数据集",          subtitle: "眼科影像 (OCT)",            tags: ["眼部","分级"],    colorLevel: 4, samples: "3.2K",  size: "14 GB",   heightLevel: "sm" },
  { id: 37, title: "胃镜病变检测数据库",         subtitle: "内窥镜影像",                tags: ["消化","检测"],    colorLevel: 5, samples: "9.6K",  size: "82 GB",   heightLevel: "lg" },
  { id: 38, title: "脊柱侧弯X光数据集",          subtitle: "X射线影像",                 tags: ["脊柱","分类"],    colorLevel: 3, samples: "2.1K",  size: "16 GB",   heightLevel: "sm" },
  { id: 39, title: "乳腺癌病理切片库",           subtitle: "病理组织学 (LAB)",          tags: ["乳腺","病理"],    colorLevel: 5, samples: "9.2K",  size: "410 GB",  heightLevel: "lg" },
  { id: 40, title: "腰椎间盘MRI数据集",          subtitle: "磁共振成像 (MRI)",          tags: ["脊柱","分割"],    colorLevel: 4, samples: "3.5K",  size: "78 GB",   heightLevel: "sm" },
  { id: 41, title: "结肠镜腺瘤识别数据集",       subtitle: "内窥镜影像",                tags: ["消化","检测"],    colorLevel: 5, samples: "8.1K",  size: "68 GB",   heightLevel: "md" },
  { id: 42, title: "肝脏MRI增强扫描",            subtitle: "磁共振成像 (MRI)",          tags: ["腹部","分割"],    colorLevel: 4, samples: "3.1K",  size: "124 GB",  heightLevel: "sm" },
  { id: 43, title: "宫颈癌TCT细胞学数据集",      subtitle: "细胞学影像",                tags: ["妇科","分类"],    colorLevel: 4, samples: "5.4K",  size: "36 GB",   heightLevel: "sm" },
  { id: 44, title: "PET-CT融合影像库",           subtitle: "核医学影像",                tags: ["全身","融合"],    colorLevel: 5, samples: "2.3K",  size: "198 GB",  heightLevel: "md" },
  { id: 45, title: "前列腺癌Gleason分级",        subtitle: "病理组织学 (LAB)",          tags: ["泌尿","分级"],    colorLevel: 5, samples: "4.7K",  size: "230 GB",  heightLevel: "md" },
  { id: 46, title: "头颈部CTA数据集",            subtitle: "计算机断层扫描 (CT)",       tags: ["颈部","血管"],    colorLevel: 5, samples: "3.8K",  size: "156 GB",  heightLevel: "md" },
  { id: 47, title: "睡眠EEG分期数据集",          subtitle: "神经电生理",                tags: ["神经","分类"],    colorLevel: 3, samples: "4.1K",  size: "12 GB",   heightLevel: "sm" },
  { id: 48, title: "黑色素瘤皮肤镜库",           subtitle: "皮肤镜影像",                tags: ["皮肤","分类"],    colorLevel: 5, samples: "5.8K",  size: "42 GB",   heightLevel: "sm" },
  { id: 49, title: "多模态脑部数据集",           subtitle: "MRI / PET / CT",            tags: ["神经","多模态"],  colorLevel: 6, samples: "1.9K",  size: "386 GB",  heightLevel: "lg" },
  { id: 50, title: "牙科全景X光数据集",          subtitle: "X射线影像",                 tags: ["口腔","检测"],    colorLevel: 2, samples: "3.8K",  size: "19 GB",   heightLevel: "sm" },
  { id: 51, title: "产科超声胎儿测量",           subtitle: "声学超声影像 (US)",         tags: ["产科","测量"],    colorLevel: 4, samples: "6.2K",  size: "48 GB",   heightLevel: "md" },
  { id: 52, title: "腹主动脉CTA数据集",          subtitle: "计算机断层扫描 (CT)",       tags: ["腹部","血管"],    colorLevel: 3, samples: "1.8K",  size: "86 GB",   heightLevel: "sm" },
  { id: 53, title: "肺气肿CT定量分析",           subtitle: "计算机断层扫描 (CT)",       tags: ["肺部","分级"],    colorLevel: 3, samples: "2.6K",  size: "74 GB",   heightLevel: "sm" },
  { id: 54, title: "支气管镜影像数据集",         subtitle: "内窥镜影像",                tags: ["肺部","检测"],    colorLevel: 3, samples: "4.4K",  size: "38 GB",   heightLevel: "sm" },
  { id: 55, title: "小肠胶囊内镜数据集",         subtitle: "内窥镜影像",                tags: ["消化","分类"],    colorLevel: 4, samples: "7.8K",  size: "92 GB",   heightLevel: "md" },
  { id: 56, title: "腹腔镜手术影像库",           subtitle: "内窥镜影像",                tags: ["外科","分割"],    colorLevel: 3, samples: "3.2K",  size: "145 GB",  heightLevel: "md" },
  { id: 57, title: "肾脏CT泌尿系成像",           subtitle: "计算机断层扫描 (CT)",       tags: ["泌尿","检测"],    colorLevel: 3, samples: "2.4K",  size: "68 GB",   heightLevel: "sm" },
  { id: 58, title: "青光眼眼底筛查数据集",       subtitle: "眼科影像",                  tags: ["眼部","分类"],    colorLevel: 4, samples: "4.6K",  size: "22 GB",   heightLevel: "sm" },
  { id: 59, title: "心房颤动ECG监测数据",        subtitle: "心脏电生理",                tags: ["心脏","检测"],    colorLevel: 5, samples: "12.8K", size: "5.4 GB",  heightLevel: "md" },
  { id: 60, title: "急诊多创伤影像库",           subtitle: "CT / X-Ray 混合",           tags: ["急诊","多模态"],  colorLevel: 5, samples: "3.1K",  size: "218 GB",  heightLevel: "md" },
  { id: 61, title: "脑白质病变MRI数据集",        subtitle: "磁共振成像 (MRI)",          tags: ["神经","分割"],    colorLevel: 5, samples: "2.8K",  size: "116 GB",  heightLevel: "sm" },
  { id: 62, title: "淋巴瘤病理分类数据集",       subtitle: "病理组织学 (LAB)",          tags: ["血液","分类"],    colorLevel: 3, samples: "3.6K",  size: "188 GB",  heightLevel: "sm" },
  { id: 63, title: "胆囊超声数据集",             subtitle: "声学超声影像 (US)",         tags: ["腹部","检测"],    colorLevel: 2, samples: "2.9K",  size: "18 GB",   heightLevel: "sm" },
  { id: 64, title: "鼻窦CT数据集",               subtitle: "计算机断层扫描 (CT)",       tags: ["头颈","分割"],    colorLevel: 2, samples: "1.6K",  size: "42 GB",   heightLevel: "sm" },
  { id: 65, title: "肝癌病理数字切片",           subtitle: "病理组织学 (LAB)",          tags: ["腹部","病理"],    colorLevel: 5, samples: "4.2K",  size: "290 GB",  heightLevel: "md" },
  { id: 66, title: "皮肤血管瘤影像数据集",       subtitle: "皮肤镜影像",                tags: ["皮肤","分类"],    colorLevel: 2, samples: "1.8K",  size: "12 GB",   heightLevel: "sm" },
  { id: 67, title: "膀胱超声数据集",             subtitle: "声学超声影像 (US)",         tags: ["泌尿","分割"],    colorLevel: 2, samples: "2.2K",  size: "16 GB",   heightLevel: "sm" },
  { id: 68, title: "肩关节MRI影像数据集",        subtitle: "磁共振成像 (MRI)",          tags: ["骨科","分割"],    colorLevel: 2, samples: "1.9K",  size: "56 GB",   heightLevel: "sm" },
  { id: 69, title: "手腕骨折X光数据集",          subtitle: "X射线影像",                 tags: ["骨科","检测"],    colorLevel: 3, samples: "5.4K",  size: "28 GB",   heightLevel: "sm" },
  { id: 70, title: "胃癌病理影像数据库",         subtitle: "病理组织学 (LAB)",          tags: ["消化","病理"],    colorLevel: 4, samples: "3.8K",  size: "215 GB",  heightLevel: "md" },
  { id: 71, title: "卵巢超声数据集",             subtitle: "声学超声影像 (US)",         tags: ["妇科","分类"],    colorLevel: 3, samples: "2.6K",  size: "20 GB",   heightLevel: "sm" },
  { id: 72, title: "髋关节MRI数据集",            subtitle: "磁共振成像 (MRI)",          tags: ["骨科","分割"],    colorLevel: 2, samples: "1.4K",  size: "48 GB",   heightLevel: "sm" },
  { id: 73, title: "银屑病皮肤镜数据集",         subtitle: "皮肤镜影像",                tags: ["皮肤","分级"],    colorLevel: 3, samples: "3.2K",  size: "26 GB",   heightLevel: "sm" },
  { id: 74, title: "垂体MRI数据集",              subtitle: "磁共振成像 (MRI)",          tags: ["神经","分割"],    colorLevel: 3, samples: "1.8K",  size: "52 GB",   heightLevel: "sm" },
  { id: 75, title: "前列腺超声分割数据集",       subtitle: "声学超声影像 (US)",         tags: ["泌尿","分割"],    colorLevel: 3, samples: "2.8K",  size: "24 GB",   heightLevel: "sm" },
  { id: 76, title: "下肢CTA数据集",              subtitle: "计算机断层扫描 (CT)",       tags: ["骨科","血管"],    colorLevel: 3, samples: "1.6K",  size: "78 GB",   heightLevel: "sm" },
  { id: 77, title: "角膜地形图数据集",           subtitle: "眼科影像",                  tags: ["眼部","分析"],    colorLevel: 2, samples: "2.4K",  size: "6 GB",    heightLevel: "sm" },
  { id: 78, title: "子宫MRI影像库",              subtitle: "磁共振成像 (MRI)",          tags: ["妇科","分割"],    colorLevel: 2, samples: "1.6K",  size: "64 GB",   heightLevel: "sm" },
  { id: 79, title: "脾脏超声影像库",             subtitle: "声学超声影像 (US)",         tags: ["腹部","分割"],    colorLevel: 1, samples: "1.4K",  size: "12 GB",   heightLevel: "sm" },
  { id: 80, title: "宫腔镜影像数据集",           subtitle: "内窥镜影像",                tags: ["妇科","检测"],    colorLevel: 2, samples: "1.8K",  size: "28 GB",   heightLevel: "sm" },
  { id: 81, title: "鼻咽部MRI数据集",            subtitle: "磁共振成像 (MRI)",          tags: ["头颈","分类"],    colorLevel: 3, samples: "2.2K",  size: "82 GB",   heightLevel: "sm" },
  { id: 82, title: "基底细胞癌皮肤镜数据集",     subtitle: "皮肤镜影像",                tags: ["皮肤","分类"],    colorLevel: 4, samples: "4.1K",  size: "34 GB",   heightLevel: "sm" },
  { id: 83, title: "骨质疏松CT定量数据集",       subtitle: "计算机断层扫描 (CT)",       tags: ["骨科","分级"],    colorLevel: 3, samples: "2.8K",  size: "62 GB",   heightLevel: "sm" },
  { id: 84, title: "长程Holter心电数据集",       subtitle: "心脏电生理",                tags: ["心脏","检测"],    colorLevel: 4, samples: "8.6K",  size: "7.2 GB",  heightLevel: "sm" },
  { id: 85, title: "足踝X光数据集",              subtitle: "X射线影像",                 tags: ["骨科","检测"],    colorLevel: 2, samples: "2.6K",  size: "14 GB",   heightLevel: "sm" },
  { id: 86, title: "膝关节X光骨关节炎分级",      subtitle: "X射线影像",                 tags: ["骨科","分级"],    colorLevel: 3, samples: "4.2K",  size: "22 GB",   heightLevel: "sm" },
  { id: 87, title: "骨龄X光评估数据集",          subtitle: "X射线影像",                 tags: ["儿科","分析"],    colorLevel: 2, samples: "3.4K",  size: "18 GB",   heightLevel: "sm" },
  { id: 88, title: "颈椎MRI神经压迫数据集",      subtitle: "磁共振成像 (MRI)",          tags: ["脊柱","检测"],    colorLevel: 4, samples: "2.6K",  size: "72 GB",   heightLevel: "sm" },
  { id: 89, title: "甲状旁腺超声数据集",         subtitle: "声学超声影像 (US)",         tags: ["颈部","检测"],    colorLevel: 2, samples: "1.2K",  size: "8 GB",    heightLevel: "sm" },
  { id: 90, title: "肺结核X光检测数据集",        subtitle: "X射线影像",                 tags: ["胸部","检测"],    colorLevel: 4, samples: "6.8K",  size: "38 GB",   heightLevel: "md" },
  { id: 91, title: "儿科综合影像数据集",         subtitle: "CT / X-Ray 混合",           tags: ["儿科","多模态"],  colorLevel: 3, samples: "4.2K",  size: "124 GB",  heightLevel: "sm" },
  { id: 92, title: "结直肠CT影像库",             subtitle: "计算机断层扫描 (CT)",       tags: ["消化","检测"],    colorLevel: 4, samples: "3.6K",  size: "92 GB",   heightLevel: "sm" },
  { id: 93, title: "皮肤黑色素瘤病理数据集",     subtitle: "病理组织学 (LAB)",          tags: ["皮肤","病理"],    colorLevel: 4, samples: "4.8K",  size: "162 GB",  heightLevel: "sm" },
  { id: 94, title: "罕见病影像标注集",           subtitle: "多模态影像",                tags: ["罕见病","标注"],  colorLevel: 4, samples: "1.2K",  size: "186 GB",  heightLevel: "sm" },
  { id: 95, title: "脑膜瘤MRI数据集",            subtitle: "磁共振成像 (MRI)",          tags: ["神经","分割"],    colorLevel: 4, samples: "2.4K",  size: "96 GB",   heightLevel: "sm" },
  { id: 96, title: "肾上腺CT影像数据集",         subtitle: "计算机断层扫描 (CT)",       tags: ["腹部","检测"],    colorLevel: 2, samples: "1.4K",  size: "48 GB",   heightLevel: "sm" },
  { id: 97, title: "乳腺MRI肿块检测数据集",      subtitle: "磁共振成像 (MRI)",          tags: ["乳腺","检测"],    colorLevel: 5, samples: "3.6K",  size: "138 GB",  heightLevel: "md" },
  { id: 98, title: "腹腔镜胆囊切除术影像",       subtitle: "内窥镜影像",                tags: ["外科","分割"],    colorLevel: 3, samples: "2.8K",  size: "92 GB",   heightLevel: "sm" },
  { id: 99, title: "肺纤维化HRCT数据集",         subtitle: "计算机断层扫描 (CT)",       tags: ["肺部","分级"],    colorLevel: 4, samples: "2.2K",  size: "118 GB",  heightLevel: "sm" },
  { id: 100, title: "全身PET核医学影像库",       subtitle: "核医学影像 (PET)",          tags: ["全身","检测"],    colorLevel: 5, samples: "1.6K",  size: "246 GB",  heightLevel: "md" },
];

// 贪心算法：始终往最短列追加，保证确定性（同样输入同样结果）
function distributeToColumns(items: HeatmapItem[], numCols: number): HeatmapItem[][] {
  const columns: HeatmapItem[][] = Array.from({ length: numCols }, () => []);
  const heights = Array(numCols).fill(0);
  for (const item of items) {
    const col = heights.indexOf(Math.min(...heights));
    columns[col].push(item);
    heights[col] += heightMap[item.heightLevel] + 6;
  }
  return columns;
}

export function DataHeatmap() {
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const hasMore = visibleCount < allDatasets.length;
  const visibleItems = allDatasets.slice(0, visibleCount);
  const columns = useMemo(() => distributeToColumns(visibleItems, NUM_COLS), [visibleCount]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore) {
          setLoadingMore(true);
          setTimeout(() => {
            setVisibleCount((prev) => Math.min(prev + LOAD_BATCH, allDatasets.length));
            setLoadingMore(false);
          }, 400);
        }
      },
      { threshold: 0.1 }
    );
    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [hasMore, loadingMore]);

  return (
    <div>
      {/* 瀑布流主体 */}
      <div className="flex gap-1.5">
        {columns.map((col, colIdx) => (
          <div key={colIdx} className="flex-1 flex flex-col gap-1.5 min-w-0">
            {col.map((item) => {
              const colors = colorMap[item.colorLevel];
              const isHovered = hoveredId === item.id;
              const isDark = item.colorLevel >= 3;
              const h = heightMap[item.heightLevel];

              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => navigate(`/dataset/${item.id}`)}
                  style={{
                    height: `${h}px`,
                    backgroundColor: colors.bg,
                    borderRadius: "12px",
                    cursor: "pointer",
                    position: "relative",
                    overflow: isHovered ? "visible" : "hidden",
                    transform: isHovered ? "scale(1.05)" : "scale(1)",
                    zIndex: isHovered ? 20 : 1,
                    transition: "transform 0.28s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.28s ease",
                    boxShadow: isHovered
                      ? "0 12px 40px rgba(0,113,227,0.35), 0 4px 16px rgba(0,0,0,0.14)"
                      : "none",
                  }}
                >
                  {/* 装饰圆 */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "-20px",
                      right: "-20px",
                      width: "64px",
                      height: "64px",
                      borderRadius: "50%",
                      backgroundColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,113,227,0.08)",
                      opacity: isHovered ? 0 : 1,
                      transition: "opacity 0.2s ease",
                      pointerEvents: "none",
                    }}
                  />

                  {/* 默认态 */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      padding: "12px 14px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                      opacity: isHovered ? 0 : 1,
                      transition: "opacity 0.15s ease",
                      pointerEvents: "none",
                    }}
                  >
                    <p style={{
                      fontSize: "12px",
                      fontWeight: 500,
                      color: colors.text,
                      lineHeight: 1.45,
                      margin: 0,
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: item.heightLevel === "sm" ? 1 : 2,
                      WebkitBoxOrient: "vertical",
                    }}>
                      {item.title}
                    </p>
                  </div>

                  {/* 悬浮态 */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      minHeight: "100%",
                      padding: "14px 16px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      gap: "8px",
                      opacity: isHovered ? 1 : 0,
                      transition: "opacity 0.2s ease 0.06s",
                      pointerEvents: isHovered ? "auto" : "none",
                      backgroundColor: colors.hover,
                      borderRadius: "12px",
                      boxSizing: "border-box",
                    }}
                  >
                    <div>
                      <p style={{ fontSize: "13px", fontWeight: 600, color: colors.text, lineHeight: 1.4, margin: 0, marginBottom: "3px" }}>
                        {item.title}
                      </p>
                      <p style={{ fontSize: "11px", color: isDark ? "rgba(255,255,255,0.6)" : "rgba(0,74,173,0.6)", margin: 0 }}>
                        {item.subtitle}
                      </p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      <div style={{ display: "flex", gap: "10px", fontSize: "11px" }}>
                        <span style={{ color: isDark ? "rgba(255,255,255,0.55)" : "rgba(0,74,173,0.5)" }}>
                          样本量 {item.samples}
                        </span>
                        <span style={{ color: isDark ? "rgba(255,255,255,0.55)" : "rgba(0,74,173,0.5)" }}>
                          {item.size}
                        </span>
                      </div>
                      <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            style={{
                              fontSize: "10px",
                              padding: "2px 7px",
                              borderRadius: "20px",
                              backgroundColor: isDark ? "rgba(255,255,255,0.18)" : "rgba(0,113,227,0.1)",
                              color: colors.text,
                              border: `1px solid ${isDark ? "rgba(255,255,255,0.22)" : "rgba(0,113,227,0.2)"}`,
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); navigate(`/dataset/${item.id}`); }}
                        style={{ fontSize: "11px", fontWeight: 500, color: colors.text, background: "none", border: "none", padding: 0, cursor: "pointer", textAlign: "left", opacity: 0.85 }}
                      >
                        查看详情 ›
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* 加载触发哨兵 */}
      <div ref={sentinelRef} className="mt-6 flex items-center justify-center h-10">
        {loadingMore && (
          <div className="flex items-center gap-2 text-xs text-[#86868b]">
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="h-1.5 w-1.5 rounded-full bg-[#0071e3] animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
            加载更多数据集
          </div>
        )}
        {!hasMore && !loadingMore && (
          <p className="text-xs text-[#86868b]">
            已展示全部 <span className="font-medium text-[#1d1d1f]">{allDatasets.length}</span> 个数据集
          </p>
        )}
      </div>
    </div>
  );
}
