import { useState, useRef, useEffect } from "react";
import {
  Play,
  Code2,
  ChevronDown,
  Paperclip,
  Wrench,
  Copy,
  Check,
  Zap,
  Brain,
  Shield,
  GitBranch,
  Radio,
  Key,
  Activity,
  CreditCard,
  BookOpen,
  ShoppingBag,
  ChevronRight,
  ArrowUpRight,
  ToggleLeft,
  ToggleRight,
  MessageSquare,
  FileText,
  LayoutGrid,
  Filter,
  Search,
  Cpu,
  BarChart2,
  Clock,
  CheckCircle2,
  Lock,
  AlertCircle,
  Globe,
  Terminal,
  Database,
  Send,
  Layers,
  Sparkles,
  HelpCircle,
  User,
  ChevronUp,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// ─── Types ────────────────────────────────────────────────────────────────────

type SidebarSection = "home" | "market" | "apikeys" | "logs" | "docs";
type ModelFilter = "all" | "text" | "multimodal" | "code" | "fast" | "available";
type OutputFormat = "text" | "json" | "markdown" | "structured";

interface CapabilityCard {
  id: string;
  icon: React.ElementType;
  title: string;
  desc: string;
  status: "available" | "pending" | "enterprise";
  prompt: string;
}

interface ModelEntry {
  id: string;
  name: string;
  vendor: string;
  tags: string[];
  context: string;
  latency: string;
  permission: "available" | "restricted";
  categories: ModelFilter[];
}

// ─── Static Data ──────────────────────────────────────────────────────────────

const sidebarItems = [
  { id: "home" as SidebarSection, label: "在线使用", icon: Play },
  { id: "market" as SidebarSection, label: "模型市场", icon: ShoppingBag },
  { id: "apikeys" as SidebarSection, label: "API Key 管理", icon: Key },
  { id: "logs" as SidebarSection, label: "调用记录", icon: Activity },
  { id: "docs" as SidebarSection, label: "帮助文档", icon: BookOpen },
];

const capabilityCards: CapabilityCard[] = [
  {
    id: "text",
    icon: MessageSquare,
    title: "文本生成",
    desc: "适用于问答、摘要、改写、内容创作等场景",
    status: "available",
    prompt: "请帮我总结这份报告的核心结论，并输出为 5 条要点。",
  },
  {
    id: "multimodal",
    icon: Layers,
    title: "多模态理解",
    desc: "支持图像、文本等多类型输入的理解与分析",
    status: "available",
    prompt: "请分析这张图片中的主要内容，并生成结构化描述。",
  },
  {
    id: "code",
    icon: Code2,
    title: "代码与工具调用",
    desc: "支持代码辅助、函数调用、工具编排",
    status: "available",
    prompt: "请根据以下业务需求，生成一个接口调用示例。",
  },
  {
    id: "document",
    icon: FileText,
    title: "长文档处理",
    desc: "适用于合同、报告、知识库、长文本分析",
    status: "pending",
    prompt: "请对以下合同文本进行关键条款提取和风险分析。",
  },
  {
    id: "structured",
    icon: Database,
    title: "结构化输出",
    desc: "支持 JSON、表格字段、标准化结果生成",
    status: "available",
    prompt: "请将这段用户咨询整理成结构化 JSON。",
  },
  {
    id: "realtime",
    icon: Zap,
    title: "实时接口调用",
    desc: "支持低延迟 API 调用、流式输出、批量任务",
    status: "enterprise",
    prompt: "请测试流式输出接口，返回实时生成的文本内容。",
  },
];

const modelList: ModelEntry[] = [
  {
    id: "qwen-3.7-plus",
    name: "qwen/qwen3.7-plus",
    vendor: "Qwen",
    tags: ["通用对话", "长文本", "工具调用"],
    context: "128K",
    latency: "~420ms",
    permission: "available",
    categories: ["text", "fast"],
  },
  {
    id: "minimax-m3",
    name: "MiniMax-M3",
    vendor: "MiniMax",
    tags: ["中文理解", "Agent", "多轮对话"],
    context: "256K",
    latency: "~380ms",
    permission: "available",
    categories: ["text"],
  },
  {
    id: "claude-opus-4.8-fast",
    name: "anthropic/claude-opus-4.8-fast",
    vendor: "Anthropic",
    tags: ["复杂推理", "代码", "长上下文"],
    context: "200K",
    latency: "~650ms",
    permission: "available",
    categories: ["text", "code"],
  },
  {
    id: "gpt-5.4-mini",
    name: "openai/gpt-5.4-mini",
    vendor: "OpenAI",
    tags: ["轻量快速", "低成本", "结构化输出"],
    context: "32K",
    latency: "~210ms",
    permission: "available",
    categories: ["text", "fast"],
  },
  {
    id: "gemini-3.5-flash",
    name: "google/gemini-3.5-flash",
    vendor: "Google",
    tags: ["多模态", "快速响应", "批量任务"],
    context: "1M",
    latency: "~280ms",
    permission: "available",
    categories: ["multimodal", "fast"],
  },
  {
    id: "claude-opus-4.7-fast",
    name: "anthropic/claude-opus-4.7-fast",
    vendor: "Anthropic",
    tags: ["复杂分析", "文档理解"],
    context: "200K",
    latency: "~590ms",
    permission: "restricted",
    categories: ["text", "code"],
  },
  {
    id: "gpt-5.5",
    name: "openai/gpt-5.5",
    vendor: "OpenAI",
    tags: ["高级推理", "函数调用", "生产推荐"],
    context: "128K",
    latency: "~820ms",
    permission: "restricted",
    categories: ["text", "code"],
  },
  {
    id: "glm-5.1",
    name: "z-ai/glm-5.1",
    vendor: "Z.ai",
    tags: ["中文场景", "企业应用", "工具调用"],
    context: "64K",
    latency: "~340ms",
    permission: "available",
    categories: ["text"],
  },
];

const examplePrompts = [
  "请帮我总结这份报告的核心结论，并输出为 5 条要点。",
  "请根据以下业务需求，生成一个接口调用示例。",
  "请将这段用户咨询整理成结构化 JSON。",
];

const vendorColors: Record<string, string> = {
  Qwen: "#FF6A00",
  MiniMax: "#7C3AED",
  Anthropic: "#D97706",
  OpenAI: "#10B981",
  Google: "#3B82F6",
  "Z.ai": "#EC4899",
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: CapabilityCard["status"] }) {
  if (status === "available")
    return (
      <span className="rounded-full bg-[#34c759]/10 px-2 py-0.5 text-[10px] font-bold text-[#34c759]">
        可试用
      </span>
    );
  if (status === "pending")
    return (
      <span className="rounded-full bg-[#ff9500]/10 px-2 py-0.5 text-[10px] font-bold text-[#ff9500]">
        需审批
      </span>
    );
  return (
    <span className="rounded-full bg-[#5856d6]/10 px-2 py-0.5 text-[10px] font-bold text-[#5856d6]">
      企业专享
    </span>
  );
}

