<template>
  <section class="home-news">
    <div class="home-news__container">
      <div class="home-news__content" v-if="activeCategory">
        <div class="home-news__highlight">
          <header class="home-news__header">
            <div class="home-news__heading">
              <h2 class="home-news__title">新闻中心</h2>
              <span class="home-news__subtitle">NEWS CENTER</span>
            </div>
          </header>
          <ElCarousel
            ref="carouselRef"
            :interval="5000"
            arrow="never"
            height="433px"
            autoplay
            @mousedown="handleMouseDown"
            @mousemove="handleMouseMove"
            @mouseup="handleMouseUp"
            @mouseleave="handleMouseUp"
            @touchstart.passive="handleTouchStart"
            @touchmove.passive="handleTouchMove"
            @touchend="handleTouchEnd"
          >
            <ElCarouselItem v-for="highlight in activeCategory.highlights" :key="highlight.image">
              <div class="home-news__highlight-image">
                <img :src="highlight.image" :alt="highlight.title" draggable="false" />
              </div>
            </ElCarouselItem>
          </ElCarousel>
        </div>

        <div class="home-news__articles">
          <nav class="home-news__tabs" role="tablist">
            <button
              v-for="category in categories"
              :key="category.key"
              class="home-news__tab"
              :class="{ 'is-active': category.key === activeKey }"
              role="tab"
              type="button"
              :aria-selected="category.key === activeKey"
              @click="activeKey = category.key"
            >
              {{ category.label }}
            </button>
          </nav>

          <ul class="home-news__list">
            <li v-for="item in activeCategory.items" :key="item.title" class="home-news__list-item">
              <a :href="item.link" target="_blank" rel="noopener">
                <div class="home-news__date">
                  <span class="home-news__day">{{ item.day }}</span>
                  <span class="home-news__year-month">{{ item.yearMonth }}</span>
                </div>
                <div class="home-news__info">
                  <div class="title">{{ item.title }}</div>
                  <p>{{ item.summary }}</p>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { CarouselInstance } from 'element-plus';

interface NewsHighlight {
  image: string;
  title: string;
  // link: string;
}

interface NewsItem {
  day: string;
  yearMonth: string;
  title: string;
  summary: string;
  link: string;
}

interface NewsCategory {
  key: string;
  label: string;
  highlights: NewsHighlight[];
  items: NewsItem[];
}

import highlight1 from '@/assets/images/home/2_160935322406.png';
import highlight2 from '@/assets/images/home/2_201438518443.png';
import highlight3 from '@/assets/images/home/2_201437221155.jpg';
import highlight4 from '@/assets/images/home/2_201436168516.jpg';

