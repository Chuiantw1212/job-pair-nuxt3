<template>
    <div class="imgEditor" :class="{ 'imgEditor--editing': state.isEditing }" @mouseenter="startEditing()"
        @mouseleave="completeEditing($event)">
        <div class="imgEditor__toolbar" ref="toolbar">
            <!-- <button class="toolbar__btn" @click="setImageEmpty()">
                <img src="./Trash.svg">
            </button> -->
            <label class="toolbar__btn">
                <img src="./Picture.svg">
                <input v-show="false" autocomplete="off" type="file" :accept="accept" @change="handleFiles($event)">
            </label>
        </div>
        <slot></slot>
    </div>
</template>
<script setup>
import { Buffer } from 'buffer/'
const emit = defineEmits(['update:modelValue'])
const state = reactive({
    isEditing: false
})
const props = defineProps({
    modelValue: {
        type: Object,
        default: function () {
            return {}
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
// methods
function setImageEmpty() {
    localValue.value.url = ''
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
    }
    const isOverSize = this.size && file.size >= this.size
    if (isOverSize) {
        const sizeKB = Math.floor(this.size / 1024)
        this.$sweet.alert(`大小請勿超過${sizeKB}KB`)
        return
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
    const newFile = {
        url: URL.createObjectURL(file),
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
.imgEditor {
    position: relative;

    &:hover {
        outline: solid 5px #252f3d;
    }

    .imgEditor__toolbar {
        position: absolute;
        left: 50%;
        top: 0;
        transform: translate(-50%, calc(-100%));
        padding: 10px;
        display: none;
        gap: 10px;
        border-radius: 10px;
        background-color: #252f3d;
        z-index: 1050;

        .toolbar__btn {
            background-color: inherit;
            border: none;
            padding: 0px;
            cursor: pointer;
        }
    }

    // .imgEditor__img {

    // }
}

.imgEditor--editing {
    outline: solid 5px #252f3d;

    .imgEditor__toolbar {
        display: flex;
    }
}
</style>