import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineNuxtConfig({
  devtools: { enabled: false },
  //...
  build: {
    // transpile: ['vuetify'],
  },
  ssr: false,
  modules: [
    '@pinia/nuxt',
  ],
  css: [
    'element-plus/dist/index.css', // Element Plus 全局样式
  ],
  vite: {
    vue: {
      template: {
        // transformAssetUrls,
      },
    },
    plugins: [
      AutoImport({
        imports: ['vue'],
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
  },
})
