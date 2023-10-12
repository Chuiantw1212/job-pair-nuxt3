<template>
    <div class="description">
        <LazyAtomInputCkeditorInline v-if="localValue.controllable" class="description__title d-lg-none"
            v-model="localValue.controllable.title.html" :toolbar="state.titleToolbar">
        </LazyAtomInputCkeditorInline>
        <div v-if="localValue.controllable" class="description__imageWrap">
            <AtomDesignImg :modelValue="localValue.controllable.img" @update:modelValue="uploadAsset($event, index)">
                <img class="imageWrap__image" :src="localValue.controllable.img.url">
            </AtomDesignImg>
        </div>
        <div v-if="localValue.controllable" class="description__body">
            <ul class="body__textGroup">
                <li v-for="(item, index) in localValue.controllable.items" :key="`item${index}`" class="textGroup__item">
                    <LazyAtomInputCkeditorInline class="textGroup__title"
                        v-model="localValue.controllable.items[index].title.html" :toolbar="state.titleToolbar">
                    </LazyAtomInputCkeditorInline>
                    <LazyAtomInputCkeditorInline class="textGroup__desc"
                        v-model="localValue.controllable.items[index].desc.html" :toolbar="state.titleToolbar">
                    </LazyAtomInputCkeditorInline>
                </li>
            </ul>
            <LazyAtomInputCkeditorInline class="body__desc" v-model="localValue.controllable.desc.html">
            </LazyAtomInputCkeditorInline>
            <LazyAtomInputCkeditorInline v-if="localValue.controllable" class="body__title d-none d-lg-block"
                v-model="localValue.controllable.title.html" :toolbar="state.titleToolbar">
            </LazyAtomInputCkeditorInline>
        </div>
    </div>
</template>
<script setup>
const repoOrganizationDesign = useRepoOrganizationDesign()
const { $sweet } = useNuxtApp()
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
                name: 'HYBRID01',
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
            name: 'HYBRID01',
            controllable: {
                title: {
                    html: '<p><span><strong>公司介紹</strong></span></p>'
                },
                desc: {
                    html: '<p>關於Job Pair<br>Job Pair 是一家致力於打造更友善、更有效率的人才媒合市場的公司。</p><p><br data-cke-filler="true"></p><p>Job Pair 的創辦人 Sandy 擁有 8 年科技業獵頭經驗，累計超過萬人的履歷面談。2015年，她開始提供一對一職涯諮詢的服務，並解決了超過千人的職涯問題。多年來，Sandy 一直從不同的角度思考「如何找到適合的工作」，發現人才媒合市場需要更多考量軟性需求的功能。這些軟性需求包括企業文化、工作環境、人際交流與溝通模式等</p><p>因此，我們打造了一個新型態的媒合型人力銀行，不論求職者或企業都能夠先以雙方的軟性需求進行第一步演算，提供團隊適配度給雙方參考。跳脫了僅能以地區、薪資、職務類別、產業等硬性需求評估職缺，或者以性別、年齡、學歷等表象資訊評估求職者。</p><p>Job Pair 為你從適合的角度切入，打造長遠的合作關係。</p>'
                },
                img: {
                    url: 'https://storage.googleapis.com/public.prd.job-pair.com/asset/design/HYBRID01.webp',
                },
                items: [
                    {
                        title: {
                            html: '<p><span style="color:#2aa984;">性別友善</span></p>'
                        },
                        desc: {
                            html: '<p><span style="color:hsl( 205, 36%, 18% );"><strong>有</strong></span></p>'
                        }
                    },
                    {
                        title: {
                            html: '<p><span style="color:#2aa984;">城市</span></p>'
                        },
                        desc: {
                            html: '<p><span style="color:hsl( 205, 36%, 18% );"><strong>台北市</strong></span></p>'
                        }
                    },
                    {
                        title: {
                            html: '<p><span style="color:#2aa984;">資本額</span></p>'
                        },
                        desc: {
                            html: '<p><span style="color:hsl( 205, 36%, 18% );"><strong>1,000,000</strong></span></p>'
                        }
                    },
                ]
            }
        }
        const mergedItem = Object.assign(defaultValue, newValue)
        localValue.value = mergedItem
    }
}, { immediate: true })
// methods
async function uploadAsset(image = {}, index = 0) {
    image.name = `bg${index + 1}`
    const res = await repoOrganizationDesign.putAsset({
        templateName: 'BANNER01',
        asset: image,
    })
    if (res.status === 200) {
        $sweet.loader(true)
        setTimeout(() => {
            $sweet.loader(false)
            localValue.value.controllable.img.url = res.data
        }, 300)
    }
}
</script>
<style lang="scss" scoped>
.description {
    display: flex;
    flex-direction: column;
    background-color: white;
    align-items: center;
    padding: 20px;

    .description__title {
        font-size: 18px;
        width: fit-content;
    }

    .description__imageWrap {
        margin-top: 20px;

        .imageWrap__image {
            width: 100%;
        }
    }


    .body__textGroup {
        width: 100%;
        list-style: none;
        padding: 0px;
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        gap: 20px;

        .textGroup__title {
            font-size: 16px;
            font-weight: normal;
            font-stretch: normal;
            font-style: normal;
            line-height: normal;
            letter-spacing: normal;
            text-align: left;
            color: #2aa984;
        }

        .textGroup__desc {
            font-size: 30px;
            font-weight: 600;
            font-stretch: normal;
            font-style: normal;
            line-height: normal;
            letter-spacing: normal;
            text-align: left;
            color: #1e3240;
        }
    }
}

@media screen and (min-width: 992px) {
    .description {
        flex-direction: row;
        justify-content: center;
        gap: 20px;
        padding: 0 20px;

        .description__imageWrap {
            width: 100%;
            max-width: 445px;
            padding: 0px;
        }

        .description__body {
            width: 100%;
            padding: 0px;
            display: flex;
            flex-direction: column-reverse;

            .body__title {
                font-size: 36px;
                font-weight: 600;
                font-stretch: normal;
                font-style: normal;
                line-height: normal;
                letter-spacing: normal;
                text-align: left;
                color: #1e3240;
            }

            .body__desc {
                margin-top: 30px;
                font-size: 18px;
                font-weight: normal;
                font-stretch: normal;
                font-style: normal;
                line-height: normal;
                letter-spacing: normal;
            }

            .body__textGroup {
                flex-direction: row;
                justify-content: space-between;
                margin-top: 30px;

                .textGroup__item {
                    width: 100%;
                }

                .textGroup__title {
                    width: 100%;
                }

                .textGroup__desc {
                    width: 100%;
                }
            }
        }
    }
}
</style>