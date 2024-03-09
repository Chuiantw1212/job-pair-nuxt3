<template>
    <div :id="`inputGroup$`" :ref="`inputGroup$`" class="inputGroup">
        <div v-if="name" class="inputGroup__nameGroup">
            <span class="nameGroup__text" :class="{ 'nameGroup__text--required': required }">
                {{ name }}
            </span>
        </div>
        <label class="inputGroup__label">
            <input v-if="!disabled" v-model="localValue" class="label__input" :type="type" pattern="\d*" inputmode="numeric"
                autocomplete="off" :min="min ? min : undefined" :max="max ? max : undefined"
                @keypress="checkIsNumber($event)" @blur="formatNumber()" />
            <input v-else :disabled="true" :class="{ 'label__input--disabled': disabled }" class="label__input" :type="type"
                :value="localValue" :readonly="value" />
        </label>
    </div>
</template>
<script>
export default {
    name: 'number',
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
        validate: {
            type: Function,
            default: function () {
                return ""
            },
        },
        type: {
            type: String,
            default: "number",
        },
        min: {
            type: Number,
            default: 0
        },
        max: {
            type: Number,
            default: 0
        },
        precision: {
            // minimumFractionDigits && maximumFractionDigits
            type: [Number, String],
            default: null,
        },
        hasFraction: {
            type: Boolean,
            default: false,
        },
        autocomplete: {
            type: String,
            default: 'off'
        }
    },
    computed: {
        localValue: {
            get() {
                return this.modelValue
            },
            set(newValue) {
                if (newValue && this.type === "number") {
                    // 正常數字需轉型別
                    const formatNewNumber = Number(newValue)
                    this.$emit("update:modelValue", formatNewNumber)
                } else {
                    // 空字串以及其他不可以轉型別避免生成0，導致必填檢核失效
                    this.$emit("update:modelValue", newValue)
                }
            },
        },
    },
    methods: {
        async enableSmsReceive() {
            try {
                if ('sms' in navigator) {
                    const sms = await navigator.sms.receice()
                    const code = sms.content.match(/^[\s\S]*([0-9]{4})[\s\S]*$/m)[1]
                    if (code) {
                        this.localValue = String(code).slice(0, 4)
                    }
                }
            } catch (error) {
                alert(error.message || error)
            }
        },
        checkIsNumber(event) {
            /**
             * 用event.prevent來阻擋input的"顯示內容"更新
             * https://stackoverflow.com/questions/39291997/how-to-block-e-in-input-type-number
             */
            const invalidChars = ["-", "e", "+", "E"]
            if (!this.hasFraction) {
                invalidChars.push(".")
            }
            const eventKey = event.key
            if (invalidChars.includes(eventKey) || !this.validateNumber(event)) {
                event.preventDefault()
            }
            if (eventKey === "." && !String(event.target.value)) {
                event.target.value = ""
                event.preventDefault()
            }
        },
        formatNumber() {
            if (this.min) {
                this.localValue = Math.max(this.localValue, this.min)
            }
            if (this.max) {
                this.localValue = Math.min(this.localValue, this.max)
            }
        },
        validateNumber(event) {
            /**
             * iPad 的 按鈕沒有event.key可以用，所以需要這個替代方案
             * https://stackoverflow.com/questions/469357/html-text-input-allow-only-numeric-input
             */
            var key = window.event ? event.keyCode : event.which
            if (event.keyCode === 8 || event.keyCode === 46) {
                return true
            } else if (key < 48 || key > 57) {
                return false
            } else {
                return true
            }
        },
        isFloatDynamic(number) {
            const re = /^\d\d*(\.\d*)?$/
            return re.test(String(number))
        },
    },
}
</script>
<style lang="scss" scoped>
@import './inputGroup.scss';
</style>