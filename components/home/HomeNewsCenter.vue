<template>
  <section class="home-news">
    <div class="home-news__container">
      <header class="home-news__header">
        <div>
          <h2 class="home-news__title">新闻中心</h2>
          <p class="home-news__subtitle">NEWS CENTER</p>
        </div>
        <NuxtLink to="/news" class="home-news__more">更多</NuxtLink>
      </header>

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

      <div class="home-news__content" v-if="activeCategory">
        <div class="home-news__highlight">
          <ElCarousel
            :interval="5000"
            arrow="never"
            height="380px"
            indicator-position="outside"
            autoplay
          >
            <ElCarouselItem
              v-for="highlight in activeCategory.highlights"
              :key="highlight.image"
            >
              <a
                class="home-news__highlight-slide"
                :href="highlight.link"
                target="_blank"
                rel="noopener"
              >
                <img :src="highlight.image" :alt="highlight.title" />
                <span class="home-news__highlight-caption">{{
                  highlight.title
                }}</span>
              </a>
            </ElCarouselItem>
          </ElCarousel>
        </div>

        <ul class="home-news__list">
          <li
            v-for="item in activeCategory.items"
            :key="item.title"
            class="home-news__list-item"
          >
            <a :href="item.link" target="_blank" rel="noopener">
              <div class="home-news__date">
                <span class="home-news__day">{{ item.day }}</span>
                <span class="home-news__year-month">{{ item.yearMonth }}</span>
              </div>
              <div class="home-news__info">
                <h3>{{ item.title }}</h3>
                <p>{{ item.summary }}</p>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface NewsHighlight {
  image: string
  title: string
  link: string
}

interface NewsItem {
  day: string
  yearMonth: string
  title: string
  summary: string
  link: string
}

interface NewsCategory {
  key: string
  label: string
  highlights: NewsHighlight[]
  items: NewsItem[]
}

const categories: NewsCategory[] = [
  {
    key: 'company',
    label: '公司要闻',
    highlights: [
      {
        image:
          'https://www.spicib.com/uploads/image/202112/1_160935322406.png',
        title: '公司重要活动现场',
        link: 'https://www.spicib.com/html/view_160.html',
      },
      {
        image:
          'https://www.spicib.com/uploads/image/202112/1_201438518443.png',
        title: '党建活动与专题培训',
        link: 'https://www.spicib.com/html/view_152.html',
      },
      {
        image:
          'https://www.spicib.com/uploads/image/202112/1_201437221155.jpg',
        title: '合作伙伴签约仪式',
        link: 'https://www.spicib.com/html/view_159.html',
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
        summary:
          '公司工会组织开展健康关怀与主题沙龙活动，营造向上向善的企业文化氛围。',
        link: 'https://www.spicib.com/html/view_152.html',
      },
      {
        day: '24',
        yearMonth: '2022-02',
        title: '保险经纪召开2022年工作会议',
        summary:
          '会议总结2021年重点成果，部署风险管理、业务拓展、党建与信息化建设等年度任务。',
        link: 'https://www.spicib.com/html/view_159.html',
      },
      {
        day: '18',
        yearMonth: '2022-02',
        title: '张伟冬、田志国会见明喆集团高管一行',
        summary:
          '双方就保险业务协同开展深入交流，推进能源与城市服务领域的战略合作。',
        link: 'https://www.spicib.com/html/view_155.html',
      },
    ],
  },
  {
    key: 'industry',
    label: '行业资讯',
    highlights: [
      {
        image:
          'https://www.spicib.com/uploads/image/202112/1_201436168516.jpg',
        title: '能源行业专题论坛',
        link: 'https://www.spicib.com/html/view_47.html',
      },
      {
        image:
          'https://www.spicib.com/uploads/image/202112/1_201438518443.png',
        title: '双碳政策研讨',
        link: 'https://www.spicib.com/html/view_39.html',
      },
      {
        image:
          'https://www.spicib.com/uploads/image/202112/1_160935322406.png',
        title: '科技创新成果展示',
        link: 'https://www.spicib.com/html/view_38.html',
      },
    ],
    items: [
      {
        day: '03',
        yearMonth: '2021-11',
        title: '今年10月疆电外送电量突破千亿大关',
        summary:
          '1-10月疆电外送电量达到1024亿千瓦时，同比增长23%，能源配置持续优化。',
        link: 'https://www.spicib.com/html/view_47.html',
      },
      {
        day: '01',
        yearMonth: '2021-11',
        title: '“能跌能涨”市场化电价机制初步形成',
        summary:
          '河南省完成电力直接交易合同改签，全国电力市场化改革迈出坚实步伐。',
        link: 'https://www.spicib.com/html/view_39.html',
      },
      {
        day: '27',
        yearMonth: '2021-10',
        title: '实现碳达峰、碳中和目标不能立刻弃煤',
        summary:
          '专家指出实现双碳目标需循序渐进，坚持安全可控与系统协同。',
        link: 'https://www.spicib.com/html/view_38.html',
      },
      {
        day: '25',
        yearMonth: '2021-10',
        title: '国内在建纬度最高抽水蓄能电站进入蓄水阶段',
        summary:
          '黑龙江荒沟抽水蓄能电站投入运行前蓄水，标志着项目即将实现发电目标。',
        link: 'https://www.spicib.com/html/view_37.html',
      },
    ],
  },
]

