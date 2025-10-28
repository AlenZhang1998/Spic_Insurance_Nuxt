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
    title: '重大专项及境外资产保险',
    image: 'images/disclosure/list2.jpg',
    to: '/business-overview/assetInsurance',
    description: '面向重大专项和境外资产，提供定制化保险配置与跨境服务，护航“一带一路”项目建设。',
  },
];

useHead({
  title: '重大专项及境外资产保险_国家电投集团保险经纪有限公司',
});
</script>

<style scoped lang="scss">
.business-overview__grid {
  margin-top: 21px;
}
</style>
