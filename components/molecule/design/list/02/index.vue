
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
                name: 'LIST02',
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
            name: 'LIST02',
            controllable: {
                title: {
                    html: '<p style="text-align:center;"><span style="font-size:36px;"><strong>標題</strong></span></p>'
                },
                items: [
                    {
                        html: '<p><span style="font-size:30px;"><strong>不花錢買廣告，很難被看見？</strong></span><br><span style="color:hsl( 0, 0%, 20% );font-size:18px;">求職者在搜尋職缺時，是透過「適配度」排序，讓適合的人才更快看到你的公司</span></p>'
                    },
                    {
                        html: '<p><span style="font-size:30px;"><strong>要怎麼提升招聘效能，減少時間成本呢？</strong></span><br><span style="color:hsl( 0, 0%, 20% );font-size:18px;">透過「適配度」排序，不用一下子看上百封履歷，直接從最適合的人選評估安排面試優先順序。</span></p>'
                    },
                    {
                        html: '<p><span style="font-size:30px;"><strong>好不容易徵到人，怎麼又離職了？</strong></span><br><span style="color:hsl( 0, 0%, 20% );font-size:18px;">讓用人單位自行決定用人偏好，降低到職後因文化、合作與溝通模式的落差而產生流動率。</span></p>'
                    }
                ]
            }
        }
        const mergedItem = Object.assign(defaultValue, newValue)
        localValue.value = mergedItem
    }
}, { immediate: true })
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