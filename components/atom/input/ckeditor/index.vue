<template>
    <div>
        <div v-if="name" class="inputGroup__nameGroup">
            <span v-if="required" class="text-danger">*</span>
            {{ name }}
            <span v-if="hint">({{ hint }})</span>
        </div>
        <input v-show="false" :value="getValue()" :data-required="required" :data-name="name">
        <div class="ckeditor" :class="{ 'ckeditor--edit': !disabled || preview }">
            <div :id="`editor_${state.id}`" ref="editorRef">

            </div>
        </div>
    </div>
</template>
<script setup>
import { markRaw } from 'vue'
const { $uuid4, } = useNuxtApp()
const emit = defineEmits(['update:modelValue', 'blur'])
const editorRef = ref(null)
const state = reactive({
    ckeditorInstance: null,
    id: null,
})
const props = defineProps({
    modelValue: {
        type: String,
        default: ''
    },
    toolbar: {
        type: Array,
        default: function () {
            return [
                "heading",
                "|",
                'fontSize',
                "|",
                'bold',
                'italic',
                'link',
                'bulletedList',
                'numberedList',
                '|',
                'outdent',
                'indent',
                '|',
                'blockQuote',
                'insertTable',
                'mediaEmbed',
                'undo',
                'redo',
                '|',
                'removeFormat'
            ]
        }
    },
    disabled: {
        type: Boolean,
        default: false
    },
    preview: {
        type: Boolean,
        default: false,
    },
    required: {
        type: Boolean,
        default: false,
    },
    name: {
        type: String,
        default: ''
    },
    removePlatformLink: {
        type: Boolean,
        default: false
    },
    hint: {
        type: String,
        default: ''
    },
    placeholder: {
        type: String,
        default: ''
    }
})
let localValue = computed({
    get() {
        return props.modelValue ?? '' // important
    },
    set(newValue) {
        emit('update:modelValue', newValue)
    }
})
// hooks
onMounted(async () => {
    state.id = $uuid4()
    initializeCKEditor()
})
onBeforeUnmount(() => {
    const ckeditorInstance = state.ckeditorInstance
    if (ckeditorInstance) {
        ckeditorInstance.destroy()
    }
})
watch(() => localValue, (newValue, oldValue) => {
    const ckeditorInstance = state.ckeditorInstance
    // 職缺新增錯誤處理
    if (!newValue && oldValue && ckeditorInstance) {
        ckeditorInstance.setData(newValue)
    }
})
// methods
function getValue() {
    const case1 = !!props.modelValue
    const case2 = props.modelValue !== '<p></p>'
    return case1
}
function requestSelector(ClassicEditor, callback) {
    let localCount = 0
    function step() {
        if (localCount >= 100) {
            console.error(`Cannot find ClassicEditor`)
            return
        }
        if (ClassicEditor) {
            callback(ClassicEditor)
        } else {
            localCount++
            window.requestAnimationFrame(step)
        }
    }
    step()
}
async function initializeCKEditor() {
    if (!process.client) {
        return
    }
    const result = await import("~/assets/ckeditor5/build/ckeditor.js")
    for(let key in result) {
        console.log(result[key])
    }
    console.log({
        window
    });
    // 使用CDN
    const editorConfig = {
        toolbar: props.toolbar,
        placeholder: props.placeholder
    }
    const editor = await ClassicEditor.create(editorRef.value, editorConfig)
    if (localValue.value) {
        editor.setData(localValue.value)
    }
    if (props.disabled) {
        editor.enableReadOnlyMode(`editor_${state.id}`)
    }
    editor.editing.view.document.on('change:isFocused', (evt, data, isFocused) => {
        emit('blur', evt)
    })
    if (!props.modelValue) {
        localValue.value = '<p></p>'
    }
    editor.model.document.on('change:data', () => {
        let newValue = editor.getData()
        // 2022/11/09 Sandy@Line: 我想的是乾脆都擋，他們要放就直接放上網址
        if (props.removePlatformLink) {
            newValue = newValue.replaceAll(/href=".*?"/g, '')
        }
        localValue.value = newValue
    })
    state.ckeditorInstance = markRaw(editor)
}
// public method do not delete
async function setData(newValue) {
    const ckeditorInstance = state.ckeditorInstance
    if (ckeditorInstance) {
        ckeditorInstance.setData(newValue)
    } else {
        console.error('ckeditorInstance error', ckeditorInstance)
    }
}
defineExpose({
    setData
})
</script>
<style lang="scss" scoped>
.inputGroup__nameGroup {
    font-size: 16px;
    color: #1f1f1f;
    margin-bottom: 4px;
}
</style>
<style lang="scss">
.ckeditor--edit {
    border: 1px solid #d9d9d9;
    border-radius: 10px;
    overflow: hidden;
}

.ck-editor__editable_inline {
    min-height: 11em;
}

.ck-toolbar {
    border: none !important;
}

.ck-editor__editable {
    border: none !important;
}
</style>