<template>
  <section class="home-news">
    <div class="home-news__container">
      <div class="home-news__content" v-if="activeCategory">
        <div class="home-news__highlight">
          <Transition name="home-news-slide-down">
            <header v-if="showHeader" class="home-news__header">
              <div class="home-news__heading">
                <h2 class="home-news__title">新闻中心</h2>
                <span class="home-news__subtitle">NEWS CENTER</span>
              </div>
            </header>
          </Transition>
          <Transition name="home-news-carousel-up">
            <ElCarousel
              v-if="showCarousel"
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
          </Transition>
        </div>

        <div class="home-news__articles">
          <Transition name="home-news-slide-up">
            <nav v-if="showTabs" class="home-news__tabs" role="tablist">
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
          </Transition>

          <Transition name="home-news-list-reveal">
            <ul v-if="showList" class="home-news__list">
              <li
                v-for="item in activeCategory.items"
                :key="item.title"
                class="home-news__list-item"
              >
                <a :href="item.link" target="_blank" rel="noopener">
                  <div class="home-news__date">
                    <span class="home-news__day">{{ item.day }}</span>
                    <em class="home-news__year-month">{{ item.yearMonth }}</em>
                  </div>
                  <div class="home-news__info">
                    <div class="title">{{ item.title }}</div>
                    <p>{{ item.summary }}</p>
                  </div>
                </a>
              </li>
            </ul>
          </Transition>
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

interface RawNewsItem {
  id?: string;
  title?: string;
  summary?: string;
  date?: string;
}

interface RawNewsResponse {
  items?: RawNewsItem[];
}

import highlight1 from '@/assets/images/home/2_160935322406.png';
import highlight2 from '@/assets/images/home/2_201438518443.png';
import highlight3 from '@/assets/images/home/2_201437221155.jpg';
import highlight4 from '@/assets/images/home/2_201436168516.jpg';

const highlightPresets: Record<string, NewsHighlight[]> = {
  company: [
    {
      image: highlight1,
      title: '公司重要活动现场',
    },
    {
      image: highlight2,
      title: '党建活动专题',
    },
    {
      image: highlight3,
      title: '合作伙伴签约仪式',
    },
    {
      image: highlight4,
      title: '团队建设与培训瞬间',
    },
  ],
  industry: [
    {
      image: highlight1,
      title: '能源行业专题论坛',
    },
    {
      image: highlight2,
      title: '双碳政策研讨',
    },
    {
      image: highlight3,
      title: '科技创新成果展示',
    },
  ],
};

const extractDateParts = (dateString?: string) => {
  if (!dateString) {
    return { day: '--', yearMonth: '' };
  }

  const [year, month, day] = dateString.split('-');

  return {
    day: day ? day.padStart(2, '0') : '--',
    yearMonth: year && month ? `${year}-${month}` : dateString,
  };
};

const { $axios } = useNuxtApp();

const { data: fetchedCategories, error: categoriesError } = await useAsyncData(
  'home-news-categories',
  async () => {
    const [{ data: companyData }, { data: industryData }] = await Promise.all([
      $axios.get<RawNewsResponse>('/api/news/company'),
      $axios.get<RawNewsResponse>('/api/news/industry'),
    ]);

    const buildItems = (items: RawNewsItem[] | undefined, route: string): NewsItem[] => {
      if (!items?.length) {
        return [];
      }

      return items.slice(0, 4).map((item) => {
        const { day, yearMonth } = extractDateParts(item.date);
        const itemId = item.id ?? '';
        return {
          day,
          yearMonth,
          title: item.title ?? '',
          summary: item.summary ?? '',
          link: itemId ? `${route}?id=${itemId}` : route,
        };
      });
    };

    const categories: NewsCategory[] = [
      {
        key: 'company',
        label: '公司要闻',
        highlights: highlightPresets.company ?? [],
        items: buildItems(companyData?.items, '/news/companyNews'),
      },
      {
        key: 'industry',
        label: '行业资讯',
        highlights: highlightPresets.industry ?? [],
        items: buildItems(industryData?.items, '/news/industryNews'),
      },
    ];

    return categories.filter((category) => category.items.length);
  },
);

watchEffect(() => {
  if (categoriesError.value) {
    console.error('Failed to load home news categories', categoriesError.value);
  }
});

const categories = computed(() => fetchedCategories.value ?? []);

const showHeader = ref(false);
const showTabs = ref(false);
const showCarousel = ref(false);
const showList = ref(false);

const activeKey = ref<NewsCategory['key'] | ''>('');

watch(
  categories,
  (list) => {
    if (!list.length) {
      activeKey.value = '';
      return;
    }

    if (!list.some((item) => item.key === activeKey.value)) {
      activeKey.value = list[0].key;
    }
  },
  { immediate: true },
);

