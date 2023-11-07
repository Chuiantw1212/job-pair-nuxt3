<template>
    <div class="inputGroup" :class="{ 'inputGroup--error': message }">
        <div class="inputGroup__nameGroup">
            <span v-if="required" class="text-danger">* </span>
            {{ name }}
            <span v-if="hint">({{ hint }})</span>
        </div>
        <label class="inputGroup__label">
            <textarea v-if="disabled" class="label__input label__input--disabled" :disabled="true" :value="localValue"
                :rows="rows" />
            <textarea v-else class="label__input" v-model="localValue" :rows="rows" :placeholder="localPlaceholder"
                :data-required="required" :data-name="name" :message="message" autocomplete="off"
                @keypress="$emit('keypress', $event)" @blur="$emit('blur', $event)" />
        </label>
    </div>
</template>
<script>
export default {
    name: 'customTextarea',
    data: function () {
        return this.newData()
    },
    props: {
        name: {
            type: String,
            default: "",
        },
        hint: {
            type: String,
            default: ''
        },
        width: {
            type: [String, Number],
            default: "1",
        },
        modelValue: {
            type: [String, Number],
            default: "",
        },
        required: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        placeholder: {
            type: String,
            default: "",
        },
        min: {
            type: Number,
            default: 0,
        },
        max: {
            type: Number,
            default: 0,
        },
        rows: {
            type: [Number, String],
            default: null,
        },
    },
    computed: {
        localValue: {
            get() {
                return this.modelValue
            },
            set(newValue) {
                this.$emit("update:modelValue", newValue)
            },
        },
        localPlaceholder: {
            get() {
                let placeholder = this.placeholder
                if (!placeholder && this.name) {
                    placeholder = `請輸入${this.name}`
                }
                return placeholder
            },
        }
    },
    methods: {
        newData() {
            return {
                message: "",
            }
        },
    },
}
</script>
<style lang="scss" scoped>
@import './inputGroup.scss';
</style>