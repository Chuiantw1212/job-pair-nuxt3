<template>
    <button :id="id" class="btnSimple" :class="{ 'btnSimple--disabled': disabled }" :disabled="disabled">
        <slot></slot>
    </button>
</template>
<script setup>
const props = defineProps({
    id: {
        type: String
    },
    disabled: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        default: 'success',
    }
})
</script>
<style lang="scss" scoped>
.btnSimple {
    width: 100%;
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

.btnSimple--outline--primary {
    background-color: white;
    color: #29b0ab;
    border: 1px solid #29b0ab;

    &:hover {
        background-color: unset;
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