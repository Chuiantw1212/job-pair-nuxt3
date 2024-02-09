<template>
    <div class="slideContainer">
        <div class="slideContainer__main"
            :class="{ 'slideContainer__main--isOpen': modelValue, 'slideContainer__main--isClosed': !modelValue }">
            <div class="container__header">
                <div class="header__title">{{ name }}</div>
                <button @click="toggleMenu(false)" class="header__close">
                    <img class="close__image" alt="close" src="@/assets/jobs/Delete.svg">
                </button>
            </div>
            <slot></slot>
        </div>
        <div v-if="state.isBackgroundVisible && state.isMobile" class="slideContainer__background"
            :class="{ 'slideContainer__background--fadeIn': state.isBackgroundFading }" @click="toggleMenu(false)">
        </div>
    </div>
</template>
<script setup>
const emit = defineEmits(['update:modelValue'])
const state = reactive({
    isBackgroundVisible: false,
    isBackgroundFading: false,
    isMobile: true,
    backgroundTimeout: false,
})
const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false,
    },
    name: {
        type: String,
        default: '',
    }
})
// hooks
onMounted(() => {
    // add resize listener
    window.addEventListener('resize', handleResize)
    handleResize()
})
watch(() => props.modelValue, (newValue) => {
    toggleMenu(newValue)
})
// methods
function handleResize() {
    state.isMobile = window.innerWidth < 992
}
function toggleMenu(status) {
    if (state.backgroundTimeout || window.innerWidth >= 992) {
        return
    }
    // clear existed timer
    const newValue = status || !state.isBackgroundVisible
    if (newValue) {
        state.isBackgroundVisible = newValue
        // start fadeIn animation
        setTimeout(() => {
            state.isBackgroundFading = true
        })
        // is only for setting the transition timer
        state.backgroundTimeout = setTimeout(() => {
            state.backgroundTimeout = null
        }, 300)
    } else {
        // start fadeOut animation
        state.isBackgroundFading = false
        emit('update:modelValue', false)
        state.backgroundTimeout = setTimeout(() => {
            state.isBackgroundVisible = newValue
            state.backgroundTimeout = null
        }, 300)
    }
}
</script>
<style lang="scss" scoped>
.slideContainer {
    .slideContainer__main {
        position: fixed;
        bottom: 0;
        left: 0;
        background-color: white;
        width: 100vw;
        transform: translateY(100%);
        transition: all 0.3s;
        z-index: 1060;
        padding: 20px;
        max-height: 100vh;

        .container__header {
            display: flex;
            justify-content: space-between;

            .header__title {
                font-size: 20px;
                font-style: normal;
                font-weight: 500;
                line-height: normal;
            }

            .header__close {
                background-color: inherit;
                border: none;

                .close__image {
                    width: 16px;
                    height: 16px;
                }
            }
        }
    }




    .slideContainer__main--isOpen {
        transform: translateY(0%);
    }

    .slideContainer__background {
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0);
        z-index: 1050;
        position: fixed;
        transition: all 0.3s;
        top: 0;
        left: 0;
    }

    .slideContainer__background--fadeIn {
        background: rgba(0, 0, 0, 0.5);
    }
}
</style>