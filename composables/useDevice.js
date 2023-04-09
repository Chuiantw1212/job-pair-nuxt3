
// https://vuejs.org/guide/reusability/composables.html#mouse-tracker-example
import { defineStore } from 'pinia'
import { reactive, onMounted, onUnmounted, watch, nextTick, computed, ref, watchEffect } from 'vue'
export default defineStore('device', () => {
    const state = reactive({
        isLarge: false,
        isNativeWeb: false,
    })
    onMounted(() => {
        if (process.client) {
            window.addEventListener("resize", calculateWidth)
            calculateWidth()
            state.isNativeWeb = checkIsNativeWeb()
        }
    })
    // methods
    function calculateWidth() {
        state.isLarge = window.innerWidth >= 992
    }
    function checkIsNativeWeb() {
        const u = navigator.userAgent
        const ua = navigator.userAgent.toLowerCase()
        const result = { //偵測移動端瀏覽器版本信息
            trident: u.indexOf('Trident') > -1, //IE 核心
            presto: u.indexOf('Presto') > -1, //opera 核心
            webKit: u.indexOf('AppleWebKit') > -1, //Apple, google 核心
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //Firefox 核心
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //行動裝置
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android或uc瀏覽器
            iPhone: u.indexOf('iPhone') > -1, //是否為iPhone或者QQHD瀏覽器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1, //是否web應用程式
            weixin: ua.match(/MicroMessenger/i) == "micromessenger",//微信瀏覽器
            fbapp: u.includes('FBAV') || (u.includes('Mobile/') && !u.includes('Safari')),//Facebook App內瀏覽器
            line: u.indexOf('Line') > -1//Line內瀏覽器
        }
        const isInApp = result.fbapp || result.line
        return !isInApp
    }
    return {
        state
    }
})