function VendorDot({ vendor }: { vendor: string }) {
  const color = vendorColors[vendor] ?? "#86868b";
  return (
    <span
      className="inline-block h-2 w-2 rounded-full mr-1.5 flex-shrink-0"
      style={{ backgroundColor: color }}
    />
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ModelService() {
  const [activeSection, setActiveSection] = useState<SidebarSection>("home");
  const [selectedModel, setSelectedModel] = useState("qwen-3.7-plus");
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(2048);
  const [topP, setTopP] = useState(1.0);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("text");
  const [modelFilter, setModelFilter] = useState<ModelFilter>("all");
  const [prompt, setPrompt] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "ai"; content: string }[]>([]);
  const [copiedEndpoint, setCopiedEndpoint] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showRightPanel, setShowRightPanel] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [tools, setTools] = useState({
    webSearch: false,
    codeExec: false,
    funcCall: false,
    knowledgeBase: true,
    privateData: false,
  });

  const isWelcomeState = messages.length === 0 && !isRunning;
  const currentModel = modelList.find((m) => m.id === selectedModel) ?? modelList[0];

  const filteredModels =
    modelFilter === "all"
      ? modelList
      : modelFilter === "available"
      ? modelList.filter((m) => m.permission === "available")
      : modelList.filter((m) => m.categories.includes(modelFilter));

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isRunning]);

  const handleRun = () => {
    const text = prompt.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setPrompt("");
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: `**[${currentModel.name}]** 已收到您的请求。\n\n根据您的输入："${text}"\n\n以下是模拟生成的响应内容：\n\n1. 模型已成功接收 Prompt 并完成上下文分析。\n2. Temperature 设置为 ${temperature}，输出风格偏向${temperature < 0.5 ? "精确稳定" : temperature < 1.2 ? "平衡自然" : "富有创意"}。\n3. 当前上下文窗口：${currentModel.context}，延迟预估：${currentModel.latency}。\n\n如需集成到您的业务系统，可点击右侧"获取代码"按钮查看 SDK 调用示例。`,
        },
      ]);
    }, 1800);
  };

  const handleCapabilityClick = (card: CapabilityCard) => {
    setPrompt(card.prompt);
    textareaRef.current?.focus();
  };

  const handleModelSelect = (modelId: string) => {
    setSelectedModel(modelId);
  };

  const toggleTool = (key: keyof typeof tools) => {
    setTools((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const filterLabels: { id: ModelFilter; label: string }[] = [
    { id: "all", label: "全部模型" },
    { id: "text", label: "文本生成" },
    { id: "multimodal", label: "多模态" },
    { id: "code", label: "代码能力" },
    { id: "fast", label: "低延迟" },
    { id: "available", label: "已开通" },
  ];

  return (
    <div className="flex h-[calc(100vh-44px)] overflow-hidden bg-[#fbfbfd] text-[#1d1d1f]">
      {/* ── Left Sidebar ── */}
      <aside 
        className={`flex flex-col border-r border-black/[0.06] bg-white transition-all duration-300 ease-in-out ${
          isSidebarCollapsed ? "w-16" : "w-64"
        }`}
      >
        <div className="flex h-12 items-center justify-between px-4 border-b border-black/[0.04]">
          {!isSidebarCollapsed && (
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#86868b]">模型服务</p>
          )}
          <button 
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className={`p-1.5 rounded-lg hover:bg-black/[0.04] text-[#86868b] transition-colors ${isSidebarCollapsed ? "mx-auto" : ""}`}
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex-1 space-y-0.5 p-3 overflow-y-auto">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const active = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id as SidebarSection)}
                className={`flex w-full items-center gap-3 rounded-xl transition-all duration-150 ${
                  isSidebarCollapsed ? "justify-center px-0 py-2.5" : "px-3.5 py-2.5"
                } ${
                  active
                    ? "bg-[#0071e3] text-white shadow-[0_3px_10px_rgba(0,113,227,0.18)]"
                    : "text-[#1d1d1f] hover:bg-black/[0.04]"
                }`}
              >
                <Icon
                  className={`h-4 w-4 shrink-0 ${active ? "text-white" : "text-[#86868b]"}`}
                  strokeWidth={active ? 2.5 : 2}
                />
                {!isSidebarCollapsed && <span className="font-medium truncate">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Account & quota */}
        <div className="border-t border-black/[0.06] p-3 space-y-2">
          {!isSidebarCollapsed ? (
            <>
              <div className="rounded-xl border border-black/[0.05] bg-[#f5f5f7] p-3">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold text-[#86868b] uppercase tracking-wider">今日调用</span>
                  <span className="text-[10px] font-bold text-[#0071e3]">2,341 / 5,000</span>
                </div>
                <div className="h-1 w-full rounded-full bg-black/[0.06] overflow-hidden">
                  <div className="h-full w-[47%] rounded-full bg-[#0071e3]" />
                </div>
              </div>

              <div className="relative">
                <button
                  onClick={() => setShowAccountMenu((v) => !v)}
                  className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 hover:bg-black/[0.04] transition-colors"
                >
                  <div className="h-7 w-7 rounded-full bg-gradient-to-br from-[#0071e3] to-[#5ac8fa] flex items-center justify-center shrink-0">
                    <User className="h-3.5 w-3.5 text-white" />
                  </div>
                  <div className="min-w-0 flex-1 text-left">
                    <p className="text-xs font-semibold truncate">企业版账户</p>
                    <p className="text-[10px] text-[#86868b] truncate">Lv.4 · 积分 2.0x</p>
                  </div>
                  <ChevronUp className={`h-3.5 w-3.5 text-[#86868b] transition-transform ${showAccountMenu ? "" : "rotate-180"}`} />
                </button>

                <AnimatePresence>
                  {showAccountMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      className="absolute bottom-full left-0 right-0 mb-1 rounded-xl border border-black/[0.08] bg-white shadow-lg overflow-hidden"
                    >
                      <button className="flex w-full items-center gap-2 px-4 py-2.5 text-xs font-medium text-[#0071e3] hover:bg-[#0071e3]/[0.04] transition-colors">
                        <ArrowUpRight className="h-3.5 w-3.5" />
                        申请更高额度
                      </button>
                      <button className="flex w-full items-center gap-2 px-4 py-2.5 text-xs font-medium text-[#1d1d1f] hover:bg-black/[0.03] transition-colors border-t border-black/[0.04]">
                        <HelpCircle className="h-3.5 w-3.5 text-[#86868b]" />
                        联系管理员
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center gap-4 py-2">
              <div className="group relative">
                <div className="h-10 w-1 rounded-full bg-black/[0.06] overflow-hidden">
                  <div className="absolute bottom-0 w-full bg-[#0071e3] rounded-full transition-all" style={{ height: '47%' }} />
                </div>
                <div className="absolute left-full ml-2 px-2 py-1 bg-black text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                  今日额度: 47%
                </div>
              </div>
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#0071e3] to-[#5ac8fa] flex items-center justify-center shadow-sm">
                <User className="h-4 w-4 text-white" />
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* Main inner header */}
        <div className="flex h-12 shrink-0 items-center justify-between border-b border-black/[0.06] bg-white/80 backdrop-blur-xl px-6 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="h-7 w-7 rounded-lg bg-[#0071e3]/[0.08] flex items-center justify-center">
              <Sparkles className="h-3.5 w-3.5 text-[#0071e3]" />
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-tight">接入模型服务</h1>
              <p className="text-[10px] text-[#86868b] leading-none mt-0.5">统一接入主流大模型，在线调试 Prompt</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!isWelcomeState && (
              <button
                onClick={() => setMessages([])}
                className="flex items-center gap-1.5 rounded-full border border-black/[0.08] px-3 py-1.5 text-[11px] font-medium text-[#86868b] hover:bg-black/[0.03] transition-colors"
              >
                <X className="h-3 w-3" />
                清除会话
              </button>
            )}
            <button
              onClick={() => setShowRightPanel(!showRightPanel)}
              className={`flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-[11px] font-semibold transition-all ${
                showRightPanel 
                  ? "bg-[#0071e3]/[0.08] text-[#0071e3]" 
                  : "text-[#86868b] hover:bg-black/[0.04]"
              }`}
            >
              <Wrench className={`h-3.5 w-3.5 ${showRightPanel ? "text-[#0071e3]" : "text-[#86868b]"}`} />
              <span className="hidden sm:inline">{showRightPanel ? "关闭设置" : "运行设置"}</span>
            </button>
          </div>
        </div>

        {/* Scrollable area */}
        <div className="flex-1 overflow-y-auto min-h-0">
          <AnimatePresence mode="wait">
            {isWelcomeState ? (
              /* ── Welcome / Home State ── */
              <motion.div
                key="welcome"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="max-w-5xl mx-auto p-8 space-y-10"
              >
                {/* Hero section */}
                <div className="text-center space-y-2 py-4">
                  <h2 className="text-2xl font-bold tracking-tight text-[#1d1d1f]">欢迎来到 iMedLoop 模型调试台</h2>
                  <p className="text-sm text-[#86868b] max-w-lg mx-auto">
                    选择一个能力方向开始测试，或在下方输入 Prompt 直接与最先进的大模型对话。
                  </p>
                </div>
                {/* Capability Cards */}
                <div>
                  <div className="flex items-center gap-2 mb-4 px-1">
                    <Sparkles className="h-4 w-4 text-[#0071e3]" />
                    <p className="text-[11px] font-bold uppercase tracking-widest text-[#86868b]">探索能力矩阵</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {capabilityCards.map((card) => {
                      const Icon = card.icon;
                      return (
                        <motion.button
                          key={card.id}
                          whileHover={{ y: -4, shadow: "0 20px 40px rgba(0,0,0,0.06)" }}
                          onClick={() => handleCapabilityClick(card)}
                          className="group flex flex-col gap-4 rounded-3xl border border-black/[0.05] bg-white p-5 text-left transition-all duration-300 hover:border-[#0071e3]/20"
                        >
                          <div className="flex items-center justify-between">
                            <div className="h-10 w-10 rounded-2xl bg-[#0071e3]/[0.05] flex items-center justify-center group-hover:bg-[#0071e3] transition-colors duration-300">
                              <Icon className="h-5 w-5 text-[#0071e3] group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                            </div>
                            <StatusBadge status={card.status} />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-[#1d1d1f] mb-1">{card.title}</p>
                            <p className="text-xs text-[#86868b] leading-relaxed line-clamp-2">{card.desc}</p>
                          </div>
                          <div className="pt-2 flex items-center gap-1.5 text-[11px] font-bold text-[#0071e3] opacity-0 group-hover:opacity-100 transition-all transform translate-y-1 group-hover:translate-y-0">
                            立即测试 <ChevronRight className="h-3 w-3" />
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Model List */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between px-1">
                    <div className="flex items-center gap-2">
                      <Cpu className="h-4 w-4 text-[#0071e3]" />
                      <p className="text-[11px] font-bold uppercase tracking-widest text-[#86868b]">推荐模型引擎</p>
                    </div>
                    <div className="flex items-center gap-1.5 p-1 rounded-full bg-black/[0.03] border border-black/[0.05]">
                      {filterLabels.map((f) => (
                        <button
                          key={f.id}
                          onClick={() => setModelFilter(f.id)}
                          className={`rounded-full px-3 py-1 text-[10px] font-bold transition-all ${
                            modelFilter === f.id
                              ? "bg-white text-[#0071e3] shadow-sm"
                              : "text-[#86868b] hover:text-[#1d1d1f]"
                          }`}
                        >
                          {f.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[32px] border border-black/[0.06] bg-white overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-[#f5f5f7]/50 border-b border-black/[0.04]">
                            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#86868b]">模型名称</th>
                            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#86868b] hidden md:table-cell">核心标签</th>
                            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#86868b]">上下文</th>
                            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#86868b] hidden lg:table-cell">平均延迟</th>
                            <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#86868b] text-right">操作</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredModels.map((model, idx) => (
                            <tr
                              key={model.id}
                              className={`group transition-colors hover:bg-[#0071e3]/[0.02] ${
                                idx !== filteredModels.length - 1 ? "border-b border-black/[0.03]" : ""
                              } ${selectedModel === model.id ? "bg-[#0071e3]/[0.04]" : ""}`}
                            >
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                  <div className="h-8 w-8 rounded-xl bg-white border border-black/[0.05] flex items-center justify-center shadow-sm">
                                    <VendorDot vendor={model.vendor} />
                                  </div>
                                  <div>
                                    <p className="text-xs font-bold text-[#1d1d1f] truncate max-w-[160px]">{model.name}</p>
                                    <p className="text-[10px] text-[#86868b]">{model.vendor}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 hidden md:table-cell">
                                <div className="flex flex-wrap gap-1.5">
                                  {model.tags.slice(0, 2).map((tag) => (
                                    <span key={tag} className="rounded-md bg-black/[0.03] px-1.5 py-0.5 text-[9px] font-bold text-[#86868b]">
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <span className="text-[11px] font-mono font-bold text-[#1d1d1f] bg-black/[0.03] px-2 py-0.5 rounded-md">{model.context}</span>
                              </td>
                              <td className="px-6 py-4 hidden lg:table-cell">
                                <span className="text-[11px] font-mono text-[#86868b] flex items-center gap-1">
                                  <Clock className="h-3 w-3" /> {model.latency}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-right">
                                {model.permission === "available" ? (
                                  <button
                                    onClick={() => handleModelSelect(model.id)}
                                    className={`rounded-xl px-4 py-1.5 text-[11px] font-bold transition-all ${
                                      selectedModel === model.id
                                        ? "bg-[#0071e3] text-white shadow-[0_4px_12px_rgba(0,113,227,0.2)]"
                                        : "border border-[#0071e3]/30 text-[#0071e3] hover:bg-[#0071e3]/[0.05]"
                                    }`}
                                  >
                                    {selectedModel === model.id ? "已选定" : "在线使用"}
                                  </button>
                                ) : (
                                  <button className="flex items-center gap-1.5 ml-auto rounded-xl border border-black/[0.06] px-3 py-1.5 text-[11px] font-bold text-[#86868b] hover:border-[#0071e3]/30 hover:text-[#0071e3] transition-all">
                                    <Lock className="h-3 w-3" /> 申请
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* ── Debug / Conversation State ── */
              <motion.div
                key="debug"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-6 space-y-4 pb-2"
              >
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                  >
                    <div
                      className={`h-7 w-7 rounded-full flex items-center justify-center shrink-0 ${
                        msg.role === "user"
                          ? "bg-gradient-to-br from-[#0071e3] to-[#5ac8fa]"
                          : "bg-[#f5f5f7] border border-black/[0.06]"
                      }`}
                    >
                      {msg.role === "user" ? (
                        <User className="h-3.5 w-3.5 text-white" />
                      ) : (
                        <Sparkles className="h-3.5 w-3.5 text-[#0071e3]" />
                      )}
                    </div>
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-[#0071e3] text-white"
                          : "bg-white border border-black/[0.07] text-[#1d1d1f] shadow-[0_1px_4px_rgba(0,0,0,0.04)]"
                      }`}
                    >
                      <div className="whitespace-pre-wrap">{msg.content}</div>
                    </div>
                  </div>
                ))}

                {isRunning && (
                  <div className="flex gap-3">
                    <div className="h-7 w-7 rounded-full bg-[#f5f5f7] border border-black/[0.06] flex items-center justify-center shrink-0">
                      <Sparkles className="h-3.5 w-3.5 text-[#0071e3]" />
                    </div>
                    <div className="rounded-2xl bg-white border border-black/[0.07] px-4 py-3 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
                      <div className="flex gap-1.5 items-center">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            animate={{ scale: [1, 1.25, 1], opacity: [0.3, 1, 0.3] }}
                            transition={{ repeat: Infinity, duration: 0.9, delay: i * 0.18 }}
                            className="h-2 w-2 rounded-full bg-[#0071e3]"
                          />
                        ))}
                        <span className="text-[11px] text-[#86868b] ml-1">{currentModel.name} 正在生成…</span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Bottom Fixed Prompt Input ── */}
        <div className="shrink-0 border-t border-black/[0.06] bg-white/90 backdrop-blur-xl px-6 py-4">
          {/* Example prompts (only in welcome state) */}
          {isWelcomeState && (
            <div className="flex flex-wrap gap-2 mb-3">
              {examplePrompts.map((p) => (
                <button
                  key={p}
                  onClick={() => {
                    setPrompt(p);
                    textareaRef.current?.focus();
                  }}
                  className="rounded-full border border-black/[0.07] bg-[#f5f5f7] px-3.5 py-1.5 text-[11px] text-[#86868b] hover:border-[#0071e3]/30 hover:text-[#0071e3] hover:bg-[#0071e3]/[0.04] transition-all truncate max-w-[340px]"
                >
                  {p}
                </button>
              ))}
            </div>
          )}

          <div className="rounded-2xl border border-black/[0.1] bg-white focus-within:border-[#0071e3]/35 focus-within:shadow-[0_4px_20px_rgba(0,113,227,0.08)] shadow-[0_1px_6px_rgba(0,0,0,0.04)] transition-all">
            <textarea
              ref={textareaRef}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleRun();
              }}
              placeholder="输入一个问题，快速测试模型效果… (⌘+Enter 发送)"
              rows={3}
              className="w-full resize-none bg-transparent px-4 pt-3.5 pb-2 text-sm leading-relaxed text-[#1d1d1f] placeholder-[#86868b] outline-none"
            />
            <div className="flex items-center justify-between px-3 pb-2.5">
              <div className="flex items-center gap-0.5">
                <button className="p-2 rounded-xl text-[#86868b] hover:bg-black/[0.04] hover:text-[#1d1d1f] transition-all" title="上传文件">
                  <Paperclip className="h-4 w-4" />
                </button>
                <button className="flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-[11px] font-medium text-[#86868b] hover:bg-black/[0.04] hover:text-[#1d1d1f] transition-all">
                  <Wrench className="h-3.5 w-3.5" />
                  Tools
                </button>
                <div className="flex items-center gap-1 ml-1">
                  <VendorDot vendor={currentModel.vendor} />
                  <span className="text-[11px] text-[#86868b] font-medium truncate max-w-[160px]">{currentModel.name}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1.5 rounded-xl border border-black/[0.08] px-3.5 py-2 text-xs font-semibold text-[#1d1d1f] hover:bg-black/[0.03] transition-all">
                  <Code2 className="h-3.5 w-3.5 text-[#86868b]" />
                  获取代码
                </button>
                <button
                  onClick={handleRun}
                  disabled={isRunning || !prompt.trim()}
                  className="flex items-center gap-1.5 rounded-xl bg-[#0071e3] px-4 py-2 text-xs font-bold text-white shadow-[0_2px_8px_rgba(0,113,227,0.25)] transition-all hover:opacity-90 active:scale-[0.97] disabled:opacity-30 disabled:shadow-none"
                >
                  <Send className="h-3.5 w-3.5" />
                  运行
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ── Right Settings Panel ── */}
      <AnimatePresence>
        {showRightPanel && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="flex shrink-0 flex-col border-l border-black/[0.06] bg-white overflow-hidden"
          >
            <div className="flex h-12 items-center px-5 border-b border-black/[0.04] shrink-0">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#86868b]">运行设置</p>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Model selection */}
          <section>
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#86868b] block mb-2">
              当前模型
            </label>
            <div className="relative">
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full appearance-none rounded-xl border border-black/[0.1] bg-[#f5f5f7] px-3.5 py-2.5 pr-8 text-xs font-medium text-[#1d1d1f] outline-none transition-all focus:border-[#0071e3]/40 focus:bg-white"
              >
                {modelList
                  .filter((m) => m.permission === "available")
                  .map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name}
                    </option>
                  ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#86868b] pointer-events-none" />
            </div>
          </section>

          {/* Sliders */}
          <section className="space-y-5">
            {[
              { label: "Temperature", value: temperature, set: setTemperature, min: 0, max: 2, step: 0.1 },
              { label: "Top P", value: topP, set: setTopP, min: 0, max: 1, step: 0.05 },
              { label: "Max Tokens", value: maxTokens, set: setMaxTokens, min: 256, max: 8192, step: 256 },
            ].map((s) => (
              <div key={s.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-[#86868b]">{s.label}</label>
                  <span className="text-[10px] font-mono font-bold text-[#0071e3] bg-[#0071e3]/[0.08] px-1.5 py-0.5 rounded">
                    {s.value}
                  </span>
                </div>
                <input
                  type="range"
                  min={s.min}
                  max={s.max}
                  step={s.step}
                  value={s.value}
                  onChange={(e) => s.set(parseFloat(e.target.value) as never)}
                  className="w-full h-1 rounded-full appearance-none accent-[#0071e3] cursor-pointer bg-black/[0.06]"
                />
              </div>
            ))}
          </section>

          {/* Output format */}
          <section className="pt-5 border-t border-black/[0.05]">
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#86868b] block mb-2">
              输出格式
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {(["text", "json", "markdown", "structured"] as OutputFormat[]).map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => setOutputFormat(fmt)}
                  className={`rounded-lg py-2 text-[11px] font-semibold transition-all ${
                    outputFormat === fmt
                      ? "bg-[#0071e3] text-white"
                      : "border border-black/[0.08] text-[#86868b] hover:border-[#0071e3]/30 hover:text-[#0071e3]"
                  }`}
                >
                  {fmt === "text" ? "文本" : fmt === "json" ? "JSON" : fmt === "markdown" ? "Markdown" : "结构化"}
                </button>
              ))}
            </div>
          </section>

          {/* Tool toggles */}
          <section className="pt-5 border-t border-black/[0.05]">
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#86868b] block mb-3">
              工具能力
            </label>
            <div className="space-y-3">
              {[
                { key: "webSearch", label: "联网检索", icon: Globe },
                { key: "codeExec", label: "代码执行", icon: Terminal },
                { key: "funcCall", label: "函数调用", icon: GitBranch },
                { key: "knowledgeBase", label: "知识库", icon: BookOpen },
                { key: "privateData", label: "私有数据集", icon: Database },
              ].map((tool) => (
                <div key={tool.key} className="flex items-center justify-between group">
                  <div className="flex items-center gap-2">
                    <tool.icon className="h-3.5 w-3.5 text-[#86868b] group-hover:text-[#0071e3] transition-colors" />
                    <span className="text-xs font-medium">{tool.label}</span>
                  </div>
                  <button
                    onClick={() => toggleTool(tool.key as keyof typeof tools)}
                    className="transition-opacity hover:opacity-80"
                  >
                    {tools[tool.key as keyof typeof tools] ? (
                      <ToggleRight className="h-5 w-5 text-[#0071e3]" />
                    ) : (
                      <ToggleLeft className="h-5 w-5 text-[#86868b]" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* API access info */}
          <section className="pt-5 border-t border-black/[0.05]">
            <div className="flex items-center gap-1.5 mb-3">
              <Key className="h-3.5 w-3.5 text-[#0071e3]" />
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#1d1d1f]">接入配置</label>
            </div>
            <div className="space-y-2">
              <div className="rounded-xl bg-[#f5f5f7] p-3">
                <p className="text-[9px] font-bold text-[#86868b] uppercase mb-1">Endpoint</p>
                <div className="flex items-center justify-between gap-2">
                  <code className="text-[10px] text-[#1d1d1f] font-mono truncate flex-1">
                    https://api.imedloop.com/v1
                  </code>
                  <button
                    onClick={() => {
                      setCopiedEndpoint(true);
                      setTimeout(() => setCopiedEndpoint(false), 2000);
                    }}
                    className="text-[#86868b] hover:text-[#0071e3] transition-colors shrink-0"
                  >
                    {copiedEndpoint ? (
                      <Check className="h-3 w-3 text-[#34c759]" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </button>
                </div>
              </div>
              <div className="rounded-xl bg-[#f5f5f7] p-3">
                <p className="text-[9px] font-bold text-[#86868b] uppercase mb-1">API Key</p>
                <div className="flex items-center justify-between gap-2">
                  <code className="text-[10px] text-[#1d1d1f] font-mono truncate flex-1">
                    sk-••••••••••3f2a
                  </code>
                  <button
                    onClick={() => {
                      setCopiedKey(true);
                      setTimeout(() => setCopiedKey(false), 2000);
                    }}
                    className="text-[#86868b] hover:text-[#0071e3] transition-colors shrink-0"
                  >
                    {copiedKey ? (
                      <Check className="h-3 w-3 text-[#34c759]" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </button>
                </div>
              </div>
              <button className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-black/[0.04] text-[11px] font-bold text-[#0071e3] hover:bg-[#0071e3]/[0.06] transition-all">
                <Code2 className="h-3.5 w-3.5" />
                查看 SDK 示例
              </button>
            </div>
          </section>

          {/* Quota overview */}
          <section className="pt-5 border-t border-black/[0.05]">
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#86868b] block mb-3">
              调用额度概览
            </label>
            <div className="space-y-2">
              {[
                { label: "今日调用", value: "2,341 次" },
                { label: "剩余额度", value: "2,659 次" },
                { label: "预计费用", value: "¥ 4.68" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-xs text-[#86868b]">{item.label}</span>
                  <span className="text-xs font-semibold text-[#1d1d1f]">{item.value}</span>
                </div>
              ))}
              <div className="mt-2 h-1 w-full rounded-full bg-black/[0.05] overflow-hidden">
                <div className="h-full w-[47%] rounded-full bg-[#0071e3]" />
              </div>
              <p className="text-[10px] text-[#86868b]">每日额度已使用 47%</p>
            </div>
          </section>
        </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}
