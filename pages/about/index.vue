<template>
  <DynamicPage v-bind="layout">
    <DetailView
      :detail="detail"
      :loading="pending"
      :error-message="errorMessage"
      class="about-detail-view"
    />
  </DynamicPage>
</template>

<script setup>
import DetailView from '@/components/common/DetailView.vue';
import DynamicPage from '@/components/common/DynamicPage.vue';
import { contentPageLayouts } from '@/configs/contentPages';
import { resolveAssetPath } from '@/utils/assets';

const layout = contentPageLayouts.about;
const overviewImage = resolveAssetPath('images/about/overview.jpg');

const { data, pending, error } = await useAsyncData('about-detail', async () => {
  const response = await $fetch('/api/about');
  if (!response) {
    return null;
  }

  if (response.content) {
    return {
      ...response,
      content: response.content.replace(/{{\s*overviewImage\s*}}/g, overviewImage),
    };
  }

  return response;
});

const detail = computed(() => data.value);
const errorMessage = computed(() => (error.value ? '暂时无法获取公司简介，请稍后重试。' : ''));

useHead({
  title: '关于我们_国家电投集团保险经纪有限公司',
});
</script>
