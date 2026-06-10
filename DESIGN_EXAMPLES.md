# M平台设计规范应用示例

本文档提供设计规范的实际应用示例，帮助开发者快速上手。

---

## 按钮示例

### 主按钮 (Primary Button)

#### 小按钮
```tsx
<button className="rounded-full bg-[#0071e3] px-4 py-2 text-sm font-medium text-white transition-opacity duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#0071e3]/10">
  登录
</button>
```

#### 中按钮
```tsx
<button className="rounded-full bg-[#0071e3] px-6 py-3 text-lg font-medium text-white transition-opacity duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#0071e3]/10">
  提交申请
</button>
```

#### 大按钮
```tsx
<button className="rounded-full bg-[#0071e3] px-8 py-4 text-2xl font-medium text-white transition-opacity duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#0071e3]/10">
  立即开始
</button>
```

### 次按钮 (Secondary Button)

```tsx
<button className="rounded-full border border-[#0071e3] bg-transparent px-6 py-3 text-lg font-medium text-[#0071e3] transition-all duration-300 hover:bg-[#0071e3]/[0.04] focus:outline-none focus:ring-2 focus:ring-[#0071e3]/10">
  了解更多
</button>
```

### 文字按钮 (Text Button)

```tsx
<button className="text-lg font-medium text-[#0071e3] transition-colors duration-200 hover:bg-[#0071e3]/[0.04] focus:outline-none focus:ring-2 focus:ring-[#0071e3]/10">
  查看详情
</button>
```

### 危险按钮 (Danger Button)

```tsx
<button className="rounded-full bg-[#ff3b30] px-6 py-3 text-lg font-medium text-white transition-opacity duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#ff3b30]/10">
  删除
</button>
```

---

## 输入框示例

### 标准输入框

```tsx
<input
  type="text"
  placeholder="请输入内容"
  className="w-full rounded-full border border-black/[0.08] bg-white px-6 py-3 text-lg text-[#1d1d1f] placeholder:text-[#86868b] transition-all duration-200 focus:border-[#0071e3]/30 focus:outline-none focus:ring-2 focus:ring-[#0071e3]/10"
/>
```

### 搜索框

```tsx
<div className="relative">
  <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#86868b]" strokeWidth={2} />
  <input
    type="text"
    placeholder="搜索数据集名称、描述"
    className="w-full rounded-full border border-black/[0.08] bg-white py-3 pl-12 pr-4 text-sm text-[#1d1d1f] placeholder:text-[#86868b] transition-all duration-200 focus:border-[#0071e3]/30 focus:outline-none focus:ring-2 focus:ring-[#0071e3]/10"
  />
</div>
```

### 错误状态输入框

```tsx
<input
  type="email"
  placeholder="邮箱地址"
  className="w-full rounded-full border border-[#ff3b30] bg-white px-6 py-3 text-lg text-[#1d1d1f] placeholder:text-[#86868b] transition-all duration-200 focus:border-[#ff3b30] focus:outline-none focus:ring-2 focus:ring-[#ff3b30]/10"
/>
<p className="mt-2 text-sm text-[#ff3b30]">邮箱格式不正确</p>
```

---

## 卡片示例

### 基础卡片

```tsx
<div className="rounded-3xl border border-black/[0.08] bg-white p-8 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
  <h3 className="text-[21px] font-semibold">卡片标题</h3>
  <p className="mt-3 text-sm text-[#86868b]">卡片描述内容</p>
</div>
```

### 可点击卡片

```tsx
<div className="cursor-pointer rounded-3xl border border-black/[0.08] bg-white p-8 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
  <h3 className="text-[21px] font-semibold">可点击卡片</h3>
  <p className="mt-3 text-sm text-[#86868b]">点击查看详情</p>
</div>
```

### 带图标卡片

```tsx
<div className="rounded-3xl border border-black/[0.08] bg-white p-8 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#0071e3]/[0.08]">
    <Database className="h-5 w-5 text-[#0071e3]" strokeWidth={2} />
  </div>
  <h3 className="mt-8 text-[21px] font-semibold">数据广场</h3>
  <p className="mt-6 text-sm text-[#86868b]">浏览公开数据资产，按模态、科室筛选</p>
</div>
```

---

## 标签示例

### 品牌标签

```tsx
<span className="inline-flex rounded-full bg-[#0071e3]/[0.08] px-3 py-1 text-sm font-medium text-[#0071e3]">
  公开
</span>
```

### 成功标签

```tsx
<span className="inline-flex rounded-full bg-[#34c759]/[0.08] px-3 py-1 text-sm font-medium text-[#34c759]">
  已完成
</span>
```

