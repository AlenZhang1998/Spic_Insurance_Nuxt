<template>
  <DynamicPage v-bind="layout">
    <div class="content-page__rich-text">
      <p>
        融和e保数字平台集成线上询价、保单管理、风险画像等功能，实现保险经纪服务的数字化、智能化和可视化。
      </p>
    </div>
  </DynamicPage>
</template>

<script setup>
import DynamicPage from '~/components/common/DynamicPage.vue'
import { contentPageLayouts } from '~/configs/contentPages'

const layout = contentPageLayouts.integratedServices

useHead({
  title: '融和e保 - 国家电投集团保险经纪有限公司',
})
</script>
