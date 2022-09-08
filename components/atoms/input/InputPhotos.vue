<template>
    <div class="inputGroup" :ref="`inputGroup`" :class="{ 'inputGroup--error': message }">
        <label class="inputGroup__body">
            <div class="inputGroup__nameGroup">
                <span class="nameGroup__text" :class="{ 'nameGroup__text--required': required }">
                    <slot> </slot>
                </span>
                <span class="inputGroup__message">{{ message }}</span>
            </div>
            <span v-if="file && file.name" class="body__placeholder">{{ file.name }}</span>
            <span v-else class="body__placeholder">{{ placeholder }}</span>
            <input v-show="false" class="body__input" :placeholder="placeholder" autocomplete="off" type="file" multiple
                :data-required="required" :data-name="name" @change="handleFiles($event)" />
            <i class="fas fa-images body__icon"></i>
        </label>
        <div class="glide" :class="`glide${id}`">
            <div class="glide__track" data-glide-el="track">
                <ul class="glide__slides">
                    <template v-for="(image, index) in imageSrc" :key="index">
                        <li class="glide__slide">
                            <img id="inputGroup__viewer1" class="inputGroup__viewer" :style="{
                                'background-image': `url(${image})`,
                            }" />
                        </li>
                    </template>
                </ul>
            </div>
            <div class="glide__bullets" data-glide-el="controls[nav]">
                <template v-for="(image, index) in imageSrc" :key="index">
                    <button class="glide__bullet" :data-glide-dir="`=${index}`"></button>
                </template>
            </div>
        </div>
    </div>
</template>
<script>
import uuid from "@/libs/uuid4.js"
import Glide from "@glidejs/glide"
import { Buffer } from 'buffer'
export default {
    data: function () {
        return {
            id: uuid(),
            message: "",
            file: null,
            glideInstance: null,
            glideMobileConfig: {
                perView: 1,
            },
            glideDesktopConfig: {
                perView: 3,
            },
            imageSrc: [],
            resizeTimer: null,
        }
    },
    props: {
        width: {
            type: [String, Number],
            default: "1",
        },
        modelValue: {
            type: Array,
            default: function () {
                return []
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
        name: {
            type: String,
            default: ''
        }
    },
    mounted() {
        this.initialGlide()
        window.addEventListener("resize", this.setTimeForGlide)
    },
    beforeUnmount() {
        if (this.glideInstance) {
            this.glideInstance.destroy()
        }
        window.removeEventListener("resize", this.setTimeForGlide)
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
        modelValue: {
            handler: function (files = []) {
                const urls = files.map((file, index) => {
                    if (typeof file === 'string') {
                        return file
                    } else {
                        const { type, buffer } = file
                        const typedArray = new Uint8Array(buffer.data)
                        const blob = new Blob([typedArray], { type })
                        const obj_url = URL.createObjectURL(blob)
                        return obj_url
                    }
                })
                this.imageSrc = urls
                if (this.glideInstance) {
                    this.glideInstance.destroy()
                }
                this.$nextTick(() => {
                    this.initialGlide()
                })
            },
            immediate: true
        },
        disabled() {
            this.message = ""
        },
    },
    methods: {
        setTimeForGlide() {
            clearTimeout(this.resizeTimer)
            this.resizeTimer = setTimeout(this.initialGlide, 200)
        },
        initialGlide() {
            const width = window.innerWidth
            let config = this.glideMobileConfig
            if (width >= 992) {
                config = this.glideDesktopConfig
            }
            const glideInstance = new Glide(`.glide${this.id}`, config)
            glideInstance.mount()
            this.glideInstance = glideInstance
        },
        async handleFiles(event) {
            const { files } = event.target
            const array = Array.from(files)
            const allowedFileTypes = ["image/png", "image/jpeg", "image/gif"]
            const readPromises = array.map(async (file) => {
                if (!allowedFileTypes.includes(file.type)) {
                    return false
                }
                const reader = new FileReader()
                reader.readAsDataURL(file)
                const readerResult = await new Promise((resolve, reject) => {
                    const reader = new FileReader()
                    reader.readAsArrayBuffer(file)
                    reader.onload = () => {
                        resolve(reader.result)
                    }
                    reader.onerror = (error) => reject(error)
                })
                const buffer = Buffer.from(readerResult)
                const typeChunks = file.type.split("/")
                const type = typeChunks[1]
                return {
                    type,
                    buffer: {
                        type: "Buffer",
                        data: buffer,
                    },
                }
            })
            const readResults = await Promise.all(readPromises)
            this.$emit("update:modelValue", readResults)
        },
    },
}
</script>
<style lang="scss" scoped>
.inputGroup__body {
    display: flex;
    align-items: center;
    padding: 8px 0;
    border: 1px solid #b3b3b3;
    margin-bottom: 24px;
    border-radius: 10px;

    .nameGroup__text {
        white-space: nowrap;
        margin-right: 16px;
    }

    .body__placeholder {
        color: rgba(51, 51, 51, 0.6);
        font-size: 16px;
        margin-right: 16px;
    }

    .body__icon {
        align-self: flex-end;
    }
}

.inputGroup__viewer {
    width: 100%;
    border: 1px solid black;
    border-radius: 3px;
    min-height: 200px;
    background-size: cover;
}

.glide__arrows {
    display: flex;
    justify-content: space-between;
    // .glide__track{

    // }
    .glide__arrow {
        color: black;
        position: relative;
        transform: unset;
    }
}
</style>