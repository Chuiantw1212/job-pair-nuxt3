<template>
    <div class="banner" ref="banner">
        <img class="banner__image" src="https://storage.googleapis.com/public.prd.job-pair.com/asset/design/Bg.webp"
            draggable="false">
        <div class="banner__preview">
            <LazyAtomInputCkeditorInline v-if="localValue.controllable.title.html"
                v-model="localValue.controllable.title.html" class="editorGroup__editor" @focus="handleFocus('title')"
                @click="handleFocus('title')" @blur="handleBlur('title')">
            </LazyAtomInputCkeditorInline>
            <LazyAtomInputCkeditorInline v-if="localValue.controllable.desc.html"
                v-model="localValue.controllable.desc.html" class="editorGroup__editor" @focus="handleFocus('desc')"
                @click="handleFocus('desc')" @blur="handleBlur('desc')">
            </LazyAtomInputCkeditorInline>

        </div>
    </div>
</template>
<script setup>
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
    modelValue: {
        type: Object,
        default: function () {
            return {
                name: 'BANNER01',
                controllable: {
                    title: {
                        html: ''
                    },
                    desc: {
                        html: ''
                    }
                }
            }
        }
    }
})
const localValue = computed({
    get() {
        return props.modelValue
    },
    set(newValue) {
        emit('update:modelValue', newValue)
    }

})
const currentInstance = getCurrentInstance()
// methods
function handlePosition(event, type) {
    const { left = 0, top = 0, offsetWidth, offsetHeight, } = event
    const area = currentInstance.refs.banner
    const { clientHeight, clientWidth } = area
    const boundLeft = Math.min(left, clientWidth - offsetWidth)
    const boundHeight = Math.min(top, clientHeight - offsetHeight)
    state.controllable[type].position = {
        left: boundLeft,
        top: boundHeight
    }
}
function handleFocus(type) {
    state.controllable[type].isFocused = true
}
function handleBlur(type) {
    state.controllable[type].isFocused = false
}
</script>
<stylte lang="scss" scoped>
.banner {
    position: relative;

    .banner__preview {
        width: fit-content;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        // text-align: center;
        // display: flex;
        // flex-direction: column;

        .editorGroup__editor {
            width: fit-content;
            margin: auto;
        }

        .preview__btn {
            margin: auto;
            width: fit-content;
        }

        .preview__item {}
    }

    .banner__image {
        width: 100%;
    }

    .banner__controllable {
        width: 200px;
        position: absolute;
        top: 0;
        border: 1px dashed rgba(0, 0, 0, 0);
        position: absolute;
        top: 0px;
        padding: 2px;
        background-color: #1a73e8;
    }

}
</stylte>