<template>
    <button :id="id" class="btnSimple" :class="classObject" :style="styleObject" :disabled="disabled" ref="simple">
        <slot></slot>
    </button>
</template>
<script>
export default {
    name: 'simple'
}
</script>
<script setup>
/**
 * Deprecated: 應該封裝完整使用props變更樣式，未來元件若有用到此按鈕應逐步更新為V2版本。
 */
const props = defineProps({
    id: {
        type: String
    },
    disabled: {
        type: Boolean,
        default: false
    },
    theme: {
        type: String,
        default: 'success',
    },
    backgroundColor: {
        type: String,
        default: '#5ea88e',
    },
    color: {
        type: String,
        default: 'white',
    },
    outline: {
        type: Boolean,
        default: false
    },
    size: {
        type: String,
        default: 'md',
    }
})
const classObject = computed(() => {
    const defaultObj = {
        'btnSimple--md': props.size === 'md',
        'btnSimple--lg': props.size === 'lg',
        'btnSimple--disabled': props.disabled,
    }
    return defaultObj
})
const styleObject = computed(() => {
    const defaultObj = {
    }
    if (props.outline) {
        defaultObj['--background-color'] = props.color
        defaultObj['--background-color-hover'] = props.backgroundColor
        defaultObj['--color'] = props.backgroundColor
        defaultObj['--color-hover'] = props.color
    } else {
        defaultObj['--background-color'] = props.backgroundColor
        defaultObj['--background-color-hover'] =  props.backgroundColor
        defaultObj['--color'] = props.color
        defaultObj['--color-hover'] = props.color
    }
    return defaultObj
})
</script>
<style lang="scss" scoped>
.btnSimple {
    line-height: 1.3;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    white-space: nowrap;
    justify-content: center;
    display: flex;
    align-items: center;
    color: var(--color);
    background-color: var(--background-color);

    >* {
        display: block;
    }

    &:hover {
        color: var(--color-hover);
        background-color: var(--background-color-hover);
    }
}

.btnSimple--md {
    font-size: 18px;
    padding: 12px;
}

.btnSimple--lg {
    font-size: 20px;
    padding: 15px 30px;
}
</style>