<template>
  <DynamicPage v-bind="layout">
    <div class="content-page__rich-text">
      <p>
        围绕能源与大型基础设施客户，提供保险经纪、风险管理、资产配置等综合解决方案，全流程护航项目建设与运营。
      </p>
    </div>
  </DynamicPage>
</template>

<script setup>
import DynamicPage from '@/components/common/DynamicPage.vue'
import { contentPageLayouts } from '@/configs/contentPages'

const layout = contentPageLayouts.businessOverview

useHead({
  title: '业务概览 - 国家电投集团保险经纪有限公司',
})
</script>
