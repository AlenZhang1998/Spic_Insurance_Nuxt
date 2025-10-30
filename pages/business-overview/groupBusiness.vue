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
      <DetailView :detail="detail" :loading="loading" :error-message="errorMessage" />
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

const businessHighlights = [
  {
    title: '业务发展总览',
    image: 'images/disclosure/list1.jpg',
    slug: 'overview',
    description: '聚焦集团统保项目，为能源、交通等核心产业提供一体化保险经纪与风险管理方案。',
  },
];

const selectedItem = ref(null);
const detail = ref(null);
const loading = ref(false);
const errorMessage = ref('');

const handleSelect = async (item) => {
  console.log(42222222);
  if (!item || !item.slug) {
    return;
  }
  selectedItem.value = item;
  await fetchDetail(item.slug);
};

const fetchDetail = async (slug) => {
  loading.value = true;
  errorMessage.value = '';
  detail.value = null;

  try {
    // const { data } = await useNuxtApp().$axios.get(`/api/business/group/${slug}`);
    // detail.value = data;
    detail.value = {
      content: `
        <h2 style="color:#2b6cb0;">这些都是 富文本 测试数据</h2>
        <p>欢迎使用 <strong>测试数据</strong> hello, 这里展示了一段测试富文本内容。</p>
        <p>测试数据测试数据</p>

        <img src="https://picsum.photos/600/200" alt="测试图片">

        <ul>
          <li>测试数据测试数据测试数据</li>
          <li>测试数据测试数据测试数据</li>
          <li>测试数据测试数据测试数据</li>
        </ul>
        <ul>
          <li>测试数据测试数据测试数据</li>
          <li>测试数据测试数据测试数据</li>
          <li>测试数据测试数据测试数据</li>
        </ul>
        <ul>
          <li>测试数据测试数据测试数据</li>
          <li>测试数据测试数据测试数据</li>
          <li>测试数据测试数据测试数据</li>
        </ul>

        <p>更多功能请访问
          <a href="https://baidu.com" target="_blank" style="color:#3182ce;">测试数据</a>。
        </p>
      `,
    };
  } catch (err) {
    console.error('加载业务详情失败：', err);
    errorMessage.value = '暂时无法获取业务详情，请稍后重试。';
  } finally {
    loading.value = false;
  }
};

const headTitle = computed(() => {
  // if (selectedItem.value && detail.value?.title) {
  //   return `${detail.value.title}_国家电投集团保险经纪有限公司`;
  // }
  return '集团公司统保业务_国家电投集团保险经纪有限公司';
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
