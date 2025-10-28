export const contactInfo = {
  title: '联系我们',
  items: [
    { label: '地址', value: '北京市西城区金融大街28号院3楼5层' },
    { label: '邮编', value: '100033' },
    { label: '电话', value: '010-86625600' },
  ],
};

const aboutBanner = 'images/about/banner.jpg';
const newsBanner = 'images/news/banner.jpg';
const partyBanner = 'images/party/banner.jpg';
const businessBanner = 'images/business/banner.jpg';
const disclosureBanner = 'images/disclosure/banner.jpg';
const eBanner = 'images/integratedServices/banner.jpg';
const announcementBanner = 'images/announcement/banner.jpg';
const contactdBanner = 'images/contact/banner.jpg';

export const contentPageLayouts = {
  about: {
    title: '关于我们',
    bannerImage: aboutBanner,
    breadcrumb: [
      { label: '首页', to: '/' },
      { label: '关于我们', to: '/about' },
    ],
    sidebar: {
      title: '关于我们',
      menu: [
        { label: '企业概况', to: '/about/companyProfile' },
        { label: '组织结构', to: '/about/organizationalStructure' },
        { label: '领导致辞', to: '/about/leaderSpeech' },
      ],
      contact: contactInfo,
    },
  },
  news: {
    title: '新闻中心',
    bannerImage: newsBanner,
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
  },
  partyBuilding: {
    title: '党的建设',
    bannerImage: partyBanner,
    breadcrumb: [
      { label: '首页', to: '/' },
      { label: '党的建设', to: '/party-building' },
    ],
    sidebar: {
      title: '党的建设',
      menu: [
        { label: '党的建设', to: '/party-building/partybuilding' },
        { label: '党风廉政', to: '/party-building/cleanGovernance' },
        { label: '企业影像', to: '/party-building/enterpriseImage', bannerImage: contactdBanner },
      ],
      contact: contactInfo,
    },
  },
  businessOverview: {
    title: '业务概览',
    bannerImage: businessBanner,
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
  },
  disclosure: {
    title: '信息披露',
    bannerImage: disclosureBanner,
    breadcrumb: [
      { label: '首页', to: '/' },
      { label: '信息披露', to: '/disclosure' },
    ],
    sidebar: {
      title: '信息披露',
      menu: [
        // { label: '公告公示', to: '/disclosure/notices' },
        // { label: '制度文件', to: '/disclosure/policies' },
        // { label: '纪检监督', to: '/disclosure/supervision' },
      ],
      contact: contactInfo,
    },
  },
  integratedServices: {
    title: '融和e保',
    bannerImage: eBanner,
    breadcrumb: [
      { label: '首页', to: '/' },
      { label: '融和e保', to: '/integrated-services' },
    ],
    sidebar: {
      title: '融和e保',
      menu: [
        // { label: '系统简介', to: '/integrated-services/overview' },
        // { label: '功能亮点', to: '/integrated-services/features' },
        // { label: '案例实践', to: '/integrated-services/cases' },
      ],
      contact: contactInfo,
    },
  },
  announcements: {
    title: '公示公告',
    bannerImage: announcementBanner,
    breadcrumb: [
      { label: '首页', to: '/' },
      { label: '公示公告', to: '/announcements' },
    ],
    sidebar: {
      title: '公示公告',
      menu: [
        // { label: '采购招标', to: '/announcements/procurement' },
        // { label: '人事任免', to: '/announcements/hr' },
        // { label: '其它公告', to: '/announcements/others' },
      ],
      contact: contactInfo,
    },
  },
  contact: {
    title: '联系我们',
    bannerImage: contactdBanner,
    breadcrumb: [
      { label: '首页', to: '/' },
      { label: '联系我们', to: '/contact' },
    ],
    sidebar: {
      title: '联系我们',
      menu: [
        // { label: '联系方式', to: '/contact' },
        // { label: '在线留言', to: '/contact/message' },
      ],
      // contact: contactInfo,
    },
  },
};
