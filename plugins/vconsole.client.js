import VConsole from 'vconsole';
export default defineNuxtPlugin(async nuxtApp => {
    nuxtApp.provide('VConsole', VConsole)
})