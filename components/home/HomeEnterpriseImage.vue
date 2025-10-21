<template>
  <section class="home-enterprise">
    <div class="home-enterprise__container">
      <header class="home-enterprise__header">
        <div class="home-enterprise__heading">
          <h2 class="home-enterprise__title">企业影像</h2>
          <span class="home-enterprise__subtitle">ENTERPRISE IMAGE</span>
        </div>
        <NuxtLink to="/media" class="home-enterprise__more">更多</NuxtLink>
      </header>
    </div>

    <!-- <a href="https://www.spicib.com/html/list_27_1.html" class="home-enterprise__visual" target="_blank" rel="noopener">
      <img
        src="https://www.spicib.com/skin/images/qiyeyingxiang.jpg"
        alt="企业影像展播"
      />
    </a> -->
  </section>
</template>

<style scoped lang="scss">
.home-enterprise {
  background-color: #fff;
  height: 400px;
  padding: 64px 0 0;

  &__container {
    width: min(1200px, 100%);
    margin: 0 auto;
    padding: 0 16px;
  }

  &__header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 24px;
  }
  &__heading {
    display: flex;
    align-items: baseline;
    gap: 16px;
  }

  &__title {
    margin: 0;
    font-size: 32px;
    font-weight: 700;
    letter-spacing: 0.08em;
  }

  &__subtitle {
    display: block;
    color: #cacaca;
    font-size: 20px;
    float: right;
    height: 40px;
    line-height: 50px;
    // margin-left: 10px;
    font-weight: bold;
  }

  &__more {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 36px;
    border-radius: 10px;
    font-size: 16px;
    font-weight: 500;
    text-decoration: none;
    background-color: #a7a5a4;
    color: #fff;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: rgba(255, 255, 255, 0.24);
    }
  }

  &__visual {
    position: relative;
    display: block;
    width: 100%;
    max-width: 1540px;
    margin: 0 auto;
    height: 520px;
    border-radius: 24px 24px 0 0;
    overflow: hidden;
    text-decoration: none;
    color: inherit;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.6s ease;
    }

    &:hover img {
      transform: scale(1.04);
    }
  }

  // &__overlay {
  //   position: absolute;
  //   inset: 0;
  //   display: flex;
  //   flex-direction: column;
  //   justify-content: flex-end;
  //   padding: 40px 48px;
  //   background: linear-gradient(180deg, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.75) 100%);

  //   h3 {
  //     margin: 0 0 12px;
  //     font-size: 28px;
  //     letter-spacing: 0.1em;
  //   }

  //   p {
  //     margin: 0;
  //     max-width: 520px;
  //     font-size: 16px;
  //     line-height: 1.7;
  //     color: rgba(255, 255, 255, 0.85);
  //   }
  // }
}

@media (max-width: 1024px) {
  .home-enterprise__visual {
    height: 420px;
  }
}

@media (max-width: 768px) {
  .home-enterprise {
    padding-top: 48px;

    &__visual {
      height: 360px;
    }

    &__overlay {
      padding: 32px;

      h3 {
        font-size: 22px;
      }

      p {
        font-size: 15px;
      }
    }
  }
}

@media (max-width: 640px) {
  .home-enterprise__visual {
    border-radius: 16px 16px 0 0;
  }

  // .home-enterprise__overlay {
  //   align-items: center;
  //   text-align: center;
  // }
}
</style>
