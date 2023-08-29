<template>
    <div>
        <div v-if="name" class="inputGroup__nameGroup">
            <span v-if="required" class="text-danger">*</span>
            {{ name }}
            <span v-if="hint">({{ hint }})</span>
            <span>
                <slot>

                </slot>
            </span>
        </div>
        <input v-show="false" :value="checkValue()" :data-required="required" :data-name="name">
        <div class="ckeditor" :class="{ 'ckeditor--edit': !disabled || preview }">
            <div :id="`editor_${state.id}`" ref="editorRef">

            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ckeditor',
}
</script>
<script setup>
import { markRaw } from 'vue'
const { $uuid4, $requestSelector } = useNuxtApp()
const runTimeConfig = useRuntimeConfig()
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
                'heading',
                '|',
                'bold',
                'italic',
                'link',
                'bulletedList',
                'numberedList',
                '|',
                // 'imageUpload',
                'mediaEmbed',
                'undo',
                'redo',
                '|',
                'removeFormat',
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
    },
    style: {
        type: Object,
        default: function () {
            return {}
        }
    }
})
let localValue = computed({
    get() {
        const value = props.modelValue ?? ''
        const ckeditorInstance = state.ckeditorInstance
        if (value && ckeditorInstance) {
            ckeditorInstance.setData(newValue)
        }
        return value  // important
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
// methods
function checkValue() {
    const case1 = !!props.modelValue
    const case2 = props.modelValue !== '<p></p>'
    const hasValue = case1 && case2
    return hasValue
}
async function initializeCKEditor() {
    if (!process.client) {
        return
    }
    // 使用CDN
    const editorConfig = {
        initialData: localValue.value || '<p></p>',
        toolbar: props.toolbar,
        placeholder: props.placeholder,
        // https://ckeditor.com/docs/ckeditor5/latest/support/licensing/managing-ckeditor-logo.html
        ui: {
            poweredBy: {
                position: 'inside',
                // side: 'left',
                label: 'Job Pair'
            }
        }
    }
    // prd吃到importedEditor, dev吃到ClassicEditor, 
    const { default: importedEditor } = await import(/* @vite-ignore */`${runTimeConfig.public.siteUrl}/ckeditor/bundle.js`)
    const ClassicEditor = importedEditor || window.ClassicEditor
    const element = document.querySelector(`#editor_${state.id}`)
    const editor = await ClassicEditor.create(element, editorConfig)
    editor.ui.view.editable.element.style.maxHeight = props.style.height
    // Set Height
    editor.editing.view.change(writer => {
        for (let attr in props.style) {
            const value = props.style[attr]
            writer.setStyle(attr, value, editor.editing.view.document.getRoot());
        }

    })
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
    editor.model?.document?.on('change:data', () => {
        let newValue = editor.getData()
        localValue.value = newValue
    })
    state.ckeditorInstance = markRaw(editor)
}
// public method do not delete
async function setData(newValue) {
    $requestSelector(`#editor_${state.id}`, () => {
        const ckeditorInstance = state.ckeditorInstance
        if (ckeditorInstance) {
            ckeditorInstance.setData(newValue)
        }
    })
}
defineExpose({
    setData
})
</script>
<style lang="scss" scoped>
.inputGroup__nameGroup {
    font-size: 18px;
    font-weight: bold;
    color: #1f1f1f;
    margin-bottom: 4px;
    display: flex;
    align-items: center;
}
</style>
<style lang="scss">
.ckeditor--edit {
    border: 1px solid #d3d3d3;
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

.ck-read-only {
    border: 1px solid #d3d3d3;
}
</style>