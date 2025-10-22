<template>
  <div class="content-page">
    <div v-if="pending" class="content-page__state">页面加载中...</div>
    <div v-else-if="error" class="content-page__state content-page__state--error">
      页面加载失败，请稍后重试。
    </div>
    <template v-else-if="page">
      <section v-if="bannerSrc" class="content-page__banner">
        <img :src="bannerSrc" :alt="page.bannerAlt || page.content?.title || ''" />
      </section>

      <nav v-if="page.breadcrumb && page.breadcrumb.length" class="content-page__breadcrumb">
        <NuxtLink
          v-for="(crumb, index) in page.breadcrumb"
          :key="`${crumb.to}-${index}`"
          :to="crumb.to"
        >
          {{ crumb.label }}
        </NuxtLink>
      </nav>

      <div class="content-page__body">
        <aside v-if="page.sidebar" class="content-page__sidebar">
          <h3 class="content-page__sidebar-title">{{ page.sidebar.title }}</h3>
          <div v-if="page.sidebar.menu && page.sidebar.menu.length" class="content-page__menu">
            <NuxtLink
              v-for="item in page.sidebar.menu"
              :key="item.to"
              :to="item.to"
              class="content-page__menu-item"
              :class="{ 'is-active': isActive(item.to) }"
            >
              {{ item.label }}
            </NuxtLink>
          </div>

          <div v-if="page.sidebar.contact" class="content-page__contact">
            <h4 class="content-page__contact-title">{{ page.sidebar.contact.title }}</h4>
            <ul>
              <li v-for="info in page.sidebar.contact.items" :key="info.label">
                <span class="content-page__contact-label">{{ info.label }}：</span>
                <span class="content-page__contact-value">{{ info.value }}</span>
              </li>
            </ul>
          </div>
        </aside>

        <section class="content-page__main">
          <header v-if="page.content?.title" class="content-page__header">
            <h1>{{ page.content.title }}</h1>
          </header>

          <div class="content-page__blocks">
            <template v-for="(block, index) in page.content?.blocks || []" :key="index">
              <div
                v-if="block.type === 'rich-text'"
                class="content-page__rich-text"
                v-html="block.html"
              />

              <figure v-else-if="block.type === 'image'" class="content-page__image-block">
                <img :src="resolveAsset(block.src)" :alt="block.alt || ''" />
                <figcaption v-if="block.caption">{{ block.caption }}</figcaption>
              </figure>

              <div
                v-else-if="block.type === 'list'"
                class="content-page__list-block"
              >
                <h3 v-if="block.title">{{ block.title }}</h3>
                <ul>
                  <li v-for="item in block.items" :key="item">{{ item }}</li>
                </ul>
              </div>
            </template>
          </div>
        </section>
      </div>
    </template>
  </div>
</template>

<script setup>
const props = defineProps({
  slug: {
    type: String,
    required: true,
  },
})

const route = useRoute()

const { data, pending, error } = await useAsyncData(
  `page-config-${props.slug}`,
  () => $fetch(`/api/pages/${props.slug}`),
)

const page = computed(() => data.value || null)

const assetModules = import.meta.glob('@/assets/**/*', {
  eager: true,
  import: 'default',
})

const assetMap = {}
Object.entries(assetModules).forEach(([key, value]) => {
  const normalized = key
    .replace(/^.*[\\/]assets[\\/]/, '')
    .replace(/\\/g, '/')
  assetMap[normalized] = value
})

const resolveAsset = (path) => {
  if (!path) {
    return ''
  }
  if (path.startsWith('http') || path.startsWith('/')) {
    return path
  }
  return assetMap[path] || ''
}

const bannerSrc = computed(() => resolveAsset(page.value?.bannerImage))

const isActive = (target) => {
  if (!target) {
    return false
  }
  return route.path === target || route.path.startsWith(`${target}/`)
}
</script>

