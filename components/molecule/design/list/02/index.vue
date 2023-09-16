
import { left } from '@popperjs/core';
<template>
    <div class="rowGroup">
        <LazyAtomInputCkeditorInline v-if="localValue.controllable" v-model="localValue.controllable.title.html"
            :toolbar="state.titleToolbar" class="rowGroup__title">
        </LazyAtomInputCkeditorInline>
        <div class="rowGroup__item">
            <img class="item__img" src="./image1.webp">
            <LazyAtomInputCkeditorInline v-if="localValue.controllable" v-model="localValue.controllable.items[0].html">
            </LazyAtomInputCkeditorInline>
        </div>
        <div class="rowGroup__item">
            <img class="item__img" src="./image2.webp">
            <LazyAtomInputCkeditorInline v-if="localValue.controllable" v-model="localValue.controllable.items[1].html">
            </LazyAtomInputCkeditorInline>
        </div>
        <div class="rowGroup__item">
            <img class="item__img" src="./image3.webp">
            <LazyAtomInputCkeditorInline v-if="localValue.controllable" v-model="localValue.controllable.items[2].html">
            </LazyAtomInputCkeditorInline>
        </div>
    </div>
</template>
<script setup>
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
    modelValue: {
        type: Object,
        default: function () {
            return {
                name: 'LIST02',
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
.rowGroup {
    padding: 100px 0;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 100px;
    background-color: rgba(42, 169, 132, 0.1);

    .rowGroup__title {
        width: 100%;
    }

    .rowGroup__item {
        padding: 30px 100px;
        border-radius: 10px;
        border: solid 1px #a8a8a8;
        background-color: #fff;
        position: relative;
        width: fit-content;

        .item__img {
            position: absolute;
            top: 0;
            left: 0;
            transform: translate(-50%, -50%);
        }
    }
}


@media screen and (min-width: 992px) {
    .rowGroup {
        // flex-direction: row;
        // justify-content: space-evenly;
        // background-size: contain;

        // .columns__body {
        //     display: flex;
        //     align-items: center;
        //     gap: 100px;
        // }
    }
}
</style>