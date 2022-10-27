// https://github.com/nuxt/framework/discussions/2288
import mitt from 'mitt'
export default defineNuxtPlugin(nuxtApp => {
    return {
        provide: {
            emitter: mitt()
        }
    }
})
