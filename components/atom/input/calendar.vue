<template>
    <div class="inputGroup" :ref="`inputGroup`">
        <div class="inputGroup__nameGroup">
            <span v-if="required" class="text-danger">*</span>
            {{ name }}
        </div>
        <label class="inputGroup__label" :class="{ 'inputGroup__label--disabled': disabled }">
            <input v-if="disabled" v-model="localValue" class="label__input" ref="input" :disabled="true"
                :placeholder="placeholder" />
            <input v-else v-model="localValue" class="label__input" ref="input" :data-required="required" :data-name="name"
                :placeholder="placeholder" />
        </label>
    </div>
</template>
<script>
import confirmDatePlugin from 'flatpickr/dist/plugins/confirmDate/confirmDate'
import flatpickr from "flatpickr"
export default {
    name: 'calendar',
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
            default: "西元年份/月/日 (例：2022/01/01)",
        },
        flatpickrConfig: {
            type: Object,
            default: function () {
                return {}
            }
        }
    },
    mounted() {
        if (!this.disabled) {
            const element = this.$refs.input
            const config = Object.assign({}, this.flatpickrConfig, {
                "plugins": [new confirmDatePlugin({
                    confirmIcon: '',
                    confirmText: '確認'
                })]
            })
            flatpickr(element, config)
        }
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
}
</script>
<style lang="scss" scoped>
@import './inputGroup.scss';
</style>