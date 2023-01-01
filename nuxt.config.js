// https://nuxt.com/docs/api/configuration/nuxt-config
const random = Math.random()
export default defineNuxtConfig({
    app: {
        head: {
            title: 'Job Pair',
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
                // // AOS
                // { rel: "preload", href: "https://unpkg.com/aos@next/dist/aos.css", as: "style", onload: "this.onload=null;this.rel='stylesheet'", type: "text/css", media: "screen" },
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
            apiBase: 'https://job-pair-taiwan-dev.de.r.appspot.com',
            origin: 'https://job-pair-taiwan-dev.web.app',
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
        compressPublicAssets: true,
        // https://content.nuxtjs.org/guide/recipes/sitemap/
        prerender: {
            routes: ['/sitemap.xml']
        }
    },
})
