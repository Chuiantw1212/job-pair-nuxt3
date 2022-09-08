<template>
    <div :ref="`inputGroup`" class="inputGroup" :class="{ 'inputGroup--error': message }">
        <div class="inputGroup__nameGroup">
            {{ name }}
        </div>
        <label class="inputGroup__label" :class="{ 'inputGroup__label--disabled': disabled, }">
            <input class="label__input" v-model="localValue" :data-required="required" :data-name="name"
                @blur="checkFormat()" :disabled="disabled" />
        </label>
        <div class="inputGroup__message">{{ message }}</div>
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
.inputGroup {
    .inputGroup__nameGroup {
        font-size: 16px;
        color: #1f1f1f;
    }

    .inputGroup__label {
        padding: 10px 12px;
        border: 1px solid #d9d9d9;
        border-radius: 10px;
        width: 100%;
        background-color: white;
        margin-top: 8px;

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

    .inputGroup__message {
        color: #ff7373;
        text-align: right;
        width: 100%;
    }
}

.inputGroup--error {
    .inputGroup__label {
        border-color: #ff7373;
    }
}
</style>