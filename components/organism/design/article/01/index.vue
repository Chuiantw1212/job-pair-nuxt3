<template>
    <div class="columns">
        <AtomDesignBackground class="columns__body" v-if="localValue.controllable" v-model="localValue.controllable.img">
            <template v-if="readonly">
                <div v-html="localValue.controllable.title.html" class="body__title"></div>
                <div v-html="localValue.controllable.desc.html" class="body__desc"></div>
            </template>
            <template v-else>
                <LazyAtomInputCkeditorInline class="body__title" v-model="localValue.controllable.title.html"
                    :toolbar="state.titleToolbar">
                </LazyAtomInputCkeditorInline>
                <LazyAtomInputCkeditorInline class="body__desc" v-model="localValue.controllable.desc.html">
                </LazyAtomInputCkeditorInline>
            </template>
        </AtomDesignBackground>
    </div>
</template>
<script setup>
const emit = defineEmits(['update:modelValue'])
const state = reactive({
    titleToolbar: [
        'bold',
        'fontColor',
    ],
})
const props = defineProps({
    modelValue: {
        type: Object,
        default: function () {
            return {
                name: 'ARTICLE01',
            }
        }
    },
    readonly: {
        type: Boolean,
        default: false
    }
})
const localValue = computed({
    get() {
        return props.modelValue
    },
    set(newValue) {
        emit('update:modelValue', newValue)
    }
})
watch(() => localValue.value, (newValue) => {
    if (!newValue.controllable) {
        const defaultValue = {
            name: 'ARTICLE01',
            controllable: {
                title: {
                    html: '<p><span><strong>公司福利</strong></span></p>'
                },
                desc: {
                    html: '<ul><li><span>彈性自由的工作環境</span></li><li><span>優於勞基法的休假制度</span></li><li><span>每月NT1,000學習補貼，鼓勵員工主動學習</span></li><li><span>三節禮金</span></li></ul>'
                },
                img: {
                    url: 'https://storage.googleapis.com/public.prd.job-pair.com/asset/design/Group.webp'
                }
            }
        }
        const mergedItem = Object.assign(defaultValue, newValue)
        localValue.value = mergedItem
    }
}, { immediate: true })
</script>
<style lang="scss" scoped>
.columns {

    .columns__body {
        background-repeat: no-repeat;
        background-position: bottom right;
        background-size: contain;
        background-color: white;
        align-items: center;
        padding: 30px 20px;
        display: flex;
        flex-direction: column;
        gap: 20px;

        .body__title {
            font-size: 20px;
            font-weight: bold;
            font-stretch: normal;
            font-style: normal;
            line-height: normal;
            letter-spacing: normal;
        }

        .body__desc {
            font-size: 24px;
            font-weight: normal;
            font-stretch: normal;
            font-style: normal;
            line-height: 1.42;
            letter-spacing: normal;
        }
    }
}


@media screen and (min-width: 992px) {
    .columns {
        flex-direction: row;
        justify-content: space-evenly;
        background-size: contain;

        .columns__body {
            display: flex;
            align-items: center;
            flex-direction: row;
            justify-content: center;
            gap: 100px;

            .body__title {
                font-size: 36px;
                font-weight: 600;
                font-stretch: normal;
                font-style: normal;
                line-height: normal;
                letter-spacing: normal;
            }

            .body__desc {
                font-size: 24px;
                font-weight: normal;
                font-stretch: normal;
                font-style: normal;
                line-height: 1.42;
                letter-spacing: normal;
            }
        }
    }
}
</style>