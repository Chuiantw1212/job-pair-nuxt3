import mitt from 'mitt'
export default defineNuxtPlugin(nuxtApp => {
    return {
        provide: {
            emitter: mitt()
        }
    }
})
