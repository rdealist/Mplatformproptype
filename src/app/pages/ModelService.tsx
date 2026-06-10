import { useState, useRef, useEffect, useMemo } from "react";
import { toast } from "sonner";
import { useSearchParams } from "react-router";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import imgOpenAI from "figma:asset/image-6.png";
import imgGemini from "figma:asset/image-7.png";
import imgAnthropic from "figma:asset/image-9.png";
import imgMistral from "figma:asset/image-10.png";
import imgLlama from "figma:asset/image-11.png";
import imgDeepseek from "figma:asset/image-12.png";
import imgQwen from "figma:asset/image-13.png";
import imgYi from "figma:asset/image-14.png";
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
  ShieldCheck,
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
  Plus,
  ArrowDownRight,
  ArrowUpRight as ArrowUpRightIcon,
  RefreshCcw,
  MoreHorizontal,
  ExternalLink,
  Settings,
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
  logo?: string;
  tags: string[];
  context: string;
  latency: string;
  permission: "available" | "restricted";
  categories: ModelFilter[];
  description?: string;
  isNew?: boolean;
}

interface ApiKeyEntry {
  id: string;
  name: string;
  key: string;
  usage: string;
  createdAt: string;
  status: "active" | "revoked";
}

interface CallLogEntry {
  id: string;
  time: string;
  tokenName: string;
  group: string;
  type: string;
  model: string;
  duration: string;
  firstToken: string;
  input: string;
  output: string;
  cost: string;
  ip: string;
  status: "success" | "error";
}

// ─── Static Data ──────────────────────────────────────────────────────────────

const sidebarItems = [
  { id: "home" as SidebarSection, label: "在线使用", icon: Play },
  { id: "market" as SidebarSection, label: "模型广场", icon: ShoppingBag },
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
    id: "gpt-5-image-mini",
    name: "gpt-5-image-mini",
    vendor: "OpenAI",
    logo: imgOpenAI,
    tags: ["多模态", "轻量化", "高性能"],
    context: "128K",
    latency: "~180ms",
    permission: "available",
    categories: ["text", "multimodal", "fast"],
    description: "下一代多模态轻量级模型，平衡了性能与响应速度，适用于大多数日常对话场景。",
    isNew: true,
  },
  {
    id: "qwen-max-latest",
    name: "qwen-max-latest",
    vendor: "Qwen",
    logo: imgQwen,
    tags: ["通用对话", "工具调用"],
    context: "128K",
    latency: "~420ms",
    permission: "available",
    categories: ["text", "fast"],
    description: "通义千问旗舰级模型，具备极强的逻辑推理与长文本理解能力，支持复杂的插件调用。",
  },
  {
    id: "claude-3-5-sonnet",
    name: "claude-3-5-sonnet",
    vendor: "Anthropic",
    logo: imgAnthropic,
    tags: ["代码生成", "长文本推理"],
    context: "200K",
    latency: "~520ms",
    permission: "available",
    categories: ["text", "code"],
    description: "最智能的 Claude 模型，在代码编写、创意写作和深度分析方面表现卓越。",
    isNew: true,
  },
  {
    id: "deepseek-v3",
    name: "deepseek-v3",
    vendor: "DeepSeek",
    logo: imgDeepseek,
    tags: ["深度推理", "逻辑思考"],
    context: "64K",
    latency: "~1.2s",
    permission: "available",
    categories: ["text"],
    description: "专为复杂推理任务设计的深度思考模型，在数学、逻辑及编程竞赛题目中表现优异。",
  },
  {
    id: "gemini-3.5-flash",
    name: "gemini-3.5-flash",
    vendor: "Google",
    logo: imgGemini,
    tags: ["极速响应", "视频理解"],
    context: "1M",
    latency: "~280ms",
    permission: "available",
    categories: ["multimodal", "fast"],
    description: "谷歌推出的超低延迟多模态模型，支持百万级上下文窗口，尤其擅长视频理解。",
  },
  {
    id: "mistral-large-2",
    name: "mistral-large-2",
    vendor: "Mistral",
    logo: imgMistral,
    tags: ["高效", "多语言"],
    context: "128K",
    latency: "~380ms",
    permission: "available",
    categories: ["text"],
    description: "来自 Mistral AI 的旗舰级多语言模型，在欧洲语言处理及效率方面具有独特优势。",
  },
  {
    id: "llama-3-3-70b",
    name: "llama-3-3-70b",
    vendor: "Meta",
    logo: imgLlama,
    tags: ["开源之最", "多场景"],
    context: "128K",
    latency: "~450ms",
    permission: "available",
    categories: ["text"],
    description: "目前最强大的开源模型之一，生态系统完善，适合各种私有化部署和微调任务。",
  },
  {
    id: "yi-lightning",
    name: "yi-lightning",
    vendor: "零一万物",
    logo: imgYi,
    tags: ["快速响应", "中文增强"],
    context: "32K",
    latency: "~150ms",
    permission: "available",
    categories: ["text", "fast"],
    description: "零一万物出品的极速模型，针对中文语境深度优化，响应速度快如闪电。",
  },
];

const apiKeysList: ApiKeyEntry[] = [
  {
    id: "1",
    name: "科研项目 A - 调试",
    key: "sk-imedloop-••••••••••••4a2b",
    usage: "¥ 124.50",
    createdAt: "2026-05-12 14:20",
    status: "active",
  },
  {
    id: "2",
    name: "临床数据处理 - 生产",
    key: "sk-imedloop-••••••••••••9e8f",
    usage: "¥ 1,280.00",
    createdAt: "2026-06-01 09:15",
    status: "active",
  },
  {
    id: "3",
    name: "旧版测试 Key",
    key: "sk-imedloop-••••••••••••1c2d",
    usage: "¥ 0.00",
    createdAt: "2026-04-20 11:45",
    status: "revoked",
  },
];

