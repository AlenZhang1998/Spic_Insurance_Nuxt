<template>
  <DynamicPage v-bind="layout">
    <template v-if="!selectedArticle">
      <div class="announcement-page">
        <ArticleList
          :items="partyBuildingItems"
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
import { ref, computed, watch, watchEffect } from 'vue';
import DynamicPage from '@/components/common/DynamicPage.vue';
import ArticleList from '@/components/common/ArticleList.vue';
import DetailView from '@/components/common/DetailView.vue';
import { contentPageLayouts } from '@/configs/contentPages';

const layout = contentPageLayouts.partyBuilding;
const pageSize = 10;
const { $axios } = useNuxtApp();

const { data: partyBuildingData, error: partyBuildingError } = await useAsyncData(
  'party-building-general-list',
  async () => {
    const { data } = await $axios.get('/api/party-building/general');
    return data?.items ?? [];
  },
);

watchEffect(() => {
  if (partyBuildingError.value) {
    console.error('加载党的建设列表失败：', partyBuildingError.value);
  }
});

const route = useRoute();

const partyBuildingItems = computed(() => partyBuildingData.value ?? []);
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
    const { data } = await $axios.get(`/api/party-building/general/${id}`);
    articleDetail.value = data;
  } catch (err) {
    console.error('加载党建信息失败：', err);
    errorMessage.value = '暂时无法获取详情，请稍后重试。';
  } finally {
    loading.value = false;
  }
};

const extractRouteId = (value) => {
  if (Array.isArray(value)) {
    return value[0];
  }
  return value ?? '';
};

watch(
  [partyBuildingItems, () => route.query.id],
  async ([items, routeId]) => {
    const id = extractRouteId(routeId);

    if (!id) {
      if (selectedArticle.value) {
        resetDetail();
      }
      return;
    }

    if (!items?.length || selectedArticle.value?.id === id) {
      return;
    }

    const found = items.find((item) => item.id === id);
    if (found) {
      await handleSelect(found);
    }
  },
  { immediate: true },
);

const pageTitle = computed(() => {
  // if (selectedArticle.value && articleDetail.value?.title) {
  //   return `${articleDetail.value.title}_国家电投集团保险经纪有限公司`;
  // }
  return '党的建设_国家电投集团保险经纪有限公司';
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
