
import type { bottom } from '@popperjs/core';
<template>
    <div class="slideContainer" :class="{ 'slideContainer--isOpen': modelValue }">
        {{modelValue}}
        <slot></slot>
    </div>
</template>
<script setup>
const state = reactive({
    searchLike: '',
})
const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false,
    }
})
</script>
<style lang="scss" scoped>
.slideContainer {
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: white;
    width: 100vw;
    // transform: translateY(100%);
    transition: all 0.3s;
}

.slideContainer--isOpen {
    transform: translateY(0);
}
</style>