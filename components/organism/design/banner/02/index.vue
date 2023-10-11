<template>
    <div class="banner">
        <div v-if="localValue.controllable" class="banner__body">
            <template v-if="readonly">
                <div v-html="localValue.controllable.title.html" class="ck ck-editor__editable_inline">
                </div>
                <div v-html="localValue.controllable.desc.html" class="ck ck-editor__editable_inline">
                </div>
            </template>
            <template v-else>
                <LazyAtomInputCkeditorInline v-model="localValue.controllable.title.html">
                </LazyAtomInputCkeditorInline>
                <LazyAtomInputCkeditorInline v-model="localValue.controllable.desc.html">
                </LazyAtomInputCkeditorInline>
            </template>
            <AtomBtnSimple class="body__btn">
                查看所有職缺
            </AtomBtnSimple>
        </div>
        <div class="banner__imageWrap">
            <img class="imageWrap__image" src="./Image.webp">
        </div>
    </div>
</template>
<script>
export default {
    name: 'banner2',
}
</script>
<script setup>
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
    modelValue: {
        type: Object,
        default: function () {
            return {
                name: 'BANNER02',
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
            name: 'BANNER02',
            controllable: {
                title: {
                    html: '<p><span style="font-size:36px;"><strong>找工作就像談戀愛</strong></span></p>'
                },
                desc: {
                    html: '<p><span style="font-size:18px;">快來配對屬於自己的職缺</span></p>'
                }
            }
        }
        const mergedItem = Object.assign(defaultValue, newValue)
        localValue.value = mergedItem
    }
}, { immediate: true })
</script>
<style lang="scss" scoped>
.banner {
    display: flex;
    justify-content: space-evenly;
    background-color: #e5e5e5;
    align-items: center;
    padding: 96px 12px;
    flex-direction: column;

    .banner__body {
        .body__btn {
            margin-top: 30px;
            margin-left: 10px;
        }
    }

    .banner__imageWrap {
        border-radius: 20px;
        overflow: hidden;
        margin-top: 30px;
        width: 100%;
    }
}

@media screen and (min-width: 992px) {
    .banner {
        flex-direction: row;
        justify-content: space-evenly;

        .banner__imageWrap {
            margin-top: 0px;
            width: fit-content;
        }
    }
}
</style>