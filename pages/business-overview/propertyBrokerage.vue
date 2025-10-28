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
    title: '产权经纪业务',
    image: 'images/disclosure/list4.jpg',
    to: '/business-overview/propertyBrokerage',
    description: '为企业资产重组、股权交易提供经纪服务，助力多元化经营与价值提升。',
  },
];

useHead({
  title: '产权经纪业务_国家电投集团保险经纪有限公司',
});
</script>

<style scoped lang="scss">
.business-overview__grid {
  margin-top: 21px;
}
</style>
