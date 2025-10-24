<template>
  <DynamicPage v-bind="layout">
    <div class="content-page__rich-text">
      <p>
        依照监管要求对公司治理、财务数据、纪检监督情况进行公开，持续提高透明度与合规水平。
      </p>
    </div>
  </DynamicPage>
</template>

<script setup>
import DynamicPage from '~/components/common/DynamicPage.vue'
import { contentPageLayouts } from '~/configs/contentPages'

const layout = contentPageLayouts.disclosure

useHead({
  title: '信息披露 - 国家电投集团保险经纪有限公司',
})
</script>
