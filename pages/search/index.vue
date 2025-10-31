<template>
  <DynamicPage v-bind="layout" :breadcrumb-tail="breadcrumbTail">
    <template v-if="!selectedItem">
      <!-- <div class="search-intro search-intro--with-list">
        <p v-if="hasQuery" class="search-intro__summary">
          共找到 <strong>{{ items.length }}</strong> 条与
          <span class="search-highlight">“{{ searchQuery }}”</span> 相关的内容
        </p>
        <p v-else class="search-intro__summary">请输入关键字，快速定位您想了解的信息。</p>
      </div> -->

      <div v-if="pending" class="search-state">正在搜索，请稍候…</div>
      <div v-else-if="errorMessage" class="search-state search-state--error">
        {{ errorMessage }}
      </div>
      <div v-else-if="hasQuery && !items.length" class="search-state">
        未找到相关内容，换个关键词试试？
      </div>
      <div v-else class="search-list">
        <ArticleList
          :items="items"
          :page-size="pageSize"
          :initial-page="currentPage"
          @page-change="handlePageChange"
          @select="handleSelect"
        />
      </div>
    </template>

    <template v-else>
      <DetailView
        :detail="detail"
        :loading="detailLoading"
        :error-message="detailError"
        @back="resetDetail"
        class="search-detail-view"
      />
    </template>
  </DynamicPage>
</template>

<script setup>
import { computed, watch } from 'vue';
import DynamicPage from '@/components/common/DynamicPage.vue';
import ArticleList from '@/components/common/ArticleList.vue';
import DetailView from '@/components/common/DetailView.vue';
import { contentPageLayouts } from '@/configs/contentPages';

const layout = contentPageLayouts.search;

const route = useRoute();
const router = useRouter();
const { $axios } = useNuxtApp();

const searchQuery = computed(() => (route.query.q ? String(route.query.q) : '').trim());
const hasQuery = computed(() => Boolean(searchQuery.value));
const breadcrumbTail = computed(() => (searchQuery.value ? `${searchQuery.value}` : ''));

const normalizePage = (value) => {
  const num = Number(value);
  return Number.isFinite(num) && num > 0 ? Math.floor(num) : 1;
};

const pageSize = 5;
const currentPage = ref(normalizePage(route.query.page));

const { data, pending, error } = await useAsyncData(
  'search-results',
  async () => {
    const { data } = await $axios.get('/api/search', {
      params: {
        q: searchQuery.value,
      },
    });
    return data;
  },
  {
    watch: [searchQuery],
  },
);

const items = computed(() => data.value?.items ?? []);

watch(searchQuery, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    resetDetail();
    handlePageChange(1);
  }
});

watch(
  () => route.query.page,
  (value) => {
    const normalized = normalizePage(value);
    if (normalized !== currentPage.value) {
      currentPage.value = normalized;
    }
  },
);

const errorMessage = computed(() => (error.value ? '搜索服务暂时不可用，请稍后再试。' : ''));

const selectedItem = ref(null);
const detailData = ref(null);
const detailLoading = ref(false);
const detailError = ref('');

const handleSelect = async (item) => {
  if (!item?.slug) {
    return;
  }
  selectedItem.value = item;
  detailLoading.value = true;
  detailError.value = '';
  detailData.value = null;

  try {
    const { data } = await $axios.get(`/api/search/${item.slug}`);
    detailData.value = data;
  } catch (err) {
    console.error('加载详情失败:', err);
    detailError.value = '暂时无法获取详情，请稍后重试。';
  } finally {
    detailLoading.value = false;
  }
};

const detail = computed(
  () =>
    detailData.value ?? {
      title: selectedItem.value?.title ?? '搜索结果',
      content: '<div class="search-message">正在加载详情…</div>',
    },
);

watch(items, (list) => {
  if (!selectedItem.value) {
    return;
  }
  const exists = list.some((item) => item.slug === selectedItem.value.slug);
  if (!exists) {
    resetDetail();
  }
});

const handlePageChange = (page) => {
  const limited = Math.max(1, Math.floor(page));
  if (limited !== currentPage.value) {
    currentPage.value = limited;
    router.replace({
      path: route.path,
      query: {
        ...route.query,
        q: searchQuery.value || undefined,
        page: limited === 1 ? undefined : String(limited),
      },
    });
  }
};

const resetDetail = () => {
  selectedItem.value = null;
  detailData.value = null;
  detailError.value = '';
};

useHead(() => ({
  title: hasQuery.value
    ? `${searchQuery.value}_国家电投集团保险经纪有限公司`
    : '搜索_国家电投集团保险经纪有限公司',
}));
</script>

<style scoped lang="scss">
.search-header,
.search-intro {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;

  // &__title {
  //   font-size: 26px;
  //   font-weight: 600;
  //   color: #222;
  // }

  &__summary {
    font-size: 16px;
    color: #555;

    strong {
      margin: 0 4px;
      color: #c60c1a;
    }
  }
}

.search-state {
  text-align: center;
  color: #777;
  font-size: 16px;
  padding: 60px 0;

  &--error {
    color: #c60c1a;
  }
}

.search-highlight {
  color: #c60c1a;
  font-weight: 600;
}

.search-detail-view {
  :deep(.search-message) {
    text-align: center;
    color: #777;
    font-size: 16px;
    padding: 60px 0;
  }

  :deep(.search-results-wrapper) {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  :deep(.search-results) {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  :deep(.search-result) {
    border-bottom: 1px solid #f0f0f0;
    padding: 20px 0;
  }

  :deep(.search-result:last-child) {
    border-bottom: none;
    padding-bottom: 0;
  }

  :deep(.search-result__header) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
  }

  :deep(.search-result__title) {
    font-size: 18px;
    color: #c60c1a;
    font-weight: 600;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  :deep(.search-result__date) {
    font-size: 14px;
    color: #999;
    white-space: nowrap;
  }

  :deep(.search-result__summary) {
    font-size: 15px;
    line-height: 1.8;
    color: #555;
    margin: 10px 0 0;
  }
}
</style>
