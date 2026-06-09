---
title: '使用 Astro 构建静态博客'
description: '记录从选择框架到部署上线的全过程，为什么选择 Astro 以及如何用它搭建一个极致性能的静态网站。'
date: 2024-12-15
category: tech
draft: false
---

# 使用 Astro 构建静态博客

> 这是一篇示例技术文章。上传新文章时，只需在 `src/content/articles/` 目录下新建 `.md` 文件，按照此格式填写 frontmatter 即可。

## 为什么选择 Astro

Astro 是一个**以内容为中心**的 Web 框架，它的核心优势在于：

- **零 JS 默认**：页面默认不发送任何 JavaScript，只输出纯 HTML
- **群岛架构**：只在需要交互的地方加载 JS，其余保持静态
- **原生 Markdown 支持**：内置 Content Collections，文章管理非常方便
- **卓越的构建性能**：构建速度极快，输出产物轻量

## 项目结构

```
src/
├── content/articles/   # 文章存放目录
├── layouts/            # 页面布局
├── components/         # 可复用组件
└── pages/              # 路由页面
```

## 部署到 GitHub Pages

Astro 的静态输出非常适合 GitHub Pages。只需：

1. 在 `astro.config.mjs` 中配置 `site` 和 `base`
2. 添加 GitHub Actions 工作流
3. 推送代码，自动部署

## 代码示例

```javascript
// 获取所有文章
const articles = await getCollection('articles');

// 按日期排序
articles.sort((a, b) =>
  b.data.date.getTime() - a.data.date.getTime()
);
```

## 总结

对于以内容为主的个人博客，Astro 是一个非常优雅的选择。它在性能和开发体验之间取得了很好的平衡。

---

*这篇示例展示了 Markdown 渲染效果，包括标题、引用、代码块和列表。*
