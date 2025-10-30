<template>
  <DynamicPage v-bind="layout">
    <template v-if="!selectedArticle">
      <div class="announcement-page">
        <ArticleList
          :items="annualNewsItems"
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

const annualNewsEntries = [
  {
    id: '20220309-1',
    slug: 'annual-20220309-1',
    title: '2020年度保险经纪大事记',
    summary:
      '2020年，是保险经纪“442”三步走转型发展“开启年”。保险经纪围绕转型发展总体目标任务，着力开拓市场、实施稳健经营、深化体制机制、加强党的领导、抓好疫情防控，实现了公司“十三五”时期的圆满收官。公司编制发布《2020年度保险经纪大事记》，系统回顾年度关键举措与亮点成果。',
    date: '2021-03-20',
  },
];

const annualNewsItems = ref(annualNewsEntries);
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
    const { data } = await $axios.get(`/api/news/annual/${slug}`);
    articleDetail.value = data;
  } catch (err) {
    console.error('加载年度新闻失败：', err);
    errorMessage.value = '暂时无法获取详情，请稍后重试。';
  } finally {
    loading.value = false;
  }
};

const pageTitle = computed(() => {
  if (selectedArticle.value && articleDetail.value?.title) {
    return `${articleDetail.value.title}_国家电投集团保险经纪有限公司`;
  }
  return '年度新闻_国家电投集团保险经纪有限公司';
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
