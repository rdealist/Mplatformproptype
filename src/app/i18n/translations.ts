export type TranslationSchema = typeof zhCN;

// ─── 简体中文 ───────────────────────────────────────────────────────────────
const zhCN = {
  // Navigation
  nav: {
    about: "为何选我们",
    dataAssets: "发现数据要素",
    earnIncome: "赚取专业收益",
    community: "全球学术社区",

    // 发现数据要素子菜单
    buyDatasets: "购买数据要素",
    publishAnnotation: "发布标注需求",

    // 赚取专业收益子菜单
    claimWorkOrder: "申领标注任务",
    expertReview: "参与专家复审",

    // 全球学术社区子菜单
    expertHonor: "专家排行榜",
    academicForum: "医学讨论社区",

    // 旧版保留（用于其他页面）
    data: "探索数据集",
    tasks: "赚取收益",
    experts: "学术社区",
    publish: "我要发布",
    publishData: "上传数据集",
    publishTask: "发布任务",

    // 用户相关
    login: "登录",
    register: "注册",
    logout: "退出登录",
    workspace: "工作台",
    profile: "个人中心",
    settings: "设置",
    messages: "消息通知",
    viewAll: "查看全部消息",
    languages: { "zh-CN": "简体中文", "en": "English", "zh-TW": "繁體中文", "ja": "日本語" },
  },

  // Home — Hero
  hero: {
    personas: [
      {
        role: "临床医生",
        tag: "适合放射科、影像科医生",
        headline: "让您的临床经验\n持续为您创造收益",
        sub: "在碎片时间完成医学影像标注任务，专业判断即刻转化为可量化的积分收益。等级越高，收益越高。",
        cta1: "领取我的第一个任务",
        cta2: "了解收益体系",
      },
      {
        role: "科研人员",
        tag: "适合高校、科研机构",
        headline: "从原始影像到\nAI 模型，只需三步",
        sub: "无需算法背景，无需自建标注团队。上传数据，发布任务，一键调用模型工厂。M平台把原本需要 6 个月的工作压缩到 6 天。",
        cta1: "开启我的 AI 之旅",
        cta2: "浏览数据广场",
      },
      {
        role: "医院管理者",
        tag: "适合医院管理层、信息科",
        headline: "让沉睡的影像档案\n成为持续增值的数字资产",
        sub: "数据安全合规上链，每次授权使用自动结算。在保护患者隐私的前提下，为科研提供燃料，为医院创造新的收益来源。",
        cta1: "了解数据合规方案",
        cta2: "预约 1V1 演示",
      },
      {
        role: "数据方 / 企业",
        tag: "适合医疗 AI 企业、数据运营商",
        headline: "全球最大规模\n医学影像数据交易市场",
        sub: "接入超过 436 家全球合作机构，覆盖 CT / MRI / 病理等全模态。区块链确权，智能合约自动分账，数据每被调用一次，您就获得一次收益。",
        cta1: "查看数据广场",
        cta2: "成为数据供应商",
      },
    ],
    stats: [
      { label: "已标注样本" },
      { label: "接入影像总量" },
      { label: "活跃任务数" },
      { label: "全球认证专家" },
    ],
  },

  // Home — Pain Points
  pain: {
    badge: "行业共同的困境",
    title: "我们知道您面临的挑战",
    sub: "医学影像 AI 的最大瓶颈，不是算法，而是数据的流通与专业知识的变现",
    items: [
      {
        audience: "医院 / 机构",
        pain: "影像数据以 PB 计，却只能沉睡在服务器里",
        detail: "脱敏成本、标注成本和合规门槛，让绝大多数医疗影像数据无法进入科研和商业流通，数据价值严重流失。",
        before: "数据躺平，价值归零",
        after: "一键上链，智能流通",
      },
      {
        audience: "临床专家",
        pain: "高年资经验无处授权，只能看着别人训练模型",
        detail: "医生每天的诊断决策是最高质量的医学标签，却没有任何机制能让这些知识被合理记录、授权和变现。",
        before: "知识浪费，贡献不被看见",
        after: "按贡献分账，等级越高收益越高",
      },
      {
        audience: "科研 / 企业",
        pain: "从数据到 AI 模型，需要一个庞大的团队",
        detail: "算法工程师、标注人员、数据清洗、模型训练……每个环节都需要专业人力，开发周期动辄半年，成本以百万计。",
        before: "六个月开发，百万预算",
        after: "六天上线，零代码操作",
      },
    ],
  },

  // Home — Solution
  solution: {
    badge: "转折点",
    title: "M平台让三件事\n同时发生",
    sub: "数据货币化、专家知识变现、AI 开发民主化，三个过去需要独立解决的问题，在一个平台上同步推进。",
    points: [
      { title: "医院数据不再沉睡", desc: "脱敏合规上链，按调用次数持续分账" },
      { title: "专家经验不再浪费", desc: "智能派单 + 等级收益体系，按贡献精准分配" },
      { title: "AI 开发不再高不可攀", desc: "零代码微调 + 一键部署，三步完成专科模型" },
    ],
    journey: [
      {
        step: "01",
        title: "数据要素，一键流通",
        desc: "医院上传脱敏影像，平台自动完成合规核查、数据分级与区块链确权。数据不离院，价值可流转。",
        tags: ["隐私合规", "链上确权", "自动分级"],
      },
      {
        step: "02",
        title: "专家经验，精准变现",
        desc: "系统智能匹配标注任务与专家资质。完成标注即刻到账积分，质量越高奖励越高，时间越积累等级越高。",
        tags: ["智能派单", "即刻到账", "质量加成"],
      },
      {
        step: "03",
        title: "AI 模型，三步交付",
        desc: "基于 iMedImage® 基础大模型，选择数据集、配置任务、一键微调。无需代码，临床级 AI 从构想到上线只需数天。",
        tags: ["零代码微调", "一键部署", "可解释热力图"],
      },
    ],
  },

  // Home — Capabilities
  capabilities: {
    badge: "技术能力",
    title: "不只是工具\n是您的超能力",
    sub: "平台把复杂的技术基础设施变成您触手可及的能力",
    items: [
      { label: "安全合规", title: "数据安全，不妥协", desc: "数据脱敏、本地化一体机部署、区块链存证，三重保障让医院数据在安全边界内最大化流转。" },
      { label: "技术深度", title: "全模态覆盖", desc: "CT、MRI、X-Ray、超声、病理、内窥镜……17种成像模态，覆盖全临床场景，标注工具专项适配。" },
      { label: "公平透明", title: "收益透明可追溯", desc: "每一笔积分奖励上链存证，数据被调用几次、模型用了多少次标注，全程可查，权益归属清晰。" },
      { label: "性能卓越", title: "毫秒级推理响应", desc: "本地一体机 + 云端集群双模式，高并发批量推理毫秒级响应，临床级 CAM 可解释热力图辅助诊断。" },
    ],
  },

  // Home — Annotation Platform
  annotationPlatform: {
    badge: "M 标注平台",
    title: "全流程智能标注系统\n效率提升，成本降低",
    sub: "从任务分发到质检审核，AI 辅助贯穿全链路，让医学影像标注快 10 倍、准确率提升 40%",
    cta: "进入标注平台",
    features: [
      { label: "灵活任务管理", desc: "按影像模态、解剖区域智能派单，支持团队协作与进度追踪" },
      { label: "质检管理系统", desc: "多级质检流程，AI 预审 + 专家复核，双重保障标注质量" },
      { label: "数据导入导出", desc: "兼容 DICOM / NIfTI / PNG 等主流格式，一键批量处理" },
      { label: "多种标注模式", desc: "边界框、语义分割、关键点、3D 体积标注，工具按需切换" },
    ],
    mockup: {
      nav: ["任务列表", "我的任务", "质检审核", "数据集管理", "统计报表"],
      tools: ["移动", "框选", "分割", "缩放"],
      ai: "AI 辅助中",
      submitBtn: "提交标注",
      skipBtn: "跳过",
    },
  },

  // Home — Datasets & Tasks
  market: {
    datasetsBadge: "数据广场精选",
    datasetsTitle: "沉睡的影像，正在\n唤醒 AI 的潜力",
    datasetsLink: "查看全部数据集",
    tasksBadge: "任务广场精选",
    tasksTitle: "您的专业判断\n正在被人们需要",
    tasksLink: "查看全部任务",
    statusOpen: "招募中",
    public: "公开",
  },

  // Home — Case Studies
  cases: {
    badge: "真实案例",
    title: "他们用 M平台\n做到了这些",
    sub: '不是"他们采购了我们"，而是他们拯救了时间，创造了价值，拓展了可能性',
  },

  // Home — Levels
  levels: {
    badge: "专家成长路径",
    title: "您在哪里，收益就从哪里开始",
    sub: "完整 9 级体系，持续积累经验，等级越高报酬系数越高，最高达 8 倍",
    expUnit: "经验",
    certBtn: "上传证书直达",
    certLabel: "审核资质",
    tip: "完成任务积累经验升级 · 质量优秀额外 +50% 经验 · 路径：Lv1 → Lv2(1K) → Lv3(2.5K) → Lv4(5K) → Lv5(8K) → Lv6(12K) → Lv7(17K) → Lv8(23K) → Lv9(30K)",
    items: [
      { title: "初级标注员", expRange: "0 - 1K", reward: "1.0x" },
      { title: "中级标注员", expRange: "1K - 5K", reward: "1.2x - 2.0x" },
      { title: "认证专家", expRange: "8K - 12K", reward: "2.5x" },
      { title: "权威专家", expRange: "12K - 23K", reward: "3.5x - 6.0x" },
      { title: "首席专家", expRange: "30K+", reward: "8.0x" },
    ],
  },

  // Home — Factory
  factory: {
    badge: "iMedImage® 模型工厂",
    title: "从影像�� AI\n三步走完全程",
    sub: "过去需要博士学位和百万预算的事，现在您只需要三次点击",
    cta: "进入 iMedImage® MaaS 工厂",
    steps: [
      { step: "Step 01", title: "选择数据，配置任务", desc: "从数据广场选用已标注数据集，或上传自有影像数据，零代码配置微调超参数和验证指标。" },
      { step: "Step 02", title: "一键微调，实时监控", desc: "基于 iMedImage® 基础大模型自动启动分布式微调训练，可视化监控训练曲线与收敛状态，全程无需代码。" },
      { step: "Step 03", title: "部署上线，辅助诊断", desc: "零代码一键部署至云端推理集群或本地一体机。毫秒级响应，输出临床级 CAM 可解释性热力图。" },
    ],
  },

  // Home — CTA
  cta: {
    eyebrow: "开启您的冒险",
    title: "您的影像数据\n正在等待被激活",
    sub: "无论您是临床医生、科研团队还是医院管理者,M平台都为您准备好了第一步",
    btn1: "开启您的 AI 开发之旅",
    btn2: "预约 1V1 专属演示 →",
    footnote: "免费注册 · 首次标注任务即刻奖励 500 积分",
  },

  // Footer
  footer: {
    tagline: "医学影像数据资产平台\n连接数据、标注与价值",
    copyright: "© 2026 M平台. 保留所有权利.",
    cols: [
      ["平台", "数据广场", "任务广场", "排行榜", "社区"],
      ["资源", "帮助中心", "API 文档", "标注规范", "常见问题"],
      ["法律", "服务条款", "隐私政策", "数据协议"],
    ],
  },

  // DataMarket
  dataMarket: {
    title: "购买数据要素",
    sub: "全球最大规模、最高品质医学影像数据要素交易平台",
    stats: [
      { label: "数据集总量" },
      { label: "已标注数据" },
      { label: "影像数据" },
      { label: "全球合作机构" },
    ],
    count: (n: number) => `共 ${n} 个数据集`,
    search: "搜索数据集",
    filter: "筛选",
    heatmap: "热力图",
    list: "列表",
    sort: "最新发布",
  },

  // TaskMarket
  taskMarket: {
    title: "申领标注任务",
    sub: "精准匹配您的专业方向，完成标注任务，积累等级，持续获得收益",
    stats: [
      { label: "开放任务" },
      { label: "本月完成" },
      { label: "活跃标注员" },
      { label: "积分发放" },
    ],
    tabs: { all: "全部", open: "招募中", active: "进行中", ended: "已结束", my: "���的任务" },
    search: "搜索任务",
    filter: "筛选",
    sort: "最新发布",
    count: (n: number) => `共 ${n} 个任务`,
    applyBtn: "立即报名",
    claimBtn: "领取任务",
    endedBtn: "已结束",
    categoryLabel: { annotation: "标注任务", review: "审核任务" },
    statusLabel: { open: "招募中", active: "进行中", ended: "已结束" },
  },

  // FAQ
  faq: {
    badge: "常见问题",
    title: "关于这件事\n被问得最多的 7 个问题",
    sub: "还有别的问题？写信给",
    contactSuffix: "，我们这边的人会亲自回。",
    moreQ: "还有疑问？",
    moreDesc: "我们的团队会在 24 小时内亲自回复",
    emailBtn: "发送邮件给我们",
    qPrefix: "问",
  },
};

