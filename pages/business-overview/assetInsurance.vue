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
import DynamicPage from '@/components/common/DynamicPage.vue';
import FeatureGrid from '@/components/common/FeatureGrid.vue';
import DetailView from '@/components/common/DetailView.vue';

import { contentPageLayouts } from '@/configs/contentPages';

const layout = contentPageLayouts.businessOverview;

const businessHighlights = [
  {
    title: '重大专项及境外资产保险',
    image: 'images/disclosure/list2.jpg',
    id: 'overview',
    description: '面向重大专项和境外资产，提供定制化保险配置与跨境服务，护航“一带一路”项目建设。',
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

const fetchDetail = async (id) => {
  loading.value = true;
  errorMessage.value = '';
  detail.value = null;

  try {
    // const { data } = await useNuxtApp().$axios.get(`/api/business/fakeData/${id}`);
    // detail.value = data;
    detail.value = {
      content: `
        <h2 style="color:#2b6cb0;">这些都是 富文本 测试数据</h2>
        <p>欢迎使用 <strong>测试数据</strong> hello, 这里展示了一段测试富文本内容�?/p>
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

        <p>更多功能请访�?
          <a href="https://baidu.com" target="_blank" style="color:#3182ce;">测试数据</a>�?
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

useHead({
  title: '重大专项及境外资产保险_国家电投集团保险经纪有限公司',
});
</script>

<style scoped lang="scss">
.business-overview__grid {
  margin-top: 21px;
}
</style>
