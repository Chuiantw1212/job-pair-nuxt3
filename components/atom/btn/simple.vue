<template>
    <button :id="id" class="btnSimple"
        :class="{ 'btnSimple--sm': size === 'sm', 'btnSimple--md': size === 'md', 'btnSimple--lg': size === 'lg', 'btnSimple--disabled': disabled, }"
        :disabled="disabled" ref="simple">
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
    color: {
        type: String,
        default: 'success',
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
const instance = getCurrentInstance()
onMounted(() => {
    const availableColors = ['success', 'light', 'danger']
    const matchTheme = availableColors.includes(props.color)
    if (matchTheme && props.outline) {
        instance.refs.simple.classList.add(`btnSimple--outline--${props.color}`)
    }
})
</script>
<style lang="scss" scoped>
.btnSimple {
    line-height: 1.3;
    border-radius: 5px;
    background-color: #5ea88e;
    border: none;
    color: white;
    cursor: pointer;
    white-space: nowrap;
    justify-content: center;
    display: flex;
    align-items: center;

    >* {
        display: block;
    }

    &:hover {
        background-color: #21cc90;
    }
}

.btnSimple--sm {
    font-size: 14px;
    padding: 10px auto;
}

.btnSimple--md {
    font-size: 18px;
    padding: 12px;
}

.btnSimple--lg {
    font-size: 20px;
    padding: 15px 30px;
}

// IMPORTANT: 直接由外部套用樣式
.btnSimple--outline--success {
    background-color: rgba(0, 0, 0, 0);
    color: #5ea88e;
    border: solid 1px #5ea88e;

    &:hover {
        background-color: rgba(0, 0, 0, 0);
        color: #21cc90;
    }
}

.btnSimple--outline--light {
    background-color: rgba(0, 0, 0, 0);
    color: white;
    border: solid 1px white;

    &:hover {
        background-color: rgba(0, 0, 0, 0);
        color: white;
    }
}

.btnSimple--outline--danger {
    background-color: white;
    color: #da4437;
    border: 1px solid #da4437;

    &:hover {
        background-color: white;
    }
}

.btnSimple--disabled {
    background-color: #d3d3d3;
    color: #969696;
    cursor: unset;

    &:hover {
        background-color: #d3d3d3;
    }
}
</style>