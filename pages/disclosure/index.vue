<template>
  <DynamicPage v-bind="layout">
    <template v-if="!selectedDisclosure">
      <div class="announcement-page">
        <ArticleList
          :items="disclosureItems"
          :page-size="pageSize"
          :initial-page="currentPage"
          @page-change="handlePageChange"
          @select="handleSelect"
        />
      </div>
    </template>

    <template v-else>
      <DetailView
        :detail="disclosureDetail"
        :loading="loading"
        :error-message="errorMessage"
        @back="resetDetail"
        class="disclosure-detail"
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

const layout = contentPageLayouts.disclosure;
const pageSize = 10;

const disclosureEntries = [
  {
    id: '20201204',
    slug: 'd-20201204',
    title: '信息披露',
    summary:
      '公司基本信息 经营保险经纪业务许可证：营业执照：经营互联网保险业务的手机移动端信息 微信名称：融和e保 互联网保险产品信息（随产品的推出进行更新）客服热线：010-86625600。',
    date: '2020-12-04',
  },
];

const disclosureItems = ref(disclosureEntries);
const currentPage = ref(1);
const selectedDisclosure = ref(null);
const disclosureDetail = ref(null);
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
  selectedDisclosure.value = item;
  await fetchDetail(item.slug);
};

const resetDetail = () => {
  selectedDisclosure.value = null;
  disclosureDetail.value = null;
  errorMessage.value = '';
};

const fetchDetail = async (slug) => {
  loading.value = true;
  errorMessage.value = '';
  disclosureDetail.value = null;

  try {
    disclosureDetail.value = await $fetch(`/api/disclosure/${slug}`);
  } catch (err) {
    console.error('加载信息披露详情失败：', err);
    errorMessage.value = '暂时无法获取详情，请稍后重试。';
  } finally {
    loading.value = false;
  }
};

const pageTitle = computed(() => {
  // if (selectedDisclosure.value && disclosureDetail.value?.title) {
  //   return `${disclosureDetail.value.title}_国家电投集团保险经纪有限公司`;
  // }
  return '信息披露_国家电投集团保险经纪有限公司';
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
