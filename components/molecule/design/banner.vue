<template>
    <div class="banner" ref="banner">
        <img class="banner__image" src="https://storage.googleapis.com/public.prd.job-pair.com/asset/design/Bg.webp">
        <!-- 標題 -->
        <LazyAtomControllable v-model="state.controllable" @mousemove="handlePosition($event)">
            <!-- Title -->
            <LazyAtomInputCkeditorInline v-model="state.content" class="editorGroup__editor" @focus="handleFocus()"
                @click="handleFocus()" @blur="handleBlur()">
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
            left: '250px',
            top: '90px',
        },
        size: {
            width: '',
            height: '',
        }
    }
})
// methods
const currentInstance = getCurrentInstance()
function handlePosition(event) {
    const { left, top } = event
    state.controllable.position = {
        left: `${left}px`,
        top: `${top}px`,
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