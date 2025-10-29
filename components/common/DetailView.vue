<template>
  <article class="detail-view">
    <section v-if="loading" class="detail-view__state">内容加载中…</section>
    <section v-else-if="errorMessage" class="detail-view__state detail-view__state--error">
      {{ errorMessage }}
    </section>
    <section v-else class="detail-view__content" v-html="detail?.content || ''"></section>
  </article>
</template>

<script setup>
const props = defineProps({
  detail: {
    type: Object,
    default: null,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  errorMessage: {
    type: String,
    default: '',
  },
  showBack: {
    type: Boolean,
    default: true,
  },
});

// defineEmits(['back']);
</script>

<style scoped lang="scss">
.detail-view {
  display: flex;
  flex-direction: column;
  gap: 24px;
  color: #2f2f2f;
  line-height: 1.8;

  .detail-view__state {
    text-align: center;
    color: #999;
    padding: 40px 0;
  }

  .detail-view__state--error {
    color: #c60c1a;
  }

  .detail-view__content :global(img) {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 16px auto;
  }

  .detail-view__content :global(p) {
    margin: 12px 0;
  }
}
</style>
