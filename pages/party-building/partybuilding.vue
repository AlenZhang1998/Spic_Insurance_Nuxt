<template>
  <DynamicPage v-bind="layout">
    <template v-if="!selectedArticle">
      <div class="announcement-page">
        <ArticleList
          :items="partyBuildingItems"
          :page-size="pageSize"
          :initial-page="currentPage"
          @page-change="handlePageChange"
          @select="handleSelect"
        />
      </div>
    </template>

    <template v-else>
      <DetailView
        :detail="articleDetail"
        :loading="loading"
        :error-message="errorMessage"
        @back="resetDetail"
        class="party-building-detail"
      />
    </template>
  </DynamicPage>
</template>

<script setup>
import { ref, computed } from 'vue';
import DynamicPage from '@/components/common/DynamicPage.vue';
import ArticleList from '@/components/common/ArticleList.vue';
import DetailView from '@/components/common/DetailView.vue';
import { contentPageLayouts } from '@/configs/contentPages';

const layout = contentPageLayouts.partyBuilding;
const pageSize = 10;

const partyBuildingEntries = [
  {
    id: '20220321',
    slug: 'pb-20220321',
    title: '保险经纪党支部召开2021年度组织生活会和民主评议党员工作',
    summary:
      '根据集团公司党委和资本控股党委的部署安排，前期充分学习讨论、广泛征求意见、深入谈心谈话，3月14日至17日，保险经纪党支部先后召开2021年度组织生活会。',
    date: '2022-03-21',
  },
  {
    id: '20220126',
    slug: 'pb-20220126',
    title: '保险经纪召开党史学习教育专题民主生活会',
    summary:
      '根据集团公司党委、资本控股党委部署要求，1月24日保险经纪召开党史学习教育专题民主生活会，党委领导班子成员逐一检视问题，深入开展批评与自我批评。',
    date: '2022-01-26',
  },
  {
    id: '20211230-1',
    slug: 'pb-20211230-1',
    title: '中央纪委国家监委公开通报十起违反中央八项规定精神典型问题',
    summary:
      '日前，中央纪委国家监委对10起违反中央八项规定精神典型问题进行公开通报，现予以转发。广大党员干部要引以为戒，持续纠“四风”树新风。',
    date: '2021-12-30',
  },
  {
    id: '20211230-2',
    slug: 'pb-20211230-2',
    title: '保险经纪关于持之以恒正风肃纪确保元旦春节廉洁过节的通知',
    summary:
      '保险经纪关于持之以恒正风肃纪确保元旦春节廉洁过节的通知，公司各部门要严格执行中央八项规定精神，坚守廉洁底线，营造风清气正的节日氛围。',
    date: '2021-12-30',
  },
  {
    id: '20211230-3',
    slug: 'pb-20211230-3',
    title: '中央纪委印发《关于做好2022年元旦春节期间正风肃纪工作的通知》',
    summary:
      '近日，中央纪委办公厅印发《关于做好2022年元旦春节期间正风肃纪工作的通知》，要求各级党组织深刻把握节日期间廉洁风险，加强监督执纪。',
    date: '2021-12-30',
  },
  {
    id: '20211223',
    slug: 'pb-20211223',
    title: '保险经纪党支部组织开展“3060”双碳目标专题党课',
    summary:
      '为增强全体党员对公司落实“3060”双碳目标的了解，党支部举办专题党课，深入学习“2035”远景目标和“双碳”战略部署。',
    date: '2021-12-23',
  },
];

const partyBuildingItems = ref(partyBuildingEntries);
const currentPage = ref(1);
const selectedArticle = ref(null);
const articleDetail = ref(null);
const loading = ref(false);
const errorMessage = ref('');

const handlePageChange = (page) => {
  currentPage.value = page;
  resetDetail();
};

const handleSelect = async (item) => {
  if (!item || !item.slug) {
    return;
  }
  selectedArticle.value = item;
  await fetchDetail(item.slug);
};

const resetDetail = () => {
  selectedArticle.value = null;
  articleDetail.value = null;
  errorMessage.value = '';
};

const fetchDetail = async (slug) => {
  loading.value = true;
  errorMessage.value = '';
  articleDetail.value = null;

  try {
    articleDetail.value = await $fetch(`/api/party-building/general/${slug}`);
  } catch (err) {
    console.error('加载党建信息失败：', err);
    errorMessage.value = '暂时无法获取详情，请稍后重试。';
  } finally {
    loading.value = false;
  }
};

const pageTitle = computed(() => {
  // if (selectedArticle.value && articleDetail.value?.title) {
  //   return `${articleDetail.value.title}_国家电投集团保险经纪有限公司`;
  // }
  return '党的建设_国家电投集团保险经纪有限公司';
});

useHead(() => ({
  title: pageTitle.value,
}));
</script>

<style lang="scss">
.announcement-page {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
</style>
