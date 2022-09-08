<template>
    <div class="form-check">
        <input v-model="isSelect" type="checkbox" />
        <slot></slot>
    </div>
</template>
<script>
export default {
    data: function () {
        return {
            isSelect: false,
        }
    },
    props: {
        name: {
            type: String,
            default: "",
        },
        modelValue: {
            type: Array,
            default: function () {
                return []
            },
        },
        size: {
            type: Number,
            default: 0,
        },
    },
    watch: {
        isSelect(selected) {
            if (selected) {
                const trueArray = this.modelValue.map(() => true)
                this.$emit("update:modelValue", trueArray)
            } else {
                const falseArray = this.modelValue.map(() => false)
                this.$emit("update:modelValue", falseArray)
            }
        },
        modelValue: {
            handler(items) {
                const isAllUnselect = items.every((value) => value === false)
                const isEmptyArray = items.length === 0
                if (isAllUnselect || isEmptyArray) {
                    this.isSelect = false
                    return
                }
                const isAllSelect = items.every((value) => value === true)
                if (isAllSelect) {
                    this.isSelect = true
                    return
                }
            },
            deep: true,
            immediate: true,
        },
    },
}
</script>