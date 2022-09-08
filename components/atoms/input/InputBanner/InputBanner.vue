<template>
    <div class="inputGroup">
        <div class="inputGroup__nameGroup">
            {{ name }}
        </div>
        <label class="inputGroup__label">
            <img v-if="localValue" class="label__image" :src="getImageSrc()">
            <img v-else class="label__image" :src="placeholderImage">
            <img class="label__icon" src="./icon_upload_circle.svg" />
            <input v-show="false" class="body__input" autocomplete="off" type="file" accept="image/*"
                @change="handleFiles($event)" />
        </label>
    </div>
</template>
<script>
import { Buffer } from 'buffer/'
import placeholderImage from './placeholder.png'
export default {
    data: function () {
        return {
            message: "",
            placeholderImage
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
        // placeholder: {
        //     type: [String, Object],
        //     default: function () {
        //         return ''
        //     }
        // }
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
            // return `url(${objectUrl})`
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

    .inputGroup__label {
        margin-top: 10px;
        position: relative;
        cursor: pointer;
        width: 100%;

        .label__icon {
            position: absolute;
            bottom: 0;
            right: 0;
            width: 50px;
            height: 50px;
        }

        .label__image {
            display: block;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            // border-radius: 50%;
            width: 100%;
            height: fit-content;
            border: 1px solid rgb(239, 239, 239);
        }
    }
}
</style>