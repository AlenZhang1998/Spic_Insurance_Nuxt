<template>
  <DynamicPage v-bind="layout">
    <div class="enterprise-image">
      <section v-for="video in videos" :key="video.src" class="enterprise-image__item">
        <video
          class="enterprise-image__video"
          controls
          preload="metadata"
          :poster="video.poster"
          width="550"
          height="400"
        >
          <source :src="video.src" type="video/mp4" />
          您的浏览器暂不支持视频播放功能。
        </video>
        <h4 class="enterprise-image__title">{{ video.title }}</h4>
        <!-- <p v-if="video.description" class="enterprise-image__description">
          {{ video.description }}
        </p> -->
      </section>
    </div>
  </DynamicPage>
</template>

<script setup>
import DynamicPage from '@/components/common/DynamicPage.vue';
import { contentPageLayouts } from '@/configs/contentPages';

const layout = contentPageLayouts.partyBuilding;

const videos = [
  {
    title: '《我辈》',
    src: 'https://cdn.jsdelivr.net/gh/alan-test-assets/video/sample-1.mp4',
    poster: 'https://cdn.jsdelivr.net/gh/alan-test-assets/video/sample-1-poster.jpg',
    description: '展现保险经纪人砥砺奋进的精神风貌，记录公司发展历程中的闪光瞬间。',
  },
  {
    title: '《资本控股宣传片》',
    src: 'https://cdn.jsdelivr.net/gh/alan-test-assets/video/sample-2.mp4',
    poster: 'https://cdn.jsdelivr.net/gh/alan-test-assets/video/sample-2-poster.jpg',
    description: '突出企业文化与核心竞争力，传递开放协同、创新共享的品牌理念。',
  },
];

useHead({
  title: '企业影像_国家电投集团保险经纪有限公司',
});
</script>

<style lang="scss" scoped>
.enterprise-image {
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 15px 0;
}

.enterprise-image__item {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.enterprise-image__video {
  // width: 100%;
  // max-width: 800px;
  aspect-ratio: 16 / 9;
  background: #000;
}

.enterprise-image__title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

// .enterprise-image__description {
//   margin: 0;
//   font-size: 14px;
//   color: #555;
//   line-height: 24px;
// }

@media (max-width: 768px) {
  .enterprise-image__video {
    max-width: 100%;
  }
}
</style>
