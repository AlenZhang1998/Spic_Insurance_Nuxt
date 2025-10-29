<template>
  <DynamicPage v-bind="layout">
    <template v-if="!selectedItem">
      <FeatureGrid
        :items="businessHighlights"
        :columns="4"
        class="business-overview__grid"
        @select="handleSelect"
      />
    </template>

    <template v-else>
      <DetailView
        :detail="detail"
        :loading="loading"
        :error-message="errorMessage"
        @back="resetDetail"
      />
    </template>
  </DynamicPage>
</template>

<script setup>
import { ref, computed } from 'vue';
import DynamicPage from '@/components/common/DynamicPage.vue';
import FeatureGrid from '@/components/common/FeatureGrid.vue';
import DetailView from '@/components/common/DetailView.vue';
import { contentPageLayouts } from '@/configs/contentPages';

const layout = contentPageLayouts.businessOverview;

const businessHighlights = [
  {
    title: '创新业务概览',
    image: 'images/disclosure/list3.jpg',
    slug: 'overview',
    description: '探索数字科技、绿色保险等新兴业务模式，打造保险经纪创新生态。',
  },
];

const selectedItem = ref(null);
const detail = ref(null);
const loading = ref(false);
const errorMessage = ref('');

const handleSelect = async (item) => {
  if (!item || !item.slug) {
    return;
  }
  selectedItem.value = item;
  await fetchDetail(item.slug);
};

const resetDetail = () => {
  selectedItem.value = null;
  detail.value = null;
  errorMessage.value = '';
};

const fetchDetail = async (slug) => {
  loading.value = true;
  errorMessage.value = '';
  detail.value = null;

  try {
    detail.value = await $fetch(`/api/business/fakeData/${slug}`);
  } catch (err) {
    console.error('加载业务详情失败：', err);
    errorMessage.value = '暂时无法获取业务详情，请稍后重试。';
  } finally {
    loading.value = false;
  }
};

const headTitle = computed(() => {
  if (selectedItem.value && detail.value?.title) {
    return `${detail.value.title}_国家电投集团保险经纪有限公司`;
  }
  return '创新业务_国家电投集团保险经纪有限公司';
});

useHead(() => ({
  title: headTitle.value,
}));
</script>

<style scoped lang="scss">
.business-overview__grid {
  margin-top: 21px;
}
</style>
