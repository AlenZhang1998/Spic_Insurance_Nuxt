<template>
  <div class="feature-grid" :class="`feature-grid--cols-${computedColumns}`">
    <component
      :is="itemComponent(item)"
      v-for="(item, index) in normalizedItems"
      :key="item.title || index"
      :to="item.to"
      :role="!item.to ? 'button' : undefined"
      :tabindex="!item.to ? 0 : undefined"
      class="feature-grid__item"
      :class="{ 'feature-grid__item--clickable': !item.to }"
      @click="handleClick(item, $event)"
    >
      <div class="feature-grid__image-wrapper">
        <img
          v-if="item.image"
          :src="item.image"
          :alt="item.title || ''"
          class="feature-grid__image"
          loading="lazy"
        />
      </div>
      <div class="feature-grid__body">
        <p v-if="item.title" class="feature-grid__title">{{ item.title }}</p>
        <!-- <p v-if="item.description" class="feature-grid__description">
          {{ item.description }}
        </p> -->
      </div>
    </component>
  </div>
</template>

<script setup>
import { resolveAssetPath } from '@/utils/assets';

const emit = defineEmits(['select']);

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  columns: {
    type: Number,
    default: 4,
  },
});

const normalizedItems = computed(() =>
  (props.items ?? []).map((item) => ({
    ...item,
    image: item.image ? resolveAssetPath(item.image) : '',
  })),
);

const computedColumns = computed(() => {
  if (!props.columns || props.columns < 2) {
    return 2;
  }
  if (props.columns > 4) {
    return 4;
  }
  return props.columns;
});

const itemComponent = (item) => {
  if (item && item.to) {
    return resolveComponent('NuxtLink');
  }
  return 'div';
};

const handleClick = (item, event) => {
  if (!item || item.to) {
    return;
  }
  emit('select', item, event);
};

// const handleKeydown = (item, event) => {
//   if (!item || item.to) {
//     return;
//   }
//   emit('select', item, event);
// };
</script>

<style scoped lang="scss">
.feature-grid {
  display: grid;
  gap: 21px;

  &--cols-4 {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  &--cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  &--cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.feature-grid__item {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  // &:hover {
  //   transform: translateY(-6px);
  //   box-shadow: 0 16px 30px rgba(0, 0, 0, 0.12);
  // }
}

.feature-grid__item--clickable {
  cursor: pointer;
}

.feature-grid__image-wrapper {
  padding-top: 77%;
  height: 0;
  position: relative;
  overflow: hidden;
}

.feature-grid__image {
  display: inline-block;
  vertical-align: middle;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  margin: 0 auto;
  transition: transform 0.7s ease;
}

.feature-grid__item:hover .feature-grid__image {
  transform: scale(1.08);
}

// .feature-grid__body {
//   margin-top: 16px;
// }

.feature-grid__title {
  // height: 50px;
  // line-height: 50px;
  text-align: center;
  font-size: 15px;
  color: #666;
  font-weight: 400;
  transition: 0.3s;
  -ms-transition: 0.3s;
  -moz-transition: 0.3s;
  -webkit-transition: 0.3s;
  -o-transition: 0.3s;
  -ms-text-overflow: ellipsis;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  cursor: pointer;
  // &:hover {
  //   color: #f79646;
  // }
}

.feature-grid__item:hover .feature-grid__title {
  color: #f79646;
}

.feature-grid__description {
  margin: 8px 0 0;
  font-size: 14px;
  line-height: 22px;
  color: #666;
  text-align: center;
}

@media (max-width: 1024px) {
  .feature-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .feature-grid {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}
</style>
