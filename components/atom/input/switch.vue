<template>
    <label class="inputSwitch" tabindex="0" role="checkbox" @keydown.prevent="keyToggle">
        <input type="checkbox" class="inputSwitch__checkbox" :name="name" :checked="modelValue === 'active'"
            :disabled="disabled" tabindex="-1" @change.stop="toggle" />
        <div class="v-switch-core" :style="coreStyle">
            <div class="v-switch-button" :style="buttonStyle" />
        </div>
        <span v-if="toggled" class="inputSwitch__label v-left" :style="labelStyle">
            {{ labels.checked }}
        </span>
        <span v-else class="inputSwitch__label v-right" :style="labelStyle">
            {{ labels.unchecked }}
        </span>
    </label>
</template>
<script>
/**
 * 自下列元件改寫
 * https://github.com/euvl/vue-js-toggle-button
 */
export default {
    name: 'ToggleButton',
    data() {
        return {
            toggled: false,
            DEFAULT_COLOR_CHECKED: '#5ea88e',
            DEFAULT_COLOR_UNCHECKED: '#bfcbd9',
            DEFAULT_SWITCH_COLOR: '#fff'
        }
    },
    props: {
        modelValue: {
            type: String,
            default: ''
        },
        name: {
            type: String
        },
        disabled: {
            type: Boolean,
            default: false
        },
        tag: {
            type: String
        },
        sync: {
            type: Boolean,
            default: true
        },
        speed: {
            type: Number,
            default: 300
        },
        cssColors: {
            type: Boolean,
            default: false
        },
        labels: {
            type: [Boolean, Object],
            default: function () {
                return {
                    checked: '公開',
                    unchecked: '關閉'
                }
            }
        },
        height: {
            type: Number,
            default: 22
        },
        width: {
            type: Number,
            default: 55
        },
        margin: {
            type: Number,
            default: 3
        },
        fontSize: {
            type: Number
        },
    },
    mounted() {
        this.toggled = this.modelValue === 'active'
    },
    computed: {
        coreStyle() {
            return {
                width: this.px(this.width),
                height: this.px(this.height),
                backgroundColor: this.colorCurrent,
                borderRadius: this.px(Math.round(this.height / 2))
            }
        },
        buttonRadius() {
            return this.height - this.margin * 2
        },
        distance() {
            return this.px(this.width - this.height + this.margin)
        },
        buttonStyle() {
            const transition = `transform ${this.speed}ms`
            const margin = this.px(this.margin)
            const transform = this.toggled
                ? this.translate(this.distance, margin)
                : this.translate(margin, margin)
            const background = this.switchColorCurrent
            return {
                width: this.px(this.buttonRadius),
                height: this.px(this.buttonRadius),
                transition,
                transform,
                background
            }
        },
        labelStyle() {
            return {
                lineHeight: this.px(this.height),
                fontSize: this.fontSize ? this.px(this.fontSize) : null
            }
        },
        colorCurrent() {
            return this.toggled ? this.DEFAULT_COLOR_CHECKED : this.DEFAULT_COLOR_UNCHECKED
        },
        switchColorChecked() {
            return this.DEFAULT_SWITCH_COLOR
        },
        switchColorUnchecked() {
            return this.DEFAULT_SWITCH_COLOR
        },
        switchColorCurrent() {
            return this.DEFAULT_SWITCH_COLOR
        }
    },
    watch: {
        modelValue(value) {
            this.toggled = (value === 'active')
        }
    },
    methods: {
        isString(value) {
            return typeof value === 'string'
        },
        isBoolean(value) {
            return typeof value === 'boolean'
        },
        isObject(value) {
            return typeof value === 'object'
        },
        has(object, key) {
            return this.isObject(object) && object.hasOwnProperty(key)
        },
        get(object, key, defaultValue) {
            return this.has(object, key) ? object[key] : defaultValue
        },
        px(value) {
            return `${value}px`
        },
        translate(x, y) {
            return `translate(${x}, ${y})`
        },
        keyToggle(event) {
            // the key event happens whether the control is disabled or not
            // nothing should be done if disabled is true
            if (this.disabled) {
                return
            }
            this.toggle(event)
        },
        toggle(event) {
            const toggled = !this.toggled
            this.toggled = toggled
            this.$emit('input', toggled)
            const value = toggled ? 'active' : 'closed'
            this.$emit('update:modelValue', value)
        }
    }
}
</script>
  
<style lang="scss" scoped>
.inputSwitch {
    display: inline-block;
    position: relative;
    vertical-align: middle;
    user-select: none;
    font-size: 10px;
    cursor: pointer;

    .inputSwitch__checkbox {
        opacity: 0;
        position: absolute;
        width: 1px;
        height: 1px;
    }

    .inputSwitch__label {
        position: absolute;
        top: 0;
        font-weight: 600;
        color: white;
        z-index: 1;

        &.v-left {
            left: 10px;
        }

        &.v-right {
            right: 10px;
        }
    }

    .v-switch-core {
        display: block;
        position: relative;
        box-sizing: border-box;
        outline: 0;
        margin: 0;
        transition: border-color 0.3s, background-color 0.3s;
        user-select: none;

        .v-switch-button {
            display: block;
            position: absolute;
            overflow: hidden;
            top: 0;
            left: 0;
            border-radius: 100%;
            background-color: #fff;
            z-index: 2;
        }
    }

    &.disabled {
        pointer-events: none;
        opacity: 0.6;
    }
}
</style>