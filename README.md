# M平台 - 医学影像数据资产平台

> 连接数据、标注与价值，加速全球医学影像行业迈入智能时代

---

## 项目简介

M平台是一个医学影像数据资产管理平台，遵循 Apple 极简设计风格，提供：

- 📊 **数据广场**: 浏览公开数据资产，发现医学影像数据集
- 📋 **任务广场**: 领取标注任务，赚取积分收益
- 🏆 **排行榜**: 查看医生、专家、机构贡献排名
- 💬 **社区**: 医学讨论交流，分享专业见解

## 技术栈

- **前端框架**: React 18.3.1
- **构建工具**: Vite 6.3.5
- **路由**: React Router 7.13.0
- **样式**: Tailwind CSS 4.1.12
- **图标**: Lucide React 0.487.0
- **动画**: Motion 12.23.24
- **UI组件**: Radix UI

## 设计系统

本项目采用严格的设计规范，确保整体视觉一致性和专业性。

### 核心设计文档

- 📘 **[DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)** - 完整的设计系统规范
  - 设计原则和理念
  - 颜色系统（品牌色、语义化颜色、中性色阶）
  - 字体系统（层级、字重、行高）
  - 间距系统（8px网格）
  - 圆角、阴影、图标、动效规范
  - 组件规范（按钮、输入框、卡片、标签等）
  - 交互状态、响应式设计、无障碍性

- 📙 **[DESIGN_EXAMPLES.md](./DESIGN_EXAMPLES.md)** - 设计规范应用示例
  - 按钮、输入框、卡片实例
  - 标签、分隔线、导航栏示例
  - 栅格布局、图标使用
  - 动画效果、常见组合
  - 快速参考表

- 📕 **[CLAUDE.md](./CLAUDE.md)** - 项目开发规范
  - 设计一致性强制要求
  - 开发流程和最佳实践
  - 代码审查标准

### 设计风格

- **设计语言**: Apple 极简风格
- **主色调**: 品牌蓝 #0071e3
- **设计特点**: 纯白背景、大量留白、圆角卡片、简洁排版
- **目标**: 科技感 + 高级感 + 专业性

## 项目结构

```
code/
├── src/
│   ├── app/
│   │   ├── components/          # 公共组件
│   │   │   ├── Navigation.tsx   # 导航栏
│   │   │   ├── Button.tsx       # 按钮组件
│   │   │   └── Tag.tsx          # 标签组件
│   │   ├── pages/               # 页面
│   │   │   ├── Home.tsx         # 首页
│   │   │   └── DataMarket.tsx   # 数据广场
│   │   └── App.tsx              # 应用入口
│   ├── styles/
│   │   ├── fonts.css            # 字体引入
│   │   ├── theme.css            # 主题变量
│   │   └── index.css            # 全局样式
│   └── imports/                 # 静态资源
├── DESIGN_SYSTEM.md             # 设计系统规范
├── DESIGN_EXAMPLES.md           # 设计示例
├── CLAUDE.md                    # 项目规范
└── README.md                    # 项目说明
```

## 快速开始

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
pnpm dev
```

### 构建生产版本

```bash
pnpm build
```

## 开发规范

### ⚠️ 设计一致性要求

**所有UI界面的调整和开发都必须严格遵循 `DESIGN_SYSTEM.md` 设计规范**

### 开发流程

1. **开发前**: 阅读 `DESIGN_SYSTEM.md`，确认设计元素
2. **开发中**: 使用规范定义的 Tailwind 类名，复用现有组件
3. **代码审查**: 检查设计一致性，确保无偏离

### 常用组件

#### Button 按钮

```tsx
import { Button } from "@/app/components/Button";

<Button size="medium" variant="primary">提交</Button>
<Button size="small" variant="secondary">取消</Button>
```

#### Tag 标签

```tsx
import { Tag } from "@/app/components/Tag";

<Tag variant="primary">公开</Tag>
<Tag variant="success">已完成</Tag>
```

## 设计规范快速参考

### 字号系统

- **48px** - 大标题（Hero、Section标题）
- **21px** - 副标题（卡片标题、按钮）
- **14px** - 正文（描述、标签）

### 颜色系统

- **品牌蓝**: `#0071e3`
- **主文字**: `#1d1d1f`
- **次文字**: `#86868b`
- **成功色**: `#34c759`
- **警告色**: `#ff9500`
- **错误色**: `#ff3b30`

### 间距系统

- **8px 网格**: 所有间距基于8px倍数
- **卡片间距**: `gap-6` (24px)
- **Section间距**: `py-28` (112px)

### 圆角系统

- **按钮/输入框**: `rounded-full`
- **大卡片**: `rounded-3xl` (24px)
- **标签**: `rounded-full`

## 浏览器支持

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

## 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

**注意**: PR 必须符合设计规范，否则不予合并。

## 许可证

© 2026 M平台. 保留所有权利.

---

**文档维护**: 设计规范是活文档，随项目演进持续更新。