// ─── English ────────────────────────────────────────────────────────────────
const en: TranslationSchema = {
  nav: {
    about: "Why Us",
    dataAssets: "Discover Data",
    earnIncome: "Earn Income",
    community: "Global Community",

    // Discover Data submenu
    buyDatasets: "Buy Data",
    publishAnnotation: "Publish Task",

    // Earn Income submenu
    claimWorkOrder: "Claim Tasks",
    expertReview: "Expert Review",

    // Global Community submenu
    expertHonor: "Expert Leaderboard",
    academicForum: "Medical Community",

    // Legacy (for other pages)
    data: "Explore Datasets",
    tasks: "Earn Rewards",
    experts: "Academic Community",
    publish: "Publish",
    publishData: "Publish Dataset",
    publishTask: "Post Task",
    login: "Log In",
    register: "Sign Up",
    logout: "Log Out",
    workspace: "Workspace",
    profile: "Profile",
    settings: "Settings",
    messages: "Notifications",
    viewAll: "View all messages",
    languages: { "zh-CN": "简体中文", "en": "English", "zh-TW": "繁體中文", "ja": "日本語" },
  },
  hero: {
    personas: [
      {
        role: "Clinician",
        tag: "For radiologists & imaging specialists",
        headline: "Turn your clinical expertise\ninto ongoing income",
        sub: "Complete medical image annotation tasks in your spare time. Your professional judgment converts instantly into quantifiable point rewards — the higher your level, the higher your earnings.",
        cta1: "Claim My First Task",
        cta2: "Explore Reward System",
      },
      {
        role: "Researcher",
        tag: "For universities & research institutes",
        headline: "From raw images to\nAI model in three steps",
        sub: "No algorithm background needed. No annotation team required. Upload data, post a task, invoke the model factory with one click. M Platform compresses what used to take 6 months into 6 days.",
        cta1: "Start My AI Journey",
        cta2: "Browse Data Market",
      },
      {
        role: "Hospital Admin",
        tag: "For hospital management & IT departments",
        headline: "Turn dormant image archives\ninto appreciating digital assets",
        sub: "Data is secured on-chain with compliance built in, and every authorized use triggers automatic settlement — generating a new revenue stream for your hospital while protecting patient privacy.",
        cta1: "Explore Compliance Solutions",
        cta2: "Book a 1-on-1 Demo",
      },
      {
        role: "Enterprise",
        tag: "For medical AI companies & data operators",
        headline: "The world's largest\nmedical imaging data marketplace",
        sub: "Access 436+ global partner institutions covering CT, MRI, pathology and more. Blockchain ownership, smart-contract auto-settlement — every time your data is used, you earn.",
        cta1: "View Data Market",
        cta2: "Become a Data Supplier",
      },
    ],
    stats: [
      { label: "Annotated Samples" },
      { label: "Imaging Data" },
      { label: "Active Tasks" },
      { label: "Certified Experts" },
    ],
  },
  pain: {
    badge: "The Industry-Wide Struggle",
    title: "We Know the Challenges You Face",
    sub: "The biggest bottleneck in medical AI is not algorithms — it's data circulation and knowledge monetization",
    items: [
      {
        audience: "Hospitals",
        pain: "Petabytes of imaging data sitting idle on servers",
        detail: "De-identification costs, annotation overhead, and compliance barriers prevent most medical imaging data from entering research or commercial circulation — value is being silently destroyed.",
        before: "Data dormant, value wasted",
        after: "On-chain in one click, smart circulation",
      },
      {
        audience: "Clinicians",
        pain: "Senior expertise with no channel for licensing",
        detail: "Every diagnosis a physician makes is a high-quality medical label — yet no mechanism exists to record, license, or monetize that knowledge fairly.",
        before: "Knowledge wasted, contributions unseen",
        after: "Revenue by contribution, more as you level up",
      },
      {
        audience: "Researchers / Enterprise",
        pain: "Building an AI model requires an entire team",
        detail: "Algorithm engineers, annotators, data cleaning, model training — every step demands specialists. Development cycles stretch to six months and costs run into the millions.",
        before: "Six months, million-dollar budget",
        after: "Six days, zero-code operation",
      },
    ],
  },
  solution: {
    badge: "The Turning Point",
    title: "M Platform makes\nthree things happen at once",
    sub: "Data monetization, expert knowledge revenue, and democratized AI development — three problems once solved separately, now advancing in parallel on one platform.",
    points: [
      { title: "Hospital data no longer dormant", desc: "Compliant on-chain, continuous revenue per data call" },
      { title: "Expert expertise no longer given away", desc: "Smart dispatch + tiered reward system, precise contribution-based allocation" },
      { title: "AI development no longer out of reach", desc: "Zero-code fine-tuning + one-click deployment, specialist model in three steps" },
    ],
    journey: [
      {
        step: "01",
        title: "Data Assets, Instant Circulation",
        desc: "Hospitals upload de-identified images; the platform auto-completes compliance checks, data tiering, and blockchain registration. Data stays on-premise; value flows freely.",
        tags: ["Privacy Compliant", "On-Chain Verified", "Auto-Tiered"],
      },
      {
        step: "02",
        title: "Expert Knowledge, Precisely Monetized",
        desc: "The system intelligently matches annotation tasks to expert qualifications. Points are credited instantly upon completion — higher quality means higher rewards, and time compounds into level growth.",
        tags: ["Smart Dispatch", "Instant Credit", "Quality Bonus"],
      },
      {
        step: "03",
        title: "AI Model, Delivered in Three Steps",
        desc: "Built on the iMedImage® foundation model — select a dataset, configure the task, and fine-tune with one click. No code required; clinical-grade AI goes from idea to deployment in days.",
        tags: ["Zero-Code Fine-Tune", "One-Click Deploy", "Explainable Heatmap"],
      },
    ],
  },
  capabilities: {
    badge: "Capabilities",
    title: "Not just a tool.\nYour superpower.",
    sub: "The platform transforms complex technical infrastructure into capabilities at your fingertips",
    items: [
      { label: "Security & Compliance", title: "Data Security, Uncompromised", desc: "De-identification, local appliance deployment, and blockchain attestation — three layers of protection that maximize data circulation within safe boundaries." },
      { label: "Technical Depth", title: "Full Modality Coverage", desc: "CT, MRI, X-Ray, ultrasound, pathology, endoscopy — 17 imaging modalities covering every clinical scenario, with purpose-built annotation tools for each." },
      { label: "Transparency", title: "Revenue Fully Traceable", desc: "Every point reward is attested on-chain. Every data call and annotation use is queryable end-to-end, with clear ownership attribution." },
      { label: "Performance", title: "Millisecond Inference", desc: "Dual-mode local appliance + cloud cluster delivers high-concurrency batch inference with millisecond response, plus clinical-grade CAM explainability heatmaps." },
    ],
  },
  annotationPlatform: {
    badge: "M Annotation Platform",
    title: "End-to-end intelligent annotation\nfaster, cheaper, better",
    sub: "AI assistance throughout the full pipeline — from task dispatch to quality review — makes medical image annotation 10× faster with 40% higher accuracy",
    cta: "Enter Annotation Platform",
    features: [
      { label: "Flexible Task Management", desc: "Smart dispatch by imaging modality and anatomy, with team collaboration and progress tracking" },
      { label: "QC Management System", desc: "Multi-tier QC pipeline: AI pre-review + expert audit, dual guarantee of annotation quality" },
      { label: "Data Import / Export", desc: "Compatible with DICOM, NIfTI, PNG and other mainstream formats; one-click batch processing" },
      { label: "Multiple Annotation Modes", desc: "Bounding box, semantic segmentation, keypoints, 3D volumetric — tools switched on demand" },
    ],
    mockup: {
      nav: ["Task List", "My Tasks", "QC Review", "Dataset Management", "Analytics"],
      tools: ["Pan", "Box", "Segment", "Zoom"],
      ai: "AI Assist Active",
      submitBtn: "Submit",
      skipBtn: "Skip",
    },
  },
  market: {
    datasetsBadge: "Featured Datasets",
    datasetsTitle: "Dormant images awakening\nthe potential of AI",
    datasetsLink: "View all datasets",
    tasksBadge: "Featured Tasks",
    tasksTitle: "Your expertise\nis needed",
    tasksLink: "View all tasks",
    statusOpen: "Open",
    public: "Public",
  },
  cases: {
    badge: "Real Cases",
    title: "What they achieved\nwith M Platform",
    sub: "Not 'they bought our product' — they saved time, created value, and expanded what's possible",
  },
  levels: {
    badge: "Expert Growth Path",
    title: "Start earning from wherever you are",
    sub: "A full 9-tier system — accumulate experience, rise through the levels, and earn up to 8× multiplier",
    expUnit: "EXP",
    certBtn: "Fast-Track with Certificate",
    certLabel: "Review Qualified",
    tip: "Complete tasks to gain EXP · Outstanding quality earns +50% EXP · Path: Lv1 → Lv2(1K) → Lv3(2.5K) → Lv4(5K) → Lv5(8K) → Lv6(12K) → Lv7(17K) → Lv8(23K) → Lv9(30K)",
    items: [
      { title: "Junior Annotator", expRange: "0 - 1K", reward: "1.0x" },
      { title: "Mid Annotator", expRange: "1K - 5K", reward: "1.2x - 2.0x" },
      { title: "Certified Expert", expRange: "8K - 12K", reward: "2.5x" },
      { title: "Senior Expert", expRange: "12K - 23K", reward: "3.5x - 6.0x" },
      { title: "Chief Expert", expRange: "30K+", reward: "8.0x" },
    ],
  },
  factory: {
    badge: "iMedImage® Model Factory",
    title: "From images to AI\nin three steps",
    sub: "What once required a PhD and a million-dollar budget now takes three clicks",
    cta: "Enter iMedImage® MaaS Factory",
    steps: [
      { step: "Step 01", title: "Select Data, Configure Task", desc: "Choose an annotated dataset from the data market, or upload your own images. Configure fine-tuning hyperparameters and validation metrics — no code required." },
      { step: "Step 02", title: "One-Click Fine-Tune, Live Monitor", desc: "Automatically launches distributed fine-tuning based on the iMedImage® foundation model. Visualize training curves and convergence in real time — fully codeless." },
      { step: "Step 03", title: "Deploy, Diagnose, Deliver", desc: "One-click zero-code deployment to cloud inference cluster or local appliance. Millisecond response with clinical-grade CAM explainability heatmaps." },
    ],
  },
  cta: {
    eyebrow: "Begin Your Journey",
    title: "Your imaging data\nis waiting to be activated",
    sub: "Whether you're a clinician, research team, or hospital administrator — M Platform has your first step ready",
    btn1: "Start Your AI Development Journey",
    btn2: "Book a 1-on-1 Demo →",
    footnote: "Free to register · 500 points rewarded on your first annotation task",
  },
  footer: {
    tagline: "Medical Imaging Data Asset Platform\nConnecting Data, Annotation & Value",
    copyright: "© 2026 M Platform. All rights reserved.",
    cols: [
      ["Platform", "Data Market", "Task Market", "Leaderboard", "Community"],
      ["Resources", "Help Center", "API Docs", "Annotation Guidelines", "FAQ"],
      ["Legal", "Terms of Service", "Privacy Policy", "Data Agreement"],
    ],
  },
  dataMarket: {
    title: "Data Market",
    sub: "The world's largest and highest-quality medical imaging data annotation and trading platform",
    stats: [
      { label: "Total Datasets" },
      { label: "Annotated Samples" },
      { label: "Imaging Data" },
      { label: "Global Partners" },
    ],
    count: (n: number) => `${n} datasets`,
    search: "Search datasets",
    filter: "Filter",
    heatmap: "Heatmap",
    list: "List",
    sort: "Latest",
  },
  taskMarket: {
    title: "Earn Rewards",
    sub: "Matched to your specialty — complete annotation tasks, build your level, and earn continuously",
    stats: [
      { label: "Open Tasks" },
      { label: "Completed This Month" },
      { label: "Active Annotators" },
      { label: "Points Distributed" },
    ],
    tabs: { all: "All", open: "Open", active: "In Progress", ended: "Ended", my: "My Tasks" },
    search: "Search tasks",
    filter: "Filter",
    sort: "Latest",
    count: (n: number) => `${n} tasks`,
    applyBtn: "Apply Now",
    claimBtn: "Claim Task",
    endedBtn: "Ended",
    categoryLabel: { annotation: "Annotation", review: "Review" },
    statusLabel: { open: "Open", active: "In Progress", ended: "Ended" },
  },
  faq: {
    badge: "FAQ",
    title: "The 7 questions\nwe get asked most",
    sub: "Still have questions? Email us at",
    contactSuffix: " — our team replies personally.",
    moreQ: "Still have questions?",
    moreDesc: "Our team replies personally within 24 hours",
    emailBtn: "Send us an email",
    qPrefix: "Q",
  },
};

