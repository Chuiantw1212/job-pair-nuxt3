<template>
    <div class="profile__portfolio">
        <h1 class="portfolio__header">作品集</h1>
        <div class="portfolio__inputGroup" v-for="(work, index) in localValue" :key="index">
            <LazyAtomInputText placeholder="專案名稱" v-model="localValue[index].name" class="portfolio__work"
                :disabled="disabled">
            </LazyAtomInputText>
            <LazyAtomInputText placeholder="作品集連結" v-model="localValue[index].url" class="portfolio__work"
                :disabled="disabled">
            </LazyAtomInputText>
            <a v-if="disabled" :href="localValue[index].url" target="_blank">
                <button class="doc__btn">
                    <img class="btn__icon" src="./icon_preview_g.svg" />
                </button>
            </a>
            <button v-else class="doc__btn" @click="deleteWork(index)" :disabled="disabled">
                <img class="btn__icon" src="./icon_delete_g.svg" />
            </button>
        </div>
        <label v-if="!disabled" class="resume__footer" :class="{ 'resume__footer--disabled': localValue.length >= 3 }">
            <button class="footer__btn" @click="newWork()" :disabled="disabled || localValue.length >= 3">
                <img v-if="localValue.length >= 3" class="btn__icon" src="./addDisabled.svg" />
                <img v-else class="btn__icon" src="./Add.svg" />
                <span>新增項目</span>
                <input v-show="false" :value="localValue.length" :data-required="required">
            </button>
        </label>
    </div>
</template>
<script>
export default {
    props: {
        modelValue: {
            type: Array,
            default: function () {
                return []
            }
        },
        disabled: {
            type: Boolean,
            default: false
        },
        required: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        localValue: {
            get() {
                return this.modelValue
            },
            set(newValue) {
                this.$emit('update:modelValue', newValue)
            }
        }
    },
    methods: {
        deleteWork(index) {
            this.localValue.splice(index, 1)
        },
        newWork() {
            this.localValue.push({
                url: "",
                name: "",
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.profile__portfolio {
    margin-top: 20px;

    .portfolio__inputGroup {
        display: flex;
        gap: 10px;
        margin-bottom: 20px;
        align-items: center;

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

    .portfolio__header {
        font-size: 16px;
        margin-bottom: 10px;
    }

    .portfolio__work {
        width: 100%;
    }

    .resume__footer {
        border-radius: 10px;
        border: dashed 1px #5ea88e;
        width: 100%;
        padding: 8px 0;
        margin-top: 10px;
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
</style>