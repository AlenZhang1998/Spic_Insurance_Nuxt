<template>
  <DynamicPage v-bind="layout">
    <div class="announcement-page">
      <section class="announcement-board">
        <ul class="announcement-board__list">
          <li v-for="item in paginatedAnnouncements" :key="item.id" class="announcement-item">
            <div class="announcement-item__headline">
              <h3 class="announcement-item__title">
                <!-- <span class="announcement-item__bullet">»</span> -->
                {{ item.title }}
              </h3>
              <time class="announcement-item__date" :datetime="item.date">
                {{ item.date }}
              </time>
            </div>
            <div class="announcement-item__summary">
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
            v-for="page in pageNumbers"
            :key="page"
            type="button"
            class="announcement-pagination__pager"
            :class="{ 'is-active': page === currentPage }"
            @click="gotoPage(page)"
          >
            {{ page }}
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
    </div>
  </DynamicPage>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import DynamicPage from '~/components/common/DynamicPage.vue';
import { contentPageLayouts } from '~/configs/contentPages';

const layout = contentPageLayouts.announcements;
const pageSize = 10;

const announcementEntries = [
  {
    id: '20231117',
    title: '国家电力投资集团有限公司2021—2022年度董事监高责任险竞争性公告',
    summary:
      '条款号 条款名称 编列内容 邀请方 国家电力投资集团有限公司 竞争性谈判公告 方式 邀请竞争性谈判 竞争性谈判范围 国家电力投资集团有限公司2021—2022年度董事监高责任险项目。即日起开展年度合规自查工作，请相关部门根据监管要求，公司按照《自查方案》落实责任、完善资料并按时反馈情况。',
    date: '2021-01-22',
  },
  {
    id: '20210115',
    title: '国家电投集团保险经纪有限公司关于2021年保险经纪服务采购的公告',
    summary:
      '为持续提升保险经纪服务质量，现就2021年度保险经纪服务采购项目进行公告，欢迎符合条件的单位参与。',
    date: '2021-01-15',
  },
  {
    id: '20210110',
    title: '关于公开遴选合作机构的通知',
    summary:
      '本公司拟公开遴选一批合作机构，涵盖风险评估、方案设计、理赔协助等服务，请有意向的单位按照公告要求提交报名资料。',
    date: '2021-01-10',
  },
  {
    id: '20201228',
    title: '国家电投集团保险经纪有限公司2020年度财务审计服务竞争性谈判公告',
    summary:
      '根据相关管理规定，现启动2020年度财务审计服务采购工作，采用竞争性谈判方式，诚邀具有相应资质和经验的服务机构参与。',
    date: '2020-12-28',
  },
  {
    id: '20201218',
    title: '关于征集风险管理专题培训合作伙伴的公告',
    summary:
      '为进一步提升员工风险管理意识，公司拟于2021年开展专题培训活动，现面向社会公开征集培训服务供应商。',
    date: '2020-12-18',
  },
  {
    id: '20201208',
    title: '国家电投集团保险经纪有限公司关于开展合规自查的通知',
    summary:
      '即日起开展年度合规自查工作，请相关部门根据监管要求，公司按照《自查方案》落实责任、完善资料并按时反馈情况。',
    date: '2020-12-08',
  },
  {
    id: '20201130',
    title: '关于组织开展保险方案设计竞赛的公告',
    summary:
      '为激发创新活力，公司决定组织保险方案设计竞赛，欢迎各部门积极组织团队报名，优秀方案将择优在重点项目中推广应用。',
    date: '2020-11-30',
  },
  {
    id: '20201118',
    title: '国家电投集团保险经纪有限公司办公区域搬迁公告',
    summary:
      '因业务发展需要，公司办公区域将于2020年12月1日起整体搬迁至北京市西城区金融大街28号院3楼5层，请各合作单位知悉。',
    date: '2020-11-18',
  },
  {
    id: '20201102',
    title: '关于开展供应商年度评估的通知',
    summary:
      '为保证供应商服务质量，公司将组织开展2020年度供应商评估，请相关合作单位配合提供资料并参与评审。',
    date: '2020-11-02',
  },
  {
    id: '20201025',
    title: '国家电投集团保险经纪有限公司信息化系统维护公告',
    summary:
      '公司信息化系统将于2020年10月30日22:00至10月31日06:00进行升级维护，期间系统访问将受到影响，请提前做好安排。',
    date: '2020-10-25',
  },
  {
    id: '20201130',
    title: '关于组织开展保险方案设计竞赛的公告',
    summary:
      '为激发创新活力，公司决定组织保险方案设计竞赛，欢迎各部门积极组织团队报名，优秀方案将择优在重点项目中推广应用。',
    date: '2020-11-30',
  },
  {
    id: '20201118',
    title: '国家电投集团保险经纪有限公司办公区域搬迁公告',
    summary:
      '因业务发展需要，公司办公区域将于2020年12月1日起整体搬迁至北京市西城区金融大街28号院3楼5层，请各合作单位知悉。',
    date: '2020-11-18',
  },
  {
    id: '20201102',
    title: '关于开展供应商年度评估的通知',
    summary:
      '为保证供应商服务质量，公司将组织开展2020年度供应商评估，请相关合作单位配合提供资料并参与评审。',
    date: '2020-11-02',
  },
  {
    id: '20201025',
    title: '国家电投集团保险经纪有限公司信息化系统维护公告',
    summary:
      '公司信息化系统将于2020年10月30日22:00至10月31日06:00进行升级维护，期间系统访问将受到影响，请提前做好安排。',
    date: '2020-10-25',
  },
  {
    id: '20201130',
    title: '关于组织开展保险方案设计竞赛的公告',
    summary:
      '为激发创新活力，公司决定组织保险方案设计竞赛，欢迎各部门积极组织团队报名，优秀方案将择优在重点项目中推广应用。',
    date: '2020-11-30',
  },
  {
    id: '20201118',
    title: '国家电投集团保险经纪有限公司办公区域搬迁公告',
    summary:
      '因业务发展需要，公司办公区域将于2020年12月1日起整体搬迁至北京市西城区金融大街28号院3楼5层，请各合作单位知悉。',
    date: '2020-11-18',
  },
  {
    id: '20201102',
    title: '关于开展供应商年度评估的通知',
    summary:
      '为保证供应商服务质量，公司将组织开展2020年度供应商评估，请相关合作单位配合提供资料并参与评审。',
    date: '2020-11-02',
  },
  {
    id: '20201025',
    title: '国家电投集团保险经纪有限公司信息化系统维护公告',
    summary:
      '公司信息化系统将于2020年10月30日22:00至10月31日06:00进行升级维护，期间系统访问将受到影响，请提前做好安排。',
    date: '2020-10-25',
  },
];

