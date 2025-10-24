<template>
  <DynamicPage v-bind="layout">
    <div class="content-page__rich-text">
      <p>
        聚焦党建引领，推进党的建设与经营发展深度融合，持续巩固基层组织战斗堡垒作用。
      </p>
    </div>
  </DynamicPage>
</template>

<script setup>
import DynamicPage from '~/components/common/DynamicPage.vue'
import { contentPageLayouts } from '~/configs/contentPages'

const layout = contentPageLayouts.partyBuilding

useHead({
  title: '党的建设 - 国家电投集团保险经纪有限公司',
})
</script>
