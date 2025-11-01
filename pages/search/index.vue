<template>
  <DynamicPage v-bind="layout" :breadcrumb-tail="breadcrumbTail">
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
  </DynamicPage>
</template>

<script setup>
import { computed, watch } from 'vue';
import DynamicPage from '@/components/common/DynamicPage.vue';
import ArticleList from '@/components/common/ArticleList.vue';
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

const handleSelect = (item) => {
  if (item?.to) {
    router.push(item.to);
  }
};

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
</style>
