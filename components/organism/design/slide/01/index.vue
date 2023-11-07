<template>
    <div class="slide">
        <div :id="`slide-${state.id}`" class="glide">
            <div class="glide__track" data-glide-el="track">
                <ul v-if="localValue.controllable" class="glide__slides">
                    <li class="glide__slide" v-for="(slide, index) in localValue.controllable.items">
                        <div class="slide__contentWrap">
                            <div class="slide__content">
                                <template v-if="readonly">
                                    <div v-html="localValue.controllable.items[index].title.html" class="content__title">
                                    </div>
                                    <hr class="content__hr">
                                    <div class="content__body">
                                        <div class="body__first">
                                            <div class="first__mage"
                                                :style="{ 'background-image': `url(${localValue.controllable.items[index].image.url})` }">
                                            </div>
                                            <div class="first__nameGroup">
                                                <div class="nameGroup__name"
                                                    v-html="localValue.controllable.items[index].name.html">
                                                </div>
                                                <div class="nameGroup__subName"
                                                    v-html="localValue.controllable.items[index].subName.html">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="body__second">
                                            <div class="second__desc"
                                                v-html="localValue.controllable.items[index].desc.html">
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
                                            <AtomDesignImg :modelValue="localValue.controllable.items[index].image"
                                                @update:modelValue="uploadAsset($event, index)">
                                                <div class="first__mage"
                                                    :style="{ 'background-image': `url(${localValue.controllable.items[index].image.url})` }">
                                                </div>
                                            </AtomDesignImg>
                                            <div class="first__nameGroup">
                                                <LazyAtomInputCkeditorInline class="nameGroup__name"
                                                    v-model="localValue.controllable.items[index].name.html"
                                                    :toolbar="state.titleToolbar">
                                                </LazyAtomInputCkeditorInline>
                                                <LazyAtomInputCkeditorInline class="nameGroup__subName"
                                                    v-model="localValue.controllable.items[index].subName.html"
                                                    :toolbar="state.titleToolbar">
                                                </LazyAtomInputCkeditorInline>
                                            </div>
                                        </div>
                                        <div class="body__second">
                                            <LazyAtomInputCkeditorInline class="second__desc"
                                                v-model="localValue.controllable.items[index].desc.html">
                                            </LazyAtomInputCkeditorInline>
                                        </div>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="glide__bullets" data-glide-el="controls[nav]">
                <button class="glide__bullet" data-glide-dir="=0"></button>
                <button class="glide__bullet" data-glide-dir="=1"></button>
                <button class="glide__bullet" data-glide-dir="=2"></button>
            </div>
            <div class="glide__arrows d-none d-lg-block" data-glide-el="controls">
                <button class="glide__arrow glide__arrow--left" data-glide-dir="<">&#8592;</button>
                <button class="glide__arrow glide__arrow--right" data-glide-dir=">">&#8594;</button>
            </div>
        </div>
    </div>
</template>
<script setup>
const { $uuid4, $Glide, $requestSelector, $sweet } = useNuxtApp()
const repoOrganizationDesign = useRepoOrganizationDesign()
const emit = defineEmits(['update:modelValue'])
const state = reactive({
    id: null,
    glideInstance: null,
    titleToolbar: [
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
// methods
async function uploadAsset(image = {}, index = 0) {
    image.name = `portrait${index + 1}`
    const res = await repoOrganizationDesign.putAsset({
        templateName: 'SLIDE01',
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
.slide__content {
    padding: 30px 20px;
    padding-bottom: 55px;
    background-color: #2aa984;

    .content__title {
        font-size: 20px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        text-align: left;
        color: #fff;
        width: 100%;
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

            .first__mage {
                width: 140px;
                height: 140px;
                border-radius: 50%;
                background-size: cover;
                background-position: center;
            }

            .first__nameGroup {
                .nameGroup__name {
                    font-size: 22px;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: normal;
                    letter-spacing: normal;
                    color: #fff;
                    margin-top: 20px;
                }

                .nameGroup__subName {
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
    .slide {
        padding: 30px;
        padding-bottom: 90px;
        background-color: white;
        position: relative;
    }

    .slide__content {
        padding: 50px 100px;
        border-radius: 24px;

        .content__title {
            font-size: 36px;
            font-weight: 600;
            font-stretch: normal;
            font-style: normal;
            line-height: normal;
            letter-spacing: normal;
            color: #fff;
        }

        .content__body {
            flex-direction: row;

            .body__first {
                flex-direction: row;
                gap: 30px;
                width: 50%;
                align-items: center;
                margin: 0px;

                .first__nameGroup {
                    .nameGroup__name {
                        margin: 0;
                    }

                    .nameGroup__subName {
                        margin: 0;
                    }
                }
            }

            .body__second {
                width: 50%;
            }
        }
    }

    .glide {

        .glide__bullets {
            position: absolute;
            bottom: -36px;
            transform: translate(-50%, 50%);
            gap: 12px;

            .glide__bullet {
                background-color: #2aa984;
                opacity: 0.3;
                border: 2px solid #2aa984;
            }

            .glide__bullet--active {
                background-color: #2aa984;
                opacity: 1;
            }

        }

        .glide__arrows {
            position: absolute;
            bottom: -36px;
            left: 50%;
            transform: translate(-50%, 50%);
            width: 100%;
            max-width: 400px;

            .glide__arrow {
                border: none;
                box-shadow: none;
                color: #2aa984;
                font-size: 24px;
                font-weight: bold;
            }
        }
    }
}
</style>