<template>
  <section class="announcement-board">
    <ul class="announcement-board__list">
      <li v-for="item in paginatedItems" :key="item.id || item.title" class="announcement-item">
        <div class="announcement-item__headline">
          <h3 class="announcement-item__title">
            {{ item.title }}
          </h3>
          <time v-if="item.date" class="announcement-item__date" :datetime="item.date">
            {{ item.date }}
          </time>
        </div>
        <div v-if="item.summary" class="announcement-item__summary">
          <p>{{ item.summary }}</p>
        </div>
      </li>
    </ul>

    <div v-if="totalPages > 1" class="announcement-pagination">
      <button
        type="button"
        class="announcement-pagination__button"
        :disabled="currentPage === 1"
        @click="gotoFirst"
      >
        首页
      </button>
      <button
        type="button"
        class="announcement-pagination__button"
        :disabled="currentPage === 1"
        @click="gotoPrev"
      >
        上一页
      </button>

      <button
        v-for="pageNumber in pageNumbers"
        :key="pageNumber"
        type="button"
        class="announcement-pagination__pager"
        :class="{ 'is-active': pageNumber === currentPage }"
        @click="gotoPage(pageNumber)"
      >
        {{ pageNumber }}
      </button>

      <button
        type="button"
        class="announcement-pagination__button"
        :disabled="currentPage === totalPages"
        @click="gotoNext"
      >
        下一页
      </button>
      <button
        type="button"
        class="announcement-pagination__button"
        :disabled="currentPage === totalPages"
        @click="gotoLast"
      >
        末页
      </button>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  pageSize: {
    type: Number,
    default: 10,
  },
  initialPage: {
    type: Number,
    default: 1,
  },
});

const emit = defineEmits(['page-change']);

const currentPage = ref(Math.max(1, props.initialPage));

const totalPages = computed(() => {
  if (!props.items?.length) {
    return 1;
  }
  return Math.ceil(props.items.length / props.pageSize);
});

const paginatedItems = computed(() => {
  if (!props.items?.length) {
    return [];
  }
  const start = (currentPage.value - 1) * props.pageSize;
  return props.items.slice(start, start + props.pageSize);
});

const pageNumbers = computed(() => {
  const total = totalPages.value;
  const current = currentPage.value;

  if (total <= 5) {
    return Array.from({ length: total }, (_, index) => index + 1);
  }

  let start = current - 2;
  let end = current + 2;

  if (start < 1) {
    start = 1;
    end = start + 4;
  }

  if (end > total) {
    end = total;
    start = end - 4;
  }

  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
});

const updatePage = (page) => {
  if (page < 1 || page > totalPages.value || page === currentPage.value) {
    return;
  }
  currentPage.value = page;
  emit('page-change', page);
};

const gotoPage = (page) => updatePage(page);
const gotoFirst = () => updatePage(1);
const gotoLast = () => updatePage(totalPages.value);
const gotoPrev = () => updatePage(currentPage.value - 1);
const gotoNext = () => updatePage(currentPage.value + 1);

watch(
  () => props.items.length,
  () => {
    const maxPage = totalPages.value;
    if (currentPage.value > maxPage) {
      currentPage.value = maxPage;
    }
    if (currentPage.value < 1) {
      currentPage.value = 1;
    }
  },
  { immediate: true },
);

watch(
  () => props.initialPage,
  (value) => {
    if (!value) {
      return;
    }
    const limited = Math.min(totalPages.value, Math.max(1, value));
    if (limited !== currentPage.value) {
      currentPage.value = limited;
    }
  },
);
</script>

<style lang="scss">
.announcement-board {
  background-color: #fff;
  // border: 1px solid #f5c09f;
  // padding: 20px 0;
  // box-shadow: 0 12px 30px -24px rgba(0, 0, 0, 0.25);

  .announcement-board__list {
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      border-bottom: 1px dotted #d8d8d8;
      padding: 20px 0;
    }

    .announcement-item {
      .announcement-item__headline {
        display: flex;
        justify-content: space-between;
        // align-items: flex-start;
        align-items: center;
        // gap: 16px;
        overflow: hidden;
        margin-bottom: 20px;
        height: 30px;
        line-height: 30px;

        .announcement-item__title {
          // display: inline-flex;
          // align-items: flex-start;
          display: block;
          // gap: 8px;
          font-size: 16px;
          padding-left: 14px;
          margin: 0;
          // font-weight: 600;
          color: #444;
          // line-height: 1.5;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          background: url(@/assets/images/about/icon14.png) left center no-repeat;
          &:hover {
            color: #ff7f32;
            cursor: pointer;
          }
        }

        .announcement-item__date {
          font-size: 16px;
          color: #333;
          flex-shrink: 0;
        }
      }

      .announcement-item__summary {
        padding: 15px 0;
        line-height: 32px;
        color: #2f2f2f;
        font-size: 16px;
        p {
          margin: 0;
          font-size: 16px;
          line-height: 24px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
      }
    }
  }

  .announcement-pagination {
    margin-top: 24px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
    align-items: center;

    .announcement-pagination__button,
    .announcement-pagination__pager {
      min-width: 32px;
      height: 30px;
      line-height: 24px;
      padding: 2 12px;
      border: 1px solid #ccc;
      background-color: #fff;
      color: #808080;
      font-size: 12px;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    // .announcement-pagination__pager {
    //   min-width: 40px;
    // }

    .announcement-pagination__button:disabled {
      cursor: not-allowed;
      color: #bbb;
      border-color: #ededed;
      background-color: #f8f8f8;
    }

    .announcement-pagination__button:not(:disabled):hover,
    .announcement-pagination__pager:hover {
      border-color: #e30709;
      color: #e30709;
    }

    .announcement-pagination__pager.is-active {
      border-color: #e30709;
      background-color: #e30709;
      color: #fff;
    }
  }
}
</style>
