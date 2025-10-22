import { defineEventHandler, createError } from 'h3'

const contactInfo = {
  title: '联系我们',
  items: [
    { label: '地址', value: '北京市西城区金融大街28号院3楼5层' },
    { label: '邮编', value: '100033' },
    { label: '电话', value: '010-86625600' },
  ],
}

const pages = {
  about: {
    slug: 'about',
    bannerImage: 'images/about/banner.jpg',
    breadcrumb: [
      { label: '首页', to: '/' },
      { label: '关于我们', to: '/about' },
    ],
    sidebar: {
      title: '关于我们',
      menu: [
        { label: '企业概况', to: '/about' },
        { label: '组织结构', to: '/about/structure' },
        { label: '领导致辞', to: '/about/messages' },
      ],
      contact: contactInfo,
    },
    content: {
      title: '关于我们',
      blocks: [
        {
          type: 'rich-text',
          html: `
            <h2>国家电投集团保险经纪有限公司简介</h2>
            <p class="align-center">National Energy Investment Insurance Brokers Co., Ltd.</p>
          `,
        },
        {
          type: 'image',
          src: 'images/about/overview.jpg',
          alt: '公司园区形象',
        },
        {
          type: 'rich-text',
          html: `
            <p>国家电投集团保险经纪有限公司是国家电投集团资本控股有限公司的全资子公司，注册资本金1亿元。前身为中电投保险经纪（北京）有限公司，成立于2007年12月26日。2015年9月，公司与国核保险经纪公司完成合并重组，统一打造集团保险经纪专业平台。</p>
            <p>公司坚持“产融结合、注重服务、立足集团、面向市场”的管理理念，充分发挥电力能源风险管理的专业优势，为电力、煤炭、铝业等多个行业提供保险经纪、风险咨询和产权经纪服务，是国内具备核电运营期保险安排经验仅有的三家公司之一，同时在海上风电、光伏等领域积累了完善的全流程服务能力。</p>
            <p>依托集团资源，公司在全国范围内构建了覆盖广泛的服务网络，连续多年在全国保险经纪机构利润排名中位列前十，自2011年起连续担任北京保险中介行业协会副会长单位，屡获行业品牌荣誉。</p>
          `,
        },
      ],
    },
  },
  news: {
    slug: 'news',
    bannerImage: 'images/about/banner.jpg',
    breadcrumb: [
      { label: '首页', to: '/' },
      { label: '新闻中心', to: '/news' },
    ],
    sidebar: {
      title: '新闻中心',
      menu: [
        { label: '公司要闻', to: '/news/company' },
        { label: '党建园地', to: '/news/party' },
        { label: '行业观察', to: '/news/industry' },
      ],
      contact: contactInfo,
    },
    content: {
      title: '新闻中心',
      blocks: [
        {
          type: 'rich-text',
          html: `
            <p>及时发布公司要闻、专题活动及行业动态，展现保险经纪行业的专业能力与集团党建成果。</p>
          `,
        },
      ],
    },
  },
  'party-building': {
    slug: 'party-building',
    bannerImage: 'images/about/banner.jpg',
    breadcrumb: [
      { label: '首页', to: '/' },
      { label: '党的建设', to: '/party-building' },
    ],
    sidebar: {
      title: '党的建设',
      menu: [
        { label: '党建动态', to: '/party-building/trends' },
        { label: '学习园地', to: '/party-building/study' },
        { label: '党员风采', to: '/party-building/members' },
      ],
      contact: contactInfo,
    },
    content: {
      title: '党的建设',
      blocks: [
        {
          type: 'rich-text',
          html: `
            <p>聚焦党建引领，推进党的建设与经营发展深度融合，持续巩固基层组织战斗堡垒作用。</p>
          `,
        },
      ],
    },
  },
  'business-overview': {
    slug: 'business-overview',
    bannerImage: 'images/about/banner.jpg',
    breadcrumb: [
      { label: '首页', to: '/' },
      { label: '业务概览', to: '/business-overview' },
    ],
    sidebar: {
      title: '业务概览',
      menu: [
        { label: '集团统保', to: '/business-overview/group' },
        { label: '重大专项', to: '/business-overview/projects' },
        { label: '创新业务', to: '/business-overview/innovation' },
        { label: '综合金融', to: '/business-overview/finance' },
      ],
      contact: contactInfo,
    },
    content: {
      title: '业务概览',
      blocks: [
        {
          type: 'rich-text',
          html: `
            <p>围绕能源与大型基础设施客户，提供保险经纪、风险管理、资产配置等综合解决方案，全流程护航项目建设与运营。</p>
          `,
        },
      ],
    },
  },
  disclosure: {
    slug: 'disclosure',
    bannerImage: 'images/about/banner.jpg',
    breadcrumb: [
      { label: '首页', to: '/' },
      { label: '信息披露', to: '/disclosure' },
    ],
    sidebar: {
      title: '信息披露',
      menu: [
        { label: '公告公示', to: '/disclosure/notices' },
        { label: '制度文件', to: '/disclosure/policies' },
        { label: '纪检监督', to: '/disclosure/supervision' },
      ],
      contact: contactInfo,
    },
    content: {
      title: '信息披露',
      blocks: [
        {
          type: 'rich-text',
          html: `
            <p>依照监管要求对公司治理、财务数据、纪检监督情况进行公开，持续提高透明度与合规水平。</p>
          `,
        },
      ],
    },
  },
  'integrated-services': {
    slug: 'integrated-services',
    bannerImage: 'images/about/banner.jpg',
    breadcrumb: [
      { label: '首页', to: '/' },
      { label: '融和e保', to: '/integrated-services' },
    ],
    sidebar: {
      title: '融和e保',
      menu: [
        { label: '系统简介', to: '/integrated-services/overview' },
        { label: '功能亮点', to: '/integrated-services/features' },
        { label: '案例实践', to: '/integrated-services/cases' },
      ],
      contact: contactInfo,
    },
    content: {
      title: '融和e保',
      blocks: [
        {
          type: 'rich-text',
          html: `
            <p>融和e保数字平台集成线上询价、保单管理、风险画像等功能，实现保险经纪服务的数字化、智能化和可视化。</p>
          `,
        },
      ],
    },
  },
  announcements: {
    slug: 'announcements',
    bannerImage: 'images/about/banner.jpg',
    breadcrumb: [
      { label: '首页', to: '/' },
      { label: '公示公告', to: '/announcements' },
    ],
    sidebar: {
      title: '公示公告',
      menu: [
        { label: '采购招标', to: '/announcements/procurement' },
        { label: '人事任免', to: '/announcements/hr' },
        { label: '其它公告', to: '/announcements/others' },
      ],
      contact: contactInfo,
    },
    content: {
      title: '公示公告',
      blocks: [
        {
          type: 'rich-text',
          html: `
            <p>及时对外发布采购、招标、任职等公告信息，保障社会监督，营造公开透明的经营环境。</p>
          `,
        },
      ],
    },
  },
  contact: {
    slug: 'contact',
    bannerImage: 'images/about/banner.jpg',
    breadcrumb: [
      { label: '首页', to: '/' },
      { label: '联系我们', to: '/contact' },
    ],
    sidebar: {
      title: '联系我们',
      menu: [
        { label: '联系方式', to: '/contact' },
        { label: '在线留言', to: '/contact/message' },
      ],
      contact: contactInfo,
    },
    content: {
      title: '联系我们',
      blocks: [
        {
          type: 'rich-text',
          html: `
            <p>欢迎通过电话、电子邮箱或在线留言与我们取得联系，我们将尽快为您提供专业、全面的服务支持。</p>
          `,
        },
      ],
    },
  },
}

export default defineEventHandler((event) => {
  const slug = event.context.params?.slug
  const page = pages[slug]

  if (!page) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Page config not found',
    })
  }

  return page
})
