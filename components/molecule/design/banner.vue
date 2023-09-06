<template>
    <div class="banner" ref="banner">
        <img class="banner__image" src="https://storage.googleapis.com/public.prd.job-pair.com/asset/design/Bg.webp"
            draggable="false">
        <LazyAtomControllable v-model="state.controllable" @move="handlePosition($event)"
            ref="title">
            <LazyAtomInputCkeditorInline v-model="state.content" :style="state.editorStyle" class="editorGroup__editor"
                @focus="handleFocus()" @click="handleFocus()" @blur="handleBlur()">
            </LazyAtomInputCkeditorInline>
        </LazyAtomControllable>
    </div>
</template>
<script setup>
const state = reactive({
    content: '<p><span style="color:hsl(0,0%,100%);font-size:96px;"><strong>找工作就像談戀愛</strong></span></p>',
    isFocused: false,
    controllable: {
        isFocused: false,
        position: {
            left: 0,
            top: 0,
        },
        size: {
            width: '',
            height: '',
        }
    },
    editorStyle: {
        width: '',
        height: '',
    }
})
const currentInstance = getCurrentInstance()
// methods
function handlePosition(event) {
    const { left = 0, top = 0, offsetWidth, offsetHeight, } = event
    const area = currentInstance.refs.banner
    const { clientHeight, clientWidth } = area
    const boundLeft = Math.min(left, clientWidth - offsetWidth)
    const boundHeight = Math.min(top, clientHeight - offsetHeight)
    state.controllable.position = {
        left: boundLeft,
        top: boundHeight
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
        position: absolute;
        top: 0;
        border: 1px dashed rgba(0, 0, 0, 0);
        position: absolute;
        top: 0px;
        padding: 2px;
        background-color: #1a73e8;
    }

    // .banner__controllable--focused {
    //     border: 1px dashed black;
    // }
}
</stylte>