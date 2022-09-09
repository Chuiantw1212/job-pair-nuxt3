
// https://vuejs.org/guide/reusability/composables.html#mouse-tracker-example
import { reactive, onMounted, onUnmounted, watch, nextTick, computed, ref, watchEffect } from 'vue'
export default function () {
    const state = reactive({
        isDesktop: false
    })
    onMounted(() => {
        if (process.client) {
            calculateWidth()
            window.addEventListener("resize", calculateWidth)
        }
    })
    function calculateWidth() {
        state.isDesktop = window.innerWidth >= 992
    }
    return {
        isDesktop: state.isDesktop,
    }
}