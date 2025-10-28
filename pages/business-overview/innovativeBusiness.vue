<template>
  <DynamicPage v-bind="layout">
    <FeatureGrid :items="businessHighlights" :columns="4" class="business-overview__grid" />
  </DynamicPage>
</template>

<script setup>
import DynamicPage from '@/components/common/DynamicPage.vue';
import FeatureGrid from '@/components/common/FeatureGrid.vue';
import { contentPageLayouts } from '@/configs/contentPages';

const layout = contentPageLayouts.businessOverview;

const businessHighlights = [
  {
    title: '创新业务',
    image: 'images/disclosure/list3.jpg',
    to: '/business-overview/innovativeBusiness',
    description: '探索数字科技、绿色保险等新兴业务模式，打造保险经纪创新生态。',
  },
];

useHead({
  title: '创新业务_国家电投集团保险经纪有限公司',
});
</script>

<style scoped lang="scss">
.business-overview__grid {
  margin-top: 21px;
}
</style>
