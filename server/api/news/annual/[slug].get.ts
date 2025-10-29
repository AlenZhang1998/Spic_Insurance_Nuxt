import type { H3Event } from 'h3';

const mockDatabase: Record<
  string,
  { title: string; author: string; publishedAt: string; content: string }
> = {
  'annual-20220309-1': {
    title: '2020年度保险经纪大事记',
    author: '国家电投集团保险经纪有限公司',
    publishedAt: '2021-03-20',
    content: `
      <h2 style="color:#2b6cb0;">这些都是 富文本 测试数据</h2>
      <p>欢迎使用 <strong>测试数据</strong> hello, 这里展示了一段测试富文本内容。</p>
      <p>测试数据测试数据</p>
      <p>2020年，是保险经纪“442”三步走转型发展的开启之年，公司围绕战略目标积极推进市场开拓、稳健经营、体制机制改革和党建引领。</p>
      <p>公司编制发布《2020年度保险经纪大事记》，系统梳理年度关键举措与亮点成果。</p>
    `,
  },
};

export default defineEventHandler((event: H3Event) => {
  const slug = event.context.params?.slug;
  if (slug && mockDatabase[slug]) {
    return mockDatabase[slug];
  }

  return {
    title: '年度新闻详情',
    author: '国家电投集团保险经纪有限公司',
    publishedAt: new Date().toISOString().slice(0, 10),
    content: `<h2 style="color:#2b6cb0;">这些都是 富文本 测试数据</h2>
        <p>欢迎使用 <strong>测试数据</strong> hello, 这里展示了一段测试富文本内容。</p>
        <p>测试数据测试数据</p><p>暂无该年度新闻的详细内容，标识：${slug ?? '未知'}</p>`,
  };
});
