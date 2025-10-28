<template>
  <DynamicPage v-bind="layout">
    <div class="announcement-page">
      <ArticleList
        :items="cleanGovernanceItems"
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

const layout = contentPageLayouts.partyBuilding;
const pageSize = 10;

const cleanGovernanceEntries = [
  {
    id: '20211230-1',
    title: '中央纪委国家监委公开通报十起违反中央八项规定精神典型问题',
    summary:
      '日前，中央纪委国家监委对10起违反中央八项规定精神典型问题进行了公开通报，现予以转发，提醒各级党组织以案为鉴，严守纪律红线。',
    date: '2021-12-30',
  },
  {
    id: '20211230-2',
    title: '保险经纪关于持之以恒正风肃纪确保元旦春节廉洁过节的通知',
    summary:
      '根据公司党风廉政建设要求，2022年元旦、春节将至，公司印发通知，持续加固廉洁过节防线，切实守好纪律规矩。',
    date: '2021-12-30',
  },
  {
    id: '20211230-3',
    title: '中央纪委印发《关于做好2022年元旦春节期间正风肃纪工作的通知》',
    summary:
      '中央纪委办公厅印发《关于做好2022年元旦春节期间正风肃纪工作的通知》，全党上下要深入贯彻中央八项规定精神，严防“四风”问题反弹。',
    date: '2021-12-30',
  },
  {
    id: '20211209-1',
    title: '国家电力投资集团公司落实中央八项规定精神 加强作风建设“5条禁令、30个禁忌”',
    summary:
      '集团公司围绕中央八项规定精神，进一步细化落实“5条禁令、30个禁忌”，严禁违规宴请、收送礼品礼金等行为，持续强化作风建设。',
    date: '2021-12-09',
  },
  {
    id: '20211209-2',
    title: '中国共产党纪律处分条例',
    summary:
      '《中国共产党纪律处分条例》是全面从严治党的重要法规，涵盖政治纪律、组织纪律、廉洁纪律、群众纪律、工作纪律、生活纪律六大方面内容。',
    date: '2021-12-09',
  },
  {
    id: '20211209-3',
    title: '关于新形势下党内政治生活的若干准则',
    summary:
      '《关于新形势下党内政治生活的若干准则》强调严肃党内政治生活，加强党内监督，保障党员领导干部廉洁从政、干净担当。',
    date: '2021-12-09',
  },
  {
    id: '20211209-4',
    title: '中国共产党廉洁自律准则',
    summary:
      '《中国共产党廉洁自律准则》从党员和党员领导干部两个层面提出新时代廉洁自律的基本规范，是加强党风廉政建设的重要制度。',
    date: '2021-12-09',
  },
];

const cleanGovernanceItems = ref(cleanGovernanceEntries);
const currentPage = ref(1);

const handlePageChange = (page) => {
  currentPage.value = page;
};

useHead({
  title: '党风廉政_国家电投集团保险经纪有限公司',
});
</script>

<style lang="scss">
.announcement-page {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
</style>
