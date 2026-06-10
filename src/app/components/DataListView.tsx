import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

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
  indication: string[];
  scale: 'small' | 'medium' | 'large' | 'xlarge';
}

export const dataItems: DataItem[] = [
  { id: 1,  title: "脑部MRI肿瘤分割数据集",      subtitle: "磁共振成像 (MRI)",        tags: ["脑部","分割"],      colorLevel: 5, samples: "12.4K", size: "186 GB",  source: { type: 'platform',     name: 'iMedLoop' },              modality: 'MRI',    anatomy: ['脑部'],           indication: ['肿瘤','分割'],   scale: 'xlarge' },
  { id: 2,  title: "颅脑影像库",                  subtitle: "磁共振成像 (MRI)",        tags: ["神经","分类"],      colorLevel: 6, samples: "9.1K",  size: "203 GB",  source: { type: 'external',     name: 'OASIS脑影像数据库' },  modality: 'MRI',    anatomy: ['脑部'],           indication: ['通用'],          scale: 'xlarge' },
  { id: 3,  title: "内窥镜息肉检测",              subtitle: "内窥镜影像",              tags: ["消化","检测"],      colorLevel: 6, samples: "14.6K", size: "156 GB",  source: { type: 'institution',  name: '消化病医院' },          modality: '内窥镜', anatomy: ['消化道'],         indication: ['息肉','检测'],   scale: 'large'  },
  { id: 4,  title: "病理切片数字化数据集",        subtitle: "病理组织学 (LAB)",        tags: ["病理","细胞"],      colorLevel: 6, samples: "11.2K", size: "342 GB",  source: { type: 'institution',  name: '中山大学病理中心' },   modality: '病理',   anatomy: ['全身'],           indication: ['肿瘤','细胞'],   scale: 'xlarge' },
  { id: 5,  title: "肺结节CT专题数据集",          subtitle: "计算机断层扫描 (CT)",     tags: ["肺部","结节"],      colorLevel: 4, samples: "5.7K",  size: "128 GB",  source: { type: 'platform',     name: 'iMedLoop' },              modality: 'CT',     anatomy: ['胸部','肺部'],    indication: ['结节','检测'],   scale: 'large'  },
  { id: 6,  title: "X射线胸部影像集",             subtitle: "X射线影像 (XRAY)",        tags: ["胸部"],             colorLevel: 3, samples: "8.2K",  size: "45 GB",   source: { type: 'institution',  name: '协和医院影像中心' },   modality: 'X-Ray',  anatomy: ['胸部'],           indication: ['通用'],          scale: 'medium' },
  { id: 7,  title: "乳腺钼靶筛查数据集",          subtitle: "X射线影像",               tags: ["乳腺","检测"],      colorLevel: 5, samples: "8.9K",  size: "52 GB",   source: { type: 'platform',     name: 'iMedLoop' },              modality: 'X-Ray',  anatomy: ['胸部'],           indication: ['肿瘤','检测'],   scale: 'large'  },
  { id: 8,  title: "脊柱MRI数据集",               subtitle: "磁共振成像 (MRI)",        tags: ["脊柱","分割"],      colorLevel: 4, samples: "3.8K",  size: "94 GB",   source: { type: 'institution',  name: '北医三院骨科' },       modality: 'MRI',    anatomy: ['脊柱'],           indication: ['分割'],          scale: 'large'  },
  { id: 9,  title: "眼底图像数据集",              subtitle: "眼科影像",                tags: ["眼底","分类"],      colorLevel: 1, samples: "2.4K",  size: "8.6 GB",  source: { type: 'external',     name: 'EyePACS数据联盟' },   modality: '眼科影像',anatomy: ['眼部'],           indication: ['分类'],          scale: 'small'  },
  { id: 10, title: "心电图ECG数据",               subtitle: "心脏电生理",              tags: ["心脏","ECG"],       colorLevel: 3, samples: "15K",   size: "3.2 GB",  source: { type: 'platform',     name: 'iMedLoop' },              modality: 'ECG',    anatomy: ['心脏'],           indication: ['通用'],          scale: 'small'  },
  { id: 11, title: "皮肤病变分类",                subtitle: "皮肤镜影像",              tags: ["皮肤科"],           colorLevel: 2, samples: "6.3K",  size: "24 GB",   source: { type: 'external',     name: 'DermNet数据库' },      modality: '皮肤镜', anatomy: ['皮肤'],           indication: ['分类','肿瘤'],   scale: 'medium' },
  { id: 12, title: "冠状动脉CTA",                 subtitle: "计算机断层扫描 (CT)",     tags: ["心脏","血管"],      colorLevel: 5, samples: "4.2K",  size: "76 GB",   source: { type: 'platform',     name: 'iMedLoop' },              modality: 'CT',     anatomy: ['心脏'],           indication: ['血管','检测'],   scale: 'large'  },
  { id: 13, title: "骨骼X光影像库",               subtitle: "X射线影像",               tags: ["骨科"],             colorLevel: 3, samples: "4.6K",  size: "28 GB",   source: { type: 'institution',  name: '上海交大附属医院' },   modality: 'X-Ray',  anatomy: ['骨骼'],           indication: ['通用'],          scale: 'medium' },
  { id: 14, title: "前列腺MRI分割",               subtitle: "磁共振成像 (MRI)",        tags: ["泌尿","分割"],      colorLevel: 5, samples: "2.9K",  size: "67 GB",   source: { type: 'platform',     name: 'iMedLoop' },              modality: 'MRI',    anatomy: ['盆腔'],           indication: ['肿瘤','分割'],   scale: 'large'  },
  { id: 15, title: "糖尿病视网膜病变数据集",      subtitle: "眼科影像",                tags: ["眼底","分级"],      colorLevel: 6, samples: "1.8K",  size: "6.4 GB",  source: { type: 'institution',  name: '中山眼科中心' },       modality: '眼科影像',anatomy: ['眼部'],           indication: ['糖尿病','分级'], scale: 'small'  },
  { id: 16, title: "甲状腺超声数据",              subtitle: "声学超声影像 (US)",       tags: ["甲状腺"],           colorLevel: 2, samples: "6.7K",  size: "32 GB",   source: { type: 'external',     name: 'Thyroid Dataset Hub' },modality: 'US',     anatomy: ['颈部'],           indication: ['结节','检测'],   scale: 'medium' },
  { id: 17, title: "儿科胸部X光集",               subtitle: "X射线影像",               tags: ["儿科","胸部"],      colorLevel: 4, samples: "9.3K",  size: "54 GB",   source: { type: 'platform',     name: 'iMedLoop' },              modality: 'X-Ray',  anatomy: ['胸部'],           indication: ['通用'],          scale: 'large'  },
  { id: 18, title: "肾脏超声分割",                subtitle: "声学超声影像 (US)",       tags: ["肾脏"],             colorLevel: 1, samples: "3.4K",  size: "15 GB",   source: { type: 'institution',  name: '浙大附属医院' },       modality: 'US',     anatomy: ['腹部','泌尿'],    indication: ['分割'],          scale: 'medium' },
  { id: 19, title: "肝脏超声影像",                subtitle: "声学超声影像 (US)",       tags: ["肝脏"],             colorLevel: 4, samples: "7.1K",  size: "38 GB",   source: { type: 'platform',     name: 'iMedLoop' },              modality: 'US',     anatomy: ['腹部'],           indication: ['通用'],          scale: 'medium' },
  { id: 20, title: "脑电波EEG神经电生理数据集",   subtitle: "神经电生理",              tags: ["神经","EEG"],       colorLevel: 3, samples: "5.5K",  size: "4.8 GB",  source: { type: 'external',     name: 'NeuroData联盟' },      modality: 'EEG',    anatomy: ['脑部'],           indication: ['通用'],          scale: 'small'  },
  { id: 21, title: "白内障手术显微影像数据库",    subtitle: "眼科显微影像",            tags: ["眼科"],             colorLevel: 5, samples: "2.1K",  size: "48 GB",   source: { type: 'institution',  name: '天津眼科医院' },       modality: '眼科影像',anatomy: ['眼部'],           indication: ['手术'],          scale: 'medium' },
  { id: 22, title: "肺炎X射线分类数据集",         subtitle: "X射线影像",               tags: ["胸部","分类"],      colorLevel: 2, samples: "5.2K",  size: "31 GB",   source: { type: 'platform',     name: 'iMedLoop' },              modality: 'X-Ray',  anatomy: ['胸部','肺部'],    indication: ['炎症','分类'],   scale: 'medium' },
  { id: 23, title: "颅脑CT急诊影像库",            subtitle: "计算机断层扫描 (CT)",     tags: ["神经","急诊"],      colorLevel: 6, samples: "7.8K",  size: "168 GB",  source: { type: 'institution',  name: '北京急救中心' },       modality: 'CT',     anatomy: ['脑部'],           indication: ['急诊'],          scale: 'xlarge' },
  { id: 24, title: "超声心动图分析数据集",        subtitle: "声学超声影像 (US)",       tags: ["心脏"],             colorLevel: 4, samples: "4.9K",  size: "26 GB",   source: { type: 'platform',     name: 'iMedLoop' },              modality: 'US',     anatomy: ['心脏'],           indication: ['通用'],          scale: 'medium' },
  { id: 25, title: "膝关节MRI软骨分割",           subtitle: "磁共振成像 (MRI)",        tags: ["骨科","分割"],      colorLevel: 3, samples: "4.2K",  size: "88 GB",   source: { type: 'institution',  name: '解放军总医院' },       modality: 'MRI',    anatomy: ['骨骼'],           indication: ['分割'],          scale: 'large'  },
  { id: 26, title: "肺癌病理WSI库",               subtitle: "病理组织学 (LAB)",        tags: ["肺部","病理"],      colorLevel: 6, samples: "8.4K",  size: "520 GB",  source: { type: 'external',     name: 'TCGA病理图像库' },     modality: '病理',   anatomy: ['胸部','肺部'],    indication: ['肿瘤'],          scale: 'xlarge' },
  { id: 27, title: "颈动脉超声斑块检测",          subtitle: "声学超声影像 (US)",       tags: ["颈部","血管"],      colorLevel: 3, samples: "3.6K",  size: "22 GB",   source: { type: 'institution',  name: '南京鼓楼医院' },       modality: 'US',     anatomy: ['颈部'],           indication: ['血管','检测'],   scale: 'medium' },
  { id: 28, title: "心脏电影MRI分割",             subtitle: "磁共振成像 (MRI)",        tags: ["心脏","分割"],      colorLevel: 6, samples: "5.1K",  size: "143 GB",  source: { type: 'platform',     name: 'iMedLoop' },              modality: 'MRI',    anatomy: ['心脏'],           indication: ['分割'],          scale: 'large'  },
  { id: 29, title: "结直肠癌病理数据集",          subtitle: "病理组织学 (LAB)",        tags: ["消化","病理"],      colorLevel: 5, samples: "6.8K",  size: "280 GB",  source: { type: 'institution',  name: '复旦大学附属肿瘤医院'},modality: '病理',   anatomy: ['消化道'],         indication: ['肿瘤'],          scale: 'xlarge' },
  { id: 30, title: "视网膜OCT分层分析",           subtitle: "眼科影像 (OCT)",          tags: ["眼部","分割"],      colorLevel: 5, samples: "3.9K",  size: "18 GB",   source: { type: 'platform',     name: 'iMedLoop' },              modality: '眼科影像',anatomy: ['眼部'],           indication: ['分割'],          scale: 'medium' },
  { id: 31, title: "脑卒中MRI急诊影像库",         subtitle: "磁共振成像 (MRI)",        tags: ["神经","急诊"],      colorLevel: 6, samples: "6.2K",  size: "175 GB",  source: { type: 'institution',  name: '武汉同济医院' },       modality: 'MRI',    anatomy: ['脑部'],           indication: ['急诊'],          scale: 'xlarge' },
  { id: 32, title: "骨骼CT三维重建数据集",        subtitle: "计算机断层扫描 (CT)",     tags: ["骨科","重建"],      colorLevel: 4, samples: "2.8K",  size: "95 GB",   source: { type: 'platform',     name: 'iMedLoop' },              modality: 'CT',     anatomy: ['骨骼'],           indication: ['通用'],          scale: 'large'  },
  { id: 33, title: "乳腺超声结节检测",            subtitle: "声学超声影像 (US)",       tags: ["乳腺","检测"],      colorLevel: 5, samples: "7.3K",  size: "44 GB",   source: { type: 'institution',  name: '中南大学湘雅医院' },   modality: 'US',     anatomy: ['胸部'],           indication: ['结节','检测'],   scale: 'medium' },
  { id: 34, title: "心律失常ECG分类库",           subtitle: "心脏电生理",              tags: ["心脏","分类"],      colorLevel: 4, samples: "22.5K", size: "8.6 GB",  source: { type: 'external',     name: 'PhysioNet心电数据库'}, modality: 'ECG',    anatomy: ['心脏'],           indication: ['分类'],          scale: 'small'  },
  { id: 35, title: "胰腺CT分割数据集",            subtitle: "计算机断层扫描 (CT)",     tags: ["腹部","分割"],      colorLevel: 6, samples: "1.6K",  size: "112 GB",  source: { type: 'institution',  name: '北京协和医学院' },     modality: 'CT',     anatomy: ['腹部'],           indication: ['肿瘤','分割'],   scale: 'large'  },
  { id: 36, title: "黄斑变性OCT数据集",           subtitle: "眼科影像 (OCT)",          tags: ["眼部","分级"],      colorLevel: 4, samples: "3.2K",  size: "14 GB",   source: { type: 'platform',     name: 'iMedLoop' },              modality: '眼科影像',anatomy: ['眼部'],           indication: ['分级'],          scale: 'medium' },
  { id: 37, title: "胃镜病变检测数据库",          subtitle: "内窥镜影像",              tags: ["消化","检测"],      colorLevel: 5, samples: "9.6K",  size: "82 GB",   source: { type: 'institution',  name: '上海市第一人民医院' }, modality: '内窥镜', anatomy: ['消化道'],         indication: ['检测'],          scale: 'large'  },
  { id: 38, title: "脊柱侧弯X光数据集",           subtitle: "X射线影像",               tags: ["脊柱","分类"],      colorLevel: 3, samples: "2.1K",  size: "16 GB",   source: { type: 'institution',  name: '北医三院骨科' },       modality: 'X-Ray',  anatomy: ['脊柱'],           indication: ['分类'],          scale: 'medium' },
  { id: 39, title: "乳腺癌病理切片库",            subtitle: "病理组织学 (LAB)",        tags: ["乳腺","病理"],      colorLevel: 5, samples: "9.2K",  size: "410 GB",  source: { type: 'external',     name: 'TCGA病理图像库' },     modality: '病理',   anatomy: ['胸部'],           indication: ['肿瘤'],          scale: 'xlarge' },
  { id: 40, title: "腰椎间盘MRI数据集",           subtitle: "磁共振成像 (MRI)",        tags: ["脊柱","分割"],      colorLevel: 4, samples: "3.5K",  size: "78 GB",   source: { type: 'platform',     name: 'iMedLoop' },              modality: 'MRI',    anatomy: ['脊柱'],           indication: ['分割'],          scale: 'large'  },
  { id: 41, title: "结肠镜腺瘤识别数据集",        subtitle: "内窥镜影像",              tags: ["消化","检测"],      colorLevel: 5, samples: "8.1K",  size: "68 GB",   source: { type: 'institution',  name: '广州医科大学附属医院' }, modality: '内窥镜', anatomy: ['消化道'],         indication: ['息肉','检测'],   scale: 'large'  },
  { id: 42, title: "肝脏MRI增强扫描",             subtitle: "磁共振成像 (MRI)",        tags: ["腹部","分割"],      colorLevel: 4, samples: "3.1K",  size: "124 GB",  source: { type: 'platform',     name: 'iMedLoop' },              modality: 'MRI',    anatomy: ['腹部'],           indication: ['肿瘤','分割'],   scale: 'large'  },
  { id: 43, title: "宫颈癌TCT细胞学数据集",       subtitle: "细胞学影像",              tags: ["妇科","分类"],      colorLevel: 4, samples: "5.4K",  size: "36 GB",   source: { type: 'institution',  name: '复旦大学附属肿瘤医院' }, modality: '病理',   anatomy: ['盆腔'],           indication: ['肿瘤','分类'],   scale: 'medium' },
  { id: 44, title: "PET-CT融合影像库",            subtitle: "核医学影像",              tags: ["全身","融合"],      colorLevel: 5, samples: "2.3K",  size: "198 GB",  source: { type: 'institution',  name: '解放军总医院' },       modality: 'CT',     anatomy: ['全身'],           indication: ['肿瘤'],          scale: 'xlarge' },
  { id: 45, title: "前列腺癌Gleason分级",         subtitle: "病理组织学 (LAB)",        tags: ["泌尿","分级"],      colorLevel: 5, samples: "4.7K",  size: "230 GB",  source: { type: 'external',     name: 'TCGA病理图像库' },     modality: '病理',   anatomy: ['盆腔'],           indication: ['肿瘤','分级'],   scale: 'xlarge' },
  { id: 46, title: "头颈部CTA数据集",             subtitle: "计算机断层扫描 (CT)",     tags: ["颈部","血管"],      colorLevel: 5, samples: "3.8K",  size: "156 GB",  source: { type: 'platform',     name: 'iMedLoop' },              modality: 'CT',     anatomy: ['颈部'],           indication: ['血管'],          scale: 'large'  },
  { id: 47, title: "睡眠EEG分期数据集",           subtitle: "神经电生理",              tags: ["神经","分类"],      colorLevel: 3, samples: "4.1K",  size: "12 GB",   source: { type: 'external',     name: 'PhysioNet心电数据库'}, modality: 'EEG',    anatomy: ['脑部'],           indication: ['分类'],          scale: 'medium' },
  { id: 48, title: "黑色素瘤皮肤镜库",            subtitle: "皮肤镜影像",              tags: ["皮肤","分类"],      colorLevel: 5, samples: "5.8K",  size: "42 GB",   source: { type: 'external',     name: 'DermNet数据库' },      modality: '皮肤镜', anatomy: ['皮肤'],           indication: ['肿瘤','分类'],   scale: 'medium' },
  { id: 49, title: "多模态脑部数据集",            subtitle: "MRI / PET / CT",          tags: ["神经","多模态"],    colorLevel: 6, samples: "1.9K",  size: "386 GB",  source: { type: 'external',     name: 'UK Biobank影像库' },   modality: 'MRI',    anatomy: ['脑部'],           indication: ['通用'],          scale: 'xlarge' },
  { id: 50, title: "牙科全景X光数据集",           subtitle: "X射线影像",               tags: ["口腔","检测"],      colorLevel: 2, samples: "3.8K",  size: "19 GB",   source: { type: 'institution',  name: '四川大学华西口腔医院' }, modality: 'X-Ray',  anatomy: ['骨骼'],           indication: ['检测'],          scale: 'medium' },
  { id: 51, title: "产科超声胎儿测量",            subtitle: "声学超声影像 (US)",       tags: ["产科","测量"],      colorLevel: 4, samples: "6.2K",  size: "48 GB",   source: { type: 'platform',     name: 'iMedLoop' },              modality: 'US',     anatomy: ['腹部'],           indication: ['通用'],          scale: 'medium' },
  { id: 52, title: "腹主动脉CTA数据集",           subtitle: "计算机断层扫描 (CT)",     tags: ["腹部","血管"],      colorLevel: 3, samples: "1.8K",  size: "86 GB",   source: { type: 'institution',  name: '山东省立医院' },       modality: 'CT',     anatomy: ['腹部'],           indication: ['血管'],          scale: 'large'  },
  { id: 53, title: "肺气肿CT定量分析",            subtitle: "计算机断层扫描 (CT)",     tags: ["肺部","分级"],      colorLevel: 3, samples: "2.6K",  size: "74 GB",   source: { type: 'external',     name: 'NLST肺癌筛查数据集' }, modality: 'CT',     anatomy: ['胸部','肺部'],    indication: ['分级'],          scale: 'large'  },
  { id: 54, title: "支气管镜影像数据集",          subtitle: "内窥镜影像",              tags: ["肺部","检测"],      colorLevel: 3, samples: "4.4K",  size: "38 GB",   source: { type: 'institution',  name: '广州医科大学附属医院' }, modality: '内窥镜', anatomy: ['胸部'],           indication: ['检测'],          scale: 'medium' },
  { id: 55, title: "小肠胶囊内镜数据集",          subtitle: "内窥镜影像",              tags: ["消化","分类"],      colorLevel: 4, samples: "7.8K",  size: "92 GB",   source: { type: 'platform',     name: 'iMedLoop' },              modality: '内窥镜', anatomy: ['消化道'],         indication: ['分类'],          scale: 'large'  },
  { id: 56, title: "腹腔镜手术影像库",            subtitle: "内窥镜影像",              tags: ["外科","分割"],      colorLevel: 3, samples: "3.2K",  size: "145 GB",  source: { type: 'institution',  name: '解放军总医院' },       modality: '内窥镜', anatomy: ['腹部'],           indication: ['手术','分割'],   scale: 'large'  },
  { id: 57, title: "肾脏CT泌尿系成像",            subtitle: "计算机断层扫描 (CT)",     tags: ["泌尿","检测"],      colorLevel: 3, samples: "2.4K",  size: "68 GB",   source: { type: 'external',     name: 'KITS肾脏分割数据集' }, modality: 'CT',     anatomy: ['腹部','泌尿'],    indication: ['检测'],          scale: 'large'  },
  { id: 58, title: "青光眼眼底筛查数据集",        subtitle: "眼科影像",                tags: ["眼部","分类"],      colorLevel: 4, samples: "4.6K",  size: "22 GB",   source: { type: 'platform',     name: 'iMedLoop' },              modality: '眼科影像',anatomy: ['眼部'],           indication: ['分类'],          scale: 'medium' },
  { id: 59, title: "心房颤动ECG监测数据",         subtitle: "心脏电生理",              tags: ["心脏","检测"],      colorLevel: 5, samples: "12.8K", size: "5.4 GB",  source: { type: 'external',     name: 'PhysioNet心电数据库'}, modality: 'ECG',    anatomy: ['心脏'],           indication: ['检测'],          scale: 'small'  },
  { id: 60, title: "急诊多创伤影像库",            subtitle: "CT / X-Ray 混合",         tags: ["急诊","多模态"],    colorLevel: 5, samples: "3.1K",  size: "218 GB",  source: { type: 'institution',  name: '北京急救中心' },       modality: 'CT',     anatomy: ['全身'],           indication: ['急诊'],          scale: 'xlarge' },
  { id: 61, title: "脑白质病变MRI数据集",         subtitle: "磁共振成像 (MRI)",        tags: ["神经","分割"],      colorLevel: 5, samples: "2.8K",  size: "116 GB",  source: { type: 'platform',     name: 'iMedLoop' },              modality: 'MRI',    anatomy: ['脑部'],           indication: ['分割'],          scale: 'large'  },
  { id: 62, title: "淋巴瘤病理分类数据集",        subtitle: "病理组织学 (LAB)",        tags: ["血液","分类"],      colorLevel: 3, samples: "3.6K",  size: "188 GB",  source: { type: 'institution',  name: '复旦大学附属肿瘤医院' }, modality: '病理',   anatomy: ['全身'],           indication: ['肿瘤','分类'],   scale: 'xlarge' },
  { id: 63, title: "胆囊超声数据集",              subtitle: "声学超声影像 (US)",       tags: ["腹部","检测"],      colorLevel: 2, samples: "2.9K",  size: "18 GB",   source: { type: 'institution',  name: '华西医学院' },          modality: 'US',     anatomy: ['腹部'],           indication: ['结节','检测'],   scale: 'medium' },
  { id: 64, title: "鼻窦CT数据集",                subtitle: "计算机断层扫描 (CT)",     tags: ["头颈","分割"],      colorLevel: 2, samples: "1.6K",  size: "42 GB",   source: { type: 'institution',  name: '协和医院影像中心' },   modality: 'CT',     anatomy: ['颈部'],           indication: ['分割'],          scale: 'medium' },
  { id: 65, title: "肝癌病理数字切片",            subtitle: "病理组织学 (LAB)",        tags: ["腹部","病理"],      colorLevel: 5, samples: "4.2K",  size: "290 GB",  source: { type: 'institution',  name: '中山大学病理中心' },   modality: '病理',   anatomy: ['腹部'],           indication: ['肿瘤'],          scale: 'xlarge' },
  { id: 66, title: "皮肤血管瘤影像数据集",        subtitle: "皮肤镜影像",              tags: ["皮肤","分类"],      colorLevel: 2, samples: "1.8K",  size: "12 GB",   source: { type: 'external',     name: 'DermNet数据库' },      modality: '皮肤镜', anatomy: ['皮肤'],           indication: ['分类'],          scale: 'medium' },
  { id: 67, title: "膀胱超声数据集",              subtitle: "声学超声影像 (US)",       tags: ["泌尿","分割"],      colorLevel: 2, samples: "2.2K",  size: "16 GB",   source: { type: 'institution',  name: '浙大附属医院' },       modality: 'US',     anatomy: ['腹部','泌尿'],    indication: ['分割'],          scale: 'medium' },
  { id: 68, title: "肩关节MRI影像数据集",         subtitle: "磁共振成像 (MRI)",        tags: ["骨科","分割"],      colorLevel: 2, samples: "1.9K",  size: "56 GB",   source: { type: 'institution',  name: '上海交大附属医院' },   modality: 'MRI',    anatomy: ['骨骼'],           indication: ['分割'],          scale: 'large'  },
  { id: 69, title: "手腕骨折X光数据集",           subtitle: "X射线影像",               tags: ["骨科","检测"],      colorLevel: 3, samples: "5.4K",  size: "28 GB",   source: { type: 'platform',     name: 'iMedLoop' },              modality: 'X-Ray',  anatomy: ['骨骼'],           indication: ['检测'],          scale: 'medium' },
  { id: 70, title: "胃癌病理影像数据库",          subtitle: "病理组织学 (LAB)",        tags: ["消化","病理"],      colorLevel: 4, samples: "3.8K",  size: "215 GB",  source: { type: 'institution',  name: '南京鼓楼医院' },       modality: '病理',   anatomy: ['消化道'],         indication: ['肿瘤'],          scale: 'xlarge' },
  { id: 71, title: "卵巢超声数据集",              subtitle: "声学超声影像 (US)",       tags: ["妇科","分类"],      colorLevel: 3, samples: "2.6K",  size: "20 GB",   source: { type: 'institution',  name: '中南大学湘雅医院' },   modality: 'US',     anatomy: ['腹部','盆腔'],    indication: ['分类'],          scale: 'medium' },
  { id: 72, title: "髋关节MRI数据集",             subtitle: "磁共振成像 (MRI)",        tags: ["骨科","分割"],      colorLevel: 2, samples: "1.4K",  size: "48 GB",   source: { type: 'institution',  name: '解放军总医院' },       modality: 'MRI',    anatomy: ['骨骼'],           indication: ['分割'],          scale: 'medium' },
  { id: 73, title: "银屑病皮肤镜数据集",          subtitle: "皮肤镜影像",              tags: ["皮肤","分级"],      colorLevel: 3, samples: "3.2K",  size: "26 GB",   source: { type: 'external',     name: 'DermNet数据库' },      modality: '皮肤镜', anatomy: ['皮肤'],           indication: ['分级'],          scale: 'medium' },
  { id: 74, title: "垂体MRI数据集",               subtitle: "磁共振成像 (MRI)",        tags: ["神经","分割"],      colorLevel: 3, samples: "1.8K",  size: "52 GB",   source: { type: 'institution',  name: '北京协和医学院' },     modality: 'MRI',    anatomy: ['脑部'],           indication: ['肿瘤','分割'],   scale: 'large'  },
  { id: 75, title: "前列腺超声分割数据集",        subtitle: "声学超声影像 (US)",       tags: ["泌尿","分割"],      colorLevel: 3, samples: "2.8K",  size: "24 GB",   source: { type: 'platform',     name: 'iMedLoop' },              modality: 'US',     anatomy: ['腹部','泌尿'],    indication: ['肿瘤','分割'],   scale: 'medium' },
  { id: 76, title: "下肢CTA数据集",               subtitle: "计算机断层扫描 (CT)",     tags: ["骨科","血管"],      colorLevel: 3, samples: "1.6K",  size: "78 GB",   source: { type: 'institution',  name: '山东省立医院' },       modality: 'CT',     anatomy: ['骨骼'],           indication: ['血管'],          scale: 'large'  },
  { id: 77, title: "角膜地形图数据集",            subtitle: "眼科影像",                tags: ["眼部","分析"],      colorLevel: 2, samples: "2.4K",  size: "6 GB",    source: { type: 'institution',  name: '中山眼科中心' },       modality: '眼科影像',anatomy: ['眼部'],           indication: ['分类'],          scale: 'small'  },
  { id: 78, title: "子宫MRI影像库",               subtitle: "磁共振成像 (MRI)",        tags: ["妇科","分割"],      colorLevel: 2, samples: "1.6K",  size: "64 GB",   source: { type: 'institution',  name: '复旦大学附属肿瘤医院' }, modality: 'MRI',    anatomy: ['腹部','盆腔'],    indication: ['肿瘤','分割'],   scale: 'large'  },
  { id: 79, title: "脾脏超声影像库",              subtitle: "声学超声影像 (US)",       tags: ["腹部","分割"],      colorLevel: 1, samples: "1.4K",  size: "12 GB",   source: { type: 'institution',  name: '华西医学院' },          modality: 'US',     anatomy: ['腹部'],           indication: ['分割'],          scale: 'medium' },
  { id: 80, title: "宫腔镜影像数据集",            subtitle: "内窥镜影像",              tags: ["妇科","检测"],      colorLevel: 2, samples: "1.8K",  size: "28 GB",   source: { type: 'institution',  name: '中南大学湘雅医院' },   modality: '内窥镜', anatomy: ['腹部','盆腔'],    indication: ['检测'],          scale: 'medium' },
  { id: 81, title: "鼻咽部MRI数据集",             subtitle: "磁共振成像 (MRI)",        tags: ["头颈","分类"],      colorLevel: 3, samples: "2.2K",  size: "82 GB",   source: { type: 'institution',  name: '中山大学病理中心' },   modality: 'MRI',    anatomy: ['颈部'],           indication: ['肿瘤','分类'],   scale: 'large'  },
  { id: 82, title: "基底细胞癌皮肤镜数据集",      subtitle: "皮肤镜影像",              tags: ["皮肤","分类"],      colorLevel: 4, samples: "4.1K",  size: "34 GB",   source: { type: 'platform',     name: 'iMedLoop' },              modality: '皮肤镜', anatomy: ['皮肤'],           indication: ['肿瘤','分类'],   scale: 'medium' },
  { id: 83, title: "骨质疏松CT定量数据集",        subtitle: "计算机断层扫描 (CT)",     tags: ["骨科","分级"],      colorLevel: 3, samples: "2.8K",  size: "62 GB",   source: { type: 'institution',  name: '上海交大附属医院' },   modality: 'CT',     anatomy: ['骨骼'],           indication: ['分级'],          scale: 'large'  },
  { id: 84, title: "长程Holter心电数据集",        subtitle: "心脏电生理",              tags: ["心脏","检测"],      colorLevel: 4, samples: "8.6K",  size: "7.2 GB",  source: { type: 'external',     name: 'PhysioNet心电数据库'}, modality: 'ECG',    anatomy: ['心脏'],           indication: ['检测'],          scale: 'small'  },
  { id: 85, title: "足踝X光数据集",               subtitle: "X射线影像",               tags: ["骨科","检测"],      colorLevel: 2, samples: "2.6K",  size: "14 GB",   source: { type: 'institution',  name: '南京鼓楼医院' },       modality: 'X-Ray',  anatomy: ['骨骼'],           indication: ['检测'],          scale: 'medium' },
  { id: 86, title: "膝关节X光骨关节炎分级",       subtitle: "X射线影像",               tags: ["骨科","分级"],      colorLevel: 3, samples: "4.2K",  size: "22 GB",   source: { type: 'platform',     name: 'iMedLoop' },              modality: 'X-Ray',  anatomy: ['骨骼'],           indication: ['分级'],          scale: 'medium' },
  { id: 87, title: "骨龄X光评估数据集",           subtitle: "X射线影像",               tags: ["儿科","分析"],      colorLevel: 2, samples: "3.4K",  size: "18 GB",   source: { type: 'institution',  name: '解放军总医院' },       modality: 'X-Ray',  anatomy: ['骨骼'],           indication: ['通用'],          scale: 'medium' },
  { id: 88, title: "颈椎MRI神经压迫数据集",       subtitle: "磁共振成像 (MRI)",        tags: ["脊柱","检测"],      colorLevel: 4, samples: "2.6K",  size: "72 GB",   source: { type: 'platform',     name: 'iMedLoop' },              modality: 'MRI',    anatomy: ['脊柱'],           indication: ['检测'],          scale: 'large'  },
  { id: 89, title: "甲状旁腺超声数据集",          subtitle: "声学超声影像 (US)",       tags: ["颈部","检测"],      colorLevel: 2, samples: "1.2K",  size: "8 GB",    source: { type: 'institution',  name: '北京协和医学院' },     modality: 'US',     anatomy: ['颈部'],           indication: ['检测'],          scale: 'small'  },
  { id: 90, title: "肺结核X光检测数据集",         subtitle: "X射线影像",               tags: ["胸部","检测"],      colorLevel: 4, samples: "6.8K",  size: "38 GB",   source: { type: 'external',     name: 'MIMIC-CXR数据库' },    modality: 'X-Ray',  anatomy: ['胸部','肺部'],    indication: ['炎症','检测'],   scale: 'medium' },
  { id: 91, title: "儿科综合影像数据集",          subtitle: "CT / X-Ray 混合",         tags: ["儿科","多模态"],    colorLevel: 3, samples: "4.2K",  size: "124 GB",  source: { type: 'platform',     name: 'iMedLoop' },              modality: 'CT',     anatomy: ['全身'],           indication: ['通用'],          scale: 'large'  },
  { id: 92, title: "结直肠CT影像库",              subtitle: "计算机断层扫描 (CT)",     tags: ["消化","检测"],      colorLevel: 4, samples: "3.6K",  size: "92 GB",   source: { type: 'external',     name: 'CHAOS腹部CT数据集' },  modality: 'CT',     anatomy: ['消化道'],         indication: ['检测'],          scale: 'large'  },
  { id: 93, title: "皮肤黑色素瘤病理数据集",      subtitle: "病理组织学 (LAB)",        tags: ["皮肤","病理"],      colorLevel: 4, samples: "4.8K",  size: "162 GB",  source: { type: 'institution',  name: '中山大学病理中心' },   modality: '病理',   anatomy: ['皮肤'],           indication: ['肿瘤'],          scale: 'xlarge' },
  { id: 94, title: "罕见病影像标注集",            subtitle: "多模态影像",              tags: ["罕见病","标注"],    colorLevel: 4, samples: "1.2K",  size: "186 GB",  source: { type: 'platform',     name: 'iMedLoop' },              modality: 'MRI',    anatomy: ['全身'],           indication: ['通用'],          scale: 'xlarge' },
  { id: 95, title: "脑膜瘤MRI数据集",             subtitle: "磁共振成像 (MRI)",        tags: ["神经","分割"],      colorLevel: 4, samples: "2.4K",  size: "96 GB",   source: { type: 'external',     name: 'BraTS挑战赛数据集' },  modality: 'MRI',    anatomy: ['脑部'],           indication: ['肿瘤','分割'],   scale: 'large'  },
  { id: 96, title: "肾上腺CT影像数据集",          subtitle: "计算机断层扫描 (CT)",     tags: ["腹部","检测"],      colorLevel: 2, samples: "1.4K",  size: "48 GB",   source: { type: 'institution',  name: '武汉同济医院' },       modality: 'CT',     anatomy: ['腹部'],           indication: ['检测'],          scale: 'medium' },
  { id: 97, title: "乳腺MRI肿块检测数据集",       subtitle: "磁共振成像 (MRI)",        tags: ["乳腺","检测"],      colorLevel: 5, samples: "3.6K",  size: "138 GB",  source: { type: 'platform',     name: 'iMedLoop' },              modality: 'MRI',    anatomy: ['胸部'],           indication: ['肿瘤','检测'],   scale: 'large'  },
  { id: 98, title: "腹腔镜胆囊切除术影像",        subtitle: "内窥镜影像",              tags: ["外科","分割"],      colorLevel: 3, samples: "2.8K",  size: "92 GB",   source: { type: 'institution',  name: '华西医学院' },          modality: '内窥镜', anatomy: ['腹部'],           indication: ['手术','分割'],   scale: 'large'  },
  { id: 99, title: "肺纤维化HRCT数据集",          subtitle: "计算机断层扫描 (CT)",     tags: ["肺部","分级"],      colorLevel: 4, samples: "2.2K",  size: "118 GB",  source: { type: 'platform',     name: 'iMedLoop' },              modality: 'CT',     anatomy: ['胸部','肺部'],    indication: ['分级'],          scale: 'large'  },
  { id: 100,title: "全身PET核医学影像库",         subtitle: "核医学影像 (PET)",        tags: ["全身","检测"],      colorLevel: 5, samples: "1.6K",  size: "246 GB",  source: { type: 'institution',  name: '解放军总医院' },       modality: 'CT',     anatomy: ['全身'],           indication: ['肿瘤','检测'],   scale: 'xlarge' },
];

