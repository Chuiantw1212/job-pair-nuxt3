export default defineNuxtPlugin((nuxtApp) => {
    // https://github.com/nuxt/framework/discussions/1661
    nuxtApp.$router.options.scrollBehavior = async (to, from, savedPosition) => {
        let goTo = { top: 0, behavior: 'smooth' }
        // if (to.hash) {
        //     goTo = {
        //         el: to.hash,
        //         behavior: 'smooth',
        //         top: 64,
        //     }
        // } else if (savedPosition) {
        //     goTo = savedPosition
        // } else {
        //     goTo = { top: 0, behavior: 'smooth' }
        // }

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(goTo)
            }, 100)
        })
    }
})