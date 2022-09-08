<template>
    <div :id="id">
        <div v-if="name" class="inputGroup__nameGroup">
            <span v-if="required" class="text-danger">*</span>
            {{  name  }}
        </div>
        <input v-show="false" :value="!!modelValue" :data-required="required" :data-name="name">
        <div class="ckeditor" :class="{ 'ckeditor--edit': !disabled || preview }">
            <div :id="`editor_${id}`">

            </div>
        </div>
    </div>
</template>
<script>
import uuid from "@/libs/uuid4.js"
import Editor from 'ckeditor5-custom-build'
import { markRaw } from 'vue'
export default {
    data: function () {
        return {
            ckeditorInstance: null,
            id: uuid(),
        }
    },
    props: {
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
    },
    computed: {
        localValue: {
            get() {
                return this.modelValue ?? '' // important
            },
            set(newValue) {
                this.$emit('update:modelValue', newValue)
            }
        },
    },
    watch: {
        localValue(newValue, oldValue) {
            const ckeditorInstance = this.ckeditorInstance
            // 職缺新增錯誤處理
            if (!newValue && oldValue && ckeditorInstance) {
                ckeditorInstance.setData(newValue)
            }
        }
    },
    async mounted() {
        this.initializeCKEditor()
    },
    beforeUnmount() {
        const ckeditorInstance = this.ckeditorInstance
        if (ckeditorInstance) {
            ckeditorInstance.destroy()
        }
    },
    methods: {
        async initializeCKEditor() {
            this.$requestSelector(`#editor_${this.id}`, async (element) => {
                const ckInstance = await Editor.create(element, {
                    toolbar: this.toolbar,
                })
                if (this.localValue) {
                    ckInstance.setData(this.localValue)
                }
                if (this.disabled) {
                    ckInstance.enableReadOnlyMode(`editor_${this.id}`)
                }
                ckInstance.model.document.on('change:data', () => {
                    let newValue = ckInstance.getData()
                    if (this.removePlatformLink) {
                        newValue = newValue.replaceAll(/href=".*?"/g, '')
                    }
                    this.localValue = newValue
                })
                this.ckeditorInstance = markRaw(ckInstance)
            })
        },
        async setData(newValue) {
            this.$requestSelector(`#editor_${this.id}`, async () => {
                const ckeditorInstance = this.ckeditorInstance
                ckeditorInstance.setData(newValue)
            })
        }
    }
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