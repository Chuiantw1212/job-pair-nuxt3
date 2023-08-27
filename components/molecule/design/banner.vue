<template>
    <div class="banner">
        <img class="banner__image" src="https://storage.googleapis.com/public.prd.job-pair.com/asset/design/Bg.webp">
        <LazyAtomControllable v-model="state.controllable">
            <LazyAtomInputCkeditorInline v-model="state.content" class="editorGroup__editor" @focus="handleFocus()"
                @blur="handleBlur()">
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
            top: '10%',
            left: '10%',
        }
    }
})
onMounted(async () => {
    // const { default: EditorJS } = await import(/* @vite-ignore */`${runTimeConfig.public.siteUrl}/editorjs.mjs`)
    // console.log(EditorJS);
    // const editor = new EditorJS({
    //     holder: 'editorjs'
    // });
    // // const editor = new EditorJS();
    // console.log(importedEditor);
})
// methods
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