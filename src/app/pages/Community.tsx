import {
  Bookmark,
  Eye,
  Flame,
  Heart,
  MessageCircle,
  PenSquare,
  Share2,
  TrendingUp,
  X,
  Bold,
  Italic,
  List,
  Image as ImageIcon,
  Link as LinkIcon,
  Send,
} from "lucide-react";
import { useState } from "react";

type FilterTab = "hot" | "latest" | "trending";

interface Post {
  id: string;
  author: string;
  level: string;
  title: string;
  content: string;
  images: string[];
  tags: string[];
  likes: number;
  comments: number;
  views: number;
  createdAt: string;
}

const communityRules = [
  "● 尊重他人，文明讨论",
  "● 严禁广告、攻击性言论",
  "● 分享真实病例、尊重隐私",
  "● 专业讨论，不替代医疗建议",
];

const posts: Post[] = [
  {
    id: "IFP7203",
    author: "用户A",
    level: "Lv1",
    title: "视网膜",
    content: "疑似干黄斑变性",
    images: [
      "radial-gradient(circle at 50% 50%, #2d2d2d 0%, #1a1a1a 100%)",
      "radial-gradient(circle at 50% 50%, #2d2d2d 0%, #1a1a1a 100%)",
      "radial-gradient(circle at 50% 50%, #2d2d2d 0%, #1a1a1a 100%)",
    ],
    tags: ["视网膜病变", "分级标注"],
    likes: 0,
    comments: 0,
    views: 91,
    createdAt: "1天前",
  },
  {
    id: "IFP5465",
    author: "王医生",
    level: "Lv4",
    title: "糖尿病人视力障碍病历 - 关于糖网病分级讨论",
    content:
      "患者糖尿病史多年，近期出现视力模糊。下图，糖网病，我没检查确诊这个病人，但是我们从眼底图像可以看到大量的渗出物以及微动脉瘤，还有一些出血点，我想问大家如何分级比较准确？从图像上来看，我个人倾向于重度非增殖期，想听听大家的意见。",
    images: [
      "radial-gradient(circle at 45% 55%, #ff9500 0%, #cc7700 20%, #8b5000 40%, #1a1a1a 100%)",
      "radial-gradient(circle at 50% 50%, #ff6b6b 0%, #cc5555 30%, #8b3a3a 50%, #1a1a1a 100%)",
      "radial-gradient(circle at 55% 45%, #ff4444 0%, #cc3333 25%, #8b2323 45%, #1a1a1a 100%)",
    ],
    tags: ["视网膜病变", "糖尿病"],
    likes: 12,
    comments: 8,
    views: 245,
    createdAt: "2天前",
  },
  {
    id: "IFP5234",
    author: "李教授",
    level: "Lv5",
    title: "肺结节CT影像讨论：良恶性鉴别要点",
    content:
      "分享一例肺结节病例，患者56岁，体检发现右肺上叶结节，直径约8mm。从影像学特征来看，结节边界清晰，密度均匀，无毛刺征和分叶征。大家觉得良恶性概率如何？是否需要进一步随访或活检？",
    images: [
      "radial-gradient(circle at 50% 50%, #4a5568 0%, #2d3748 50%, #1a202c 100%)",
      "radial-gradient(circle at 50% 50%, #4a5568 0%, #2d3748 50%, #1a202c 100%)",
      "radial-gradient(circle at 50% 50%, #4a5568 0%, #2d3748 50%, #1a202c 100%)",
    ],
    tags: ["肺结节", "CT影像", "良恶性鉴别"],
    likes: 28,
    comments: 15,
    views: 512,
    createdAt: "3天前",
  },
  {
    id: "IFP4892",
    author: "张专家",
    level: "Lv3",
    title: "脑部MRI异常信号，疑似肿瘤还是炎症？",
    content:
      "患者45岁女性，头痛3个月，MRI显示左侧额叶异常信号影，T1低信号，T2高信号，边界欠清。增强扫描有轻度强化。请各位专家帮忙看看，倾向于肿瘤还是炎症性病变？需要做哪些进一步检查？",
    images: [
      "radial-gradient(circle at 50% 50%, #6b7280 0%, #4b5563 50%, #374151 100%)",
      "radial-gradient(circle at 50% 50%, #6b7280 0%, #4b5563 50%, #374151 100%)",
    ],
    tags: ["脑部MRI", "肿瘤诊断", "影像分析"],
    likes: 18,
    comments: 11,
    views: 328,
    createdAt: "5天前",
  },
];