const activeCategory = computed(() =>
  categories.value.find((category) => category.key === activeKey.value),
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

onMounted(() => {
  requestAnimationFrame(() => {
    showHeader.value = true;
    showTabs.value = true;
    showCarousel.value = true;
    showList.value = true;
  });
});
</script>

<style lang="scss">
.home-news {
  background-color: #fff;
  padding: 30px 0 50px;

  .home-news-slide-down-enter-from {
    transform: translateY(-50px);
    opacity: 0;
  }

  .home-news-slide-down-enter-active {
    transition: transform 0.45s ease, opacity 0.45s ease;
  }

  .home-news-slide-down-enter-to {
    transform: translateY(0);
    opacity: 1;
  }

  .home-news-slide-up-enter-from {
    transform: translateY(-50px);
    opacity: 0;
  }

  .home-news-slide-up-enter-active {
    transition: transform 0.45s ease, opacity 0.45s ease;
  }

  .home-news-slide-up-enter-to {
    transform: translateY(0);
    opacity: 1;
  }

  .home-news-carousel-up-enter-from {
    transform: translateY(400px);
    opacity: 0;
  }

  .home-news-carousel-up-enter-active {
    transition: transform 0.8s ease, opacity 0.8s ease;
  }

  .home-news-carousel-up-enter-to {
    transform: translateY(0);
    opacity: 1;
  }

  .home-news-list-reveal-enter-from {
    transform: translateY(400px);
    opacity: 0;
  }

  .home-news-list-reveal-enter-active {
    transition: transform 0.8s ease, opacity 0.8s ease;
  }

  .home-news-list-reveal-enter-to {
    transform: translateY(0);
    opacity: 1;
  }

  .home-news__container {
    // width: min(1180px, 100%);
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 16px;
  }

  .home-news__content {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    // gap: 108px;
    align-items: stretch;
  }

  .home-news__highlight {
    position: relative;
    // border-radius: 6px;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    .home-news__header {
      margin-bottom: 40px;
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
      // letter-spacing: 0.1em;
      color: #1a1a1a;
    }

    .home-news__subtitle {
      display: block;
      color: #cacaca;
      font-size: 20px;
      float: right;
      height: 40px;
      line-height: 50px;
      font-weight: bold;
      margin-left: -2px;
    }

    .el-carousel__indicators--horizontal {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 10px;
    }

    .el-carousel__container {
      flex: 1 1 auto;
      min-height: 0;
    }

    .el-carousel__indicator {
      margin: 0;
    }

    .el-carousel__indicator.is-active button {
      background-color: #999;
      opacity: 1;
    }

    .el-carousel__indicator button {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      border: none;
      background-color: #ccc;
      opacity: 0.6;
      transition: opacity 0.2s ease, background-color 0.2s ease;
    }

    .el-carousel__indicator button:hover {
      opacity: 0.85;
    }
  }

  .home-news__highlight-image {
    // width: 100%;
    // height: 100%;

    img {
      width: 100%;
      max-width: 560px;
      height: 420px;
      border-radius: 0px !important;
      // object-fit: cover;
    }
  }

  .home-news__articles {
    display: flex;
    flex-direction: column;
    min-height: 420px;
  }

  .home-news__tabs {
    display: inline-flex;
    gap: 12px;
    // margin-bottom: 12px;
    padding-bottom: 29.5px;
    padding-left: 84px;
  }

  .home-news__tab {
    min-width: 140px;
    padding: 10px 28px;
    border: 1px solid #e6e6e6;
    border-radius: 999px;
    background-color: #fafafa;
    color: #999;
    font-size: 16px;
    letter-spacing: 0.2em;
    cursor: pointer;
    transition: all 0.25s ease;
  }

  .home-news__tab.is-active {
    border-color: #e41b1b;
    background-color: #e41b1b;
    color: #fff;
    // font-weight: 600;
    box-shadow: 0 8px 18px rgba(198, 12, 26, 0.28);
  }

  .home-news__tab:hover:not(.is-active) {
    background-color: #ededed;
  }

  .home-news__list {
    padding-left: 84px;
    list-style: none;
    margin: 0;
    // padding: 0;
  }

  .home-news__list-item {
    border-bottom: 1px dashed #e5e5e5;
    transition: background-color 0.2s ease;
  }

  .home-news__list-item a {
    display: grid;
    grid-template-columns: 92px 1fr;
    gap: 26px;
    align-items: center;
    text-decoration: none;
    color: inherit;
  }

  .home-news__list-item:hover {
    background-color: rgba(198, 12, 26, 0.06);
  }

  .home-news__date {
    width: 90px;
    height: 90px;
    display: flex;
    flex-direction: column;
    // align-items: center;
    // justify-content: center;
    // gap: 6px;
    background-color: #e41b1b;
    color: #fff;
    // font-weight: 600;
    // letter-spacing: 0.08em;
    text-align: center;
  }

  .home-news__day {
    font-size: 28px;
    // line-height: 1;
    padding-top: 17px;
  }

  .home-news__year-month {
    font-size: 16px;
    // opacity: 0.85;
    font-weight: normal;
    font-style: normal;
  }

  .home-news__info {
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
</style>
