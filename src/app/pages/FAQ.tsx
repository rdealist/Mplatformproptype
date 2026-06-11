import { useState } from "react";
import { Plus } from "lucide-react";
import { ScrollReveal } from "../components/ScrollReveal";
import { useT } from "../i18n/useT";

const faqs = [
  {
    id: 1,
    question: "影像脱敏到什么程度，我能信吗？",
    answer: [
      "姓名、身份证号、住院号、检查号、精确到天的出生日期、机构内部联系方式，这 18 类能识别到具体患者的字段，都会在影像离开你们医院之前就被清掉或泛化。这套流程是医院本地完成的，平台只能接收清洗过的样本。",
      "更严的一道防线在三层硬拦截：前端、后端、网关都不让带有 PHI 字段的响应出去。代码改错了也漏不出去。这条规则比任何承诺都靠谱。",
    ],
  },
  {
    id: 2,
    question: "积分能换钱吗？",
    answer: [
      '不能。积分只是账本上的记录，告诉你"这件事你出过力、出了多少"，不能充值、不能提现、不构成任何金融凭证。它存在的意义是把贡献量化、把功劳留住。',
      '未来如果要做"积分换继续教育学分"或"换多中心研究参与资格"这类非货币兑换，所有规则都会先经顾问委员会公开决议，不会突然冒出来。',
    ],
  },
  {
    id: 3,
    question: "怎么才能升到 Lv5、为什么这一级特别重要？",
    answer: [
      "升到 Lv5 需要至少 800 例被双盲通过的标注，再加一次主任级专家的仲裁确认。从这一级开始你可以做终审，做完一例审核能拿到 2 倍系数的积分。",
      "这道门我们刻意做得不容易过，因为终审席上每一次点头或摇头，决定的是别人那一笔工作算不算数。它必须重。",
    ],
  },
  {
    id: 4,
    question: "医院传了数据，知识产权归谁？",
    answer: [
      '数据资产的所有权从头到尾都归上传的医院。我们只是托管和撮合。AI 团队调用时按"科研授权"或"商业授权"分别结算，医院随时可以叫停。已经发生过的调用记录会保留，作为事后审计的依据。',
    ],
  },
  {
    id: 5,
    question: "这套和区块链有关系吗？",
    answer: [
      '底层用了分布式账本来保证写入不可改，但你作为用户不需要任何加密货币、钱包、私钥的知识。"区块链"在这里只是工具的实现细节，我们真正在乎的是"谁做了什么被记下来"，技术换一套也行。',
    ],
  },
  {
    id: 6,
    question: "我刚注册没等级，现在能干什么？",
    answer: [
      "新注册默认 Lv1。当前网络里大约 38% 的开放任务对 Lv1 开放，主要是规范明确、容错较高的标注。完成前 10 例双盲通过的标注，基本就能升到 Lv3，可参与的任务范围会扩大很多。",
    ],
  },
  {
    id: 7,
    question: "支持哪些影像？病理 WSI 也行吗？",
    answer: [
      "当前支持 CT、MRI、X 光、OCT、超声、病理 WSI 一共 6 种主流模态。WSI 支持 40 倍全切片在线阅片和分层标注，背后用的是 Cornerstone3D Web 加我们自己写的 WSI 浏览器。",
    ],
  },
];

function FAQItem({ faq, defaultOpen = false, qPrefix }: { faq: typeof faqs[0]; defaultOpen?: boolean; qPrefix: string }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-t border-black/[0.06]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center gap-6 py-7 text-left transition-colors duration-150 hover:bg-[#fbfbfd]"
      >
        <span className="w-16 shrink-0 text-sm font-medium italic text-[#0071e3]">{qPrefix} {faq.id}</span>
        <span className="flex-1 text-[21px] font-semibold leading-[1.52] text-[#1d1d1f]">{faq.question}</span>
        <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black/[0.08] text-[#86868b] transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>
          <Plus className="h-4 w-4" strokeWidth={2} />
        </span>
      </button>

      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: isOpen ? `${faq.answer.length * 120}px` : "0px" }}
      >
        <div className="pb-8 pl-22 pr-14" style={{ paddingLeft: "88px" }}>
          {faq.answer.map((para, i) => (
            <p key={i} className={`text-sm leading-[1.8] text-[#86868b] ${i > 0 ? "mt-3" : ""}`}>
              {para}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const t = useT();
  return (
    <main className="min-h-screen bg-[#fbfbfd] text-[#1d1d1f] antialiased">
      <section className="px-[80px] pt-[64px] pb-[80px]">
        <div className="mx-auto max-w-[1280px]">
          <ScrollReveal>
            <div className="text-center">
              <div className="mb-4 inline-flex rounded-full bg-[#0071e3]/[0.08] px-3 py-1">
                <span className="text-sm font-medium text-[#0071e3]">{t.faq.badge}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#1d1d1f] leading-[1.2]">
                {t.faq.title}
              </h1>
              <p className="mt-5 mx-auto max-w-2xl text-lg md:text-xl font-medium text-[#86868b] leading-[1.5]">
                {t.faq.sub} <span className="font-semibold text-[#0071e3]">team@m-platform.cn</span>{t.faq.contactSuffix}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="mt-16 rounded-3xl border border-black/[0.08] bg-white px-10 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              <div className="border-b border-black/[0.06]" />
              {faqs.map((faq, i) => (
                <FAQItem key={faq.id} faq={faq} defaultOpen={i === 0} qPrefix={t.faq.qPrefix} />
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="mt-12 rounded-3xl border border-[#0071e3]/20 bg-[#0071e3]/[0.04] p-10 text-center">
              <p className="text-[21px] font-semibold leading-[1.52] text-[#1d1d1f]">{t.faq.moreQ}</p>
              <p className="mt-3 text-sm leading-[1.57] text-[#86868b]">{t.faq.moreDesc}</p>
              <a
                href="mailto:team@m-platform.cn"
                className="mt-6 inline-flex items-center rounded-full bg-[#0071e3] px-6 py-3 text-sm font-medium text-white transition-opacity duration-200 hover:opacity-90"
              >
                {t.faq.emailBtn}
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
