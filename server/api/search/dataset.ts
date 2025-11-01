export interface SearchItem {
  legacyId: string;
  id: string;
  title: string;
  summary: string;
  date: string;
  to: string;
}

const dataset: SearchItem[] = [
  {
    legacyId: '1clean-20211230-1',
    id: 'clean-20211230-1',
    title: '中央纪委国家监委公开通报违规典型问题',
    summary:
      '中央纪委国家监委公开通报十起违反中央八项规定精神典型问题，强调持续纠“四风”、树新风的重要性。',
    date: '2021-12-30',
    to: '/party-building/cleanGovernance?id=cg-20211230-1',
  },
  {
    legacyId: 'news-company-20220309-1',
    id: 'news-company-20220309-1',
    title: '集团公司统保业务',
    summary:
      '1国家电投集团保险经纪有限公司是国家电投集团资本控股有限公司的全资子公司，注册资本金壹亿元，前身中电投保险经纪（北京）有限公司成立于2007年12月26日。',
    date: '2021-12-13',
    to: '/business-overview/groupBusiness',
  },
  {
    legacyId: 'business-innovation',
    id: 'pb-20220126',
    title: '保险经纪召开党史学习教育专题民主生活会',
    summary:
      '1国家电投集团保险经纪有限公司依托集团能源产业优势，持续推进数字化、科技化创新业务，围绕客户需求打造风险解决方案。',
    date: '2021-12-13',
    to: '/party-building/partybuilding',
  },
  {
    legacyId: 'business-property',
    id: 'business-property',
    title: '产权经纪业务',
    summary:
      '1公司凭借专业的产权经纪团队，提供企业资产重组、股权交易等经纪服务，助力客户价值提升，服务范围覆盖能源、电力等多个行业。',
    date: '2021-12-13',
    to: '/business-overview/propertyBrokerage',
  },
  {
    legacyId: 'announcement-20220511',
    id: 'announcement-20220511',
    title: '国家电投集团保险经纪有限公司二〇二二年度（制作公司视频等项目）公开询价',
    summary:
      '1国家电投集团保险经纪有限公司对下述项目进行公开询价。询价条件：询价人：国家电投集团保险经纪有限公司（简称“保险经纪”）立项情况：已立项 项目资金来源：公司自筹。',
    date: '2022-05-11',
    to: '/announcements?id=a-20201130-1',
  },
  {
    legacyId: '1party-building-20220321',
    id: 'party-building-20220321',
    title: '保险经纪党支部召开2021年度组织生活会和民主评议党员工作',
    summary:
      '根据集团公司党委和资本控股党委的部署安排，前期充分学习讨论、广泛征求意见、深入谈心谈话，3月14日至17日，保险经纪党支部先后召开2021年度组织生活会。',
    date: '2022-03-21',
    to: '/party-building?id=pb-20220321',
  },
  {
    legacyId: '1clean-20211230-1',
    id: 'clean-20211230-1',
    title: '中央纪委国家监委公开通报违规典型问题',
    summary:
      '中央纪委国家监委公开通报十起违反中央八项规定精神典型问题，强调持续纠“四风”、树新风的重要性。',
    date: '2021-12-30',
    to: '/party-building/cleanGovernance?id=cg-20211230-1',
  },
  {
    legacyId: '1clean-20211230-1',
    id: 'clean-20211230-1',
    title: '中央纪委国家监委公开通报违规典型问题',
    summary:
      '1中央纪委国家监委公开通报十起违反中央八项规定精神典型问题，强调持续纠“四风”、树新风的重要性。',
    date: '2021-12-30',
    to: '/party-building/cleanGovernance?id=cg-20211230-1',
  },
  {
    legacyId: '1clean-20211230-1',
    id: 'clean-20211230-1',
    title: '中央纪委国家监委公开通报违规典型问题',
    summary:
      '1中央纪委国家监委公开通报十起违反中央八项规定精神典型问题，强调持续纠“四风”、树新风的重要性。',
    date: '2021-12-30',
    to: '/party-building/cleanGovernance?id=cg-20211230-1',
  },
  {
    legacyId: '1clean-20211230-1',
    id: 'clean-20211230-1',
    title: '中央纪委国家监委公开通报违规典型问题',
    summary:
      '1中央纪委国家监委公开通报十起违反中央八项规定精神典型问题，强调持续纠“四风”、树新风的重要性。',
    date: '2021-12-30',
    to: '/party-building/cleanGovernance?id=cg-20211230-1',
  },
  {
    legacyId: '1clean-20211230-1',
    id: 'clean-20211230-1',
    title: '中央纪委国家监委公开通报违规典型问题',
    summary:
      '1中央纪委国家监委公开通报十起违反中央八项规定精神典型问题，强调持续纠“四风”、树新风的重要性。',
    date: '2021-12-30',
    to: '/party-building/cleanGovernance?id=cg-20211230-1',
  },
  {
    legacyId: '1clean-20211230-1',
    id: 'clean-20211230-1',
    title: '中央纪委国家监委公开通报违规典型问题',
    summary:
      '1中央纪委国家监委公开通报十起违反中央八项规定精神典型问题，强调持续纠“四风”、树新风的重要性。',
    date: '2021-12-30',
    to: '/party-building/cleanGovernance?id=cg-20211230-1',
  },
  {
    legacyId: '1clean-20211230-1',
    id: 'clean-20211230-1',
    title: '中央纪委国家监委公开通报违规典型问题',
    summary:
      '中央纪委国家监委公开通报十起违反中央八项规定精神典型问题，强调持续纠“四风”、树新风的重要性。',
    date: '2021-12-30',
    to: '/party-building/cleanGovernance?id=cg-20211230-1',
  },
];

export default dataset;
