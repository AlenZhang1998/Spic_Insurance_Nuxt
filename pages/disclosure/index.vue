<template>
  <DynamicPage v-bind="layout">
    <div class="announcement-page">
      <ArticleList
        :items="disclosureItems"
        :page-size="pageSize"
        :initial-page="currentPage"
        @page-change="handlePageChange"
      />
    </div>
  </DynamicPage>
</template>

<script setup>
import { ref } from 'vue';
import DynamicPage from '@/components/common/DynamicPage.vue';
import ArticleList from '@/components/common/ArticleList.vue';
import { contentPageLayouts } from '@/configs/contentPages';

const layout = contentPageLayouts.disclosure;
const pageSize = 10;

const disclosureEntries = [
  {
    id: '20201204',
    title: '信息披露',
    summary:
      '公司基本信息 经营保险经纪业务许可证：营业执照：经营互联网保险业务的手机移动端信息 微信名称：融和e保 互联网保险产品信息（随产品的推出进行更新）客服热线：010-86625600。',
    date: '2020-12-04',
  },
];

const disclosureItems = ref(disclosureEntries);
const currentPage = ref(1);

const handlePageChange = (page) => {
  currentPage.value = page;
};

useHead({
  title: '信息披露 - 国家电投集团保险经纪有限公司',
});
</script>

<style lang="scss">
.announcement-page {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
</style>
