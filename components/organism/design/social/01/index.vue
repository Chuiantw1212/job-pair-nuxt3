<template>
    <div v-if="localValue.controllable">
        <template v-if="readonly">
            <div></div>
        </template>
        <AtomDesignBackground v-else class="social" @remove="emit('remove')" @moveUp="emit('moveUp')"
            @moveDown="emit('moveDown')">
            <LazyAtomInputCkeditorInline class="social__title" v-model="localValue.controllable.title.html"
                :toolbar="state.titleToolbar">
            </LazyAtomInputCkeditorInline>
            <hr class="social__hr">
            <div class="social__body">
                <div v-for="(item, index) in localValue.controllable.items" class="body__card">
                    <AtomDesignImg @update:modelValue="uploadAsset($event, index)">
                        <div class="card__image"
                            :style="{ 'background-image': `url(${localValue.controllable.items[index].image.url})` }">
                        </div>
                    </AtomDesignImg>
                    <LazyAtomInputCkeditorInline class="card__desc"
                        v-model="localValue.controllable.items[index].title.html" :toolbar="state.titleToolbar">
                    </LazyAtomInputCkeditorInline>
                </div>
            </div>
        </AtomDesignBackground>
    </div>
</template>
<script setup>
const emit = defineEmits(['update:modelValue', 'remove', 'moveUp', 'moveDown'])
const repoOrganizationDesign = useRepoOrganizationDesign()
const state = reactive({
    titleToolbar: [
        'bold',
        'fontColor',
        'alignment',
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
                            url: 'https://storage.googleapis.com/public.prd.job-pair.com/asset/design/line2.webp',
                        },
                        title: {
                            html: '<p style="text-align:center;">Line</p>'
                        }
                    },
                    {
                        image: {
                            url: 'https://storage.googleapis.com/public.prd.job-pair.com/asset/design/facebook2.webp'
                        },
                        title: {
                            html: '<p style="text-align:center;">Facebook</p>'
                        }
                    },
                    {
                        image: {
                            url: 'https://storage.googleapis.com/public.prd.job-pair.com/asset/design/linkedin2.webp'
                        },
                        title: {
                            html: '<p style="text-align:center;">LinkedIn</p>'
                        }
                    },
                    {
                        image: {
                            url: 'https://storage.googleapis.com/public.prd.job-pair.com/asset/design/instagram2.webp'
                        },
                        title: {
                            html: '<p style="text-align:center;">Instagram</p>'
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
        templateName: 'SOCIAL01',
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
<style lang="scss">
.social {
    background-color: #5ea88e;
    padding: 30px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .social__title {
        font-size: 20px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        text-align: left;
        color: #fff;
    }

    .social__hr {
        width: 58px;
        border-bottom: 2px solid white;
        margin: 20px 0px;
        opacity: 1;
    }

    .social__body {
        display: flex;
        flex-direction: column;
        gap: 20px;
        width: 100%;

        .body__card {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 20px;
            padding: 40px 50px;
            background-color: rgba(255, 255, 255, 0.5);
            height: 195px;
            border-radius: 10px;

            .card__image {
                width: 70px;
                height: 70px;
                background-position: center;
                background-size: cover;
            }

            .card__desc {
                width: 100%;
            }
        }
    }
}

@media screen and (min-width:992px) {
    .social {
        .social__title {

            font-size: 36px;
            font-weight: 600;
            font-stretch: normal;
            font-style: normal;
            line-height: normal;
            letter-spacing: normal;
            text-align: left;
            color: #fff;
        }

        .social__hr {
            margin: 30px 0px;
        }

        .social__body {
            display: flex;
            flex-direction: row;
            justify-content: center;
            gap: 30px;
        }
    }
}
</style>