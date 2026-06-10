import { Moon, Sun, Globe, Bell, Check, ChevronDown, User, LayoutDashboard, Settings, LogOut, Database, FileText, Briefcase, ShieldCheck, Trophy, Users, Upload, Play, ShoppingBag, Key, Activity, BookOpen } from "lucide-react";
import { Link, useLocation } from "react-router";
import { useState, useEffect, useRef } from "react";
import { useLanguage, type Language } from "../i18n/context";
import { useT } from "../i18n/useT";

type Theme = "light" | "dark";

interface Message {
  id: string;
  title: string;
  content: string;
  time: string;
  read: boolean;
}

const messages: Message[] = [
  {
    id: "1",
    title: "系统通知",
    content: "您的数据集已通过审核",
    time: "5分钟前",
    read: false,
  },
  {
    id: "2",
    title: "任务提醒",
    content: "您有新的标注任务待处理",
    time: "1小时前",
    read: false,
  },
  {
    id: "3",
    title: "社区消息",
    content: "您的帖子收到了新回复",
    time: "2小时前",
    read: true,
  },
];

const languageCodes: Language[] = ["zh-CN", "en", "zh-TW", "ja"];

export function Navigation() {
  const location = useLocation();
  const { language, setLanguage } = useLanguage();
  const t = useT();
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme") as Theme;
      return saved || "light";
    }
    return "light";
  });
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [showMessageMenu, setShowMessageMenu] = useState(false);
  const [showDataAssetsMenu, setShowDataAssetsMenu] = useState(false);
  const [showEarnIncomeMenu, setShowEarnIncomeMenu] = useState(false);
  const [showCommunityMenu, setShowCommunityMenu] = useState(false);
  const [showModelServiceMenu, setShowModelServiceMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("isLoggedIn") === "true";
    }
    return false;
  });

  const toggleLogin = () => {
    const next = !isLoggedIn;
    setIsLoggedIn(next);
    localStorage.setItem("isLoggedIn", String(next));
    // Trigger a window event to notify other components if needed
    window.dispatchEvent(new Event("auth-change"));
  };

  useEffect(() => {
    const handleAuthChange = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    };
    window.addEventListener("auth-change", handleAuthChange);
    return () => window.removeEventListener("auth-change", handleAuthChange);
  }, []);

  const languageMenuRef = useRef<HTMLDivElement>(null);
  const messageMenuRef = useRef<HTMLDivElement>(null);
  const dataAssetsMenuRef = useRef<HTMLDivElement>(null);
  const earnIncomeMenuRef = useRef<HTMLDivElement>(null);
  const communityMenuRef = useRef<HTMLDivElement>(null);
  const modelServiceMenuRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (languageMenuRef.current && !languageMenuRef.current.contains(event.target as Node)) {
        setShowLanguageMenu(false);
      }
      if (messageMenuRef.current && !messageMenuRef.current.contains(event.target as Node)) {
        setShowMessageMenu(false);
      }
      if (dataAssetsMenuRef.current && !dataAssetsMenuRef.current.contains(event.target as Node)) {
        setShowDataAssetsMenu(false);
      }
      if (earnIncomeMenuRef.current && !earnIncomeMenuRef.current.contains(event.target as Node)) {
        setShowEarnIncomeMenu(false);
      }
      if (communityMenuRef.current && !communityMenuRef.current.contains(event.target as Node)) {
        setShowCommunityMenu(false);
      }
      // @ts-ignore
      if (modelServiceMenuRef.current && !modelServiceMenuRef.current.contains(event.target as Node)) {
        setShowModelServiceMenu(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const toggleLanguageMenu = () => {
    setShowLanguageMenu(!showLanguageMenu);
    setShowMessageMenu(false);
    setShowDataAssetsMenu(false);
    setShowEarnIncomeMenu(false);
    setShowCommunityMenu(false);
    setShowUserMenu(false);
  };

  const toggleMessageMenu = () => {
    setShowMessageMenu(!showMessageMenu);
    setShowLanguageMenu(false);
    setShowDataAssetsMenu(false);
    setShowEarnIncomeMenu(false);
    setShowCommunityMenu(false);
    setShowUserMenu(false);
  };

  const toggleDataAssetsMenu = () => {
    setShowDataAssetsMenu(!showDataAssetsMenu);
    setShowLanguageMenu(false);
    setShowMessageMenu(false);
    setShowEarnIncomeMenu(false);
    setShowCommunityMenu(false);
    setShowUserMenu(false);
  };

  const toggleEarnIncomeMenu = () => {
    setShowEarnIncomeMenu(!showEarnIncomeMenu);
    setShowLanguageMenu(false);
    setShowMessageMenu(false);
    setShowDataAssetsMenu(false);
    setShowCommunityMenu(false);
    setShowUserMenu(false);
  };

  const toggleCommunityMenu = () => {
    setShowCommunityMenu(!showCommunityMenu);
    setShowLanguageMenu(false);
    setShowMessageMenu(false);
    setShowDataAssetsMenu(false);
    setShowEarnIncomeMenu(false);
    setShowUserMenu(false);
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
    setShowLanguageMenu(false);
    setShowMessageMenu(false);
    setShowDataAssetsMenu(false);
    setShowEarnIncomeMenu(false);
    setShowCommunityMenu(false);
  };

  const toggleModelServiceMenu = () => {
    setShowModelServiceMenu(!showModelServiceMenu);
    setShowLanguageMenu(false);
    setShowMessageMenu(false);
    setShowDataAssetsMenu(false);
    setShowEarnIncomeMenu(false);
    setShowCommunityMenu(false);
    setShowUserMenu(false);
  };

  const selectLanguage = (lang: Language) => {
    setLanguage(lang);
    setShowLanguageMenu(false);
  };

  const unreadCount = messages.filter((m) => !m.read).length;

  // 发现数据要素子菜单
  const dataAssetsItems = [
    {
      path: "/data-market",
      label: t.nav.buyDatasets,
      icon: Database,
      desc: "探索全球医学影像数据资源"
    },
    {
      path: "/publish-data",
      label: "上传数据集",
      icon: Upload,
      desc: "上传高价值影像数据，转化为持续获取收益的核心资产"
    },
    {
      path: "/publish-task",
      label: t.nav.publishAnnotation,
      icon: FileText,
      desc: "基于已有数据集发布标注需求，自动生成任务单"
    },
  ];

  // 赚取专业收益子菜单
  const earnIncomeItems = [
    {
      path: "/task-market",
      label: t.nav.claimWorkOrder,
      icon: Briefcase,
      desc: "领取影像标注任务单，积累专业收益"
    },
    {
      path: "/review-tasks",
      label: t.nav.expertReview,
      icon: ShieldCheck,
      desc: "高级专家复审标注，获得更高津贴"
    },
  ];

  // 全球学术社区子菜单
  const communityItems = [
    {
      path: "/ranking",
      label: t.nav.expertHonor,
      icon: Trophy,
      desc: "医学影像标注专家排行榜"
    },
    {
      path: "/community",
      label: t.nav.academicForum,
      icon: Users,
      desc: "医学讨论与学术交流社区"
    },
  ];

  const userMenuItems = [
    { path: "/workspace", label: t.nav.workspace, icon: LayoutDashboard },
    { path: "/profile", label: t.nav.profile, icon: User },
    { path: "/settings", label: t.nav.settings, icon: Settings },
  ];

  const isDataAssetsActive = location.pathname === "/data-market" || location.pathname === "/publish-task";
  const isModelServiceActive = location.pathname === "/model-service";
  const isEarnIncomeActive = location.pathname === "/task-market" || location.pathname === "/review-tasks";
  const isCommunityActive = location.pathname === "/ranking" || location.pathname === "/community";

  // 模型服务子菜单
  const modelServiceItems = [
    { 
      id: "home", 
      label: "在线使用", 
      icon: Play, 
      path: "/model-service",
      desc: "在线调试大模型，快速验证效果"
    },
    { 
      id: "market", 
      label: "模型广场", 
      icon: ShoppingBag, 
      path: "/model-service",
      desc: "浏览模型能力，选择合适服务"
    },
    { 
      id: "apikeys", 
      label: "API Key 管理", 
      icon: Key, 
      path: "/model-service",
      desc: "管理调用密钥，保障接入安全"
    },
    { 
      id: "logs", 
      label: "调用记录", 
      icon: Activity, 
      path: "/model-service",
      desc: "查看调用明细，掌握用量状态"
    },
    { 
      id: "docs", 
      label: "帮助文档", 
      icon: BookOpen, 
      path: "/model-service",
      desc: "查阅接入指南，快速完成调用"
    },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-black/[0.08] bg-white/80 backdrop-blur-xl">
      {/* 导航栏 - 遵循设计规范: 高度44px, 毛玻璃背景, 层级z-50 */}
      <div className="mx-auto flex h-11 max-w-[1280px] items-center justify-between px-20">
        <Link to="/" className="flex items-center gap-2">
          <div className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-[#0071e3] via-[#0066cc] to-[#005bb5] shadow-[0_2px_12px_rgba(0,113,227,0.4)]">
            <div className="absolute inset-0">
              <div className="absolute left-1 top-1.5 h-0.5 w-0.5 rounded-full bg-white/40 animate-pulse" style={{animationDelay: '0s', animationDuration: '2s'}} />
              <div className="absolute right-1.5 top-2.5 h-0.5 w-0.5 rounded-full bg-white/40 animate-pulse" style={{animationDelay: '0.7s', animationDuration: '2s'}} />
              <div className="absolute bottom-2 left-2 h-0.5 w-0.5 rounded-full bg-white/40 animate-pulse" style={{animationDelay: '1.3s', animationDuration: '2s'}} />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_0%,transparent_70%)]" />
            </div>
            <svg className="relative h-5 w-5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 16V5L7 11V5L10 11L13 5V11L17 5V16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="7" cy="11" r="0.8" fill="white"/>
              <circle cx="13" cy="11" r="0.8" fill="white"/>
              <circle cx="10" cy="11" r="1" fill="white" opacity="0.8"/>
            </svg>
          </div>
          <span className="text-[21px] font-semibold leading-[1.52]">iMedLoop</span>
        </Link>

        <div className="flex items-center gap-8 text-sm font-normal leading-[1.57] text-[#1d1d1f]">
          {/* 登录状态下的工作台 或 未登录下的为何选我们 */}
          {isLoggedIn ? (
            <Link
              to="/workspace"
              className={`relative py-1 transition-colors duration-200 hover:text-[#0071e3] ${
                location.pathname === "/workspace" ? "text-[#0071e3]" : ""
              }`}
            >
              工作台
              {location.pathname === "/workspace" && (
                <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-[#0071e3]" />
              )}
            </Link>
          ) : (
            <Link
              to="/about"
              className={`relative py-1 transition-colors duration-200 hover:text-[#0071e3] ${
                location.pathname === "/about" ? "text-[#0071e3]" : ""
              }`}
            >
              {t.nav.about}
              {location.pathname === "/about" && (
                <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-[#0071e3]" />
              )}
            </Link>
          )}

          {/* 发现数据要素下拉菜单 */}
          <div className="relative" ref={dataAssetsMenuRef}>
            <button
              onClick={toggleDataAssetsMenu}
              className={`relative flex items-center gap-1 py-1 text-sm font-normal leading-[1.57] transition-colors duration-200 hover:text-[#0071e3] ${
                isDataAssetsActive ? "text-[#0071e3]" : ""
              }`}
            >
              {t.nav.dataAssets}
              <ChevronDown className="h-4 w-4" strokeWidth={2} />
              {isDataAssetsActive && (
                <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-[#0071e3]" />
              )}
            </button>

            {showDataAssetsMenu && (
              <div className="absolute left-0 top-full z-50 mt-2 w-72 rounded-2xl border border-black/[0.08] bg-white/95 backdrop-blur-xl py-3 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
                {dataAssetsItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setShowDataAssetsMenu(false)}
                      className={`group relative flex items-start gap-3 px-4 py-3 transition-all duration-200 ${
                        index === 0 ? "" : "border-t border-black/[0.04]"
                      } ${
                        location.pathname === item.path
                          ? "bg-[#0071e3]/[0.08]"
                          : "hover:bg-[#0071e3]/[0.04]"
                      }`}
                    >
                      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-all duration-200 ${
                        location.pathname === item.path
                          ? "bg-[#0071e3] text-white"
                          : "bg-black/[0.04] text-[#86868b] group-hover:bg-[#0071e3]/10 group-hover:text-[#0071e3]"
                      }`}>
                        <Icon className="h-4 w-4" strokeWidth={2} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={`text-sm font-medium transition-colors duration-200 ${
                          location.pathname === item.path ? "text-[#0071e3]" : "text-[#1d1d1f] group-hover:text-[#0071e3]"
                        }`}>
                          {item.label}
                        </div>
                        <div className="mt-0.5 text-xs leading-[1.4] text-[#86868b]">
                          {item.desc}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* 接入模型服务 */}
          <div className="relative" ref={modelServiceMenuRef}>
            <button
              onClick={toggleModelServiceMenu}
              className={`relative flex items-center gap-1 py-1 text-sm font-normal leading-[1.57] transition-colors duration-200 hover:text-[#0071e3] ${
                isModelServiceActive ? "text-[#0071e3]" : ""
              }`}
            >
              接入模型服务
              <ChevronDown className="h-4 w-4" strokeWidth={2} />
              {isModelServiceActive && (
                <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-[#0071e3]" />
              )}
            </button>

            {showModelServiceMenu && (
              <div className="absolute left-0 top-full z-50 mt-2 w-72 rounded-2xl border border-black/[0.08] bg-white/95 backdrop-blur-xl py-3 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
                {modelServiceItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.id}
                      to={`${item.path}?section=${item.id}`}
                      onClick={() => setShowModelServiceMenu(false)}
                      className={`group relative flex items-start gap-3 px-4 py-3 transition-all duration-200 ${
                        index === 0 ? "" : "border-t border-black/[0.04]"
                      } hover:bg-[#0071e3]/[0.04]`}
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-black/[0.04] text-[#86868b] group-hover:bg-[#0071e3]/10 group-hover:text-[#0071e3] transition-all duration-200">
                        <Icon className="h-4 w-4" strokeWidth={2} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-[#1d1d1f] group-hover:text-[#0071e3] transition-colors duration-200">
                          {item.label}
                        </div>
                        <div className="mt-0.5 text-xs leading-[1.4] text-[#86868b]">
                          {item.desc}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* 赚取专业收益下拉菜单 */}
          <div className="relative" ref={earnIncomeMenuRef}>
            <button
              onClick={toggleEarnIncomeMenu}
              className={`relative flex items-center gap-1 py-1 text-sm font-normal leading-[1.57] transition-colors duration-200 hover:text-[#0071e3] ${
                isEarnIncomeActive ? "text-[#0071e3]" : ""
              }`}
            >
              {t.nav.earnIncome}
              <ChevronDown className="h-4 w-4" strokeWidth={2} />
              {isEarnIncomeActive && (
                <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-[#0071e3]" />
              )}
            </button>

            {showEarnIncomeMenu && (
              <div className="absolute left-0 top-full z-50 mt-2 w-72 rounded-2xl border border-black/[0.08] bg-white/95 backdrop-blur-xl py-3 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
                {earnIncomeItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setShowEarnIncomeMenu(false)}
                      className={`group relative flex items-start gap-3 px-4 py-3 transition-all duration-200 ${
                        index === 0 ? "" : "border-t border-black/[0.04]"
                      } ${
                        location.pathname === item.path
                          ? "bg-[#0071e3]/[0.08]"
                          : "hover:bg-[#0071e3]/[0.04]"
                      }`}
                    >
                      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-all duration-200 ${
                        location.pathname === item.path
                          ? "bg-[#0071e3] text-white"
                          : "bg-black/[0.04] text-[#86868b] group-hover:bg-[#0071e3]/10 group-hover:text-[#0071e3]"
                      }`}>
                        <Icon className="h-4 w-4" strokeWidth={2} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={`text-sm font-medium transition-colors duration-200 ${
                          location.pathname === item.path ? "text-[#0071e3]" : "text-[#1d1d1f] group-hover:text-[#0071e3]"
                        }`}>
                          {item.label}
                        </div>
                        <div className="mt-0.5 text-xs leading-[1.4] text-[#86868b]">
                          {item.desc}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* 全球学术社区下拉菜单 */}
          <div className="relative" ref={communityMenuRef}>
            <button
              onClick={toggleCommunityMenu}
              className={`relative flex items-center gap-1 py-1 text-sm font-normal leading-[1.57] transition-colors duration-200 hover:text-[#0071e3] ${
                isCommunityActive ? "text-[#0071e3]" : ""
              }`}
            >
              {t.nav.community}
              <ChevronDown className="h-4 w-4" strokeWidth={2} />
              {isCommunityActive && (
                <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-[#0071e3]" />
              )}
            </button>

            {showCommunityMenu && (
              <div className="absolute left-0 top-full z-50 mt-2 w-72 rounded-2xl border border-black/[0.08] bg-white/95 backdrop-blur-xl py-3 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
                {communityItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setShowCommunityMenu(false)}
                      className={`group relative flex items-start gap-3 px-4 py-3 transition-all duration-200 ${
                        index === 0 ? "" : "border-t border-black/[0.04]"
                      } ${
                        location.pathname === item.path
                          ? "bg-[#0071e3]/[0.08]"
                          : "hover:bg-[#0071e3]/[0.04]"
                      }`}
                    >
                      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-all duration-200 ${
                        location.pathname === item.path
                          ? "bg-[#0071e3] text-white"
                          : "bg-black/[0.04] text-[#86868b] group-hover:bg-[#0071e3]/10 group-hover:text-[#0071e3]"
                      }`}>
                        <Icon className="h-4 w-4" strokeWidth={2} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={`text-sm font-medium transition-colors duration-200 ${
                          location.pathname === item.path ? "text-[#0071e3]" : "text-[#1d1d1f] group-hover:text-[#0071e3]"
                        }`}>
                          {item.label}
                        </div>
                        <div className="mt-0.5 text-xs leading-[1.4] text-[#86868b]">
                          {item.desc}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* 登录状态下将“为何选我们”挪到最右侧 */}
          {isLoggedIn && (
            <Link
              to="/about"
              className={`relative py-1 transition-colors duration-200 hover:text-[#0071e3] ${
                location.pathname === "/about" ? "text-[#0071e3]" : ""
              }`}
            >
              {t.nav.about}
              {location.pathname === "/about" && (
                <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-[#0071e3]" />
              )}
            </Link>
          )}

        </div>

        <div className="flex items-center gap-3">
          {/* 模拟登录切换按钮 */}
          <button 
            onClick={toggleLogin}
            className="flex items-center gap-1.5 rounded-full border border-black/[0.08] px-3 py-1 text-[11px] font-medium text-[#86868b] transition-all hover:border-[#0071e3]/30 hover:text-[#0071e3]"
          >
            {isLoggedIn ? "退出预览" : "登录预览"}
          </button>

          {/* 全局上传按钮 */}
          {isLoggedIn && (
            <Link
              to="/publish-data"
              className="hidden sm:flex items-center gap-1.5 rounded-full bg-[#0071e3] px-3.5 py-1.5 text-sm font-medium text-white transition-all duration-200 hover:opacity-90 hover:shadow-[0_2px_8px_rgba(0,113,227,0.4)]"
            >
              <Upload className="h-4 w-4" />
              <span>上传数据</span>
            </Link>
          )}

          {/* 用户菜单或登录按钮 */}
          {isLoggedIn ? (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={toggleUserMenu}
                className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#0071e3] to-[#005bb5] text-white transition-all duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#0071e3]/20"
                aria-label="用户菜单"
              >
                <User className="h-4 w-4" strokeWidth={2.5} />
                {unreadCount > 0 && (
                  <span className="badge-pulse absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-[#ff3b30] ring-2 ring-white"></span>
                )}
              </button>

              {showUserMenu && (
                <div className="absolute right-0 top-full z-50 mt-2 w-64 rounded-2xl border border-black/[0.08] bg-white shadow-[0_8px_32px_rgba(0,0,0,0.12)] overflow-hidden">
                  {/* 用户信息简报 */}
                  <div className="bg-[#fbfbfd] px-4 py-4 border-b border-black/[0.04]">
                    <p className="text-sm font-semibold text-[#1d1d1f]">张医生</p>
                    <p className="text-xs text-[#86868b] mt-0.5">zhang@example.com</p>
                  </div>

                  <div className="py-2">
                    {/* 消息通知 - 整合进菜单 */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setShowMessageMenu(!showMessageMenu);
                      }}
                      className={`flex w-full items-center justify-between px-4 py-2.5 text-sm transition-colors duration-200 ${
                        showMessageMenu ? "text-[#0071e3] bg-[#0071e3]/[0.04]" : "text-[#1d1d1f] hover:bg-black/[0.04]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Bell className="h-4 w-4" strokeWidth={2} />
                        消息通知
                      </div>
                      {unreadCount > 0 && (
                        <span className="rounded-full bg-[#ff3b30] px-1.5 py-0.5 text-[10px] font-medium text-white">
                          {unreadCount}
                        </span>
                      )}
                    </button>

                    {/* 消息列表 - 展开式 */}
                    {showMessageMenu && (
                      <div className="bg-[#fbfbfd] border-y border-black/[0.04] max-h-48 overflow-y-auto py-1">
                        {messages.length > 0 ? (
                          messages.map((m) => (
                            <div key={m.id} className="px-4 py-2 hover:bg-black/[0.02]">
                              <p className="text-xs font-medium text-[#1d1d1f] line-clamp-1">{m.title}</p>
                              <p className="text-[11px] text-[#86868b] line-clamp-1">{m.content}</p>
                            </div>
                          ))
                        ) : (
                          <div className="px-4 py-2 text-[11px] text-[#86868b]">暂无消息</div>
                        )}
                        <Link to="/messages" className="block px-4 py-2 text-center text-[11px] font-medium text-[#0071e3] hover:underline">
                          查看全部
                        </Link>
                      </div>
                    )}

                    <div className="my-1 border-t border-black/[0.04]" />

                    {userMenuItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => setShowUserMenu(false)}
                          className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors duration-200 hover:bg-black/[0.04] ${
                            location.pathname === item.path ? "text-[#0071e3]" : "text-[#1d1d1f]"
                          }`}
                        >
                          <Icon className="h-4 w-4" strokeWidth={2} />
                          {item.label}
                        </Link>
                      );
                    })}

                    <div className="my-1 border-t border-black/[0.04]" />
                    
                    {/* 主题与语言快捷入口 */}
                    <div className="flex items-center justify-between px-2 py-1">
                      <button
                        onClick={toggleTheme}
                        className="flex-1 flex items-center justify-center gap-2 py-1.5 text-xs text-[#86868b] hover:text-[#1d1d1f] hover:bg-black/[0.04] rounded-lg transition-colors"
                      >
                        {theme === "light" ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
                        {theme === "light" ? "深色" : "浅色"}
                      </button>
                      <div className="w-px h-4 bg-black/[0.08]" />
                      <button
                        onClick={toggleLanguageMenu}
                        className="flex-1 flex items-center justify-center gap-2 py-1.5 text-xs text-[#86868b] hover:text-[#1d1d1f] hover:bg-black/[0.04] rounded-lg transition-colors"
                      >
                        <Globe className="h-3.5 w-3.5" />
                        语言
                      </button>
                    </div>

                    <div className="my-1 border-t border-black/[0.04]" />

                    <button
                      onClick={() => setShowUserMenu(false)}
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-[#ff3b30] transition-colors duration-200 hover:bg-[#ff3b30]/[0.04]"
                    >
                      <LogOut className="h-4 w-4" strokeWidth={2} />
                      {t.nav.logout}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              {/* 注册按钮 */}
              <button className="rounded-full border border-black/[0.08] bg-transparent px-4 py-2 text-sm font-medium text-[#1d1d1f] transition-all duration-200 hover:border-[#0071e3]/30 hover:bg-[#0071e3]/[0.04] focus:outline-none focus:ring-2 focus:ring-[#0071e3]/10">
                {t.nav.register}
              </button>

              {/* 登录按钮 */}
              <button className="rounded-full bg-[#0071e3] px-4 py-2 text-sm font-medium text-white transition-opacity duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#0071e3]/10">
                {t.nav.login}
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}