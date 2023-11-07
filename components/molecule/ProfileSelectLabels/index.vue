<template>
    <div class="category__labelGroup">
        <template v-if="localValue && localValue.length">
            <div v-for="(item, index) in localValue" :key="index">
                <div v-if="$optionText(item, items)" class="item__badge" @click.stop="removeSelf(index)">
                    <span class="badge__span">{{ $optionText(item, items) }}</span>
                    <img class="badge__image" src="./Icon_delete_g.svg" alt="delete" />
                </div>
                <div v-else class="item__badge" @click.stop="removeSelf(index)">
                    <span class="badge__span">{{ item, items }}</span>
                    <img class="badge__image" src="./Icon_delete_g.svg" alt="delete" />
                </div>
            </div>
        </template>
        <template v-else>
            <div class="labelGroup__placeholder">
                {{ placeholder }}
            </div>
        </template>
    </div>
</template>
<script>
export default {
    name: 'profileSelectLabels',
}
</script>
<script setup>
import { computed, } from 'vue'
const emit = defineEmits(['update:modelValue'])
const { $optionText } = useNuxtApp()
const props = defineProps({
    modelValue: {
        type: Array,
        default: function () {
            return []
        }
    },
    items: {
        type: [Array, Object],
        default: function () {
            return []
        }
    },
    placeholder: {
        type: String,
        default: ''
    }
})
// hooks
const localValue = computed({
    get() {
        return props.modelValue
    },
    set(newValue) {
        emit("update:modelValue", newValue)
    },
})
// methods
function removeSelf(index) {
    localValue.value.splice(index, 1)
}
</script>
<style lang="scss" scoped>
.category__labelGroup {
    display: flex;
    flex-wrap: wrap;
    gap: 4px 0px;

    .item__badge {
        display: flex;
        border-radius: 10px;
        align-items: center;
        color: white;
        font-size: 18px;
        background-color: #5ea88e;
        text-align: left;
        padding: 4px 10px;

        .badge__image {
            width: 16px;
            height: 16px;
            margin-left: 8px;
            display: block;
            cursor: pointer;
        }

        &:last-child {
            margin-right: 8px;
        }
    }

    .labelGroup__placeholder {
        margin-left: 8px;
    }
}
</style>