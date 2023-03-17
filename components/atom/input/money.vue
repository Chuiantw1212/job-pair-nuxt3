<template>
    <div class="inputGroup" :ref="`inputGroup`">
        <div class="inputGroup__nameGroup">
            <span class="nameGroup__text">
                <span v-if="required" class="text-danger">*</span>
                {{ name }}
            </span>
        </div>
        <label class="inputGroup__label" :class="{ 'inputGroup__label--disabled': disabled }">
            <input v-model="shownValue" class="label__input" :type="type" autocomplete="off"
                @focus="handleFocus($event)" @blur="handleBlur($event)" :placeholder="placeholder" />
            <input v-show="false" v-model="localValue" :data-required="required" :data-name="name" :type="type"
                autocomplete="off" />
        </label>
    </div>
</template>
<script>
export default {
    name: 'money',
    data: function () {
        return {
            shownValue: "",
            isFocused: false,
        }
    },
    props: {
        name: {
            type: String,
            default: "",
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
        type: {
            type: String,
            default: "text",
        },
        precision: {
            type: [Number, String],
            default: null,
        },
        placeholder: {
            type: String,
            default: ''
        },
        min: {
            type: Number,
            default: 0
        },
        max: {
            type: Number,
            default: 0
        }
    },
    computed: {
        localPrecision() {
            return this.precision
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
        shownValue: {
            handler: function (newValue, oldValue) {
                if (newValue === oldValue) {
                    return
                }
                /**
                 * 避免逗號污染localValue
                 */
                const isNumber = this.testNumberLocaleString(newValue)
                if (isNumber) {
                    const parseString = String(newValue)
                    const replaceDot = parseString.replace(new RegExp(",", "g"), "")
                    this.localValue = replaceDot
                } else {
                    this.localValue = newValue
                }
            },
        },
        localValue: {
            handler: function (newValue) {
                if (!this.isFocused && newValue) {
                    const replaceDot = String(newValue).replace(new RegExp(",", "g"), "")
                    newValue = Number(replaceDot).toLocaleString(undefined, {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                    })
                }
                // 這邊用來限制輸入長度
                this.shownValue = newValue
            },
            immediate: true
        },
    },
    methods: {
        testNumberLocaleString(numberString) {
            const regexLocalString = /^(-?[1-9][0-9]*(,[0-9]{3})*|0)(\.\d*)?$/
            const isNumber = regexLocalString.test(numberString)
            return isNumber
        },
        checkIsNumber(number) {
            if (!number && number !== 0) {
                return false
            }
            /**
             * 用event.prevent來阻擋input的"顯示內容"更新
             * https://stackoverflow.com/questions/39291997/how-to-block-e-in-input-type-number
             */
            const invalidChars = ["e", "+", "E"]
            // 若無小數點，排除小數點
            if (this.localPrecision === 0) {
                invalidChars.push(".")
            }

            const numberString = String(number)
            const isNumber = this.testNumberLocaleString(numberString)
            const hasInvalidChars = [...numberString].some((char) => {
                return invalidChars.includes(char)
            })

            // 取得小數
            const numberSplitByDot = numberString.split(".")
            const fractionNumber = numberSplitByDot[1]
            const hasIllegalFractions = this.localPrecision === 0 && fractionNumber && Number(fractionNumber) !== 0

            // 檢核錯誤
            if (hasInvalidChars || !isNumber || hasIllegalFractions) {
                return false
            }
            return true
        },
        handleFocus(event) {
            if (this.checkIsNumber(this.localValue)) {
                const replaceDot = String(this.localValue).replace(new RegExp(",", "g"), "")
                this.shownValue = replaceDot
            }
            this.$emit("focus", event)
            setTimeout(() => {
                this.isFocused = true
            })
        },
        handleBlur(event) {
            this.isFocused = false
            this.convertLocalAndShow()
            this.$emit("blur", event)
        },
        convertLocalAndShow() {
            // 如果沒有數值，為了顯示錯誤訊息，這邊不自動補值
            if (this.localValue === "" || this.localValue === null) {
                return
            }

            let value = this.localValue
            value = Number(value)

            if (this.checkIsNumber(value) !== true) {
                value = ''
            }
            if (this.min) {
                value = Math.max(Number(value), this.min)
            }
            if (this.max) {
                value = Math.min(Number(value), this.max)
            }
            value = value.toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            })
            // Set Back
            this.shownValue = value
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
        border: 1px solid #d3d3d3;
        border-radius: 10px;
        width: 100%;
        background-color: white;

        .label__input {
            border: none;
            width: 100%;

            ::-webkit-input-placeholder {
                /* Edge */
                font-size: 14px;
                color: #999;
            }

            :-ms-input-placeholder {
                /* Internet Explorer 10-11 */
                font-size: 14px;
                color: #999;
            }

            ::placeholder {
                font-size: 14px;
                color: #999;
            }

            &:focus {
                outline: none;
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