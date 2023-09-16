<template>
    <div class="organizationBg">
        <div class="organizationBg__body">
            <LazyAtomInputCkeditorInline v-if="localValue.controllable" v-model="localValue.controllable.title.html"
                :toolbar="state.titleToolbar" class="body__title">
            </LazyAtomInputCkeditorInline>
            <LazyAtomInputCkeditorInline v-if="localValue.controllable" v-model="localValue.controllable.desc.html"
                class="body__desc">
            </LazyAtomInputCkeditorInline>
        </div>
        <div class="organizationBg__imageWrap">
            <img class="imageWrap__image" src="./screen.png" draggable="false">
        </div>
    </div>
</template>
<script>
export default {
    name: 'background',
}
</script>
<script setup>
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
    modelValue: {
        type: Object,
        default: function () {
            return {
                name: 'HYBRID02',
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
.organizationBg {
    display: flex;
    justify-content: space-evenly;
    padding: 50px 0px;
    align-items: center;
    flex-direction: column;
    background-color: white;

    .organizationBg__body {

        .body__title {
            font-size: 36px;
            font-weight: 600;
            font-stretch: normal;
            font-style: normal;
            line-height: normal;
            letter-spacing: normal;
            text-align: left;
            color: #1e3240;
        }

        .body__desc {
            font-size: 18px;
            font-weight: normal;
            font-stretch: normal;
            font-style: normal;
            line-height: normal;
            letter-spacing: normal;
            text-align: left;
            color: #878787;
            max-width: 540px;
        }
    }

    .organizationBg__imageWrap {
        border-radius: 20px;
        overflow: hidden;
        margin-top: 20px;

        .imageWrap__image {
            display: block;
        }
    }
}

@media screen and (min-width: 992px) {
    .organizationBg {
        flex-direction: row;

        .organizationBg__imageWrap {
            margin-top: 0px;
        }
    }
}
</style>