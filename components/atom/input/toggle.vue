<template>
    <label class="toggle">
        <span>月費</span>
        <div class="switch">
            <input v-model="localValue" type="checkbox">
            <span class="slider round"></span>
        </div>
        <span>年費</span>
    </label>
</template>
<script setup>

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
    modelValue: {
        type: String,
        default: '',
        required: true
    },
})

const localValue = computed({
    get() {
        return props.modelValue
    },
    set(value) {
        emit('update:modelValue', value)
    }
})
</script>

<style lang="scss" scoped>
.toggle {
    display: flex;
    align-items: center;
    gap: 10px;
}

/* The switch - the box around the slider */
.switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

/* The slider */
.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #5EA88E;
    -webkit-transition: .4s;
    transition: .4s;
}

.slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
}

input:checked+.slider {
    background-color: #5EA88E;
}

input:focus+.slider {
    box-shadow: 0 0 1px #5EA88E;
}

input:checked+.slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
    border-radius: 34px;
}

.slider.round:before {
    border-radius: 50%;
}
</style>