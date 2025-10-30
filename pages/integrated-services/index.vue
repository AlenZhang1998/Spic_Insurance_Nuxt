<template>
  <DynamicPage v-bind="layout">
    <DetailView
      :detail="detail"
      :loading="pending"
      :error-message="errorMessage"
      class="integrated-services-detail-view"
    />
  </DynamicPage>
</template>

<script setup>
import DetailView from '@/components/common/DetailView.vue';
import DynamicPage from '@/components/common/DynamicPage.vue';
import { contentPageLayouts } from '@/configs/contentPages';
import { resolveAssetPath } from '@/utils/assets';

const layout = contentPageLayouts.integratedServices;
const qrImage = resolveAssetPath('images/integratedServices/qr.jpg');
const spicImage = resolveAssetPath('images/integratedServices/spic.png');

const fileModules = import.meta.glob('@/assets/files/*', { eager: true, import: 'default' });
const guideDoc =
  Object.values(fileModules).find((u) => typeof u === 'string' && /\.docx?$/i.test(u)) || '';
const guideDocHref = guideDoc || '#';

const { data, pending, error } = await useAsyncData('integrated-services-detail', async () => {
  const response = await $fetch('/api/integrated-services');
  if (!response) {
    return null;
  }

  if (response.content) {
    return {
      ...response,
      content: response.content
        .replace(/{{\s*qrImage\s*}}/g, qrImage)
        .replace(/{{\s*spicImage\s*}}/g, spicImage)
        .replace(/{{\s*guideDoc\s*}}/g, guideDocHref),
    };
  }

  return response;
});

const detail = computed(() => data.value);
const errorMessage = computed(() =>
  error.value ? '暂时无法获取融和e保信息，请稍后重试。' : ''
);

useHead({
  title: '融和e保_国家电投集团保险经纪有限公司',
});
</script>
