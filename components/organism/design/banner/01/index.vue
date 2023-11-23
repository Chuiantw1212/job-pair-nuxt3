<template>
    <div class="banner" ref="banner">
        <template v-if="readonly">
            <div class="banner__image" :style="{
                'background-image': `url(${localValue.controllable.background.url})`,
                'background-position': localValue.controllable.background.position,
                'background-size': localValue.controllable.background.size,
                'background-repeat': 'no-repeat'
            }">
                <div class="banner__preview">
                    <div v-html="localValue.controllable.title.html" class="preview__title">

                    </div>
                    <div v-html="localValue.controllable.desc.html" class="preview__desc">

                    </div>
                    <AtomBtnSimpleV2 class="preview__btn" @click="emitScrollEvent($event)"
                        :outline="localValue.controllable.button.outline"
                        :backgroundColor="localValue.controllable.button.backgroundColor">
                        {{
                            localValue.controllable.button.text
                        }}
                    </AtomBtnSimpleV2>
                </div>
            </div>
        </template>
        <template v-else-if="localValue.controllable">
            <AtomDesignBackground class="banner__image" :modelValue="localValue.controllable.background"
                @update:modelValue="uploadAsset($event, index)" @remove="emit('remove')" @moveUp="emit('moveUp')"
                @moveDown="emit('moveDown')">
                <div class="banner__preview">
                    <LazyAtomInputCkeditorInline v-model="localValue.controllable.title.html" :toolbar="state.bannerToolbar"
                        class="editorGroup__editor  preview__title">
                    </LazyAtomInputCkeditorInline>
                    <LazyAtomInputCkeditorInline v-model="localValue.controllable.desc.html" :toolbar="state.bannerToolbar"
                        class="editorGroup__editor preview__desc">
                    </LazyAtomInputCkeditorInline>
                    <AtomDesignBtn v-model="localValue.controllable.button" class="preview__btn">
                        <!-- 查看所有職缺 -->
                        <AtomBtnSimpleV2 :outline="localValue.controllable.button.outline"
                            :backgroundColor="localValue.controllable.button.backgroundColor">
                            {{
                                localValue.controllable.button.text
                            }}
                        </AtomBtnSimpleV2>
                    </AtomDesignBtn>
                </div>
            </AtomDesignBackground>
        </template>
    </div>
</template>
<script setup>
const { $sweet, $emitter, } = useNuxtApp()
const repoOrganizationDesign = useRepoOrganizationDesign()
const emit = defineEmits(['update:modelValue', 'remove', 'moveUp', 'moveDown', 'click'])
const state = reactive({
    bannerToolbar: [
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
                name: 'BANNER01',
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
            name: 'BANNER01',
            controllable: {
                title: {
                    html: '<p style="text-align:center;"><span style="color:hsl(0,0%,100%);"><strong>找工作就像談戀愛</strong></span></p>'
                },
                desc: {
                    html: '<p style="text-align:center;"><span style="color:hsl(0,0%,100%);">快來配對屬於自己的職缺</span></p>'
                },
                button: {
                    color: 'white',
                    backgroundColor: '#21cc90',
                    outline: false,
                    text: '查看所有職缺',
                },
                background: {
                    url: 'https://storage.googleapis.com/public.prd.job-pair.com/asset/design/Bg.webp',
                    size: 'cover',
                    position: 'center',
                }
            }
        }
        const mergedItem = Object.assign(defaultValue, newValue)
        localValue.value = mergedItem
    }
}, { immediate: true })
// methods
function emitScrollEvent() {
    $emitter.emit('scrollToJobs')
}
async function uploadAsset(image = {}, index = 0) {
    image.name = `background${index + 1}`
    const res = await repoOrganizationDesign.putAsset({
        templateName: 'BANNER01',
        asset: image,
    })
    if (res.status === 200) {
        $sweet.loader(true)
        setTimeout(() => {
            $sweet.loader(false)
            console.log(res.data);
            localValue.value.controllable.background.url = res.data
        }, 300)
    }
}
</script>
<stylte lang="scss" scoped>
.banner {
    position: relative;

    .banner__preview {
        width: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        .editorGroup__editor {
            width: fit-content;
            margin: auto;
        }

        .preview__btn {
            margin: auto;
            margin-top: 20px;
            width: fit-content;
            // font-size: 14px;
            padding: 10px 20px;
        }

        .preview__title {
            font-size: 30px;
            font-weight: bold;
            font-stretch: normal;
            font-style: normal;
            width: 100%;
        }

        .preview__desc {
            font-size: 16px;
            font-weight: normal;
            font-stretch: normal;
            font-style: normal;
            line-height: normal;
            letter-spacing: normal;
            margin-top: 20px;
            width: 100%;
        }
    }

    .banner__image {
        width: 100%;
        min-height: 360px;
        background-size: cover;
        background-position: center;
    }

    .banner__controllable {
        width: 200px;
        position: absolute;
        top: 0;
        border: 1px dashed rgba(0, 0, 0, 0);
        position: absolute;
        top: 0px;
        padding: 2px;
        background-color: #1a73e8;
    }

}

@media screen and (min-width:992px) {
    .banner {
        .banner__preview {
            .preview__title {
                font-size: 90px;
                font-weight: bold;
                font-stretch: normal;
                font-style: normal;
                line-height: 1.2;
                letter-spacing: normal;
            }

            .preview__desc {
                font-size: 26px;
                font-weight: 600;
                font-stretch: normal;
                font-style: normal;
                line-height: normal;
                letter-spacing: normal;
                width: 100%;
            }

            .preview__btn {
                display: block;
            }
        }
    }
}
</stylte>