<template>
    <button :id="id" class="btnSimple" :class="{ 'btnSimple--disabled': disabled, 'btnSimple--sm': size === 'sm' }"
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
    size: {
        type: String,
        default: 'medium'
    },
    outline: {
        type: Boolean,
        default: false
    }
})
const instance = getCurrentInstance()
onMounted(() => {
    if (props.color && props.outline) {
        instance.refs.simple.classList.add(`btnSimple--outline--${props.color}`)
    }
})
</script>
<style lang="scss" scoped>
.btnSimple {
    width: 100%; // important
    line-height: 1.3;
    border-radius: 5px;
    background-color: #5ea88e;
    font-size: 18px;
    padding: 12px;
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

.btnSimple--sm {
    width: fit-content;
    margin: 0;
    padding: 4px 8px;
    font-size: 16px;
}
</style>