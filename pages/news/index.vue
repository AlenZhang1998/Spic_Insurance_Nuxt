<template>
  <DynamicPage v-bind="layout">
    <div class="content-page__rich-text">
      <p>
        及时发布公司要闻、专题活动及行业动态，展现保险经纪行业的专业能力与集团党建成果。
      </p>
    </div>
  </DynamicPage>
</template>

<script setup>
import DynamicPage from '~/components/common/DynamicPage.vue'
import { contentPageLayouts } from '~/configs/contentPages'

const layout = contentPageLayouts.news

useHead({
  title: '新闻中心 - 国家电投集团保险经纪有限公司',
})
</script>
