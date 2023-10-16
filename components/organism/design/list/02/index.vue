
<template>
    <div v-if="localValue.controllable" class="rowGroup">
        <template v-if="readonly">

        </template>
        <template v-else>
            <LazyAtomInputCkeditorInline v-model="localValue.controllable.title.html" :toolbar="state.titleToolbar"
                class="rowGroup__title">
            </LazyAtomInputCkeditorInline>
            <div v-for="(item, index) in localValue.controllable.items" :key="index" class="rowGroup__item">
                <AtomDesignImg class="item__imgWrap" :modelValue="localValue.controllable.items[index].img"
                    @update:modelValue="uploadAsset($event, index)">
                    <img class="imgWrap__img" :src="item.img.url">
                </AtomDesignImg>
                <LazyAtomInputCkeditorInline v-model="localValue.controllable.items[index].title.html" class="item__title">
                </LazyAtomInputCkeditorInline>
                <LazyAtomInputCkeditorInline v-model="localValue.controllable.items[index].desc.html" class="item__desc">
                </LazyAtomInputCkeditorInline>
            </div>
        </template>
        <!-- <div class="rowGroup__item">
            <img class="item__imgWrap" src="./image2.webp">
            <LazyAtomInputCkeditorInline v-if="localValue.controllable" v-model="localValue.controllable.items[1].html">
            </LazyAtomInputCkeditorInline>
        </div>
        <div class="rowGroup__item">
            <img class="item__imgWrap" src="./image3.webp">
            <LazyAtomInputCkeditorInline v-if="localValue.controllable" v-model="localValue.controllable.items[2].html">
            </LazyAtomInputCkeditorInline>
        </div> -->
    </div>
</template>
<script setup>
const { $sweet } = useNuxtApp()
const repoOrganizationDesign = useRepoOrganizationDesign()
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
                name: 'LIST02',
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
            name: 'LIST02',
            controllable: {
                title: {
                    html: '<p><span><strong>標題</strong></span></p>'
                },
                items: [
                    {
                        title: {
                            html: '<p><span><strong>不花錢買廣告，很難被看見？</strong></span></p>'
                        },
                        desc: {
                            html: '<p><span style="color:hsl( 0, 0%, 20% );">求職者在搜尋職缺時，是透過「適配度」排序，讓適合的人才更快看到你的公司</span></p>'
                        },
                        img: {
                            url: 'https://storage.googleapis.com/public.prd.job-pair.com/asset/design/LIST02_1.webp'
                        }
                    },
                    {
                        title: {
                            html: '<p><span><strong>要怎麼提升招聘效能，減少時間成本呢？</strong></span></p>'
                        },
                        desc: {
                            html: '<p><span style="color:hsl( 0, 0%, 20% );">透過「適配度」排序，不用一下子看上百封履歷，直接從最適合的人選評估安排面試優先順序。</span></p>'
                        },
                        img: {
                            url: 'https://storage.googleapis.com/public.prd.job-pair.com/asset/design/LIST02_2.webp'
                        }
                    },
                    {
                        title: {
                            html: '<p><span><strong>好不容易徵到人，怎麼又離職了？</strong></span></p>'
                        },
                        desc: {
                            html: '<p><span style="color:hsl( 0, 0%, 20% );">讓用人單位自行決定用人偏好，降低到職後因文化、合作與溝通模式的落差而產生流動率。</span></p>'
                        },
                        img: {
                            url: 'https://storage.googleapis.com/public.prd.job-pair.com/asset/design/LIST02_3.webp'
                        }
                    }
                ]
            }
        }
        const mergedItem = Object.assign(defaultValue, newValue)
        localValue.value = mergedItem
    }
}, { immediate: true })
// methods
async function uploadAsset(image = {}, index = 0) {
    image.name = `img${index + 1}`
    const res = await repoOrganizationDesign.putAsset({
        templateName: 'LIST02',
        asset: image,
    })
    if (res.status === 200) {
        $sweet.loader(true)
        setTimeout(() => {
            $sweet.loader(false)
            localValue.value.controllable.items[index].img.url = res.data
        }, 300)
    }
}
</script>
<style lang="scss" scoped>
.rowGroup {
    padding: 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 213px;
    background-color: rgba(42, 169, 132, 0.1);

    .rowGroup__title {
        font-size: 18px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
    }

    .rowGroup__item {
        padding: 30px 20px;
        border-radius: 10px;
        border: solid 1px #a8a8a8;
        background-color: #fff;
        position: relative;
        width: fit-content;

        .item__imgWrap {
            position: absolute;
            left: 50%;
            top: 0;
            transform: translate(-50%, calc(-100% + 20px));

            .imgWrap__img {
                max-width: 320px;
            }
        }
    }
}


@media screen and (min-width: 992px) {
    .rowGroup {
        gap: 105px;

        .rowGroup__title {
            font-size: 36px;
            font-weight: 600;
            font-stretch: normal;
            font-style: normal;
            line-height: normal;
            letter-spacing: normal;
        }

        .rowGroup__item {
            padding: 30px 100px;

            .item__imgWrap {
                position: absolute;
                left: 0;
                top: 0;
                transform: translate(-50%, calc(-50%));

                .imgWrap__img {
                    max-width: 160px;
                }
            }

            .item__title {
                font-size: 32px;
                font-weight: bold;
                font-stretch: normal;
                font-style: normal;
                line-height: 1.5;
                letter-spacing: normal;
            }

            .item__desc {
                font-size: 19px;
                font-weight: normal;
                font-stretch: normal;
                font-style: normal;
                line-height: 1.5;
                letter-spacing: normal;
            }
        }
    }
}
</style>