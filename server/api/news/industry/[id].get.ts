import type { H3Event } from 'h3';

// TODO: Replace mock content with real backend data once the API is available.
const mockDatabase: Record<
  string,
  { title: string; author: string; publishedAt: string; content: string }
> = {
  'industry-20211103': {
    title: '今年10月疆电外送电量突破千亿大关',
    author: '行业资讯',
    publishedAt: '2021-11-03',
    content: `
      <p>1—10月，新疆外送电量突破千亿千瓦时，持续保持高位运行，有力支撑西电东送保供任务。</p>
      <p>新疆电网正加速推进新能源消纳与跨区输电协同发展，进一步提升远距离输电能力。</p>
    `,
  },
  'industry-20211101': {
    title: '“能贮能溢”市场化电价机制初步形成',
    author: '行业资讯',
    publishedAt: '2021-11-01',
    content: `
      <p>河南省完成电力直接交易合同改签，标志着“能贮能溢”市场化电价机制初步形成。</p>
      <p>新机制引导发用电双方通过市场化手段促进电力保供及价格弹性调节。</p>
    `,
  },
  'industry-20211027': {
    title: '实现碳达峰、碳中和目标不能立刻弃煤',
    author: '行业资讯',
    publishedAt: '2021-10-27',
    content: `
      <p>业内专家指出，在“双碳”目标推进过程中仍需统筹能源安全与清洁低碳转型。</p>
      <p>合理利用煤电调峰保供能力，配合新能源发展，是实现目标的重要路径。</p>
    `,
  },
  'industry-20211025': {
    title: '国内在建纬度最高抽水蓄能电站全面进入蓄水阶段',
    author: '行业资讯',
    publishedAt: '2021-10-25',
    content: `
      <p>牡丹江荒沟抽水蓄能电站上水库投入运行，项目全面进入蓄水阶段。</p>
      <p>该项目建成后将为东北地区提供重要的调峰和调频支撑。</p>
    `,
  },
  'industry-20210703': {
    title: '征集2021—2022年度合格保险技术服务供应商的公告',
    author: '行业资讯',
    publishedAt: '2021-07-03',
    content: `
      <p>国家电投集团保险经纪有限公司面向社会征集2021—2022年度保险技术服务供应商。</p>
      <p>欢迎符合条件的机构报名，为公司风险管理与保险服务贡献专业力量。</p>
    `,
  },
  'industry-20211027b': {
    title: '实现碳达峰、碳中和目标不能立刻弃煤',
    author: '行业资讯',
    publishedAt: '2021-10-27',
    content: `
      <p>专家强调，必须确保能源供应安全，在推进双碳过程中稳妥推动煤电机组清洁高效利用。</p>
      <p>相关部门将持续优化煤电运营策略，为新能源发展腾出空间。</p>
    `,
  },
  'industry-20211025b': {
    title: '国内在建纬度最高抽水蓄能电站全面进入蓄水阶段',
    author: '行业资讯',
    publishedAt: '2021-10-25',
    content: `
      <p>荒沟抽水蓄能电站工程的关键节点顺利推进，全面进入蓄水阶段。</p>
      <p>项目建成后将提升东北地区可再生能源的消纳能力。</p>
    `,
  },
  'industry-20210703b': {
    title: '征集2021—2022年度合格保险技术服务供应商的公告',
    author: '行业资讯',
    publishedAt: '2021-07-03',
    content: `
      <p>保险经纪公司面向社会征集保险技术服务供应商，为客户提供综合性风险保障方案。</p>
      <p>征集范围涵盖风险评估、保险方案设计、理赔支持等专业服务。</p>
    `,
  },
};

export default defineEventHandler((event: H3Event) => {
  const id = event.context.params?.id;
  if (id && mockDatabase[id]) {
    return mockDatabase[id];
  }

  return {
    title: '行业资讯详情',
    author: '行业资讯',
    publishedAt: new Date().toISOString().slice(0, 10),
    content: `<h2 style="color:#2b6cb0;">这些都是 富文本 测试数据</h2>
        <p>欢迎使用 <strong>测试数据</strong> hello, 这里展示了一段测试富文本内容。</p>
        <p>测试数据测试数据</p><p>暂无该行业资讯的详细内容，标识：${id ?? '未知'}</p>`,
  };
});
