<template>
    <button class="toggle" @click="toggleButton($event)">
        <div class="toggle__badgeGroup">

            <slot></slot>
            <div class="toggle__badge">99</div>
        </div>
        <img class="toggle__image" :class="{ 'toggle__image--isOpen': localValue }" src="./Down.svg">
    </button>
</template>
<script setup>
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    }
})
const localValue = computed({
    get() {
        return props.modelValue
    },
    set(newValue) {
        emit('update:modelValue', newValue)
    }
})
// methods
function toggleButton() {
    localValue.value = !localValue.value
}
</script>

<style lang="scss" scoped>
.toggle {
    padding: 10px;
    border-radius: 8px;
    background-color: #edeaea;
    border: none;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .toggle__badgeGroup {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .toggle_button {
        border: none;
        background-color: inherit;
        line-height: normal;
    }

    .toggle__badge {
        width: 20px;
        height: 20px;
        border-radius: 100px;
        background-color: #f5fffb;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        text-align: center;
        color: #5ea88e;
    }

    .toggle__image {
        transition: all 0.3s;
    }

    .toggle__image--isOpen {
        transform: scaleY(-1);
    }
}
</style>