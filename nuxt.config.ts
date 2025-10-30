import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

export default defineNuxtConfig({
  devtools: { enabled: false },

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '',
    },
  },

  //...
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },

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
