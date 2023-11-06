<template>
    <AtomDesignBackground v-if="localValue.controllable" @remove="emit('remove')" @moveUp="emit('moveUp')"
        @moveDown="emit('moveDown')">
        <div class="slide">
            <LazyAtomInputCkeditorInline class="slide__title" v-model="localValue.controllable.title.html"
                :toolbar="state.titleToolbar">
            </LazyAtomInputCkeditorInline>
            <div :id="`slide-${state.id}`" class="glide">
                <div class="glide__track" data-glide-el="track">
                    <ul class="glide__slides">
                        <li class="glide__slide" v-for="(slide, index) in localValue.controllable.items">
                            <div class="slide__content">
                                <template v-if="readonly">
                                    <div v-html="slide.title.html" class="ck ck-editor__editable_inline">
                                    </div>
                                    <hr class="content__hr">
                                    <div class="content__body">
                                        <div class="body__left">
                                            <img src="./default.webp">
                                            <div v-html="slide.image.html" class="ck ck-editor__editable_inline">
                                            </div>
                                        </div>
                                        <div class="body__right">
                                            <div v-html="slide.desc.html" class="ck ck-editor__editable_inline">
                                            </div>
                                        </div>
                                    </div>
                                </template>
                                <template v-else>
                                    <div class="content__body">
                                        <img class="body__image" src="./SLIDE02_BG.svg">
                                        <LazyAtomInputCkeditorInline class="body__desc"
                                            v-model="localValue.controllable.items[index].desc.html"
                                            :toolbar="state.titleToolbar">
                                        </LazyAtomInputCkeditorInline>
                                        <div class="body__portrait">
                                            <AtomDesignImg :modelValue="localValue.controllable.items[index].image"
                                                @update:modelValue="uploadAsset($event, index)">
                                                <div class="portrait__image"
                                                    :style="{ 'background-image': `url(${localValue.controllable.items[index].image.url})` }">
                                                </div>
                                            </AtomDesignImg>
                                            <div class="portrait__nameGroup">
                                                <LazyAtomInputCkeditorInline class="nameGroup__name"
                                                    v-model="localValue.controllable.items[index].name.html"
                                                    :toolbar="state.nameToolbar">
                                                </LazyAtomInputCkeditorInline>
                                                <LazyAtomInputCkeditorInline class="nameGroup__subName"
                                                    v-model="localValue.controllable.items[index].subName.html"
                                                    :toolbar="state.nameToolbar">
                                                </LazyAtomInputCkeditorInline>
                                            </div>
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
                <div class="glide__arrows d-none d-lg-block" data-glide-el="controls">
                    <button class="glide__arrow glide__arrow--left" data-glide-dir="<">&#8592;</button>
                    <button class="glide__arrow glide__arrow--right" data-glide-dir=">">&#8594;</button>
                </div>
            </div>
        </div>
    </AtomDesignBackground>
