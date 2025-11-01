<template>
  <DynamicPage v-bind="layout">
    <template v-if="!selectedItem">
      <FeatureGrid
        :items="businessHighlights"
        :columns="4"
        class="business-overview__grid"
        @select="handleSelect"
      />
    </template>

    <template v-else>
      <DetailView
        :detail="detail"
        :loading="loading"
        :error-message="errorMessage"
        @back="resetDetail"
      />
    </template>
  </DynamicPage>
</template>

<script setup>
import { ref, computed } from 'vue';
import DynamicPage from '@/components/common/DynamicPage.vue';
import FeatureGrid from '@/components/common/FeatureGrid.vue';
import DetailView from '@/components/common/DetailView.vue';
import { contentPageLayouts } from '@/configs/contentPages';

const layout = contentPageLayouts.businessOverview;
const { $axios } = useNuxtApp();

const businessHighlights = [
  {
    title: '产权经纪业务',
    image: 'images/disclosure/list4.jpg',
    id: 'overview',
    description: '为企业资产重组、股权交易提供经纪服务，助力多元化经营与价值提升。',
  },
];

const selectedItem = ref(null);
const detail = ref(null);
const loading = ref(false);
const errorMessage = ref('');

const handleSelect = async (item) => {
  if (!item || !item.id) {
    return;
  }
  selectedItem.value = item;
  await fetchDetail(item.id);
};

const resetDetail = () => {
  selectedItem.value = null;
  detail.value = null;
  errorMessage.value = '';
};

const fetchDetail = async (id) => {
  loading.value = true;
  errorMessage.value = '';
  detail.value = null;

  try {
    const { data } = await $axios.get(`/api/business/fakeData/${id}`);
    detail.value = data;
  } catch (err) {
    console.error('加载业务详情失败：', err);
    errorMessage.value = '暂时无法获取业务详情，请稍后重试。';
  } finally {
    loading.value = false;
  }
};

const headTitle = computed(() => {
  if (selectedItem.value && detail.value?.title) {
    return `${detail.value.title}_国家电投集团保险经纪有限公司`;
  }
  return '产权经纪业务_国家电投集团保险经纪有限公司';
});

useHead(() => ({
  title: headTitle.value,
}));
</script>

<style scoped lang="scss">
.business-overview__grid {
  margin-top: 21px;
}
</style>