export default function Community() {
  const [activeTab, setActiveTab] = useState<FilterTab>("hot");
  const [showPostModal, setShowPostModal] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postTags, setPostTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");

  const handlePublish = () => {
    // 发布逻辑
    console.log({ title: postTitle, content: postContent, tags: postTags });
    setShowPostModal(false);
    setPostTitle("");
    setPostContent("");
    setPostTags([]);
  };

  const addTag = () => {
    if (currentTag.trim() && !postTags.includes(currentTag.trim())) {
      setPostTags([...postTags, currentTag.trim()]);
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setPostTags(postTags.filter(tag => tag !== tagToRemove));
  };

  return (
    <main className="min-h-screen bg-[#fbfbfd] text-[#1d1d1f] antialiased">
      {/* 发帖弹窗 */}
      {showPostModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="relative mx-4 w-full max-w-4xl rounded-3xl border border-black/[0.08] bg-white shadow-[0_8px_40px_rgba(0,0,0,0.12)]">
            {/* 弹窗头部 */}
            <div className="flex items-center justify-between border-b border-black/[0.06] px-8 py-6">
              <h2 className="text-[21px] font-semibold text-[#1d1d1f]">发布新帖</h2>
              <button
                onClick={() => setShowPostModal(false)}
                className="rounded-full p-2 transition-colors duration-200 hover:bg-black/[0.04]"
              >
                <X className="h-5 w-5 text-[#86868b]" strokeWidth={2} />
              </button>
            </div>

            {/* 弹窗内容 */}
            <div className="max-h-[70vh] overflow-y-auto p-8">
              {/* 标题输入 */}
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-[#1d1d1f]">
                  标题
                </label>
                <input
                  type="text"
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  placeholder="请输入帖子标题..."
                  className="w-full rounded-2xl border border-black/[0.08] bg-white px-4 py-3 text-sm text-[#1d1d1f] outline-none transition-all duration-200 placeholder:text-[#86868b] focus:border-[#0071e3] focus:ring-2 focus:ring-[#0071e3]/20"
                />
              </div>

              {/* 富文本编辑工具栏 */}
              <div className="mb-3">
                <label className="mb-2 block text-sm font-medium text-[#1d1d1f]">
                  内容
                </label>
                <div className="flex items-center gap-2 rounded-t-2xl border border-b-0 border-black/[0.08] bg-[#fbfbfd] px-3 py-2">
                  <button className="rounded-lg p-2 transition-colors duration-200 hover:bg-black/[0.04]">
                    <Bold className="h-4 w-4 text-[#86868b]" strokeWidth={2} />
                  </button>
                  <button className="rounded-lg p-2 transition-colors duration-200 hover:bg-black/[0.04]">
                    <Italic className="h-4 w-4 text-[#86868b]" strokeWidth={2} />
                  </button>
                  <div className="mx-2 h-4 w-px bg-black/[0.08]" />
                  <button className="rounded-lg p-2 transition-colors duration-200 hover:bg-black/[0.04]">
                    <List className="h-4 w-4 text-[#86868b]" strokeWidth={2} />
                  </button>
                  <div className="mx-2 h-4 w-px bg-black/[0.08]" />
                  <button className="rounded-lg p-2 transition-colors duration-200 hover:bg-black/[0.04]">
                    <ImageIcon className="h-4 w-4 text-[#86868b]" strokeWidth={2} />
                  </button>
                  <button className="rounded-lg p-2 transition-colors duration-200 hover:bg-black/[0.04]">
                    <LinkIcon className="h-4 w-4 text-[#86868b]" strokeWidth={2} />
                  </button>
                  <div className="ml-auto text-xs text-[#86868b]">
                    {postContent.length} / 5000 字
                  </div>
                </div>
              </div>

              {/* 内容输入 */}
              <textarea
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                placeholder="分享您的病例、观点或疑问..."
                maxLength={5000}
                rows={12}
                className="w-full rounded-b-2xl border border-black/[0.08] bg-white px-4 py-3 text-sm text-[#1d1d1f] outline-none transition-all duration-200 placeholder:text-[#86868b] focus:border-[#0071e3] focus:ring-2 focus:ring-[#0071e3]/20"
              />

              {/* 标签输入 */}
              <div className="mt-6">
                <label className="mb-2 block text-sm font-medium text-[#1d1d1f]">
                  标签
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTag();
                      }
                    }}
                    placeholder="输入标签，按回车添加..."
                    className="flex-1 rounded-2xl border border-black/[0.08] bg-white px-4 py-3 text-sm text-[#1d1d1f] outline-none transition-all duration-200 placeholder:text-[#86868b] focus:border-[#0071e3] focus:ring-2 focus:ring-[#0071e3]/20"
                  />
                  <button
                    onClick={addTag}
                    className="rounded-2xl bg-[#0071e3]/[0.08] px-6 py-3 text-sm font-medium text-[#0071e3] transition-all duration-200 hover:bg-[#0071e3]/[0.12]"
                  >
                    添加
                  </button>
                </div>
                {postTags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {postTags.map((tag) => (
                      <span
                        key={tag}
                        className="flex items-center gap-1.5 rounded-full bg-black/[0.04] px-3 py-1.5 text-xs font-medium text-[#1d1d1f]"
                      >
                        {tag}
                        <button
                          onClick={() => removeTag(tag)}
                          className="rounded-full transition-colors duration-200 hover:bg-black/[0.08]"
                        >
                          <X className="h-3 w-3" strokeWidth={2} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* 弹窗底部 */}
            <div className="flex items-center justify-end gap-3 border-t border-black/[0.06] px-8 py-6">
              <button
                onClick={() => setShowPostModal(false)}
                className="rounded-full px-6 py-3 text-sm font-medium text-[#86868b] transition-colors duration-200 hover:bg-black/[0.04]"
              >
                取消
              </button>
              <button
                onClick={handlePublish}
                disabled={!postTitle.trim() || !postContent.trim()}
                className="flex items-center gap-2 rounded-full bg-[#0071e3] px-6 py-3 text-sm font-medium text-white shadow-[0_2px_8px_rgba(0,113,227,0.3)] transition-all duration-200 hover:bg-[#0077ed] hover:shadow-[0_4px_12px_rgba(0,113,227,0.4)] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Send className="h-4 w-4" strokeWidth={2} />
                发布
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 顶部标题区 */}
      <section className="px-20 py-20">
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-16 text-center">
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#1d1d1f] leading-[1.2]">
              医学讨论社区
            </h1>
            <p className="mt-5 mx-auto max-w-2xl text-lg md:text-xl font-medium text-[#86868b] leading-[1.5]">
              学习提高、病例研判、高端论道
            </p>
          </div>

          {/* 发帖大入口 */}
          <div
            onClick={() => setShowPostModal(true)}
            className="group mb-12 cursor-pointer rounded-3xl border-2 border-dashed border-black/[0.08] bg-white p-12 text-center transition-all duration-300 hover:border-[#0071e3]/30 hover:bg-[#0071e3]/[0.02]"
          >
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#0071e3]/[0.08] transition-all duration-300 group-hover:bg-[#0071e3]/[0.12]">
              <PenSquare className="h-8 w-8 text-[#0071e3]" strokeWidth={1.5} />
            </div>
            <p className="mb-1 text-[21px] font-semibold text-[#1d1d1f]">发帖提问或分享病例</p>
            <p className="text-sm text-[#86868b]">与全球医学专家交流讨论，获得专业建议</p>
          </div>
        </div>
      </section>

      {/* 内容区域 */}
      <section className="px-20 pb-20">
        <div className="mx-auto max-w-[1280px]">
          <div className="flex gap-8">
            {/* 左侧主内容 */}
            <div className="flex-1">
              {/* 筛选Tab */}
              <div className="mb-8 flex items-center gap-4">
                <button
                  onClick={() => setActiveTab("hot")}
                  className={`flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-200 ${
                    activeTab === "hot"
                      ? "bg-white text-[#1d1d1f] shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-black/[0.08]"
                      : "text-[#86868b] hover:text-[#1d1d1f]"
                  }`}
                >
                  <Flame className="h-4 w-4" strokeWidth={2} />
                  热门
                </button>
                <button
                  onClick={() => setActiveTab("latest")}
                  className={`flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-200 ${
                    activeTab === "latest"
                      ? "bg-white text-[#1d1d1f] shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-black/[0.08]"
                      : "text-[#86868b] hover:text-[#1d1d1f]"
                  }`}
                >
                  最新
                </button>
                <button
                  onClick={() => setActiveTab("trending")}
                  className={`flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-200 ${
                    activeTab === "trending"
                      ? "bg-white text-[#1d1d1f] shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-black/[0.08]"
                      : "text-[#86868b] hover:text-[#1d1d1f]"
                  }`}
                >
                  <TrendingUp className="h-4 w-4" strokeWidth={2} />
                  热议
                </button>
              </div>

              {/* 帖子列表 */}
              <div className="space-y-6">
                {posts.map((post) => (
                  <article
                    key={post.id}
                    className="rounded-3xl border border-black/[0.08] bg-white p-8 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-300 hover:border-[#0071e3]/30 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
                  >
                    {/* 帖子头部 */}
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#0071e3] to-[#005bb5] text-sm font-semibold text-white">
                        {post.author.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-[#1d1d1f]">
                            {post.id}
                          </span>
                          <span className="rounded-full bg-[#0071e3]/[0.08] px-2.5 py-0.5 text-xs font-medium text-[#0071e3]">
                            {post.level}
                          </span>
                        </div>
                      </div>
                      <span className="text-sm text-[#86868b]">
                        {post.createdAt}
                      </span>
                    </div>

                    {/* 标题 */}
                    <h3 className="mb-3 text-[21px] font-semibold leading-[1.52] text-[#1d1d1f]">
                      {post.title}
                    </h3>

                    {/* 内容 */}
                    <p className="mb-4 text-sm leading-[1.57] text-[#86868b]">
                      {post.content}
                    </p>

                    {/* 图片网格 */}
                    {post.images.length > 0 && (
                      <div className="mb-4 grid grid-cols-3 gap-3">
                        {post.images.map((img, idx) => (
                          <div
                            key={idx}
                            className="aspect-square overflow-hidden rounded-2xl"
                            style={{ background: img }}
                          />
                        ))}
                      </div>
                    )}

                    {/* 标签 */}
                    {post.tags.length > 0 && (
                      <div className="mb-4 flex flex-wrap gap-2">
                        {post.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="rounded-full bg-black/[0.04] px-3 py-1 text-xs font-medium text-[#1d1d1f]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* 互动按钮 */}
                    <div className="flex items-center gap-6 border-t border-black/[0.06] pt-4">
                      <button className="flex items-center gap-1.5 text-sm text-[#86868b] transition-colors duration-200 hover:text-[#0071e3]">
                        <Heart className="h-4 w-4" strokeWidth={2} />
                        <span>{post.likes > 0 ? post.likes : "赞"}</span>
                      </button>
                      <button className="flex items-center gap-1.5 text-sm text-[#86868b] transition-colors duration-200 hover:text-[#0071e3]">
                        <MessageCircle className="h-4 w-4" strokeWidth={2} />
                        <span>{post.comments > 0 ? post.comments : "评论"}</span>
                      </button>
                      <button className="flex items-center gap-1.5 text-sm text-[#86868b] transition-colors duration-200 hover:text-[#0071e3]">
                        <Share2 className="h-4 w-4" strokeWidth={2} />
                        分享
                      </button>
                      <button className="ml-auto flex items-center gap-1.5 text-sm text-[#86868b] transition-colors duration-200 hover:text-[#0071e3]">
                        <Bookmark className="h-4 w-4" strokeWidth={2} />
                        收藏
                      </button>
                      <div className="flex items-center gap-1.5 text-sm text-[#86868b]">
                        <Eye className="h-4 w-4" strokeWidth={2} />
                        <span>{post.views}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* 右侧社区规范 */}
            <aside className="w-80 shrink-0">
              <div className="sticky top-20 rounded-3xl border border-black/[0.08] bg-white p-8 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                <h3 className="mb-6 text-[21px] font-semibold text-[#1d1d1f]">
                  社区规范
                </h3>
                <div className="space-y-3">
                  {communityRules.map((rule, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl bg-[#fbfbfd] px-4 py-3 text-sm leading-[1.57] text-[#1d1d1f]"
                    >
                      {rule}
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}