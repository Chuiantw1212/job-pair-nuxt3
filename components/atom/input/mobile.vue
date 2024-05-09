<template>
    <div :ref="`inputGroup`" class="inputGroup" :class="{ 'inputGroup--error': state.message }">
        <div class="inputGroup__nameGroup">
            <span v-if="required" class="nameGroup__required">*</span>
            {{ name }}
        </div>
        <label class="inputGroup__label">
            <input class="label__input" :id="state.uuid" v-model="localValue" :data-required="required"
                :data-name="name" :data-valid="state.isValid" :placeholder="placeholder" @blur="handleValidate()"
                type="tel" />
        </label>
        <div class="inputGroup__message">{{ state.message }}</div>
    </div>
</template>
<script setup>
const { $uuid4, $emitter } = useNuxtApp()
const emit = defineEmits(['update:modelValue', 'keyup.enter'])
const state = reactive({
    uuid: '',
    message: '',
    isValid: true,
})
const props = defineProps({
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
        default: "09XXXXXXXX",
    },
    name: {
        type: String,
        default: "",
    },
})
// hooks
const localValue = computed({
    get() {
        return props.modelValue
    },
    set(newValue) {
        setErrorMessage()
        emit("update:modelValue", newValue)
    },
})
onMounted(() => {
    state.uuid = $uuid4()
    $emitter.on(`validate-${state.uuid}`, handleValidate)
})
// methods
function setErrorMessage(message = '') {
    state.message = message
    state.isValid = !message
}
function validateDefaultRegex(string) {
    const regex = /^09[0-9]{8}$/
    return regex.test(string)
}
function handleValidate() {
    setErrorMessage()
    const inputValue = String(localValue.value).trim()
    if (props.required && !inputValue) {
        setErrorMessage('欄位為必填')
        return
    }
    // custom validation
    if (props.validate) {
        const message = props.validate(inputValue)
        if (message) {
            setErrorMessage(message)
            return
        }
    }
    if (!validateDefaultRegex(props.modelValue)) {
        setErrorMessage(`格式錯誤`)
        return
    }
}
</script>
<style lang="scss" scoped>
@import './inputGroup.scss';
</style>