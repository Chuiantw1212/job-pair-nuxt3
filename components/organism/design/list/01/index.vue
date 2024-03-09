<template>
    <div v-if="localValue.controllable">
        <div v-if="readonly" class="banner2">
            <div v-html="localValue.controllable.title.html" class="banner__title"></div>
            <div class="banner2__body">
                <div v-for="(item, index) in localValue.controllable.items" class="body__card" :key="`item${index}`">
                    <div class="card__imageWrap">
                        <img class="imageWrap__image" :src="item.image.url" format="webp" loading="lazy" />
                    </div>
                    <div v-html="localValue.controllable.items[index].title.html" class="card__title"></div>
                    <div v-html="localValue.controllable.items[index].desc.html" class="card__desc"></div>
                </div>
            </div>
        </div>
        <AtomDesignBackground v-else class="banner2" @remove="emit('remove')" @moveUp="emit('moveUp')"
            @moveDown="emit('moveDown')">
            <LazyAtomInputCkeditorInline v-model="localValue.controllable.title.html" :toolbar="state.titleToolbar"
                class="banner__title">
            </LazyAtomInputCkeditorInline>
            <div class="banner2__body">
                <div v-for="(item, index) in localValue.controllable.items" class="body__card" :key="`item${index}`">
                    <AtomDesignImg class="card__imageWrap" :modelValue="localValue.controllable.items[index].image"
                        @update:modelValue="uploadAsset($event, index)">
                        <img class="imageWrap__image" :src="item.image.url">
                    </AtomDesignImg>
                    <LazyAtomInputCkeditorInline v-model="localValue.controllable.items[index].title.html"
                        :toolbar="state.titleToolbar" class="card__title">
                    </LazyAtomInputCkeditorInline>
                    <LazyAtomInputCkeditorInline v-model="localValue.controllable.items[index].desc.html" class="card__desc"
                        :toolbar="state.descToolbar">
                    </LazyAtomInputCkeditorInline>
                </div>
            </div>
        </AtomDesignBackground>
    </div>
</template>
<script>
export default {
    name: 'LIST01',
}
</script>
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
    descToolbar: [
        'undo',
        'redo',
        '|',
        'heading',
        '|',
        'bold',
        'italic',
        'fontColor',
        '|',
        'link',
        'mediaEmbed',
        '|',
        'alignment',
        'bulletedList',
        'numberedList',
        '|',
        'removeFormat'
    ]
})
const props = defineProps({
    modelValue: {
        type: Object,
        default: function () {
            return {
                name: 'LIST01',
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
            name: 'LIST01',
            controllable: {
                title: {
                    html: '<p style="text-align:center;"><span><strong>公司服務介紹</strong></span></p>'
                },
                items: [
                    {
                        title: {
                            html: '<p style="text-align:center;"><span><strong>解決生活焦慮</strong></span></p>'
                        },
                        desc: {
                            html: '<p>透過專業引導，探索理想生活，澄清「價值觀」，將內在需求與外在行動結合，有意識地創造理想生活。</p><p><br data-cke-filler="true"></p><p>這服務有助於職涯和其他抉擇，使決策更貼近個人真正內在需求。</p>'
                        },
                        image: {
                            url: 'https://storage.googleapis.com/public.prd.job-pair.com/asset/design/LIST01_1.webp'
                        }
                    },
                    {
                        title: {
                            html: '<p style="text-align:center;"><span><strong>釐清職業方向</strong></span></p>',
                        },
                        desc: {
                            html: '<p>探索理想職涯需考量「價值觀」和「個性」，前者涉及信念、意義、道德，匹配企業文化；後者評估適合工作環境、內容、主管合作。</p><p><br data-cke-filler="true"></p><p>職涯發展需兼顧兩者，僅考慮其中一項不足以確定最適工作。</p>'
                        },
                        image: {
                            url: 'https://storage.googleapis.com/public.prd.job-pair.com/asset/design/LIST01_2.webp'
                        }
                    },
                    {
                        title: {
                            html: '<p style="text-align:center;"><span><strong>履歷與面試輔導</strong></span></p>'
                        },
                        desc: {
                            html: '<p style="text-align:justify;">生涯設計師提供履歷及面試指導，擁有跨產業經驗和生涯設計眼光。</p><p style="text-align:justify;"><br data-cke-filler="true"></p><p style="text-align:justify;">不僅考量個人，也從就業市場角度提供全面情報，助您更完善職涯規劃。</p>'
                        },
                        image: {
                            url: 'https://storage.googleapis.com/public.prd.job-pair.com/asset/design/LIST01_3.webp'
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
        templateName: 'LIST01',
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
.banner2 {
    background-color: rgba(42, 169, 132, 0.1);

    .banner__title {
        width: 100%;
        font-size: 18px;
        padding: 20px 0;
        width: 100%;
    }

    .banner2__body {
        display: flex;
        gap: 20px;
        flex-direction: column;

        .body__card {
            flex-grow: 1;
            flex-basis: 0;
            padding: 20px;

            box-shadow: 0 4px 20px 0 rgba(133, 106, 106, 0.1);
            background-color: #fff;
            display: flex;
            flex-direction: column;

            .card__imageWrap {
                min-height: 115px;
                display: flex;

                .imageWrap__image {
                    width: 115px;
                    display: block;
                    height: auto;
                    margin: auto;
                }
            }


            .card__title {
                padding: 20px 0;
            }

            .card__desc {
                font-size: 16px;
            }
        }
    }
}

@media screen and (min-width: 992px) {
    .banner2 {
        .banner__title {
            font-size: 36px;
        }

        .banner2__body {
            flex-direction: row;

            .body__card {
                border-radius: 10px;
                padding: 50px 20px;

                .card__title {
                    font-size: 24px;
                }

                .card__desc {
                    font-size: 24px;
                }
            }
        }
    }
}
</style>