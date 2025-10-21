<template>
  <section class="home-business">
    <div class="home-business__container">
      <header class="home-business__header">
        <div class="home-business__heading">
          <h2 class="home-business__title">主营业务</h2>
          <span class="home-business__subtitle">FINANCIAL SERVICE</span>
        </div>
        <NuxtLink to="/business-overview" class="home-business__more">
          更多
        </NuxtLink>
      </header>

      <div class="home-business__grid">
        <NuxtLink
          v-if="leadCard"
          :to="leadCard.href"
          class="home-business__card home-business__card--lead"
        >
          <img :src="leadCard.image" :alt="leadCard.title" />
          <!-- <div class="home-business__card-overlay">
            <h3>{{ leadCard.title }}</h3>
          </div> -->
        </NuxtLink>

        <div class="home-business__aside">
          <NuxtLink
            v-for="card in secondaryCards"
            :key="card.title"
            :to="card.href"
            class="home-business__card home-business__card--secondary"
          >
            <img :src="card.image" :alt="card.title" />
            <!-- <div class="home-business__card-overlay">
              <h4>{{ card.title }}</h4>
            </div> -->
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import businessImage1 from '~/assets/images/home/4_yewu01.jpg'
import businessImage2 from '~/assets/images/home/4_yewu02.jpg'
import businessImage3 from '~/assets/images/home/4_yewu03.jpg'
import businessImage4 from '~/assets/images/home/4_yewu04.jpg'
import businessImage5 from '~/assets/images/home/4_yewu05.jpg'

interface BusinessCard {
  title: string
  href: string
  image: string
}

const businessCards: BusinessCard[] = [
  {
    title: '集团公司统保业务',
    href: '/business-overview',
    image: businessImage1,
  },
  {
    title: '重大专项及境外资产保险',
    href: '/business-overview/projects',
    image: businessImage2,
  },
  {
    title: '创新业务',
    href: '/business-overview/employees',
    image: businessImage3,
  },
  {
    title: '产权经纪业务',
    href: '/business-overview/global',
    image: businessImage4,
  },
  {
    title: '综合金融解决方案',
    href: '/integrated-services',
    image: businessImage5,
  },
]

const leadCard = computed(() => businessCards[0])
const secondaryCards = computed(() => businessCards.slice(1))
</script>

<style scoped lang="scss">
.home-business {
  background-color: #fff;
  padding: 72px 0;

  &__container {
    width: min(1200px, 100%);
    margin: 0 auto;
    padding: 0 16px;
  }

  &__header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 40px;
  }

  &__heading {
    display: flex;
    align-items: baseline;
    gap: 16px;
  }

  &__title {
    margin: 0;
    font-size: 34px;
    font-weight: 700;
    color: #333;
    letter-spacing: 0.08em;
  }

  &__subtitle {
    display: inline-block;
    margin: 4px 0 0;
    font-size: 18px;
    letter-spacing: 0.28em;
    color: #c4c4c4;
    font-weight: 600;
  }

  &__more {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 36px;
    border-radius: 10px;
    font-size: 16px;
    font-weight: 500;
    text-decoration: none;
    background-color: #a7a5a4;
    color: #fff;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #5f5d5c;
    }
  }

  &__grid {
    display: flex;
    gap: 32px;
    align-items: stretch;
  }

  &__card {
    position: relative;
    display: block;
    overflow: hidden;
    border-radius: 12px;
    // background-color: #fff;
    // text-decoration: none;
    // box-shadow: 0 18px 36px rgba(0, 0, 0, 0.12);
    // transition: transform 0.35s ease, box-shadow 0.35s ease;

    // img {
    //   display: block;
    //   max-width: 93%;
    //   // width: 100%;
    //   // height: 100%;
    //   // object-fit: cover;
    //   transition: transform 0.45s ease;
    // }

    // &:hover {
    //   transform: translateY(-6px);
    //   box-shadow: 0 26px 48px rgba(0, 0, 0, 0.16);
    // }

    // &:hover img {
    //   transform: scale(1.04);
    // }
  }

  &__card--lead {
    // flex: 0 0 58%;
    // max-width: 93%;
    // min-height: 420px;
    img {
      display: block;
      max-width: 93%;
      // width: 100%;
      // height: 100%;
      // object-fit: cover;
      transition: transform 0.45s ease;
    }
  }

  &__aside {
    flex: 1 1 0;
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
    gap: 10px 30px;
  }

  &__card--secondary {
    // flex: 0 0 calc(50% - 10px);
    // max-width: calc(50% - 10px);
    // height: calc(50% - 11px);
    position: relative;
    img {
      display: block;
      max-width: 88%;
      // width: 100%;
      // height: 100%;
      // object-fit: cover;
      // transition: transform 0.45s ease;
      // position: absolute;
      // right: 0;
    }
  }

  &__card-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: flex-start;
    padding: 26px 28px;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.92) 0%,
      rgba(255, 255, 255, 0.82) 40%,
      rgba(255, 255, 255, 0.3) 72%,
      rgba(255, 255, 255, 0) 100%
    );
    z-index: 1;
    pointer-events: none;

    h3,
    h4 {
      margin: 0;
      color: #242424;
      font-weight: 700;
      letter-spacing: 0.05em;
      text-shadow: 0 1px 4px rgba(255, 255, 255, 0.7);
    }

    h3 {
      font-size: 24px;
      line-height: 1.2;
    }

    h4 {
      font-size: 18px;
      line-height: 1.2;
    }
  }
}

@media (max-width: 1200px) {
  .home-business__grid {
    gap: 28px;
  }

  .home-business__card--lead {
    min-height: 380px;
  }
}

@media (max-width: 1024px) {
  .home-business {
    padding: 52px 0;

    &__grid {
      flex-direction: column;
      gap: 28px;
    }

    &__card--lead {
      min-height: 320px;
      max-width: none;
      flex: none;
    }

    &__aside {
      gap: 18px;
      align-content: flex-start;
    }

    &__card--secondary {
      flex: 1 1 calc(50% - 9px);
      max-width: none;
      height: auto;
    }
  }
}

@media (max-width: 768px) {
  .home-business__header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .home-business__more {
    align-self: flex-start;
  }

  .home-business__card {
    min-height: 200px;
  }

  .home-business__aside {
    flex-direction: column;
    align-content: stretch;
  }

  .home-business__card--secondary {
    flex: 1 1 auto;
    height: auto;
  }
}
</style>
