<template>
  <DynamicPage v-bind="layout" :breadcrumb-tail="breadcrumbTail"> </DynamicPage>
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
const breadcrumbTail = computed(() => (searchQuery.value ? `${searchQuery.value}` : ''));

useHead(() => ({
  title: hasQuery.value
    ? `${searchQuery.value}_国家电投集团保险经纪有限公司`
    : '_国家电投集团保险经纪有限公司',
}));
</script>

<style scoped lang="scss">
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
