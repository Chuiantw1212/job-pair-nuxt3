// https://nuxt.com/docs/api/configuration/nuxt-config
const random = Math.random()
const axios = require('axios')
const apiBase = 'https://job-pair-taiwan-prd.de.r.appspot.com'
const siteUrl = 'https://job-pair.com'
// SEO
const imageUrl = 'https://storage.googleapis.com/public.prd.job-pair.com/meta/ogImageJob.png'
export default defineNuxtConfig({
    site: {
        name: 'Job Pair'
    },
    app: {
        head: {
            // titleTemplate: '%siteName - %pageTitle',
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
            VITE_APP_FIREBASE_ENV: 'production',
            apiBase, // deprecated
            siteUrl,
            siteDescription: '在這個充滿資訊噪音的時代，求職找工作變得越來越困難。我們相信，除了眾所矚目的熱門職業，還有更多適合個人特質和價值觀的選擇。Job Pair媒合型人力銀行，讓你的職涯充滿無限可能！勾選你理想的企業文化、工作環境、組織階段、管理模式、人際風格和工作模式，即刻為你配對最合適的職缺，開啟專屬於你的職場旅程。',
            language: 'zh-TW', // prefer more explicit language codes like `en-AU` over `en`
            LIFF_ID: '1660783051-vP4Ojz2r',
            axiosTimeout: 30000,
        }
    },
    // ... other options
    modules: [
        '@pinia/nuxt',
        'nuxt-jsonld',
        '@nuxtseo/module',
        '@nuxt/image',
    ],
    vite: {
        define: {
            "process.env.DEBUG": false,
        },
        build: {
            rollupOptions: {
                external: ['/@popperjs/core']
            }
        }
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
            nodeVersion: "18",
            gen: 2,
            httpsOptions: {
                // https://firebase.google.com/docs/hosting/functions
                region: 'asia-east1',
            },
            // ...
        }
    },
    sitemap: {
        exclude: [
            '/questions/**',
            '/admin/**',
            '/user/**'
        ],
        // provide dynamic URLs to be included
        urls: async () => {
            const formatter = new Intl.DateTimeFormat('zh', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            })
            const axiosInstance = axios.create({
                baseURL: apiBase,
                timeout: 20 * 60 * 1000,
            })
            const [jobIdsResponse, companyIdsResponse] = await Promise.all([
                axiosInstance({
                    method: 'get',
                    url: '/job/sitemap',
                }),
                axiosInstance({
                    method: 'get',
                    url: '/company/sitemap',
                }),
            ])
            const urls = []
            jobIdsResponse.data.forEach((item) => {
                const urlItem = {
                    url: `/job/${item.identifier}`,
                }
                const { datePosted = '' } = item
                if (datePosted) {
                    const dateInstance = new Date(datePosted)
                    urlItem.lastmod = formatter.format(dateInstance).replaceAll('/', '-')
                }
                urls.push(urlItem)
            })
            companyIdsResponse.data.forEach((item) => {
                const urlItem = {
                    url: `/job/${item.identifier}`,
                }
                const { updatedDate = '' } = item
                if (updatedDate) {
                    const dateInstance = new Date(updatedDate)
                    urlItem.lastmod = formatter.format(dateInstance).replaceAll('/', '-')
                }
                urls.push(urlItem)
            })
            return urls
        },
    },
    linkChecker: {
        failOn404: true,
    },
    // 目前沒有作用 https://image.nuxtjs.org/configuration
    image: {
        // Options
        format: ['webp'],
        dir: 'assets'
    }
})
