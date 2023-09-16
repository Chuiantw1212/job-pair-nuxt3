<template>
    <div class="columns" :style="{ 'background-image': `url(${image})` }">
        <div class="columns__body">
            <LazyAtomInputCkeditorInline v-if="localValue.controllable" v-model="localValue.controllable.title.html"
                :toolbar="state.titleToolbar">
            </LazyAtomInputCkeditorInline>
            <LazyAtomInputCkeditorInline v-if="localValue.controllable" v-model="localValue.controllable.desc.html">
            </LazyAtomInputCkeditorInline>
        </div>
    </div>
</template>
<script setup>
import image from './Group.webp'
const emit = defineEmits(['update:modelValue'])
const state = reactive({
    titleToolbar: [
        'fontSize',
        '|',
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
                name: 'ARTICLE01',
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
            name: 'ARTICLE01',
            controllable: {
                title: {
                    html: '<p><span style="color:hsl( 163, 60%, 41% );font-size:36px;"><strong>公司福利</strong></span></p>'
                },
                desc: {
                    html: '<ul><li><span style="font-size:24px;">彈性自由的工作環境</span></li><li><span style="font-size:24px;">優於勞基法的休假制度</span></li><li><span style="font-size:24px;">每月NT1,000學習補貼，鼓勵員工主動學習</span></li><li><span style="font-size:24px;">三節禮金</span></li></ul>'
                }
            }
        }
        const mergedItem = Object.assign(defaultValue, newValue)
        localValue.value = mergedItem
    }
}, { immediate: true })
</script>
<style lang="scss" scoped>
.columns {
    display: flex;
    align-items: center;
    flex-direction: column;
    background-repeat: no-repeat;
    background-position: bottom right;
    background-size: contain;
    background-color: white;
}


@media screen and (min-width: 992px) {
    .columns {
        flex-direction: row;
        justify-content: space-evenly;
        background-size: contain;

        .columns__body {
            display: flex;
            align-items: center;
            gap: 100px;
        }
    }
}
</style>