const categories: NewsCategory[] = [
  {
    key: 'company',
    label: '公司要闻',
    highlights: [
      {
        image: highlight1,
        title: '公司重要活动现场',
        // link: 'https://www.spicib.com/html/view_160.html',
      },
      {
        image: highlight2,
        title: '党建活动与专题培训',
        // link: 'https://www.spicib.com/html/view_152.html',
      },
      {
        image: highlight3,
        title: '合作伙伴签约仪式',
        // link: 'https://www.spicib.com/html/view_159.html',
      },
      {
        image: highlight4,
        title: '大巴车',
        // link: 'https://www.spicib.com/html/view_159.html',
      },
    ],
    items: [
      {
        day: '09',
        yearMonth: '2022-03',
        title: '保险经纪积极拓展市场化业务',
        summary:
          '保险经纪业务拓展团队赴郑州拜访明喆建投、郑州市建设投资集团，围绕创新合作模式推进市场化业务落地。',
        link: 'https://www.spicib.com/html/view_160.html',
      },
      {
        day: '09',
        yearMonth: '2022-03',
        title: '保险经纪举办“健康向上”主题“三八”妇女节活动',
        summary: '公司工会组织开展健康关怀与主题沙龙活动，营造向上向善的企业文化氛围。',
        link: 'https://www.spicib.com/html/view_152.html',
      },
      {
        day: '24',
        yearMonth: '2022-02',
        title: '保险经纪召开2022年工作会议',
        summary: '会议总结2021年重点成果，部署风险管理、业务拓展、党建与信息化建设等年度任务。',
        link: 'https://www.spicib.com/html/view_159.html',
      },
      {
        day: '18',
        yearMonth: '2022-02',
        title: '张伟冬、田志国会见明喆集团高管一行',
        summary: '双方就保险业务协同开展深入交流，推进能源与城市服务领域的战略合作。',
        link: 'https://www.spicib.com/html/view_155.html',
      },
    ],
  },
  {
    key: 'industry',
    label: '行业资讯',
    highlights: [
      {
        image: highlight1,
        title: '能源行业专题论坛',
        link: 'https://www.spicib.com/html/view_47.html',
      },
      {
        image: highlight2,
        title: '双碳政策研讨',
        link: 'https://www.spicib.com/html/view_39.html',
      },
      {
        image: highlight3,
        title: '科技创新成果展示',
        link: 'https://www.spicib.com/html/view_38.html',
      },
    ],
    items: [
      {
        day: '03',
        yearMonth: '2021-11',
        title: '今年10月疆电外送电量突破千亿大关',
        summary: '1-10月疆电外送电量达到1024亿千瓦时，同比增长23%，能源配置持续优化。',
        link: 'https://www.spicib.com/html/view_47.html',
      },
      {
        day: '01',
        yearMonth: '2021-11',
        title: '“能跌能涨”市场化电价机制初步形成',
        summary: '河南省完成电力直接交易合同改签，全国电力市场化改革迈出坚实步伐。',
        link: 'https://www.spicib.com/html/view_39.html',
      },
      {
        day: '27',
        yearMonth: '2021-10',
        title: '实现碳达峰、碳中和目标不能立刻弃煤',
        summary: '专家指出实现双碳目标需循序渐进，坚持安全可控与系统协同。',
        link: 'https://www.spicib.com/html/view_38.html',
      },
      {
        day: '25',
        yearMonth: '2021-10',
        title: '国内在建纬度最高抽水蓄能电站进入蓄水阶段',
        summary: '黑龙江荒沟抽水蓄能电站投入运行前蓄水，标志着项目即将实现发电目标。',
        link: 'https://www.spicib.com/html/view_37.html',
      },
    ],
  },
];

const activeKey = ref<NewsCategory['key']>(categories[0].key);

const activeCategory = computed(() =>
  categories.find((category) => category.key === activeKey.value),
);

const carouselRef = ref<CarouselInstance | null>(null);
const isDragging = ref(false);
const dragStartX = ref(0);
const dragDeltaX = ref(0);
const DRAG_THRESHOLD = 40;

const beginDrag = (pointX: number) => {
  isDragging.value = true;
  dragStartX.value = pointX;
  dragDeltaX.value = 0;
  carouselRef.value?.pause();
};

const updateDrag = (pointX: number) => {
  if (!isDragging.value) {
    return;
  }
  dragDeltaX.value = pointX - dragStartX.value;
};

const endDrag = () => {
  if (!isDragging.value) {
    return;
  }

  const distance = dragDeltaX.value;
  isDragging.value = false;
  dragStartX.value = 0;
  dragDeltaX.value = 0;

  if (Math.abs(distance) >= DRAG_THRESHOLD) {
    if (distance > 0) {
      carouselRef.value?.prev();
    } else {
      carouselRef.value?.next();
    }
  }

  carouselRef.value?.play();
};

const handleMouseDown = (event: MouseEvent) => {
  event.preventDefault();
  beginDrag(event.clientX);
};

const handleMouseMove = (event: MouseEvent) => {
  if (!isDragging.value) {
    return;
  }
  updateDrag(event.clientX);
};

const handleMouseUp = () => {
  endDrag();
};

const handleTouchStart = (event: TouchEvent) => {
  if (!event.touches.length) {
    return;
  }

  beginDrag(event.touches[0].clientX);
};

const handleTouchMove = (event: TouchEvent) => {
  if (!event.touches.length) {
    return;
  }

  updateDrag(event.touches[0].clientX);
};

const handleTouchEnd = () => {
  endDrag();
};
</script>

