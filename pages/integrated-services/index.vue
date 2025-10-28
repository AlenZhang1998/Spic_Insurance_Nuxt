<template>
  <DynamicPage v-bind="layout">
    <div class="integrated-services">
      <strong class="title">
        <span>保险经纪“融和e保”</span>
      </strong>
      <p class="author"><span>作者：融和e保 发布日期：2021-09-30</span></p>

      <div class="rich-text">
        <p>
          <span>
            国家电投集团保险经纪有限公司（简称“保险经纪”）是资本控股的全资子公司，注册资本金10000万元。
          </span>
        </p>
        <p>
          <span>
            “融和e保”平台是由保险经纪自主开发建设的集团公司互联网保险服务平台，保险经纪于2019年首批获得银保监会核准的互联网保险业务经营资质，同年12月27日“融和e保”平台正式上线运行。
          </span>
        </p>

        <p class="image-box">
          <img :src="qrImage" alt="鍏徃鍥尯褰㈣薄" width="600px" />
        </p>

        <p>
          <span>
            “融和e保”互联网平台的定位是公司科技赋能的战略支撑。持续完善互联网保险服务平台建设，运用科技手段提供特色增值服务，打造一站式保险服务综合服务平台。使“融和e保”平台为集团内职工及其他个人用户，提供专业的保险规划、产品优选、索赔支持等经纪服务。
          </span>
        </p>

        <p>
          <span>
            目前融和e保”已经与主流保险公司签署合作协议，产品近百个，包括抗疫产品2个，精选了各类保障全面、价格实惠、服务优秀的健康险、意健险和家财险保险产品，为集团公司14万员工提供专属、贴心、增值的保险保障服务。
          </span>
        </p>

        <p>
          <span>
            近期，保险经纪牵头向平安财险定制的首款国家电投集团员工专属“E生平安”百万医疗保险产品上线，几百元就能享受几百万医疗费额度，最高保额达400万，性价比高，无用药限制，可以异地就医（二级医院以上）。集团员工通过融和e保购买立享8.5折优惠，全家可组合购买，价格更优。
          </span>
        </p>

        <p class="image-box">
          <img :src="spicImage" alt="鍏徃鍥尯褰㈣薄" width="600px" />
        </p>

        <p class="green-box">
          <span @click="downloadGuide">点击查看操作指南</span>
        </p>
      </div>
    </div>
  </DynamicPage>
</template>

<script setup>
import DynamicPage from '@/components/common/DynamicPage.vue';
import { contentPageLayouts } from '@/configs/contentPages';
import { resolveAssetPath } from '@/utils/assets';

const fileModules = import.meta.glob('@/assets/files/*', { eager: true, import: 'default' });
const guideDoc =
  Object.values(fileModules).find((u) => typeof u === 'string' && /\.docx?$/i.test(u)) || '';

const layout = contentPageLayouts.integratedServices;
const qrImage = resolveAssetPath('images/integratedServices/qr.jpg');
const spicImage = resolveAssetPath('images/integratedServices/spic.png');

const downloadGuide = () => {
  if (!guideDoc) {
    window.alert('未找到操作指南文件');
    return;
  }
  try {
    const link = document.createElement('a');
    link.href = guideDoc;
    link.download = '操作指南.doc';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (e) {
    window.open(guideDoc, '_blank');
  }
};

useHead({
  title: '融和e保_国家电投集团保险经纪有限公司',
});
</script>

<style scoped lang="scss">
.integrated-services {
  width: 100%;
  // background-color: pink;
  .title {
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
  .author {
    text-align: center;
  }

  .rich-text {
    p {
      text-align: justify;
      text-indent: 2em;
      line-height: 32px;
      color: #2f2f2f;
      font-size: 16px;
      margin-top: 2em;
      span {
        font-size: 16px;
        line-height: 2.5;
      }
    }
    .image-box {
      text-align: center;
      margin-bottom: 49px;
      img {
        max-width: 100%;
      }
    }
    .green-box {
      text-align: center;
      color: #009900;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
    }
  }
}
</style>
