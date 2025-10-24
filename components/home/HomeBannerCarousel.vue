<template>
  <section class="home-banner">
    <ElCarousel
      ref="carouselRef"
      class="home-banner__carousel"
      :interval="5000"
      indicator-position="none"
      arrow="always"
      height="420px"
      autoplay
      @mouseleave="onDragLeave"
      @mousedown="onDragStart"
      @touchstart.passive="onTouchStart"
      @touchend="onDragEnd"
      @touchcancel="onDragEnd"
    >
      <ElCarouselItem v-for="item in slides" :key="item.id">
        <div
          class="home-banner__slide"
          :style="{ backgroundImage: `url(${item.image})` }"
          role="img"
          :aria-label="item.alt"
        />
      </ElCarouselItem>
    </ElCarousel>
  </section>
</template>

<script setup lang="ts">
import type { CarouselInstance } from 'element-plus'

interface BannerSlide {
  id: number
  image: string
  alt: string
}

import banner1 from '~/assets/images/home/1_231649145177.jpg'
import banner2 from '~/assets/images/home/1_231656319170.jpg'
import banner3 from '~/assets/images/home/1_231657107473.jpg'
import banner4 from '~/assets/images/home/1_291518577390.jpg'

const slides: BannerSlide[] = [
  {
    id: 1,
    image: banner1,
    alt: '国家电投集团保险经纪有限公司宣传图',
  },
  {
    id: 2,
    image: banner2,
    alt: '风险管理与综合保险服务宣传图',
  },
  {
    id: 3,
    image: banner3,
    alt: '融和e保数字平台宣传图',
  },
  {
    id: 4,
    image: banner4,
    alt: '绿色低碳未来宣传图',
  },
]

const carouselRef = ref<CarouselInstance>()
const isDragging = ref(false)
const dragStartX = ref(0)
const dragDeltaX = ref(0)
const DRAG_THRESHOLD = 60
const touchMoveListenerOptions: AddEventListenerOptions = { passive: false }

const addPointerListeners = () => {
  if (typeof window === 'undefined') {
    return
  }
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup', onDragEnd)
  window.addEventListener('touchmove', onTouchMove, touchMoveListenerOptions)
  window.addEventListener('touchend', onDragEnd)
  window.addEventListener('touchcancel', onDragEnd)
}

const removePointerListeners = () => {
  if (typeof window === 'undefined') {
    return
  }
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mouseup', onDragEnd)
  window.removeEventListener('touchmove', onTouchMove, touchMoveListenerOptions)
  window.removeEventListener('touchend', onDragEnd)
  window.removeEventListener('touchcancel', onDragEnd)
}

const startDrag = (startX: number) => {
  isDragging.value = true
  dragStartX.value = startX
  dragDeltaX.value = 0
  addPointerListeners()
}

const onDragStart = (event: MouseEvent) => {
  if (event.button !== 0) {
    return
  }
  const target = event.target as HTMLElement | null
  if (target?.closest('.el-carousel__arrow')) {
    return
  }
  event.preventDefault()
  startDrag(event.clientX)
}

const onTouchStart = (event: TouchEvent) => {
  if (event.touches.length !== 1) {
    return
  }
  const target = event.target as HTMLElement | null
  if (target?.closest('.el-carousel__arrow')) {
    return
  }
  startDrag(event.touches[0].clientX)
}

const onMouseMove = (event: MouseEvent) => {
  if (!isDragging.value) {
    return
  }
  event.preventDefault()
  dragDeltaX.value = event.clientX - dragStartX.value
}

const onTouchMove = (event: TouchEvent) => {
  if (!isDragging.value || event.touches.length !== 1) {
    return
  }
  event.preventDefault()
  dragDeltaX.value = event.touches[0].clientX - dragStartX.value
}

const onDragEnd = () => {
  if (!isDragging.value) {
    return
  }
  if (dragDeltaX.value > DRAG_THRESHOLD) {
    carouselRef.value?.prev()
  } else if (dragDeltaX.value < -DRAG_THRESHOLD) {
    carouselRef.value?.next()
  }
  isDragging.value = false
  dragDeltaX.value = 0
  removePointerListeners()
}

const onDragLeave = () => {
  if (!isDragging.value) {
    return
  }
  onDragEnd()
}

onBeforeUnmount(() => {
  removePointerListeners()
})
</script>

<style scoped lang="scss">
.home-banner {
  background-color: #fff;
  color: #fff;
  position: relative;

  &__carousel {
    width: 100%;
    margin: 0;
    position: relative;
    z-index: 1;
    cursor: grab;

    &:active {
      cursor: grabbing;
    }
  }

  &__slide {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 400px;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    cursor: grab;

    &:active {
      cursor: grabbing;
    }
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

  :deep(.el-carousel__arrow) {
    display: none;
  }
}
</style>
