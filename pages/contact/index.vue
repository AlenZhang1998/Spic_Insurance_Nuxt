<template>
  <DynamicPage v-bind="layout">
    <div class="content-page__rich-text">
      <p>
        欢迎通过电话、电子邮箱或在线留言与我们取得联系，我们将尽快为您提供专业、全面的服务支持。
      </p>
    </div>
  </DynamicPage>
</template>

<script setup>
import DynamicPage from '~/components/common/DynamicPage.vue'
import { contentPageLayouts } from '~/configs/contentPages'

const layout = contentPageLayouts.contact

useHead({
  title: '联系我们 - 国家电投集团保险经纪有限公司',
})
</script>
