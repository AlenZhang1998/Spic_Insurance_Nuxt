# 国家电投集团保险经纪有限公司官网（Nuxt 3）

本项目基于 Nuxt 3 构建，用于展示公司新闻、公示公告、党建园地、党风廉政、企业影像等内容模块。

## 环境要求

- Node.js 20.19.0
- 推荐包管理器：npm / yarn / pnpm（三选一即可）

## 快速开始

1. 安装依赖：

   ```bash
   # 任选其一
   npm install
   # 或
   yarn install
   # 或
   pnpm install
   ```

2. （可选）若需对接远端后端，可在根目录新增 `.env` 文件并设置 `NUXT_PUBLIC_API_BASE`，例如：

   ```dotenv
   NUXT_PUBLIC_API_BASE=https://api.example.com
   ```

   不设置时默认请求当前域名下的 `/api/*` 本地 mock 接口。

3. 启动开发服务器（默认端口 3000）：

   ```bash
   npm run dev
   ```

4. 构建与预览：

   ```bash
   npm run build
   npm run preview
   ```

若使用 yarn / pnpm，请将上述命令替换为对应前缀。

## 目录结构（摘录）

- `components/common/ArticleList.vue`：统一的文章列表+分页组件，公告、党建、党风廉政等页面复用。
- `components/common/DynamicPage.vue`：内容页框架，负责侧边栏、面包屑、Banner 切换（支持子菜单覆写 bannerImage）。
- `configs/contentPages.js`：布局配置，含侧边栏菜单、Banner、联系方式等，可在此调整导航结构或样式资源。
- `pages/announcements`、`pages/party-building`：各业务页面，按模块拆分。
- `server/api/navigation.get.js`：示例接口，返回导航菜单数据。

## 目录及文件说明

项目根目录关键文件夹、文件说明如下：

- `app.vue`：Nuxt 应用根组件，包裹默认布局。
- `assets/`
  - `images/`：全站静态图片资源（如业务概览封面、党建图等）。
  - `files/`：可下载的文档资源。
- `components/`
  - `common/`：通用组件（如 `DynamicPage`、`ArticleList`、`DetailView`、`FeatureGrid`、`SiteFooter` 等）。
  - `home/`：首页专用模块组件（轮播、企业影像展示等）。
- `configs/`
  - `contentPages.js`：内容页布局、侧边栏菜单、banner 配置。
- `plugins/axios.ts`：全局 Axios 插件，统一封装 `$axios` / `$api`，支持通过 `NUXT_PUBLIC_API_BASE` 切换后端地址。
- `layouts/`
  - `default.vue`：站点默认骨架（头部导航、页脚、搜索等）。
- `pages/`
  - `index.vue`：首页入口。
  - `announcements/`：公示公告相关页面。
  - `news/`：新闻中心（公司要闻、年度新闻、行业资讯等）。
  - `party-building/`：党建园地（二级页面：党建动态、党风廉政、企业影像等）。
  - `business-overview/`：业务概览与子业务介绍页面。
  - `disclosure/`：信息披露页面。
- `server/api/navigation.get.js`：导航菜单接口示例（供头部菜单调用）。
- `server/api/announcements/`、`server/api/news/`、`server/api/party-building/` 等：列表 (`index.get.ts`) 与详情 (`[slug].get.ts`) 的模拟接口（待与后端对接时替换）。
- `store/`：Pinia 全局状态管理（如语言、主题等）。
- `nuxt.config.ts`：Nuxt 配置文件，包含模块、插件、Vite 配置等。
- `README.md`：项目说明文档（当前文件）。

## 特色功能

- 页面布局全部通过 `contentPageLayouts` 可配置化维护。
- 党建相关子页面（党风廉政、企业影像等）共用 `ArticleList`，保持风格统一。
- `ArticleList` + `DetailView` 形成的“列表 + 富文本详情”模式，可在同一路由内切换展示。
- 所有列表与详情数据临时通过 Nuxt `server/api` 下的 mock 接口提供，前端通过 `$axios` 统一调用，方便前后端分离调试。
- Banner 可根据当前激活的侧边栏菜单覆盖，例如“企业影像”自动使用 `contactdBanner`。

## 内容数据与接口

- 每个列表项需提供唯一的 `slug`，`ArticleList` 在触发 `@select` 时会使用该 `slug` 调用对应的详情接口。
- 详情展示统一由 `components/common/DetailView.vue` 渲染，支持加载中、错误态、返回列表等交互。
- 列表接口统一位于 `server/api/**/index.get.ts`，详情接口位于 `server/api/**/[slug].get.ts`，均返回富文本 HTML 或结构化数据，可一键替换为真实后端。
- 前端通过 `useNuxtApp().$axios` 或 `const { data } = await $axios.get(...)` 访问接口，默认指向同域 `/api/*`，如需对接远端请设置 `NUXT_PUBLIC_API_BASE` 环境变量。
- 若新增列表项或模块，请同步维护对应的 mock 列表与详情数据，确保本地调试时可以正常预览。

## 发布

```bash
npm run build
npm run preview # 本地预览构建产物
```

部署请参考官方 [Nuxt 部署指南](https://nuxt.com/docs/getting-started/deployment)。