### 警告标签

```tsx
<span className="inline-flex rounded-full bg-[#ff9500]/[0.08] px-3 py-1 text-sm font-medium text-[#ff9500]">
  待审核
</span>
```

### 错误标签

```tsx
<span className="inline-flex rounded-full bg-[#ff3b30]/[0.08] px-3 py-1 text-sm font-medium text-[#ff3b30]">
  已拒绝
</span>
```

### 中性标签

```tsx
<span className="inline-flex rounded-full bg-black/[0.04] px-3 py-1 text-sm font-medium text-[#1d1d1f]">
  草稿
</span>
```

---

## 分隔线示例

### 水平分隔线

```tsx
<div className="border-t border-black/[0.08]" />
```

### 带文字分隔线

```tsx
<div className="flex items-center gap-4">
  <div className="flex-1 border-t border-black/[0.08]"></div>
  <span className="text-sm text-[#86868b]">或</span>
  <div className="flex-1 border-t border-black/[0.08]"></div>
</div>
```

---

## 导航栏示例

```tsx
<nav className="sticky top-0 z-50 border-b border-black/[0.08] bg-white/80 backdrop-blur-xl">
  <div className="mx-auto flex h-11 max-w-[1280px] items-center justify-between px-20">
    <div className="flex items-center gap-2">
      <span className="text-[21px] font-semibold">M平台</span>
    </div>
    
    <div className="flex items-center gap-8 text-sm text-[#1d1d1f]">
      <a href="#" className="text-[#0071e3] transition-colors duration-200">首页</a>
      <a href="#" className="transition-colors duration-200 hover:text-[#0071e3]">数据广场</a>
      <a href="#" className="transition-colors duration-200 hover:text-[#0071e3]">任务广场</a>
    </div>
    
    <button className="rounded-full bg-[#0071e3] px-4 py-2 text-sm font-medium text-white transition-opacity duration-200 hover:opacity-90">
      登录
    </button>
  </div>
</nav>
```

---

## 栅格布局示例

### 4列网格

```tsx
<div className="grid grid-cols-4 gap-6">
  {items.map((item) => (
    <div key={item.id} className="rounded-3xl border border-black/[0.08] bg-white p-6">
      {item.content}
    </div>
  ))}
</div>
```

### 3列网格

```tsx
<div className="grid grid-cols-3 gap-6">
  {items.map((item) => (
    <div key={item.id} className="rounded-3xl border border-black/[0.08] bg-white p-8">
      {item.content}
    </div>
  ))}
</div>
```

### 响应式网格

```tsx
<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
  {items.map((item) => (
    <div key={item.id} className="rounded-3xl border border-black/[0.08] bg-white p-6">
      {item.content}
    </div>
  ))}
</div>
```

---

## 图标使用示例

### 图标按钮

```tsx
import { Plus } from "lucide-react";

<button className="flex items-center gap-2 rounded-full bg-[#0071e3] px-6 py-3 text-lg font-medium text-white transition-opacity duration-200 hover:opacity-90">
  <Plus className="h-5 w-5" strokeWidth={2} />
  新增数据
</button>
```

### 图标容器

```tsx
import { Database } from "lucide-react";

<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#0071e3]/[0.08]">
  <Database className="h-5 w-5 text-[#0071e3]" strokeWidth={2} />
</div>
```

### 行内图标

```tsx
import { CheckCircle2 } from "lucide-react";

<p className="flex items-center gap-2 text-sm text-[#34c759]">
  <CheckCircle2 className="h-5 w-5" strokeWidth={2} />
  操作成功
</p>
```

---

## 动画效果示例

### 卡片Hover动画

```tsx
<div className="rounded-3xl border border-black/[0.08] bg-white p-8 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
  内容
</div>
```

### 按钮点击动画

```tsx
<button className="rounded-full bg-[#0071e3] px-6 py-3 text-lg font-medium text-white transition-all duration-200 hover:opacity-90 active:scale-[0.98]">
  点击我
</button>
```

### Loading动画

```tsx
<div className="inline-flex items-center gap-2">
  <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#0071e3] border-t-transparent" />
  <span className="text-sm text-[#86868b]">加载中...</span>
</div>
```

### 脉冲动画（骨架屏）

```tsx
<div className="animate-pulse space-y-4">
  <div className="h-4 w-3/4 rounded bg-[#f5f5f7]" />
  <div className="h-4 w-1/2 rounded bg-[#f5f5f7]" />
</div>
```

---

## 常见组合示例

