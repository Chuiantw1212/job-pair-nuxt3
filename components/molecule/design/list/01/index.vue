<template>
    <div class="banner2">
        <!-- <h2 class="banner__title">公司服務介紹</h2> -->
        <LazyAtomInputCkeditorInline v-if="localValue.controllable" v-model="localValue.controllable.title.html"
            :toolbar="state.toolbar" class="banner__title">
        </LazyAtomInputCkeditorInline>
        <div class="banner2__body">
            <div class="body__card">
                <img class="card__image" src="./img4@2x.webp" format="webp" loading="lazy" />
                <LazyAtomInputCkeditorInline v-if="localValue.controllable"
                    v-model="localValue.controllable.items[0].title.html" :toolbar="state.titleToolbar" class="card__title">
                </LazyAtomInputCkeditorInline>
                <LazyAtomInputCkeditorInline v-if="localValue.controllable"
                    v-model="localValue.controllable.items[0].desc.html" class="card__desc">
                </LazyAtomInputCkeditorInline>
            </div>
            <div class="body__card">
                <img class="card__image" src="./img5@2x.webp" format="webp" loading="lazy" />
                <LazyAtomInputCkeditorInline v-if="localValue.controllable"
                    v-model="localValue.controllable.items[1].title.html" :toolbar="state.titleToolbar" class="card__title">
                </LazyAtomInputCkeditorInline>
                <LazyAtomInputCkeditorInline v-if="localValue.controllable"
                    v-model="localValue.controllable.items[1].desc.html" class="card__desc">
                </LazyAtomInputCkeditorInline>
            </div>
            <div class="body__card">
                <img class="card__image" src="./img6@2x.webp" format="webp" loading="lazy" />
                <LazyAtomInputCkeditorInline v-if="localValue.controllable"
                    v-model="localValue.controllable.items[2].title.html" :toolbar="state.titleToolbar" class="card__title">
                </LazyAtomInputCkeditorInline>
                <LazyAtomInputCkeditorInline v-if="localValue.controllable"
                    v-model="localValue.controllable.items[2].desc.html" class="card__desc">
                </LazyAtomInputCkeditorInline>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'LIST01',
}
</script>
<script setup>
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
    modelValue: {
        type: Object,
        default: function () {
            return {
                name: 'LIST01',
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
    ]
})
</script>
<style lang="scss" scoped>
.banner2 {
    background-color: rgba(42, 169, 132, 0.1);
    padding: 20px 0px;

    .banner__title {
        font-size: 36px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        text-align: left;
        color: #000;
        text-align: center;
        width: fit-content;
        margin: 0 auto;
    }

    .banner2__body {
        display: flex;
        gap: 20px;
        margin-top: 30px;
        flex-direction: column;

        .body__card {
            flex-grow: 1;
            flex-basis: 0;
            padding: 50px 20px;
            border-radius: 10px;
            box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.1);
            background-color: #fff;
            display: flex;
            flex-direction: column;

            .card__image {
                width: 100px;
                height: auto;
                margin: 0 auto;
            }

            .card__title {
                margin-top: 20px;
            }

            .card__desc {
                font-size: 24px;
                font-weight: normal;
                font-stretch: normal;
                font-style: normal;
                line-height: 1.5;
                letter-spacing: normal;
                text-align: left;
                color: #333;
            }
        }
    }
}

@media screen and (min-width: 992px) {
    .banner2 {
        .banner2__body {
            flex-direction: row;
        }
    }
}
</style>