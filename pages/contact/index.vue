<template>
  <DynamicPage v-bind="layout">
    <div class="content-page__rich-text">
      <div class="contact-card">
        <!-- <h3 class="contact-card__title">联系我们</h3>
        <div class="contact-card__line"></div> -->

        <dl class="contact-list">
          <div class="contact-list__row">
            <dt>地址：</dt>
            <dd>北京市西城区金融大街28号院3号楼5层</dd>
          </div>
          <div class="contact-list__row">
            <dt>邮编：</dt>
            <dd>100033</dd>
          </div>
          <div class="contact-list__row">
            <dt>电话：</dt>
            <dd>010-86625600</dd>
          </div>
          <div class="contact-list__row">
            <dt>微信公众号：</dt>
            <dd>国家电投保险经纪</dd>
          </div>
          <div class="contact-list__row">
            <dt>监督举报电话：</dt>
            <dd>010-86625631</dd>
          </div>
        </dl>

        <div class="contact-sections">
          <div class="contact-section">
            <span>统保业务部/产权经纪业务部：</span>
            <span>董 柄：010-86625636</span>
          </div>

          <div class="contact-section">
            <span>再保险经纪业务部：</span>
            <span>谢 丹：010-86625675</span>
          </div>

          <div class="contact-section">
            <span>创新业务部：</span>
            <span>戚云龙：010-86625662</span>
          </div>

          <div class="contact-section">
            <span>青海分公司：</span>
            <span>胡麦文赫：0971-3580582</span>
          </div>
        </div>
      </div>
    </div>
  </DynamicPage>
</template>

<script setup>
import DynamicPage from '~/components/common/DynamicPage.vue';
import { contentPageLayouts } from '~/configs/contentPages';

const layout = contentPageLayouts.contact;

useHead({
  title: '联系我们_国家电投集团保险经纪有限公司',
});
</script>

<style scoped>
.contact-card {
  padding: 14px 32px;
  border-radius: 4px;
  background: #fff;
}

.contact-list {
  margin: 0;
  padding: 0;
}

.contact-list__row {
  display: flex;
  align-items: baseline;
}

.contact-list dt {
  margin: 0;
  font-weight: 600;
  color: #000;
  font-size: 18px;
  line-height: 2.5;
}

.contact-list dd {
  margin: 0;
  color: #000;
  font-size: 18px;
  line-height: 2.5;
  font-weight: 600;
}

.contact-sections {
  margin-top: 52px;
}

.contact-section + .contact-section {
  margin-top: 46px;
}

.contact-section span {
  display: block;
  margin: 14px 0;
  font-size: 18px;
  font-weight: 600;
  color: #000;
  font-family: 宋体;
}
</style>
