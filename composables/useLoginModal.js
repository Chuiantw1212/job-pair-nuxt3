// It will be available as useFoo() (camelCase of file name without extension)
import { reactive, onMounted, onUnmounted, watch, nextTick, computed, ref, watchEffect } from 'vue'
export default function () {
    const state = reactive({
        isSent: false
    })
    return {
        state,
    }
}