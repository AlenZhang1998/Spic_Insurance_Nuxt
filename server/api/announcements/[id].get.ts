import type { H3Event } from 'h3';

const mockDatabase: Record<
  string,
  {
    title: string;
    author: string;
    publishedAt: string;
    content: string;
  }
> = {
  overview: {
    title: '创新业务概览',
    author: '国家电投集团保险经纪有限公司',
    publishedAt: '2022-03-15',
    content: `
      <h2 style="color:#2b6cb0;">这些都是 富文本 测试数据</h2>
        <p>欢迎使用 <strong>测试数据</strong> hello, 这里展示了一段测试富文本内容。</p>
        <p>测试数据测试数据</p>

        <img src="https://picsum.photos/600/200" alt="测试图片">

        <ul>
          <li>测试数据测试数据测试数据</li>
          <li>测试数据测试数据测试数据</li>
          <li>测试数据测试数据测试数据</li>
        </ul>
        <ul>
          <li>测试数据测试数据测试数据</li>
          <li>测试数据测试数据测试数据</li>
          <li>测试数据测试数据测试数据</li>
        </ul>
        <ul>
          <li>测试数据测试数据测试数据</li>
          <li>测试数据测试数据测试数据</li>
          <li>测试数据测试数据测试数据</li>
        </ul>

        <p>更多功能请访问
          <a href="https://baidu.com" target="_blank" style="color:#3182ce;">测试数据</a>。
        </p>
    `,
  },
};

export default defineEventHandler((event: H3Event) => {
  const id = event.context.params?.id;
  if (id && mockDatabase[id]) {
    return mockDatabase[id];
  }

  throw createError({
    statusCode: 404,
    statusMessage: '业务详情未找到',
  });
});
