<template>
  <DynamicPage v-bind="layout">
    <template v-if="!selectedArticle">
      <div class="announcement-page">
        <ArticleList
          :items="industryNewsItems"
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
import { ref, computed, watchEffect } from 'vue';
import DynamicPage from '@/components/common/DynamicPage.vue';
import ArticleList from '@/components/common/ArticleList.vue';
import DetailView from '@/components/common/DetailView.vue';
import { contentPageLayouts } from '@/configs/contentPages';

const layout = contentPageLayouts.news;
const pageSize = 5;
const { $axios } = useNuxtApp();

const { data: industryNewsData, error: industryNewsError } = await useAsyncData(
  'industry-news-list',
  async () => {
    const { data } = await $axios.get('/api/news/industry');
    return data?.items ?? [];
  },
);

watchEffect(() => {
  if (industryNewsError.value) {
    console.error('加载行业资讯列表失败：', industryNewsError.value);
  }
});

const industryNewsItems = computed(() => industryNewsData.value ?? []);
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
  if (!item || !item.id) {
    return;
  }
  selectedArticle.value = item;
  await fetchDetail(item.id);
};

const resetDetail = () => {
  selectedArticle.value = null;
  articleDetail.value = null;
  errorMessage.value = '';
};

const fetchDetail = async (id) => {
  loading.value = true;
  errorMessage.value = '';
  articleDetail.value = null;

  try {
    const { data } = await $axios.get(`/api/news/industry/${id}`);
    articleDetail.value = data;
  } catch (err) {
    console.error('加载行业资讯失败：', err);
    errorMessage.value = '暂时无法获取详情，请稍后重试。';
  } finally {
    loading.value = false;
  }
};

const pageTitle = computed(() => {
  if (selectedArticle.value && articleDetail.value?.title) {
    return `${articleDetail.value.title}_国家电投集团保险经纪有限公司`;
  }
  return '行业资讯_国家电投集团保险经纪有限公司';
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
