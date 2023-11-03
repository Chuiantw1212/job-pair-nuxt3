<template>
    <div class="slide">
        <div :id="`slide-${state.id}`" class="glide">
            <div class="glide__track" data-glide-el="track">
                <ul v-if="localValue.controllable" class="glide__slides">
                    <li class="glide__slide" v-for="(slide, index) in localValue.controllable.items">
                        <div class="slide__content">
                            <template v-if="readonly">
                                <div v-html="slide.title.html">
                                </div>
                                <hr class="content__hr">
                                <div class="content__body">
                                    <div class="body__first">
                                        <img src="./sandy.webp">
                                        <div v-html="slide.image.html" class="first__name">
                                        </div>
                                        <div v-html="slide.image.html" class="first__subName">
                                        </div>
                                    </div>
                                    <div class="body__second">
                                        <div v-html="slide.desc.html">
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <template v-else>
                                <LazyAtomInputCkeditorInline v-model="localValue.controllable.items[index].title.html"
                                    :toolbar="state.titleToolbar" class="content__title">
                                </LazyAtomInputCkeditorInline>
                                <hr class="content__hr">
                                <div class="content__body">
                                    <div class="body__first">
                                        <img class="firstImage" src="./sandy.webp">
                                        <LazyAtomInputCkeditorInline class="first__name"
                                            v-model="localValue.controllable.items[index].name.html"
                                            :toolbar="state.titleToolbar">
                                        </LazyAtomInputCkeditorInline>
                                        <LazyAtomInputCkeditorInline class="first__subName"
                                            v-model="localValue.controllable.items[index].subName.html"
                                            :toolbar="state.titleToolbar">
                                        </LazyAtomInputCkeditorInline>
                                    </div>
                                    <div class="body__second">
                                        <LazyAtomInputCkeditorInline class="second__desc"
                                            v-model="localValue.controllable.items[index].desc.html">
                                        </LazyAtomInputCkeditorInline>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="glide__bullets" data-glide-el="controls[nav]">
                <button class="glide__bullet" data-glide-dir="=0"></button>
                <button class="glide__bullet" data-glide-dir="=1"></button>
                <button class="glide__bullet" data-glide-dir="=2"></button>
            </div>
        </div>
    </div>
</template>
<script setup>
const { $uuid4, $Glide, $requestSelector } = useNuxtApp()
const emit = defineEmits(['update:modelValue'])
const state = reactive({
    id: null,
    glideInstance: null,
    titleToolbar: [
        // 'fontSize',
        // '|',
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
                name: 'SLIDE01',
            }
        }
    },
    readonly: {
        type: Boolean,
        default: false
    }
})
onMounted(() => {
    state.id = $uuid4()
    if (process.client) {
        $requestSelector(`#slide-${state.id}`, (element) => {
            const glideInstance = new $Glide.Default(element, {
                gap: 10,
                bound: true,
            })
            glideInstance.mount({
                Controls: $Glide.Controls,
            })
            state.glideInstance = glideInstance
        })
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
            name: 'SLIDE01',
            controllable: {
                items: [
                    {
                        title: {
                            html: '<p style="text-align:center;"><span>聽聽大家怎麼說</span></p>'
                        },
                        name: {
                            html: '<p><span>Yen-Lin Chiu</span></p>'
                        },
                        subName: {
                            html: '<p><span>Founder of Job-Pair</span></p>'
                        },
                        image: {
                            url: 'https://storage.googleapis.com/public.prd.job-pair.com/asset/design/sandy.webp'
                        },
                        desc: {
                            html: '<p><span style="font-size:18px;">除了做團隊介紹，您也可以使用這個模組放入他人的評論與口碑等文字內容，透過第三方來提升您的企業形象。第三方可以是客戶、供應商、員工等人的客觀說明來為您的企業加分。</span></p>'
                        }
                    },
                    {
                        title: {
                            html: '<p style="text-align:center;"><span>聽聽大家怎麼說</span></p>'
                        },
                        name: {
                            html: '<p><span>Yen-Lin Chiu</span></p>'
                        },
                        subName: {
                            html: '<p><span>Founder of Job-Pair</span></p>'
                        },
                        image: {
                            url: 'https://storage.googleapis.com/public.prd.job-pair.com/asset/design/sandy.webp'
                        },
                        desc: {
                            html: '<p><span style="font-size:18px;">除了做團隊介紹，您也可以使用這個模組放入他人的評論與口碑等文字內容，透過第三方來提升您的企業形象。第三方可以是客戶、供應商、員工等人的客觀說明來為您的企業加分。</span></p>'
                        }
                    },
                    {
                        title: {
                            html: '<p style="text-align:center;"><span>聽聽大家怎麼說</span></p>'
                        },
                        name: {
                            html: '<p><span>Yen-Lin Chiu</span></p>'
                        },
                        subName: {
                            html: '<p><span>Founder of Job-Pair</span></p>'
                        },
                        image: {
                            url: 'https://storage.googleapis.com/public.prd.job-pair.com/asset/design/sandy.webp'
                        },
                        desc: {
                            html: '<p><span style="font-size:18px;">除了做團隊介紹，您也可以使用這個模組放入他人的評論與口碑等文字內容，透過第三方來提升您的企業形象。第三方可以是客戶、供應商、員工等人的客觀說明來為您的企業加分。</span></p>'
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
.slide__content {
    background-color: #2aa984;
    color: white;
    padding: 30px 20px;

    .content__title {
        font-size: 20px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        text-align: left;
        color: #fff;
    }

    .content__hr {
        width: 56px;
        margin: 20px auto auto auto;
        border: 2px solid white;
        opacity: 1;
    }

    .content__body {
        display: flex;
        flex-grow: 1;
        flex-basis: 0;
        margin-top: 20px;
        flex-direction: column;

        .body__first {
            text-align: center;
            margin-top: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;

            .firstImage {
                width: 140px;
                height: 140px;
            }

            .first__name {
                font-size: 22px;
                font-stretch: normal;
                font-style: normal;
                line-height: normal;
                letter-spacing: normal;
                color: #fff;
                margin-top: 20px;
            }

            .first__subName {
                font-size: 16px;
                font-weight: normal;
                font-stretch: normal;
                font-style: normal;
                line-height: normal;
                letter-spacing: normal;
                color: rgba(255, 255, 255, 0.85);
                margin-top: 5px;
            }
        }

        .body__second {
            width: 100%;
            margin-top: 20px;

            .second__desc {
                font-size: 16px;
                font-weight: normal;
                font-stretch: normal;
                font-style: normal;
                line-height: normal;
                letter-spacing: normal;
                color: #fff;
            }
        }
    }
}

@media screen and (min-width: 992px) {
    .slide__content {
        .content__body {
            flex-direction: row;

            .body__second {
                width: 50%;
            }
        }
    }
}
</style>