### 搜索栏 + 筛选

```tsx
<div className="flex items-center gap-4">
  <div className="relative flex-1">
    <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#86868b]" strokeWidth={2} />
    <input
      type="text"
      placeholder="搜索数据集"
      className="w-full rounded-full border border-black/[0.08] bg-white py-3 pl-12 pr-4 text-sm text-[#1d1d1f] placeholder:text-[#86868b] focus:border-[#0071e3]/30 focus:outline-none focus:ring-2 focus:ring-[#0071e3]/10"
    />
  </div>
  <button className="flex items-center gap-2 rounded-full border border-black/[0.08] bg-white px-4 py-2 text-sm font-medium text-[#1d1d1f] transition-all duration-200 hover:border-[#0071e3]/30 hover:bg-[#0071e3]/[0.04]">
    最新发布
    <ChevronDown className="h-5 w-5" strokeWidth={2} />
  </button>
</div>
```

### 统计卡片

```tsx
<div className="rounded-3xl border border-black/[0.08] bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
  <div className="text-sm text-[#86868b]">开放数据集</div>
  <div className="mt-4 flex items-baseline gap-1">
    <span className="text-5xl font-semibold tracking-tight text-[#1d1d1f]">2</span>
    <span className="text-[21px] font-medium text-[#86868b]">个</span>
  </div>
</div>
```

### 数据集卡片

```tsx
<div className="overflow-hidden rounded-3xl border border-black/[0.08] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
  <div className="h-40 bg-gradient-to-br from-blue-500 to-purple-600" />
  <div className="p-8">
    <div className="flex items-start justify-between gap-2">
      <h3 className="text-[21px] font-semibold">胸部CT肺结节数据集</h3>
      <span className="shrink-0 rounded-full bg-[#0071e3]/[0.08] px-3 py-1 text-sm font-medium text-[#0071e3]">公开</span>
    </div>
    <p className="mt-3 text-sm text-[#86868b]">协和医院影像中心</p>
    <div className="mt-6 flex items-center gap-4">
      <span className="rounded-full bg-black/[0.04] px-3 py-1 text-sm font-medium">CT</span>
      <span className="text-sm text-[#86868b]">12,500 样本</span>
    </div>
  </div>
</div>
```

---

## 使用组件示例

### 使用 Button 组件

```tsx
import { Button } from "@/app/components/Button";
import { Plus } from "lucide-react";

// 小主按钮
<Button size="small" variant="primary">登录</Button>

// 中次按钮
<Button size="medium" variant="secondary">了解更多</Button>

// 大主按钮带图标
<Button size="large" variant="primary" icon={<Plus className="h-5 w-5" strokeWidth={2} />}>
  立即开始
</Button>

// 文字按钮
<Button size="medium" variant="text">查看详情</Button>

// 危险按钮
<Button size="medium" variant="danger">删除</Button>
```

### 使用 Tag 组件

```tsx
import { Tag } from "@/app/components/Tag";

<Tag variant="primary">公开</Tag>
<Tag variant="success">已完成</Tag>
<Tag variant="warning">待审核</Tag>
<Tag variant="error">已拒绝</Tag>
<Tag variant="neutral">草稿</Tag>
```

---

## 快速参考

### 常用颜色

| 用途 | 颜色值 | Tailwind |
|------|--------|----------|
| 品牌蓝 | #0071e3 | `text-[#0071e3]` `bg-[#0071e3]` |
| 主文字 | #1d1d1f | `text-[#1d1d1f]` |
| 次文字 | #86868b | `text-[#86868b]` |
| 成功色 | #34c759 | `text-[#34c759]` `bg-[#34c759]` |
| 警告色 | #ff9500 | `text-[#ff9500]` `bg-[#ff9500]` |
| 错误色 | #ff3b30 | `text-[#ff3b30]` `bg-[#ff3b30]` |

### 常用间距

| Token | 像素值 | Tailwind |
|-------|--------|----------|
| 小 | 8px | `gap-2` `p-2` `m-2` |
| 中 | 16px | `gap-4` `p-4` `m-4` |
| 大 | 24px | `gap-6` `p-6` `m-6` |
| 超大 | 32px | `gap-8` `p-8` `m-8` |

### 常用字号

| 尺寸 | 像素值 | Tailwind |
|------|--------|----------|
| 极小 | 12px | `text-xs` |
| 小 | 14px | `text-sm` |
| 中 | 18px | `text-lg` |
| 大 | 24px | `text-2xl` |
| 超大 | 48px | `text-5xl` |

---

**最后更新**: 2026-06-04
