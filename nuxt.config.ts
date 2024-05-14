// https://nuxt.com/docs/api/configuration/nuxt-config
const apiBase = 'http://localhost:8080'
const siteUrl = 'http://localhost:3000'
// SEO
const imageUrl = 'https://storage.googleapis.com/public.prd.job-pair.com/meta/ogImageJob.png'
export default defineNuxtConfig({
  site: {
    name: 'Job Pair',
    url: siteUrl,
  },
  app: {
    head: {
      meta: [
        { "charset": "utf-8" },
        { "content": "width=device-width, initial-scale=1" },
        // Open graph protocol
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'zh_TW' },
        { property: 'og:image', content: imageUrl },
        { property: 'og:image:secure_url', content: imageUrl },
        { property: 'og:image:alt', content: 'banner' },
        // Social Media
        { property: 'fb:app_id', content: '411339927562100' },
      ],
      // SEO 相關放在 layout.vue
      htmlAttrs: {
        lang: 'zh-Hant'
      },
      link: [
        // Favicon https://github.com/nuxt/framework/discussions/5204
        { rel: 'icon', type: 'image/x-icon', href: `/favicon.ico` },
        // Google Fonts
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "anonymous" },
        { rel: "preload", as: "style", onload: "this.onload=null;this.rel='stylesheet'", href: "https://fonts.googleapis.com/css2?family=Noto+Sans+TC&display=swap", },
        // Firebase
        { rel: "preload", as: "style", onload: "this.onload=null;this.rel='stylesheet'", href: "https://www.gstatic.com/firebasejs/ui/6.0.1/firebase-ui-auth.css", type: "text/css" },
        // Flatpickr
        { rel: "preload", as: "style", onload: "this.onload=null;this.rel='stylesheet'", href: "https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css", type: "text/css", media: "screen" },
        // Bootstrap
        { rel: "preload", as: "style", onload: "this.onload=null;this.rel='stylesheet'", href: "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css", type: "text/css", },
      ],
      script: [
        { src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js', defer: true },
        { src: 'https://cdn.jsdelivr.net/npm/jdenticon@3.2.0/dist/jdenticon.min.js', integrity: "sha384-yBhgDqxM50qJV5JPdayci8wCfooqvhFYbIKhv0hTtLvfeeyJMJCscRfFNKIxt43M", crossorigin: "anonymous", defer: true },
      ]
    },
  },
  css: [
    '@glidejs/glide/dist/css/glide.core.min.css',
    '@glidejs/glide/dist/css/glide.theme.min.css',
    '@/assets/global.css',
  ],
  runtimeConfig: {
    public: {
      VITE_APP_ECPAY_AMOUNT: 2000,
      VITE_APP_FIREBASE_ENV: 'development',
      apiBase, // deprecated
      siteUrl,
      siteDescription: 'Job Pair 是專業的媒合平台，專注於助您找到與能力、價值觀相符的工作機會，實現長期價值發揮。透過我們高效的適配功能，輕鬆探索理想職位。立即加入 Job Pair，啟動您的職業生涯。',
      language: 'zh-TW', // prefer more explicit language codes like `en-AU` over `en`
      axiosTimeout: 30000,
    }
  },
  // ... other options
  modules: [
    '@pinia/nuxt',
    'nuxt-jsonld',
    '@nuxtjs/seo',
  ],
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
  },
  // https://github.com/nuxt/framework/issues/7197
  nitro: {
    // https://github.com/nuxt/framework/issues/8301
    preset: 'firebase',
    // https://nitro.unjs.io/config#compresspublicassets
    compressPublicAssets: {
      gzip: true,
      brotli: true,
    },
    // https://nitro.unjs.io/deploy/providers/firebase#using-2nd-generation-firebase-functions
    firebase: {
      nodeVersion: "20",
      gen: 2,
      httpsOptions: {
        // https://firebase.google.com/docs/hosting/functions
        region: 'asia-east1',
      },
      // ...
    },
  },
  sitemap: {
    exclude: [
      '/questions/**',
      '/admin/**',
      '/user/**'
    ],
    sources: [
      // https://nuxtseo.com/sitemap/guides/dynamic-urls
      `${apiBase}/job/sitemap`,
      `${apiBase}/company/sitemap`,
    ]
  },
  devtools: { enabled: true },
})
