<template>
    <div class="inputSelectLabel">
        <template v-for="(item, index) in modelValue" :key="index">
            <div v-if="$filter.optionText(item, items)" class="item__badge">
                <span>{{ $filter.optionText(item, items) }}</span>
                <img class="badge__image" src="./Icon_delete_g.svg" @click="removeSelf(index)" />
            </div>
        </template>
    </div>
</template>
<script>
import { computed } from 'vue'
const { $filter } = useNuxtApp()
defineEmits(['update:modelValue'])
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
        },
    },
    itemValue: {
        type: String,
        default: "value",
    },
    itemText: {
        type: String,
        default: "text",
    },
})
const localValue = computed({
    get() {
        return props.modelValue
    },
    set(newValue) {
        emit("update:modelValue", newValue)
    },
})
function removeSelf(index) {
    localValue.splice(index, 1)
}
</script>
<style lang="scss">
.inputSelectLabel {
    display: flex;
    flex-wrap: wrap;
    gap: 0 10px;

    .item__badge {
        display: inline-flex;
        margin-bottom: 10px;
        padding: 9px 15px;
        border-radius: 5px;
        border: solid 1px #5ea88e;
        align-items: center;
        color: #5ea88e;
        font-size: 12px;

        .badge__image {
            width: 16px;
            height: 16px;
            margin-left: 8px;
            display: block;
            cursor: pointer;
        }
    }
}

@media screen and (min-width: 992px) {
    .inputSelectLabel {
        display: flex;
        flex-wrap: wrap;
        max-width: 100%;

        .item__badge {
            font-size: 18px;
            font-weight: normal;
        }
    }
}
</style>