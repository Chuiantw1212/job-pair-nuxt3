// https://github.com/nuxt/framework/discussions/2288
import mitt from 'mitt'
const emitter = mitt()
export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.provide('emitter', {
        on: emitter.on,
        emit: emitter.emit,
        all: emitter.all,
    })
})
