<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import '@/sass/variable.scss'
import { useI18n } from 'vue-i18n'
import { getParameterByName } from '@/utils'
// import { Locale } from 'vant'
import { globalStore } from '@/store/global'

const { locale } = useI18n({})
const globalInfo = globalStore()
// const language = ref('')
// provide('language', language)

onMounted(() => {
  console.log(1000000);
  const lang =
    getParameterByName('language') ||
    getParameterByName('lan') ||
    getParameterByName('lang') ||
    'zh-hant'
  locale.value = lang
  console.log(111111, lang);
  globalInfo.setGlobalInfo({
    language: lang,
    // skin: theme.value,
    upsDownsColor: getParameterByName('upsDownsColor') || '2'
  })
  // language.value = lang
})
</script>


<style lang="scss" scoped>
:global(body) {
  margin: 0;
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
  background-color: #f5f5f5;
}
</style>
