<template>
    <div class="controllable" ref="controllable" :style="getStyle()">
        <div class="controllable__content">
            <!-- Movable edge -->
            <div v-show="state.isFocused" @mousedown="setDraggable()" class=" controllable__edge controllable__edge--top">
            </div>
            <div v-show="state.isFocused" @mousedown="setDraggable()" class=" controllable__edge controllable__edge--right">
            </div>
            <div v-show="state.isFocused" @mousedown="setDraggable()"
                class=" controllable__edge controllable__edge--bottom">
            </div>
            <div v-show="state.isFocused" @mousedown="setDraggable()" class=" controllable__edge controllable__edge--left">
            </div>
            <!-- Resize corner -->
            <div v-show="state.isFocused" class="controllable__square controllable__square--ne"></div>
            <div v-show="state.isFocused" class="controllable__square controllable__square--nw"></div>
            <div v-show="state.isFocused" class="controllable__square controllable__square--se"></div>
            <div v-show="state.isFocused" class="controllable__square controllable__square--sw"></div>
            <!-- Resize Edge -->
            <div v-show="state.isFocused" class="controllable__square controllable__square--n"></div>
            <div v-show="state.isFocused" class="controllable__square controllable__square--e"></div>
            <div v-show="state.isFocused" class="controllable__square controllable__square--s"></div>
            <div v-show="state.isFocused" class="controllable__square controllable__square--w"></div>
            <slot></slot>
        </div>
        <!-- {{ state.isDragged }} -->
        <!-- {{ state.isFocused }} -->
        <!-- {{ modelValue.position }} -->
    </div>
</template>
<script setup>
const emit = defineEmits(['mousemove'])
const state = reactive({
    isFocused: false,
    isDragged: false,
})
const props = defineProps({
    modelValue: { // isFocused
        type: Object,
        default: function () {
            return {
                isFocused: false,
                position: {
                    top: '10%',
                    left: '10%',
                }
            }
        }
    }
})
onMounted(() => {
    toggleClickOutside(true)
    toggleReleaseDraggable(true)
})
onBeforeUnmount(() => {
    toggleClickOutside(false)
    toggleReleaseDraggable(false)
})
watch(() => props.modelValue, (newStatus) => {
    if (newStatus.isFocused) {
        state.isFocused = true
    }
}, { deep: true })
// methods
function getStyle() {
    const { position = {}, size = {} } = props.modelValue
    const { top, left } = position
    const { width, height, } = size
    return {
        top,
        left,
        width,
        height,
    }
}
const instance = getCurrentInstance()
function setDraggable() {
    state.isDragged = true
    toggleMouseMove(true)
}
function releaseDraggable() {
    state.isDragged = false
    toggleMouseMove(false)
}
function moveControllable(event) {
    const area = instance.refs.controllable
    const { movementX, movementY, } = event
    const { offsetLeft, offsetTop, offsetWidth, offsetHeight, } = area
    console.log(offsetWidth, offsetHeight,);
    if (state.isDragged) {
        const left = Math.max(0, movementX + offsetLeft)
        const top = Math.max(0, movementY + offsetTop)
        emit('mousemove', {
            // movementX,
            // movementY,
            // offsetLeft,
            // offsetTop,
            offsetWidth,
            offsetHeight,
            left,
            top
        })
    }
}
// toggles
function toggleReleaseDraggable(isOn) {
    if (isOn) {
        document.addEventListener("mouseup", releaseDraggable)
    } else {
        document.removeEventListener("mouseup", releaseDraggable)
    }
}
function toggleMouseMove(isOn) {
    if (isOn) {
        document.addEventListener('mousemove', moveControllable)
    } else {
        document.removeEventListener('mousemove', moveControllable)
    }
}
function toggleClickOutside(isOn) {
    if (isOn) {
        document.addEventListener("click", handleClickoutSide)
    } else {
        document.removeEventListener("click", handleClickoutSide)
    }
}
function handleClickoutSide(event) {
    const area = instance.refs.controllable
    if (!area.contains(event.target)) {
        state.isFocused = false
    }
}
</script>
<style lang="scss" scoped>
.controllable {
    position: absolute;

    .controllable__content {
        position: relative;
    }

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

    .controllable__square {
        height: 10px;
        width: 10px;
        background-color: red;
        position: absolute;
        z-index: 2;
    }

    .controllable__square--ne {
        right: -8px;
        top: -8px;
        cursor: ne-resize;
    }

    .controllable__square--nw {
        left: -8px;
        top: -8px;
        cursor: nw-resize;
    }

    .controllable__square--se {
        right: -8px;
        bottom: -8px;
        cursor: se-resize;
    }

    .controllable__square--sw {
        left: -8px;
        bottom: -8px;
        cursor: nw-resize;
    }

    .controllable__square--n {
        left: calc(50% - 4px);
        top: -8px;
        cursor: n-resize;
    }

    .controllable__square--e {
        right: -8px;
        top: calc(50% - 4px);
        cursor: e-resize;
    }

    .controllable__square--s {
        bottom: -8px;
        left: calc(50% - 4px);
        cursor: s-resize;
    }

    .controllable__square--w {
        top: calc(50% - 4px);
        left: -8px;
        cursor: w-resize;
    }

}
</style>