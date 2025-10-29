<template>
  <section class="home-enterprise">
    <div class="home-enterprise__container">
      <header class="home-enterprise__header">
        <div class="home-enterprise__heading">
          <h2 class="home-enterprise__title">企业影像</h2>
          <span class="home-enterprise__subtitle">ENTERPRISE IMAGE</span>
        </div>
        <NuxtLink to="/party-building/enterpriseImage" class="home-enterprise__more">更多</NuxtLink>
      </header>
    </div>

    <NuxtLink to="/party-building/enterpriseImage" class="home-enterprise__visual">
      <img src="@/assets/images/home/qiyeyingxiang.jpg" alt="企业影像展播" />
    </NuxtLink>
  </section>
</template>

<style scoped lang="scss">
.home-enterprise {
  background-color: #fff;
  padding: 64px 0 0;

  .home-enterprise__container {
    width: min(1200px, 100%);
    margin: 0 auto;
    padding: 0 16px;

    .home-enterprise__header {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      margin-bottom: 24px;

      .home-enterprise__heading {
        display: flex;
        align-items: baseline;
        gap: 16px;

        .home-enterprise__title {
          margin: 0;
          font-size: 32px;
          font-weight: 700;
          letter-spacing: 0.08em;
        }

        .home-enterprise__subtitle {
          display: block;
          color: #cacaca;
          font-size: 20px;
          height: 40px;
          line-height: 50px;
          font-weight: bold;
        }
      }

      .home-enterprise__more {
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
      }
    }
  }

  .home-enterprise__visual {
    // width: min(960px, 100%); // 给容器定一个最大宽度，再居中
    height: 720px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #000; // 两侧黑色背景
    overflow: hidden;
    cursor: pointer;

    img {
      max-width: 100%; // 保持等比缩放
      height: auto;
      display: block;
    }
  }
}

.home-enterprise .home-enterprise__more:hover {
  background-color: rgba(255, 255, 255, 0.24);
}

.home-enterprise .home-enterprise__visual:hover img {
  transform: scale(1.02);
}

@media (max-width: 1024px) {
  .home-enterprise {
    .home-enterprise__visual {
      height: 420px;
    }
  }
}

@media (max-width: 768px) {
  .home-enterprise {
    padding-top: 48px;

    .home-enterprise__visual {
      height: 360px;
    }
  }
}

@media (max-width: 640px) {
  .home-enterprise {
    .home-enterprise__visual {
      border-radius: 16px 16px 0 0;
    }
  }
}
</style>