<style scoped lang="scss">
.content-page {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-bottom: 64px;

  .content-page__state {
    text-align: center;
    padding: 80px 0;
    color: #666;
    font-size: 16px;
  }

  .content-page__state--error {
    color: #c60c1a;
  }

  .content-page__banner {
    // width: 100%;
    // max-height: 280px;
    // overflow: hidden;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .content-page__breadcrumb {
    width: min(1200px, 100%);
    margin: 0 auto;
    padding: 12px 24px;
    font-size: 14px;
    color: #666;

    a {
      color: #666;
      text-decoration: none;
      position: relative;
      padding-right: 20px;
    }

    a::after {
      content: '>';
      position: absolute;
      right: 6px;
      top: 50%;
      transform: translateY(-50%);
      color: #aaa;
    }

    a:last-child {
      color: #c60c1a;
      font-weight: 600;
    }

    a:last-child::after {
      display: none;
    }
  }

  .content-page__body {
    width: min(1200px, 100%);
    margin: 0 auto;
    display: grid;
    grid-template-columns: 280px 1fr;
    gap: 48px;
    padding: 0 24px;
  }

  .content-page__sidebar {
    background-color: #f5f5f5;
    padding: 32px 28px;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  .content-page__sidebar-title {
    margin: 0;
    font-size: 22px;
    letter-spacing: 0.08em;
    color: #111;
    position: relative;
    padding-left: 12px;
  }

  .content-page__sidebar-title::before {
    content: '';
    position: absolute;
    left: 0;
    top: 6px;
    width: 4px;
    height: 18px;
    background-color: #c60c1a;
    border-radius: 2px;
  }

  .content-page__menu {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .content-page__menu-item {
    display: block;
    padding: 10px 12px;
    border-radius: 8px;
    background-color: #fff;
    color: #444;
    text-decoration: none;
    font-size: 16px;
    transition: background-color 0.2s ease, color 0.2s ease;
    border: 1px solid transparent;
  }

  .content-page__menu-item:hover {
    border-color: rgba(198, 12, 26, 0.4);
    color: #c60c1a;
  }

  .content-page__menu-item.is-active {
    border-color: #c60c1a;
    color: #c60c1a;
    font-weight: 600;
  }

  .content-page__contact {
    background-color: #fff;
    border-radius: 8px;
    padding: 20px 18px;
    border: 1px solid rgba(0, 0, 0, 0.06);

    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 12px;
      font-size: 15px;
      color: #333;
    }
  }

  .content-page__contact-title {
    margin: 0 0 16px;
    font-size: 18px;
    letter-spacing: 0.08em;
  }

  .content-page__contact-label {
    display: inline-block;
    width: 64px;
    color: #666;
  }

  .content-page__contact-value {
    color: #111;
  }

  .content-page__main {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .content-page__header h1 {
    margin: 0;
    font-size: 30px;
    letter-spacing: 0.08em;
    color: #111;
  }

  .content-page__blocks {
    display: flex;
    flex-direction: column;
    gap: 24px;
    font-size: 16px;
    line-height: 1.9;
    color: #444;
  }

  .content-page__rich-text {
    display: flex;
    flex-direction: column;
    gap: 16px;

    :deep(h2) {
      margin: 0;
      font-size: 28px;
      text-align: center;
      color: #111;
      letter-spacing: 0.08em;
    }

    :deep(p) {
      margin: 0;
      text-indent: 2em;
    }

    :deep(p.align-center) {
      text-align: center;
      text-indent: 0;
    }
  }

  .content-page__image-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;

    img {
      width: min(640px, 100%);
      border-radius: 12px;
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
    }

    figcaption {
      font-size: 14px;
      color: #666;
    }
  }

  .content-page__list-block {
    background-color: #f7f7f7;
    border-radius: 12px;
    padding: 24px;

    h3 {
      margin: 0 0 12px;
      font-size: 20px;
      color: #c60c1a;
    }

    ul {
      list-style: disc;
      margin: 0;
      padding-left: 20px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  }
}

@media (max-width: 960px) {
  .content-page {
    .content-page__body {
      grid-template-columns: 1fr;
    }

    .content-page__sidebar {
      order: 2;
    }
  }
}
</style>
