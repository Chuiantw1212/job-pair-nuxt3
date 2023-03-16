// https://nuxt.com/docs/api/configuration/nuxt-config
const random = Math.random()
const imageUrl = 'https://storage.googleapis.com/job-pair-taiwan-prd.appspot.com/meta/ogImageJob.png'
export default defineNuxtConfig({
    app: {
        head: {
            // 初始共用的設定，這裡不放title與description
            // title: 'Job Pair',
            meta: [
                { "charset": "utf-8" },
                { "content": "width=device-width, initial-scale=1" },
                // Open graph protocol
                { property: 'og:url', content: 'https://job-pair.com' },
                { property: 'og:title', content: 'Job Pair' },
                { property: 'og:type', content: 'website' },
                { property: 'og:locale', content: 'zh_TW' },
                { property: 'og:image', content: imageUrl },
                { property: 'og:image:secure_url', content: imageUrl },
                // Social Media
                { property: 'fb:app_id', content: '411339927562100' },
            ],
            // SEO 相關放在 layout.vue
            htmlAttrs: {
                lang: 'zh-Hant'
            },
            link: [
                // Favicon https://github.com/nuxt/framework/discussions/5204
                { rel: 'icon', type: 'image/x-icon', href: `/favicon.ico?${random}` },
                // Google Fonts
                { rel: "preconnect", href: "https://fonts.googleapis.com" },
                { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "anonymous" },
                { rel: "preload", as: "style", onload: "this.onload=null;this.rel='stylesheet'", href: "https://fonts.googleapis.com/css2?family=Noto+Sans+TC&display=swap", },
                // Firebase
                { rel: "preload", as: "style", onload: "this.onload=null;this.rel='stylesheet'", href: "https://www.gstatic.com/firebasejs/ui/6.0.1/firebase-ui-auth.css", type: "text/css" },
                // Flatpickr
                { rel: "preload", as: "style", onload: "this.onload=null;this.rel='stylesheet'", href: "https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css", type: "text/css", media: "screen" },
                // Bootstrap
                { href: "https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css", rel: "stylesheet", integrity: "sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi", crossorigin: "anonymous" },
            ],
        },
    },
    css: [
        '@glidejs/glide/dist/css/glide.core.min.css',
        '@glidejs/glide/dist/css/glide.theme.min.css',
    ],
    runtimeConfig: {
        public: {
            VITE_APP_ECPAY_AMOUNT: 5,
            VITE_APP_FIREBASE_ENV: 'development',
            apiBase: 'http://localhost:8080',
            origin: 'http://localhost:3000',
            LIFF_ID: '1660706638-52yLL18g',
            // SEO
            title: 'Job Pair',
            description: '在 Job Pair 不論求職找工作或徵才找人，是以企業文化、管理模式、人際風格等雙方的軟性需求進行演算，提供團隊適配度給雙方參考。跳脫僅能以地區、薪資、職務類別、產業等資訊評估職缺；或人選的性別、年齡、學歷等表象資訊，為雙方配對能合作的人才與工作。'
        }
    },
    // ... other options
    modules: [
        '@pinia/nuxt',
        'nuxt-jsonld',
    ],
    vite: {
        define: {
            "process.env.DEBUG": false,
        },
    },
    // https://github.com/nuxt/framework/issues/7197
    nitro: {
        // https://nitro.unjs.io/config#compresspublicassets
        compressPublicAssets: {
            gzip: true,
            brotli: true,
        },
        // https://content.nuxtjs.org/guide/recipes/sitemap/
        prerender: {
            routes: ['/sitemap.xml']
        }
    },
})
