import html2canvas from "html2canvas";
export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.provide('html2canvas', html2canvas)
})