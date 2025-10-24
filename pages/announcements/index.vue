<template>
  <DynamicPage v-bind="layout">
    <div class="content-page__rich-text">
      <p>
        及时对外发布采购、招标、任职等公告信息，保障社会监督，营造公开透明的经营环境。
      </p>
    </div>
  </DynamicPage>
</template>

<script setup>
import DynamicPage from '~/components/common/DynamicPage.vue'
import { contentPageLayouts } from '~/configs/contentPages'

const layout = contentPageLayouts.announcements

useHead({
  title: '公示公告 - 国家电投集团保险经纪有限公司',
})
</script>
