<template>
    <div class="description">
        <div class="description__imageGroup">
            <img src="./Image.webp">
        </div>
        <div class="description__textGroup">
            <!-- <h2></h2> -->
            <LazyAtomInputCkeditorInline v-if="localValue.controllable" v-model="localValue.controllable.title.html"
                :toolbar="state.titleToolbar">
            </LazyAtomInputCkeditorInline>
            <LazyAtomInputCkeditorInline v-if="localValue.controllable" v-model="localValue.controllable.desc.html">
            </LazyAtomInputCkeditorInline>
            <div class="textGroup__footer">
                <div>
                    <LazyAtomInputCkeditorInline v-if="localValue.controllable"
                        v-model="localValue.controllable.items[0].title.html" :toolbar="state.titleToolbar">
                    </LazyAtomInputCkeditorInline>
                    <LazyAtomInputCkeditorInline v-if="localValue.controllable"
                        v-model="localValue.controllable.items[0].desc.html" :toolbar="state.titleToolbar">
                    </LazyAtomInputCkeditorInline>
                </div>
                <div>
                    <LazyAtomInputCkeditorInline v-if="localValue.controllable"
                        v-model="localValue.controllable.items[1].title.html" :toolbar="state.titleToolbar">
                    </LazyAtomInputCkeditorInline>
                    <LazyAtomInputCkeditorInline v-if="localValue.controllable"
                        v-model="localValue.controllable.items[1].desc.html" :toolbar="state.titleToolbar">
                    </LazyAtomInputCkeditorInline>
                </div>
                <div>
                    <LazyAtomInputCkeditorInline v-if="localValue.controllable"
                        v-model="localValue.controllable.items[2].title.html" :toolbar="state.titleToolbar">
                    </LazyAtomInputCkeditorInline>
                    <LazyAtomInputCkeditorInline v-if="localValue.controllable"
                        v-model="localValue.controllable.items[2].desc.html" :toolbar="state.titleToolbar">
                    </LazyAtomInputCkeditorInline>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
const emit = defineEmits(['update:modelValue'])
const state = reactive({
    titleToolbar: [
        'fontSize',
        '|',
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
                name: 'HYBRID01',
            }
        }
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
                    html: '<p><span style="font-size:36px;"><strong>公司介紹</strong></span></p>'
                },
                desc: {
                    html: '<p><span style="font-size:18px;">關於Job Pair</span><br><span style="font-size:18px;">Job Pair 是一家致力於打造更友善、更有效率的人才媒合市場的公司。</span></p><p><span style="font-size:18px;">Job Pair 的創辦人 Sandy 擁有 8 年科技業獵頭經驗，累計超過萬人的履歷面談。2015年，她開始提供一對一職涯諮詢的服務，並解決了超過千人的職涯問題。多年來，Sandy 一直從不同的角度思考「如何找到適合的工作」，發現人才媒合市場需要更多考量軟性需求的功能。這些軟性需求包括企業文化、工作環境、人際交流與溝通模式等。</span></p><p><span style="font-size:18px;">因此，我們打造了一個新型態的媒合型人力銀行，不論求職者或企業都能夠先以雙方的軟性需求進行第一步演算，提供團隊適配度給雙方參考。跳脫了僅能以地區、薪資、職務類別、產業等硬性需求評估職缺，或者以性別、年齡、學歷等表象資訊評估求職者。</span></p><p><span style="font-size:18px;">Job Pair 為你從適合的角度切入，打造長遠的合作關係。</span></p>'
                },
                items: [
                    {
                        title: {
                            html: '<p><span style="color:hsl( 163, 60%, 41% );font-size:24px;">性別友善</span></p>'
                        },
                        desc: {
                            html: '<p><span style="color:hsl( 205, 36%, 18% );font-size:48px;"><strong>有</strong></span></p>'
                        }
                    },
                    {
                        title: {
                            html: '<p><span style="color:hsl( 163, 60%, 41% );font-size:24px;">城市</span></p>'
                        },
                        desc: {
                            html: '<p><span style="color:hsl( 205, 36%, 18% );font-size:48px;"><strong>台北市</strong></span></p>'
                        }
                    },
                    {
                        title: {
                            html: '<p><span style="color:hsl( 163, 60%, 41% );font-size:24px;">資本額</span></p>'
                        },
                        desc: {
                            html: '<p><span style="color:hsl( 205, 36%, 18% );font-size:48px;"><strong>1,000,000</strong></span></p>'
                        }
                    },
                ]
            }
        }
        const mergedItem = Object.assign(defaultValue, newValue)
        localValue.value = mergedItem
    }
}, { immediate: true })
</script>
<style lang="scss" scoped>
.description {
    display: flex;
    flex-direction: column;
    background-color: white;
    align-items: center;

    .description__textGroup {}
}

@media screen and (min-width: 992px) {
    .description {
        flex-direction: row;
        gap: 100px;

        .description__textGroup {
            padding: 50px;

            .textGroup__footer {
                margin-top: 30px;
                display: flex;
                justify-content: space-between;
            }
        }
    }
}
</style>