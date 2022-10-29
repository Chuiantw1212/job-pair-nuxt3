<template>
    <div class="inputResumes">
        <h1 class="resume__header"><span v-if="required" class="text-danger">* </span>{{ name }}(請上傳{{ accept }}檔)</h1>
        <div class="resumes__previewGroup">
            <div class="previewGroup__item" v-for="(item, index) in modelValue.slice(0, 3)">
                <div v-if="checkIsImage(item)">
                    <img :src="item.url" class="previewGroup__item__viewer">
                </div>
                <iframe v-else-if="item.url" :id="`viewer_${id}`" class="previewGroup__item__viewer"
                    :src="item.url"></iframe>
                <div class="previewGroup__item__body">
                    <div v-if="item.name" class="previewGroup__item__body__item">
                        <div class="item__name">
                            {{ item.name }}
                        </div>
                        <button class="doc__btn" @click="deleteResume(index)">
                            <img class="btn__icon" src="./icon_delete_g.svg" />
                        </button>
                    </div>
                    <div v-if="item.date" class="previewGroup__item__body__item previewGroup__item__body__item--date">
                        {{ $filter.time(item.date) }}
                        <button class="doc__btn" @click="openResume(item)">
                            <img class="btn__icon" src="./icon_preview_g.svg" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="resumes__previewGroup">
            <div class="previewGroup__item" v-for="(item, index) in modelValue.slice(3, 6)">
                <div v-if="checkIsImage(item)">
                    <img :src="item.url" class="previewGroup__item__viewer">
                </div>
                <iframe v-else-if="item.url" :id="`viewer_${id}`" class="previewGroup__item__viewer"
                    :src="item.url"></iframe>
                <div class="previewGroup__item__body">
                    <div v-if="item.name" class="previewGroup__item__body__item">
                        <div class="item__name">
                            {{ item.name }}
                        </div>
                        <button class="doc__btn" @click="deleteResume(index)">
                            <img class="btn__icon" src="./icon_delete_g.svg" />
                        </button>
                    </div>
                    <div v-if="item.date" class="previewGroup__item__body__item previewGroup__item__body__item--date">
                        {{ $filter.time(item.date) }}
                        <button class="doc__btn" @click="openResume(item)">
                            <img class="btn__icon" src="./icon_preview_g.svg" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
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
    data: function () {
        const id = this.uuid()
        return {
            id,
        }
    },
    props: {
        modelValue: {
            type: Array,
            default: function () {
                return []
            }
        },
        name: {
            type: String,
            default: '履歷'
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
        }
    },
    watch: {
        modelValue(newValue) {

        },
    },
    methods: {
        uuid() {
            return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
                (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
            )
        },
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
                this.$alert(`大小請勿超過${sizeKB}KB`)
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
            const { lastModified, name, size, type } = file
            const buffer = Buffer.from(arrayBuffer)
            const newResume = {
                url: URL.createObjectURL(file),
                name,
                size,
                buffer,
                type,
                date: new Date().toISOString()
            }
            const sameResumeIndex = this.localValue.findIndex(item => {
                return item.name === newResume.name
            })
            const newResumes = [...this.localValue]
            if (sameResumeIndex !== -1) {
                newResumes[sameResumeIndex] = newResume
            } else {
                newResumes.push(newResume)
            }
            this.$emit("update:modelValue", newResumes)
        },
        async openResume(item) {
            window.open(item.url)
        },
        async deleteResume(index) {
            this.localValue.splice(index, 1)
        },
    }
}
</script>
<style lang="scss" scoped>
.inputResumes {
    .resume__header {
        font-size: 16px;
        margin-bottom: 4px;
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
            // display: flex;
            // flex-direction: column;
            // justify-content: center;

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
        .resume__header {
            font-size: 16px;
        }

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