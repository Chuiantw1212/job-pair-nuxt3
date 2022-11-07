// https://v3.nuxtjs.org/api/configuration/nuxt.config
const descriptionContent = '在 Job Pair 不論求職找工作或徵才找人，是以企業文化、管理模式、人際風格等雙方的軟性需求進行演算，提供團隊適配度給雙方參考。跳脫僅能以地區、薪資、職務類別、產業等資訊評估職缺；或人選的性別、年齡、學歷等表象資訊，為雙方配對能合作的人才與工作。'
export default defineNuxtConfig({
    app: {
        head: {
            title: 'Job Pair',
            meta: [
                { name: 'description', content: descriptionContent },
                { property: 'og:description', content: descriptionContent },
                { property: 'og:image', content: 'https://storage.googleapis.com/job-pair-taiwan-prd.appspot.com/meta/ogImage.png' }
            ],
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
    css: [
        '@glidejs/glide/dist/css/glide.core.min.css',
        '@glidejs/glide/dist/css/glide.theme.min.css',
    ],
    runtimeConfig: {
        apiBase: 'https://job-pair-taiwan-dev.de.r.appspot.com',
        public: {
            VITE_APP_ECPAY_AMOUNT: 5,
            VITE_APP_FIREBASE_ENV: 'development',
            apiBase: 'https://job-pair-taiwan-dev.de.r.appspot.com',
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
    },
})
