<template>
  <div class="content-page">
    <div v-if="pending" class="content-page__state">页面加载中...</div>
    <div v-else-if="error" class="content-page__state content-page__state--error">
      页面加载失败，请稍后重试。
    </div>
    <template v-else-if="page">
      <!-- 图片部分 -->
      <section v-if="bannerSrc" class="content-page__banner">
        <img :src="bannerSrc" :alt="page.bannerAlt || page.content?.title || ''" />
      </section>

      <!-- 面包屑部分 -->
      <nav v-if="page.breadcrumb && page.breadcrumb.length" class="content-page__breadcrumb">
        <NuxtLink
          v-for="(crumb, index) in page.breadcrumb"
          :key="`${crumb.to}-${index}`"
          :to="crumb.to"
        >
          {{ crumb.label }}
        </NuxtLink>
      </nav>

      <!-- 下部内容部分 -->
      <div class="content-page__body">
        <div class="row">
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
              <ul class="content-page__ul">
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
                />

                <figure v-else-if="block.type === 'image'" class="content-page__image-block">
                  <!-- <img :src="resolveAsset(block.src)" :alt="block.alt || ''" /> -->
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
  // gap: 24px;
  // padding: 0 0 80px;
  // background-color: #fff;

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
    img {
      width: 100%;
      height: 100%;
    }
  }

  .content-page__breadcrumb {
    // width: min(1200px, 100%);
    // // width: 100%;
    // margin: 0 auto;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    font-size: 12px;
    height: 38px;
    line-height: 40px;
    background: #f3f3f3;
    color: #2f2f2f;

    a {
      // color: #666;
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
      // color: #aaa;
    }

    a:last-child {
      // color: #c60c1a;
      // font-weight: 600;
    }

    a:last-child::after {
      display: none;
    }
  }

  .content-page__body {
    background-color: #fff;
    // max-width: 1200px;
    //   margin: 0 auto;
    .row{
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      gap: 36px;
      padding: 20px 0 56px;
      background-color: #fff;
      .content-page__sidebar {
        width: 338px;
        // padding: 24px 22px 28px;
        // border: 1px solid #e4e7ed;
        // border-radius: 6px;
        display: flex;
        flex-direction: column;
        // gap: 28px;
        

        .content-page__sidebar-title {
          height: 44px;
          line-height: 44px;
          font-size: 20px;
          color: #545454;
          border-bottom: 1px solid #ebebeb;
          font-weight: normal;
          position: relative;
          margin: 0;
        }

        .content-page__sidebar-title::after {
          content: '';
          width: 80px;
          height: 1px;
          background: #f79646;
          position: absolute;
          left: 0;
          bottom: -1px;
        }

        .content-page__menu {
          // border: 1px solid #f2f2f2;
          // border-radius: 6px;
          // overflow: hidden;
          width: 100%;
          padding-top: 12px;
          // margin-bottom: 20px;

          .content-page__menu-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            // padding: 14px 18px;
            // font-size: 15px;
            // color: #555;
            text-decoration: none;
            // background-color: #fff;
            // border-bottom: 1px solid #f2f2f2;
            // transition: color 0.2s ease, background-color 0.2s ease;
            line-height: 44px;
            // text-indent: 20px;
            background-size: auto 10px;
            border-bottom: 1px solid #f2f2f2;
            width: 100%;
            float: left;
            color: #666;
            font-size: 16px;
            text-indent: 0;
            padding-left: 5px;
          }

          .content-page__menu-item::after {
            content: '';
            width: 6px;
            height: 6px;
            margin-right: 15px;
            border-right: 2px solid currentColor;
            border-top: 2px solid currentColor;
            transform: rotate(45deg);
            margin-left: 12px;
            color: #f08a2d;
          }

          // .content-page__menu-item:last-child {
          //   border-bottom: none;
          // }

          .content-page__menu-item.is-active,
          .content-page__menu-item:hover {
            // color: #f08a2d;
            // background-color: rgba(240, 138, 45, 0.08);
          }
        }

        .content-page__contact {
          margin-top: 150px;
          // padding: 22px 20px;
          background-color: #fff;

          .content-page__contact-title {
            height: 44px;
            line-height: 44px;
            font-size: 20px;
            color: #545454;
            border-bottom: 1px solid #ebebeb;
            font-weight: normal;
            position: relative;
            margin: 0;
            &::after {
              content: '';
              width: 80px;
              height: 1px;
              background: #f79646;
              position: absolute;
              left: 0;
              bottom: -1px;
            }
          }

          .content-page__ul {
            list-style: none;
            margin: 0;
            padding: 13px 0;
            // display: flex;
            // flex-direction: column;
            // gap: 10px;
            // font-size: 15px;
            // color: #444;
            li {
              display: inline-table;
              // float: left;
              width: 100%;
              height: 34px;
              line-height: 34px;
              font-size: 16px;
            }
          }

          .content-page__contact-label {
            float: left;
            width: 20%;
          }

          .content-page__contact-value {
            width: 80%;
            overflow: hidden;
          }
        }
      }

      .content-page__main {
        flex: 1;
        display: flex;
        flex-direction: column;

        .content-page__main-card {
          background-color: #fff;
          border: 1px solid #f0f2f5;
          border-radius: 6px;
          padding: 36px 46px 40px;

          .content-page__header {
            position: relative;
            margin-bottom: 28px;
            padding-bottom: 18px;
            text-align: left;

            h1 {
              margin: 0;
              font-size: 24px;
              letter-spacing: 0.04em;
              color: #222;
            }
          }

          .content-page__header::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 72px;
            height: 2px;
            background-color: #f08a2d;
          }

          .content-page__blocks {
            display: flex;
            flex-direction: column;
            gap: 24px;
            font-size: 16px;
            line-height: 2;
            color: #444;

            .content-page__rich-text {
              display: flex;
              flex-direction: column;
              gap: 18px;

              :deep(h2) {
                margin: 0;
                font-size: 24px;
                text-align: center;
                color: #111;
                letter-spacing: 0.04em;
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
              gap: 16px;

              // img {
              //   max-width: 100%;
              //   border-radius: 4px;
              //   // box-shadow: 0 10px 18px rgba(0, 0, 0, 0.08);
              // }

              // figcaption {
              //   font-size: 14px;
              //   color: #888;
              // }
            }

            .content-page__list-block {
              background-color: #f9f9f9;
              border-radius: 6px;
              padding: 20px 24px;

              h3 {
                margin: 0 0 12px;
                font-size: 18px;
                color: #f18c2f;
              }

              ul {
                list-style: disc;
                padding-left: 20px;
                margin: 0;
                display: flex;
                flex-direction: column;
                gap: 10px;
              }
            }
          }
        }
      }
    }
  }
}

// @media (max-width: 960px) {
//   .content-page {
//     padding: 0 16px 48px;

//     .content-page__body {
//       flex-direction: column;
//       padding: 28px 20px 32px;
//       gap: 24px;

//       .content-page__sidebar {
//         order: 2;
//         width: 100%;
//       }

//       .content-page__main {
//         .content-page__main-card {
//           padding: 28px 22px;
//         }
//       }
//     }
//   }
// }
</style>