const announcements = ref(announcementEntries);
const currentPage = ref(1);

const totalPages = computed(() => Math.max(1, Math.ceil(announcements.value.length / pageSize)));

const paginatedAnnouncements = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return announcements.value.slice(start, start + pageSize);
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

const gotoPage = (page) => {
  if (page < 1 || page > totalPages.value || page === currentPage.value) {
    return;
  }
  currentPage.value = page;
};

const gotoFirst = () => gotoPage(1);
const gotoLast = () => gotoPage(totalPages.value);
const gotoPrev = () => gotoPage(currentPage.value - 1);
const gotoNext = () => gotoPage(currentPage.value + 1);

watch(
  () => announcements.value.length,
  () => {
    if (currentPage.value > totalPages.value) {
      currentPage.value = totalPages.value;
    }
  },
);

useHead({
  title: '公示公告_国家电投集团保险经纪有限公司',
});
</script>

<style lang="scss">
.announcement-page {
  display: flex;
  flex-direction: column;
  gap: 32px;

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
}

// @media (max-width: 768px) {
//   .announcement-page {
//     .announcement-board {
//       padding: 24px 16px;

//       .announcement-item {
//         padding: 20px 0;

//         .announcement-item__headline {
//           flex-direction: column;
//           align-items: flex-start;

//           .announcement-item__date {
//             margin-top: 8px;
//           }
//         }
//       }

//       .announcement-pagination {
//         justify-content: flex-start;
//       }
//     }
//   }
// }
</style>
