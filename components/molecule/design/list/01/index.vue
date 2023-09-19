<template>
    <div class="banner2">
        <template v-if="readonly">
            <div v-html="localValue.controllable.title.html" class="ck ck-editor__editable_inline banner__title"></div>
            <div class="banner2__body">
                <div v-for="(item, index) in localValue.controllable.items" class="body__card" :key="`item${index}`">
                    <img class="card__image" src="./img4@2x.webp" format="webp" loading="lazy" />
                    <div v-html="item.title.html" class="ck ck-editor__editable_inline card__title"></div>
                    <div v-html="item.desc.html" class="ck ck-editor__editable_inline"></div>
                </div>
            </div>
        </template>
        <template v-else>
            <LazyAtomInputCkeditorInline v-if="localValue.controllable" v-model="localValue.controllable.title.html"
                :toolbar="state.titleToolbar" class="banner__title">
            </LazyAtomInputCkeditorInline>
            <div class="banner2__body">
                <div v-for="(item, index) in localValue.controllable.items" class="body__card" :key="`item${index}`">
                    <img class="card__image" src="./img4@2x.webp" format="webp" loading="lazy" />
                    <LazyAtomInputCkeditorInline v-if="localValue.controllable"
                        v-model="localValue.controllable.items[index].title.html" :toolbar="state.titleToolbar"
                        class="card__title">
                    </LazyAtomInputCkeditorInline>
                    <LazyAtomInputCkeditorInline v-if="localValue.controllable"
                        v-model="localValue.controllable.items[index].desc.html">
                    </LazyAtomInputCkeditorInline>
                </div>
            </div>
        </template>
    </div>
</template>
<script>
export default {
    name: 'LIST01',
}
</script>
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
                    html: '<p><span style="font-size:36px;"><strong>公司服務介紹</strong></span></p>'
                },
                items: [
                    {
                        title: {
                            html: '<p style="text-align:center;"><span style="font-size:24px;"><strong>解決生活焦慮</strong></span></p>'
                        },
                        desc: {
                            html: '<p style="text-align:justify;"><span style="font-size:24px;">理想生活探索是透過專業引導，釐清個人內在的「價值觀」，並將內在需求與外在行動對焦，制訂相對應的行動，有意識的創造個人的理想生活。</span></p><p style="text-align:justify;"><span style="font-size:24px;">本服務也有助於個人面對工作選擇或其他生涯抉擇時，下一個真正貼近個人內在需求的決策。</span></p>'
                        }
                    },
                    {
                        title: {
                            html: '<p style="text-align:center;"><span style="font-size:24px;"><strong>釐清職業方向</strong></span></p>',
                        },
                        desc: {
                            html: '<p style="text-align:justify;"><span style="font-size:24px;">職涯偏好探索，目的是探索合適的工作，需從「價值觀」與「個性」兩個層面做自我分析。</span></p><p style="text-align:justify;"><span style="font-size:24px;">價值觀就是個人的信念、人生意義、道德觀念等組合，對應工作就是企業對文化、理念、願景的實踐；個性則是評估自己在什麼樣的工作環境、工作內容與什麼樣的主管合作，能更勝任愉快。</span></p><p style="text-align:justify;"><span style="font-size:24px;">所以，評估適合的工作發展，兩者缺一不可。</span></p>'
                        }
                    },
                    {
                        title: {
                            html: '<p style="text-align:center;"><span style="font-size:24px;"><strong>履歷與面試輔導</strong></span></p>'
                        },
                        desc: {
                            html: '<p style="text-align:justify;"><span style="font-size:24px;">提供履歷與面試輔導的生涯設計師，除了來自不同產業的經驗，同時具備生涯設計的思維；不只從個人角度出發，還能從就業市場的角度，提供更全面的情報，為更好的職涯做準備。</span></p>'
                        }
                    }
                ]
            }
        }
        const mergedItem = Object.assign(defaultValue, newValue)
        localValue.value = mergedItem
    }
}, { immediate: true })
</script>
<style lang="scss" scoped>
.banner2 {
    background-color: rgba(42, 169, 132, 0.1);
    padding: 20px 0px;

    .banner__title {
        width: 100%;
    }

    .banner2__body {
        display: flex;
        gap: 20px;
        margin-top: 30px;
        flex-direction: column;

        .body__card {
            flex-grow: 1;
            flex-basis: 0;
            padding: 50px 20px;
            border-radius: 10px;
            box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.1);
            background-color: #fff;
            display: flex;
            flex-direction: column;

            .card__title {
                margin-top: 20px;
            }

            .card__image {
                width: 100px;
                height: auto;
                margin: 0 auto;
            }
        }
    }
}

@media screen and (min-width: 992px) {
    .banner2 {
        .banner2__body {
            flex-direction: row;
        }
    }
}
</style>