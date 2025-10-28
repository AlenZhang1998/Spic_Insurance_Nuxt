<template>
  <DynamicPage v-bind="layout">
    <div class="announcement-page">
      <ArticleList
        :items="annualNewsItems"
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

const layout = contentPageLayouts.news;
const pageSize = 5;

const annualNewsEntries = [
  {
    id: '20220309-1',
    title: '2020年度保险经纪大事记',
    summary:
      '2020年，是保险经纪“442”三步走转型发展“开启年”。保险经纪围绕转型发展总体目标任务，着力开拓市场、实施稳健经营、深化体制机制、加强党的领导、抓好疫情防控，实现了公司“十三五”时期的圆满收官。公司编制发布《2020年度保险经纪大事记》，系统回顾年度关键举措与亮点成果。',
    date: '2021-03-20',
  },
];

const annualNewsItems = ref(annualNewsEntries);
const currentPage = ref(1);

const handlePageChange = (page) => {
  currentPage.value = page;
};

useHead({
  title: '年度新闻 - 国家电投集团保险经纪有限公司',
});
</script>

<style lang="scss">
.announcement-page {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
</style>
