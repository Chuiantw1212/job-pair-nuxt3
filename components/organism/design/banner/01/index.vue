<template>
    <div class="banner" ref="banner">
        <div class="banner__image"
            :style="{ 'background-image': `url(https://storage.googleapis.com/public.prd.job-pair.com/asset/design/Bg.webp)` }">

        </div>
        <div class="banner__preview">
            <template v-if="readonly">
                <div v-html="localValue.controllable.title.html" class="ck ck-editor__editable_inline preview__title">

                </div>
                <div v-html="localValue.controllable.desc.html" class="ck ck-editor__editable_inline preview__desc">

                </div>
            </template>
            <template v-else-if="localValue.controllable">
                <LazyAtomInputCkeditorInline v-model="localValue.controllable.title.html" :toolbar="state.bannerToolbar"
                    class="editorGroup__editor  preview__title" @focus="handleFocus('title')" @click="handleFocus('title')"
                    @blur="handleBlur('title')">
                </LazyAtomInputCkeditorInline>
                <LazyAtomInputCkeditorInline v-model="localValue.controllable.desc.html" :toolbar="state.bannerToolbar"
                    class="editorGroup__editor preview__desc" @focus="handleFocus('desc')" @click="handleFocus('desc')"
                    @blur="handleBlur('desc')">
                </LazyAtomInputCkeditorInline>
                <AtomDesignBtn v-model="localValue.controllable.btn" class="btnSimple--outline--light preview__btn">
                    查看所有職缺</AtomDesignBtn>
            </template>
        </div>
    </div>
</template>
<script setup>
const emit = defineEmits(['update:modelValue'])
const state = reactive({
    bannerToolbar: [
        // 'fontSize',
        // '|',
        'bold',
        'fontColor',
        // '|',
        // 'alignment',
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
                btn: {
                    color: '#21cc90',
                }
            }
        }
        const mergedItem = Object.assign(defaultValue, newValue)
        localValue.value = mergedItem
    }
}, { immediate: true })

const currentInstance = getCurrentInstance()
// methods
function handlePosition(event, type) {
    const { left = 0, top = 0, offsetWidth, offsetHeight, } = event
    const area = currentInstance.refs.banner
    const { clientHeight, clientWidth } = area
    const boundLeft = Math.min(left, clientWidth - offsetWidth)
    const boundHeight = Math.min(top, clientHeight - offsetHeight)
    state.controllable[type].position = {
        left: boundLeft,
        top: boundHeight
    }
}
function handleFocus(type) {
    // state.controllable[type].isFocused = true
}
function handleBlur(type) {
    // state.controllable[type].isFocused = false
}
</script>
<stylte lang="scss" scoped>
.banner {
    position: relative;
    // padding: 35px 0px;

    .banner__preview {
        width: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        // text-align: center;
        // display: flex;
        // flex-direction: column;

        .editorGroup__editor {
            width: fit-content;
            margin: auto;
        }

        .preview__btn {
            margin: auto;
            margin-top: 20px;
            width: fit-content;
            font-size: 14px;
            padding: 10px 20px;
        }

        .preview__title {
            font-size: 12px;
            transform: scale(2);
        }

        .preview__desc {
            font-size: 7px;
            transform: scale(2);
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
                font-size: 45px;
                transform: scale(2);
            }

            .preview__desc {
                font-size: 13px;
                transform: scale(2);
            }

            .preview__btn {
                display: block;
            }
        }
    }
}
</stylte>