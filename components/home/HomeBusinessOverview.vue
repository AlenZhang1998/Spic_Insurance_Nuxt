<template>
  <section class="home-business">
    <div class="home-business__container">
      <header class="home-business__header">
        <div>
          <h2 class="home-business__title">主营业务</h2>
          <p class="home-business__subtitle">FINANCIAL SERVICE</p>
        </div>
        <NuxtLink to="/business-overview" class="home-business__more">
          更多
        </NuxtLink>
      </header>

      <div class="home-business__content">
        <NuxtLink
          v-if="featuredBusiness"
          :to="featuredBusiness.href"
          class="home-business__lead"
        >
          <img :src="featuredBusiness.image" :alt="featuredBusiness.title" />
          <div class="home-business__overlay">
            <p class="home-business__category">综合解决方案</p>
            <h3>{{ featuredBusiness.title }}</h3>
            <p>{{ featuredBusiness.description }}</p>
          </div>
        </NuxtLink>

        <div class="home-business__grid">
          <NuxtLink
            v-for="item in secondaryBusinesses"
            :key="item.title"
            :to="item.href"
            class="home-business__card"
          >
            <img :src="item.image" :alt="item.title" />
            <div class="home-business__card-overlay">
              <h4>{{ item.title }}</h4>
              <p>{{ item.description }}</p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface BusinessItem {
  title: string
  description: string
  image: string
  href: string
}

const businesses: BusinessItem[] = [
  {
    title: '集团综合保险经纪服务',
    description:
      '聚焦电力能源主业，构建统一承保、统筹理赔的集团化风险管理体系。',
    image: 'https://www.spicib.com/skin/images/yewu01.jpg',
    href: '/business-overview',
  },
  {
    title: '工程与项目保险解决方案',
    description:
      '覆盖大型能源工程项目从建设到投运的全生命周期保险服务。',
    image: 'https://www.spicib.com/skin/images/yewu02.jpg',
    href: '/business-overview/projects',
  },
  {
    title: '企业员工福利与健康保障',
    description:
      '量身定制员工福利计划，提升员工满意度与组织保障能力。',
    image: 'https://www.spicib.com/skin/images/yewu03.jpg',
    href: '/business-overview/employees',
  },
  {
    title: '贸易与海外业务风险管理',
    description:
      '提供进出口贸易、海外投资的合规咨询与保险安排服务。',
    image: 'https://www.spicib.com/skin/images/yewu04.jpg',
    href: '/business-overview/global',
  },
  {
    title: '科技创新与数字平台赋能',
    description:
      '以融和e保平台为核心，打造在线风险预警、投保与运维服务。',
    image: 'https://www.spicib.com/skin/images/yewu05.jpg',
    href: '/integrated-services',
  },
]

const featuredBusiness = computed(() => businesses[0])
const secondaryBusinesses = computed(() => businesses.slice(1))
</script>

<style scoped lang="scss">
.home-business {
  background-color: #fafafa;
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
    margin-bottom: 32px;
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
    background-color: #4f4c4c;
    color: #fff;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #383535;
    }
  }

  &__content {
    display: grid;
    grid-template-columns: 1.15fr 1fr;
    gap: 28px;
  }

  &__lead {
    position: relative;
    display: block;
    border-radius: 24px;
    overflow: hidden;
    height: 100%;
    min-height: 280px;
    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.18);
    text-decoration: none;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }

    &:hover img {
      transform: scale(1.05);
    }
  }

  &__overlay {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 32px;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.78) 100%);
    color: #fff;

    h3 {
      margin: 8px 0 12px;
      font-size: 26px;
    }

    p {
      margin: 0;
      font-size: 16px;
      line-height: 1.6;
      color: rgba(255, 255, 255, 0.85);
    }
  }

  &__category {
    margin: 0;
    font-size: 14px;
    letter-spacing: 0.32em;
    color: rgba(255, 255, 255, 0.7);
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  &__card {
    position: relative;
    display: block;
    min-height: 180px;
    border-radius: 18px;
    overflow: hidden;
    text-decoration: none;
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.4s ease;
    }

    &:hover img {
      transform: scale(1.05);
    }
  }

  &__card-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 24px;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.75) 100%);
    color: #fff;

    h4 {
      margin: 0 0 10px;
      font-size: 18px;
    }

    p {
      margin: 0;
      font-size: 14px;
      line-height: 1.5;
      color: rgba(255, 255, 255, 0.85);
    }
  }
}

@media (max-width: 1024px) {
  .home-business {
    padding: 48px 0;

    &__content {
      grid-template-columns: 1fr;
    }

    &__lead {
      min-height: 260px;
    }
  }
}

@media (max-width: 768px) {
  .home-business__grid {
    grid-template-columns: 1fr;
  }
}
</style>
