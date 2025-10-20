<template>
  <section class="home-banner">
    <ElCarousel
      ref="carouselRef"
      class="home-banner__carousel"
      :interval="6000"
      indicator-position="none"
      arrow="always"
      height="420px"
      autoplay
      @change="onChange"
    >
      <ElCarouselItem v-for="item in slides" :key="item.id">
        <div
          class="home-banner__slide"
          :style="{ backgroundImage: `url(${item.image})` }"
          role="img"
          :aria-label="item.alt"
        >
        </div>
      </ElCarouselItem>
    </ElCarousel>

    <div class="home-banner__indicators" role="tablist" aria-label="轮播导航">
      <button
        v-for="(item, index) in slides"
        :key="item.id"
        type="button"
        class="home-banner__indicator"
        :class="{ 'is-active': index === activeIndex }"
        :aria-selected="index === activeIndex"
        @click="goTo(index)"
      >
        <span class="visually-hidden">第 {{ index + 1 }} 张轮播图</span>
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { CarouselInstance } from 'element-plus'

interface BannerSlide {
  id: number
  image: string
  title: string
  subtitle?: string
  alt: string
  cta?: {
    label: string
    href: string
  }
}

import banner1 from '~/assets/images/home/1_231649145177.jpg'
import banner2 from '~/assets/images/home/1_231656319170.jpg'
import banner3 from '~/assets/images/home/1_231657107473.jpg'
import banner4 from '~/assets/images/home/1_291518577390.jpg'

const slides: BannerSlide[] = [
  {
    id: 1,
    image: banner1,
  },
  {
    id: 2,
    image: banner2,
  },
  {
    id: 3,
    image: banner3,
  },
  {
    id: 4,
    image: banner4,
  },
]

const carouselRef = ref<CarouselInstance>()
const activeIndex = ref(0)

const onChange = (current: number) => {
  activeIndex.value = current
}

const goTo = (index: number) => {
  carouselRef.value?.setActiveItem(index)
}
</script>

<style scoped lang="scss">
.home-banner {
  background-color: #000;
  color: #fff;
  position: relative;

  &__carousel {
    width: 100%;
    margin: 0;
    position: relative;
    z-index: 1;
  }

  &__slide {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 420px;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }

  &__content {
    background: linear-gradient(90deg, rgba(0, 0, 0, 0.72), transparent);
    padding: 48px 64px;
    max-width: 520px;
  }

  &__title {
    margin: 0 0 16px;
    font-size: 36px;
    font-weight: 700;
    letter-spacing: 0.08em;
  }

  &__subtitle {
    margin: 0 0 24px;
    font-size: 18px;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.85);
  }

  &__link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 10px 24px;
    border-radius: 999px;
    background-color: #c60c1a;
    color: #fff;
    font-size: 16px;
    font-weight: 600;
    text-decoration: none;
    transition: background-color 0.25s ease;

    &:hover {
      background-color: #b00a16;
    }
  }
}

.home-banner__indicators {
  position: absolute;
  z-index: 2;
  display: flex;
  gap: 10px;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
}

.home-banner__indicator {
  width: 12px;
  height: 12px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.8);
  background: rgba(0, 0, 0, 0.25);
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0;

  &.is-active {
    background-color: #c60c1a;
    border-color: #c60c1a;
  }

  &:hover:not(.is-active) {
    background: rgba(0, 0, 0, 0.55);
  }
}

:deep(.el-carousel__container) {
  border-radius: 0;
}

:deep(.el-carousel__arrow) {
  width: 64px;
  height: 64px;
  border-radius: 0;
  background-color: rgba(0, 0, 0, 0.25);
  color: #fff;
  transition: background-color 0.2s ease;
  font-size: 20px;
  backdrop-filter: blur(2px);

  &:hover {
    background-color: rgba(198, 12, 26, 0.8);
  }
}

:deep(.el-carousel__arrow--left) {
  left: 0px;
}

:deep(.el-carousel__arrow--right) {
  right: 0px;
}

@media (max-width: 1024px) {
  .home-banner__slide {
    height: 320px;
  }

  .home-banner__content {
    padding: 32px;
  }

  .home-banner__title {
    font-size: 28px;
  }

  .home-banner__subtitle {
    font-size: 16px;
  }
}

@media (max-width: 640px) {
  .home-banner::before {
    display: none;
  }

  .home-banner__slide {
    justify-content: center;
    text-align: center;
    padding: 0 16px;
  }

  .home-banner__content {
    background: rgba(0, 0, 0, 0.6);
    padding: 24px;
  }

  .home-banner__title {
    font-size: 24px;
  }

  .home-banner__subtitle {
    font-size: 15px;
  }

  .home-banner__indicators {
    position: static;
    margin: 16px auto 0;
  }

  .home-banner__indicator {
    width: 28px;
    height: 28px;
    font-size: 13px;
  }

  :deep(.el-carousel__arrow) {
    display: none;
  }
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
