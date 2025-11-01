<template>
  <DynamicPage v-bind="layout">
    <template v-if="!selectedArticle">
      <div class="announcement-page">
        <ArticleList
          :items="cleanGovernanceItems"
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
        class="party-building-detail"
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

const layout = contentPageLayouts.partyBuilding;
const pageSize = 10;
const { $axios } = useNuxtApp();

const { data: cleanGovernanceData, error: cleanGovernanceError } = await useAsyncData(
  'party-building-clean-list',
  async () => {
    const { data } = await $axios.get('/api/party-building/clean');
    return data?.items ?? [];
  },
);

watchEffect(() => {
  if (cleanGovernanceError.value) {
    console.error('加载党风廉政列表失败：', cleanGovernanceError.value);
  }
});

const cleanGovernanceItems = computed(() => cleanGovernanceData.value ?? []);
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
    const { data } = await $axios.get(`/api/party-building/clean/${id}`);
    articleDetail.value = data;
  } catch (err) {
    console.error('加载党风廉政详情失败：', err);
    errorMessage.value = '暂时无法获取详情，请稍后重试。';
  } finally {
    loading.value = false;
  }
};

const pageTitle = computed(() => {
  // if (selectedArticle.value && articleDetail.value?.title) {
  //   return `${articleDetail.value.title}_国家电投集团保险经纪有限公司`;
  // }
  return '党风廉政_国家电投集团保险经纪有限公司';
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
