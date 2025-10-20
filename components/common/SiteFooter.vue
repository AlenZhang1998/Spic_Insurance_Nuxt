<template>
  <footer class="site-footer">
    <div class="site-footer__container">
      <div class="site-footer__primary">
        <div class="site-footer__brand">
          <img
            src="https://www.spicib.com/skin/images/logo.png"
            alt="国家电投集团保险经纪有限公司"
            class="site-footer__logo"
          />
          <p>
            国家电投集团保险经纪有限公司坚持“打造一流保险经纪平台”目标，立足集团、服务集团、开放赋能，提供全方位风险管理与保险经纪服务。
          </p>
        </div>
        <div class="site-footer__links">
          <div class="site-footer__column">
            <h3>快速导航</h3>
            <ul>
              <li><NuxtLink to="/">首页</NuxtLink></li>
              <li><NuxtLink to="/about">关于我们</NuxtLink></li>
              <li><NuxtLink to="/news">新闻中心</NuxtLink></li>
              <li><NuxtLink to="/business-overview">业务概览</NuxtLink></li>
            </ul>
          </div>
          <div class="site-footer__column">
            <h3>信息披露</h3>
            <ul>
              <li><NuxtLink to="/disclosure">信息披露</NuxtLink></li>
              <li><NuxtLink to="/integrated-services">融和e保</NuxtLink></li>
              <li><NuxtLink to="/announcements">公示公告</NuxtLink></li>
              <li><NuxtLink to="/contact">联系我们</NuxtLink></li>
            </ul>
          </div>
          <div class="site-footer__column">
            <h3>联系方式</h3>
            <ul>
              <li>地址：北京市西城区金融大街28号院3楼5层</li>
              <li>邮编：100033</li>
              <li>电话：010-86625600</li>
              <li>邮箱：service@spicib.com</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="site-footer__legal">
        <p>
          Copyright ©
          <span>国家电投集团保险经纪有限公司</span>
          <a
            href="https://beian.miit.gov.cn/"
            target="_blank"
            rel="noopener"
          >
            京ICP备18064007号
          </a>
          |
          <NuxtLink to="/legal">版权保护</NuxtLink>
          |
          <NuxtLink to="/privacy">隐私与安全</NuxtLink>
          |
          <NuxtLink to="/sitemap">网站导航</NuxtLink>
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.site-footer {
  background-color: #141414;
  color: #d9d9d9;
  padding: 56px 0 24px;
  font-size: 14px;

  a {
    color: inherit;
    text-decoration: none;

    &:hover {
      color: #fff;
    }
  }

  &__container {
    width: min(1200px, 100%);
    margin: 0 auto;
    padding: 0 16px;
  }

  &__primary {
    display: flex;
    flex-wrap: wrap;
    gap: 32px;
    padding-bottom: 32px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  &__brand {
    flex: 1 1 280px;
    max-width: 360px;

    p {
      margin: 16px 0 0;
      line-height: 1.8;
    }
  }

  &__logo {
    width: 220px;
    height: auto;
    display: block;
  }

  &__links {
    flex: 2 1 420px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 24px;
  }

  &__column {
    h3 {
      margin: 0 0 16px;
      font-size: 16px;
      font-weight: 600;
      color: #fff;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: grid;
      gap: 10px;
      color: rgba(255, 255, 255, 0.75);
    }
  }

  &__legal {
    padding-top: 24px;
    text-align: center;
    color: rgba(255, 255, 255, 0.6);

    span {
      color: #fff;
      font-weight: 600;
    }

    a {
      margin: 0 6px;
    }
  }
}

@media (max-width: 768px) {
  .site-footer {
    padding-top: 40px;
  }
}
</style>
