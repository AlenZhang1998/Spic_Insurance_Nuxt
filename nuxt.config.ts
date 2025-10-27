import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

export default defineNuxtConfig({
  devtools: { enabled: false },

  //...
  build: {
    // transpile: ['vuetify'],
  },

  ssr: false,

  modules: ['@pinia/nuxt'],

  css: [
    'element-plus/dist/index.css', // Element Plus 全局样式
  ],

  vite: {
    server: {
      watch: {
        usePolling: true,
        interval: 100, // 根据目录大小可调高
      },
    },
    assetsInclude: ['**/*.doc', '**/*.docx'],
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

  compatibilityDate: '2025-10-24',
});
