<template>
  <DynamicPage v-bind="layout">
    <div class="about-us">
      <strong class="title">
        <span>国家电投集团保险经纪有限公司简介</span>
      </strong>

      <p class="image-box">
        <img :src="overviewImage" alt="公司园区形象" width="600px" />
      </p>

      <div class="rich-text">
        <p>
          <span>
            国家电投集团保险经纪有限公司是国家电投集团资本控股有限公司的全资子公司，注册资本金1亿元，前身中电投保险经纪（北京）有限公司，成立于2007年12月26日 。2015年9月，原中电投保险经纪公司与国核保险经纪公司合并重组为国家电投集团保险经纪有限公司。
          </span>
        </p>
        <p>
          <span>
            作为国家电投系统内唯一的保险中介服务机构，公司始终秉承“产融结合、注重服务、立足集团、面向市场”的管理理念，坚持服务集团和幵拓市场二者并重，依托金融平台充分挖掘市场潜力，发挥电力能源风险管理的专业优势，为电力、煤炭、铝业等多个行业提供了保险经纪、风险咨询和产权经纪服务，是国内具备核电运营期保险安排经验仅有的三家公司之一，是国内海上风电全流程保险安排经验最丰富公司之一，是国内最大的光伏综合保险中介服务商。在全国496家保险经纪公司中，连续多年利润位列前10。自2011年起，连续10年担任北京保险中介行业协会副会长单位，2020年、2021年荣获北京产权交易所“最具影响力项目奖”。
          </span>
        </p>
      </div>
    </div>
  </DynamicPage>
</template>

<script setup>
import DynamicPage from '~/components/common/DynamicPage.vue'
import { contentPageLayouts } from '~/configs/contentPages'
import { resolveAssetPath } from '~/utils/assets'

const layout = contentPageLayouts.about
const overviewImage = resolveAssetPath('images/about/overview.jpg')

useHead({
  title: '企业概况_国家电投集团保险经纪有限公司',
})
</script>

<style scoped lang="scss">
.about-us{
  width: 100%;
  // background-color: pink;
  .title{
    margin-left: 16px;
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
    text-align: center;
    margin-bottom: 49px;
    img{
      max-width: 100%;
    }
  }
  .rich-text{
    p {
      text-align: justify;
      text-indent: 2em;
      line-height: 32px;
      color: #2F2F2F;
      font-size: 16px;
      margin-top: 2em;
      span{
        font-size: 16px;
        line-height: 2.5;
      }
    }
  }
}
</style>
