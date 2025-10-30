<template>
  <DynamicPage v-bind="layout">
    <DetailView
      :detail="detail"
      :loading="pending"
      :error-message="errorMessage"
      class="contact-detail-view"
    />
  </DynamicPage>
</template>

<script setup>
import DetailView from '@/components/common/DetailView.vue';
import DynamicPage from '@/components/common/DynamicPage.vue';
import { contentPageLayouts } from '@/configs/contentPages';

const layout = contentPageLayouts.contact;

const { data, pending, error } = await useAsyncData('contact-detail', async () => {
  const response = await $fetch('/api/contact');
  return response || null;
});

const detail = computed(() => data.value);
const errorMessage = computed(() =>
  error.value ? '暂时无法获取联系方式，请稍后重试。' : ''
);

useHead({
  title: '联系我们_国家电投集团保险经纪有限公司',
});
</script>
