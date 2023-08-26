<template>
    <div class="controllable" @focus="test()" ref="controllable">
        <!-- Movable edge -->
        <div v-show="state.isFocused" class="controllable__edge controllable__edge--top"></div>
        <div v-show="state.isFocused" class="controllable__edge controllable__edge--right"></div>
        <div v-show="state.isFocused" class="controllable__edge controllable__edge--bottom"></div>
        <div v-show="state.isFocused" class="controllable__edge controllable__edge--left"></div>
        <!-- Resize corner -->
        <div v-show="state.isFocused" class="controllable__corner controllable__corner--ne"></div>
        <div v-show="state.isFocused" class="controllable__corner controllable__corner--nw"></div>
        <div v-show="state.isFocused" class="controllable__corner controllable__corner--se"></div>
        <div v-show="state.isFocused" class="controllable__corner controllable__corner--sw"></div>
        <slot>
            <!-- <img class="banner__image" src="https://storage.googleapis.com/public.prd.job-pair.com/asset/design/Bg.webp"> -->
        </slot>
    </div>
</template>
<script setup>
const state = reactive({
    isFocused: false,
})
const props = defineProps({
    modelValue: { // isFocused
        type: Boolean,
        default: false
    }
})
onMounted(() => {
    toggleClickOutside(true)
})
onBeforeUnmount(() => {
    toggleClickOutside(false)
})
watch(() => props.modelValue, (newValue) => {
    if (newValue) {
        state.isFocused = true
    }
})
// let localValue = computed({
//     get() {
//         const value = props.modelValue ?? ''
//         const ckeditorInstance = state.ckeditorInstance
//         if (value && ckeditorInstance) {
//             ckeditorInstance.setData(newValue)
//         }
//         return value  // important
//     },
//     set(newValue) {
//         emit('update:modelValue', newValue)
//     }
// })
// methods
function test() {

}
function toggleClickOutside(isOn) {
    if (isOn) {
        document.addEventListener("click", handleClickoutSide)
    } else {
        document.removeEventListener("click", handleClickoutSide)
    }
}
// 
const instance = getCurrentInstance()
function handleClickoutSide(event) {
    const area = instance.refs.controllable
    if (!area.contains(event.target)) {
        state.isFocused = false
    }
}
</script>
<style lang="scss" scoped>
.controllable {
    position: relative;

    .controllable__edge {
        position: absolute;
        background-color: #1a73e8;
        cursor: move;
        z-index: 1;
    }

    .controllable__edge--top {
        width: 100%;
        min-height: 6px;
        top: -6px;
    }

    .controllable__edge--bottom {
        width: 100%;
        min-height: 6px;
        bottom: -6px;
    }

    .controllable__edge--right {
        height: 100%;
        min-width: 6px;
        right: -6px;
    }

    .controllable__edge--left {
        height: 100%;
        min-width: 6px;
        left: -6px;
    }

    .controllable__corner {
        height: 10px;
        width: 10px;
        background-color: red;
        position: absolute;
        z-index: 2;
    }

    .controllable__corner--ne {
        right: -8px;
        top: -8px;
        cursor: ne-resize;
    }

    .controllable__corner--nw {
        left: -8px;
        top: -8px;
        cursor: nw-resize;
    }

    .controllable__corner--se {
        right: -8px;
        bottom: -8px;
        cursor: se-resize;
    }

    .controllable__corner--sw {
        left: -8px;
        bottom: -8px;
        cursor: nw-resize;
    }

}
</style>