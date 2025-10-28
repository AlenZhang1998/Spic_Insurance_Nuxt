<template>
  <section class="home-risk-banner">
    <img :src="riskBannerImage" alt="风险提醒横幅" class="home-risk-banner__image" />
  </section>
</template>

<script setup lang="ts">
import riskBannerImage from '@/assets/images/home/3_bj1.jpg';
</script>

<style scoped lang="scss">
.home-risk-banner {
  display: block;
  // margin: 48px 0;
}

.home-risk-banner__image {
  display: block;
  width: 100%;
  max-height: 400px;
}
</style>
