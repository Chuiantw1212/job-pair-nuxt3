<template>
    <div class="filter" :class="{ 'filter--isOpened': modelValue, 'filter--isHidden': !isOpen }">
        <div v-if="!device.state.isDesktop" class="filter__background" @click="closeFilter()"></div>
        <div class="filter__content">
            <slot></slot>
        </div>
    </div>
</template>
<script setup>
const emit = defineEmits(['update:modelValue'])
const device = useDevice()
const state = reactive({
    isOpen: false,
    hideTimer: false,
})
const props = defineProps({
    modelValue: {
        type: Boolean,
        default: true,
    },
})
watchEffect(() => {
    const isVisible = props.modelValue === true
    if (isVisible) {
        clearTimeout(state.hideTimer)
        state.isOpen = true
    } else {
        state.hideTimer = setTimeout(() => {
            state.isOpen = false
        }, 300)
    }
})
function closeFilter() {
    emit("update:modelValue", !props.modelValue)
}
</script>
<style lang="scss" scoped>
.filter {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    z-index: 1050;

    .filter__background {
        background-color: rgba(0, 0, 0, 0.3);
        position: absolute;
        top: 0;
        left: 0;
        max-width: 100vw;
        height: 100vh;
        width: 100vw;
        z-index: 1050;
        transition: all 0.3s;
        opacity: 0;
        cursor: pointer;
    }

    .filter__content {
        position: absolute;
        top: 0;
        left: 0;
        background-color: white;
        z-index: 1060;
        width: calc(100% - 52px);
        height: 100vh;
        overflow-y: auto;
        transition: all 0.3s;
        transform: translateX(-100%);
    }
}

.filter--isOpened {
    .filter__background {
        opacity: 1;
    }

    .filter__content {
        transform: translateX(0);
    }
}

.filter--isHidden {
    width: 0;
    height: 0;
    overflow: hidden;
}

@media screen and (min-width: 992px) {
    .filter {
        position: inherit;
        top: unset;
        left: unset;
        width: 25% !important;
        height: auto !important;
        z-index: 10;

        .filter__background {
            visibility: hidden;
            position: inherit;
        }

        .filter__content {
            position: inherit;
            transform: translateX(0);
            width: 100%;
            border-top: 9px solid #5ea88e;
            border-radius: 10px;
            overflow: unset;
            transition: unset;
            height: auto;
        }
    }

    .filter--isHidden {
        width: 25% !important;
        height: auto !important;
        overflow: unset;
    }
}
</style>