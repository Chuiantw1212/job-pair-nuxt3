// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    app: {
        head: {
            // meta: [
            //     { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
            //     { charset: 'utf-8', },
            //     { name: 'description', content: "Job Pair is a platform for matching people and jobs. Through the patent of fit rate, job matching is no longer like finding a needle in a haystack." }
            // ],
            link: [
                // Google Fonts
                { rel: "preconnect", href: "https://fonts.googleapis.com" },
                { rel: "preconnect", href: "https://fonts.gstatic.com", },
                { rel: "preload", href: "https://fonts.googleapis.com/css2?family=Noto+Sans+TC&display=swap", as: "style", onload: "this.onload=null;this.rel='stylesheet'", media: "screen", crossorigin: "anonymous" },
                { rel: "preload", href: "https://fonts.googleapis.com/css2?family=Noto+Sans+TC&display=swap", as: "style", onload: "this.onload=null;this.rel='stylesheet'", media: "screen", crossorigin: "anonymous" },
                // Firebase
                { rel: "preload", href: "https://www.gstatic.com/firebasejs/ui/6.0.1/firebase-ui-auth.css", as: "style", onload: "this.onload=null;this.rel='stylesheet'", type: "text/css" },
                // Flatpickr
                { rel: "preload", href: "https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css", as: "style", onload: "this.onload=null;this.rel='stylesheet'", type: "text/css", media: "screen" },
                // AOS
                { rel: "preload", href: "https://unpkg.com/aos@next/dist/aos.css", as: "style", onload: "this.onload=null;this.rel='stylesheet'", type: "text/css", media: "screen" },
                // Bootstrap
                { href: "https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css", rel: "stylesheet", integrity: "sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi", crossorigin: "anonymous" },
                { href: "https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js", integrity: "sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3", crossorigin: "anonymous" },
            ],
            script: [
                {
                    src: 'https://storage.googleapis.com/job-pair-taiwan-prd.appspot.com/meta/ckeditor.js'
                }
            ],
        },
    },
    // css: [
    //     '@glidejs/glide/dist/css/glide.core.min.css',
    //     '@glidejs/glide/dist/css/glide.theme.min.css',
    // ],
    runtimeConfig: {
        public: {
            VITE_APP_ECPAY_AMOUNT: 5,
            VITE_APP_FIREBASE_ENV: 'development',
            VITE_APP_API_DEFAULT: 'http://localhost:8080',
        }
    },
    // ... other options
    modules: [
        // ...
        '@pinia/nuxt',
    ],
    vite: {
        define: {
            "process.env.DEBUG": false,
        },
        // optimizeDeps: {
        //     include: ['ckeditor5-custom-build']
        // },
        // build: {
        //     commonjsOptions: {
        //         include: [],
        //         exclude: ['ckeditor5-custom-build/*'],
        //     },
        //     sourcemap: true,
        // },
    },
})