</template>
<script setup>
const { $uuid4, $Glide, $requestSelector, $sweet } = useNuxtApp()
const repoOrganizationDesign = useRepoOrganizationDesign()
const emit = defineEmits(['update:modelValue', 'remove', 'moveUp', 'moveDown'])
const state = reactive({
    id: null,
    glideInstance: null,
    titleToolbar: [
        'bold',
        'fontColor',
        '|',
        'alignment',
    ],
    nameToolbar: [
        'bold',
        'fontColor',
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
                perView: 1,
            })
            glideInstance.mount({
                Controls: $Glide.Controls,
            })
            state.glideInstance = glideInstance
            window.addEventListener("resize", setGlideConfig)
            setGlideConfig({ target: window })
        })
    }
})
onBeforeUnmount(() => {
    window.removeEventListener("resize", setGlideConfig)
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
                title: {
                    html: '<p style="text-align:center;">公司口碑</p>'
                },
                items: [
                    {
                        title: {
                            html: '<p style="text-align:center;"><span>聽聽大家怎麼說</span></p>'
                        },
                        name: {
                            html: '<p><span>Yen-Lin Chiu</span></p>'
                        },
                        subName: {
                            html: '<p><span style="color:#E5E5E5;">Founder of Job-Pair</span></p>'
                        },
                        image: {
                            url: 'https://storage.googleapis.com/public.prd.job-pair.com/asset/design/sandy.webp'
                        },
                        desc: {
                            html: '<p><span style="font-size:18px;">如果這個評論很多也只會讓他點點點，點擊也不會展開。如果這個評論很多也只會讓他點點點，點擊也不會展開。如果這個評論很多也只會讓他點點點，點擊也不會展開。如果這個評論很多也只會讓他點點點，點擊也不會展開。如果這個評論很多也只會讓他點點點，點擊也不會展開。如果這個評論很多也只會讓...</span></p>'
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
                            html: '<p><span style="color:#E5E5E5;">Founder of Job-Pair</span></p>'
                        },
                        image: {
                            url: 'https://storage.googleapis.com/public.prd.job-pair.com/asset/design/sandy.webp'
                        },
                        desc: {
                            html: '<p><span style="font-size:18px;">如果這個評論很多也只會讓他點點點，點擊也不會展開。如果這個評論很多也只會讓他點點點，點擊也不會展開。如果這個評論很多也只會讓他點點點，點擊也不會展開。如果這個評論很多也只會讓他點點點，點擊也不會展開。如果這個評論很多也只會讓他點點點，點擊也不會展開。如果這個評論很多也只會讓...</span></p>'
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
                            html: '<p><span style="color:#E5E5E5;">Founder of Job-Pair</span></p>'
                        },
                        image: {
                            url: 'https://storage.googleapis.com/public.prd.job-pair.com/asset/design/sandy.webp'
                        },
                        desc: {
                            html: '<p><span style="font-size:18px;">如果這個評論很多也只會讓他點點點，點擊也不會展開。如果這個評論很多也只會讓他點點點，點擊也不會展開。如果這個評論很多也只會讓他點點點，點擊也不會展開。如果這個評論很多也只會讓他點點點，點擊也不會展開。如果這個評論很多也只會讓他點點點，點擊也不會展開。如果這個評論很多也只會讓...</span></p>'
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
function setGlideConfig(event) {
    if (event.target.innerWidth < 992) {
        state.glideInstance.update({
            gap: 10,
            perView: 1,
            bound: true,
        })
    } else {
        state.glideInstance.update({
            gap: 10,
            perView: 2,
            bound: true,
        })
    }
}
async function uploadAsset(image = {}, index = 0) {
    image.name = `portrait${index + 1}`
    const res = await repoOrganizationDesign.putAsset({
        templateName: 'SLIDE02',
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
.slide {
    background-color: white;
    padding: 30px 20px;
    padding-bottom: 60px;
    display: flex;
    flex-direction: column;

    .slide__title {
        font-size: 20px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        width: fit-content;
        margin: auto;
        width: 100%;
    }
}

.slide__content {
    background-color: white;
    border-radius: 20px;
    border: 1px solid rgba(80, 80, 80, 0.1);
    padding: 30px;
    overflow: hidden;
    margin-top: 20px;

    .content__hr {
        width: 56px;
        margin: auto;
        border: 2px solid white;
        opacity: 1;
    }

    .content__body {
        display: flex;
        gap: 30px;
        flex-direction: column;

        .body__image {
            width: 70px;
            height: 52px;
            display: block;
        }

        .body__desc {
            font-size: 16px;
            font-weight: normal;
            font-stretch: normal;
            font-style: normal;
            line-height: 2;
            letter-spacing: normal;
        }

        .body__portrait {
            display: flex;
            align-items: center;
            gap: 10px;
            margin: auto;

            .portrait__nameGroup {
                .nameGroup__name {
                    font-size: 18px;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: normal;
                    letter-spacing: normal;
                }

                .nameGroup__subName {
                    font-size: 14px;
                    font-weight: normal;
                    font-stretch: normal;
                    font-style: normal;
                    line-height: normal;
                    letter-spacing: normal;
                }

            }

            .portrait__image {
                width: 56px;
                height: 56px;
                border-radius: 50%;
                background-size: cover;
                background-position: center;
            }
        }

        .body__left {
            width: 50%;
            display: flex;
            align-items: center;
            gap: 20px;
        }

        .body__right {
            width: 100%;
        }
    }

}

.glide__bullets {
    position: absolute;
    bottom: -24px;
    transform: translate(-50%, 50%);
    gap: 12px;

    .glide__bullet {
        background-color: #edeaea;
        border: 2px solid white;
        box-shadow: none;
    }

    .glide__bullet--active {
        background-color: #000000;
    }
}


.glide__arrows {
    position: absolute;
    bottom: -24px;
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

:deep(.glide__arrow) {
    color: #444444 !important;
}

@media screen and (min-width: 992px) {
    .slide__content {
        .slide__title {
            font-size: 36px;
        }
    }
}
</style>