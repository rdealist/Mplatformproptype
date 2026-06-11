import { Award, CheckSquare, Database, Trophy } from "lucide-react";
import { CountUpAnimation } from "../components/CountUpAnimation";

interface AnnotationUser {
  rank: number;
  username: string;
  tasks: number;
  score: number;
  accuracy: number;
}

interface DataUser {
  rank: number;
  username: string;
  datasets: number;
  samples: number;
  downloads: number;
}

const annotationRanking: AnnotationUser[] = [
  { rank: 1, username: "专家A", tasks: 156, score: 45200, accuracy: 99 },
  { rank: 2, username: "专家B", tasks: 142, score: 38900, accuracy: 98 },
  { rank: 3, username: "专家C", tasks: 128, score: 35600, accuracy: 97 },
  { rank: 4, username: "专家D", tasks: 115, score: 32100, accuracy: 97 },
  { rank: 5, username: "专家E", tasks: 98, score: 28400, accuracy: 96 },
  { rank: 6, username: "专家F", tasks: 87, score: 25200, accuracy: 95 },
  { rank: 7, username: "专家G", tasks: 76, score: 22800, accuracy: 95 },
  { rank: 8, username: "专家H", tasks: 65, score: 19500, accuracy: 94 },
  { rank: 9, username: "专家I", tasks: 54, score: 16800, accuracy: 94 },
  { rank: 10, username: "专家J", tasks: 48, score: 14200, accuracy: 93 },
];

const dataRanking: DataUser[] = [
  { rank: 1, username: "luweizhu", datasets: 12, samples: 9, downloads: 284 },
  { rank: 2, username: "张医生", datasets: 5, samples: 15, downloads: 210 },
  { rank: 3, username: "李教授", datasets: 8, samples: 12, downloads: 188 },
  { rank: 4, username: "华北某三甲医院", datasets: 12, samples: 28, downloads: 156 },
  { rank: 5, username: "王主任", datasets: 6, samples: 11, downloads: 134 },
  { rank: 6, username: "西南某医学院", datasets: 15, samples: 35, downloads: 118 },
  { rank: 7, username: "陈专家", datasets: 4, samples: 8, downloads: 97 },
  { rank: 8, username: "某眼科专科医院", datasets: 9, samples: 22, downloads: 86 },
  { rank: 9, username: "刘医师", datasets: 3, samples: 7, downloads: 72 },
  { rank: 10, username: "北部某综合医院", datasets: 11, samples: 26, downloads: 65 },
];

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) return <span className="text-xl">🥇</span>;
  if (rank === 2) return <span className="text-xl">🥈</span>;
  if (rank === 3) return <span className="text-xl">🥉</span>;
  return <span className="text-base font-semibold text-[#86868b]">{rank}</span>;
}

function rowBg(rank: number) {
  if (rank === 1) return "bg-gradient-to-r from-[#ffd700]/10 to-transparent border-[#ffd700]/20";
  if (rank === 2) return "bg-gradient-to-r from-[#c0c0c0]/10 to-transparent border-[#c0c0c0]/20";
  if (rank === 3) return "bg-gradient-to-r from-[#cd7f32]/10 to-transparent border-[#cd7f32]/20";
  return "bg-white border-black/[0.06]";
}

function Avatar({ name }: { name: string }) {
  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#0071e3] to-[#005bb5] text-sm font-semibold text-white shadow-[0_2px_8px_rgba(0,113,227,0.15)]">
      {name.charAt(0).toUpperCase()}
    </div>
  );
}

