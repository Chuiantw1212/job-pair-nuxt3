<template>
    <div class="inputResumes">
        <h1 class="resume__header"><span v-if="required" class="nameGroup__required">* </span>{{ name }}</h1>
        <div class="resume__hint">(請上傳{{
            acceptText
            }}檔)</div>
        <template v-for="number in Math.ceil(modelValue.length / 3)">
            <div v-if="modelValue.slice((number - 1) * 3, (number) * 3).length" :key="`row${number}`"
                class="resumes__previewGroup">
                <div class="previewGroup__item"
                    v-for="(item, index) in modelValue.slice((number - 1) * 3, (number) * 3)"
                    :key="`row${number}col${index}`">
                    <!-- <div v-if="checkIsImage(item)">
                        <img :src="item.url" class="previewGroup__item__viewer">
                    </div> -->
                    <div class="previewGroup__item__body">
                        <div v-if="item.name" class="previewGroup__item__body__item">
                            <div class="item__name">
                                {{ item.name }}
                            </div>
                            <button class="doc__btn" @click="deleteResume(number, index)">
                                <img class="btn__icon" src="./icon_delete_g.svg" />
                            </button>
                        </div>
                        <div v-if="item.date"
                            class="previewGroup__item__body__item previewGroup__item__body__item--date">
                            {{ $filter.time(item.date) }}
                            <button class="doc__btn" @click="openFileInTab(item)">
                                <img class="btn__icon" src="./icon_preview_g.svg" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <label class="resume__footer" :class="{ 'resume__footer--disabled': isMaxLimit }">
            <div class="footer__btn">
                <img v-if="isMaxLimit" class="btn__icon" src="./addDisabled.svg" />
                <img v-else class="btn__icon" src="./Add.svg" />
                <span>新增檔案</span>
                <input v-show="false" autocomplete="off" type="file" :accept="accept" @change="handleFiles($event)"
                    :disabled="isMaxLimit" :data-required="required" :data-name="name"
                    :data-value="modelValue.length !== 0">
            </div>
        </label>
    </div>
</template>
<script>
import { Buffer } from 'buffer/'
export default {
    name: 'uploader',
    props: {
        modelValue: {
            type: Array,
            default: function () {
                return []
            }
        },
        name: {
            type: String,
            default: ''
        },
        required: {
            type: Boolean,
            default: false,
        },
        accept: {
            type: String,
            default: '.pdf,image/*'
        },
        size: {
            type: Number,
            default: 0
        },
        max: {
            type: Number,
            default: 0
        },
        getFileBuffer: {
            type: Function,
            default: function () { }
        }
    },
    computed: {
        isMaxLimit() {
            return this.max && this.localValue.length >= this.max
        },
        localValue: {
            get() {
                return this.modelValue
            },
            set(newValue) {
                this.$emit('update:modelValue', newValue)
            }
        },
        acceptText() {
            return this.accept.replace('image/*', '圖像')
        }
    },
    methods: {
        checkIsImage(item) {
            return item.type && item.type.includes('image')
        },
        async handleFiles(event) {
            const { files } = event.target
            const file = files[0]
            if (!file) {
                return
            }
            const isOverSize = this.size && file.size >= this.size
            if (isOverSize) {
                const sizeKB = Math.floor(this.size / 1024)
                this.$sweet.alert(`大小請勿超過${sizeKB}KB`)
                return
            }
            const arrayBuffer = await new Promise((resolve, reject) => {
                const reader = new FileReader()
                reader.readAsArrayBuffer(file)
                reader.onload = () => {
                    resolve(reader.result)
                }
                reader.onerror = (error) => reject(error)
            })
            const { name, size, type } = file
            const buffer = Buffer.from(arrayBuffer)
            const newFile = {
                url: URL.createObjectURL(file),
                name,
                size,
                buffer,
                type,
                date: new Date().toISOString()
            }
            const sameFileIndex = this.localValue.findIndex(item => {
                return item.name === newFile.name
            })
            const newFiles = [...this.localValue]
            if (sameFileIndex !== -1) {
                newFiles[sameFileIndex] = newFile
            } else {
                newFiles.push(newFile)
            }
            this.$emit("update:modelValue", newFiles)
        },
        async openFileInTab(item) {
            const { buffer, type = 'application/pdf' } = item
            let fileBuffer = buffer
            if (!fileBuffer) {
                fileBuffer = await this.getFileBuffer(item)
            }
            const blob = new Blob([fileBuffer], { type })
            const objectUrl = URL.createObjectURL(blob)
            window.open(objectUrl, '_blank')
        },
        async deleteResume(row = 0, col = 0) {
            const index = (row - 1) * 3 + col
            this.localValue.splice(index, 1)
        },
    }
}
</script>
<style lang="scss" scoped>
.inputResumes {
    .resume__header {
        font-size: 18px;
        margin-bottom: 4px;
        font-weight: 400;
    }

    .resume__hint {
        color: var(--Grays-Tert, #A6A6A6);

        /* H4-12-Regular */
        font-family: "PingFang TC";
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        margin: 5px 0px;
    }

    .resumes__previewGroup {
        display: flex;
        flex-direction: column;
        gap: 20px;
        margin-bottom: 10px;

        .previewGroup__item {
            border-radius: 10px;
            border: solid 1px #d3d3d3;
            overflow: hidden;
            width: 100%;

            .previewGroup__item__viewer {
                height: 300px;
                width: auto;
                display: block;
                margin: auto;
            }

            .previewGroup__item__body {
                padding: 20px;
                font-size: 18px;

                .previewGroup__item__body__item {
                    display: flex;
                    justify-content: space-between;

                    .item__name {
                        width: calc(100% - 26px);
                        text-overflow: ellipsis;
                        overflow: hidden;
                    }


                    .doc__btn {
                        background-color: inherit;
                        border: none;
                        padding: 0;

                        .btn__icon {
                            display: block;
                            width: 20px;
                            height: 20px;
                        }

                    }
                }

                .previewGroup__item__body__item--date {
                    color: #999;
                }
            }
        }
    }

    .resume__footer {
        border-radius: 10px;
        border: dashed 1px #5ea88e;
        width: 100%;
        padding: 8px 0;
        display: block;
        cursor: pointer;

        .footer__btn {
            width: 100%;
            display: flex;
            background-color: inherit;
            border: none;
            padding: 0;
            justify-content: center;
            color: #5ea88e;
            align-items: center;
            font-size: 18px;
            cursor: pointer;

            .btn__icon {
                display: block;
                width: 14px;
                height: 14px;
                margin-right: 8px;
            }
        }
    }

    .resume__footer--disabled {
        border: dashed 1px #d3d3d3;

        .footer__btn {
            color: #d3d3d3;
            cursor: inherit;
        }
    }
}

@media screen and (min-width:992px) {
    .inputResumes {
        .resumes__previewGroup {
            display: flex;
            flex-direction: row;
            gap: 20px;

            .previewGroup__item {
                width: 33%;
            }
        }
    }
}
</style>