const sourceConfig = {
  platform:    { label: '平台数据', color: '#0071e3', bgColor: 'rgba(0,113,227,0.08)' },
  institution: { label: '机构上传', color: '#34c759', bgColor: 'rgba(52,199,89,0.08)' },
  external:    { label: '委托展示', color: '#ff9500', bgColor: 'rgba(255,149,0,0.08)' },
};

export interface DataFilters {
  modalities: string[];
  anatomies: string[];
  indications: string[];
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
    if (filters.indications.length > 0 && !item.indication.some(i => filters.indications.includes(i))) return false;
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
      <div className="grid grid-cols-3 gap-6">
        {pageItems.map((item) => {
        const sourceStyle = sourceConfig[item.source.type];
        return (
          <div
            key={item.id}
            onClick={() => navigate(`/dataset/${item.id}`)}
            className="group relative overflow-hidden rounded-3xl border border-black/[0.08] bg-white p-8 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#0071e3]/30 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#0071e3]/[0.02] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-[#0071e3]/[0.06] blur-3xl transition-all duration-500 group-hover:bg-[#0071e3]/[0.12]" />

            <div className="relative">
              <div className="mb-2 flex items-center justify-between gap-2">
                <div className="inline-flex rounded-full bg-[#0071e3]/[0.08] px-3 py-1">
                  <span className="text-xs font-medium text-[#0071e3]">{item.subtitle}</span>
                </div>
                {item.source.type === 'external' && (
                  <ExternalLink className="h-4 w-4 text-[#ff9500]" strokeWidth={2} />
                )}
              </div>

              <h3 className="mt-4 text-[21px] font-semibold leading-[1.52] text-[#1d1d1f] transition-colors duration-300 group-hover:text-[#0071e3]">
                {item.title}
              </h3>

              <div className="mt-3 flex items-center gap-2 text-sm text-[#86868b]">
                <span>来源:</span>
                <span
                  className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium"
                  style={{ backgroundColor: sourceStyle.bgColor, color: sourceStyle.color }}
                >
                  {sourceStyle.label}
                </span>
                <span className="text-[#86868b]">· {item.source.name}</span>
              </div>

              <div className="mt-3 flex items-center gap-4 text-sm text-[#86868b]">
                {item.samples && (
                  <span>样本量: <span className="font-medium text-[#1d1d1f]">{item.samples}</span></span>
                )}
                {item.size && (
                  <span>大小: <span className="font-medium text-[#1d1d1f]">{item.size}</span></span>
                )}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span key={tag} className="inline-flex items-center rounded-full bg-black/[0.04] px-3 py-1 text-xs font-medium text-[#1d1d1f]">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-6 h-1 w-12 rounded-full bg-[#0071e3]/[0.2] transition-all duration-300 group-hover:w-24 group-hover:bg-[#0071e3]/[0.4]" />
            </div>
          </div>
          );
        })}
      </div>

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
            page === "..." ? (
              <span key={`ellipsis-${idx}`} className="flex h-9 w-9 items-center justify-center text-sm text-[#86868b]">
                ···
              </span>
            ) : (
              <button
                key={page}
                onClick={() => goToPage(page as number)}
                className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition-all duration-200 ${
                  currentPage === page
                    ? "bg-[#0071e3] text-white shadow-[0_2px_8px_rgba(0,113,227,0.3)]"
                    : "border border-black/[0.08] bg-white text-[#1d1d1f] hover:border-[#0071e3]/30 hover:bg-[#0071e3]/[0.04]"
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
  );
}