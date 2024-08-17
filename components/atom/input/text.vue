<template>
    <div class="inputGroup" :ref="`inputGroup`" :key="state.key" :class="{ 'inputGroup--error': state.message }">
        <div class="inputGroup__nameGroup">
            <div>
                <span v-if="required && name" class="nameGroup__required">*</span>
                {{ name }}
            </div>
        </div>
        <label class="inputGroup__label" :class="{ 'inputGroup__label--disabled': disabled }">
            <slot name="prefix"></slot>
            <!-- {{ minLength }} -->
            <input :id="id" v-if="!disabled" class="label__input" v-model="localValue" :placeholder="localPlaceholder"
                :data-valid="state.isValid" :minLength="minLength" :maxLength="maxLength" :data-required="required"
                :data-name="name" autocomplete="off" @blur="handleValidate($event)"
                @keyup.enter="emit('keyup.enter', $event)" />
            <input v-else :id="id" :disabled="true" class="label__input" :class="{ 'label__input--disabled': disabled }"
                :value="localValue" :readonly="modelValue" />
        </label>
        <div class="inputGroup__message" v-show="state.message">
            {{ state.message }}
        </div>
    </div>
</template>
<script>
export default {
    name: 'customText',
}
</script>
<script setup>
const { $uuid4, } = useNuxtApp()
const emit = defineEmits(['update:modelValue', 'keyup.enter', 'blur'])
const state = reactive({
    key: null,
    message: '',
    isValid: true,
})
const props = defineProps({
    id: {
        type: String,
        default: undefined,
    },
    name: {
        type: String,
        default: "",
    },
    types: {
        type: Array,
        default: function () {
            return ['english', 'mandarin', 'number', 'marks']
        }
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
    minLength: {
        type: Number,
        default: 0,
    },
    maxLength: {
        type: Number,
        default: 524288,
    },
    validate: {
        type: Function,
    },
    lowerCase: {
        type: Boolean,
        default: false,
    }
})
onMounted(() => {
    state.key = $uuid4()
})
const localPlaceholder = computed(() => {
    if (props.placeholder) {
        return props.placeholder
    }
    if (props.name) {
        return `請輸入${props.name}`
    }
    return props.placeholder
})
const localValue = computed({
    get() {
        return props.modelValue
    },
    set(newValue) {
        if (props.lowerCase) {
            newValue = String(newValue).toLowerCase()
        }
        setErrorMessage()
        emit("update:modelValue", newValue)
    },
})
// methods
function setErrorMessage(message = '') {
    state.message = message
    state.isValid = !message
}
async function handleValidate() {
    const inputValue = localValue.value
    setErrorMessage()
    if (props.required && !inputValue.trim()) {
        setErrorMessage('欄位為必填')
        return
    }
    if (props.minLength && inputValue.length < props.minLength) {
        setErrorMessage(`內容未達${props.minLength}碼`)
    }
    // 欄位長度
    if (props.byteSize) {
        const byteSize = new Blob([inputValue]).size
        if (byteSize > props.byteSize) {
            setErrorMessage('內容長度超出限制')
        }
    }
    // regex
    const regexMessage = validateDefaultRegex(inputValue)
    if (regexMessage) {
        setErrorMessage(regexMessage)
    }
    // custom validation
    if (props.validate) {
        const message = await props.validate(inputValue)
        if (message) {
            setErrorMessage(message)
        }
    }
    return true
}
function validateDefaultRegex(inputValue) {
    let regexCode = 0
    if (props.types.includes('mandarin')) {
        regexCode += 1
    }
    if (props.types.includes('english')) {
        regexCode += 2
    }
    if (props.types.includes('number')) {
        regexCode += 4
    }
    if (props.types.includes('marks')) {
        regexCode += 8
    }
    let regexMessage = null
    let regex = null
    switch (regexCode) {
        case 1: {
            regexMessage = '限輸入中文'
            regex = /[^\u3400-\uFAD9]/
            break;
        }
        case 2: {
            regexMessage = '限輸入英文'
            regex = /[^a-zA-Z]/
            break;
        }
        case 3: {
            regexMessage = '限輸入中英文'
            regex = /[^\u3400-\uFAD9a-zA-Z]/
            break;
        }
        case 4: {
            regexMessage = '限輸入數字'
            regex = /[^\u3400-\uFAD9\d]/
            break;
        }
        case 5: {
            regexMessage = '限輸入中數字'
            regex = /[^\u3400-\uFAD9\d]/
            break;
        }
        case 6: {
            regexMessage = '限輸入英數字'
            regex = /[^a-zA-Z\d]/
            break;
        }
        case 7: {
            regexMessage = '限輸入中英數字'
            regex = /[^\u3400-\uFAD9a-zA-Z\d]/
            break;
        }
        default: {
            // 不加任何限制
            break;
        }
    }
    if (regex?.test(inputValue)) {
        return regexMessage
    }
}
</script>
<style lang="scss" scoped>
@import './inputGroup.scss';
</style>