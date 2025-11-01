<template>
  <DynamicPage v-bind="layout">
    <template v-if="!selectedAnnouncement">
      <div class="announcement-page">
        <ArticleList
          :items="announcements"
          :page-size="pageSize"
          :initial-page="currentPage"
          @page-change="handlePageChange"
          @select="handleSelect"
        />
      </div>
    </template>

    <template v-else>
      <DetailView
        :detail="announcementDetail"
        :loading="loading"
        :error-message="errorMessage"
        @back="resetDetail"
        class="announcement-detail"
      />
    </template>
  </DynamicPage>
</template>

<script setup>
import { ref, computed } from 'vue';
import DynamicPage from '@/components/common/DynamicPage.vue';
import ArticleList from '@/components/common/ArticleList.vue';
import DetailView from '@/components/common/DetailView.vue';
import { contentPageLayouts } from '@/configs/contentPages';

const layout = contentPageLayouts.announcements;
const pageSize = 10;
const { $axios } = useNuxtApp();

const announcementEntries = [
  {
    legacyId: '20231117',
    id: 'a-20231117',
    title: '国家电力投资集团有限公司2021—2022年度董事监高责任险竞争性公告1',
    summary:
      '条款号 条款名称 编列内容 邀请方 国家电力投资集团有限公司 竞争性谈判公告 方式 邀请竞争性谈判 竞争性谈判范围 国家电力投资集团有限公司2021—2022年度董事监高责任险项目。即日起开展年度合规自查工作，请相关部门根据监管要求，公司按照《自查方案》落实责任、完善资料并按时反馈情况。',
    date: '2021-01-22',
  },
  {
    legacyId: '20210115',
    id: 'a-20210115',
    title: '国家电投集团保险经纪有限公司关于2021年保险经纪服务采购的公告2',
    summary:
      '为持续提升保险经纪服务质量，现就2021年度保险经纪服务采购项目进行公告，欢迎符合条件的单位参与。',
    date: '2021-01-15',
  },
  {
    legacyId: '20210110',
    id: 'a-20210110',
    title: '关于公开遴选合作机构的通知3',
    summary:
      '本公司拟公开遴选一批合作机构，涵盖风险评估、方案设计、理赔协助等服务，请有意向的单位按照公告要求提交报名资料。',
    date: '2021-01-10',
  },
  {
    legacyId: '20201228',
    id: 'a-20201228',
    title: '国家电投集团保险经纪有限公司2020年度财务审计服务竞争性谈判公告4',
    summary:
      '根据相关管理规定，现启动2020年度财务审计服务采购工作，采用竞争性谈判方式，诚邀具有相应资质和经验的服务机构参与。',
    date: '2020-12-28',
  },
  {
    legacyId: '20201218',
    id: 'a-20201218',
    title: '关于征集风险管理专题培训合作伙伴的公告5',
    summary:
      '为进一步提升员工风险管理意识，公司拟于2021年开展专题培训活动，现面向社会公开征集培训服务供应商。',
    date: '2020-12-18',
  },
  {
    legacyId: '20201208',
    id: 'a-20201208',
    title: '国家电投集团保险经纪有限公司关于开展合规自查的通知6',
    summary:
      '即日起开展年度合规自查工作，请相关部门根据监管要求，公司按照《自查方案》落实责任、完善资料并按时反馈情况。',
    date: '2020-12-08',
  },
  {
    legacyId: '20201130',
    id: 'a-20201130-1',
    title: '关于组织开展保险方案设计竞赛的公告7',
    summary:
      '为激发创新活力，公司决定组织保险方案设计竞赛，欢迎各部门积极组织团队报名，优秀方案将择优在重点项目中推广应用。',
    date: '2020-11-30',
  },
  {
    legacyId: '20201118',
    id: 'a-20201118',
    title: '国家电投集团保险经纪有限公司办公区域搬迁公告8',
    summary:
      '因业务发展需要，公司办公区域将于2020年12月1日起整体搬迁至北京市西城区金融大街28号院3楼5层，请各合作单位知悉。',
    date: '2020-11-18',
  },
  {
    legacyId: '20201102',
    id: 'a-20201102-1',
    title: '关于开展供应商年度评估的通知9',
    summary:
      '为保证供应商服务质量，公司将组织开展2020年度供应商评估，请相关合作单位配合提供资料并参与评审。',
    date: '2020-11-02',
  },
  {
    legacyId: '20201025',
    id: 'a-20201025-1',
    title: '国家电投集团保险经纪有限公司信息化系统维护公告10',
    summary:
      '公司信息化系统将于2020年10月30日22:00至10月31日06:00进行升级维护，期间系统访问将受到影响，请提前做好安排。',
    date: '2020-10-25',
  },
  {
    legacyId: '20201130',
    id: 'a-20201130-2',
    title: '关于组织开展保险方案设计竞赛的公告11',
    summary:
      '为激发创新活力，公司决定组织保险方案设计竞赛，欢迎各部门积极组织团队报名，优秀方案将择优在重点项目中推广应用。',
    date: '2020-11-30',
  },
  {
    legacyId: '20201118',
    id: 'a-20201118-2',
    title: '国家电投集团保险经纪有限公司办公区域搬迁公告12',
    summary:
      '因业务发展需要，公司办公区域将于2020年12月1日起整体搬迁至北京市西城区金融大街28号院3楼5层，请各合作单位知悉。',
    date: '2020-11-18',
  },
  {
    legacyId: '20201102',
    id: 'a-20201102-2',
    title: '关于开展供应商年度评估的通知',
    summary:
      '为保证供应商服务质量，公司将组织开展2020年度供应商评估，请相关合作单位配合提供资料并参与评审。',
    date: '2020-11-02',
  },
  {
    legacyId: '20201025',
    id: 'a-20201025-2',
    title: '国家电投集团保险经纪有限公司信息化系统维护公告14',
    summary:
      '公司信息化系统将于2020年10月30日22:00至10月31日06:00进行升级维护，期间系统访问将受到影响，请提前做好安排。',
    date: '2020-10-25',
  },
  {
    legacyId: '20201130',
    id: 'a-20201130-3',
    title: '关于组织开展保险方案设计竞赛的公告15',
    summary:
      '为激发创新活力，公司决定组织保险方案设计竞赛，欢迎各部门积极组织团队报名，优秀方案将择优在重点项目中推广应用。',
    date: '2020-11-30',
  },
  {
    legacyId: '20201118',
    id: 'a-20201118-3',
    title: '国家电投集团保险经纪有限公司办公区域搬迁公告16',
    summary:
      '因业务发展需要，公司办公区域将于2020年12月1日起整体搬迁至北京市西城区金融大街28号院3楼5层，请各合作单位知悉。',
    date: '2020-11-18',
  },
  {
    legacyId: '20201102',
    id: 'a-20201102-3',
    title: '关于开展供应商年度评估的通知17',
    summary:
      '为保证供应商服务质量，公司将组织开展2020年度供应商评估，请相关合作单位配合提供资料并参与评审。',
    date: '2020-11-02',
  },
  {
    legacyId: '20201025',
    id: 'a-20201025-3',
    title: '国家电投集团保险经纪有限公司信息化系统维护公告18',
    summary:
      '公司信息化系统将于2020年10月30日22:00至10月31日06:00进行升级维护，期间系统访问将受到影响，请提前做好安排。',
    date: '2020-10-25',
  },
];

