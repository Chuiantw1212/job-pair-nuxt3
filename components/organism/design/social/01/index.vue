<template>
    <div v-if="localValue.controllable" class="social">
        <template v-if="readonly">
            <!-- <div class="columns__body">
                <div v-html="localValue.controllable.title.html" class="body__title"></div>
                <div v-html="localValue.controllable.desc.html" class="card__desc"></div>
            </div> -->
        </template>
        <template v-else>
            <LazyAtomInputCkeditorInline class="social__title" v-model="localValue.controllable.title.html"
                :toolbar="state.titleToolbar">
            </LazyAtomInputCkeditorInline>
            <div class="social__body">
                <div class="body__card">
                    <AtomDesignImg :modelValue="localValue.controllable.items[index].image"
                        @update:modelValue="uploadAsset($event, index)">
                        <div class="card__mage"
                            :style="{ 'background-image': `url(${localValue.controllable.items[index].image.url})` }">
                        </div>
                    </AtomDesignImg>
                    <LazyAtomInputCkeditorInline class="card__desc"
                        v-model="localValue.controllable.items[index].desc.html">
                    </LazyAtomInputCkeditorInline>
                </div>
                <div class="body__card">
                    <AtomDesignImg :modelValue="localValue.controllable.items[index].image"
                        @update:modelValue="uploadAsset($event, index)">
                        <div class="card__mage"
                            :style="{ 'background-image': `url(${localValue.controllable.items[index].image.url})` }">
                        </div>
                    </AtomDesignImg>
                    <LazyAtomInputCkeditorInline class="card__desc"
                        v-model="localValue.controllable.items[index].desc.html">
                    </LazyAtomInputCkeditorInline>
                </div>
                <div class="body__card">
                    <AtomDesignImg :modelValue="localValue.controllable.items[index].image"
                        @update:modelValue="uploadAsset($event, index)">
                        <div class="card__mage"
                            :style="{ 'background-image': `url(${localValue.controllable.items[index].image.url})` }">
                        </div>
                    </AtomDesignImg>
                    <LazyAtomInputCkeditorInline class="card__desc"
                        v-model="localValue.controllable.items[index].desc.html">
                    </LazyAtomInputCkeditorInline>
                </div>
                <div class="body__card">
                    <AtomDesignImg :modelValue="localValue.controllable.items[index].image"
                        @update:modelValue="uploadAsset($event, index)">
                        <div class="card__mage"
                            :style="{ 'background-image': `url(${localValue.controllable.items[index].image.url})` }">
                        </div>
                    </AtomDesignImg>
                    <LazyAtomInputCkeditorInline class="card__desc"
                        v-model="localValue.controllable.items[index].desc.html">
                    </LazyAtomInputCkeditorInline>
                </div>
            </div>

            <!-- <LazyAtomInputCkeditorInline class="card__desc" v-model="localValue.controllable.desc.html">
                </LazyAtomInputCkeditorInline> -->
        </template>
    </div>
</template>
<script setup>
const emit = defineEmits(['update:modelValue', 'remove', 'moveUp', 'moveDown'])
const repoOrganizationDesign = useRepoOrganizationDesign()
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
                name: 'SOCIAL01',
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
            name: 'SOCIAL01',
            controllable: {
                title: {
                    html: '<p style="text-align:center;"><span>與我們聯絡</span></p>'
                },
                items: [
                    {
                        image: {
                            url: 'https://storage.googleapis.com/public.prd.job-pair.com/asset/design/line1.webp'
                        },
                        desc: {
                            html: '<p><span style="font-size:18px;">除了做團隊介紹，您也可以使用這個模組放入他人的評論與口碑等文字內容，透過第三方來提升您的企業形象。第三方可以是客戶、供應商、員工等人的客觀說明來為您的企業加分。</span></p>'
                        }
                    },
                    {
                        image: {
                            url: 'https://storage.googleapis.com/public.prd.job-pair.com/asset/design/facebook1.webp'
                        },
                        desc: {
                            html: '<p><span style="font-size:18px;">除了做團隊介紹，您也可以使用這個模組放入他人的評論與口碑等文字內容，透過第三方來提升您的企業形象。第三方可以是客戶、供應商、員工等人的客觀說明來為您的企業加分。</span></p>'
                        }
                    },
                    {
                        image: {
                            url: 'https://storage.googleapis.com/public.prd.job-pair.com/asset/design/linkedin1.webp'
                        },
                        desc: {
                            html: '<p><span style="font-size:18px;">除了做團隊介紹，您也可以使用這個模組放入他人的評論與口碑等文字內容，透過第三方來提升您的企業形象。第三方可以是客戶、供應商、員工等人的客觀說明來為您的企業加分。</span></p>'
                        }
                    },
                    {
                        image: {
                            url: 'https://storage.googleapis.com/public.prd.job-pair.com/asset/design/instagram1.webp'
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
    image.name = `social${index + 1}`
    localValue.value.controllable.items[index].image.url = ''
    const res = await repoOrganizationDesign.putAsset({
        templateName: 'SOCIAL',
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