export default function Ranking() {
  return (
    <main className="min-h-screen bg-[#fbfbfd] text-[#1d1d1f] antialiased">
      <section className="px-20 py-20">
        <div className="mx-auto max-w-[1280px]">

          {/* 页面标题 */}
          <div className="mb-16 text-center">
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#1d1d1f] leading-[1.2]">
              专家排行榜
            </h1>
            <p className="mt-5 mx-auto max-w-2xl text-lg md:text-xl font-medium text-[#86868b] leading-[1.5]">
              平台贡献者实时排名，数据每日更新
            </p>
          </div>

          {/* 左右两个排行榜 */}
          <div className="grid grid-cols-2 gap-8">

            {/* 标注贡献榜 */}
            <div className="rounded-3xl border border-black/[0.08] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              <div className="flex items-center gap-3 border-b border-black/[0.06] px-8 py-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0071e3]/[0.08]">
                  <CheckSquare className="h-5 w-5 text-[#0071e3]" strokeWidth={2} />
                </div>
                <div>
                  <h2 className="text-[21px] font-semibold leading-tight">标注贡献榜</h2>
                  <p className="text-sm text-[#86868b]">按完成标注任务数排名</p>
                </div>
              </div>

              {/* 列头 */}
              <div className="flex items-center gap-3 px-8 py-3">
                <div className="w-8 shrink-0" />
                <div className="w-9 shrink-0" />
                <div className="flex-1 text-xs font-medium text-[#86868b]">用户</div>
                <div className="w-14 text-right text-xs font-medium text-[#86868b]">任务数</div>
                <div className="w-20 text-right text-xs font-medium text-[#86868b]">积分</div>
                <div className="w-16 text-right text-xs font-medium text-[#86868b]">准确率</div>
              </div>

              <div className="divide-y divide-black/[0.04] px-4 pb-4">
                {annotationRanking.map((user) => (
                  <div
                    key={user.rank}
                    className={`flex items-center gap-3 rounded-2xl border px-4 py-3.5 transition-all duration-200 hover:border-[#0071e3]/20 hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)] ${rowBg(user.rank)}`}
                  >
                    <div className="flex w-8 shrink-0 items-center justify-center">
                      <RankBadge rank={user.rank} />
                    </div>
                    <Avatar name={user.username} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="truncate text-sm font-semibold text-[#1d1d1f]">{user.username}</span>
                        {user.rank === 1 && (
                          <span className="shrink-0 rounded-full bg-[#ff9500]/[0.08] px-1.5 py-0.5 text-[10px] font-medium text-[#ff9500]">冠军</span>
                        )}
                      </div>
                      <div className="text-[11px] text-[#86868b]">资深标注专家</div>
                    </div>
                    <div className="w-14 text-right">
                      <span className="text-sm font-semibold text-[#1d1d1f]">
                        <CountUpAnimation end={user.tasks} duration={800} />
                      </span>
                    </div>
                    <div className="w-20 text-right">
                      <span className="text-sm font-semibold text-[#0071e3]">
                        <CountUpAnimation end={user.score} duration={900} separator />
                      </span>
                    </div>
                    <div className="w-16 text-right">
                      <span className="text-sm font-semibold text-[#34c759]">
                        <CountUpAnimation end={user.accuracy} duration={700} suffix="%" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 数据贡献榜 */}
            <div className="rounded-3xl border border-black/[0.08] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              <div className="flex items-center gap-3 border-b border-black/[0.06] px-8 py-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#34c759]/[0.08]">
                  <Database className="h-5 w-5 text-[#34c759]" strokeWidth={2} />
                </div>
                <div>
                  <h2 className="text-[21px] font-semibold leading-tight">数据贡献榜</h2>
                  <p className="text-sm text-[#86868b]">按贡献数据集数量排名</p>
                </div>
              </div>

              {/* 列头 */}
              <div className="flex items-center gap-3 px-8 py-3">
                <div className="w-8 shrink-0" />
                <div className="w-9 shrink-0" />
                <div className="flex-1 text-xs font-medium text-[#86868b]">用户 / 机构</div>
                <div className="w-14 text-right text-xs font-medium text-[#86868b]">数据集</div>
                <div className="w-14 text-right text-xs font-medium text-[#86868b]">样本</div>
                <div className="w-16 text-right text-xs font-medium text-[#86868b]">下载量</div>
              </div>

              <div className="divide-y divide-black/[0.04] px-4 pb-4">
                {dataRanking.map((user) => (
                  <div
                    key={user.rank}
                    className={`flex items-center gap-3 rounded-2xl border px-4 py-3.5 transition-all duration-200 hover:border-[#0071e3]/20 hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)] ${rowBg(user.rank)}`}
                  >
                    <div className="flex w-8 shrink-0 items-center justify-center">
                      <RankBadge rank={user.rank} />
                    </div>
                    <Avatar name={user.username} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="truncate text-sm font-semibold text-[#1d1d1f]">{user.username}</span>
                        {user.rank === 1 && (
                          <span className="shrink-0 rounded-full bg-[#ff9500]/[0.08] px-1.5 py-0.5 text-[10px] font-medium text-[#ff9500]">冠军</span>
                        )}
                      </div>
                      <div className="text-[11px] text-[#86868b]">医学影像贡献者</div>
                    </div>
                    <div className="w-14 text-right">
                      <span className="text-sm font-semibold text-[#1d1d1f]">
                        <CountUpAnimation end={user.datasets} duration={800} />
                      </span>
                    </div>
                    <div className="w-14 text-right">
                      <span className="text-sm font-semibold text-[#34c759]">
                        <CountUpAnimation end={user.samples} duration={900} />
                      </span>
                    </div>
                    <div className="w-16 text-right">
                      <span className="text-sm font-semibold text-[#86868b]">
                        <CountUpAnimation end={user.downloads} duration={700} />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}