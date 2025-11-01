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
import { ref, computed, watchEffect } from 'vue';
import DynamicPage from '@/components/common/DynamicPage.vue';
import ArticleList from '@/components/common/ArticleList.vue';
import DetailView from '@/components/common/DetailView.vue';
import { contentPageLayouts } from '@/configs/contentPages';

const layout = contentPageLayouts.disclosure;
const pageSize = 10;
const { $axios } = useNuxtApp();

const { data: disclosureData, error: disclosureError } = await useAsyncData(
  'disclosure-list',
  async () => {
    const { data } = await $axios.get('/api/disclosure');
    return data?.items ?? [];
  },
);

watchEffect(() => {
  if (disclosureError.value) {
    console.error('加载信息披露列表失败：', disclosureError.value);
  }
});

const disclosureItems = computed(() => disclosureData.value ?? []);
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
  if (!item || !item.id) {
    return;
  }
  selectedDisclosure.value = item;
  await fetchDetail(item.id);
};

const resetDetail = () => {
  selectedDisclosure.value = null;
  disclosureDetail.value = null;
  errorMessage.value = '';
};

const fetchDetail = async (id) => {
  loading.value = true;
  errorMessage.value = '';
  disclosureDetail.value = null;

  try {
    const { data } = await $axios.get(`/api/disclosure/${id}`);
    disclosureDetail.value = data;
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
