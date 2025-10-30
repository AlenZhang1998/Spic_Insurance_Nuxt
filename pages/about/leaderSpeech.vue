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
const leaderImage1 = resolveAssetPath('images/about/leader1.jpg');
const leaderImage2 = resolveAssetPath('images/about/leader2.jpg');
const { $axios } = useNuxtApp();

const { data, pending, error } = await useAsyncData('leader-speech-detail', async () => {
  const { data: response } = await $axios.get('/api/about/leader-speech');
  if (!response) {
    return null;
  }

  if (response.content) {
    return {
      ...response,
      content: response.content
        .replace(/{{\s*leaderImage1\s*}}/g, leaderImage1)
        .replace(/{{\s*leaderImage2\s*}}/g, leaderImage2),
    };
  }

  return response;
});

const detail = computed(() => data.value);
const errorMessage = computed(() => (error.value ? '暂时无法获取领导寄语，请稍后重试。' : ''));

useHead({
  title: '领导致词_国家电投集团保险经纪有限公司',
});
</script>
