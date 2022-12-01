<template>
    <div class="inputGroup">
        <div class="inputGroup__nameGroup">
            {{ name }}
        </div>
        <label class="inputGroup__label inputGroup__label--dahsed">
            <template v-if="localValue">
                <img class="label__image" :src="getImageSrc()">
                <img class="label__icon" src="./icon_upload_circle.svg" />
            </template>
            <div v-else class="label__placeholder">
                <img src="./icon_upload.svg">
                點擊上傳企業封面照
            </div>
            <input v-show="false" class="body__input" autocomplete="off" type="file" accept="image/*"
                @change="handleFiles($event)" />
        </label>
    </div>
</template>
<script>
import { Buffer } from 'buffer/'
export default {
    name: 'banner',
    data: function () {
        return {
            message: "",
        }
    },
    props: {
        name: {
            type: String,
            default: "",
        },
        modelValue: {
            default: function () {
                return ""
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
        size: {
            type: String,
            default: "150px",
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
        disabled() {
            this.message = ""
        },
    },
    methods: {
        getImageSrc() {
            if (!this.modelValue) {
                return
            }
            if (typeof this.modelValue === "string") {
                const expression =
                    /https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/
                const regex = new RegExp(expression)
                if (this.modelValue.match(regex)) {
                    return this.modelValue
                }
            }
            const { type, buffer } = this.modelValue
            let formatBuffer = buffer
            if (!(buffer instanceof Uint8Array)) {
                formatBuffer = Buffer.from(buffer)
            }
            const typedArray = new Uint8Array(formatBuffer)
            const blob = new Blob([typedArray], { type: `image/${type}` })
            const objectUrl = URL.createObjectURL(blob)
            return objectUrl
        },
        async handleFiles(event) {
            const { files } = event.target
            const file = files[0]
            const readerResult = await new Promise((resolve, reject) => {
                const reader = new FileReader()
                reader.readAsArrayBuffer(file)
                reader.onload = () => {
                    resolve(reader.result)
                }
                reader.onerror = (error) => reject(error)
            })
            const typeChunks = file.type.split("/")
            const type = typeChunks[1]
            const buffer = Buffer.from(readerResult) // Uint8Array
            const imageBlob = {
                type,
                buffer,
            }
            this.$emit("update:modelValue", imageBlob)
        },
    },
}
</script>
<style lang="scss" scoped>
.inputGroup {
    .inputGroup__nameGroup {
        margin-bottom: 10px;
    }

    .inputGroup__label {
        position: relative;
        cursor: pointer;
        width: 100%;
        background-color: white;
        min-height: 130px;
        text-align: center;

        .label__icon {
            position: absolute;
            bottom: 8px;
            right: 8px;
            width: 50px;
            height: 50px;
        }

        .label__image {
            display: block;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            max-height: 432px;
            width: fit-content;
            height: fit-content;
            margin: auto;
            max-width: 100%;
        }

        .label__placeholder {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            font-size: 16px;
            line-height: 1.5;
            text-align: left;
            color: #5ea88e;
            padding: 50px 0;
        }
    }
}

.inputGroup__label--dahsed {
    border: 1px dashed #5ea88e;
    border-radius: 10px;
}
</style>