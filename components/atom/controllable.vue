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
            <!-- Resize Edge -->
            <div v-show="state.isFocused" class="controllable__square controllable__square--n">
            </div>
            <div v-show="state.isFocused" class="controllable__square controllable__square--e">
            </div>
            <div v-show="state.isFocused" class="controllable__square controllable__square--s">
            </div>
            <div v-show="state.isFocused" class="controllable__square controllable__square--w">
            </div>
            <!-- Resize corner -->
            <div v-show="state.isFocused" class="controllable__square controllable__square--ne">
            </div>
            <div v-show="state.isFocused" class="controllable__square controllable__square--nw">
            </div>
            <div v-show="state.isFocused" class="controllable__square controllable__square--se">
            </div>
            <div v-show="state.isFocused" class="controllable__square controllable__square--sw">
            </div>
            <slot></slot>
        </div>
        <!-- {{ state.isDragged }} -->
        <!-- {{ state.isFocused }} -->
        <!-- {{ modelValue.position }} -->
    </div>
</template>
<script setup>
const emit = defineEmits(['move'])
const state = reactive({
    isFocused: false,
    isDragged: false,
    resizingType: false,
})
const props = defineProps({
    modelValue: { // isFocused
        type: Object,
        default: function () {
            return {
                isFocused: false,
                position: {
                    top: 0,
                    left: 0,
                },
                size: {
                    width: '',
                    height: '',
                }
            }
        }
    },
    disabled: {
        type: Boolean,
        default: false
    }
})
onMounted(() => {
    // if (!props.disabled) {
    toggleMouseDownOutside(true)
    toggleReleaseDraggable(true)
    toggleReleaseResizable(true)
    // }
})
onBeforeUnmount(() => {
    // if (!props.disabled) {
    toggleMouseDownOutside(false)
    toggleReleaseDraggable(false)
    toggleReleaseResizable(false)
    // }
})
watch(() => props.modelValue, (newStatus) => {
    if (newStatus.isFocused) {
        state.isFocused = true
    }
}, { deep: true })
// methods
function releaseResizable() {
    state.resizingType = null
}
function setResize(event, type) {
    const { target } = event
    state.resizingType = type
    toggleMouseResize(true)
    // switch (type) {
    //     case 'n': {
    //         break;
    //     }
    //     case 'e': {
    //         break;
    //     }
    //     case 's': {
    //         break;
    //     }
    //     case 'w': {
    //         break;
    //     }
    // }
}
function getStyle() {
    const { position = {}, size = {} } = props.modelValue
    const { top = 0, left = 0 } = position
    const { width = 0, height = 0, } = size
    // style
    const style = {}
    style.top = `${top}px`
    style.left = `${left}px`
    if (style.width) {
        style.width = `${width}px`
    }
    style.height = `${height}px`
    console.log(style);
    return style
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
// handlers
function moveControllable(event) {
    const { movementX, movementY, } = event
    const area = instance.refs.controllable
    const { offsetLeft, offsetTop, offsetWidth, offsetHeight, } = area
    if (state.isDragged) {
        const left = Math.max(0, movementX + offsetLeft)
        const top = Math.max(0, movementY + offsetTop)
        emit('move', {
            offsetWidth,
            offsetHeight,
            left,
            top
        })
    }
}
function resizeControllable(event) {
    // offset會隨著滑鼠超出範圍失效
    const area = instance.refs.controllable
    // calculate height and width
    const { movementX, movementY, clientX, clientY, offsetY, offsetX } = event
    console.log(clientY);
    // console.log('clientX', clientX)
    const { offsetLeft, offsetTop, offsetWidth, offsetHeight, } = area
    // console.log(offsetLeft, offsetTop, offsetWidth, offsetHeight,);
    switch (state.resizingType) {
        case "s": {
            // const top = offsetTop
            // const left = Math.max(0, movementX + offsetLeft)
            const height = clientX
            emit('resize', {
                height,
                offsetLeft,
                offsetTop,
                clientX,
                clientY,
                offsetWidth,
                offsetHeight,
                // left,
                // top
            })
        }
    }
    // if (state.resizingType) {

    // }
}
function handlePressDownOutSide(event) {
    const area = instance.refs.controllable
    if (!area.contains(event.target)) {
        state.isFocused = false
    }
}
// toggles
function toggleReleaseResizable(isOn) {
    if (isOn) {
        document.addEventListener("mouseup", releaseResizable)
    } else {
        document.removeEventListener("mouseup", releaseResizable)
    }
}
function toggleReleaseDraggable(isOn) {
    if (isOn) {
        document.addEventListener("mouseup", releaseDraggable)
    } else {
        document.removeEventListener("mouseup", releaseDraggable)
    }
}
function toggleMouseResize(isOn) {
    if (isOn) {
        document.addEventListener('mousemove', resizeControllable)
    } else {
        document.removeEventListener('mousemove', resizeControllable)
    }
}
function toggleMouseMove(isOn) {
    if (isOn) {
        document.addEventListener('mousemove', moveControllable)
    } else {
        document.removeEventListener('mousemove', moveControllable)
    }
}
function toggleMouseDownOutside(isOn) {
    if (isOn) {
        document.addEventListener("mousedown", handlePressDownOutSide)
    } else {
        document.removeEventListener("mousedown", handlePressDownOutSide)
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
        height: 6px;
        width: 6px;
        background-color: #1a73e8;
        position: absolute;
        z-index: 2;
    }

    .controllable__square--ne {
        right: -6px;
        top: -6px;
        cursor: ne-resize;
    }

    .controllable__square--nw {
        left: -6px;
        top: -6px;
        cursor: nw-resize;
    }

    .controllable__square--se {
        right: -6px;
        bottom: -6px;
        cursor: se-resize;
    }

    .controllable__square--sw {
        left: -6px;
        bottom: -6px;
        cursor: nw-resize;
    }

    .controllable__square--n {
        left: calc(50% - 4px);
        top: -6px;
        cursor: n-resize;
    }

    .controllable__square--e {
        right: -6px;
        top: calc(50% - 4px);
        cursor: e-resize;
    }

    .controllable__square--s {
        bottom: -6px;
        left: calc(50% - 4px);
        cursor: s-resize;
    }

    .controllable__square--w {
        top: calc(50% - 4px);
        left: -6px;
        cursor: w-resize;
    }

}
</style>