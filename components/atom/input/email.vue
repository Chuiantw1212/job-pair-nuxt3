<template>
    <div :ref="`inputGroup`" class="inputGroup" :class="{ 'inputGroup--error': message }">
        <div class="inputGroup__nameGroup">
            {{ name }}
        </div>
        <label class="inputGroup__label" :class="{ 'inputGroup__label--disabled': disabled, }">
            <input class="label__input" v-model="localValue" :data-required="required" :data-name="name"
                @blur="checkFormat()" :disabled="disabled" autocomplete="on" />
        </label>
        <div class="inputGroup__message">{{ message }}</div>
    </div>
</template>
<script>
export default {
    name: 'email',
    data: function () {
        return {
            message: "",
        }
    },
    props: {
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
        name: {
            type: String,
            default: "",
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
    },
    watch: {
        disabled() {
            this.message = ""
        },
    },
    methods: {
        checkEmail(string) {
            const regex = /^[^\s]+@[^\s]+\.[^\s]{2,3}$/
            return regex.test(string)
        },
        newData() {
            return {
                message: "",
            }
        },
        checkFormat() {
            const hasValue = this.modelValue.trim()
            if (!hasValue) {
                return
            }
            if (!this.checkEmail(this.modelValue)) {
                this.message = `${this.name}格式錯誤`
            } else {
                this.message = ""
            }
        },
    },
}
</script>
<style lang="scss" scoped>
@import './inputGroup.scss';
</style>