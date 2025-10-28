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
  {
    title: '重大专项及境外资产保险',
    image: 'images/disclosure/list2.jpg',
    to: '/business-overview/assetInsurance',
    description: '面向重大专项和境外资产，提供定制化保险配置与跨境服务，护航“一带一路”项目建设。',
  },
  {
    title: '创新业务',
    image: 'images/disclosure/list3.jpg',
    to: '/business-overview/innovativeBusiness',
    description: '探索数字科技、绿色保险等新兴业务模式，打造保险经纪创新生态。',
  },
  {
    title: '产权经纪业务',
    image: 'images/disclosure/list4.jpg',
    to: '/business-overview/propertyBrokerage',
    description: '为企业资产重组、股权交易提供经纪服务，助力多元化经营与价值提升。',
  },
];

useHead({
  title: '业务概览_国家电投集团保险经纪有限公司',
});
</script>

<style scoped lang="scss">
.business-overview__grid {
  margin-top: 21px;
}
</style>
