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
    title: '集团公司统保业务',
    image: 'images/disclosure/list1.jpg',
    to: '/business-overview/groupBusiness',
    description: '聚焦集团统保项目，为能源、交通等核心产业提供一体化保险经纪与风险管理方案。',
  },
];

useHead({
  title: '集团公司统保业务_国家电投集团保险经纪有限公司',
});
</script>

<style scoped lang="scss">
.business-overview__grid {
  margin-top: 21px;
}
</style>
