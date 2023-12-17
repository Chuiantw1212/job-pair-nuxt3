
<template>
    <div v-if="localValue.controllable">
        <div v-if="readonly" class="list02">
            <div v-html="localValue.controllable.title.html" class="list02__title">
            </div>
            <div v-for="(item, index) in localValue.controllable.items" :key="index" class="list02__item">
                <div class="item__imgWrap">
                    <img class="imgWrap__img" :src="item.image.url">
                </div>
                <div v-html="localValue.controllable.items[index].title.html" class="item__title">
                </div>
                <div v-html="localValue.controllable.items[index].desc.html" class="item__desc">
                </div>
            </div>
        </div>
        <AtomDesignBackground v-else class="list02" @remove="emit('remove')" @moveUp="emit('moveUp')">
            <LazyAtomInputCkeditorInline v-model="localValue.controllable.title.html" :toolbar="state.titleToolbar"
                class="list02__title">
            </LazyAtomInputCkeditorInline>
            <div v-for="(item, index) in localValue.controllable.items" :key="index" class="list02__item">
                <AtomDesignImg class="item__imgWrap" :modelValue="localValue.controllable.items[index].image"
                    @update:modelValue="uploadAsset($event, index)">
                    <img class="imgWrap__img" :src="item.image.url">
                </AtomDesignImg>
                <LazyAtomInputCkeditorInline v-model="localValue.controllable.items[index].title.html" class="item__title">
                </LazyAtomInputCkeditorInline>
                <LazyAtomInputCkeditorInline v-model="localValue.controllable.items[index].desc.html" class="item__desc">
                </LazyAtomInputCkeditorInline>
            </div>
        </AtomDesignBackground>
    </div>
</template>
<script setup>
const { $sweet } = useNuxtApp()
const repoOrganizationDesign = useRepoOrganizationDesign()
const emit = defineEmits(['update:modelValue', 'remove', 'moveUp', 'moveDown'])
const state = reactive({
    titleToolbar: [
        'bold',
        'fontColor',
        '|',
        'alignment',
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
                    html: '<p style="text-align:center;"><strong>標題</strong></p>'
                },
                items: [
                    {
                        title: {
                            html: '<p><span><strong>不花錢買廣告，很難被看見？</strong></span></p>'
                        },
                        desc: {
                            html: '<p><span style="color:hsl( 0, 0%, 20% );">求職者透過「適配度」排序，快速找到公司職缺。</span></p>'
                        },
                        image: {
                            url: 'https://storage.googleapis.com/public.prd.job-pair.com/asset/design/LIST02_1.webp'
                        }
                    },
                    {
                        title: {
                            html: '<p><span><strong>如何提升招聘效率、降低成本？</strong></span></p>'
                        },
                        desc: {
                            html: '<p><span style="color:hsl( 0, 0%, 20% );">「適配度」排序，直接評估最合適人選，安排面試。</span></p>'
                        },
                        image: {
                            url: 'https://storage.googleapis.com/public.prd.job-pair.com/asset/design/LIST02_2.webp'
                        }
                    },
                    {
                        title: {
                            html: '<p><span><strong>好不容易徵到人，怎麼又離職了？</strong></span></p>'
                        },
                        desc: {
                            html: '<p><span style="color:hsl( 0, 0%, 20% );">用人單位自訂偏好，降低文化差異帶來流動率。</span></p>'
                        },
                        image: {
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
    localValue.value.controllable.items[index].image.url = ''
    const res = await repoOrganizationDesign.putAsset({
        templateName: 'LIST02',
        asset: image,
    })
    if (res.status === 200) {
        $sweet.loader(true)
        setTimeout(() => {
            $sweet.loader(false)
            localValue.value.controllable.items[index].image.url = res.data
        }, 300)
    }
}
</script>
<style lang="scss" scoped>
.list02 {
    padding: 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 213px;
    background-color: rgba(42, 169, 132, 0.1);

    .list02__title {
        font-size: 18px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        width: 100%;
    }

    .list02__item {
        padding: 30px 20px;
        border-radius: 10px;
        border: solid 1px #a8a8a8;
        background-color: #fff;
        position: relative;
        width: fit-content;
        min-width: 680px;

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
    .list02 {
        gap: 105px;

        .list02__title {
            font-size: 36px;
            font-weight: 600;
            font-stretch: normal;
            font-style: normal;
            line-height: normal;
            letter-spacing: normal;
        }

        .list02__item {
            padding: 30px 100px;
            min-width: 680px;

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