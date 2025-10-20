<template>
  <section class="home-risk-banner">
    <div class="home-risk-banner__content">
      <p class="home-risk-banner__eyebrow">RISK ALERT</p>
      <h2>风险提醒与合规指引</h2>
      <p class="home-risk-banner__description">
        依托央企资源与专业团队，为集团及合作伙伴提供全流程风险评估、防控方案与保障服务，守住安全合规底线。
      </p>
      <NuxtLink to="/disclosure" class="home-risk-banner__link">
        查看信息披露
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped lang="scss">
.home-risk-banner {
  background-image: url('https://www.spicib.com/skin/images/bj1.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin: 48px 0;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.55);
  }

  &__content {
    position: relative;
    width: min(1030px, 100%);
    margin: 0 auto;
    padding: 60px 24px;
    color: #fff;
    text-align: center;
  }

  &__eyebrow {
    margin: 0 0 18px;
    font-size: 16px;
    letter-spacing: 0.3em;
    color: rgba(255, 255, 255, 0.7);
  }

  h2 {
    margin: 0 0 16px;
    font-size: 34px;
    letter-spacing: 0.06em;
  }

  &__description {
    margin: 0 auto 32px;
    max-width: 640px;
    font-size: 17px;
    line-height: 1.7;
    color: rgba(255, 255, 255, 0.85);
  }

  &__link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 12px 28px;
    border-radius: 999px;
    background-color: #c60c1a;
    color: #fff;
    font-size: 16px;
    font-weight: 600;
    text-decoration: none;
    transition: background-color 0.2s ease, transform 0.2s ease;

    &:hover {
      background-color: #b00a16;
      transform: translateY(-2px);
    }
  }
}

@media (max-width: 768px) {
  .home-risk-banner {
    min-height: 320px;

    &__content {
      padding: 48px 16px;
    }

    h2 {
      font-size: 26px;
    }

    &__description {
      font-size: 15px;
    }
  }
}
</style>
