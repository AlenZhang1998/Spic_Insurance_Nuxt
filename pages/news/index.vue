<template>
  <DynamicPage v-bind="layout">
    <template v-if="!selectedArticle">
      <div class="announcement-page">
        <ArticleList
          :items="companyNewsItems"
          :page-size="pageSize"
          :initial-page="currentPage"
          @page-change="handlePageChange"
          @select="handleSelect"
        />
      </div>
    </template>

    <template v-else>
      <DetailView
        :detail="articleDetail"
        :loading="loading"
        :error-message="errorMessage"
        @back="resetDetail"
        class="news-detail"
      />
    </template>
  </DynamicPage>
</template>

<script setup>
import { ref, computed } from 'vue';
import DynamicPage from '@/components/common/DynamicPage.vue';
import ArticleList from '@/components/common/ArticleList.vue';
import DetailView from '@/components/common/DetailView.vue';
import { contentPageLayouts } from '@/configs/contentPages';

const layout = contentPageLayouts.news;
const pageSize = 5;
const { $axios } = useNuxtApp();

const companyNewsEntries = [
  {
    id: '20220309-1',
    slug: 'company-20220309-1',
    title: '保险经纪积极拓展南市场化业务',
    summary:
      '为进一步构筑保险新赛道，拓展南方业务，保险经纪业务拓展团队谢丹、武凡于3月1日赴郑州市拜访河南省田首建设实业有限公司、郑州市建设投资集团有限公司，洽谈保险业务合作。',
    date: '2022-03-09',
  },
  {
    id: '20220309-2',
    slug: 'company-20220309-2',
    title: '保险经纪举办“健康向上”主题“三八”妇女节活动',
    summary:
      '在国际“三八”妇女节到来之际，为表示公司对女职工的关心关爱，保险经纪工会举办了“健康向上”主题节日活动，本次活动共设有两个环节，第一环节开展“健康讲座”第二环节组织健步走。',
    date: '2022-03-09',
  },
  {
    id: '20220224',
    slug: 'company-20220224',
    title: '保险经纪召开2022年工作会议',
    summary:
      '2月23日，保险经纪召开2022年工作会议，会议以习近平新时代中国特色社会主义思想为指导，深入贯彻落实集团公司、资本控股2022年工作会议精神，总结公司2021年经营发展成效，部署2022年重点任务。',
    date: '2022-02-24',
  },
  {
    id: '20220218',
    slug: 'company-20220218',
    title: '张伟冬、田志国会见明喆集团执行总裁兼华中区域总经理罗延徽',
    summary:
      '2月17日，资本控股总经理助理、投资与业务协同部总经理张伟冬，保险经纪副总经理田志国在公司会见明喆集团执行总裁罗延徽一行，洽谈保险业务合作与协同发展事项。',
    date: '2022-02-18',
  },
  {
    id: '20220126',
    slug: 'company-20220126',
    title: '保险经纪召开一届二次董事会、提名与薪酬委员会、审计与风险委员会2022年第一次会议',
    summary:
      '1月24日下午，保险经纪召开一届二次董事会、提名与薪酬委员会、审计与风险委员会2022年第一次会议在公司511会议室召开。保险经纪委书记、提名与薪酬委员会、审计与风险委员会成员参会。',
    date: '2022-01-26',
  },
];

const companyNewsItems = ref(companyNewsEntries);
const currentPage = ref(1);
const selectedArticle = ref(null);
const articleDetail = ref(null);
const loading = ref(false);
const errorMessage = ref('');

const handlePageChange = (page) => {
  currentPage.value = page;
  resetDetail();
};

const handleSelect = async (item) => {
  if (!item || !item.slug) {
    return;
  }
  selectedArticle.value = item;
  await fetchDetail(item.slug);
};

const resetDetail = () => {
  selectedArticle.value = null;
  articleDetail.value = null;
  errorMessage.value = '';
};

const fetchDetail = async (slug) => {
  loading.value = true;
  errorMessage.value = '';
  articleDetail.value = null;

  try {
    const { data } = await $axios.get(`/api/news/company/${slug}`);
    articleDetail.value = data;
  } catch (err) {
    console.error('加载公司要闻失败：', err);
    errorMessage.value = '暂时无法获取详情，请稍后重试。';
  } finally {
    loading.value = false;
  }
};

const pageTitle = computed(() => {
  if (selectedArticle.value && articleDetail.value?.title) {
    return `${articleDetail.value.title}_国家电投集团保险经纪有限公司`;
  }
  return '公司要闻_国家电投集团保险经纪有限公司';
});

useHead(() => ({
  title: pageTitle.value,
}));
</script>

<style lang="scss">
.announcement-page {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
</style>
