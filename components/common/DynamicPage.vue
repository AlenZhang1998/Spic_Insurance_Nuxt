<template>
  <div class="content-page">
    <!-- 顶部横幅 -->
    <section v-if="bannerSrc" class="content-page__banner">
      <img :src="bannerSrc" :alt="bannerAlt" />
    </section>

    <!-- 面包屑 -->
    <nav v-if="computedBreadcrumb.length" class="content-page__breadcrumb">
      <NuxtLink
        v-for="(crumb, index) in computedBreadcrumb"
        :key="`${crumb.to}-${index}`"
        :to="crumb.to"
        @click="handleBreadcrumbClick(crumb, $event)"
      >
        {{ crumb.label }}
      </NuxtLink>
    </nav>

    <!-- 主体 -->
    <div class="content-page__body">
      <div class="row">
        <aside v-if="sidebar" class="content-page__sidebar">
          <h3 v-if="sidebar.title" class="content-page__sidebar-title">
            {{ sidebar.title }}
          </h3>

          <div v-if="sidebarMenu.length" class="content-page__menu">
            <NuxtLink
              v-for="item in sidebarMenu"
              :key="item.to || item.label"
              :to="item.to"
              class="content-page__menu-item"
              :class="{ 'is-active': isActive(item.to) }"
            >
              {{ item.label }}
            </NuxtLink>
          </div>

          <div v-if="sidebarContact" class="content-page__contact">
            <h4 v-if="sidebarContact.title" class="content-page__contact-title">
              {{ sidebarContact.title }}
            </h4>
            <ul class="content-page__ul">
              <li v-for="info in sidebarContact.items" :key="info.label">
                <span class="content-page__contact-label">{{ info.label }}：</span>
                <span class="content-page__contact-value">{{ info.value }}</span>
              </li>
            </ul>
          </div>
        </aside>

        <section class="content-page__main">
          <div v-if="headerTitle || $slots.header" class="content-page__header">
            <slot name="header">
              <h3 v-if="headerTitle" class="content-page__title">{{ headerTitle }}</h3>
            </slot>
          </div>
          <slot />
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { resolveAssetPath } from '@/utils/assets';
import { reloadNuxtApp } from '#app';

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  breadcrumb: {
    type: Array,
    default: () => [],
  },
  sidebar: {
    type: Object,
    default: null,
  },
  bannerImage: {
    type: String,
    default: '',
  },
  bannerAlt: {
    type: String,
    default: '',
  },
});

const route = useRoute();
const router = useRouter();

const bannerSrc = computed(() => {
  const override = activeMenuItem.value?.bannerImage;
  const source = override || props.bannerImage;
  return resolveAssetPath(source);
});
const baseBreadcrumb = computed(() => props.breadcrumb || []);
const sidebar = computed(() => props.sidebar);
const sidebarMenu = computed(() => sidebar.value?.menu || []);
const sidebarContact = computed(() => sidebar.value?.contact || null);
const baseTitle = computed(() => props.title);

const isActive = (target) => {
  if (!target) {
    return false;
  }
  return route.path === target || route.path.startsWith(`${target}/`);
};

const activeMenuItem = computed(() => {
  if (!sidebarMenu.value?.length) {
    return null;
  }
  return sidebarMenu.value.find((item) => isActive(item.to)) || null;
});

const computedBreadcrumb = computed(() => {
  const crumbs = baseBreadcrumb.value || [];
  if (!activeMenuItem.value || !activeMenuItem.value.to) {
    return crumbs;
  }

  const exists = crumbs.some(
    (crumb) => crumb.to === activeMenuItem.value.to || crumb.label === activeMenuItem.value.label,
  );

  if (exists) {
    return crumbs;
  }

  return [...crumbs, { label: activeMenuItem.value.label, to: activeMenuItem.value.to }];
});

const headerTitle = computed(() => activeMenuItem.value?.label || baseTitle.value);
const bannerAlt = computed(() => props.bannerAlt || headerTitle.value || '');

const resolveRoutePath = (target) => {
  if (!target) {
    return '';
  }

  if (typeof target === 'string') {
    return target;
  }

  try {
    const resolved = router.resolve(target);
    return resolved.fullPath || resolved.href || '';
  } catch {
    return '';
  }
};

const isBreadcrumbCurrent = (target) => {
  if (!target) {
    return false;
  }

  const normalizedTarget = resolveRoutePath(target);

  if (!normalizedTarget) {
    return false;
  }

  return normalizedTarget === route.fullPath || normalizedTarget === route.path;
};

const handleBreadcrumbClick = (crumb, event) => {
  if (!crumb?.to) {
    return;
  }

  if (isBreadcrumbCurrent(crumb.to)) {
    event?.preventDefault();
    reloadNuxtApp({ path: route.fullPath });
  }
};
</script>

<style scoped lang="scss">
// Remove default anchor tag styling
// a {
//   text-decoration: none;
//   color: inherit;
//   cursor: pointer;
//   outline: none;

//   &:hover,
//   &:focus,
//   &:active {
//     text-decoration: none;
//     color: inherit;
//     outline: none;
//   }
// }
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
    background-color: #fff;
    // margin-top: -1px;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .content-page__breadcrumb {
    // width: min(1200px, 100%);
    // // width: 100%;
    // margin: 0 auto;
    background: #f3f3f3 url(@/assets/images/about/small_home.png) left center no-repeat;
    padding-left: 20px;
    box-sizing: border-box;
    width: 100%;
    max-width: 1200px;
    margin: -1px auto;
    font-size: 12px;
    height: 41px;
    line-height: 40px;
    color: #2f2f2f;
    display: flex;
    align-items: center;

    a {
      text-decoration: none;
      position: relative;
      padding: 0 16px 0 0px;
      color: inherit;
      cursor: pointer;
      outline: none;
      &:hover {
        color: #ff7f32;
        cursor: pointer;
      }
    }

    a::after {
      content: '>';
      position: absolute;
      right: 4px;
      top: 50%;
      transform: translateY(-50%);
      color: #2f2f2f;
      // color: #aaa;
      &:hover {
        color: #2f2f2f;
      }
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
    .row {
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      gap: 63px;
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
            width: 5px;
            height: 5px;
            opacity: 50%;
            margin-right: 20px;
            border-right: 2px solid currentColor;
            border-top: 2px solid currentColor;
            transform: rotate(45deg);
            margin-left: 12px;
            color: #f08a2d;
          }

          // .content-page__menu-item:last-child {
          //   border-bottom: none;
          // }

          .content-page__menu-item.is-active {
            font-weight: bold;
          }
        }

        .content-page__contact {
          margin-top: 160px;
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

        .content-page__header {
          .content-page__title {
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
