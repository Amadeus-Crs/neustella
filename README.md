# Neustella

> 在星辰与代码之间的个人博客

## 简介

Neustella 是一个以太阳系为灵感的个人博客网站。

- **主页**：交互式太阳系二维轨道，行星基于真实天文数据运动
- **文章**：支持 Markdown，分为「技术」与「观察」两类
- **评论**：集成 Giscus（基于 GitHub Discussions）
- **风格**：禅意、极简、深空色调

## 技术栈

- [Astro](https://astro.build) — 静态站点生成
- [React](https://react.dev) — 交互组件
- [Tailwind CSS](https://tailwindcss.com) — 样式
- [Giscus](https://giscus.app) — 评论系统

## 快速开始

### 1. 克隆仓库

```bash
git clone https://github.com/yourusername/neustella.git
cd neustella
```

### 2. 安装依赖

```bash
npm install
```

### 3. 本地开发

```bash
npm run dev
```

访问 http://localhost:4321/neustella/

### 4. 构建

```bash
npm run build
```

构建产物输出到 `dist/` 目录。

## 如何上传文章

所有文章以 **Markdown 文件** 的形式存放在 `src/content/articles/` 目录下。

### 文件格式

每篇文章需要包含 YAML frontmatter：

```markdown
---
title: '文章标题'
description: '文章简介，显示在列表页'
date: 2024-12-01
category: tech   # tech 或 observe
draft: false     # true 则不发布
---

# 正文

这里写 Markdown 内容。
```

### 步骤

1. 在 `src/content/articles/` 下新建 `.md` 文件
2. 按上方格式填写 frontmatter
3. 用 Markdown 写正文
4. `git add . && git commit -m "add: 新文章" && git push`
5. GitHub Actions 会自动构建并部署

### 文章示例

项目已包含 4 篇示例文章：

| 文件 | 分类 | 说明 |
|------|------|------|
| `astro-static-site.md` | tech | Astro 静态博客搭建指南 |
| `react-hooks-thinking.md` | tech | React Hooks 设计哲学 |
| `morning-light.md` | observe | 晨间随笔 |
| `books-2024.md` | observe | 年度读书总结 |

## 配置评论系统（Giscus）

评论功能使用 [Giscus](https://giscus.app/zh-CN)，需要手动配置：

1. 确保你的 GitHub 仓库已开启 **Discussions** 功能
2. 访问 https://giscus.app/zh-CN
3. 在页面上填入：
   - **仓库**：`yourusername/neustella`
   - **Discussions 分类**：选择一个（如 "Announcements"）
   - **页面 ↔ Discussion 映射**：`pathname`
   - **主题**：`dark`
   - **语言**：`zh-CN`
4. 点击生成代码，复制 `data-repo`、`data-repo-id`、`data-category-id`
5. 打开 `src/components/CommentSection.astro`，替换对应的值
6. 提交并推送，重新部署后即可使用评论

## 部署到 GitHub Pages

### 1. 修改配置文件

编辑 `astro.config.mjs`，将 `site` 和 `base` 替换为你的信息：

```javascript
export default defineConfig({
  site: 'https://yourusername.github.io',
  base: '/neustella',  // 如果仓库名是 username.github.io，则设为 '/'
  // ...
});
```

### 2. 配置 GitHub Pages

1. 在仓库的 **Settings → Pages** 中：
   - Source 选择 **GitHub Actions**
2. 推送代码到 `main` 分支
3. GitHub Actions 会自动构建并部署

### 3. 自定义域名（可选）

如果需要自定义域名：

1. 在 `public/` 下创建 `CNAME` 文件，内容为你的域名
2. 在域名 DNS 配置中添加 CNAME 记录指向 `yourusername.github.io`

## 项目结构

```
src/
├── components/          # 组件
│   ├── OrbitCanvas.tsx  # 太阳系 Canvas 渲染
│   ├── ArticleCard.astro
│   └── CommentSection.astro
├── layouts/             # 布局
│   ├── BaseLayout.astro
│   └── ArticleLayout.astro
├── pages/               # 路由页面
│   ├── index.astro      # 主页（太阳系）
│   ├── articles.astro   # 文章列表
│   ├── articles/[slug].astro  # 文章详情
│   ├── tech.astro
│   ├── observe.astro
│   └── building.astro   # 施工中占位
├── content/
│   ├── config.ts        # Content Collection 配置
│   └── articles/        # Markdown 文章
├── utils/
│   ├── planet-data.ts   # 行星元数据
│   └── orbit.ts         # 轨道计算
└── styles/global.css    # 全局样式
```

## 开发说明

### 太阳系轨道计算

行星位置基于**真实天文数据**（轨道周期、J2000.0 初始角度）在客户端计算，不依赖外部 API。外圈行星（土星、天王星、海王星）的周期极长，为了视觉动画效果，采用了**视觉周期缩放**：

- 周期 > 5000 天：视觉周期 = 真实周期 / 20
- 周期 > 1000 天：视觉周期 = 真实周期 / 5
- 其余：保持真实周期

计算逻辑见 `src/utils/orbit.ts`。

### 响应式设计

使用 Tailwind CSS 的响应式类实现：
- 移动端：单列、紧凑间距
- 桌面端：最大宽度限制、更大留白

### 风格定制

配色在 `src/styles/global.css` 的 `@theme` 中定义，可自由修改：
- `--color-void`：背景色（深空黑）
- `--color-moon`：主文字色（月白）
- `--color-wood`：强调色（木色）

## License

MIT
