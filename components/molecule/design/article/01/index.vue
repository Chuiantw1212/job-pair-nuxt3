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
</script>
<style lang="scss" scoped>
.columns {
    display: flex;
    align-items: center;
    flex-direction: column;
    background-repeat: no-repeat;
    background-position: bottom right;
    background-size: contain;
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