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
      <article class="business-detail">
        <!-- <header class="business-detail__header">
          <button type="button" class="business-detail__back" @click="resetDetail">返回列表</button>
          <h1 class="business-detail__title">{{ detail?.title || selectedItem.title }}</h1>
          <div v-if="detail" class="business-detail__meta">
            <span>作者：{{ detail.author }}</span>
            <span>发布时间：{{ detail.publishedAt }}</span>
          </div>
        </header> -->

        <section v-if="loading" class="business-detail__state">内容加载中…</section>
        <section
          v-else-if="errorMessage"
          class="business-detail__state business-detail__state--error"
        >
          {{ errorMessage }}
        </section>
        <section v-else class="business-detail__content" v-html="detail?.content || ''"></section>
      </article>
    </template>
  </DynamicPage>
</template>

<script setup>
// import { ref, computed } from 'vue';
import DynamicPage from '@/components/common/DynamicPage.vue';
import FeatureGrid from '@/components/common/FeatureGrid.vue';
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
  if (!item || !item.slug) {
    return;
  }
  selectedItem.value = item;
  await fetchDetail(item.slug);
};

// const resetDetail = () => {
//   selectedItem.value = null;
//   detail.value = null;
//   errorMessage.value = '';
// };

const fetchDetail = async (slug) => {
  loading.value = true;
  errorMessage.value = '';
  detail.value = null;

  try {
    // detail.value = await $fetch(`/api/business/group/${slug}`);

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
  if (selectedItem.value && detail.value?.title) {
    return `${detail.value.title}_国家电投集团保险经纪有限公司`;
  }
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

.business-detail {
  display: flex;
  flex-direction: column;
  gap: 24px;
  color: #2f2f2f;
  line-height: 1.8;

  // .business-detail__header {
  //   border-bottom: 1px solid #eee;
  //   padding-bottom: 16px;
  //   display: flex;
  //   flex-direction: column;
  //   gap: 12px;
  // }

  // .business-detail__back {
  //   align-self: flex-start;
  //   border: 1px solid #f2852f;
  //   background: transparent;
  //   color: #f2852f;
  //   font-size: 14px;
  //   padding: 4px 12px;
  //   border-radius: 4px;
  //   cursor: pointer;
  //   transition: all 0.2s ease;
  // }

  // .business-detail__back:hover {
  //   background-color: rgba(242, 133, 47, 0.08);
  // }

  // .business-detail__title {
  //   margin: 0;
  //   font-size: 28px;
  //   font-weight: 700;
  // }

  // .business-detail__meta {
  //   display: flex;
  //   flex-wrap: wrap;
  //   gap: 16px;
  //   font-size: 14px;
  //   color: #888;
  // }

  .business-detail__state {
    text-align: center;
    color: #999;
    padding: 40px 0;
  }

  .business-detail__state--error {
    color: #c60c1a;
  }

  .business-detail__content :global(img) {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 16px auto;
  }

  .business-detail__content :global(p) {
    margin: 12px 0;
  }
}
</style>
