<template>
    <div :id="id">
        <div v-if="name" class="inputGroup__nameGroup">
            <span v-if="required" class="text-danger">*</span>
            {{ name }}
        </div>
        <input v-show="false" :value="!!modelValue" :data-required="required" :data-name="name">
        <div class="ckeditor" :class="{ 'ckeditor--edit': !disabled || preview }">
            <div :id="`editor_${state.id}`">

            </div>
        </div>
    </div>
</template>
<script setup>
import { markRaw } from 'vue'
const { $Editor, $uuid4, $requestSelector } = useNuxtApp()
const emit = defineEmits(['update:modelValue', 'blur'])
const state = reactive({
    ckeditorInstance: null,
    id: $uuid4(),
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
onMounted(() => {
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
async function initializeCKEditor() {
    $requestSelector(`#editor_${state.id}`, async (element) => {
        const editor = await $Editor.create(element, {
            toolbar: props.toolbar,
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
        editor.model.document.on('change:data', () => {
            let newValue = editor.getData()
            if (this.removePlatformLink) {
                newValue = newValue.replaceAll(/href=".*?"/g, '')
            }
            localValue.value = newValue
        })
        state.ckeditorInstance = markRaw(editor)
    })
}
// public method do not delete
async function setData(newValue) {
    $requestSelector(`#editor_${state.id}`, async () => {
        const ckeditorInstance = state.ckeditorInstance
        ckeditorInstance.setData(newValue)
    })
}
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