const announcements = ref(announcementEntries);
const currentPage = ref(1);
const selectedAnnouncement = ref(null);
const announcementDetail = ref(null);
const loading = ref(false);
const errorMessage = ref('');

const handlePageChange = (page) => {
  currentPage.value = page;
  resetDetail();
};

const handleSelect = async (item) => {
  if (!item || !item.id) {
    return;
  }
  selectedAnnouncement.value = item;
  await fetchDetail(item.id);
};

const resetDetail = () => {
  selectedAnnouncement.value = null;
  announcementDetail.value = null;
  errorMessage.value = '';
};

const fetchDetail = async (id) => {
  loading.value = true;
  errorMessage.value = '';
  announcementDetail.value = null;

  try {
    const { data } = await $axios.get(`/api/announcements/${id}`);
    announcementDetail.value = data;
  } catch (err) {
    console.error('加载公告详情失败：', err);
    errorMessage.value = '暂时无法获取公告详情，请稍后重试。';
  } finally {
    loading.value = false;
  }
};

const pageTitle = computed(() => {
  // if (selectedAnnouncement.value && announcementDetail.value?.title) {
  //   return `${announcementDetail.value.title}_国家电投集团保险经纪有限公司`;
  // }
  return '公示公告_国家电投集团保险经纪有限公司';
});

useHead(() => ({
  title: pageTitle.value,
}));
</script>

<style lang="scss">
.announcement-page {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
</style>
