# 国家电投集团保险经纪有限公司官网（Nuxt 3）

本项目基于 Nuxt 3 构建，用于展示公司新闻、公示公告、党建园地、党风廉政、企业影像等重点业务内容。仓库同时集成 Element Plus 组件封装、Pinia 状态管理以及可插拔的 mock 服务，方便前后端独立迭代。

## 技术栈

- Nuxt 3（SPA 模式，Vite 构建）
- Vue 3 + TypeScript
- Element Plus UI 组件库
- Pinia 状态管理
- Sass/SCSS 样式体系

## 环境要求

- Node.js ≥ 20.19.0
- 推荐包管理器：yarn / npm / pnpm（三选一即可）

## 快速开始

1. 安装依赖
   ```bash
   # 任选其一
   yarn install
   npm install
   pnpm install
   ```
2. （可选）若需对接远端后端，可在项目根目录新增 `.env` 文件并设置 `NUXT_PUBLIC_API_BASE`，例如：
   ```dotenv
   NUXT_PUBLIC_API_BASE=https://api.example.com
   ```
   不设置时默认请求当前域名下的 `/api/*` 本地 mock 接口。
3. 启动开发服务器（默认端口 3000）：
   ```bash
   yarn dev 或 npm run dev
   ```

## 常用脚本

- `npm run dev`：本地开发，开启热更新。
- `npm run build`：构建生产环境静态资源。
- `npm run preview`：本地预览构建产物。
- `npm run generate`：产出静态站点（若需要静态化部署）。

上述命令使用 yarn 或 pnpm 时请替换为对应前缀。

## 环境变量

- `NUXT_PUBLIC_API_BASE`：前端请求的统一 API 根地址。为空时使用 `/api/*` 指向 Nuxt 内置的 server mock。
- 若需要区分多套环境，可在 `.env.local`、`.env.production` 等文件中分别配置。

## 目录结构速览

- `app.vue`：应用根组件，负责加载默认布局与全局样式。
- `assets/`：静态资源目录，含 `images/`（图像）、`files/`（下载文档）。
- `components/`
  - `common/`：通用组件，例如 `DynamicPage`、`ArticleList`、`DetailView`、`FeatureGrid`、`SiteFooter` 等。
  - `home/`：首页专用模块（轮播、企业影像等可视化组件）。
- `configs/contentPages.js`：内容页布局配置，可维护侧边栏菜单、Banner 与联系方式等。
- `lang/`：多语言资源（简体、繁体、英文）。
- `layouts/default.vue`：站点基础骨架，包含头部导航、搜索、页脚等。
- `pages/`：业务页面，按模块拆分（首页、新闻中心、党建园地、公示公告、业务概览、信息披露、综合服务等）。
- `plugins/axios.ts`：全局 Axios 插件，封装 `$axios` / `$api` 并读取运行时配置。
- `server/api/`：Nuxt server 端 mock 接口，涵盖导航、列表、详情、搜索等场景。
- `store/`：Pinia 状态管理（语言、导航态等）。
- `nuxt.config.ts`：Nuxt 主配置，包含模块、Vite 插件、Element Plus 自动引入等。

## Mock 数据与接口

- 列表接口统一放在 `server/api/**/index.get.ts`，详情接口放在 `server/api/**/[id].get.ts`。
- 所有 mock 数据返回结构与上线后接口保持一致，方便后续替换为真实后端。
- `server/api/navigation.get.js` 提供头部导航示例数据；`server/api/search` 提供站内搜索数据集。
- 前端通过 `useNuxtApp().$axios` 调用接口，支持在组件内直接使用 `await $axios.get(...)`。

## 页面特性

- 内容页布局依赖 `contentPageLayouts` 配置，可在不改动组件的情况下调整侧边栏与 Banner。
- `ArticleList` + `DetailView` 组合实现“列表 + 富文本详情”模式，支持在同一路由中切换展示。
- 党建、公示公告等板块的页面均使用统一的通用组件，保持视觉与交互一致。
- Banner 与侧边栏支持按二级菜单自动切换，自定义背景资源可通过配置覆写。

## 开发提示

- 若新增模块，请同步维护 `configs/contentPages.js`、`server/api` 对应 mock 数据以及路由页面。
- 全局样式写在 `sass/` 与 `assets/styles`（若存在）中，组件内部尽量使用 `scoped`。
- 推荐通过 `lang/` 维护多语言文本，避免在组件中硬编码。

## 部署

```bash
npm run build
npm run start    # 生产/服务器运行（包含 server/api mock）
npm run preview  # 本地预览构建结果
```

注意：

- 本项目依赖 `server/api/*` 内置 mock，所以线上不能只部署静态文件（例如只上传 `.output/public` 或使用 `npm run generate` 的产物），否则 `/api/*` 会 404。
- 需要在服务器上运行 Nuxt 的 Node 服务：先 `npm run build`，再 `npm run start`（等价于 `node .output/server/index.mjs`）。
- 如果你用 Nginx，确保把站点请求转发到 Nuxt 进程（`/api` 和前端路由都走同一个端口）。

详见官方文档：[Nuxt 部署指南](https://nuxt.com/docs/getting-started/deployment)。
