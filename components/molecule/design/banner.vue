<template>
    <div class="banner" ref="banner">
        <img class="banner__image" src="https://storage.googleapis.com/public.prd.job-pair.com/asset/design/Bg.webp">
        <LazyAtomControllable v-model="state.controllable" @mousemove="handlePosition($event)">
            <LazyAtomInputCkeditorInline v-model="state.content" class="editorGroup__editor" @focus="handleFocus()"
                @click="handleFocus()" @blur="handleBlur()">
            </LazyAtomInputCkeditorInline>
        </LazyAtomControllable>
    </div>
</template>
<script setup>
const runTimeConfig = useRuntimeConfig()
const state = reactive({
    content: '',
    isFocused: false,
    controllable: {
        isFocused: false,
        position: {
            top: '0%',
            left: '0%',
        }
    }
})
// methods
const currentInstance = getCurrentInstance()
function handlePosition(event) {
    const { movementX, movementY, offsetLeft, offsetTop, } = event
    state.controllable.position = {
        left: `${movementX + offsetLeft}px`,
        top: `${movementY + offsetTop}px`,
    }
}
function handleFocus() {
    state.controllable.isFocused = true
}
function handleBlur() {
    state.controllable.isFocused = false
}
</script>
<stylte lang="scss" scoped>
.banner {
    position: relative;

    .banner__image {
        width: 100%;
    }

    .banner__controllable {
        width: 200px;
        // min-height: 400px;
        position: absolute;
        top: 0;
        border: 1px dashed rgba(0, 0, 0, 0);
        // border: 1px dashed black;
        position: absolute;
        top: 0px;
        padding: 2px;
        background-color: #1a73e8;

        .controllable__editable {}
    }

    .banner__controllable--focused {
        border: 1px dashed black;
    }
}
</stylte>