const activeKey = ref<NewsCategory['key']>(categories[0].key)

const activeCategory = computed(() =>
  categories.find((category) => category.key === activeKey.value),
)
</script>

<style scoped lang="scss">
.home-news {
  background-color: #fff;
  padding: 64px 0;

  &__container {
    width: min(1200px, 100%);
    margin: 0 auto;
    padding: 0 16px;
  }

  &__header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    border-bottom: 1px solid #e5e5e5;
    padding-bottom: 16px;
    margin-bottom: 24px;
  }

  &__title {
    margin: 0;
    font-size: 32px;
    font-weight: 700;
    color: #333;
    letter-spacing: 0.08em;
  }

  &__subtitle {
    margin: 4px 0 0;
    font-size: 18px;
    color: #c4c4c4;
    letter-spacing: 0.3em;
  }

  &__more {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 90px;
    height: 40px;
    border-radius: 999px;
    font-size: 16px;
    font-weight: 600;
    text-decoration: none;
    background-color: #c60c1a;
    color: #fff;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #b00a16;
    }
  }

  &__tabs {
    display: inline-flex;
    gap: 16px;
    margin-bottom: 32px;
  }

  &__tab {
    padding: 8px 18px;
    border: 1px solid #d9d9d9;
    border-radius: 999px;
    background-color: #f7f7f7;
    color: #666;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.2s ease;

    &.is-active {
      background-color: #c60c1a;
      border-color: #c60c1a;
      color: #fff;
      font-weight: 600;
    }

    &:hover:not(.is-active) {
      background-color: #ececec;
    }
  }

  &__content {
    display: grid;
    grid-template-columns: 380px 1fr;
    gap: 32px;
  }

  &__highlight {
    .el-carousel__container {
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
    }
  }

  &__highlight-slide {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__highlight-caption {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 16px 24px;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.75) 100%);
    color: #fff;
    font-size: 18px;
    font-weight: 600;
  }

  &__list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  &__list-item {
    border-bottom: 1px solid #ededed;
    padding-bottom: 18px;

    &:last-child {
      border-bottom: none;
    }

    a {
      display: grid;
      grid-template-columns: 80px 1fr;
      gap: 20px;
      align-items: start;
      text-decoration: none;
      color: inherit;
    }
  }

  &__date {
    border-right: 1px solid #ebebeb;
    padding-right: 12px;
    text-align: center;
  }

  &__day {
    display: block;
    font-size: 28px;
    font-weight: 700;
    color: #c60c1a;
  }

  &__year-month {
    font-size: 14px;
    color: #999;
  }

  &__info {
    h3 {
      margin: 0 0 8px;
      font-size: 18px;
      color: #333;
      line-height: 1.4;
    }

    p {
      margin: 0;
      font-size: 15px;
      color: #666;
      line-height: 1.6;
    }
  }
}

@media (max-width: 1024px) {
  .home-news {
    padding: 48px 0;

    &__content {
      grid-template-columns: 1fr;
    }

    &__highlight {
      order: -1;
    }

    &__list-item a {
      grid-template-columns: 70px 1fr;
    }
  }
}

@media (max-width: 640px) {
  .home-news__tabs {
    width: 100%;
    justify-content: space-between;
  }

  .home-news__list-item a {
    grid-template-columns: 1fr;
  }

  .home-news__date {
    display: flex;
    align-items: baseline;
    gap: 8px;
    border-right: none;
    padding-right: 0;
    margin-bottom: 8px;
    text-align: left;
  }
}
</style>
