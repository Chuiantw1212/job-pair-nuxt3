<template>
    <div class="inputGroup" :class="{ 'inputGroup--error': state.message }">
        <div class="inputGroup__nameGroup">
            <span v-if="required" class="text-danger">* </span>
            {{ name }}
            <span v-if="hint">({{ hint }})</span>
        </div>
        <label class="inputGroup__label">
            <textarea v-if="disabled" class="label__input label__input--disabled" :disabled="true" :value="localValue"
                :rows="rows" />
            <textarea v-else class="label__input" v-model="localValue" :rows="rows" :placeholder="localPlaceholder"
                :data-required="required" :data-valid="state.isValid" :data-name="name" :message="state.message"
                autocomplete="off" @blur="handleValidate($event)" @keypress="$emit('keypress', $event)" />
        </label>
        <div class="inputGroup__message" v-show="state.message">
            {{ state.message }}
        </div>
    </div>
</template>
<script setup>
const emit = defineEmits(['update:modelValue', 'keyup.enter', 'blur'])
const state = reactive({
    message: "",
    isValid: true,
})
const props = defineProps({
    name: {
        type: String,
        default: "",
    },
    hint: {
        type: String,
        default: ''
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
        default: "",
    },
    min: {
        type: Number,
        default: 0,
    },
    max: {
        type: Number,
        default: 0,
    },
    rows: {
        type: [Number, String],
        default: null,
    },
})
//
const localValue = computed({
    get() {
        return props.modelValue
    },
    set(newValue) {
        emit("update:modelValue", newValue)
    },
})
const localPlaceholder = computed({
    get() {
        let placeholder = props.placeholder
        if (!placeholder && props.name) {
            placeholder = `請輸入${props.name}`
        }
        return placeholder
    },
})
function handleValidate(event) {
    emit('blur', event)
    setErrorMessage()
    const inputValue = localValue.value
    if (props.required && !inputValue.trim()) {
        setErrorMessage('欄位為必填')
        return
    }
}
function setErrorMessage(message = '') {
    state.message = message
    state.isValid = !message
}
</script>
<style lang="scss" scoped>
@import './inputGroup.scss';
</style>