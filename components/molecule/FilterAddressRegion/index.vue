<template>
    <div class="filterAddressRegion">
        <!-- <LazyAtomInputSearch2 class="filterAddressRegion__search">
        </LazyAtomInputSearch2> -->
        <LazyAtomInputCheckMultiple2 v-model="localValue" class="filterAddressRegion__checkboxes" :items="items"
            :listStyle="listStyle">
        </LazyAtomInputCheckMultiple2>
        <div class="filterAddressRegion__footer">
            <!-- <AtomBtnSimpleV2 class="footer__btn" outline>清除條件</AtomBtnSimpleV2> -->
            <AtomBtnSimpleV2 class="footer__btn">關閉</AtomBtnSimpleV2>
        </div>
    </div>
</template>
<script setup>
const emit = defineEmits(['update:modelValue',])
const props = defineProps({
    modelValue: {
        type: Array,
        default: function () {
            return []
        },
    },
    items: {
        type: Array,
        default: function () {
            return []
        }
    },
})
const listStyle = {
    display: 'grid',
    "grid-template-columns": "auto auto",
    gap: '18px',
}
const localValue = computed({
    get() {
        return props.modelValue
    },
    set(value) {
        emit('update:modelValue', value)
    }
})
</script>
<style lang="scss" scoped>
.filterAddressRegion {
    .filterAddressRegion__search {}

    .filterAddressRegion__checkboxes {
        margin-top: 17px;
    }

    .filterAddressRegion__footer {
        display: flex;
        justify-content: space-between;
        gap: 10px;
        margin-top: 20px;

        .footer__btn {
            width: 100%;
            height: 42px;
        }
    }
}
</style>