// This function is executed before instantiating the app
// only in client-side.
// document: https://nuxtjs.org/docs/2.x/directory-structure/plugins 
import liff from '@line/liff'
export default defineNuxtPlugin(async nuxtApp => {
    nuxtApp.provide('liff', liff)
})