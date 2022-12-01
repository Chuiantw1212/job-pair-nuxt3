<template>
    <div class="inputGroup" :ref="`inputGroup`">
        <div class="inputGroup__nameGroup">
            <span v-if="required" class="text-danger">*</span>
            {{ name }}
        </div>
        <label class="inputGroup__label" :class="{ 'inputGroup__label--disabled': disabled }">
            <input v-if="!disabled" class="label__input" v-model="localValue" :placeholder="localPlaceholder"
                :data-required="required" :data-name="name" autocomplete="off" />
            <input v-else :disabled="true" class="label__input" :class="{ 'label__input--disabled': disabled }"
                :value="localValue" :readonly="modelValue" />
        </label>
    </div>
</template>
<script>
/**
 * The prototype of all the other inputs,
 * read these codes thoroughly makes it easy to read other inputs.
 */
export default {
    data: function () {
        return {
            message: "",
        }
    },
    props: {
        name: {
            type: String,
            default: "",
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
    },
    computed: {
        localPlaceholder() {
            if (this.placeholder) {
                return this.placeholder
            }
            if (this.name) {
                return `請輸入${this.name}`
            }
            return this.placeholder
        },
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
        localValue() {
            if (this.max && this.localValue && this.localValue.length > this.max) {
                this.localValue = this.localValue.slice(0, this.max)
            }
        },
        disabled() {
            this.message = ""
        },
    },
    methods: {
        checkIsEnglish(character) {
            const regex = /^[a-zA-Z \-',]+$/
            return regex.test(character)
        },
        checkIsNumeric(character) {
            const regex = /^[0-9]+$/
            return regex.test(character)
        },
        checkIsSymbol(character) {
            const regex = /[-!$%^&*()_+|~=`{}[\]:";'<>?,./]/
            return regex.test(character)
        },
    },
}
</script>
<style lang="scss" scoped>
.inputGroup {
    .inputGroup__nameGroup {
        font-size: 16px;
        color: #1f1f1f;
        margin-bottom: 4px;
    }

    .inputGroup__label {
        padding: 7px 12px;
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        width: 100%;
        background-color: white;

        .label__input {
            border: none;
            width: 100%;

            &:focus {
                outline: none;
            }

            &::placeholder {
                color: #d3d3d3;
            }
        }
    }

    .inputGroup__label--disabled {
        background-color: rgba(239, 239, 239);

        .label__input {
            background-color: rgba(239, 239, 239);
        }
    }
}
</style>