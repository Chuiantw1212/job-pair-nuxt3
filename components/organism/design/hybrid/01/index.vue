<template>
    <div v-if="localValue.controllable">
        <div v-if="readonly" class="description">
            <div class="description__title d-lg-none" v-html="localValue.controllable.title.html">

            </div>
            <div class="description__imageWrap">
                <img class="imageWrap__image" :src="localValue.controllable.image.url">
            </div>
            <div class="description__body">
                <ul class="body__textGroup">
                    <li v-for="(item, index) in localValue.controllable.items" :key="`item${index}`"
                        class="textGroup__item">
                        <div class="textGroup__title" v-html="localValue.controllable.items[index].title.html">
                        </div>
                        <div class="textGroup__desc" v-html="localValue.controllable.items[index].desc.html">
                        </div>
                    </li>
                </ul>
                <div class="body__desc" v-html="localValue.controllable.desc.html">
                </div>
                <div class="body__title d-none d-lg-block" v-html="localValue.controllable.title.html">
                </div>
            </div>
        </div>
        <template v-else>
            <AtomDesignBackground class="description" @remove="emit('remove')" @moveUp="emit('moveUp')"
                @moveDown="emit('moveDown')">
                <LazyAtomInputCkeditorInline class="description__title d-lg-none"
                    v-model="localValue.controllable.title.html" :toolbar="state.titleToolbar">
                </LazyAtomInputCkeditorInline>
                <AtomDesignImg class="description__imageWrap" :modelValue="localValue.controllable.image"
                    @update:modelValue="uploadAsset($event, index)">
                    <img class="imageWrap__image" :src="localValue.controllable.image.url">
                </AtomDesignImg>
                <div class="description__body">
                    <ul class="body__textGroup">
                        <li v-for="(item, index) in localValue.controllable.items" :key="`item${index}`"
                            class="textGroup__item">
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
                    <LazyAtomInputCkeditorInline class="body__title d-none d-lg-block"
                        v-model="localValue.controllable.title.html" :toolbar="state.titleToolbar">
                    </LazyAtomInputCkeditorInline>
                </div>
            </AtomDesignBackground>
        </template>
    </div>
</template>
<script setup>
const { $sweet, $filter } = useNuxtApp()
const repoOrganizationDesign = useRepoOrganizationDesign()
const repoAuth = useRepoAuth()
const repoSelect = useRepoSelect()
const emit = defineEmits(['update:modelValue', 'remove', 'moveUp', 'moveDown', 'click'])
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
    if (newValue.controllable) {
        return
    }
    const { company = {} } = repoAuth.state
    const { addressRegion = '', description = '暫不公開', capital = '暫不公開', numberOfEmployees = '暫不公開' } = company
    const regionText = addressRegion ? $filter.optionText(addressRegion, repoSelect.state.locationRes.taiwan) : '暫不公開'
    const defaultValue = {
        name: 'HYBRID01',
        controllable: {
            title: {
                html: `<p><span><strong>公司介紹</strong></span></p>`
            },
            desc: {
                html: `${description}`
            },
            image: {
                url: `https://storage.googleapis.com/public.prd.job-pair.com/asset/design/HYBRID01.webp`,
            },
            items: [
                {
                    title: {
                        html: `<p><span style="color:#2aa984;">地址</span></p>`
                    },
                    desc: {
                        html: `<p><span style="color:hsl( 205, 36%, 18% );"><strong>${regionText}</strong></span></p>`
                    }
                },
                {
                    title: {
                        html: `<p><span style="color:#2aa984;">人數</span></p>`
                    },
                    desc: {
                        html: `<p><span style="color:hsl( 205, 36%, 18% );"><strong>${numberOfEmployees}</strong></span></p>`
                    }
                },
                {
                    title: {
                        html: `<p><span style="color:#2aa984;">資本額</span></p>`
                    },
                    desc: {
                        html: `<p><span style="color:hsl( 205, 36%, 18% );"><strong>${capital}</strong></span></p>`
                    }
                },
            ]
        }
    }
    const mergedItem = Object.assign(defaultValue, newValue)
    localValue.value = mergedItem

}, { immediate: true })
// methods
async function uploadAsset(image = {}, index = 0) {
    image.name = `image${index + 1}`
    localValue.value.controllable.image.url = ''
    const res = await repoOrganizationDesign.putAsset({
        templateName: 'HYBRID01',
        asset: image,
    })
    if (res.status === 200) {
        $sweet.loader(true)
        setTimeout(() => {
            $sweet.loader(false)
            localValue.value.controllable.image.url = res.data
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
        width: 100%;
    }

    .description__imageWrap {
        margin-top: 40px;

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
        padding: 20px;

        .description__imageWrap {
            width: 100%;
            max-width: 445px;
            padding: 0px;
            margin-top: 0px;
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