# M平台设计规范

> **⚠️ 强制执行：所有UI界面的调整和开发都必须严格遵循本设计规范，不得随意修改或偏离。保持整体项目的设计一致性是所有开发人员的共同责任。**

---

## 目录

1. [设计原则](#设计原则)
2. [布局系统](#布局系统)
3. [颜色系统](#颜色系统)
4. [字体系统](#字体系统)
5. [间距系统](#间距系统)
6. [圆角系统](#圆角系统)
7. [阴影系统](#阴影系统)
8. [图标系统](#图标系统)
9. [动效系统](#动效系统)
10. [组件规范](#组件规范)
11. [交互状态](#交互状态)
12. [响应式设计](#响应式设计)
13. [层级系统](#层级系统)
14. [无障碍性](#无障碍性)

---

## 设计原则

### 核心理念
M平台遵循 **极简主义** 和 **用户至上** 的设计哲学，参考 Apple 设计语言，打造简洁、高效、优雅的医学影像数据平台。

### 四大原则

1. **简洁性 (Simplicity)**
   - 去除冗余元素，聚焦核心功能
   - 大量留白，提升内容呼吸感
   - 清晰的视觉层级

2. **一致性 (Consistency)**
   - 统一的设计语言和组件复用
   - 一致的交互模式和反馈
   - 可预测的用户体验

3. **易用性 (Usability)**
   - 直观的操作流程
   - 清晰的信息架构
   - 友好的错误处理

4. **专业性 (Professionalism)**
   - 科技感和高级感并重
   - 医学领域的严谨性
   - 数据的准确性和可信度

---

## 布局系统

### 设计尺寸
- **设计宽度**: 1440px
- **安全内容区**: 1280px (`max-w-[1280px]`)
- **页面左右内边距**: 100px (`px-20` 即 80px，考虑视觉平衡)

### 栅格系统
- **12列栅格**: 基础网格系统，灵活适配各种布局
- **常用列数**:
  - 4列: `grid-cols-4` - 统计卡片、功能入口
  - 3列: `grid-cols-3` - 数据集、任务卡片
  - 5列: `grid-cols-5` - 等级阶梯、小型卡片
  - 2列: `grid-cols-2` - 大型内容展示

### 容器规范
- **全宽容器**: `w-full` - 背景色块、分隔区域
- **安全容器**: `max-w-[1280px] mx-auto` - 主要内容区域
- **窄容器**: `max-w-[800px] mx-auto` - 文章阅读、表单

---

## 颜色系统

### 品牌色 (Primary)

#### 主色调
- **品牌蓝**: `#0071e3`
  - RGB: `rgb(0, 113, 227)`
  - 应用: 主要按钮、重要链接、强调元素

#### 品牌色透明度
- **8% 透明**: `rgba(0, 113, 227, 0.08)` - 按钮hover背景、标签背景
- **4% 透明**: `rgba(0, 113, 227, 0.04)` - 次级hover背景
- **30% 透明**: `rgba(0, 113, 227, 0.30)` - 边框聚焦态
- **10% 透明**: `rgba(0, 113, 227, 0.10)` - 聚焦ring

### 中性色阶 (Neutral)

#### 文字色
- **标题/主文字**: `#1d1d1f` - 标题、正文、重要信息
- **次要文字**: `#86868b` - 描述、辅助信息、提示
- **禁用文字**: `#d1d1d6` - 不可用状态
- **白色文字**: `#ffffff` - 深色背景上的文字

#### 背景色
- **页面背景**: `#fbfbfd` - 全局背景
- **卡片背景**: `#ffffff` - 卡片、面板
- **次级背景**: `#f5f5f7` - 输入框、次级区域
- **禁用背景**: `#f5f5f7` - 不可用状态
- **遮罩背景**: `rgba(0, 0, 0, 0.6)` - 模态框遮罩

#### 边框色
- **主边框**: `rgba(0, 0, 0, 0.08)` - 卡片、分隔线
- **次边框**: `rgba(0, 0, 0, 0.04)` - 轻量分隔
- **深边框**: `rgba(0, 0, 0, 0.12)` - 强调边框

### 语义化颜色 (Semantic)

#### 成功 (Success)
- **成功色**: `#34c759`
- **成功背景**: `rgba(52, 199, 89, 0.08)`
- **应用**: 成功提示、完成状态

#### 警告 (Warning)
- **警告色**: `#ff9500`
- **警告背景**: `rgba(255, 149, 0, 0.08)`
- **应用**: 警告提示、需注意信息

#### 错误 (Error)
- **错误色**: `#ff3b30`
- **错误背景**: `rgba(255, 59, 48, 0.08)`
- **应用**: 错误提示、验证失败

#### 信息 (Info)
- **信息色**: `#0071e3`
- **信息背景**: `rgba(0, 113, 227, 0.08)`
- **应用**: 一般提示、引导信息

### 数据可视化颜色

#### 图表色板 (序列色)
- **色彩1**: `#0071e3` - 品牌蓝
- **色彩2**: `#34c759` - 成功绿
- **色彩3**: `#ff9500` - 警告橙
- **色彩4**: `#af52de` - 紫色
- **色彩5**: `#ff2d55` - 粉红
- **色彩6**: `#5ac8fa` - 天蓝

---

## 字体系统

### 字体家族
- **主字体**: `"Noto Sans SC", "PingFang SC", -apple-system, BlinkMacSystemFont, "Microsoft YaHei", "Segoe UI", "Helvetica Neue", sans-serif`
- **等宽字体**: `"SF Mono", "Consolas", "Monaco", "Courier New", monospace` (用于代码、数据ID)

### 字号层级（严格控制）

#### 核心字号 (3个主力字号)

1. **48px** (`text-5xl`) - **大标题**
   - 行高: `1.16` (56px)
   - 字重: `600` (semibold)
   - Letter spacing: `-0.015em`
   - 应用: Hero标题、Section标题

2. **21px** (`text-[21px]`) - **副标题/重要文字**
   - 行高: `1.52` (32px)
   - 字重: `600` (semibold) 或 `500` (medium)
   - 应用: 卡片标题、按钮、数据值、二级标题

3. **14px** (`text-sm`) - **正文**
   - 行高: `1.57` (22px)
   - 字重: `400` (normal) 或 `500` (medium)
   - 应用: 描述文字、标签、辅助信息

#### 辅助字号 (特殊场景)

4. **24px** (`text-2xl`) - **大按钮文字**
   - 行高: `1.33` (32px)
   - 字重: `500` (medium)
   - 应用: Hero区大按钮

5. **18px** (`text-lg`) - **中按钮/小标题**
   - 行高: `1.56` (28px)
   - 字重: `500` (medium)
   - 应用: 常规按钮、列表标题

6. **12px** (`text-xs`) - **极小文字**
   - 行高: `1.67` (20px)
   - 字重: `400` (normal)
   - 应用: 标签内文字、版权信息、极小提示

### 字重规范
- **Regular (400)**: 正文、描述
- **Medium (500)**: 按钮、小标题、强调文字
- **Semibold (600)**: 大标题、卡片标题

### 行高规范
- **紧凑行高**: `1.2` - 大标题
- **标准行高**: `1.5` - 正文
- **宽松行高**: `1.8` - 长文阅读

---

## 间距系统

### 8px 网格系统
基于 **8px** 的倍数构建间距系统，确保视觉节奏统一。

### 间距刻度 (Spacing Scale)

| Token | 像素值 | Tailwind | 应用场景 |
|-------|--------|----------|----------|
| xs | 4px | `1` | 极小间距、图标间距 |
| sm | 8px | `2` | 小间距、内联元素 |
| md | 12px | `3` | 紧凑内边距 |
| base | 16px | `4` | 基础间距 |
| lg | 24px | `6` | 常规间距、卡片间距 |
| xl | 32px | `8` | 卡片内边距 |
| 2xl | 48px | `12` | 大内边距、Section内间距 |
| 3xl | 64px | `16` | 区块间距 |
| 4xl | 96px | `24` | 大区块间距 |
| 5xl | 112px | `28` | Section间距 |

### Padding (内边距)
- **Section 上下**: `py-28` (112px) - 大区块垂直间距
- **大卡片内边距**: `p-12` (48px) - 价值卡片、功能卡片
- **常规卡片内边距**: `p-8` (32px) - 数据集、任务卡片
- **小卡片内边距**: `p-6` (24px) - 统计卡片、紧凑内容
- **按钮内边距**: 参见按钮规范

### Gap (间隙)
- **大间距**: `gap-8` (32px) - 主要内容块
- **卡片间距**: `gap-6` (24px) - 卡片网格
- **常规间距**: `gap-4` (16px) - 列表项、表单元素
- **小间距**: `gap-2` (8px) - 标签组、紧凑列表

### Margin (外边距)
- **标题到描述**: `mt-6` (24px)
- **描述到内容**: `mt-16` (64px)
- **内容到按钮**: `mt-12` (48px)
- **Section 间距**: `space-y-28` (112px)
- **卡片标题到内容**: `mt-6` (24px)
- **按钮组间距**: `gap-4` (16px)

---

## 圆角系统

### 圆角规范

| 名称 | 尺寸 | Tailwind | 应用场景 |
|------|------|----------|----------|
| 无圆角 | 0px | `rounded-none` | 分隔线、特殊设计 |
| 极小圆角 | 4px | `rounded` | 小元素、紧凑设计 |
| 小圆角 | 8px | `rounded-lg` | 图标容器、输入框 |
| 中圆角 | 16px | `rounded-2xl` | 中型卡片、模态框 |
| 大圆角 | 24px | `rounded-3xl` | 大卡片、主要面板 |
| 圆形 | 9999px | `rounded-full` | 按钮、标签、徽章、头像 |

### 应用指南
- **主卡片**: `rounded-3xl` (24px) - 价值卡片、数据集卡片、功能卡片
- **次卡片**: `rounded-2xl` (16px) - 统计卡片、嵌套卡片
- **按钮**: `rounded-full` - 所有按钮统一使用全圆角
- **输入框**: `rounded-full` - 所有输入框统一使用全圆角
- **标签/徽章**: `rounded-full` - 状态标签、分类标签
- **图标容器**: `rounded-lg` (8px) - 图标背景
- **图片**: `rounded-2xl` (16px) - 数据集缩略图、用户头像外层

---

## 阴影系统

### 阴影层级

#### 卡片阴影
- **默认阴影**: `shadow-[0_2px_8px_rgba(0,0,0,0.04)]`
  - 应用: 静态卡片、面板
  
- **悬浮阴影**: `shadow-[0_4px_20px_rgba(0,0,0,0.08)]`
  - 应用: 卡片hover状态、强调元素

- **强阴影**: `shadow-[0_8px_32px_rgba(0,0,0,0.12)]`
  - 应用: 模态框、弹出菜单

#### 按钮阴影
- **默认**: 无阴影，使用背景色和边框
- **Hover**: 背景色变化 (不使用阴影)
- **Active**: 轻微缩放 `scale-[0.98]`

#### 特殊阴影
- **内阴影**: `shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]`
  - 应用: 输入框聚焦、凹陷效果
  
- **光晕效果**: `shadow-[0_2px_12px_rgba(0,113,227,0.4)]`
  - 应用: 品牌标识、特殊强调元素

---

## 图标系统

### 图标库
使用 **Lucide React** 图标库，风格简洁现代，与设计系统匹配。

### 图标尺寸

| 尺寸 | 像素值 | Tailwind | 应用场景 |
|------|--------|----------|----------|
| 极小 | 16px | `h-4 w-4` | 行内图标、小标签 |
| 小 | 20px | `h-5 w-5` | 按钮图标、导航图标 |
| 中 | 24px | `h-6 w-6` | 卡片图标、功能图标 |
| 大 | 32px | `h-8 w-8` | 大图标、Logo |
| 特大 | 48px | `h-12 w-12` | 空状态图标、引导图标 |

### 图标规范
- **描边宽度**: `strokeWidth={2}` (标准)
- **描边宽度 (粗)**: `strokeWidth={2.5}` (强调)
- **描边宽度 (细)**: `strokeWidth={1.5}` (装饰性)
- **图标颜色**: 继承父元素文字颜色或使用品牌色

### 图标容器
- **尺寸**: `h-10 w-10` 或 `h-12 w-12`
- **背景**: `bg-[#0071e3]/[0.08]` (品牌色8%透明)
- **圆角**: `rounded-lg` (8px)
- **图标大小**: `h-5 w-5`

---

## 动效系统

### 过渡时长 (Duration)

| 速度 | 时长 | Tailwind | 应用场景 |
|------|------|----------|----------|
| 极快 | 100ms | `duration-100` | 微交互、开关切换 |
| 快速 | 200ms | `duration-200` | 颜色变化、hover状态 |
| 标准 | 300ms | `duration-300` | 常规过渡、布局变化 |
| 慢速 | 500ms | `duration-500` | 大区块移动、复杂动画 |
| 极慢 | 700ms | `duration-700` | 页面过渡、特殊效果 |

### 缓动函数 (Easing)

| 类型 | 曲线 | Tailwind | 应用场景 |
|------|------|----------|----------|
| 线性 | linear | `ease-linear` | 加载动画、匀速运动 |
| 标准 | ease | `ease` | 默认过渡 |
| 缓入 | ease-in | `ease-in` | 元素消失 |
| 缓出 | ease-out | `ease-out` | 元素出现 |
| 缓入缓出 | ease-in-out | `ease-in-out` | 平滑过渡 |

### 常用过渡

#### 颜色过渡
```css
transition-colors duration-200 ease-out
```
应用: 按钮hover、链接hover

#### 全属性过渡
```css
transition-all duration-300 ease-in-out
```
应用: 卡片hover、展开/收起

#### 透明度过渡
```css
transition-opacity duration-200 ease-out
```
应用: 淡入淡出、遮罩显隐

#### 变换过渡
```css
transition-transform duration-300 ease-out
```
应用: 图标旋转、元素缩放

### 动画效果

#### Hover 效果
- **卡片**: 提升阴影 + 轻微上移 `-translate-y-1`
- **按钮**: 透明度变化 `opacity-90`
- **链接**: 颜色变化 + 下划线
- **图标**: 轻微位移 `translate-x-0.5`

#### Loading 动画
- **脉冲**: `animate-pulse` - 骨架屏、加载占位
- **旋转**: `animate-spin` - 加载指示器
- **跳动**: `animate-bounce` - 引导箭头

---

## 组件规范

### 按钮 (Button)

#### 按钮尺寸

| 尺寸 | 内边距 | 字号 | Tailwind Class |
|------|--------|------|----------------|
| 小 | px-4 py-2 | 14px | `rounded-full px-4 py-2 text-sm` |
| 中 | px-6 py-3 | 18px | `rounded-full px-6 py-3 text-lg` |
| 大 | px-8 py-4 | 24px | `rounded-full px-8 py-4 text-2xl` |

#### 按钮类型

**主按钮 (Primary)**
```css
rounded-full bg-[#0071e3] text-white font-medium
transition-opacity duration-200 hover:opacity-90
```

**次按钮 (Secondary)**
```css
rounded-full border border-[#0071e3] text-[#0071e3] bg-transparent font-medium
transition-all duration-300 hover:bg-[#0071e3]/[0.04]
```

**文字按钮 (Text)**
```css
text-[#0071e3] bg-transparent font-medium
transition-colors duration-200 hover:bg-[#0071e3]/[0.04]
```

**危险按钮 (Danger)**
```css
rounded-full bg-[#ff3b30] text-white font-medium
transition-opacity duration-200 hover:opacity-90
```

#### 按钮状态
- **禁用**: `disabled:opacity-50 disabled:cursor-not-allowed`
- **加载中**: 显示loading图标 + 禁用交互

### 输入框 (Input)

#### 输入框尺寸

| 尺寸 | 内边距 | 字号 | Tailwind Class |
|------|--------|------|----------------|
| 小 | px-4 py-2 | 14px | `rounded-full px-4 py-2 text-sm` |
| 中 | px-6 py-3 | 18px | `rounded-full px-6 py-3 text-lg` |
| 大 | px-8 py-4 | 24px | `rounded-full px-8 py-4 text-2xl` |

#### 输入框基础样式
```css
rounded-full border border-black/[0.08] bg-white
focus:border-[#0071e3]/30 focus:outline-none focus:ring-2 focus:ring-[#0071e3]/10
placeholder:text-[#86868b]
```

#### 输入框状态
- **默认**: `border-black/[0.08] bg-white`
- **聚焦**: `border-[#0071e3]/30 ring-2 ring-[#0071e3]/10`
- **错误**: `border-[#ff3b30] focus:ring-[#ff3b30]/10`
- **成功**: `border-[#34c759] focus:ring-[#34c759]/10`
- **禁用**: `bg-[#f5f5f7] text-[#86868b] cursor-not-allowed`

### 卡片 (Card)

#### 卡片基础样式
```css
rounded-3xl border border-black/[0.08] bg-white
shadow-[0_2px_8px_rgba(0,0,0,0.04)]
transition-all duration-300
hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)]
```

#### 卡片尺寸
- **大卡片**: `p-12` (48px) - 价值展示、功能介绍
- **中卡片**: `p-8` (32px) - 数据集、任务列表
- **小卡片**: `p-6` (24px) - 统计数据、简要信息

#### 卡片变体
- **可点击卡片**: 增加 `cursor-pointer hover:-translate-y-1`
- **选中卡片**: `border-[#0071e3] bg-[#0071e3]/[0.04]`
- **禁用卡片**: `opacity-50 cursor-not-allowed`

### 标签 (Tag/Badge)

#### 标签基础样式
```css
inline-flex items-center rounded-full px-3 py-1
text-sm font-medium
```

#### 标签类型

**品牌标签**
```css
bg-[#0071e3]/[0.08] text-[#0071e3]
```

**成功标签**
```css
bg-[#34c759]/[0.08] text-[#34c759]
```

**警告标签**
```css
bg-[#ff9500]/[0.08] text-[#ff9500]
```

**错误标签**
```css
bg-[#ff3b30]/[0.08] text-[#ff3b30]
```

**中性标签**
```css
bg-black/[0.04] text-[#1d1d1f]
```

### 分隔线 (Divider)

#### 水平分隔线
```css
border-t border-black/[0.08]
```

#### 垂直分隔线
```css
border-l border-black/[0.08] h-6
```

#### 带文字分隔线
```html
<div class="flex items-center gap-4">
  <div class="flex-1 border-t border-black/[0.08]"></div>
  <span class="text-sm text-[#86868b]">或</span>
  <div class="flex-1 border-t border-black/[0.08]"></div>
</div>
```

### 导航栏 (Navigation)

#### 导航栏规范
- **高度**: `h-11` (44px)
- **背景**: `bg-white/80 backdrop-blur-xl`
- **边框**: `border-b border-black/[0.08]`
- **定位**: `sticky top-0 z-50`
- **内容宽度**: `max-w-[1280px] mx-auto`
- **内边距**: `px-20`

#### 导航链接
```css
text-sm text-[#1d1d1f]
transition-colors duration-200
hover:text-[#0071e3]
```

**激活状态**
```css
text-[#0071e3]
```

### 页脚 (Footer)

#### 页脚规范
- **背景**: `bg-white`
- **边框**: `border-t border-black/[0.08]`
- **内边距**: `px-20 py-16`
- **文字颜色**: `text-[#86868b]`
- **链接颜色**: `hover:text-[#1d1d1f]`

---

## 交互状态

### 通用交互状态

#### Hover (悬浮)
- **按钮**: 透明度或背景色变化
- **卡片**: 阴影提升 + 轻微上移
- **链接**: 颜色变化
- **图标**: 位移或旋转

#### Active (激活/点击)
- **按钮**: 轻微缩放 `scale-[0.98]`
- **链接**: 颜色加深
- **卡片**: 无特殊状态

#### Focus (聚焦)
- **输入框**: 边框颜色 + 外发光ring
- **按钮**: 外发光ring (键盘导航)
- **链接**: 外发光ring (键盘导航)

#### Disabled (禁用)
- **按钮**: `opacity-50 cursor-not-allowed`
- **输入框**: `bg-[#f5f5f7] text-[#86868b] cursor-not-allowed`
- **卡片**: `opacity-50 cursor-not-allowed`

#### Loading (加载中)
- **按钮**: 显示loading图标 + 禁用交互
- **卡片**: 骨架屏 `animate-pulse`
- **列表**: 骨架屏占位

### 状态色系

| 状态 | 颜色 | 背景色 | 应用 |
|------|------|--------|------|
| 默认 | `#1d1d1f` | `#ffffff` | 常规状态 |
| 成功 | `#34c759` | `rgba(52, 199, 89, 0.08)` | 完成、通过 |
| 警告 | `#ff9500` | `rgba(255, 149, 0, 0.08)` | 注意、待处理 |
| 错误 | `#ff3b30` | `rgba(255, 59, 48, 0.08)` | 失败、错误 |
| 信息 | `#0071e3` | `rgba(0, 113, 227, 0.08)` | 提示、引导 |

---

## 响应式设计

### 断点系统 (Breakpoints)

| 断点 | 尺寸 | Tailwind | 设备类型 |
|------|------|----------|----------|
| xs | < 640px | `(default)` | 小手机 |
| sm | ≥ 640px | `sm:` | 手机 |
| md | ≥ 768px | `md:` | 平板竖屏 |
| lg | ≥ 1024px | `lg:` | 平板横屏/小笔记本 |
| xl | ≥ 1280px | `xl:` | 桌面 |
| 2xl | ≥ 1536px | `2xl:` | 大桌面 |

### 响应式布局策略

#### 栅格响应
```css
grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
```

#### 间距响应
```css
px-4 md:px-8 lg:px-20
```

#### 字号响应
```css
text-3xl md:text-4xl lg:text-5xl
```

#### 显示隐藏
```css
hidden lg:block
```

### 移动端优化
- 触摸目标最小 44x44px
- 导航改为汉堡菜单
- 卡片改为单列布局
- 减少动画复杂度

---

## 层级系统 (Z-Index)

### Z-Index 刻度

| 层级 | 值 | 应用场景 |
|------|-----|----------|
| base | 0 | 默认内容层 |
| dropdown | 10 | 下拉菜单 |
| sticky | 20 | 吸顶元素 |
| fixed | 30 | 固定元素 |
| modal-backdrop | 40 | 模态框遮罩 |
| modal | 50 | 模态框 |
| popover | 60 | 气泡提示 |
| tooltip | 70 | 工具提示 |
| notification | 80 | 通知消息 |

### 导航栏层级
```css
z-50
```

### 模态框层级
```css
/* 遮罩 */
z-40

/* 内容 */
z-50
```

---

## 无障碍性 (Accessibility)

### 对比度要求
- **正文文字**: 对比度 ≥ 4.5:1
- **大文字 (18px+)**: 对比度 ≥ 3:1
- **UI组件**: 对比度 ≥ 3:1

### 焦点可见性
- 所有可交互元素必须有清晰的焦点指示
- 使用 `focus:ring-2 focus:ring-[#0071e3]/10 focus:outline-none`

### 语义化标签
- 使用正确的 HTML5 语义标签
- 按钮使用 `<button>`
- 链接使用 `<a>`
- 导航使用 `<nav>`
- 主要内容使用 `<main>`

### 键盘导航
- 所有功能可通过键盘访问
- Tab 键顺序符合逻辑
- Enter/Space 可激活按钮

### ARIA 属性
- 使用 `aria-label` 为图标按钮提供描述
- 使用 `aria-labelledby` 关联标签
- 使用 `aria-describedby` 提供额外说明
- 使用 `role` 标识组件角色

---

## 最佳实践

### 设计原则
1. ✅ **优先使用设计系统定义的组件和样式**
2. ✅ **保持设计一致性，不随意创造新样式**
3. ✅ **使用语义化的颜色和命名**
4. ✅ **考虑无障碍性和可访问性**
5. ✅ **响应式优先，移动端友好**

### 开发规范
1. 📋 **开发前先查阅设计规范**
2. 📋 **使用规范中定义的 Tailwind 类名**
3. 📋 **复用现有组件，避免重复造轮子**
4. 📋 **新增组件需更新设计规范文档**
5. 📋 **代码审查时检查设计一致性**

### 命名规范
- **组件**: PascalCase (如: `DataCard`, `SearchInput`)
- **变量**: camelCase (如: `userName`, `isActive`)
- **常量**: UPPER_CASE (如: `MAX_LENGTH`, `API_URL`)
- **CSS类**: kebab-case (Tailwind默认)

---

## 版本历史

- **v1.0.0** (2026-06-04): 初始版本，基础设计规范
- **v1.1.0** (2026-06-04): 新增按钮和输入框尺寸规范
- **v2.0.0** (2026-06-04): 全面完善，参考大厂设计系统标准

---

**文档维护**: 设计规范是活文档，随项目演进持续更新。如有疑问或建议，请联系设计团队。
