<template>
    <div class="inputGroup" :ref="`inputGroup`">
        <div class="inputGroup__nameGroup">
            <span v-if="required" class="text-danger">*</span>
            {{ name }}
            <div class="ms-1">
                <slot></slot>
            </div>
        </div>
        <label class="inputGroup__inputdropdown" :class="{ 'inputGroup__inputdropdown--disabled': disabled }">
            <select v-model="localValue" class="inputdropdown__select" :data-required="required" :data-name="name"
                :class="{ 'inputdropdown__select--placeholder': [undefined].includes(localValue) }" :disabled="disabled">
                <!-- 配合DB不用null為初始值 -->
                <option v-if="placeholder" :value="''" :disabled="placeholderDisabled" selected class="select__placeholder">
                    {{
                        placeholder
                    }}</option>
                <option v-for="(item, index) in items" :key="index" :value="item[itemValue]">
                    {{ item[itemText] }}
                </option>
            </select>
        </label>
    </div>
</template>
<script>
export default {
    name: 'customSelect',
    props: {
        name: {
            type: String,
            default: "",
        },
        modelValue: {
            type: [String, Boolean, Number],
            default: "",
        },
        placeholder: {
            type: String,
            default: "請選擇",
        },
        placeholderDisabled: {
            type: Boolean,
            default: true
        },
        required: {
            type: Boolean,
            default: false,
        },
        items: {
            type: Array,
            default: function () {
                return [
                    {
                        value: true,
                        text: "是",
                    },
                    {
                        value: false,
                        text: "否",
                    },
                ]
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
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        localValue: {
            get() {
                return this.modelValue
            },
            set(newValue = "") {
                this.$emit("update:modelValue", newValue)
            },
        },
    },
}
</script>
<style lang="scss" scoped>
@import './inputGroup.scss';
</style>