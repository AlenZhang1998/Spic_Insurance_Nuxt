import { defineEventHandler } from 'h3';

const navigation = [
  { label: '首    页', to: '/' },
  {
    label: '关于我们',
    to: '/about',
    subMenu: [
      { label: '企业概况', to: '/about/companyProfile' },
      { label: '组织结构', to: '/about/organizationalStructure' },
      { label: '领导致辞', to: '/about/leaderSpeech' },
    ],
  },
  {
    label: '新闻中心',
    to: '/news',
    subMenu: [
      { label: '公司要闻', to: '/news/companyNews' },
      { label: '行业资讯', to: '/news/industryNews' },
      { label: '年度新闻', to: '/news/annualNews' },
    ],
  },
  {
    label: '党的建设',
    to: '/party-building',
    subMenu: [
      { label: '党的建设', to: '/party-building/partybuilding' },
      { label: '党的建设', to: '/party-building/cleanGovernance' },
      { label: '企业影像', to: '/party-building/enterpriseImage' },
    ],
  },
  {
    label: '业务概览',
    to: '/business-overview',
    subMenu: [
      { label: '集团公司统保业务', to: '/business-overview/groupBusiness' },
      { label: '重大专项及境外资产保险', to: '/business-overview/assetInsurance' },
      { label: '创新业务', to: '/business-overview/innovativeBusiness' },
      { label: '产权经纪业务', to: '/business-overview/propertyBrokerage' },
    ],
  },
  { label: '信息披露', to: '/disclosure' },
  { label: '融和e保', to: '/integrated-services' },
  { label: '公示公告', to: '/announcements' },
  { label: '联系我们', to: '/contact' },
];

export default defineEventHandler(() => navigation);
