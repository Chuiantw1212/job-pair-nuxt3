<template>
    <div class="backgroud" :class="{ 'backgroud--editing': state.isEditing }" :style="styleObj" @mouseenter="startEditing()"
        @mouseleave="completeEditing($event)">
        <div class="img__toolbar">
            <button class="toolbar__btn" @click="emit('remove')">
                <img src="./Trash.svg">
            </button>
            <button class="toolbar__btn" @click="emit('moveUp')">
                <img src="./arrow-up.svg">
            </button>
            <button class="toolbar__btn" @click="emit('moveDown')">
                <img src="./arrow-down.svg">
            </button>
            <label v-if="localValue.url" class="toolbar__btn">
                <img src="./Picture.svg">
                <input v-show="false" autocomplete="off" type="file" :accept="accept" @change="handleFiles($event)">
            </label>
            <button v-if="localValue.url" class="toolbar__btn" @click="switchPosition()">
                <img v-show="state.positionIndex === 0" src="./top-left.svg">
                <img v-show="state.positionIndex === 1" src="./top-center.svg">
                <img v-show="state.positionIndex === 2" src="./top-right.svg">
                <img v-show="state.positionIndex === 3" src="./left.svg">
                <img v-show="state.positionIndex === 4" src="./center.svg">
                <img v-show="state.positionIndex === 5" src="./right.svg">
                <img v-show="state.positionIndex === 6" src="./bottom-left.svg">
                <img v-show="state.positionIndex === 7" src="./bottom-center.svg">
                <img v-show="state.positionIndex === 8" src="./bottom-right.svg">
            </button>
            <button v-if="localValue.url" class="toolbar__btn" @click="switchSize()">
                <img v-show="localValue.size === 'cover'" src="./cover.svg">
                <img v-show="localValue.size === 'contain'" src="./contain.svg">
            </button>
        </div>
        <slot></slot>
    </div>
</template>
<script setup>
import { Buffer } from 'buffer/'
const emit = defineEmits(['update:modelValue', 'remove', 'moveUp', 'moveDown'])
const state = reactive({
    isEditing: false,
    isShowPosition: false,
    positionIndex: 4, // center
    positions: ['top left', 'top', 'top right', 'left', 'center', 'right', 'bottom left', 'bottom', 'bottom right'],
})
const props = defineProps({
    modelValue: {
        type: Object,
        default: function () {
            return {
                url: null, // 初始無值則表示不啟用背景上傳
                position: 'center',
                size: 'cover',
            }
        }
    },
    accept: {
        type: String,
        default: 'image/*'
    },
    size: {
        type: Number,
        default: 1048576
    },
})
// hooks
const localValue = computed({
    get() {
        return props.modelValue
    },
    set(newValue) {
        emit('update:modelValue', newValue)
    }
})
watch(() => localValue.value.position, (position) => {
    if (position) {
        state.positionIndex = state.positions.findIndex(item => item === position)
    }
}, { immediate: true })
const styleObj = computed(() => {
    const defaultObj = {
        'background-size': `cover`,
        'background-position': 'center',
        'background-repeat': 'no-repeat',
    }
    if (localValue.value.size) {
        defaultObj['background-size'] = localValue.value.size
    }
    if (localValue.value.url) {
        defaultObj['background-image'] = `url(${localValue.value.url})`
    }
    if (localValue.value.position) {
        defaultObj['background-position'] = localValue.value.position
    }
    return defaultObj
})
// methods
function switchSize() {
    switch (localValue.value.size) {
        default:
        case 'contain': {
            localValue.value.size = 'cover'
            break
        }

        case 'cover': {
            localValue.value.size = 'contain'
            break
        }
    }
}
function switchPosition() {
    const { positions = [] } = state
    const nextIndex = (state.positionIndex + 1) % positions.length
    state.positionIndex = nextIndex
    localValue.value['position'] = positions[nextIndex]
}
function startEditing() {
    state.isEditing = true
}
function completeEditing() {
    state.isEditing = false
}
async function handleFiles(event) {
    const { files } = event.target
    const file = files[0]
    if (!file) {
        return
    } else {
        const isOverSize = this.size && file.size >= this.size
        if (isOverSize) {
            const sizeKB = Math.floor(this.size / 1024)
            this.$sweet.alert(`大小請勿超過${sizeKB}KB`)
            return
        }
    }
    const arrayBuffer = await new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsArrayBuffer(file)
        reader.onload = () => {
            resolve(reader.result)
        }
        reader.onerror = (error) => reject(error)
    })
    const { name, size, type } = file
    const buffer = Buffer.from(arrayBuffer)
    const url = URL.createObjectURL(file)
    const newFile = {
        url,
        name,
        size,
        buffer,
        type,
        date: new Date().toISOString()
    }
    emit("update:modelValue", newFile)
}
</script>
<style lang="scss" scoped>
.backgroud {
    position: relative;
    background-position: center;

    &:hover {
        outline: solid 5px #252f3d;
    }

    .img__toolbar {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate(-50%, calc(-100%));
        padding: 10px;
        display: none;
        gap: 10px;
        border-radius: 10px;
        background-color: #252f3d;
        color: white;
        z-index: 1030;

        .toolbar__btn {
            background-color: inherit;
            border: none;
            padding: 0px;
            left: unset;
            cursor: pointer;
        }

        .toolbar__btnGroup {
            position: relative;

            .btnGroup__layer {
                position: absolute;
                top: 0;
                left: 0;
            }
        }

    }

    .img__toolbar--left {
        left: 0;
    }

    .img__toolbar--right {
        right: 0;

    }
}

.backgroud--editing {
    outline: solid 5px #252f3d;

    .img__toolbar {
        display: flex;
    }
}
</style>