const callLogsList: CallLogEntry[] = [
  {
    id: "req_01",
    time: "2026-06-10 14:25:32",
    tokenName: "科研项目 A - 调试",
    group: "影像实验室",
    type: "Chat",
    model: "gpt-5-image-mini",
    duration: "1.2s",
    firstToken: "180ms",
    input: "240",
    output: "1,204",
    cost: "¥ 0.12",
    ip: "192.168.1.104",
    status: "success",
  },
  {
    id: "req_02",
    time: "2026-06-10 14:24:10",
    tokenName: "临床数据处理 - 生产",
    group: "心脏中心",
    type: "Embedding",
    model: "text-embedding-3",
    duration: "0.4s",
    firstToken: "-",
    input: "4,200",
    output: "-",
    cost: "¥ 0.04",
    ip: "10.0.42.12",
    status: "success",
  },
  {
    id: "req_03",
    time: "2026-06-10 14:20:05",
    tokenName: "科研项目 A - 调试",
    group: "影像实验室",
    type: "Chat",
    model: "claude-3-5-sonnet",
    duration: "2.8s",
    firstToken: "520ms",
    input: "1,240",
    output: "4,820",
    cost: "¥ 0.85",
    ip: "192.168.1.104",
    status: "success",
  },
  {
    id: "req_04",
    time: "2026-06-10 14:15:22",
    tokenName: "科研项目 A - 调试",
    group: "影像实验室",
    type: "Chat",
    model: "gpt-5-image-mini",
    duration: "1.5s",
    firstToken: "190ms",
    input: "560",
    output: "0",
    cost: "¥ 0.00",
    ip: "192.168.1.104",
    status: "error",
  },
  {
    id: "req_05",
    time: "2026-06-10 13:45:10",
    tokenName: "默认 Token",
    group: "iMedLoop",
    type: "Image",
    model: "dall-e-3",
    duration: "8.2s",
    firstToken: "-",
    input: "Prompt...",
    output: "1 img",
    cost: "¥ 0.35",
    ip: "114.12.3.4",
    status: "success",
  },
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
  const [searchParams, setSearchParams] = useSearchParams();
  const sectionFromParam = searchParams.get("section") as SidebarSection;
  
  const [activeSection, setActiveSection] = useState<SidebarSection>(sectionFromParam || "home");
  const [selectedModel, setSelectedModel] = useState("gpt-5-image-mini");
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(4096);
  const [topP, setTopP] = useState(1.0);
  const [frequencyPenalty, setFrequencyPenalty] = useState(0);
  const [presencePenalty, setPresencePenalty] = useState(0);
  const [seed, setSeed] = useState<number | "">("");
  const [showDocs, setShowDocs] = useState(false);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("text");
  const [modelFilter, setModelFilter] = useState<ModelFilter>("all");
  const [prompt, setPrompt] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "ai"; content: string }[]>([]);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isRightSidebarCollapsed, setIsRightSidebarCollapsed] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [tools, setTools] = useState({
    webSearch: false,
    codeExec: false,
    funcCall: false,
    knowledgeBase: true,
    privateData: false,
  });

  // Sync section from URL params
  useEffect(() => {
    if (sectionFromParam && sectionFromParam !== activeSection) {
      setActiveSection(sectionFromParam);
    }
  }, [sectionFromParam]);

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
          content: `**[${currentModel.name}]** 已收到您的请求。\n\n根据您的输入："${text}"\n\n以下是模拟生成的响应内容：\n\n1. 模型已成功接收 Prompt 并完成上下文分析。\n2. Temperature 设置为 ${temperature}，输出风格偏向${temperature < 0.5 ? "精确稳定" : temperature < 1.2 ? "平衡自然" : "富有创意"}。\n3. 当前上下文窗口：${currentModel.context}，延迟预估：${currentModel.latency}。\n\n如需集成到您的业务系统，可查看右侧配置面板中的 SDK 调用示例。`,
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

  const filterLabels: { id: ModelFilter; label: string }[] = [
    { id: "all", label: "全部模型" },
    { id: "text", label: "文本生成" },
    { id: "multimodal", label: "多模态" },
    { id: "code", label: "代码能力" },
    { id: "fast", label: "低延迟" },
    { id: "available", label: "已开通" },
  ];

  const sidebarItemsWithSection = useMemo(() => sidebarItems, []);

  const handleSectionChange = (id: SidebarSection) => {
    setActiveSection(id);
    setSearchParams({ section: id });
  };

  return (
    <div className="relative flex h-[calc(100vh-44px)] overflow-hidden bg-[#fbfbfd] text-[#1d1d1f] p-4 gap-4">
      <style dangerouslySetInnerHTML={{ __html: `
        .scrollbar-hide-default::-webkit-scrollbar { width: 4px; }
        .scrollbar-hide-default::-webkit-scrollbar-track { background: transparent; }
        .scrollbar-hide-default::-webkit-scrollbar-thumb { background: transparent; border-radius: 10px; }
        .scrollbar-hide-default:hover::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); }
        .dark .scrollbar-hide-default:hover::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); }
      `}} />

      {/* ── Help Documentation Overlay ── */}
      <AnimatePresence>
        {showDocs && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-white/20 backdrop-blur-3xl"
            onClick={() => setShowDocs(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl h-[85vh] overflow-hidden rounded-[40px] border border-black/[0.08] bg-white shadow-[0_32px_128px_rgba(0,0,0,0.12)] flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-10 py-8 border-b border-black/[0.04] bg-white/80 backdrop-blur-md sticky top-0 z-10">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-[#0071e3]/[0.08] flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-[#0071e3]" />
                  </div>
                  <div className="space-y-0.5">
                    <h2 className="text-xl font-bold tracking-tight text-[#1d1d1f]">模型接入帮助文档</h2>
                    <p className="text-xs text-[#86868b] font-medium">了解如何快速将 iMedLoop 模型能力集成到您的应用中</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowDocs(false)}
                  className="h-10 w-10 rounded-full bg-black/[0.04] flex items-center justify-center text-[#1d1d1f] hover:bg-black/[0.08] transition-all"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-10 space-y-10 scrollbar-hide-default">
                {/* Section 1: Introduction */}
                <section className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-[#0071e3]" />
                    <h3 className="text-base font-bold text-[#1d1d1f]">快速开始</h3>
                  </div>
                  <div className="pl-5 space-y-4">
                    <p className="text-sm text-[#424245] leading-relaxed">
                      iMedLoop 提供了标准化的 RESTful API 接口，您可以使用任何支持 HTTP 请求的语言（如 Python, Node.js, Go 等）进行接入。所有接口均采用 HTTPS 加密传输，确保医疗数据的安全性。
                    </p>
                    <div className="rounded-[24px] bg-[#f5f5f7] border border-black/[0.03] p-6 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-[#86868b] uppercase tracking-widest">Base URL</span>
                        <span className="px-2 py-0.5 rounded-md bg-white text-[10px] font-mono text-[#0071e3] border border-black/[0.05]">PROD</span>
                      </div>
                      <code className="block text-xs font-mono text-[#1d1d1f] bg-white p-3 rounded-xl border border-black/[0.04]">
                        https://api.imedloop.com/v1
                      </code>
                    </div>
                  </div>
                </section>

                {/* Section 2: Authentication */}
                <section className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-[#34c759]" />
                    <h3 className="text-base font-bold text-[#1d1d1f]">身份验证</h3>
                  </div>
                  <div className="pl-5 space-y-4">
                    <p className="text-sm text-[#424245] leading-relaxed">
                      在请求头中携带您的 API Key 进行身份验证。您可以在“模型服务 - API 密钥”中生成和管理您的密钥。
                    </p>
                    <div className="rounded-[24px] bg-[#1d1d1f] p-6">
                      <div className="flex items-center justify-between mb-3 text-[10px] font-mono text-white/40">
                        <span>HTTP Header</span>
                        <span className="flex items-center gap-1.5"><Terminal className="h-3 w-3" /> cURL</span>
                      </div>
                      <pre className="text-xs font-mono text-white/90 overflow-x-auto">
                        <code>{`Authorization: Bearer YOUR_API_KEY\nContent-Type: application/json`}</code>
                      </pre>
                    </div>
                  </div>
                </section>

                {/* Section 3: Integration Example */}
                <section className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-[#ff9500]" />
                    <h3 className="text-base font-bold text-[#1d1d1f]">集成示例 (Python)</h3>
                  </div>
                  <div className="pl-5 space-y-4">
                    <div className="rounded-[24px] bg-[#1d1d1f] p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex gap-2">
                          <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                          <div className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                          <div className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
                        </div>
                        <span className="text-[10px] font-mono text-white/40">main.py</span>
                      </div>
                      <pre className="text-xs font-mono text-white/90 overflow-x-auto leading-relaxed">
                        <code>{`import requests\n\ndef call_imed_model():\n    url = "https://api.imedloop.com/v1/chat/completions"\n    headers = {\n        "Authorization": "Bearer sk-imed-xxx",\n        "Content-Type": "application/json"\n    }\n    data = {\n        "model": "gpt-5-image-mini",\n        "messages": [{"role": "user", "content": "分析这张医学影像报告"}]\n    }\n    response = requests.post(url, headers=headers, json=data)\n    return response.json()`}</code>
                      </pre>
                    </div>
                  </div>
                </section>

                {/* Section 4: Tips */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-[28px] bg-[#0071e3]/[0.03] border border-[#0071e3]/10 p-6 flex gap-4">
                    <div className="h-10 w-10 rounded-xl bg-[#0071e3] flex items-center justify-center shrink-0">
                      <ShieldCheck className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#0071e3] mb-1">安全建议</h4>
                      <p className="text-[11px] text-[#424245] leading-relaxed">切勿在客户端代码或公开的代码仓库中明文存储 API Key。建议在服务端环境中使用环境变量进行管理。</p>
                    </div>
                  </div>
                  <div className="rounded-[28px] bg-[#34c759]/[0.03] border border-[#34c759]/10 p-6 flex gap-4">
                    <div className="h-10 w-10 rounded-xl bg-[#34c759] flex items-center justify-center shrink-0">
                      <Zap className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#34c759] mb-1">频率限制</h4>
                      <p className="text-[11px] text-[#424245] leading-relaxed">普通账户每分钟限制调用 200 次。如需更高并发支持，请联系客户经理申请企业开发者权限。</p>
                    </div>
                  </div>
                </div>

                {/* Footer Link */}
                <div className="pt-6 text-center">
                  <p className="text-xs text-[#86868b] mb-4">需要更详细的 API 参考？</p>
                  <button className="px-8 py-3 rounded-full bg-black text-white text-xs font-bold hover:bg-black/90 transition-all shadow-lg">
                    查看完整 API 参考手册
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Left Floating Navigation ── */}
      <div className="flex flex-col gap-4 z-20">
        <aside 
          className={`flex flex-col rounded-[32px] border border-black/[0.06] bg-white/80 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.04)] transition-all duration-300 ease-in-out shrink-0 ${
            isSidebarCollapsed ? "w-16" : "w-60"
          }`}
        >
          <div className="flex h-14 items-center justify-between px-5 border-b border-black/[0.04]">
            {!isSidebarCollapsed && (
              <p className="text-[11px] font-bold uppercase tracking-widest text-[#86868b]">模型服务</p>
            )}
            <button 
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className={`p-1.5 rounded-xl hover:bg-black/[0.04] text-[#86868b] transition-colors ${isSidebarCollapsed ? "mx-auto" : ""}`}
            >
              <LayoutGrid className="h-4.5 w-4.5" />
            </button>
          </div>

          <nav className="flex-1 space-y-1 p-3 overflow-y-auto">
            {sidebarItemsWithSection.map((item) => {
              const Icon = item.icon;
              const active = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSectionChange(item.id)}
                  className={`flex w-full items-center gap-3 rounded-[20px] transition-all duration-200 ${
                    isSidebarCollapsed ? "justify-center px-0 py-3" : "px-4 py-3"
                  } ${
                    active
                      ? "bg-[#0071e3] text-white shadow-[0_4px_16px_rgba(0,113,227,0.25)] scale-[1.02]"
                      : "text-[#1d1d1f] hover:bg-black/[0.04]"
                  }`}
                >
                  <Icon
                    className={`h-4.5 w-4.5 shrink-0 ${active ? "text-white" : "text-[#86868b]"}`}
                    strokeWidth={active ? 2.5 : 2}
                  />
                  {!isSidebarCollapsed && <span className="font-semibold text-xs truncate">{item.label}</span>}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Floating Quota Panel */}
        <div 
          className={`rounded-[32px] border border-black/[0.06] bg-white/80 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-5 transition-all duration-300 ${
            isSidebarCollapsed ? "w-16 items-center px-0 flex flex-col gap-4" : "w-60"
          }`}
        >
          {!isSidebarCollapsed ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#86868b] uppercase tracking-wider">免费额度</span>
                  <span className="text-[10px] font-bold text-[#0071e3]">剩 56%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-black/[0.06] overflow-hidden">
                  <div className="h-full w-[56%] rounded-full bg-[#0071e3]" />
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] text-[#86868b]">
                  <span>今日调用</span>
                  <span className="text-[#1d1d1f] font-semibold">124.5k</span>
                </div>
                <div className="flex justify-between text-[11px] text-[#86868b]">
                  <span>预计费用</span>
                  <span className="text-[#1d1d1f] font-semibold">¥ 12.45</span>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="group relative">
                <div className="h-10 w-1.5 rounded-full bg-black/[0.06] overflow-hidden">
                  <div className="absolute bottom-0 w-full bg-[#0071e3] rounded-full transition-all" style={{ height: '56%' }} />
                </div>
                <div className="absolute left-full ml-3 px-2 py-1 bg-black text-white text-[10px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                  剩余额度: 56%
                </div>
              </div>
              <Activity className="h-4.5 w-4.5 text-[#86868b]" />
            </>
          )}
        </div>
      </div>

      {/* ── Main Content ── */}
      <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* Main inner header */}
        <div className="flex shrink-0 items-center justify-end px-6 sticky top-0 z-30 bg-transparent">
          <div className="flex items-center gap-2 py-4">
            {activeSection === "home" && !isWelcomeState && (
              <button
                onClick={() => setMessages([])}
                className="flex items-center gap-1.5 rounded-full border border-black/[0.08] bg-white/50 backdrop-blur-md px-4 py-2 text-[11px] font-medium text-[#86868b] hover:bg-black/[0.03] transition-colors shadow-sm"
              >
                <X className="h-3.5 w-3.5" />
                清除会话
              </button>
            )}
          </div>
        </div>

        {/* Scrollable area */}
        <div className="flex-1 overflow-y-auto min-h-0 scrollbar-hide-default scroll-smooth">
          <AnimatePresence mode="wait">
            {activeSection === "home" && isWelcomeState ? (
              /* ── Welcome / Home State ── */
              <motion.div
                key="welcome"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="max-w-5xl mx-auto p-8 space-y-8"
              >
                {/* Hero section */}
                <div className="text-center space-y-3 pt-2 pb-4">
                  <motion.h2 
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-3xl font-bold tracking-tight text-[#1d1d1f]"
                  >
                    iMedLoop Playground
                  </motion.h2>
                  <p className="text-sm text-[#86868b] max-w-lg mx-auto leading-relaxed font-medium">
                    统一的模型服务工作台。在这里您可以调试 Prompt、管理 API 密钥并快速集成 AI 能力到您的医疗科研流程中。
                  </p>
                </div>
                
                {/* Capability Cards */}
                <div>
                  <div className="flex items-center gap-3 mb-4 px-1">
                    <div className="h-10 w-10 rounded-[14px] bg-[#0071e3]/[0.08] flex items-center justify-center">
                      <Sparkles className="h-5 w-5 text-[#0071e3]" />
                    </div>
                    <p className="text-[14px] font-bold text-[#6e6e73] tracking-tight">能力预设</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {capabilityCards.slice(0, 3).map((card) => {
                      const Icon = card.icon;
                      return (
                        <motion.button
                          key={card.id}
                          whileHover={{ y: -4, shadow: "0 20px 40px rgba(0,0,0,0.06)" }}
                          onClick={() => handleCapabilityClick(card)}
                          className="group flex flex-col gap-2.5 rounded-[32px] border border-black/[0.04] bg-white p-5 text-left transition-all duration-400 hover:border-[#0071e3]/20"
                        >
                          <div className="flex items-center gap-4">
                            <div className="h-9 w-9 rounded-[14px] bg-[#fbfbfd] flex items-center justify-center border border-black/[0.05] overflow-hidden shadow-sm group-hover:border-[#0071e3]/30 transition-all shrink-0">
                              <Icon className="h-5.5 w-5.5 text-[#0071e3]/80 group-hover:text-[#0071e3] transition-colors" strokeWidth={1.5} />
                            </div>
                            <p className="text-[14px] font-bold text-[#1d1d1f] tracking-tight">{card.title}</p>
                          </div>
                          <p className="text-[11px] text-[#86868b] leading-relaxed ml-0.5">{card.desc}</p>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Model Cards */}
                <div className="space-y-6 pb-6">
                  <div className="flex items-center justify-between px-1">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-[14px] bg-[#0071e3]/[0.08] flex items-center justify-center">
                        <Cpu className="h-5 w-5 text-[#0071e3]" />
                      </div>
                      <p className="text-[14px] font-bold text-[#6e6e73] tracking-tight">推荐模型</p>
                    </div>
                    <div className="flex items-center gap-1 p-1 rounded-full bg-black/[0.04] backdrop-blur-sm">
                      {filterLabels.slice(0, 4).map((f) => (
                        <button
                          key={f.id}
                          onClick={() => setModelFilter(f.id)}
                          className={`rounded-full px-3.5 py-1.5 text-[11px] font-bold transition-all ${
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredModels.map((model) => (
                      <button
                        key={model.id}
                        onClick={() => handleModelSelect(model.id)}
                        className={`group flex flex-col p-5 rounded-[32px] border transition-all duration-300 text-left ${
                          selectedModel === model.id
                            ? "border-[#0071e3] bg-white shadow-[0_12px_32px_rgba(0,113,227,0.12)] scale-[1.02]"
                            : "border-black/[0.05] bg-white hover:border-black/[0.1] hover:shadow-lg hover:scale-[1.01]"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3.5">
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-[14px] bg-[#fbfbfd] flex items-center justify-center border border-black/[0.05] overflow-hidden shadow-sm group-hover:border-[#0071e3]/30 transition-all">
                              <Cpu className="h-5.5 w-5.5 text-[#0071e3]/80 group-hover:text-[#0071e3] transition-colors" strokeWidth={1.5} />
                            </div>
                            <span className="text-[13px] font-bold text-[#1d1d1f] truncate tracking-tight">{model.name}</span>
                          </div>
                          {selectedModel === model.id && (
                            <CheckCircle2 className="h-4.5 w-4.5 text-[#0071e3]" />
                          )}
                        </div>
                        <p className="text-[11px] text-[#86868b] leading-relaxed mb-3.5 line-clamp-2 px-0.5">
                          {model.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5 mt-auto px-0.5">
                          {model.tags.map((tag) => (
                            <span key={tag} className="px-2 py-0.5 rounded-lg bg-[#f5f5f7] text-[9px] font-bold text-[#86868b] border border-black/[0.02]">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : activeSection === "market" ? (
              /* ── Model Market State ── */
              <motion.div
                key="market"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="w-full max-w-[1400px] mx-auto p-8 space-y-8"
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-bold tracking-tight">模型广场</h2>
                    <p className="text-xs text-[#86868b] font-medium">探索并接入最先进的各类大模型服务</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="relative group">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#86868b] group-focus-within:text-[#0071e3] transition-colors" />
                      <input 
                        type="text" 
                        placeholder="搜索模型..." 
                        className="h-10 w-72 rounded-xl border border-black/[0.08] bg-white pl-10 pr-4 text-xs font-medium outline-none focus:border-[#0071e3]/40 transition-all shadow-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-1.5 rounded-full bg-black/[0.04] w-fit backdrop-blur-sm">
                  {filterLabels.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setModelFilter(f.id)}
                      className={`rounded-full px-5 py-2 text-[11px] font-bold transition-all ${
                        modelFilter === f.id
                          ? "bg-white text-[#0071e3] shadow-md scale-105"
                          : "text-[#86868b] hover:text-[#1d1d1f]"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredModels.map((model) => (
                    <motion.div
                      key={model.id}
                      whileHover={{ y: -4 }}
                      className="group relative flex flex-col rounded-[32px] border border-black/[0.06] bg-white p-6 shadow-sm transition-all hover:shadow-xl hover:border-[#0071e3]/20"
                    >
                      {model.isNew && (
                        <div className="absolute top-4 right-4 rounded-full bg-[#34c759]/10 px-3 py-1 text-[9px] font-bold text-[#34c759] uppercase tracking-wider">
                          New
                        </div>
                      )}
                      
                      <div className="flex items-start gap-5 mb-6">
                        <div className="h-14 w-14 rounded-2xl bg-[#fbfbfd] border border-black/[0.04] flex items-center justify-center shrink-0 shadow-sm group-hover:border-[#0071e3]/30 transition-all">
                          <Cpu className="h-7 w-7 text-[#0071e3]" strokeWidth={1.5} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-base font-bold text-[#1d1d1f] truncate tracking-tight">{model.name}</h3>
                            <span className="px-2 py-0.5 rounded-md bg-black/[0.04] text-[9px] font-bold text-[#86868b] uppercase tracking-wider">{model.vendor}</span>
                          </div>
                          <p className="text-xs text-[#86868b] leading-relaxed line-clamp-2 font-medium">
                            {model.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-8">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#f5f5f7] border border-black/[0.02]">
                          <MessageSquare className="h-3.5 w-3.5 text-[#86868b]" />
                          <span className="text-[10px] font-bold text-[#1d1d1f]">{model.context} Context</span>
                        </div>
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#f5f5f7] border border-black/[0.02]">
                          <Clock className="h-3.5 w-3.5 text-[#86868b]" />
                          <span className="text-[10px] font-bold text-[#1d1d1f]">{model.latency} Latency</span>
                        </div>
                        {model.tags.map((tag) => (
                          <span key={tag} className="px-3 py-1.5 rounded-xl bg-[#0071e3]/[0.03] text-[10px] font-bold text-[#0071e3] border border-[#0071e3]/5">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="mt-auto flex items-center justify-between gap-4 pt-5 border-t border-black/[0.04]">
                        <div className="flex items-center gap-2 px-1">
                          <span className="h-2 w-2 rounded-full bg-[#34c759] shadow-[0_0_8px_rgba(52,199,89,0.4)] animate-pulse" />
                          <span className="text-[10px] font-bold text-[#86868b] uppercase tracking-wider">在线运行</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => handleSectionChange("docs")}
                            className="px-4 py-2 rounded-xl text-[11px] font-bold text-[#86868b] hover:bg-black/[0.04] transition-all"
                          >
                            文档
                          </button>
                          <button 
                            onClick={() => {
                              setSelectedModel(model.id);
                              handleSectionChange("home");
                              toast.success(`已切换至模型: ${model.name}`);
                            }}
                            className="px-6 py-2 rounded-xl bg-[#0071e3] text-[11px] font-bold text-white shadow-[0_4px_12px_rgba(0,113,227,0.2)] hover:opacity-95 hover:scale-[1.05] active:scale-[0.98] transition-all"
                          >
                            立即试用
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : activeSection === "logs" ? (
              /* ── Call Logs State (NEW) ── */
              <motion.div
                key="logs"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="w-full max-w-[1400px] mx-auto p-8 space-y-8"
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-bold tracking-tight">调用记录</h2>
                    <p className="text-xs text-[#86868b] font-medium">查看平台 API 调用明细与资源消耗统计</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 rounded-2xl border border-black/[0.08] bg-white px-4 py-2 text-xs font-bold text-[#1d1d1f] hover:bg-black/[0.02] transition-all">
                      <RefreshCcw className="h-4 w-4" />
                      刷新
                    </button>
                    <button className="flex items-center gap-2 rounded-2xl bg-[#0071e3] px-5 py-2.5 text-xs font-bold text-white shadow-[0_4px_12px_rgba(0,113,227,0.2)] hover:opacity-90 transition-all">
                      导出记录
                    </button>
                  </div>
                </div>

                {/* Metric Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {[
                    { label: "积分余额", value: "¥ 2,840.50", icon: CreditCard, color: "#0071e3", trend: "+120.00", trendIcon: ArrowUpRightIcon },
                    { label: "本月消耗", value: "¥ 420.12", icon: BarChart2, color: "#5856d6", trend: "-5.2%", trendIcon: ArrowDownRight },
                    { label: "今日调用", value: "1,204", icon: Activity, color: "#34c759", trend: "+24.8%", trendIcon: ArrowUpRightIcon },
                    { label: "异常调用", value: "2", icon: AlertCircle, color: "#ff3b30", trend: "0", trendIcon: Check },
                  ].map((card, i) => (
                    <div key={i} className="rounded-[32px] border border-black/[0.06] bg-white p-6 shadow-sm hover:shadow-md transition-all group">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`h-10 w-10 rounded-[14px] flex items-center justify-center bg-opacity-10`} style={{ backgroundColor: `${card.color}1A` }}>
                          <card.icon className="h-5 w-5" style={{ color: card.color }} />
                        </div>
                        <button className="p-1.5 rounded-lg text-[#86868b] opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-[#86868b] mb-1">{card.label}</p>
                      <div className="flex items-end justify-between">
                        <h3 className="text-2xl font-bold text-[#1d1d1f] tracking-tight">{card.value}</h3>
                        <div className={`flex items-center gap-1 text-[11px] font-bold ${i === 3 ? "text-[#86868b]" : i === 1 ? "text-[#ff3b30]" : "text-[#34c759]"}`}>
                          <card.trendIcon className="h-3 w-3" />
                          {card.trend}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-4 bg-white/50 backdrop-blur-sm p-4 rounded-[24px] border border-black/[0.04]">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#86868b]" />
                    <input 
                      type="text" 
                      placeholder="搜索 Request ID / IP..." 
                      className="h-10 w-64 rounded-xl border border-black/[0.08] bg-white pl-9 pr-4 text-xs font-medium outline-none focus:border-[#0071e3]/40 transition-all"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <select className="h-10 rounded-xl border border-black/[0.08] bg-white px-3 text-xs font-medium outline-none appearance-none pr-8 relative cursor-pointer hover:border-black/[0.15] transition-all">
                      <option>所有模型</option>
                      <option>gpt-5-image-mini</option>
                      <option>claude-3-5-sonnet</option>
                      <option>qwen-max</option>
                    </select>
                    <select className="h-10 rounded-xl border border-black/[0.08] bg-white px-3 text-xs font-medium outline-none appearance-none pr-8 relative cursor-pointer hover:border-black/[0.15] transition-all">
                      <option>近 24 小时</option>
                      <option>近 7 天</option>
                      <option>近 30 天</option>
                    </select>
                    <button className="flex items-center gap-2 h-10 px-4 rounded-xl border border-black/[0.08] bg-white text-xs font-bold text-[#1d1d1f] hover:bg-black/[0.02] transition-all">
                      <Filter className="h-4 w-4" />
                      高级筛选
                    </button>
                  </div>
                </div>

                {/* Logs Table */}
                <div className="rounded-[32px] border border-black/[0.06] bg-white overflow-hidden shadow-sm">
                  <div className="overflow-x-auto scrollbar-hide-default">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-black/[0.04] bg-black/[0.01]">
                          <th className="px-6 py-5 text-[11px] font-bold uppercase tracking-wider text-[#86868b]">调用时间</th>
                          <th className="px-6 py-5 text-[11px] font-bold uppercase tracking-wider text-[#86868b]">Token 名称</th>
                          <th className="px-6 py-5 text-[11px] font-bold uppercase tracking-wider text-[#86868b]">所属团队</th>
                          <th className="px-6 py-5 text-[11px] font-bold uppercase tracking-wider text-[#86868b]">类型</th>
                          <th className="px-6 py-5 text-[11px] font-bold uppercase tracking-wider text-[#86868b]">调用模型</th>
                          <th className="px-6 py-5 text-[11px] font-bold uppercase tracking-wider text-[#86868b]">总耗时/首字</th>
                          <th className="px-6 py-5 text-[11px] font-bold uppercase tracking-wider text-[#86868b]">输入</th>
                          <th className="px-6 py-5 text-[11px] font-bold uppercase tracking-wider text-[#86868b]">输出</th>
                          <th className="px-6 py-5 text-[11px] font-bold uppercase tracking-wider text-[#86868b]">费用</th>
                          <th className="px-6 py-5 text-[11px] font-bold uppercase tracking-wider text-[#86868b]">IP 地址</th>
                          <th className="px-6 py-5 text-[11px] font-bold uppercase tracking-wider text-[#86868b] text-center">操作</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-black/[0.03]">
                        {callLogsList.map((log) => (
                          <tr key={log.id} className="group hover:bg-[#fbfbfd] transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-[11px] font-medium text-[#1d1d1f]">{log.time}</span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <Key className="h-3 w-3 text-[#86868b]" />
                                <span className="text-[11px] font-bold text-[#1d1d1f] truncate max-w-[120px]">{log.tokenName}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="text-[11px] font-medium text-[#86868b]">{log.group}</span>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider ${
                                log.type === "Chat" ? "bg-blue-50 text-blue-600" : log.type === "Image" ? "bg-purple-50 text-purple-600" : "bg-gray-50 text-gray-600"
                              }`}>
                                {log.type}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <div className="h-5 w-5 rounded bg-black/[0.03] flex items-center justify-center">
                                  <Cpu className="h-3 w-3 text-[#0071e3]" />
                                </div>
                                <span className="text-[11px] font-bold text-[#1d1d1f]">{log.model}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex flex-col">
                                <span className="text-[11px] font-bold text-[#1d1d1f]">{log.duration}</span>
                                <span className="text-[9px] text-[#86868b]">{log.firstToken}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="text-[11px] font-bold text-[#1d1d1f]">{log.input}</span>
                            </td>
                            <td className="px-6 py-4">
                              <span className="text-[11px] font-bold text-[#1d1d1f]">{log.output}</span>
                            </td>
                            <td className="px-6 py-4">
                              <span className="text-[11px] font-bold text-[#0071e3]">{log.cost}</span>
                            </td>
                            <td className="px-6 py-4">
                              <span className="text-[11px] text-[#86868b] font-mono">{log.ip}</span>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-2 rounded-xl text-[#86868b] hover:bg-black/[0.04] hover:text-[#0071e3] transition-all" title="查看明细">
                                  <ExternalLink className="h-4 w-4" />
                                </button>
                                <button className={`p-2 rounded-xl transition-all ${log.status === "success" ? "text-green-500" : "text-red-500"}`}>
                                  {log.status === "success" ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="p-4 border-t border-black/[0.04] bg-[#fbfbfd] flex items-center justify-between">
                    <p className="text-[11px] text-[#86868b] font-medium">显示 1 到 5 条，共 1,204 条记录</p>
                    <div className="flex items-center gap-2">
                      <button className="px-3 py-1.5 rounded-lg border border-black/[0.06] text-[11px] font-bold text-[#86868b] disabled:opacity-30">上一页</button>
                      <button className="px-3 py-1.5 rounded-lg border border-[#0071e3]/20 bg-[#0071e3]/[0.05] text-[11px] font-bold text-[#0071e3]">1</button>
                      <button className="px-3 py-1.5 rounded-lg border border-black/[0.06] text-[11px] font-bold text-[#86868b]">2</button>
                      <button className="px-3 py-1.5 rounded-lg border border-black/[0.06] text-[11px] font-bold text-[#86868b]">3</button>
                      <span className="text-[#86868b] px-1">...</span>
                      <button className="px-3 py-1.5 rounded-lg border border-black/[0.06] text-[11px] font-bold text-[#86868b]">下一页</button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : activeSection === "apikeys" ? (
              /* ── API Keys Management State ── */
              <motion.div
                key="apikeys"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="w-full max-w-[1400px] mx-auto p-8 space-y-8"
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-bold tracking-tight">API Key 管理</h2>
                    <p className="text-xs text-[#86868b] font-medium">管理您的模型访问凭据与调用权限</p>
                  </div>
                  <button className="flex items-center gap-2 rounded-[20px] bg-[#0071e3] px-6 py-3 text-xs font-bold text-white shadow-[0_8px_24px_rgba(0,113,227,0.25)] hover:opacity-90 hover:scale-[1.02] transition-all">
                    <Plus className="h-4.5 w-4.5" />
                    创建 API Key
                  </button>
                </div>

                <div className="rounded-[32px] border border-black/[0.06] bg-white overflow-hidden shadow-sm">
                  <div className="flex items-center justify-between p-5 border-b border-black/[0.04] bg-[#fbfbfd]">
                    <div className="relative">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#86868b]" />
                      <input 
                        type="text" 
                        placeholder="搜索 API Key 名称..." 
                        className="h-10 w-72 rounded-xl border border-black/[0.08] bg-white pl-10 pr-4 text-xs font-medium outline-none focus:border-[#0071e3]/40 transition-all"
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <button className="p-2.5 rounded-xl border border-black/[0.06] text-[#86868b] hover:bg-black/[0.04] transition-all">
                        <Filter className="h-4.5 w-4.5" />
                      </button>
                    </div>
                  </div>

                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-black/[0.04] bg-black/[0.01]">
                        <th className="px-6 py-5 text-[11px] font-bold uppercase tracking-wider text-[#86868b]">名称</th>
                        <th className="px-6 py-5 text-[11px] font-bold uppercase tracking-wider text-[#86868b]">API Key</th>
                        <th className="px-6 py-5 text-[11px] font-bold uppercase tracking-wider text-[#86868b]">已用额度</th>
                        <th className="px-6 py-5 text-[11px] font-bold uppercase tracking-wider text-[#86868b]">创建时间</th>
                        <th className="px-6 py-5 text-[11px] font-bold uppercase tracking-wider text-[#86868b]">状态</th>
                        <th className="px-6 py-5 text-[11px] font-bold uppercase tracking-wider text-[#86868b] text-right">操作</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/[0.03]">
                      {apiKeysList.map((item) => (
                        <tr key={item.id} className="group hover:bg-black/[0.01] transition-colors">
                          <td className="px-6 py-5">
                            <span className="text-xs font-bold text-[#1d1d1f]">{item.name}</span>
                          </td>
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-2">
                              <code className="text-[11px] font-mono text-[#86868b] bg-black/[0.03] px-2.5 py-1 rounded-lg">{item.key}</code>
                              <button 
                                onClick={() => {
                                  navigator.clipboard.writeText(item.key);
                                  toast.success("API Key 已复制");
                                }}
                                className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-[#86868b] hover:text-[#0071e3] transition-all"
                              >
                                <Copy className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            <span className="text-[11px] font-bold text-[#1d1d1f]">{item.usage}</span>
                          </td>
                          <td className="px-6 py-5">
                            <span className="text-[11px] text-[#86868b] font-medium">{item.createdAt}</span>
                          </td>
                          <td className="px-6 py-5">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold ${
                              item.status === "active" 
                                ? "bg-[#34c759]/10 text-[#34c759]" 
                                : "bg-black/[0.06] text-[#86868b]"
                            }`}>
                              <span className={`h-1.5 w-1.5 rounded-full ${item.status === "active" ? "bg-[#34c759]" : "bg-[#86868b]"}`} />
                              {item.status === "active" ? "正常" : "已失效"}
                            </span>
                          </td>
                          <td className="px-6 py-5 text-right">
                            <div className="flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button className="p-2.5 rounded-xl text-[#86868b] hover:bg-black/[0.04] hover:text-[#0071e3] transition-all">
                                <Settings className="h-4.5 w-4.5" />
                              </button>
                              <button className="p-2.5 rounded-xl text-[#86868b] hover:bg-black/[0.04] hover:text-red-500 transition-all">
                                <X className="h-4.5 w-4.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            ) : activeSection === "docs" ? (
              /* ── Comprehensive Help Documentation State ── */
              <motion.div
                key="docs"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex h-full w-full"
              >
                {/* Left Mini-Sidebar for Docs */}
                <div className="w-64 border-r border-black/[0.04] p-6 space-y-8 overflow-y-auto scrollbar-hide-default">
                  <div className="space-y-4">
                    <h3 className="text-[11px] font-bold text-[#86868b] uppercase tracking-widest px-2">入门指南</h3>
                    <div className="space-y-1">
                      {[
                        { label: "介绍", active: true },
                        { label: "快速开始", active: false },
                        { label: "身份验证", active: false },
                        { label: "计费说明", active: false },
                      ].map((item, i) => (
                        <button
                          key={i}
                          className={`w-full flex items-center px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                            item.active
                              ? "bg-[#0071e3]/[0.08] text-[#0071e3]"
                              : "text-[#424245] hover:bg-black/[0.03]"
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-[11px] font-bold text-[#86868b] uppercase tracking-widest px-2">API 参考</h3>
                    <div className="space-y-1">
                      {[
                        { label: "对话 (Chat)", active: false },
                        { label: "模型列表", active: false },
                        { label: "图像生成", active: false },
                        { label: "向量化 (Embed)", active: false },
                        { label: "文件管理", active: false },
                      ].map((item, i) => (
                        <button
                          key={i}
                          className="w-full flex items-center px-3 py-2 rounded-xl text-xs font-bold text-[#424245] hover:bg-black/[0.03] transition-all"
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-[11px] font-bold text-[#86868b] uppercase tracking-widest px-2">其他</h3>
                    <div className="space-y-1">
                      {[
                        { label: "错误码列表", active: false },
                        { label: "最佳实践", active: false },
                        { label: "安全规范", active: false },
                      ].map((item, i) => (
                        <button
                          key={i}
                          className="w-full flex items-center px-3 py-2 rounded-xl text-xs font-bold text-[#424245] hover:bg-black/[0.03] transition-all"
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 overflow-y-auto scrollbar-hide-default">
                  {/* Sticky Search/Header for Docs */}
                  <div className="sticky top-0 z-10 flex items-center justify-between px-12 py-4 bg-white/80 backdrop-blur-xl border-b border-black/[0.04]">
                    <div className="relative w-72">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#86868b]" />
                      <input 
                        type="text" 
                        placeholder="搜索文档..." 
                        className="h-9 w-full rounded-full bg-black/[0.04] pl-9 pr-4 text-[11px] font-medium outline-none focus:bg-white focus:ring-1 focus:ring-[#0071e3]/20 transition-all"
                      />
                    </div>
                    <div className="flex items-center gap-4">
                      <button className="text-[11px] font-bold text-[#86868b] hover:text-[#1d1d1f] transition-colors">反馈</button>
                      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0071e3] text-[10px] font-bold text-white shadow-lg shadow-[#0071e3]/20">
                        <ExternalLink className="h-3 w-3" />
                        开发者社区
                      </button>
                    </div>
                  </div>

                  <div className="max-w-3xl mx-auto p-12 space-y-12">
                    {/* Hero Section */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-[#0071e3]/[0.08] flex items-center justify-center">
                          <BookOpen className="h-5 w-5 text-[#0071e3]" />
                        </div>
                        <span className="text-xs font-bold text-[#0071e3] uppercase tracking-wider">开发文档</span>
                      </div>
                      <h1 className="text-4xl font-bold tracking-tight text-[#1d1d1f]">iMedLoop API 接入指南</h1>
                      <p className="text-base text-[#86868b] font-medium leading-relaxed">
                        iMedLoop 平台提供了标准化的 RESTful API 接口，旨在帮助医疗开发者、科研机构及医疗机构快速集成业内领先的医疗大语言模型。
                      </p>
                    </div>

                    {/* Step Section */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="h-8 w-8 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold">1</div>
                        <h2 className="text-xl font-bold text-[#1d1d1f]">获取 API 密钥</h2>
                      </div>
                      <div className="pl-12 space-y-4">
                        <p className="text-sm text-[#424245] leading-relaxed">
                          在开始调用之前，您需要在控制台的“API Key 管理”页面创建一个新的密钥。请妥善保管您的密钥，切勿直接暴露在客户端代码中。
                        </p>
                        <div className="p-4 rounded-2xl bg-[#f5f5f7] border border-black/[0.03] flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Key className="h-4 w-4 text-[#86868b]" />
                            <code className="text-[11px] font-mono font-bold text-[#1d1d1f]">sk-imedloop-••••••••••••••••</code>
                          </div>
                          <button 
                            onClick={() => {
                              setActiveSection("apikeys");
                              setSearchParams({ section: "apikeys" });
                            }}
                            className="text-[11px] font-bold text-[#0071e3] hover:underline"
                          >
                            去管理密钥 →
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Code Section */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="h-8 w-8 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold">2</div>
                        <h2 className="text-xl font-bold text-[#1d1d1f]">发起首个请求</h2>
                      </div>
                      <div className="pl-12 space-y-6">
                        <p className="text-sm text-[#424245] leading-relaxed">
                          使用标准 HTTP POST 请求调用对话接口。接口端点为：
                        </p>
                        <div className="rounded-[24px] bg-[#1d1d1f] shadow-2xl overflow-hidden">
                          <div className="flex items-center justify-between px-5 py-3 bg-white/[0.05] border-b border-white/[0.05]">
                            <div className="flex gap-1.5">
                              <div className="h-2 w-2 rounded-full bg-[#ff5f56]" />
                              <div className="h-2 w-2 rounded-full bg-[#ffbd2e]" />
                              <div className="h-2 w-2 rounded-full bg-[#27c93f]" />
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">POST</span>
                              <span className="text-[10px] font-mono text-white/40">/v1/chat/completions</span>
                            </div>
                          </div>
                          <div className="p-6 overflow-x-auto scrollbar-hide-default">
                            <pre className="text-[12px] font-mono text-white/90 leading-relaxed">
                              <code>{`# 使用 cURL 发起请求
curl https://api.imedloop.com/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "model": "gpt-5-image-mini",
    "messages": [
      {
        "role": "user",
        "content": "请分析下这位患者的血常规指标是否异常..."
      }
    ],
    "temperature": 0.7
  }'`}</code>
                            </pre>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Table Section */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="h-2 w-2 rounded-full bg-[#0071e3]" />
                        <h3 className="text-base font-bold text-[#1d1d1f]">核心请求参数</h3>
                      </div>
                      <div className="pl-5 rounded-[24px] border border-black/[0.06] overflow-hidden">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="bg-[#fbfbfd] border-b border-black/[0.04]">
                              <th className="px-5 py-4 text-[11px] font-bold text-[#86868b] uppercase tracking-wider">参数名</th>
                              <th className="px-5 py-4 text-[11px] font-bold text-[#86868b] uppercase tracking-wider">类型</th>
                              <th className="px-5 py-4 text-[11px] font-bold text-[#86868b] uppercase tracking-wider">必选</th>
                              <th className="px-5 py-4 text-[11px] font-bold text-[#86868b] uppercase tracking-wider">描述</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-black/[0.03]">
                            {[
                              { name: "model", type: "string", req: "是", desc: "要使用的模型 ID，如 gpt-5-image-mini" },
                              { name: "messages", type: "array", req: "是", desc: "对话上下文列表" },
                              { name: "temperature", type: "float", req: "否", desc: "采样温度，介于 0 到 2 之间" },
                              { name: "max_tokens", type: "integer", req: "否", desc: "生成内容的最大 Token 数量" },
                            ].map((row, i) => (
                              <tr key={i}>
                                <td className="px-5 py-4 text-[11px] font-mono font-bold text-[#0071e3]">{row.name}</td>
                                <td className="px-5 py-4 text-[11px] text-[#424245] font-medium">{row.type}</td>
                                <td className="px-5 py-4 text-[11px] text-[#424245] font-medium">{row.req}</td>
                                <td className="px-5 py-4 text-[11px] text-[#86868b] font-medium">{row.desc}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Footer Guide */}
                    <div className="p-8 rounded-[32px] bg-gradient-to-br from-[#0071e3] to-[#005bb5] text-white space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h3 className="text-xl font-bold">需要更深入的探索？</h3>
                          <p className="text-white/80 text-xs font-medium">访问我们的 GitHub 获取完整的 SDK 与开发案例。</p>
                        </div>
                        <button className="px-6 py-3 rounded-full bg-white text-[#0071e3] text-xs font-bold hover:bg-white/90 transition-all shadow-xl">
                          浏览 SDK 仓库
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* ── Playground / Conversation State ── */
              <motion.div
                key="debug"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-8 space-y-6 pb-4"
              >
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                  >
                    <div
                      className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
                        msg.role === "user"
                          ? "bg-gradient-to-br from-[#0071e3] to-[#005bb5]"
                          : "bg-white border border-black/[0.06]"
                      }`}
                    >
                      {msg.role === "user" ? (
                        <User className="h-4.5 w-4.5 text-white" />
                      ) : (
                        <Sparkles className="h-4.5 w-4.5 text-[#0071e3]" />
                      )}
                    </div>
                    <div
                      className={`max-w-[75%] rounded-[24px] px-5 py-4 text-[14px] leading-[1.6] ${
                        msg.role === "user"
                          ? "bg-[#0071e3] text-white shadow-[0_4px_16px_rgba(0,113,227,0.2)]"
                          : "bg-white border border-black/[0.07] text-[#1d1d1f] shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                      }`}
                    >
                      <div className="whitespace-pre-wrap">{msg.content}</div>
                    </div>
                  </div>
                ))}

                {isRunning && (
                  <div className="flex gap-4">
                    <div className="h-9 w-9 rounded-full bg-white border border-black/[0.06] flex items-center justify-center shrink-0 shadow-sm">
                      <Sparkles className="h-4.5 w-4.5 text-[#0071e3]" />
                    </div>
                    <div className="rounded-[24px] bg-white border border-black/[0.07] px-5 py-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                      <div className="flex gap-1.5 items-center">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            animate={{ scale: [1, 1.25, 1], opacity: [0.3, 1, 0.3] }}
                            transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                            className="h-2 w-2 rounded-full bg-[#0071e3]"
                          />
                        ))}
                        <span className="text-[12px] font-bold text-[#86868b] ml-2 tracking-tight">{currentModel.name} 正在思考…</span>
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
        {activeSection === "home" && (
          <div className="shrink-0 bg-transparent px-8 py-6">
            <div className="max-w-4xl mx-auto rounded-[32px] border border-black/[0.08] bg-white focus-within:border-[#0071e3]/30 focus-within:shadow-[0_8px_40px_rgba(0,113,227,0.12)] shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-300">
              <textarea
                ref={textareaRef}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleRun();
                }}
                placeholder="输入一个医疗科研相关的场景或问题，快速测试模型效果… (⌘+Enter 发送)"
                rows={3}
                className="w-full resize-none bg-transparent px-6 pt-5 pb-3 text-[14px] leading-[1.6] text-[#1d1d1f] placeholder-[#86868b] outline-none"
              />
              <div className="flex items-center justify-between px-5 pb-4">
                <div className="flex items-center gap-1">
                  <button className="p-2.5 rounded-xl text-[#86868b] hover:bg-black/[0.04] hover:text-[#1d1d1f] transition-all" title="上传参考文件">
                    <Paperclip className="h-4.5 w-4.5" />
                  </button>
                  <button className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-[11px] font-bold text-[#86868b] hover:bg-black/[0.04] hover:text-[#1d1d1f] transition-all">
                    <Wrench className="h-4 w-4" />
                    插件调用
                  </button>
                  <div className="h-4 w-[1px] bg-black/[0.06] mx-2" />
                  <div className="flex items-center gap-2">
                    <VendorDot vendor={currentModel.vendor} />
                    <span className="text-[11px] text-[#86868b] font-bold truncate max-w-[160px] tracking-tight">{currentModel.name}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleRun}
                    disabled={isRunning || !prompt.trim()}
                    className="flex items-center gap-2 rounded-[20px] bg-[#0071e3] px-6 py-2.5 text-xs font-bold text-white shadow-[0_4px_16px_rgba(0,113,227,0.25)] transition-all hover:opacity-90 active:scale-[0.97] disabled:opacity-30 disabled:shadow-none"
                  >
                    <Send className="h-4 w-4" />
                    发送请求
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ── Right Floating Settings Panel ── */}
      <div className={`flex flex-col shrink-0 z-20 transition-all duration-400 ease-in-out ${isRightSidebarCollapsed ? "h-fit" : "h-full"}`} style={{ width: isRightSidebarCollapsed ? '56px' : '340px' }}>
        <aside
          className={`flex h-full flex-col rounded-[32px] border border-black/[0.06] bg-white/95 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.06)] overflow-hidden`}
        >
          <div className="flex h-14 items-center justify-between px-4 border-b border-black/[0.04] shrink-0">
            {!isRightSidebarCollapsed && (
              <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#86868b] px-2">参数配置</p>
            )}
            <button
              onClick={() => setIsRightSidebarCollapsed(!isRightSidebarCollapsed)}
              className={`p-2 rounded-xl hover:bg-black/[0.04] text-[#86868b] transition-colors ${isRightSidebarCollapsed ? "mx-auto" : ""}`}
            >
              {isRightSidebarCollapsed ? (
                <Wrench className="h-4.5 w-4.5" />
              ) : (
                <ChevronRight className="h-4.5 w-4.5" />
              )}
            </button>
          </div>

          <div className={`flex-1 overflow-y-auto min-w-0 ${isRightSidebarCollapsed ? 'hidden' : 'block'}`}>
            <div className="p-6 space-y-8">
              {/* One-click config */}
              <button 
                onClick={() => toast.success("配置信息已复制到��贴板")}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-[20px] bg-[#0071e3] text-xs font-bold text-white shadow-[0_4px_16px_rgba(0,113,227,0.2)] hover:opacity-95 hover:scale-[1.02] transition-all"
              >
                <Copy className="h-4 w-4" />
                获取当前配置 SDK
              </button>

              {/* Model selection */}
              <section className="space-y-4">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#86868b] block px-1">
                  正在使用
                </label>
                <div className="flex items-center gap-3 p-4 rounded-[24px] bg-[#fbfbfd] border border-black/[0.04]">
                  <div className="h-10 w-10 rounded-[14px] bg-white shadow-sm flex items-center justify-center border border-black/[0.04]">
                    <Cpu className="h-5 w-5 text-[#0071e3]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-bold text-[#1d1d1f] truncate">{currentModel.name}</p>
                    <p className="text-[10px] font-semibold text-[#86868b] uppercase">{currentModel.vendor}</p>
                  </div>
                  <button 
                    onClick={() => setActiveSection("market")}
                    className="p-1.5 rounded-lg hover:bg-black/[0.04] text-[#86868b]"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
              </section>

              {/* Parameters */}
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-[11px] font-bold text-[#1d1d1f]">Temperature</label>
                    <span className="text-[11px] font-mono text-[#0071e3] font-bold">{temperature}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="2"
                    step="0.01"
                    value={temperature}
                    onChange={(e) => setTemperature(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-black/[0.06] rounded-full appearance-none cursor-pointer accent-[#0071e3]"
                  />
                  <div className="flex justify-between text-[9px] text-[#86868b] font-bold px-1 uppercase tracking-wider">
                    <span>精确</span>
                    <span>创意</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-[11px] font-bold text-[#1d1d1f]">Max Tokens</label>
                    <span className="text-[11px] font-mono text-[#0071e3] font-bold">{maxTokens}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="128000"
                    step="1"
                    value={maxTokens}
                    onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-black/[0.06] rounded-full appearance-none cursor-pointer accent-[#0071e3]"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-[11px] font-bold text-[#1d1d1f]">Top P</label>
                    <span className="text-[11px] font-mono text-[#0071e3] font-bold">{topP}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={topP}
                    onChange={(e) => setTopP(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-black/[0.06] rounded-full appearance-none cursor-pointer accent-[#0071e3]"
                  />
                </div>
              </div>

              {/* Tools Switch */}
              <section className="space-y-4 pt-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#86868b] block px-1">
                  功能插件
                </label>
                <div className="space-y-2">
                  {[
                    { key: 'webSearch', label: '联网搜索', icon: Globe },
                    { key: 'knowledgeBase', label: '科研知识库', icon: BookOpen },
                    { key: 'codeExec', label: '代码执行器', icon: Terminal },
                    { key: 'privateData', label: '私有脱敏数据', icon: Lock },
                  ].map((tool) => {
                    const Icon = tool.icon;
                    const enabled = tools[tool.key as keyof typeof tools];
                    return (
                      <button
                        key={tool.key}
                        onClick={() => setTools(prev => ({ ...prev, [tool.key]: !enabled }))}
                        className={`flex w-full items-center justify-between p-3.5 rounded-[20px] border transition-all ${
                          enabled 
                            ? "bg-[#0071e3]/[0.03] border-[#0071e3]/20" 
                            : "bg-white border-black/[0.04] hover:bg-black/[0.02]"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={`h-4 w-4 ${enabled ? "text-[#0071e3]" : "text-[#86868b]"}`} />
                          <span className={`text-[12px] font-bold ${enabled ? "text-[#1d1d1f]" : "text-[#86868b]"}`}>{tool.label}</span>
                        </div>
                        {enabled ? (
                          <ToggleRight className="h-6 w-6 text-[#0071e3]" />
                        ) : (
                          <ToggleLeft className="h-6 w-6 text-black/[0.15]" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </section>
              
              <div className="pb-10">
                <button 
                  onClick={() => {
                    setTemperature(0.7);
                    setMaxTokens(4096);
                    setTopP(1.0);
                    toast.info("已重置所有参数");
                  }}
                  className="w-full py-3 rounded-2xl border border-black/[0.08] text-[11px] font-bold text-[#86868b] hover:bg-black/[0.04] transition-all"
                >
                  重置为默认值
                </button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
