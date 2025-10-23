<template>
  <div class="layout-default">
    <header class="site-header">
      <div class="header-primary">
        <div class="container header-main">
          <NuxtLink to="/" class="brand">
            <img
              v-if="logoSrc"
              :src="logoSrc"
              alt="SPIC Insurance Brokers"
              class="brand__logo"
              width="389"
              height="124"
            />
          </NuxtLink>

          <div class="header-actions">
            <div class="header-meta__date">{{ formattedDate }}</div>
            <form class="search" @submit.prevent="onSearch">
              <label class="visually-hidden" for="global-search-input">站内搜索</label>
              <input
                id="global-search-input"
                v-model="searchQuery"
                class="search__input"
                type="search"
                placeholder="请输入关键字"
              />
              <button class="search__button" type="submit">
                <span class="search__icon" aria-hidden="true"></span>
                <span class="visually-hidden">搜索</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      <nav class="menu-bar">
        <div class="container menu-bar__inner">
          <span v-if="navPending" class="menu-bar__loading">菜单加载中…</span>
          <template v-else>
            <NuxtLink
              v-for="item in navItems"
              :key="item.to"
              :to="item.to"
              class="menu-bar__item"
              :class="{ 'is-active': isActive(item.to) }"
            >
              {{ item.label }}
            </NuxtLink>
          </template>
        </div>
      </nav>
    </header>

    <main class="page-content">
      <slot />
    </main>

    <SiteFooter />
  </div>
</template>

<script setup>
import logoAsset from '~/assets/images/image.png'
import SiteFooter from '~/components/common/SiteFooter.vue'

const route = useRoute()
const router = useRouter()

const { data: navData, pending: navPending } = await useAsyncData('navigation', () =>
  $fetch('/api/navigation'),
)

const navItems = computed(() => navData.value ?? [])

const logoSrc = logoAsset
const searchQuery = ref('')

const isActive = (path) => {
  if (path === '/') {
    return route.path === '/'
  }
  return route.path === path || route.path.startsWith(`${path}/`)
}

const formattedDate = computed(() => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const weekday = now.toLocaleDateString('zh-CN', { weekday: 'long' })
  return `${year}年${month}月${day}日 ${weekday}`
})

const onSearch = () => {
  if (!searchQuery.value.trim()) {
    return
  }
  router.push({
    path: '/search',
    query: { q: searchQuery.value.trim() },
  })
}
</script>

<style scoped lang="scss">
.layout-default {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  background-color: #f5f5f5;
}

.site-header {
  z-index: 1000;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.container {
  width: min(1200px, 100%);
  margin: 0 auto;
  padding: 0 16px;
}

.header-primary {
  background-color: #fff;
  padding-bottom: 4px;
  // padding: 24px 0 20px;
  // box-shadow: 0 1px 0 rgba(0, 0, 0, 0.06);
}

.header-main {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  padding: 0;
  width: min(1030px, 100%);
  margin: 0 auto;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 0;
  text-decoration: none;
  margin: 0;

  &__logo {
    // width: 350px;
    // height: auto;
    max-width: 100%;
    object-fit: contain;
  }
}

.header-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;
}

.header-meta__date {
  font-size: 15px;
  color: #404040;
}

.search {
  display: inline-flex;
  align-items: center;
  border: 1px solid #dfdfdf;
  border-radius: 18px;
  background-color: #f4f4f4;
  overflow: hidden;
  height: 34px;
  padding-left: 14px;
  min-width: 240px;

  &__input {
    flex: 1 0 auto;
    width: 100%;
    padding: 0;
    border: none;
    outline: none;
    font-size: 14px;
    background-color: transparent;
    color: #666;
  }

  &__button {
    height: 100%;
    width: 44px;
    padding: 0;
    background-color: transparent;
    color: #999;
    border: none;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
  }

  &__icon {
    position: relative;
    display: inline-block;
    width: 14px;
    height: 14px;
    border: 2px solid currentColor;
    border-radius: 50%;

    &::after {
      content: '';
      position: absolute;
      right: -4px;
      bottom: -4px;
      width: 6px;
      height: 2px;
      border-radius: 1px;
      background-color: currentColor;
      transform: rotate(45deg);
      transform-origin: center;
    }
  }
}

.menu-bar {
  background-color: #c60c1a;
  padding: 28px 0 32px;
}

.menu-bar__inner {
  display: flex;
  justify-content: center;
  gap: 0;
}

.menu-bar__loading {
  color: #ffe5e5;
  font-size: 16px;
  letter-spacing: 0.08em;
}

.menu-bar__item {
  position: relative;
  color: #fff;
  font-size: 18px;
  text-decoration: none;
  padding: 0 24px;
  letter-spacing: 0.08em;

  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 2px;
    height: 20px;
    background-color: #e5e5e5;
  }

  &:last-child::after {
    display: none;
  }

  &.is-active {
    // font-weight: 700;
  }

  &:hover {
    color: #ffe5e5;
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
  border: 0;
}

.page-content {
  flex: 1;
  // padding: 0 0 48px;
}

@media (max-width: 1024px) {
  .body {
    background-color: #fff;
  }

  .search {
    width: 100%;
    padding-left: 12px;
    min-width: 0;
    margin-left: 0;

    &__input {
      flex: 1;
      width: 100%;
    }
  }

  .header-main {
    flex-direction: column;
    gap: 16px;
    align-items: center;
    width: 100%;
  }

  .header-actions {
    width: 100%;
    align-items: stretch;
    gap: 12px;
  }

  .header-meta__date {
    text-align: center;
  }

  .menu-bar__inner {
    flex-wrap: wrap;
    gap: 12px;
    justify-content: center;
  }
}
</style>