// ─── 繁體中文 ────────────────────────────────────────────────────────────────
const zhTW: TranslationSchema = {
  nav: {
    about: "為何選我們",
    dataAssets: "發現數據",
    earnIncome: "賺取收入",
    community: "全球社群",

    // 發現數據子菜單
    buyDatasets: "購買數據",
    publishAnnotation: "發布任務",

    // 賣取收入子菜單
    claimWorkOrder: "領取任務",
    expertReview: "專家審核",

    // 全球社群子菜單
    expertHonor: "專家排行榜",
    academicForum: "醫學社群",

    // 舊版保留（用於其他頁面）
    data: "探索資料集",
    tasks: "賺取收益",
    experts: "學術社群",
    publish: "我要發布",
    publishData: "發布資料集",
    publishTask: "發布任務",
    login: "登入",
    register: "註冊",
    logout: "登出",
    workspace: "工作台",
    profile: "個人中心",
    settings: "設定",
    messages: "通知",
    viewAll: "查看全部通知",
    languages: { "zh-CN": "简体中文", "en": "English", "zh-TW": "繁體中文", "ja": "日本語" },
  },
  hero: {
    personas: [
      {
        role: "臨床醫生",
        tag: "適合放射科、影像科醫生",
        headline: "讓您的臨床經驗\n持續為您創造收益",
        sub: "在碎片時間完成醫學影像標注任務，專業判斷即刻轉化為可量化的積分收益。等級越高，收益越高。",
        cta1: "領取我的第一個任務",
        cta2: "了解收益體系",
      },
      {
        role: "科研人員",
        tag: "適合高校、科研機構",
        headline: "從原始影像到\nAI 模型，只需三步",
        sub: "無需演算法背景，無需自建標注團隊。上傳資料，發布任務，一鍵呼叫模型工廠。M平台把原本需要 6 個月的工作壓縮到 6 天。",
        cta1: "開啟我的 AI 之旅",
        cta2: "瀏覽資料廣場",
      },
      {
        role: "醫院管理者",
        tag: "適合醫院管理層、資訊科",
        headline: "讓沉睡的影像檔案\n成為持續增值的數位資產",
        sub: "資料安全合規上鏈，每次授權使用自動結算。在保護患者隱私的前提下，為科研提供燃料，為醫院創造新的收益來源。",
        cta1: "了解資料合規方案",
        cta2: "預約 1V1 演示",
      },
      {
        role: "資料方 / 企業",
        tag: "適合醫療 AI 企業、資料運營商",
        headline: "全球最大規模\n醫學影像資料交易市場",
        sub: "接入超過 436 家全球合作機構，覆蓋 CT / MRI / 病理等全模態。區塊鏈確權，智慧合約自動分帳，資料每被呼叫一次，您就獲得一次收益。",
        cta1: "查看資料廣場",
        cta2: "成為資料供應商",
      },
    ],
    stats: [
      { label: "已標注樣本" },
      { label: "接入影像總量" },
      { label: "活躍任務數" },
      { label: "全球認證專家" },
    ],
  },
  pain: {
    badge: "行業共同的困境",
    title: "我們知道您面臨的挑戰",
    sub: "醫學影像 AI 的最大瓶頸，不是演算法，而是資料的流通與專業知識的變現",
    items: [
      { audience: "醫院 / 機構", pain: "影像資料以 PB 計，卻只能沉睡在伺服器裡", detail: "去識別化成本、標注成本和合規門檻，讓絕大多數醫療影像資料無法進入科研和商業流通，資料價值嚴重流失。", before: "資料躺平，價值歸零", after: "一鍵上鏈，智慧流通" },
      { audience: "臨床專家", pain: "高年資經驗無處授權，只能看著別人訓練模型", detail: "醫師每天的診斷決策是最高品質的醫學標籤，卻沒有任何機制能讓這些知識被合理記錄、授權和變現。", before: "知識浪費，貢獻不被看見", after: "按貢獻分帳，等級越高收益越高" },
      { audience: "科研 / 企業", pain: "從資料到 AI 模型，需要一個龐大的團隊", detail: "演算法工程師、標注人員、資料清洗、模型訓練……每個環節都需要專業人力，開發週期動輒半年，成本以百萬計。", before: "六個月開發，百萬預算", after: "六天上線，零程式碼操作" },
    ],
  },
  solution: {
    badge: "轉折點",
    title: "M平台讓三件事\n同時發生",
    sub: "資料貨幣化、專家知識變現、AI 開發民主化，三個過去需要獨立解決的問題，在一個平台上同步推進。",
    points: [
      { title: "醫院資料不再沉睡", desc: "去識別化合規上鏈，按呼叫次數持續分帳" },
      { title: "專家經驗不再白給", desc: "智慧派單 + 等級收益體系，按貢獻精準分配" },
      { title: "AI 開發不再高不可攀", desc: "零程式碼微調 + 一鍵部署，三步完成專科模型" },
    ],
    journey: [
      { step: "01", title: "資料要素，一鍵流通", desc: "醫院上傳去識別化影像，平台自動完成合規核查、資料分級與區塊鏈確權。資料不離院，價值可流轉。", tags: ["隱私合規", "鏈上確權", "自動分級"] },
      { step: "02", title: "專家經驗，精準變現", desc: "系統智慧匹配標注任務與專家資質。完成標注即刻到帳積分，品質越高獎勵越高，時間越積累等級越高。", tags: ["智慧派單", "即刻到帳", "品質加成"] },
      { step: "03", title: "AI 模型，三步交付", desc: "基於 iMedImage® 基礎大模型，選擇資料集、配置任務、一鍵微調。無需程式碼，臨床級 AI 從構想到上線只需數天。", tags: ["零程式碼微調", "一鍵部署", "可解釋熱力圖"] },
    ],
  },
  capabilities: {
    badge: "技術能力",
    title: "不只是工具\n是您的超能力",
    sub: "平台把複雜的技術基礎設施變成您觸手可及的能力",
    items: [
      { label: "安全合規", title: "資料安全，不妥協", desc: "資料去識別化、本地化一體機部署、區塊鏈存證，三重保障讓醫院資料在安全邊界內最大化流轉。" },
      { label: "技術深度", title: "全模態覆蓋", desc: "CT、MRI、X-Ray、超音波、病理、內視鏡……17種成像模態，覆蓋全臨床場景，標注工具專項適配。" },
      { label: "公平透明", title: "收益透明可追溯", desc: "每一筆積分獎勵上鏈存證，資料被呼叫幾次、模型用了多少次標注，全程可查，權益歸屬清晰。" },
      { label: "效能卓越", title: "毫秒級推理響應", desc: "本地一體機 + 雲端叢集雙模式，高並行批量推理毫秒級響應，臨床級 CAM 可解釋熱力圖輔助診斷。" },
    ],
  },
  annotationPlatform: {
    badge: "M 標注平台",
    title: "全流程智慧標注系統\n效率提升，成本降低",
    sub: "從任務分發到質檢審核，AI 輔助貫穿全鏈路，讓醫學影像標注快 10 倍、準確率提升 40%",
    cta: "進入標注平台",
    features: [
      { label: "靈活任務管理", desc: "按影像模態、解剖區域智慧派單，支援團隊協作與進度追蹤" },
      { label: "質檢管理系統", desc: "多級質檢流程，AI 預審 + 專家複核，雙重保障標注品質" },
      { label: "資料匯入匯出", desc: "相容 DICOM / NIfTI / PNG 等主流格式，一鍵批量處理" },
      { label: "多種標注模式", desc: "邊界框、語意分割、關鍵點、3D 體積標注，工具按需切換" },
    ],
    mockup: { nav: ["任務列表", "我的任務", "質檢審核", "資料集管理", "統計報表"], tools: ["移動", "框選", "分割", "縮放"], ai: "AI 輔助中", submitBtn: "提交標注", skipBtn: "跳過" },
  },
  market: {
    datasetsBadge: "資料廣場精選",
    datasetsTitle: "沉睡的影像，正在\n喚醒 AI 的潛力",
    datasetsLink: "查看全部資料集",
    tasksBadge: "任務廣場精選",
    tasksTitle: "您的專業判斷\n正在被人們需要",
    tasksLink: "查看全部任務",
    statusOpen: "招募中",
    public: "公開",
  },
  cases: {
    badge: "真實案例",
    title: "他們用 M平台\n做到了這些",
    sub: "不是「他們採購了我們」，而是他們節省了時間，創造了價值，拓展了可能性",
  },
  levels: {
    badge: "專家成長路徑",
    title: "您在哪裡，收益就從哪裡開始",
    sub: "完整 9 級體系，持續積累經驗，等級越高報酬係數越高，最高達 8 倍",
    expUnit: "經驗",
    certBtn: "上傳證書直達",
    certLabel: "審核資質",
    tip: "完成任務積累經驗升級 · 品質優秀額外 +50% 經驗",
    items: [
      { title: "初級標注員", expRange: "0 - 1K", reward: "1.0x" },
      { title: "中級標注員", expRange: "1K - 5K", reward: "1.2x - 2.0x" },
      { title: "認證專家", expRange: "8K - 12K", reward: "2.5x" },
      { title: "權威專家", expRange: "12K - 23K", reward: "3.5x - 6.0x" },
      { title: "首席專家", expRange: "30K+", reward: "8.0x" },
    ],
  },
  factory: {
    badge: "iMedImage® 模型工廠",
    title: "從影像到 AI\n三步走完全程",
    sub: "過去需要博士學位和百萬預算的事，現在您只需要三次點擊",
    cta: "進入 iMedImage® MaaS 工廠",
    steps: [
      { step: "Step 01", title: "選擇資料，配置任務", desc: "從資料廣場選用已標注資料集，或上傳自有影像資料，零程式碼配置微調超參數和驗證指標。" },
      { step: "Step 02", title: "一鍵微調，即時監控", desc: "基於 iMedImage® 基礎大模型自動啟動分散式微調訓練，視覺化監控訓練曲線與收斂狀態，全程無需程式碼。" },
      { step: "Step 03", title: "部署上線，輔助診斷", desc: "零程式碼一鍵部署至雲端推理叢集或本地一體機。毫秒級響應，輸出臨床級 CAM 可解釋性熱力圖。" },
    ],
  },
  cta: {
    eyebrow: "開啟您的冒險",
    title: "您的影像資料\n正在等待被激活",
    sub: "無論您是臨床醫師、科研團隊還是醫院管理者,M平台都為您準備好了第一步",
    btn1: "開啟您的 AI 開發之旅",
    btn2: "預約 1V1 專屬演示 →",
    footnote: "免費註冊 · 首次標注任務即刻獎勵 500 积分",
  },
  footer: {
    tagline: "醫學影像資料資產平台\n連接資料、標注與價值",
    copyright: "© 2026 M平台. 保留所有權利.",
    cols: [
      ["平台", "資料廣場", "任務廣場", "排行榜", "社群"],
      ["資源", "幫助中心", "API 文件", "標注規範", "常見問題"],
      ["法律", "���務條款", "隱私政策", "資料協議"],
    ],
  },
  dataMarket: {
    title: "資料市場",
    sub: "全球最大規模、最高品質醫學影像資料要素標注與交易平台",
    stats: [{ label: "資料集總量" }, { label: "標注樣本" }, { label: "影像資料" }, { label: "全球合作機構" }],
    count: (n: number) => `共 ${n} 個資料集`,
    search: "搜尋資料集",
    filter: "篩選",
    heatmap: "熱力圖",
    list: "列表",
    sort: "最新發布",
  },
  taskMarket: {
    title: "賺取收益",
    sub: "精準匹配您的專業方向，完成標注任務，積累等級，持續獲得收益",
    stats: [{ label: "開放任務" }, { label: "本月完成" }, { label: "活躍標注員" }, { label: "積分發放" }],
    tabs: { all: "全部", open: "招募中", active: "進行中", ended: "已結束", my: "我的任務" },
    search: "搜尋任務",
    filter: "篩選",
    sort: "最新發布",
    count: (n: number) => `共 ${n} 個任務`,
    applyBtn: "立即報名",
    claimBtn: "領取任務",
    endedBtn: "已結束",
    categoryLabel: { annotation: "標注任務", review: "審核任務" },
    statusLabel: { open: "招募中", active: "進行中", ended: "已結束" },
  },
  faq: {
    badge: "常見問題",
    title: "關於這件事\n被問得最多的 7 個問題",
    sub: "還有別的問題？寫信給",
    contactSuffix: "，我們這邊的人會親自回。",
    moreQ: "還有疑問？",
    moreDesc: "我們的團隊會在 24 小時內親自回覆",
    emailBtn: "發送郵件給我們",
    qPrefix: "問",
  },
};

