<template>
    <div class="inputGroup" :ref="`inputGroup`" :class="{ 'inputGroup--error': message }">
        <div class="inputGroup__nameGroup">
            {{ name }}
        </div>
        <div class="inputGroup__body">
            <label class="body__label">
                <span v-if="modelValue && modelValue.name" class="body__placeholder">{{ modelValue.name }}</span>
                <span v-else class="body__placeholder">履歷名稱</span>
                <input v-show="false" class="body__input" :placeholder="placeholder" :disabled="disabled"
                    autocomplete="off" type="file" accept=".pdf" @change="handleFiles($event)" />
            </label>
            <button v-if="hasPreviewButton" class="body__preview" @click="openResume()">
                <img class="preview__icon" src="./icon_preview_g.svg" />
            </button>
        </div>
        <iframe v-if="modelValue && modelValue.buffer" v-show="hasPreview" id="inputGroup__viewer"
            class="inputGroup__viewer"></iframe>
    </div>
</template>
<script>
import { Buffer } from 'buffer/'
export default {
    name: 'resume',
    data: function () {
        return {
            message: "",
            fileName: null,
        }
    },
    props: {
        name: {
            type: String,
            default: ''
        },
        width: {
            type: [String, Number],
            default: "1",
        },
        modelValue: {
            type: [Object, String],
            default: function () {
                return {}
            },
        },
        required: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        placeholder: {
            type: String,
            default: "",
        },
        hasPreview: {
            type: Boolean,
            default: false,
        },
        hasPreviewButton: {
            type: Boolean,
            default: false,
        },
        sizeLimit: {
            type: Number,
            default: 0,
        },
    },
    computed: {
        localValue: {
            get() {
                return this.modelValue
            },
            set(newValue) {
                this.$emit("update:modelValue", newValue)
            },
        },
    },
    watch: {
        localValue: {
            handler: function (newValue) {
                const { buffer } = newValue
                if (!buffer) {
                    return
                }
                let blob = null
                if (buffer instanceof Uint8Array) {
                    blob = new Blob([buffer], { type: "application/pdf" })
                } else {
                    const pdfUnit8Array = new Uint8Array(buffer.data)
                    blob = new Blob([pdfUnit8Array], { type: "application/pdf" })
                }
                const obj_url = URL.createObjectURL(blob)
                this.$nextTick(() => {
                    const iframe = document.getElementById("inputGroup__viewer")
                    iframe.setAttribute("src", obj_url)
                    URL.revokeObjectURL(obj_url)
                })
            },
            immediate: true
        },
        disabled() {
            this.message = ""
        },
    },
    methods: {
        async handleFiles(event) {
            const { files } = event.target
            const file = files[0]
            if (!file) {
                return
            }
            const isOverSize = this.sizeLimit && file.size >= this.sizeLimit
            if (isOverSize) {
                this.$sweet.alert("PDF大小請勿超過5MB")
                return
            }
            this.fileName = file.name
            const arrayBuffer = await new Promise((resolve, reject) => {
                const reader = new FileReader()
                reader.readAsArrayBuffer(file)
                reader.onload = () => {
                    resolve(reader.result)
                }
                reader.onerror = (error) => reject(error)
            })
            const { lastModified, name, size } = file
            const buffer = Buffer.from(arrayBuffer)
            this.$emit("update:modelValue", {
                url: URL.createObjectURL(file),
                name,
                size,
                buffer,
                date: new Date().toISOString()
            })
        },
        async openResume() {
            window.open(this.modelValue.url)
        },
    },
}
</script>
<style lang="scss" scoped>
.inputGroup {
    .inputGroup__nameGroup {
        font-size: 18px;
        color: #1f1f1f;
        margin-bottom: 10px;
    }

    .inputGroup__body {
        display: flex;
        gap: 8px;

        .body__label {
            padding: 7px 12px;
            border: 1px solid #d3d3d3;
            border-radius: 10px;
            width: 100%;
            background-color: white;
            font-size: 18px;

            .label__input {
                border: none;
                width: 100%;

                &:focus {
                    outline: none;
                }
            }

            .body__placeholder {
                margin-right: 16px;
                color: #999999;
            }

        }

        .body__preview {
            background-color: inherit;
            border: none;
            padding: 0;

            .preview__icon {
                margin: auto;
                display: block;
                width: 32px;
                height: 32px;
            }
        }
    }

}

.inputGroup__viewer {
    margin-top: 24px;
    width: 100%;
    border: 1px solid black;
    border-radius: 3px;
    min-height: 250px;
}
</style>