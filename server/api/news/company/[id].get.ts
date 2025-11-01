import type { H3Event } from 'h3';

const mockDatabase: Record<
  string,
  { title: string; author: string; publishedAt: string; content: string }
> = {
  'company-20220309-1': {
    title: '保险经纪积极拓展南市场化业务',
    author: '国家电投集团保险经纪有限公司',
    publishedAt: '2022-03-09',
    content: `
      <h2 style="color:#2b6cb0;">这些都是 富文本 测试数据</h2>
      <p>欢迎使用 <strong>测试数据</strong> hello, 这里展示了一段测试富文本内容。</p>
      <p>测试数据测试数据</p>
      <p>为进一步构筑保险新赛道，保险经纪业务拓展团队于3月1日赴郑州市拜访合作伙伴，深入交流保险经纪服务方案，推动南方市场业务落地。</p>
      <p>团队重点介绍了统保方案、定制化风险管理服务，并与客户就后续合作计划达成初步共识。</p>
    `,
  },
  'company-20220309-2': {
    title: '保险经纪举办“健康向上”主题“三八”妇女节活动',
    author: '保险经纪工会',
    publishedAt: '2022-03-09',
    content: `
      <p>三八国际妇女节期间，公司工会组织开展“健康向上”主题活动，通过健康讲座、健步行等形式表达对女职工的关怀，营造积极向上的企业氛围。</p>
    `,
  },
};

export default defineEventHandler((event: H3Event) => {
  const id = event.context.params?.id;
  if (id && mockDatabase[id]) {
    return mockDatabase[id];
  }

  return {
    title: '公司要闻详情',
    author: '国家电投集团保险经纪有限公司',
    publishedAt: new Date().toISOString().slice(0, 10),
    content: `<h2 style="color:#2b6cb0;">这些都是 富文本 测试数据</h2>
        <p>欢迎使用 <strong>测试数据</strong> hello, 这里展示了一段测试富文本内容。</p>
        <p>测试数据测试数据</p><p>该公司要闻暂无详细内容，标识：${id ?? '未知'}</p>`,
  };
});
