<template>
  <footer class="site-footer">
    <div class="site-footer__body">
      <div class="site-footer__inner">
        <div class="site-footer__visual site-footer__visual--logo">
          <img :src="footerLogo" alt="国家电投集团保险经纪有限公司" />
        </div>
        <div class="site-footer__visual site-footer__visual--qr">
          <img :src="footerQr" alt="国家电投集团保险经纪有限公司" />
        </div>

        <!-- <div class="site-footer__visual site-footer__visual--qr">
          <div class="site-footer__qr">
            <span class="site-footer__qr-image site-footer__qr-image--left" :style="qrSpriteStyle('left')" />
            <span class="site-footer__qr-caption">融和e保</span>
          </div>
          <div class="site-footer__qr">
            <span class="site-footer__qr-image site-footer__qr-image--right" :style="qrSpriteStyle('right')" />
            <span class="site-footer__qr-caption">公司公众号</span>
          </div>
        </div> -->
      </div>

      <div class="site-footer__info">
        <p class="site-footer__address">
          地址：北京市西城区金融大街28号院3楼5层　邮编：100033　电话：010-86625600
        </p>
        <div class="site-footer__divider" />
        <p class="site-footer__copyright">
          Copyright © 国家电投集团保险经纪有限公司
          <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener">
            京ICP备18064007号
          </a>
        </p>
        <p class="site-footer__links">
          <span>|</span>
          <span to="/legal" class="label">版权保护</span>
          <span>|</span>
          <span to="/privacy" class="label">隐私与安全</span>
          <span>|</span>
          <span to="/sitemap" class="label">网站导航</span>
          <span>|</span>
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import footerLogo from '~/assets/images/home/6_footlogo.jpg';
import footerQr from '~/assets/images/home/6_footwx.png';
</script>

<style scoped lang="scss">
.site-footer {
  background-color: #11a93b;
  color: #fff;
  padding: 0 0 30px;
  font-size: 14px;

  .site-footer__body {
    padding: 48px 0 26px;

    .site-footer__inner {
      width: min(1100px, 100%);
      margin: 0 auto;
      padding: 0 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 48px;
      flex-wrap: nowrap;

      .site-footer__visual {
        flex: 0 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;

        .site-footer__visual--logo {
          flex-basis: 320px;
        }

        .site-footer__visual--qr {
          flex-basis: 260px;
          display: flex;
          gap: 26px;
          align-items: flex-start;
        }
      }
    }
  }

  .site-footer__info {
    flex: 1 1 520px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    text-align: center;

    .site-footer__address {
      color: #ffffff;
      font-size: 18px;
      height: 25px;
      line-height: 25px;
    }

    .site-footer__divider {
      width: 1000px;
      max-width: 100%;
      height: 3px;
      background-color: #fff;
    }

    .site-footer__copyright {
      width: 100%;
      // height: 45px;
      // line-height: 45px;
      font-size: 18px;
      text-align: center;
      color: #ffffff;
      // padding-top: 20px;

      a {
        color: inherit;
        text-decoration: none;
      }

      a:hover {
        text-decoration: underline;
      }
    }

    .site-footer__links {
      margin-top: -10px;
      width: 100%;
      // height: 25px;
      // line-height: 25px;
      font-size: 18px;
      text-align: center;
      color: #ffffff;

      .label {
        padding: 0 10px;
      }
    }
  }
}
</style>
