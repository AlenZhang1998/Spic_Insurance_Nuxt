<template>
  <DynamicPage v-bind="layout">
    <template #header>
      <div class="search-header">
        <h1 class="search-header__title">搜索结果</h1>
        <p v-if="hasQuery" class="search-header__summary">
          共找到
          <strong>{{ total }}</strong>
          条与
          <span class="search-highlight">“{{ searchQuery }}”</span>
          相关的内容
        </p>
        <p v-else class="search-header__summary">请输入关键字，快速定位您想了解的信息。</p>
      </div>
    </template>

    <div class="search-content">
      <div v-if="pending" class="search-state">正在搜索，请稍候…</div>
      <div v-else-if="errorMessage" class="search-state search-state--error">
        {{ errorMessage }}
      </div>
      <div v-else-if="hasQuery && total === 0" class="search-state">
        未找到相关内容，换个关键词试试？
      </div>
      <template v-else>
        <ul class="search-results">
          <li v-for="item in items" :key="item.id" class="search-result">
            <NuxtLink :to="item.to" class="search-result__title">
              <span v-html="highlightText(item.title)"></span>
            </NuxtLink>
            <p class="search-result__meta">
              <span>{{ item.category }}</span>
              <span aria-hidden="true">|</span>
              <time>{{ item.date }}</time>
            </p>
            <p class="search-result__summary" v-html="highlightText(item.summary)"></p>
          </li>
        </ul>

        <nav v-if="showPagination" class="search-pagination" aria-label="搜索分页">
          <button
            class="search-pagination__btn"
            :disabled="currentPageValue === 1"
            @click="goToPage(currentPageValue - 1)"
          >
            上一页
          </button>
          <button
            v-for="number in paginationPages"
            :key="number"
            class="search-pagination__btn"
            :class="{ 'is-active': number === currentPageValue }"
            @click="goToPage(number)"
          >
            {{ number }}
          </button>
          <button
            class="search-pagination__btn"
            :disabled="currentPageValue === totalPages"
            @click="goToPage(currentPageValue + 1)"
          >
            下一页
          </button>
        </nav>
      </template>
    </div>
  </DynamicPage>
</template>

<script setup>
import { computed, watch } from 'vue';
import DynamicPage from '@/components/common/DynamicPage.vue';
import { contentPageLayouts } from '@/configs/contentPages';

const layout = contentPageLayouts.search;

const route = useRoute();
const router = useRouter();
const { $axios } = useNuxtApp();

const searchQuery = computed(() => (route.query.q ? String(route.query.q) : '').trim());
const hasQuery = computed(() => Boolean(searchQuery.value));

const currentPage = computed(() => {
  const value = Number(route.query.page ?? '1');
  return Number.isFinite(value) && value > 0 ? Math.floor(value) : 1;
});

const { data, pending, error } = await useAsyncData(
  'search-results',
  async () => {
    if (!searchQuery.value) {
      return { total: 0, page: 1, pageSize: 10, items: [] };
    }
    const { data } = await $axios.get('/api/search', {
      params: {
        q: searchQuery.value,
        page: currentPage.value,
      },
    });
    return data;
  },
  {
    watch: [searchQuery, currentPage],
  },
);

watch(searchQuery, (newValue, oldValue) => {
  if (newValue === oldValue) {
    return;
  }
  if (currentPage.value !== 1) {
    const query = { ...route.query, q: newValue || undefined };
    delete query.page;
    router.replace({ path: route.path, query });
  }
});

const results = computed(() => data.value ?? { total: 0, page: 1, pageSize: 10, items: [] });
const total = computed(() => results.value.total ?? 0);
const pageSize = computed(() => results.value.pageSize ?? 10);
const items = computed(() => results.value.items ?? []);

const totalPages = computed(() => {
  if (!hasQuery.value || total.value === 0) {
    return 1;
  }
  return Math.max(1, Math.ceil(total.value / pageSize.value));
});

const currentPageValue = computed(() => {
  return Math.min(Math.max(currentPage.value, 1), totalPages.value);
});

const showPagination = computed(() => hasQuery.value && total.value > pageSize.value);

const paginationPages = computed(() => {
  const totalPageCount = totalPages.value;
  const current = currentPageValue.value;
  const windowSize = 5;

  if (totalPageCount <= windowSize) {
    return Array.from({ length: totalPageCount }, (_, index) => index + 1);
  }

  let start = Math.max(1, current - 2);
  let end = Math.min(totalPageCount, start + windowSize - 1);
  if (end - start < windowSize - 1) {
    start = Math.max(1, end - windowSize + 1);
  }

  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
});

const errorMessage = computed(() =>
  error.value ? '搜索服务暂时不可用，请稍后再试。' : '',
);

const highlightRegex = computed(() => {
  if (!searchQuery.value) {
    return null;
  }
  const escaped = searchQuery.value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  try {
    return new RegExp(escaped, 'gi');
  } catch {
    return null;
  }
});

const highlightText = (text) => {
  if (!highlightRegex.value) {
    return text;
  }
  return text.replace(
    highlightRegex.value,
    (match) => `<span class="search-highlight">${match}</span>`,
  );
};

const goToPage = (targetPage) => {
  const safeTarget = Math.min(Math.max(targetPage, 1), totalPages.value);
  const query = {
    ...route.query,
    q: searchQuery.value || undefined,
    page: safeTarget === 1 ? undefined : String(safeTarget),
  };
  router.push({ path: route.path, query });
};

useHead(() => ({
  title: hasQuery.value
    ? `“${searchQuery.value}”的搜索结果_国家电投集团保险经纪有限公司`
    : '搜索_国家电投集团保险经纪有限公司',
}));
</script>

<style scoped lang="scss">
.search-header {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f0f0f0;

  &__title {
    font-size: 26px;
    font-weight: 600;
    color: #222;
  }

  &__summary {
    font-size: 16px;
    color: #555;

    strong {
      margin: 0 4px;
      color: #c60c1a;
    }
  }
}

.search-content {
  display: flex;
  flex-direction: column;
  gap: 28px;
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

.search-results {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.search-result {
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 24px;

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  &__title {
    font-size: 18px;
    color: #c60c1a;
    font-weight: 600;
    text-decoration: none;

    span {
      display: inline-block;
    }

    &:hover {
      text-decoration: underline;
    }
  }

  &__meta {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    color: #999;
  }

  &__summary {
    font-size: 15px;
    line-height: 1.8;
    color: #555;
    margin: 0;
  }
}

.search-pagination {
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;
  flex-wrap: wrap;

  &__btn {
    min-width: 48px;
    height: 36px;
    padding: 0 12px;
    border: 1px solid #dcdcdc;
    border-radius: 18px;
    background: #fff;
    color: #666;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover:not(:disabled) {
      border-color: #c60c1a;
      color: #c60c1a;
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    &.is-active {
      background: #c60c1a;
      color: #fff;
      border-color: #c60c1a;
    }
  }
}

.search-highlight {
  color: #c60c1a;
  font-weight: 600;
}
</style>
