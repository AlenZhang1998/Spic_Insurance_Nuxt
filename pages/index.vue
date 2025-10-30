<template>
  <div class="home-page">
    <HomeBannerCarousel />
    <HomeNewsCenter />
    <HomeRiskBanner />
    <HomeBusinessOverview />
    <HomeEnterpriseImage />
  </div>
</template>

<script setup>
import HomeBannerCarousel from '@/components/home/HomeBannerCarousel.vue';
import HomeNewsCenter from '@/components/home/HomeNewsCenter.vue';
import HomeRiskBanner from '@/components/home/HomeRiskBanner.vue';
import HomeBusinessOverview from '@/components/home/HomeBusinessOverview.vue';
import HomeEnterpriseImage from '@/components/home/HomeEnterpriseImage.vue';

useHead(() => ({
  title: '国家电投集团保险经纪公司',
}));
</script>

<style scoped lang="scss">
.home-page {
  display: flex;
  flex-direction: column;
  gap: 0;
  background-color: #f5f5f5;
}
</style>
