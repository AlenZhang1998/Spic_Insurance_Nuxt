import { getQuery } from 'h3';

const dataset = [
  {
    id: 'news-company-20220309-1',
    title: '集团公司系统业务',
    summary:
      '国家电投集团保险经纪有限公司是国家电投集团资本控股有限公司的全资子公司，注册资本金壹亿元，前身中电投保险经纪（北京）有限公司成立于2007年12月26日。',
    date: '2021-12-13',
    category: '公司要闻',
    to: '/news/companyNews?slug=company-20220309-1',
  },
  {
    id: 'business-innovation',
    title: '创新业务',
    summary:
      '国家电投集团保险经纪有限公司依托集团能源产业优势，持续推进数字化、科技化创新业务，围绕客户需求打造风险解决方案。',
    date: '2021-12-13',
    category: '业务概览',
    to: '/business-overview/innovativeBusiness',
  },
  {
    id: 'business-property',
    title: '产权经纪业务',
    summary:
      '公司凭借专业的产权经纪团队，提供企业资产重组、股权转让等经纪服务，助力客户价值提升，服务范围覆盖能源、电力等多个行业。',
    date: '2021-12-13',
    category: '业务概览',
    to: '/business-overview/propertyBrokerage',
  },
  {
    id: 'announcement-20220511',
    title: '国家电投集团保险经纪有限公司二〇二二年度（制作公司视频等项目）公开询价',
    summary:
      '国家电投集团保险经纪有限公司对外开展公开询价，明确报名条件与项目需求，欢迎符合条件的单位积极参与。',
    date: '2022-05-11',
    category: '公示公告',
    to: '/announcements?slug=a-20201130-1',
  },
  {
    id: 'news-company-20220224',
    title: '国家电投集团保险经纪有限公司召开2022年工作会议',
    summary:
      '会议深入贯彻落实集团公司战略部署，总结2021年经营成果，部署2022年重点任务，坚持改革创新、稳健经营。',
    date: '2022-02-24',
    category: '公司要闻',
    to: '/news/companyNews?slug=company-20220224',
  },
  {
    id: 'party-building-20220321',
    title: '保险经纪党支部召开2021年度组织生活会和民主评议党员工作',
    summary:
      '按照集团党委要求，公司党支部扎实开展组织生活会和民主评议党员工作，持续推进党建与业务深度融合。',
    date: '2022-03-21',
    category: '党的建设',
    to: '/party-building?slug=pb-20220321',
  },
  {
    id: 'clean-20211230-1',
    title: '中央纪委国家监委公开通报违规典型问题',
    summary:
      '中央纪委国家监委公开通报十起违反中央八项规定精神典型问题，强调持续纠“四风”、树新风的重要性。',
    date: '2021-12-30',
    category: '党风廉政',
    to: '/party-building/cleanGovernance?slug=cg-20211230-1',
  },
  {
    id: 'disclosure-20201204',
    title: '信息披露',
    summary:
      '公司基本信息、许可证信息、互联网保险业务情况等均按监管要求对外披露，服务热线：010-86625600。',
    date: '2020-12-04',
    category: '信息披露',
    to: '/disclosure',
  },
];

const DEFAULT_PAGE_SIZE = 5;

export default defineEventHandler((event) => {
  const { q = '', page = '1', pageSize = DEFAULT_PAGE_SIZE } = getQuery(event);

  const keyword = String(q).trim().toLowerCase();
  const currentPage = Math.max(parseInt(String(page), 10) || 1, 1);
  const limit = Math.max(parseInt(String(pageSize), 10) || DEFAULT_PAGE_SIZE, 1);

  if (!keyword) {
    return {
      total: 0,
      page: 1,
      pageSize: limit,
      items: [],
    };
  }

  const matched = dataset.filter((item) => {
    const haystack = `${item.title} ${item.summary}`.toLowerCase();
    return haystack.includes(keyword);
  });

  const total = matched.length;
  const start = (currentPage - 1) * limit;
  const items = matched.slice(start, start + limit);

  return {
    total,
    page: currentPage,
    pageSize: limit,
    items,
  };
});
