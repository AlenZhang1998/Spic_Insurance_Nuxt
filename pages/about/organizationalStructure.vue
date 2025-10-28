<template>
  <DynamicPage v-bind="layout">
    <div class="about-us">
      <strong class="title">
        <span>国家电投集团保险经纪有限公司组织结构</span>
      </strong>

      <p class="image-box">
        <img :src="structureImage" alt="组织结构" />
      </p>
    </div>
  </DynamicPage>
</template>

<script setup>
import DynamicPage from '@/components/common/DynamicPage.vue'
import { contentPageLayouts } from '@/configs/contentPages'
import { resolveAssetPath } from '@/utils/assets'

const layout = contentPageLayouts.about
const structureImage = resolveAssetPath('images/about/structure.png')

useHead({
  title: '企业概况_国家电投集团保险经纪有限公司',
})
</script>

<style scoped lang="scss">
.about-us{
  width: 100%;
  // background-color: pink;
  .title{
    // margin-left: 16px;
    padding: 7px 0 14px 0;
    font-size: 32px;
    color: #000000;
    text-align: center;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .image-box{
    margin: 0;
    text-align: center;
    // margin-bottom: 49px;
    img{
      max-width: 100%;
    }
  }
}
</style>
