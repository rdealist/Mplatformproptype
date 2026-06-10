import {
  User,
  Mail,
  Phone,
  ShieldCheck,
  Building2,
  FileBadge,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { useState } from "react";
import { Button } from "../components/ui/button";

export default function Profile() {
  const [userInfo] = useState({
    name: "张医生",
    email: "zhang@example.com",
    phone: "138****8888",
    role: "影像科医师",
    institution: "北京 · 协和医院",
    realNameStatus: "verified", // verified, pending, unverified
    institutionStatus: "verified",
    qualificationStatus: "verified",
  });

  const SectionHeader = ({ title, description }: { title: string; description?: string }) => (
    <div className="mb-6">
      <h2 className="text-[21px] font-semibold leading-[1.52] text-[#1d1d1f] dark:text-[#f5f5f7]">
        {title}
      </h2>
      {description && (
        <p className="mt-1 text-sm text-[#86868b] dark:text-[#98989d]">
          {description}
        </p>
      )}
    </div>
  );

  const StatusBadge = ({ status }: { status: string }) => {
    switch (status) {
      case "verified":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-[#34c759]/[0.08] px-2.5 py-0.5 text-xs font-medium text-[#34c759] dark:bg-[#30d158]/[0.12] dark:text-[#30d158]">
            已通过
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-[#ff9500]/[0.08] px-2.5 py-0.5 text-xs font-medium text-[#ff9500] dark:bg-[#ff9f0a]/[0.12] dark:text-[#ff9f0a]">
            审核中
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-black/[0.04] px-2.5 py-0.5 text-xs font-medium text-[#86868b] dark:bg-white/[0.06] dark:text-[#98989d]">
            未认证
          </span>
        );
    }
  };

  const ActionRow = ({
    icon: Icon,
    label,
    value,
    status,
    onAction,
  }: {
    icon: any;
    label: string;
    value?: string;
    status?: string;
    onAction?: () => void;
  }) => (
    <div className="group flex items-center justify-between py-4 transition-colors duration-200">
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f5f5f7] dark:bg-[#2c2c2e] text-[#1d1d1f] dark:text-[#f5f5f7] transition-all duration-300 group-hover:bg-[#0071e3]/[0.08] group-hover:text-[#0071e3]">
          <Icon className="h-5 w-5" strokeWidth={2} />
        </div>
        <div>
          <p className="text-sm font-medium text-[#1d1d1f] dark:text-[#f5f5f7]">{label}</p>
          {(value || status) && (
            <div className="mt-0.5 flex items-center gap-2">
              {value && <span className="text-xs text-[#86868b] dark:text-[#98989d]">{value}</span>}
              {status && <StatusBadge status={status} />}
            </div>
          )}
        </div>
      </div>
      <button
        onClick={onAction}
        className="flex items-center gap-1 text-sm font-medium text-[#0071e3] transition-colors duration-200 hover:opacity-80"
      >
        <span>{status === "unverified" ? "去认证" : "修改"}</span>
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#fbfbfd] text-[#1d1d1f] dark:bg-black dark:text-[#f5f5f7] antialiased">
      <section className="px-20 py-28">
        <div className="mx-auto max-w-[800px]">
          {/* 页面标题 */}
          <div className="mb-16">
            <h1 className="text-[48px] font-semibold leading-[1.16] tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7]">
              个人中心
            </h1>
            <p className="mt-4 text-sm text-[#86868b] dark:text-[#98989d]">
              管理您的身份认证、联系方式及专业资质
            </p>
          </div>

          <div className="space-y-12">
            {/* 基本信息 */}
            <div className="rounded-3xl border border-black/[0.08] bg-white p-8 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:border-white/10 dark:bg-[#1c1c1e] dark:shadow-none">
              <div className="flex items-center gap-6">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#0071e3] to-[#005bb5] text-white shadow-lg">
                  <User className="h-10 w-10" strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <h2 className="text-[21px] font-semibold leading-[1.52]">{userInfo.name}</h2>
                  <p className="text-sm text-[#86868b] dark:text-[#98989d]">{userInfo.institution} · {userInfo.role}</p>
                </div>
                <Button variant="outline" className="rounded-full border-black/[0.08] dark:border-white/10">
                  编辑资料
                </Button>
              </div>
            </div>

            {/* 账号与安全 */}
            <div className="rounded-3xl border border-black/[0.08] bg-white p-8 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:border-white/10 dark:bg-[#1c1c1e] dark:shadow-none">
              <SectionHeader 
                title="账号与安全" 
                description="确保您的账号信息准确，以便接收系统通知和奖励结算"
              />
              <div className="divide-y divide-black/[0.04] dark:divide-white/[0.06]">
                <ActionRow 
                  icon={ShieldCheck} 
                  label="实名认证" 
                  status={userInfo.realNameStatus}
                  onAction={() => {}} 
                />
                <ActionRow 
                  icon={Phone} 
                  label="手机号" 
                  value={userInfo.phone}
                  onAction={() => {}} 
                />
                <ActionRow 
                  icon={Mail} 
                  label="电子邮箱" 
                  value={userInfo.email}
                  onAction={() => {}} 
                />
              </div>
            </div>

            {/* 专业资质 */}
            <div className="rounded-3xl border border-black/[0.08] bg-white p-8 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:border-white/10 dark:bg-[#1c1c1e] dark:shadow-none">
              <SectionHeader 
                title="专业资质" 
                description="完成资质认证可解锁高价值标注任务和专家审核权限"
              />
              <div className="divide-y divide-black/[0.04] dark:divide-white/[0.06]">
                <ActionRow 
                  icon={Building2} 
                  label="机构认证" 
                  status={userInfo.institutionStatus}
                  onAction={() => {}} 
                />
                <ActionRow 
                  icon={FileBadge} 
                  label="职业资格认证" 
                  status={userInfo.qualificationStatus}
                  onAction={() => {}} 
                />
              </div>
            </div>

            {/* 底部信息 */}
            <div className="flex items-center justify-between px-4 text-xs text-[#86868b] dark:text-[#98989d]">
              <p>© 2026 iMedLoop Professional. All rights reserved.</p>
              <div className="flex gap-4">
                <a href="#" className="hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7]">服务协议</a>
                <a href="#" className="hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7]">隐私政策</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