// ─── 日本語 ──────────────────────────────────────────────────────────────────
const ja: TranslationSchema = {
  nav: {
    about: "なぜ私たちを選ぶか",
    dataAssets: "データを発見",
    earnIncome: "収益を得る",
    community: "グローバルコミュニティ",

    // データを発見のサブメニュー
    buyDatasets: "データを購入",
    publishAnnotation: "タスクを公開",

    // 収益を得るのサブメニュー
    claimWorkOrder: "タスクを請負",
    expertReview: "専門家レビュー",

    // グローバルコミュニティのサブメニュー
    expertHonor: "専門家ランキング",
    academicForum: "医学コミュニティ",

    // 旧版（他のページ用）
    data: "データセットを探索",
    tasks: "報酬を得る",
    experts: "学術コミュニティ",
    publish: "公開する",
    publishData: "データセットを公開",
    publishTask: "タスクを投稿",
    login: "ログイン",
    register: "登録",
    logout: "ログアウト",
    workspace: "ワークスペース",
    profile: "プロフィール",
    settings: "設定",
    messages: "通知",
    viewAll: "すべてのメッセージを見る",
    languages: { "zh-CN": "简体中文", "en": "English", "zh-TW": "繁體中文", "ja": "日本語" },
  },
  hero: {
    personas: [
      {
        role: "臨床医",
        tag: "放射線科・画像診断科の医師向け",
        headline: "臨床経験を\n継続的な収益に変える",
        sub: "隙間時間に医療画像アノテーションタスクをこなし、専門的な判断を即座にポイント報酬へ。レベルが上がるほど収益も増加します。",
        cta1: "最初のタスクを受け取る",
        cta2: "報酬体系を見る",
      },
      {
        role: "研究者",
        tag: "大学・研究機関向け",
        headline: "生画像から\nAIモデルへ、3ステップ",
        sub: "アルゴリズムの知識不要。アノテーションチームの構築不要。データをアップロードし、タスクを投稿し、モデルファクトリーをワンクリックで呼び出す。6ヶ月かかる作業を6日に短縮します。",
        cta1: "AIの旅を始める",
        cta2: "データマーケットを見る",
      },
      {
        role: "病院管理者",
        tag: "病院経営・情報部門向け",
        headline: "眠っている画像アーカイブを\n価値ある数字資産に",
        sub: "データはコンプライアンスに準拠してオンチェーン化され、使用許可ごとに自動決済。患者プライバシーを守りながら、研究の燃料となり、病院に新たな収益をもたらします。",
        cta1: "コンプライアンス解決策を見る",
        cta2: "1対1デモを予約",
      },
      {
        role: "データ事業者 / 企業",
        tag: "医療AI企業・データ事業者向け",
        headline: "世界最大規模の\n医療画像データ取引市場",
        sub: "436以上のグローバルパートナー機関にアクセス。CT・MRI・病理など全モダリティ対応。ブロックチェーン権利確定、スマートコントラクト自動分配。データが使われるたびに収益を得られます。",
        cta1: "データマーケットを見る",
        cta2: "データサプライヤーになる",
      },
    ],
    stats: [
      { label: "アノテーション済みサンプル" },
      { label: "画像データ総量" },
      { label: "アクティブタスク数" },
      { label: "認定専門家数" },
    ],
  },
  pain: {
    badge: "業界共通の課題",
    title: "あなたが直面する課題を\n私たちは知っています",
    sub: "医療AIの最大のボトルネックはアルゴリズムではなく、データの流通と専門知識の収益化です",
    items: [
      { audience: "病院 / 機関", pain: "ペタバイト規模の画像データがサーバーで眠り続けている", detail: "匿名化コスト、アノテーションコスト、コンプライアンスの壁により、ほとんどの医療画像データは研究・商業利用に入れず、データ価値が失われ続けています。", before: "データは眠ったまま、価値はゼロ", after: "ワンクリックでオンチェーン化、スマート流通" },
      { audience: "臨床専門家", pain: "豊富な経験をライセンスする仕組みがない", detail: "医師が毎日下す診断は最高品質の医学的ラベルです。しかし、その知識を適切に記録・ライセンス・収益化する仕組みがありません。", before: "知識が浪費、貢献は見えない", after: "貢献に応じた分配、レベルが上がるほど収益増" },
      { audience: "研究者 / 企業", pain: "AIモデル構築に大規模なチームが必要", detail: "アルゴリズムエンジニア、アノテーター、データクリーニング、モデル訓練……各工程に専門家が必要で、開発期間は半年、コストは数百万円規模になりがちです。", before: "6ヶ月の開発、数百万円の予算", after: "6日でリリース、ノーコード操作" },
    ],
  },
  solution: {
    badge: "転換点",
    title: "Mプラットフォームは\n3つのことを同時に実現します",
    sub: "データの収益化、専門知識の換金化、AI開発の民主化——かつて別々に解決が必要だった3つの課題が、一つのプラットフォームで同時に前進します。",
    points: [
      { title: "病院データはもう眠らない", desc: "コンプライアンス準拠でオンチェーン化、呼び出しごとに継続的に分配" },
      { title: "専門家の知識はもう無償ではない", desc: "スマートディスパッチ＋レベル報酬体系、貢献に応じた精密な分配" },
      { title: "AI開発はもう手の届かないものではない", desc: "ノーコードファインチューニング＋ワンクリックデプロイ、3ステップで専門モデルが完成" },
    ],
    journey: [
      { step: "01", title: "データ資産、ワンクリック流通", desc: "病院が匿名化画像をアップロードすると、プラットフォームがコンプライアンス審査・データ分類・ブロックチェーン登録を自動実行。データは院内に留まり、価値だけが流通します。", tags: ["プライバシー準拠", "オンチェーン確認", "自動分類"] },
      { step: "02", title: "専門知識、精密に収益化", desc: "システムがアノテーションタスクと専門家資格をインテリジェントにマッチング。完了即ポイント付与、品質が高いほど報酬も高く、経験が積み重なるほどレベルが上がります。", tags: ["スマートディスパッチ", "即時付与", "品質ボーナス"] },
      { step: "03", title: "AIモデル、3ステップで納品", desc: "iMedImage®基盤モデルをベースに、データセット選択・タスク設定・ワンクリックファインチューニング。コード不要、臨床グレードのAIが構想から本番稼働まで数日で完成します。", tags: ["ノーコードファインチューニング", "ワンクリックデプロイ", "説明可能ヒートマップ"] },
    ],
  },
  capabilities: {
    badge: "技術能力",
    title: "ツールではなく\nあなたの超能力",
    sub: "複雑な技術インフラを、誰でも使える能力に変えます",
    items: [
      { label: "セキュリティ", title: "データセキュリティは妥協しない", desc: "匿名化、ローカル一体型デプロイ、ブロックチェーン証明——3重の保護で病院データを安全な境界内で最大限活用。" },
      { label: "技術の深さ", title: "全モダリティ対応", desc: "CT・MRI・X線・超音波・病理・内視鏡など17種類の画像モダリティ、全臨床シナリオをカバーする専用アノテーションツール。" },
      { label: "透明性", title: "収益は完全に追跡可能", desc: "すべてのポイント報酬はオンチェーンで証明。データ呼び出し回数やモデル使用回数は全履歴参��可能で、権益帰属が明確です。" },
      { label: "パフォーマンス", title: "ミリ秒単位の推論応答", desc: "ローカル一体機＋クラウドクラスターのデュアルモード。高並列バッチ推論をミリ秒で処理し、臨床グレードのCAM説明可能ヒートマップを出力します。" },
    ],
  },
  annotationPlatform: {
    badge: "Mアノテーションプラットフォーム",
    title: "エンドツーエンドのインテリジェント\nアノテーションシステム",
    sub: "タスク配信から品質審査まで、AIが全工程を支援。医療画像アノテーションを10倍速く、精度40%向上",
    cta: "アノテーションプラットフォームへ",
    features: [
      { label: "柔軟なタスク管理", desc: "画像モダリティ・解剖部位によるスマートディスパッチ、チームコラボと進捗追跡に対応" },
      { label: "品質管理システム", desc: "多段階QCフロー：AIプレビュー＋専門家審査の二重品質保証" },
      { label: "データインポート/エクスポート", desc: "DICOM・NIfTI・PNG等の主要フォーマットに対応、ワンクリック一括処理" },
      { label: "多様なアノテーションモード", desc: "バウンディングボックス・セマンティックセグメンテーション・キーポイント・3Dボリューム、用途に応じてツールを切替" },
    ],
    mockup: { nav: ["タスク一覧", "マイタスク", "品質審査", "データセット管理", "分析"], tools: ["移動", "ボックス", "セグメント", "ズーム"], ai: "AI支援中", submitBtn: "提出", skipBtn: "スキップ" },
  },
  market: {
    datasetsBadge: "注目のデータセット",
    datasetsTitle: "眠っていた画像が\nAIの可能性を目覚めさせる",
    datasetsLink: "全データセットを見る",
    tasksBadge: "注目のタスク",
    tasksTitle: "あなたの専門知識が\n求められています",
    tasksLink: "全タスクを見る",
    statusOpen: "募集中",
    public: "公開",
  },
  cases: {
    badge: "実際の事例",
    title: "Mプラットフォームで\n実現したこと",
    sub: "「導入した」ではなく、時間を節約し、価値を創造し、可能性を広げた話です",
  },
  levels: {
    badge: "専門家成長パス",
    title: "今いる場所から\n収益を始めよう",
    sub: "完全な9段階体系——経験を積み、レベル��上がるほど報酬係数が上がり、最大8倍に",
    expUnit: "経験値",
    certBtn: "証明書で直接昇格",
    certLabel: "審査資格あり",
    tip: "タスクをこなして経験値を積んでレベルアップ · 優秀な品質で経験値+50%ボーナス",
    items: [
      { title: "初級アノテーター", expRange: "0 - 1K", reward: "1.0x" },
      { title: "中級アノテーター", expRange: "1K - 5K", reward: "1.2x - 2.0x" },
      { title: "認定エキスパート", expRange: "8K - 12K", reward: "2.5x" },
      { title: "シニアエキスパート", expRange: "12K - 23K", reward: "3.5x - 6.0x" },
      { title: "チーフエキスパート", expRange: "30K+", reward: "8.0x" },
    ],
  },
  factory: {
    badge: "iMedImage® モデルファクトリー",
    title: "画像からAIへ\n3ステップで完成",
    sub: "かつて博士号と数百万円の予算が必要だったことが、今は3回クリックするだけ",
    cta: "iMedImage® MaaS ファクトリーへ",
    steps: [
      { step: "Step 01", title: "データ選択・タスク設定", desc: "データマーケットからアノテーション済みデータセットを選ぶか、自社画像をアップロード。ファインチューニングのハイパーパラメータを検証指標をノーコードで設定。" },
      { step: "Step 02", title: "ワンクリックファインチューニング・リアルタイム監視", desc: "iMedImage®基盤モデルに基づき分散ファインチューニングを自動起動。訓練曲線と収束状態をリアルタイムで可視化。全工程コード不要。" },
      { step: "Step 03", title: "デプロイ・診断支援", desc: "ノーコードでクラウド推論クラスターまたはローカル一体機へワンクリックデプロイ。ミリ秒応答、臨床グレードのCAM説明可能ヒートマップを出力。" },
    ],
  },
  cta: {
    eyebrow: "あなたの旅を始めよう",
    title: "あなたの画像データは\n活性化されるのを待っています",
    sub: "臨床医・研究チーム・病院管理者——どなたでも、Mプラットフォームが最初の一歩を準備しています",
    btn1: "AI開発の旅を始める",
    btn2: "1対1デモを予約する →",
    footnote: "無料登録 · 500ポイント進呈",
  },
  footer: {
    tagline: "医療画像データ資産プラットフォーム\nデータ・アノテーション・価値をつなぐ",
    copyright: "© 2026 Mプラットフォーム. All rights reserved.",
    cols: [
      ["プラットフォーム", "データマーケット", "タスクマーケット", "ランキング", "コミュニティ"],
      ["リソース", "ヘルプセンター", "API ドキュメント", "アノテーションガイド", "よくある質問"],
      ["法律", "利用規約", "プライバシーポリシー", "データ協定"],
    ],
  },
  dataMarket: {
    title: "データマーケット",
    sub: "世界最大規模・最高品質の医療画像データアノテーション・取引プラットフォーム",
    stats: [
      { label: "データセット総数" },
      { label: "アノテーション済みサンプル" },
      { label: "画像データ" },
      { label: "グローバルパートナー" },
    ],
    count: (n: number) => `${n} 件のデータセット`,
    search: "データセットを検索",
    filter: "絞り込み",
    heatmap: "ヒートマップ",
    list: "リスト",
    sort: "最新順",
  },
  taskMarket: {
    title: "報酬を稼ぐ",
    sub: "専門分野にマッチしたタスクをこなし、レベルを積み重ね、継続的に収益を得る",
    stats: [
      { label: "公開タスク" },
      { label: "今月完了" },
      { label: "アクティブアノテーター" },
      { label: "配布ポイント" },
    ],
    tabs: { all: "すべて", open: "募集中", active: "進行中", ended: "終了", my: "マイタスク" },
    search: "タスクを検索",
    filter: "絞り込み",
    sort: "最新順",
    count: (n: number) => `${n} 件のタスク`,
    applyBtn: "今すぐ応募",
    claimBtn: "タスクを受け取る",
    endedBtn: "終了",
    categoryLabel: { annotation: "アノテーション", review: "審査" },
    statusLabel: { open: "募集中", active: "進行中", ended: "終了" },
  },
  faq: {
    badge: "よくある質問",
    title: "最もよく聞かれる\n7つの質問",
    sub: "他にご質問は？メールでお問い合わせください：",
    contactSuffix: " — チームが直接ご回答します。",
    moreQ: "まだご質問がありますか？",
    moreDesc: "チームが24時間以内に直接ご回答します",
    emailBtn: "メールを送る",
    qPrefix: "Q",
  },
};

export const translations: Record<string, TranslationSchema> = {
  "zh-CN": zhCN,
  "en": en,
  "zh-TW": zhTW,
  "ja": ja,
};