<style scoped lang="scss">
.home-news {
  background-color: #fff;
  padding: 56px 0 72px;

  &__container {
    width: min(1180px, 100%);
    margin: 0 auto;
    padding: 0 16px;
  }

  &__content {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 48px;
    align-items: stretch;
  }

  &__highlight {
    position: relative;
    border-radius: 6px;
    overflow: hidden;
    // background-color: #fff;
    // box-shadow: 0 14px 36px rgba(0, 0, 0, 0.12);
    // min-height: 420px;
    display: flex;
    flex-direction: column;

    .home-news__header {
      margin-bottom: 30px;
    }

    .home-news__heading {
      display: flex;
      align-items: baseline;
      gap: 12px;
    }

    .home-news__title {
      margin: 0;
      font-size: 30px;
      font-weight: 700;
      letter-spacing: 0.1em;
      color: #1a1a1a;
    }

    .home-news__subtitle {
      // margin: 0;
      // font-size: 16px;
      // color: #c7c7c7;
      // letter-spacing: 0.28em;
      display: block;
      color: #cacaca;
      font-size: 20px;
      float: right;
      height: 40px;
      line-height: 50px;
      // margin-left: 10px;
      font-weight: bold;
    }

    :deep(.el-carousel__indicators--horizontal) {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 10px;
    }

    :deep(.el-carousel__container) {
      flex: 1 1 auto;
      min-height: 0;
    }

    :deep(.el-carousel__indicator) {
      margin: 0;

      &.is-active button {
        background-color: #c60c1a;
        opacity: 1;
      }
    }

    :deep(.el-carousel__indicator button) {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      border: none;
      background-color: rgba(0, 0, 0, 0.2);
      opacity: 0.6;
      transition: opacity 0.2s ease, background-color 0.2s ease;

      &:hover {
        opacity: 0.85;
      }
    }
  }

  &__highlight-image {
    width: 100%;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__articles {
    display: flex;
    flex-direction: column;
    // gap: 22px;
    min-height: 420px;
  }

  &__tabs {
    display: inline-flex;
    gap: 12px;
    margin-bottom: 12px;
  }

  &__tab {
    min-width: 140px;
    padding: 10px 28px;
    border: 1px solid #e6e6e6;
    border-radius: 999px;
    background-color: #fafafa;
    color: #999;
    font-size: 18px;
    letter-spacing: 0.2em;
    cursor: pointer;
    transition: all 0.25s ease;

    &.is-active {
      border-color: #e41b1b;
      background-color: #e41b1b;
      color: #fff;
      font-weight: 600;
      box-shadow: 0 8px 18px rgba(198, 12, 26, 0.28);
    }

    &:hover:not(.is-active) {
      background-color: #ededed;
    }
  }

  &__list {
    list-style: none;
    margin: 0;
    padding: 0;
    // border-top: 1px solid #f1f1f1;
  }

  &__list-item {
    border-bottom: 1px solid #f1f1f1;
    transition: background-color 0.2s ease;

    a {
      display: grid;
      grid-template-columns: 92px 1fr;
      gap: 26px;
      align-items: center;
      text-decoration: none;
      color: inherit;
      // padding: 14px 0;
    }

    &:hover {
      background-color: rgba(198, 12, 26, 0.06);
    }
  }

  &__date {
    width: 90px;
    height: 90px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6px;
    // padding: 16px 0;
    // border-radius: 4px;
    background-color: #e41b1b;
    color: #fff;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-align: center;
  }

  &__day {
    font-size: 30px;
    line-height: 1;
  }

  &__year-month {
    font-size: 13px;
    opacity: 0.85;
  }

  &__info {
    .title {
      margin: 0 0 6px;
      font-size: 16px;
      color: #333;
      line-height: 1.4;
      padding-top: 8px;
    }

    p {
      font-size: 16px;
      color: #666;
      line-height: 1.6;
      height: 3.2em;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
  }
}

// @media (max-width: 1024px) {
//   .home-news {
//     padding: 48px 0;

//     &__content {
//       grid-template-columns: 1fr;
//       gap: 36px;
//     }

//     &__tabs {
//       justify-content: center;
//     }

//     &__tab {
//       flex: 1;
//       text-align: center;
//     }
//   }
// }

// @media (max-width: 640px) {
//   .home-news {
//     &__heading {
//       flex-direction: column;
//       gap: 4px;
//     }

//     &__content {
//       gap: 28px;
//     }

//     &__tabs {
//       flex-wrap: wrap;
//       justify-content: center;
//       gap: 10px;
//     }

//     &__tab {
//       min-width: auto;
//       padding: 10px 18px;
//       font-size: 16px;
//       letter-spacing: 0.12em;
//     }

//     &__list-item a {
//       grid-template-columns: 80px 1fr;
//       gap: 16px;
//       padding: 16px 0;
//     }

//     &__date {
//       padding: 12px 0;
//     }
//   }
// }
</style>
