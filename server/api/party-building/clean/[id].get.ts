import type { H3Event } from 'h3';

const mockDatabase: Record<string, { title: string; author: string; publishedAt: string; content: string }> = {
  'cg-20211230-1': {
    title: '中央纪委国家监委公开通报十起违反中央八项规定精神典型问题',
    author: '中央纪委国家监委网站',
    publishedAt: '2021-12-30',
    content: `
      <p>中央纪委国家监委公开通报10起违反中央八项规定精神典型问题，要求各级党组织举一反三、从严治党，持续纠“四风”树新风。</p>
      <p>公司提醒全体干部员工，要深刻吸取典型案例教训，自觉抵制不良风气，确保廉洁从业。</p>
    `,
  },
  'cg-20211230-2': {
    title: '保险经纪关于持之以恒正风肃纪确保元旦春节廉洁过节的通知',
    author: '公司纪检部门',
    publishedAt: '2021-12-30',
    content: `
      <p>为确保“两节”期间风清气正，公司纪检部门印发通知，重申纪律要求，开展节前廉洁提醒，畅通举报渠道。</p>
      <p>各部门要切实履行主体责任，加强教育监督，确保节日期间廉洁从业。</p>
    `,
  },
};

export default defineEventHandler((event: H3Event) => {
  const id = event.context.params?.id;

  if (id && mockDatabase[id]) {
    return mockDatabase[id];
  }

  return {
    title: '党风廉政信息',
    author: '国家电投集团保险经纪有限公司',
    publishedAt: new Date().toISOString().slice(0, 10),
    content: `<p>暂未录入该党风廉政详情，标识：${id ?? '未知'}</p>`,
  };
});
