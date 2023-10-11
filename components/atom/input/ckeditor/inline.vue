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
        <div ref="editorArea" class="ckeditor"
            :class="{ 'ckeditor--edit': !disabled || preview, 'ckeditor--focused': state.isFocused }"
            @click="emit('click', $event)">
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
const emit = defineEmits(['update:modelValue', 'blur', 'focus', 'click'])
const editorRef = ref(null)
const state = reactive({
    ckeditorInstance: null,
    id: null,
    isFocused: false,
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
                'undo',
                'redo',
                '|',
                'heading',
                '|',
                'fontSize',
                '|',
                'bold',
                'italic',
                'fontColor',
                '|',
                'link',
                'mediaEmbed',
                '|',
                'alignment',
                'bulletedList',
                'numberedList',
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
    },
    style: {
        type: Object,
        default: function () {
            return {}
        }
    },
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
    toggleClickWithin(true)
})
onBeforeUnmount(() => {
    const ckeditorInstance = state.ckeditorInstance
    if (ckeditorInstance) {
        ckeditorInstance.destroy()
    }
    toggleClickWithin(false)
})
watch(() => props.style, (style = {}) => {
    if (state.ckeditorInstance) {
        state.ckeditorInstance.ui.view.editable.element.style.height = `${props.style.height - 37.7}px`
    }
    // state.ckeditorInstance.ui.view.editable.element.style.maxHeight = props.style.height
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
        fontSize: {
            options: [
                8,
                9,
                10,
                11,
                12,
                'default',
                14,
                18,
                24,
                30,
                36,
                48,
                60,
                72,
                96,
            ]
        },
        toolbar: props.toolbar,
        placeholder: props.placeholder,
        // https://ckeditor.com/docs/ckeditor5/latest/support/licensing/managing-ckeditor-logo.html
        ui: {
            poweredBy: {
                position: 'border',
                // side: 'left',
                label: 'Job Pair'
            }
        },
        allow: [
            {
                name: /.*/,
                attributes: true,
                classes: true,
                styles: true
            }
        ],
    }
    // prd吃到importedEditor, dev吃到ClassicEditor, 
    const { default: importedEditor } = await import(/* @vite-ignore */`${runTimeConfig.public.siteUrl}/ckeditor/bundle.js`)
    const ClassicEditor = importedEditor?.InlineEditor || window.CKEDITOR.InlineEditor
    const element = document.querySelector(`#editor_${state.id}`)
    const editor = await ClassicEditor.create(element, editorConfig)
    // Set Height
    editor.ui.view.editable.element.style.maxHeight = props.style.height
    editor.editing.view.change(writer => {
        for (let attr in props.style) {
            const value = props.style[attr]
            writer.setStyle(attr, value, editor.editing.view.document.getRoot());
        }

    })
    // set view events
    editor.editing.view.document.on('change:isFocused', (evt, data, isFocused) => {
        if (isFocused) {
            emit('focus', evt)
            state.isFocused = true
        }
    })
    // set data
    if (localValue.value) {
        editor.setData(localValue.value)
    }
    if (props.disabled) {
        editor.enableReadOnlyMode(`editor_${state.id}`)
    }
    if (!props.modelValue) {
        localValue.value = '<p></p>'
    }
    editor.model?.document?.on('change:data', () => {
        let newValue = editor.getData()
        localValue.value = newValue
    })
    state.ckeditorInstance = markRaw(editor)
}
function toggleClickWithin(isOn) {
    if (isOn) {
        document.addEventListener('mousedown', handleClickWithin)
    } else {
        document.removeEventListener('mousedown', handleClickWithin)
    }
}
const currentInstance = getCurrentInstance()

function handleClickWithin(event) {
    const element = currentInstance.refs.editorArea
    const { target } = event
    if (element.contains(target)) {
        emit('focus', event)
        state.isFocused = true
    } else {
        emit('blur', event)
        state.isFocused = false
    }
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

// .ckeditor--edit {
//     border: none;
// }

// .ckeditor :deep(.ck-editor__editable_inline) {
//     min-height: 11em;
// }

// .ckeditor :deep(.ck-editor__editable) {
//     border: none !important;
//     background-color: rgba(0, 0, 0, 0) !important;
//     // min-width: 360px;
// }

// .ckeditor :deep(.ck-read-only) {
//     border: 1px solid #d3d3d3;
// }

// .ckeditor :deep(.ck-sticky-panel__content) {
//     border-bottom: 1px solid #ccced1;
// }

// .ckeditor :deep(.ck .ck-button__label) {
//     font-size: 13px !important;
// }

.ckeditor :deep(.ck-content) {
    // padding: 0;
}
</style>