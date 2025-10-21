<template>
  <footer class="site-footer">
    <div class="site-footer__body">
      <div class="site-footer__inner">
        <div class="site-footer__visual site-footer__visual--logo">
          <img :src="footerLogo" alt="国家电投集团保险经纪有限公司" />
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
            <NuxtLink to="/legal">版权保护</NuxtLink>
            <span>|</span>
            <NuxtLink to="/privacy">隐私与安全</NuxtLink>
            <span>|</span>
            <NuxtLink to="/sitemap">网站导航</NuxtLink>
          </p>
        </div>

        <div class="site-footer__visual site-footer__visual--qr">
          <div class="site-footer__qr">
            <span class="site-footer__qr-image site-footer__qr-image--left" :style="qrSpriteStyle('left')" />
            <span class="site-footer__qr-caption">融和e保</span>
          </div>
          <div class="site-footer__qr">
            <span class="site-footer__qr-image site-footer__qr-image--right" :style="qrSpriteStyle('right')" />
            <span class="site-footer__qr-caption">公司公众号</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import footerLogo from '~/assets/images/home/6_footlogo.jpg'
import footerQr from '~/assets/images/home/6_footwx.png'

const SPRITE_WIDTH = 238
const SPRITE_HEIGHT = 165
const FRAME_SIZE = 110
const offsetX = FRAME_SIZE - SPRITE_WIDTH
const offsetY = Math.round((FRAME_SIZE - SPRITE_HEIGHT) / 2)

const qrSpriteStyle = (position: 'left' | 'right') => ({
  backgroundImage: `url(${footerQr})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: `${SPRITE_WIDTH}px ${SPRITE_HEIGHT}px`,
  backgroundPosition: `${position === 'left' ? 0 : offsetX}px ${offsetY}px`,
})
</script>

<style scoped lang="scss">
.site-footer {
  background-color: #11a93b;
  color: #fff;
  padding: 0 0 30px;
  font-size: 14px;

  &__body {
    padding: 48px 0 26px;
  }

  &__inner {
    width: min(1180px, 100%);
    margin: 0 auto;
    padding: 0 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 48px;
    flex-wrap: nowrap;
  }

  &__visual {
    flex: 0 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      display: block;
      max-width: 100%;
      height: auto;
    }
  }

  &__visual--logo {
    flex-basis: 320px;

    img {
      max-width: 280px;
    }
  }

  &__visual--qr {
    flex-basis: 260px;
    display: flex;
    gap: 26px;
    align-items: flex-start;
  }

  &__qr {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    color: rgba(255, 255, 255, 0.9);
    font-size: 14px;
    letter-spacing: 0.04em;
  }

  &__qr-image {
    display: block;
    width: 110px;
    height: 110px;
    border-radius: 12px;
    background-color: #fff;
    background-repeat: no-repeat;
    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.18);
  }

  &__info {
    flex: 1 1 520px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 26px;
    text-align: center;
  }

  &__address {
    margin: 0;
    font-size: 16px;
    letter-spacing: 0.05em;
    line-height: 1.8;
  }

  &__divider {
    width: 500px;
    max-width: 100%;
    height: 2px;
    background-color: rgba(255, 255, 255, 0.78);
  }

  &__copyright {
    margin: 0;
    font-size: 15px;
    letter-spacing: 0.04em;

    a {
      color: inherit;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  &__links {
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 18px;
    font-size: 14px;

    span {
      opacity: 0.75;
    }
  }

}

@media (max-width: 1024px) {
  .site-footer {
    &__inner {
      flex-direction: column;
      align-items: center;
      gap: 32px;
    }

    &__visual {
      flex: none;
    }

    &__visual--qr {
      gap: 22px;
    }

    &__address {
      font-size: 15px;
      line-height: 1.7;
    }
    
    &__qr-image {
      width: 108px;
      height: 108px;
    }
  }
}

@media (max-width: 640px) {
  .site-footer {
    &__body {
      padding: 36px 0 22px;
    }

    &__inner {
      padding: 0 16px;
    }

    &__address,
    &__copyright {
      font-size: 14px;
      line-height: 1.6;
    }

    &__links {
      flex-wrap: wrap;
      gap: 12px;
    }

    &__visual--qr {
      gap: 16px;
      flex-wrap: wrap;
      justify-content: center;
    }

    &__qr {
      width: 100%;
      max-width: 120px;
    }

    &__qr-image {
      width: 102px;
      height: 102px;
    }
  }
}
</style>
