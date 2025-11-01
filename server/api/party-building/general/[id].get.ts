import type { H3Event } from 'h3';

const mockDatabase: Record<string, { title: string; author: string; publishedAt: string; content: string }> = {
  'pb-20220321': {
    title: '保险经纪党支部召开2021年度组织生活会和民主评议党员工作',
    author: '国家电投集团保险经纪有限公司党支部',
    publishedAt: '2022-03-21',
    content: `
      <p>根据集团公司党委和资本控股党委部署，保险经纪党支部于3月14日至17日召开2021年度组织生活会并开展民主评议党员工作。</p>
      <p>会议紧扣主题，深入查摆问题，开展批评与自我批评，明确整改方向，进一步夯实基层党组织战斗堡垒作用。</p>
    `,
  },
  'pb-20220126': {
    title: '保险经纪召开党史学习教育专题民主生活会',
    author: '国家电投集团保险经纪有限公司',
    publishedAt: '2022-01-26',
    content: `
      <p>1月24日，公司党委召开党史学习教育专题民主生活会，党委领导班子成员对照检视问题、开展批评与自我批评，持续深化党史学习教育成果。</p>
    `,
  },
};

export default defineEventHandler((event: H3Event) => {
  const id = event.context.params?.id;

  if (id && mockDatabase[id]) {
    return mockDatabase[id];
  }

  return {
    title: '党建信息详情',
    author: '国家电投集团保险经纪有限公司',
    publishedAt: new Date().toISOString().slice(0, 10),
    content: `<p>暂未录入该党建信息详情，标识：${id ?? '未知'}</p>`,
  };
});
