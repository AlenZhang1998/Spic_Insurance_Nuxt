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

2. 启动开发服务器（默认端口 3000）：

   ```bash
   npm run dev
   ```

3. 构建与预览：

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

## 特色功能

- 页面布局全部通过 `contentPageLayouts` 可配置化维护。
- 党建相关子页面（党风廉政、企业影像等）共用 `ArticleList`，保持风格统一。
- Banner 可根据当前激活的侧边栏菜单覆盖，例如“企业影像”自动使用 `contactdBanner`。

## 发布

```bash
npm run build
npm run preview # 本地预览构建产物
```

部署请参考官方 [Nuxt 部署指南](https://nuxt.com/docs/getting-started/deployment)。
